Great collection of Node.js scenarios! Let me provide comprehensive answers for each one:

## 🔧 Scenario 1: API Crashes on Database Failure

**Problem**: MongoDB connection failure crashes the entire server.

**Solution**:

```javascript
// 1. Proper error handling in async routes
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    // Log the error
    console.error('Database error:', error);
    
    // Return meaningful error response
    res.status(503).json({
      error: 'Service temporarily unavailable',
      message: 'Database connection failed'
    });
  }
});

// 2. Graceful MongoDB connection handling
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    // Don't crash - try reconnecting
    setTimeout(connectDB, 5000);
  }
};

// 3. Global error handler middleware
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(error.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
  });
});
```

**Key Points**: Wrap database operations in try-catch, implement retry logic, and use global error handlers.

---

## 🧠 Scenario 2: High API Latency

**Problem**: Sequential API calls causing 6-second response time.

**Solution**:

```javascript
// ❌ Sequential (6 seconds total)
app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findById(order.userId); // 2s
  const product = await Product.findById(order.productId); // 2s  
  const shipping = await Shipping.findById(order.shippingId); // 2s
  res.json({ order, user, product, shipping });
});

// ✅ Parallel execution (2 seconds max)
app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  // Execute all queries in parallel
  const [user, product, shipping] = await Promise.all([
    User.findById(order.userId),
    Product.findById(order.productId),
    Shipping.findById(order.shippingId)
  ]);
  
  res.json({ order, user, product, shipping });
});

// 🚀 Advanced: With caching
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

app.get('/orders/:id', async (req, res) => {
  const cacheKey = `order:${req.params.id}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }
  
  const order = await Order.findById(req.params.id).populate('userId productId shippingId');
  
  const result = { order, user: order.userId, product: order.productId, shipping: order.shippingId };
  cache.set(cacheKey, result);
  res.json(result);
});
```

**Additional Optimizations**:
- Use MongoDB aggregation pipeline for complex joins
- Implement Redis caching for frequently accessed data
- Add database indexes on frequently queried fields

---

## 🔐 Scenario 3: Insecure API

**Problem**: Exposing sensitive user data in API responses.

**Solution**:

```javascript
// ❌ Insecure - exposes everything
app.get('/profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user); // Sends password, tokens, etc.
});

// ✅ Secure approaches:

// 1. Database projection (most efficient)
app.get('/profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('name email avatar createdAt') // Only select needed fields
    .lean(); // Returns plain JS object, faster
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// 2. Manual filtering
app.get('/profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Remove sensitive fields
  const { password, refreshToken, __v, ...safeUser } = user.toObject();
  
  res.json(safeUser);
});

// 3. Using a utility function
const sanitizeUser = (user) => {
  const { password, refreshToken, emailVerified, __v, ...safeUser } = user.toObject();
  return safeUser;
};

app.get('/profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(sanitizeUser(user));
});

// 4. Mongoose schema with toJSON transform
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Remove sensitive data automatically
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  return user;
};
```

**Best Practice**: Always use database projection (`.select()`) as it's the most efficient.

---

## 🔄 Scenario 4: Race Condition

**Problem**: Double money addition due to rapid button clicks.

**Solution**:

```javascript
// ❌ Race condition - can add money twice
app.post('/wallet/add-money', async (req, res) => {
  const { userId, amount } = req.body;
  
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true }
  );
  
  res.json(wallet);
});

// ✅ Solution 1: Database Transaction
app.post('/wallet/add-money', async (req, res) => {
  const session = await Wallet.startSession();
  session.startTransaction();
  
  try {
    const { userId, amount, idempotencyKey } = req.body;
    
    // Check if this transaction already processed
    const existingTx = await Transaction.findOne({ 
      idempotencyKey, 
      userId,
      status: 'completed' 
    });
    
    if (existingTx) {
      await session.abortTransaction();
      session.endSession();
      return res.json({ message: 'Transaction already processed', balance: existingTx.newBalance });
    }
    
    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet) throw new Error('Wallet not found');
    
    // Create transaction record first
    const transaction = await Transaction.create([{
      userId,
      amount,
      type: 'credit',
      idempotencyKey,
      oldBalance: wallet.balance,
      newBalance: wallet.balance + amount
    }], { session });
    
    // Update wallet
    await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount }, $push: { transactions: transaction[0]._id } },
      { session, new: true }
    );
    
    await session.commitTransaction();
    res.json({ 
      message: 'Money added successfully', 
      balance: wallet.balance + amount,
      transactionId: transaction[0]._id 
    });
    
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

// ✅ Solution 2: Optimistic locking
const addMoneyWithLock = async (userId, amount, idempotencyKey) => {
  while (true) {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) throw new Error('Wallet not found');
    
    // Try to update with current version
    const result = await Wallet.findOneAndUpdate(
      { 
        userId, 
        version: wallet.version // Optimistic lock
      },
      { 
        $inc: { balance: amount },
        $set: { version: wallet.version + 1 }
      },
      { new: true }
    );
    
    if (result) {
      // Success - record transaction
      await Transaction.create({
        userId,
        amount,
        type: 'credit',
        idempotencyKey,
        oldBalance: wallet.balance,
        newBalance: result.balance
      });
      return result;
    }
    // Version mismatch - retry
  }
};
```

**Key Points**: Use idempotency keys, database transactions, or optimistic locking to prevent duplicate operations.

---

## 🛑 Scenario 5: Blocking Code

**Problem**: Synchronous file reading blocking the event loop.

**Solution**:

```javascript
// ❌ Blocking - slows down entire server
app.get('/config', (req, res) => {
  const config = fs.readFileSync('./config.json', 'utf8');
  const parsed = JSON.parse(config);
  res.json(parsed);
});

// ✅ Non-blocking async approach
const fs = require('fs/promises');
const path = require('path');

app.get('/config', async (req, res) => {
  try {
    const configPath = path.join(__dirname, 'config.json');
    const configData = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(configData);
    res.json(config);
  } catch (error) {
    console.error('Config read error:', error);
    res.status(500).json({ error: 'Configuration unavailable' });
  }
});

// 🚀 Better: Cache the configuration
let cachedConfig = null;
let configCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getConfig = async () => {
  const now = Date.now();
  
  // Return cached config if still valid
  if (cachedConfig && (now - configCacheTime) < CACHE_DURATION) {
    return cachedConfig;
  }
  
  try {
    const configData = await fs.readFile('./config.json', 'utf8');
    cachedConfig = JSON.parse(configData);
    configCacheTime = now;
    return cachedConfig;
  } catch (error) {
    console.error('Failed to read config:', error);
    // Return cached version even if expired as fallback
    return cachedConfig || {};
  }
};

app.get('/config', async (req, res) => {
  const config = await getConfig();
  res.json(config);
});

// 🔄 Even better: Load config at startup
let appConfig;

const loadConfig = async () => {
  try {
    const configData = await fs.readFile('./config.json', 'utf8');
    appConfig = JSON.parse(configData);
    console.log('Configuration loaded');
  } catch (error) {
    console.error('Failed to load config:', error);
    process.exit(1); // Fail fast if config can't be loaded
  }
};

// Load config before starting server
loadConfig().then(() => {
  app.listen(3000, () => {
    console.log('Server running');
  });
});

app.get('/config', (req, res) => {
  res.json(appConfig);
});
```

**Key Takeaways**: 
- Never use synchronous file operations in request handlers
- Cache static data to avoid repeated I/O
- Load configuration at startup when possible

---

## ⚠ Scenario 6: Unhandled Promise Rejections

**Problem**: Unhandled promise rejections crash the application.

**Solution**:

```javascript
// ❌ Dangerous - unhandled rejection
app.get('/users', async (req, res) => {
  const users = await someFunctionThatMightFail(); // No .catch()
  res.json(users);
});

// ✅ Comprehensive error handling

// 1. Global unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
  // Log to error monitoring service
  logErrorToSentry(reason);
  
  // In production, don't crash - but alert team
  if (process.env.NODE_ENV === 'production') {
    // Send alert to Slack/Email
    sendAlert('Unhandled Promise Rejection', reason);
  } else {
    // In development, crash so we fix it
    process.exit(1);
  }
});

// 2. Global unhandled exception handler
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  logErrorToSentry(error);
  
  // Always crash on uncaught exceptions
  process.exit(1);
});

// 3. Proper async error handling in routes
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));

// Async handler utility
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 4. Express error handling middleware (must be last)
app.use((error, req, res, next) => {
  console.error('Express error:', error);
  
  // Log with request context
  logErrorWithContext(error, req);
  
  const status = error.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : error.message;
    
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  });
});

// 5. Domain-based error tracking (advanced)
const asyncLocalStorage = require('async_hooks').executionAsyncId;

const als = new AsyncLocalStorage();

app.use((req, res, next) => {
  const store = {
    reqId: generateRequestId(),
    timestamp: new Date(),
    userId: req.user?.id
  };
  
  als.run(store, () => next());
});

// In your error handlers
process.on('unhandledRejection', (reason) => {
  const store = als.getStore();
  console.error(`Request ${store?.reqId}: Unhandled rejection`, reason);
});
```

**Production Setup with PM2**:
```json
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

---

## 🛠 Scenario 7: Deployment Issue

**Problem**: PORT already in use error in production.

**Solution**:

```javascript
// ❌ Wrong - hardcoded port
const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// ✅ Correct - use environment variable
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => { // Bind to all interfaces
  console.log(`Server running on port ${PORT}`);
});

// 🔍 Debug port conflicts
const debugPortUsage = () => {
  const net = require('net');
  
  const server = net.createServer();
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
      console.error('Check with: lsof -i :${PORT}');
      process.exit(1);
    }
  });
  
  server.once('listening', () => {
    server.close();
    // Port is free, proceed with app startup
    startApp();
  });
  
  server.listen(PORT);
};

// 🛠 Production-ready server setup
const startServer = async () => {
  try {
    // Validate required env vars
    const requiredEnv = ['PORT', 'NODE_ENV', 'DATABASE_URL'];
    const missing = requiredEnv.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error('Missing environment variables:', missing);
      process.exit(1);
    }
    
    const PORT = parseInt(process.env.PORT, 10) || 3000;
    
    // Graceful shutdown
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server started on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
    
    // Handle port binding errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
        console.error('Try: lsof -ti:${PORT} | xargs kill -9');
        process.exit(1);
      }
      console.error('Server error:', error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  
  try {
    // Close database connections
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    // Close server
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  } catch (error) {
    console.error('Shutdown error:', error);
    process.exit(1);
  }
};

// PM2 ecosystem config
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    // Auto restart on crash
    max_restarts: 10,
    min_uptime: '10s',
    // Logging
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

**Deployment Checklist**:
- [ ] Use `process.env.PORT || 3000`
- [ ] Bind to `0.0.0.0` not `localhost`
- [ ] Check for multiple `app.listen()` calls
- [ ] Use process manager (PM2, Docker)
- [ ] Validate environment variables on startup

---

## ⚡ Scenario 8: Scaling

**Problem**: API crashes under high concurrent load.

**Solution**:

```javascript
// 1. Node.js Clustering (CPU-bound scaling)
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Handle worker crashes
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Restart worker
    cluster.fork();
  });
  
} else {
  // Workers - actual HTTP server
  const app = express();
  
  app.get('/api/data', async (req, res) => {
    // Your API logic
    res.json({ data: 'Hello from worker ' + process.pid });
  });
  
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}

// 2. Database connection pooling
const mongoose = require('mongoose');

const dbOptions = {
  // Connection pooling
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 2,  // Minimum 2 socket connections
  maxIdleTimeMS: 30000, // Close sockets after 30s of inactivity
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGODB_URI, dbOptions);

// 3. Redis caching layer
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => console.error('Redis error:', err));

// Cache middleware
const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      // Store response in cache
      const originalJson = res.json;
      res.json = function(obj) {
        client.setex(key, duration, JSON.stringify(obj));
        originalJson.call(this, obj);
      };
      
      next();
    } catch (error) {
      console.error('Cache error:', error);
      next();
    }
  };
};

app.get('/api/users', cacheMiddleware(300), async (req, res) => {
  const users = await User.find().limit(10);
  res.json(users);
});

// 4. Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);

// 5. Background job processing
const Queue = require('bull');
const uploadQueue = new Queue('file processing', process.env.REDIS_URL);

app.post('/api/upload', async (req, res) => {
  const { filePath, userId } = req.body;
  
  // Add to queue instead of processing immediately
  const job = await uploadQueue.add('process-upload', {
    filePath,
    userId,
    timestamp: Date.now()
  });
  
  res.json({ 
    message: 'Upload queued',
    jobId: job.id 
  });
});

// Process queue
uploadQueue.process('process-upload', async (job) => {
  const { filePath, userId } = job.data;
  
  // Heavy processing
  await processLargeFile(filePath, userId);
  
  // Notify user
  await notifyUser(userId, 'File processed');
});

// 6. Health checks
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// 7. Graceful degradation
const circuitBreaker = require('opossum');

const apiCall = async () => {
  // External API call that might fail
  return fetch('https://external-api.com/data');
};

const options = {
  timeout: 2000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};

const breaker = circuitBreaker(apiCall, options);

app.get('/api/external-data', async (req, res) => {
  try {
    const result = await breaker.fire();
    res.json(result);
  } catch (error) {
    if (error.code === 'CIRCUIT_OPEN') {
      // Return cached/stale data
      res.json(getCachedData());
    } else {
      res.status(503).json({ error: 'Service unavailable' });
    }
  }
});
```

**Scaling Architecture**:
```
Load Balancer (Nginx/AWS ALB)
    ↓
   [Node.js Instance 1]  [Node.js Instance 2]  [Node.js Instance 3]
        ↓                       ↓                       ↓
   Redis Cache          Redis Cache          Redis Cache
        ↓                       ↓                       ↓
   MongoDB (Replica Set)   MongoDB (Replica Set)   MongoDB (Replica Set)
        ↓
   Background Jobs (Bull Queue)
```

---

## 📜 Scenario 9: Logging & Debugging

**Problem**: Random request failures that can't be reproduced locally.

**Solution**:

```javascript
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');
const clsHooked = require('cls-hooked');

// 1. Request-scoped context
const namespace = clsHooked.createNamespace('request-context');

app.use((req, res, next) => {
  // Generate correlation ID
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  
  // Store request context
  const context = {
    correlationId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: null, // Will be set by auth middleware
    timestamp: new Date().toISOString()
  };
  
  namespace.run(() => {
    namespace.set('requestContext', context);
    // Add correlation ID to response headers
    res.set('X-Correlation-ID', correlationId);
    next();
  });
});

// 2. Winston logger with request context
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Console for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // File transports
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    // Daily rotation
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

// Request context-aware logger
const requestLogger = winston.createLogger({
  ...logger.config,
  transports: [
    new winston.transports.Http({
      host: 'http://log-server:8080',
      path: '/logs',
      ssl: false,
      batch: { maxBatches: 10, timeout: 1000 }
    })
  ]
});

// Logging utility
const logWithContext = (level, message, meta = {}) => {
  const context = namespace.get('requestContext');
  const logEntry = {
    ...context,
    level,
    message,
    ...meta,
    '@timestamp': new Date().toISOString()
  };
  
  logger.log(logEntry);
  
  // Also send to external service
  if (level === 'error') {
    sendToSentry(logEntry);
    sendToDataDog(logEntry);
  }
};

// 3. Request/Response logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log incoming request
  logWithContext('info', `Incoming request`, {
    method: req.method,
    url: req.originalUrl,
    query: req.query
  });
  
  // Intercept response
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    const status = res.statusCode;
    
    // Log response
    logWithContext('info', `Request completed`, {
      status,
      duration,
      responseSize: typeof body === 'string' ? body.length : JSON.stringify(body).length,
      responseBody: process.env.NODE_ENV === 'development' ? body : undefined
    });
    
    originalSend.call(this, body);
  };
  
  next();
});

// 4. Error logging with stack traces
app.use((error, req, res, next) => {
  const context = namespace.get('requestContext');
  
  logWithContext('error', error.message, {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    },
    request: {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      headers: req.headers
    },
    user: context.userId
  });
  
  // Send to error monitoring
  captureException(error, {
    tags: { userId: context.userId },
    extra: { correlationId: context.correlationId }
  });
  
  res.status(500).json({
    error: 'Internal server error',
    correlationId: context.correlationId
  });
});

// 5. Structured logging for business events
const logBusinessEvent = (eventName, data = {}) => {
  const context = namespace.get('requestContext');
  
  logWithContext('info', `Business event: ${eventName}`, {
    event: eventName,
    userId: context.userId,
    timestamp: new Date().toISOString(),
    ...data
  });
};

// Usage in your routes
app.post('/api/orders', async (req, res) => {
  try {
    const context = namespace.get('requestContext');
    context.userId = req.user.id; // Set from auth middleware
    
    const order = await createOrder(req.body);
    
    // Log business event
    logBusinessEvent('order.created', {
      orderId: order.id,
      amount: order.total,
      items: order.items.length
    });
    
    res.json(order);
  } catch (error) {
    logWithContext('error', 'Failed to create order', { error });
    throw error;
  }
});

// 6. Monitoring and alerting
const setupMonitoring = () => {
  // Memory monitoring
  setInterval(() => {
    const memory = process.memoryUsage();
    logWithContext('info', 'Memory usage', { memory });
    
    // Alert if memory > 80%
    if (memory.heapUsed / memory.heapTotal > 0.8) {
      sendAlert('High memory usage', { memory });
    }
  }, 60000); // Every minute
  
  // Response time monitoring
  const responseTimes = [];
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      responseTimes.push(duration);
      
      // Keep only last 100 measurements
      if (responseTimes.length > 100) {
        responseTimes.shift();
      }
      
      // Calculate p95
      const p95 = responseTimes.sort((a, b) => a - b)[
        Math.floor(responseTimes.length * 0.95)
      ];
      
      if (p95 > 1000) { // 1 second
        logWithContext('warn', 'Slow response detected', { p95 });
      }
    });
    next();
  });
};

// 7. Debugging utilities
const debugMode = process.env.NODE_ENV === 'development';

const debug = (label) => {
  return (...args) => {
    if (debugMode) {
      const context = namespace.get('requestContext');
      console.log(`[${context?.correlationId}] ${label}:`, ...args);
    }
  };
};

// Usage
app.get('/api/debug', (req, res) => {
  const logUserActivity = debug('UserActivity');
  logUserActivity('Fetching user data', { userId: req.user.id });
  
  res.json({ debug: true });
});
```

**Production Logging Setup**:
```yaml
# docker-compose.yml
services:
  api:
    image: node:18
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=info
    volumes:
      - ./logs:/app/logs
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
  
  log-aggregator:
    image: vector
    volumes:
      - ./vector.toml:/etc/vector/vector.toml
```

---

## 📦 Scenario 10: Large File Upload

**Problem**: 1GB video uploads causing timeouts and memory issues.

**Solution**:

```javascript
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const stream = require('stream');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const app = express();

// 1. ❌ Wrong: Loading entire file into memory
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('video'), async (req, res) => {
  // This loads entire 1GB into memory!
  const file = req.file;
  // Process file...
  res.json({ message: 'Upload complete' });
});

// ✅ Solution 1: Streaming upload to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = `uploads/${req.user.id}/`;
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Validate file type
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files allowed'), false);
  }
};

const upload = multer({ 
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 // 2GB limit
  },
  fileFilter
});

// Streaming endpoint
app.post('/api/upload-stream', upload.single('video'), async (req, res) => {
  try {
    const { filename, path: filePath, size } = req.file;
    
    // Validate file
    if (size > 2 * 1024 * 1024 * 1024) {
      fs.unlinkSync(filePath); // Clean up
      return res.status(413).json({ error: 'File too large' });
    }
    
    // Optional: Virus scan or format validation
    await validateVideoFile(filePath);
    
    // Generate secure URL
    const fileUrl = `${process.env.BASE_URL}/files/${req.user.id}/${filename}`;
    
    res.json({
      message: 'Upload successful',
      fileId: filename,
      url: fileUrl,
      size: size
    });
    
  } catch (error) {
    // Clean up on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// Serve uploaded files
app.use('/files', express.static('uploads'));

// ✅ Solution 2: Direct S3 upload with pre-signed URLs (Recommended)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = process.env.S3_BUCKET;

// Generate pre-signed URL for direct upload
app.post('/api/upload-url', async (req, res) => {
  try {
    const { filename, fileSize } = req.body;
    
    // Validate file size
    if (fileSize > 5 * 1024 * 1024 * 1024) { // 5GB limit
      return res.status(413).json({ error: 'File too large' });
    }
    
    // Generate unique key
    const key = `uploads/${req.user.id}/${Date.now()}-${filename}`;
    
    // Create pre-signed URL (15 minute expiry)
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: 'video/*',
      Metadata: {
        userid: req.user.id,
        originalname: filename
      }
    });
    
    const signedUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 900 // 15 minutes
    });
    
    res.json({
      uploadUrl: signedUrl,
      fileKey: key,
      bucket: BUCKET_NAME
    });
    
  } catch (error) {
    console.error('Failed to generate upload URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
});

// Handle upload completion
app.post('/api/upload-complete', async (req, res) => {
  try {
    const { fileKey, filename } = req.body;
    
    // Verify upload by checking object metadata
    const headCommand = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    });
    
    await s3Client.send(headCommand);
    
    // Create database record
    const fileRecord = await File.create({
      userId: req.user.id,
      filename,
      key: fileKey,
      bucket: BUCKET_NAME,
      size: req.body.fileSize,
      uploadedAt: new Date()
    });
    
    // Generate public read URL
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    });
    
    const publicUrl = await getSignedUrl(s3Client, getCommand, { 
      expiresIn: 3600 // 1 hour
    });
    
    res.json({
      message: 'Upload completed',
      fileId: fileRecord._id,
      publicUrl,
      size: req.body.fileSize
    });
    
  } catch (error) {
    if (error.name === 'NotFound') {
      return res.status(400).json({ error: 'Upload not found or incomplete' });
    }
    console.error('Upload completion error:', error);
    res.status(500).json({ error: 'Failed to process upload' });
  }
});

// ✅ Solution 3: Chunked upload for very large files
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

app.post('/api/upload-chunked', async (req, res) => {
  try {
    const { uploadId, chunkIndex, totalChunks, filename } = req.body;
    
    // Get chunk from request stream
    let chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    
    req.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      
      if (buffer.length !== req.headers['content-length']) {
        return res.status(400).json({ error: 'Chunk size mismatch' });
      }
      
      // Store chunk temporarily
      const chunkPath = `temp/${uploadId}/chunk-${chunkIndex}`;
      await fs.promises.mkdir(path.dirname(chunkPath), { recursive: true });
      await fs.promises.writeFile(chunkPath, buffer);
      
      // Check if all chunks received
      const receivedChunks = await fs.promises.readdir(`temp/${uploadId}/`);
      
      if (receivedChunks.length === totalChunks) {
        // Combine chunks
        const finalBuffer = await combineChunks(uploadId, totalChunks);
        
        // Upload to S3
        const key = `uploads/${req.user.id}/${filename}`;
        const uploadParams = {
          Bucket: BUCKET_NAME,
          Key: key,
          Body: finalBuffer,
          ContentType: 'video/*'
        };
        
        const result = await s3Client.send(new PutObjectCommand(uploadParams));
        
        // Clean up temp files
        await fs.promises.rm(`temp/${uploadId}`, { recursive: true });
        
        res.json({ 
          message: 'Upload complete', 
          key,
          etag: result.ETag 
        });
      } else {
        res.json({ 
          message: `Chunk ${chunkIndex} received`, 
          progress: `${(receivedChunks.length / totalChunks * 100).toFixed(1)}%`
        });
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const combineChunks = async (uploadId, totalChunks) => {
  const chunks = [];
  
  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = `temp/${uploadId}/chunk-${i}`;
    const chunk = await fs.promises.readFile(chunkPath);
    chunks.push(chunk);
  }
  
  return Buffer.concat(chunks);
};

// ✅ Solution 4: Progress tracking
let activeUploads = new Map();

app.post('/api/upload-with-progress', async (req, res) => {
  const uploadId = uuidv4();
  const userId = req.user.id;
  
  activeUploads.set(uploadId, {
    userId,
    filename: req.body.filename,
    bytesReceived: 0,
    totalBytes: parseInt(req.headers['content-length'], 10),
    startTime: Date.now()
  });
  
  let chunks = [];
  
  req.on('data', (chunk) => {
    const upload = activeUploads.get(uploadId);
    if (upload) {
      upload.bytesReceived += chunk.length;
      
      // Emit progress (WebSocket or SSE)
      emitProgress(uploadId, {
        progress: (upload.bytesReceived / upload.totalBytes * 100).toFixed(1),
        bytesReceived: upload.bytesReceived,
        estimatedTimeLeft: calculateETA(upload)
      });
    }
    
    chunks.push(chunk);
  });
  
  req.on('end', async () => {
    try {
      const upload = activeUploads.get(uploadId);
      const buffer = Buffer.concat(chunks);
      
      // Upload to S3
      const key = `uploads/${userId}/${upload.filename}`;
      const result = await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: 'video/*'
      }));
      
      // Clean up
      activeUploads.delete(uploadId);
      
      // Notify completion
      emitCompletion(uploadId, {
        success: true,
        key,
        etag: result.ETag,
        duration: Date.now() - upload.startTime
      });
      
      res.json({ message: 'Upload complete', key, etag: result.ETag });
      
    } catch (error) {
      activeUploads.delete(uploadId);
      emitCompletion(uploadId, { success: false, error: error.message });
      res.status(500).json({ error: error.message });
    }
  });
});

// WebSocket for real-time progress
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { uploadId } = JSON.parse(message);
    // Store WebSocket connection for this upload
    uploadConnections.set(uploadId, ws);
  });
});

const emitProgress = (uploadId, progress) => {
  const ws = uploadConnections.get(uploadId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'progress', uploadId, ...progress }));
  }
};
```

**Complete File Upload Service**:
```javascript
// services/fileUploadService.js
class FileUploadService {
  constructor(s3Client, bucketName) {
    this.s3Client = s3Client;
    this.bucketName = bucketName;
    this.maxFileSize = 5 * 1024 * 1024 * 1024; // 5GB
    this.supportedTypes = ['video/mp4', 'video/avi', 'video/mov'];
  }
  
  async generateUploadUrl(userId, filename, fileSize, contentType) {
    // Validation
    this.validateFile(fileSize, contentType, filename);
    
    const key = this.generateKey(userId, filename);
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
      Metadata: {
        userid: userId,
        originalname: filename,
        uploadedAt: new Date().toISOString()
      }
    });
    
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 900 });
    
    return { url, key };
  }
  
  async completeUpload(key, filename, fileSize) {
    // Verify upload
    try {
      const headResult = await this.s3Client.send(new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key
      }));
      
      // Create database record
      const fileRecord = await File.create({
        key,
        filename,
        size: fileSize,
        bucket: this.bucketName,
        uploadedAt: new Date(),
        status: 'completed'
      });
      
      return {
        fileId: fileRecord._id,
        publicUrl: await this.generatePublicUrl(key),
        size: fileSize
      };
      
    } catch (error) {
      if (error.name === 'NotFound') {
        throw new Error('Upload not found');
      }
      throw error;
    }
  }
  
  generatePublicUrl(key, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key
    });
    
    return getSignedUrl(this.s3Client, command, { expiresIn });
  }
  
  validateFile(fileSize, contentType, filename) {
    if (fileSize > this.maxFileSize) {
      throw new Error('File too large');
    }
    
    if (!this.supportedTypes.includes(contentType)) {
      throw new Error('Unsupported file type');
    }
    
    if (!filename || filename.length > 255) {
      throw new Error('Invalid filename');
    }
  }
  
  generateKey(userId, filename) {
    const sanitizedName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `uploads/${userId}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${sanitizedName}`;
  }
}

// Usage
const fileService = new FileUploadService(s3Client, BUCKET_NAME);

app.post('/api/files/upload-url', async (req, res) => {
  try {
    const { filename, fileSize, contentType } = req.body;
    
    const { url, key } = await fileService.generateUploadUrl(
      req.user.id, 
      filename, 
      fileSize, 
      contentType
    );
    
    res.json({ uploadUrl: url, fileKey: key });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

**Key Recommendations**:
1. **Use pre-signed URLs** for direct client-to-cloud uploads
2. **Stream files** never load entire files into memory  
3. **Validate early** - file type, size, and metadata
4. **Provide progress tracking** for large uploads
5. **Implement cleanup** for failed/aborted uploads
6. **Use chunked uploads** for files > 100MB
7. **Add virus scanning** for production systems

These solutions handle the most common Node.js production issues while following best practices for scalability, security, and maintainability!
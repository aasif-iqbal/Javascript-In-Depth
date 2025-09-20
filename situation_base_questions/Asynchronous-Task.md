### Practical patterns
- Implement a retry with exponential backoff for a failing fetch.  
- Implement a timeout wrapper: reject if an async operation exceeds N ms.  
Here's a timeout wrapper that rejects async operations if they exceed a specified time limit:

## Basic Timeout Wrapper

```javascript
function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), 
                 timeoutMs);
    })
  ]);
}

// Usage
const slowOperation = async () => {
  // Simulate a slow operation
  await new Promise(resolve => setTimeout(resolve, 2000));
  return 'Success!';
};

withTimeout(slowOperation(), 1000)
  .then(result => console.log('Result:', result))
  .catch(error => console.error('Error:', error.message));

// Output: Error: Operation timed out after 1000ms
```

## Enhanced Version with Custom Timeout Error

```javascript
class TimeoutError extends Error {
  constructor(message, timeoutMs) {
    super(message);
    this.name = 'TimeoutError';
    this.timeoutMs = timeoutMs;
    this.code = 'TIMEOUT';
  }
}

function withTimeout(promise, timeoutMs, timeoutError = null) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      const error = timeoutError || new TimeoutError(
        `Operation timed out after ${timeoutMs}ms`,
        timeoutMs
      );
      reject(error);
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

// Usage
const fetchWithTimeout = async (url, timeout = 5000) => {
  return withTimeout(
    fetch(url),
    timeout,
    new TimeoutError(`Request to ${url} timed out`, timeout)
  );
};

fetchWithTimeout('https://api.example.com/data', 3000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error instanceof TimeoutError) {
      console.error(`Request failed: ${error.message}`);
    } else {
      console.error('Request failed:', error);
    }
  });
```

## Generic Async Function Wrapper

```javascript
function timeoutWrapper(timeoutMs, operation, ...args) {
  return withTimeout(
    operation(...args),
    timeoutMs,
    new TimeoutError(`Operation timed out after ${timeoutMs}ms`, timeoutMs)
  );
}

// Usage examples
const apiCall = async (endpoint) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
  return `Data from ${endpoint}`;
};

// Different timeout values for different operations
timeoutWrapper(2000, apiCall, '/users')
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

timeoutWrapper(10000, apiCall, '/heavy-data')
  .then(result => console.log(result))
  .catch(error => console.error(error.message));
```

## Utility with Multiple Operations

```javascript
class TimeoutManager {
  constructor(defaultTimeout = 5000) {
    this.defaultTimeout = defaultTimeout;
  }

  async execute(operation, timeout = this.defaultTimeout, ...args) {
    return withTimeout(
      operation(...args),
      timeout,
      new TimeoutError(`Operation timed out after ${timeout}ms`, timeout)
    );
  }

  async executeAll(operations, timeout = this.defaultTimeout) {
    const promises = operations.map(op => 
      withTimeout(op(), timeout, new TimeoutError(`Operation timed out after ${timeout}ms`, timeout))
    );
    
    return Promise.allSettled(promises).then(results => {
      return results.map((result, index) => ({
        index,
        status: result.status,
        value: result.status === 'fulfilled' ? result.value : null,
        reason: result.status === 'rejected' ? result.reason : null
      }));
    });
  }

  withTimeout(promise, timeout = this.defaultTimeout) {
    return withTimeout(
      promise,
      timeout,
      new TimeoutError(`Operation timed out after ${timeout}ms`, timeout)
    );
  }
}

// Usage
const timeoutManager = new TimeoutManager(3000);

const operations = [
  () => new Promise(resolve => setTimeout(() => resolve('Fast'), 1000)),
  () => new Promise(resolve => setTimeout(() => resolve('Medium'), 2500)),
  () => new Promise((_, reject) => setTimeout(() => reject(new Error('Failed')), 4000))
];

timeoutManager.executeAll(operations)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(`Operation ${result.index}: Success - ${result.value}`);
      } else {
        console.log(`Operation ${result.index}: Failed - ${result.reason.message}`);
      }
    });
  });

// Execute single operation
timeoutManager.execute(
  async (userId) => {
    // Simulate database query
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `User data for ${userId}`;
  },
  1500,
  '123'
).catch(error => console.error('User fetch failed:', error.message));
```

## Decorator-Style Wrapper for Functions

```javascript
function timeoutDecorator(timeoutMs = 5000) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args) {
      try {
        return await withTimeout(
          originalMethod.apply(this, args),
          timeoutMs,
          new TimeoutError(
            `${propertyKey} timed out after ${timeoutMs}ms`,
            timeoutMs
          )
        );
      } catch (error) {
        if (error instanceof TimeoutError) {
          console.warn(`Method ${propertyKey} timed out`);
        }
        throw error;
      }
    };
    
    return descriptor;
  };
}

// Usage with class methods
class ApiService {
  @timeoutDecorator(3000)
  async fetchUsers() {
    // Simulate slow API call
    await new Promise(resolve => setTimeout(resolve, 4000));
    return ['user1', 'user2', 'user3'];
  }

  @timeoutDecorator(10000)
  async fetchLargeDataset() {
    await new Promise(resolve => setTimeout(resolve, 8000));
    return Array.from({length: 10000}, (_, i) => `item-${i}`);
  }
}

const api = new ApiService();

api.fetchUsers()
  .then(users => console.log('Users:', users))
  .catch(error => console.error('Failed to fetch users:', error.message));

api.fetchLargeDataset()
  .then(data => console.log('Dataset size:', data.length))
  .catch(error => console.error('Failed to fetch dataset:', error.message));
```

## Key Features

1. **Promise.race()**: Uses `Promise.race()` to race the original promise against the timeout promise
2. **Custom Error**: `TimeoutError` class for easy identification of timeout errors
3. **Flexible**: Works with any async operation or Promise
4. **Configurable**: Custom timeout durations and error messages
5. **Decorator Support**: Can be used as a method decorator for classes
6. **Batch Operations**: `TimeoutManager` for handling multiple operations

## Usage Tips

- Use short timeouts (100-500ms) for UI responsiveness
- Use moderate timeouts (1-5s) for API calls
- Use longer timeouts (10s+) for heavy computations
- Always handle `TimeoutError` separately from other errors
- Consider exponential backoff for retry logic with timeouts

This implementation provides a robust, reusable timeout mechanism for any async operation in JavaScript.

- Implement a concurrency limiter that runs at most k async tasks at once.  
- Implement a task queue that ensures FIFO execution of async jobs.  
- Design a cancellable async operation; show approaches using AbortController or cooperative cancellation flags.

## Nodejs interview scenario based question 
Perfect — **scenario-based questions** are exactly what interviewers love to ask for Node.js roles, especially when testing problem-solving.
Here’s a curated list of **real-world Node.js API scenario-based interview questions** you can practice with:

---

## 🔧 **Scenario 1: API Crashes on Database Failure**

**Question:**
You have a `/users` API that fetches users from MongoDB.
If MongoDB goes down, the API crashes and the server stops responding.
What changes would you make so the server still runs and returns a proper error?

---

## 🧠 **Scenario 2: High API Latency**

**Question:**
Your `/orders` API takes 6 seconds to respond because it fetches user info, product info, and shipping info sequentially.
How would you optimize this?

💡 **Hint:** They expect you to mention **parallel execution (Promise.all)**, caching, or DB query optimization.

---

## 🔐 **Scenario 3: Insecure API**

**Question:**
Your `/profile` API sends back the entire user object, including password hashes and tokens.
What would you do to secure this endpoint?

💡 **Hint:** They expect **response filtering** (send only necessary fields), using **projection in DB queries**, or removing sensitive data before sending.

---

## 🔄 **Scenario 4: Race Condition**

**Question:**
Your `/wallet/add-money` API sometimes adds money twice if the user clicks the button quickly.
How would you prevent this?

💡 **Hint:** They expect **database-level transactions**, **locks**, or **idempotency keys**.

---

## 🛑 **Scenario 5: Blocking Code**

**Question:**
Your API suddenly becomes slow under load.
On investigation, you find a function that reads a file synchronously (`fs.readFileSync`) on every request.
What would you do?

💡 **Hint:** Use **async/non-blocking code** (`fs.promises.readFile`), cache static data, move heavy tasks to background jobs.

---

## ⚠ **Scenario 6: Unhandled Promise Rejections**

**Question:**
A developer forgot to handle promise rejections in the code.
This causes `UnhandledPromiseRejectionWarning` and eventually crashes the app.
How do you catch all unhandled rejections?

💡 **Hint:**

```js
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err);
  // Gracefully shutdown or restart process
});
```

---

## 🛠 **Scenario 7: Deployment Issue**

**Question:**
Your Node.js app works fine locally but crashes on production with `PORT already in use`.
How do you fix it?

💡 **Hint:**

* Make sure you’re using `process.env.PORT || 3000`.
* Check for multiple app.listen() calls.
* Use process manager like **PM2** to handle multiple instances properly.

---

## ⚡ **Scenario 8: Scaling**

**Question:**
Your API works fine with 10 users but crashes when 1,000 users hit it at the same time.
What steps would you take to make it scalable?

💡 **Hint:**

* Enable **Node.js clustering** or deploy multiple instances behind a load balancer.
* Use **connection pooling** for DB.
* Add caching (Redis).
* Monitor memory/CPU usage.

---

## 📜 **Scenario 9: Logging & Debugging**

**Question:**
Your client says some requests randomly fail, but you can’t reproduce it locally.
How do you debug this in production?

💡 **Hint:**

* Add request/response logging (Winston, Morgan).
* Capture errors and send to monitoring service (Sentry, DataDog).
* Use correlation IDs to trace requests.

---

## 📦 **Scenario 10: Large File Upload**

**Question:**
Your API needs to handle 1GB video file uploads, but requests timeout.
What’s the best approach?

💡 **Hint:**

* Use streaming (`req.pipe()` to write to file or cloud storage).
* Use pre-signed URLs (S3) for direct upload.
* Increase `body-parser` limit only if necessary (but avoid memory bloat).

---

Would you like me to prepare a **practice test** where I give you 3–4 of these scenarios in detail (with some code snippets), and you try to solve them — then I review your answers?
This will feel like a real interview round.
- Yes

Great! 🚀 Let’s turn this into a **mock Node.js interview practice test** with **scenario-based questions**.
I’ll give you **4 realistic problems** — some with code snippets — and you can try to solve them.
Then, I’ll review your answers like an interviewer would.

---

## 🧑‍💻 **Node.js Scenario-Based Mock Test**

---

### **Scenario 1: API Crash on DB Failure**

You have the following Express API:

```js
app.get('/users', async (req, res) => {
  const users = await User.find(); // MongoDB query
  res.json(users);
});
```

Problem:
When the database is down, this API crashes the whole server.

**Your Task:**
Explain what changes you’d make to **avoid crashing** and return a proper response to the client.

---

### **Scenario 2: Slow Response**

Your `/orders` API takes **6 seconds** to respond because it fetches user info, product info, and shipping info sequentially:

```js
app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findById(order.userId);
  const product = await Product.findById(order.productId);
  const shipping = await Shipping.findById(order.shippingId);
  
  res.json({ order, user, product, shipping });
});
```

**Your Task:**
Rewrite this code to **reduce response time**.

---

### **Scenario 3: Race Condition**

Your `/wallet/add-money` API sometimes **adds money twice** if a user clicks quickly.

```js
app.post('/wallet/add-money', async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.body.userId });
  wallet.balance += req.body.amount;
  await wallet.save();
  
  res.json({ balance: wallet.balance });
});
```

**Your Task:**
Explain how to **make this endpoint idempotent** and prevent double updates.

---

### **Scenario 4: Large File Upload**

Your API allows uploading large videos (up to 1GB), but when users upload, you get **"PayloadTooLargeError"** and server crashes.

```js
app.post('/upload', upload.single('video'), async (req, res) => {
  // video processing
  res.json({ message: 'Uploaded successfully' });
});
```

**Your Task:**
Suggest a **better design** for handling such large uploads without crashing the server.

---

---

Would you like to try answering **all 4 scenarios together** (like a real interview round)
OR
Do you want me to guide you through **Scenario 1 first**, review your answer, then move to Scenario 2 (step by step)?


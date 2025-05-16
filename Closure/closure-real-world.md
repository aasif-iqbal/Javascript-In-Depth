Closures are a fundamental concept in JavaScript and Node.js, allowing functions to retain access to their scope even after the outer function has finished executing. Here are **real-world examples of closures in Node.js**:

---

### 1. **Middleware Function in Express.js**

Closures help maintain state between middleware setups.

```js
function roleBasedAccess(role) {
  return function (req, res, next) {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}

// Usage
app.get('/admin', roleBasedAccess('admin'), (req, res) => {
  res.send('Welcome, Admin!');
});
```

**Closure used:** The inner middleware function retains access to the `role` variable even after `roleBasedAccess` has returned.

---

### 2. **Factory Function for Logging with Context**

Creating loggers with different tags or levels.

```js
function createLogger(context) {
  return function (message) {
    console.log(`[${context}] ${message}`);
  };
}

const dbLogger = createLogger('DB');
const apiLogger = createLogger('API');

dbLogger('Connected to database');
apiLogger('Received request');
```

**Closure used:** `context` is preserved in the returned function.

---

### 3. **Caching with Closures**

Useful for memoization or reducing redundant DB/API calls.

```js
function cacheFunction(fn) {
  const cache = {};

  return function (key) {
    if (cache[key]) {
      console.log('Returning from cache');
      return cache[key];
    } else {
      const result = fn(key);
      cache[key] = result;
      return result;
    }
  };
}

const slowFunction = (n) => {
  console.log('Computing...');
  return n * 2;
};

const cachedFunction = cacheFunction(slowFunction);

cachedFunction(5); // Computing...
cachedFunction(5); // Returning from cache
```

---

### 4. **Private Variables in Classes/Modules**

Using closures to emulate private state.

```js
function Counter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = Counter();
console.log(counter.increment()); // 1
console.log(counter.getCount());  // 1
```

**Closure used:** `count` is private and only accessible via the returned functions.

---

### 5. **SetTimeout or Async Callbacks**

Closures preserve variables in async logic:

```js
function delayMessage(msg, delay) {
  setTimeout(function () {
    console.log(msg);
  }, delay);
}

delayMessage('Hello after 1 second', 1000);
```

Even after `delayMessage` has finished executing, the `setTimeout` callback retains access to `msg`.

---

### 6. **Event Emitter with Bound Context**

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

function registerUserHandler(userId) {
  emitter.on('message', function (message) {
    console.log(`User ${userId} received: ${message}`);
  });
}

registerUserHandler(42);

emitter.emit('message', 'Welcome!');
```

The inner event listener function uses closure to remember the `userId`.

---

If you want, I can also show how closures help avoid memory leaks or manage resources effectively in long-running Node.js apps.

Great — let's explore how **closures in Node.js** can help manage **resources efficiently** and **avoid memory leaks**, especially in long-running apps like servers or microservices.

---

## ⚠️ 1. **Avoiding Memory Leaks with Closures**

### ❌ Problem: Global/Shared State That Keeps Growing

In apps that run indefinitely (e.g., servers), accidentally holding references to large objects can cause memory to grow unchecked.

### ✅ Solution: Encapsulate state with closures

```js
function createRequestTracker() {
  const requestCount = new Map();

  return {
    track(ip) {
      const count = requestCount.get(ip) || 0;
      requestCount.set(ip, count + 1);
    },
    getCount(ip) {
      return requestCount.get(ip) || 0;
    },
    clear(ip) {
      requestCount.delete(ip);
    }
  };
}

const tracker = createRequestTracker();

// Only IPs that hit the endpoint are tracked — avoids holding unnecessary references
app.get('/', (req, res) => {
  tracker.track(req.ip);
  res.send(`You've visited ${tracker.getCount(req.ip)} times`);
});
```

**Why it helps:**
The `requestCount` map is only accessible through the closure, so we have full control over what data we keep in memory and when to clean it up — helping avoid leaks.

---

## 🔄 2. **Managing DB Connections or Heavy Resources**

A common pitfall: holding DB connections open unnecessarily.

### ✅ Use closures to limit scope and reuse smartly:

```js
function createDBConnector() {
  let connection = null;

  return async function getConnection() {
    if (!connection) {
      connection = await connectToDB(); // Assume connectToDB is a real async function
      console.log('New DB connection created');
    }
    return connection;
  };
}

const getDBConnection = createDBConnector();

app.get('/data', async (req, res) => {
  const db = await getDBConnection();
  const data = await db.query('SELECT * FROM items');
  res.json(data);
});
```

**Why it helps:**

* Limits the DB connection to a single, reusable instance.
* Prevents creating new connections per request, which could exhaust the pool and cause a crash.

---

## 📅 3. **Closures in Scheduled Jobs (Cron/Timers)**

If you're using `setInterval` or cron jobs, leaking variables into the global scope can eat up memory.

### ✅ Closure keeps job-specific state private

```js
function startReminderJob(userId) {
  let reminderCount = 0;

  return setInterval(() => {
    reminderCount++;
    console.log(`Reminder ${reminderCount} sent to user ${userId}`);

    if (reminderCount >= 3) {
      console.log(`Stopping reminders for ${userId}`);
      clearInterval(this); // Clean up
    }
  }, 10000);
}

startReminderJob('user123');
```

**Why it helps:**
Each job has its own `reminderCount` — no shared global state, which prevents accidental retention of old jobs/data.

---

## 🧹 4. **EventEmitter Listener Cleanup with Closures**

Leaking listeners can cause `Memory Leak Detected` warnings in Node.js.

### ✅ Encapsulate and detach listeners with closures:

```js
function listenOnce(emitter, eventName, callback) {
  function handler(...args) {
    callback(...args);
    emitter.removeListener(eventName, handler); // clean up
  }

  emitter.on(eventName, handler);
}

// Usage
listenOnce(process, 'warning', (msg) => {
  console.warn('Handled warning:', msg);
});
```

**Why it helps:**
Closures preserve the `handler` reference, so it can be removed after first execution — avoiding accumulation of listeners.

---

## ✅ Best Practices to Prevent Leaks with Closures in Node.js

| Problem                              | Solution                                       |
| ------------------------------------ | ---------------------------------------------- |
| Global/shared variables              | Encapsulate in closures to limit scope         |
| Long-lived timers/listeners          | Use closure to isolate and clean them up       |
| Caching data indefinitely            | Use LRU/memoization with TTL and closure state |
| Holding references to unused objects | Allow garbage collection by restricting scope  |

---

Would you like a **memory profiling example** using `heapdump` or Chrome DevTools to **see closure-related leaks in action**?

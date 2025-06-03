## ✅ What Does "I/O-Bound" Mean?

**I/O-bound** (Input/Output-bound) refers to operations that are **limited by waiting for external systems**, rather than CPU power.

### 🔹 Common I/O-bound operations:

* Reading/writing to disk
* Making HTTP/API requests
* Interacting with a database
* Accessing a file system
* Sending emails

These tasks don’t require much CPU, but they take **time** because you’re waiting on something external (disk, network, DB, etc.).

---

## 💡 Why Use Async APIs (Promises / async-await)?

In Node.js, **non-blocking async APIs** (based on Promises or `async/await`) let your application:

* Start an I/O operation (like reading a file)
* While waiting, **do other work** instead of sitting idle
* Get notified (via a callback, `.then()`, or `await`) when the I/O operation finishes

This makes your app **fast and efficient**, especially under heavy load.

---

## 🚫 Blocking (Synchronous) vs ✅ Non-blocking (Async)

### ❌ Synchronous Example (Blocking)

```js
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
```

* This **blocks** the main thread — nothing else can happen while reading the file.

---

### ✅ Asynchronous Example (Non-blocking)

```js
const fs = require('fs/promises');

async function readFile() {
  const data = await fs.readFile('file.txt', 'utf8');
  console.log(data);
}

readFile();
```

* The I/O operation runs **in the background**, allowing the event loop to continue.

---

## 📌 When to Use Async APIs?

You should **always use async APIs** for:

| Task Type                  | Async Example                       |
| -------------------------- | ----------------------------------- |
| File system                | `fs.promises.readFile()`            |
| HTTP requests              | `fetch()` or `axios.get()`          |
| Databases (MongoDB, MySQL) | `.find()`, `.query()` with Promises |
| Timers                     | `setTimeout()`, `setInterval()`     |
| External APIs              | `await fetch(url)`                  |

---

## 🧠 Summary

* **I/O-bound** = slow because it waits for external resources
* Use **Promises** or **`async/await`** to avoid blocking the main thread
* Makes your app **scalable and responsive**

---

Would you like a real-world example comparing sync vs async in a simple Node.js server?

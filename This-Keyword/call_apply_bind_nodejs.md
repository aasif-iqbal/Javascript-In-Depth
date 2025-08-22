## In nodejs, show me the use case of call(), apply() and bind().

Perfect 👌 Let’s move from just theory → **real Node.js use cases** where `call()`, `apply()`, and `bind()` actually help.

---

# 🔹 1. `call()` in **Express Middleware**

Sometimes in middleware we want to reuse logic across different contexts (users, requests, etc.).

```js
const express = require("express");
const app = express();

function sendResponse(status, message) {
  this.res.status(status).json({ message });
}

// Middleware
app.use((req, res, next) => {
  const context = { req, res }; // set `this` context
  sendResponse.call(context, 200, "Middleware executed with call()");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

✅ **Why `call()` here?**
We create a context `{ req, res }` and pass it to `sendResponse` instead of making a separate function.

---

# 🔹 2. `apply()` in **EventEmitter (dynamic arguments)**

When triggering events, sometimes we don’t know how many arguments we’ll have.

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

function logEvent() {
  console.log("Event triggered with args:", ...arguments);
}

emitter.on("customEvent", function () {
  // Use apply() to forward args to logEvent
  logEvent.apply(null, arguments);
});

// Emit event with dynamic args
emitter.emit("customEvent", "Aasif", "Iqbal", "Node.js");
```

Output:

```
Event triggered with args: Aasif Iqbal Node.js
```

✅ **Why `apply()` here?**
We don’t know how many arguments `emit()` will get, so we pass them as an array-like object (`arguments`).

---

# 🔹 3. `bind()` in **Asynchronous Callbacks**

Classic problem: losing `this` inside callbacks.

```js
const fs = require("fs");

class FileReader {
  constructor(file) {
    this.file = file;
  }

  readFile() {
    fs.readFile(this.file, "utf8", this.onRead.bind(this)); 
    // bind ensures `this` points to the FileReader instance
  }

  onRead(err, data) {
    if (err) return console.error("Error:", err);
    console.log(`File ${this.file} content:`, data);
  }
}

const reader = new FileReader("test.txt");
reader.readFile();
```

✅ **Why `bind()` here?**
Without `bind`, `this.file` would be `undefined` because Node’s `fs.readFile` calls the callback without your class’s context.

---

# 🚀 Summary in Node.js World

* **`call()`** → Reuse methods with a different context (e.g., middleware, custom helpers).
* **`apply()`** → Forward dynamic args (e.g., `EventEmitter`, function forwarding).
* **`bind()`** → Fix `this` for async callbacks (e.g., `fs`, `setTimeout`, event handlers).

---

Would you like me to also give you a **combined mini-project demo** (like a tiny Express app that uses all three in different parts) so you can practice?

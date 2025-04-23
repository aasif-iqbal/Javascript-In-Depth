# What is a memory leak in Node.js, and how do you detect and fix it?

Great question — and very important for maintaining healthy, performant apps in Node.js!

---

## 🧠 What is a **Memory Leak** in Node.js?

A **memory leak** happens when your application **keeps holding onto memory** that it no longer needs — and **doesn’t release it** for garbage collection.

> Over time, these leaks **build up**, leading to performance drops, crashes, or out-of-memory errors.

---

## 🔍 Common Causes of Memory Leaks

| Cause                            | Example                                                                 |
|----------------------------------|-------------------------------------------------------------------------|
| **Global variables**             | Variables that live forever unless cleared                             |
| **Event listeners not removed**  | Using `.on()` but never calling `.off()` or `.removeListener()`        |
| **Closures holding references**  | Functions that still refer to unused data                              |
| **Cache growing indefinitely**   | E.g., large object stores, like LRU caches, without cleanup strategy   |
| **Forgotten timers or intervals**| `setInterval()` without `clearInterval()`                              |

---

## 🧪 How to Detect Memory Leaks

### 🔹 1. **Built-in Tools:**

- Use **`process.memoryUsage()`**:
```js
console.log(process.memoryUsage());
```

- Shows heap usage, RSS, external memory, etc.

---

### 🔹 2. **Chrome DevTools + `inspect` flag**  
Launch your app like this:

```bash
node --inspect index.js
```

Then:
1. Open Chrome
2. Visit: `chrome://inspect`
3. Click "Inspect" → Go to **Memory tab**
4. Take **heap snapshots** over time

---

### 🔹 3. **Third-party tools**

- [`clinic`](https://clinicjs.org/) – Analyze performance & memory
- [`heapdump`](https://www.npmjs.com/package/heapdump) – Generate memory snapshots
- [`memwatch-next`](https://www.npmjs.com/package/memwatch-next) – Detect leaks at runtime

---

## 🛠 How to Fix Memory Leaks

| Step | What to Do                                 |
|------|---------------------------------------------|
| ✅ Identify       | Use DevTools, `process.memoryUsage`, heap snapshots |
| 🧹 Clean up       | Remove unused variables, objects, or listeners       |
| 🧼 Clear Timers   | Use `clearInterval`, `clearTimeout`                  |
| 🧠 Scope Check    | Minimize long-living closures or global variables    |
| 💡 Use WeakMaps   | For storing objects that can be garbage collected    |

---

### 🧪 Example: Event Listener Leak

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

function onMessage(msg) {
  console.log('Received:', msg);
}

// ❌ Never removed
emitter.on('data', onMessage);

// ✅ Fix: Remove listener when done
emitter.off('data', onMessage);
```

---

### 🚩 Bonus: Memory Leak Red Flags

- App gets **slower over time**
- Increasing **heap memory in monitoring tools**
- Frequent **GC (Garbage Collection)** cycles
- App **crashes with "Heap out of memory"**

---

Want me to show you a real **leak vs fixed code comparison**, or how to use `heapdump` for analysis?

Perfect! Let's walk through a **real-world memory leak scenario in Node.js**, and then fix it using `heapdump` and best practices.

---

## ⚠️ Example: **Memory Leak Scenario**

### ❌ Problem: Leaking objects stored in an array

```js
// memory-leak.js
const http = require('http');

const leakedArray = []; // ⛔ This grows endlessly

http.createServer((req, res) => {
  leakedArray.push({ date: new Date(), url: req.url }); // 🧠 Old data stays in memory
  res.end('Hello, World!');
}).listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

> Every request adds a new object to `leakedArray`, but we **never remove** anything. Memory keeps growing!

---

## 🧪 Step 1: Install `heapdump`

```bash
npm install heapdump
```

---

## 📸 Step 2: Take Heap Snapshot

Modify the code to capture a snapshot:

```js
const http = require('http');
const heapdump = require('heapdump');

const leakedArray = [];

http.createServer((req, res) => {
  if (req.url === '/heap') {
    const file = `./heap-${Date.now()}.heapsnapshot`;
    heapdump.writeSnapshot(file, (err, filename) => {
      res.end(`Snapshot written to ${filename}`);
    });
  } else {
    leakedArray.push({ date: new Date(), url: req.url });
    res.end('Hello, World!');
  }
}).listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## 🔍 Step 3: Analyze Heap

1. Run the server:  
   ```bash
   node memory-leak.js
   ```

2. Hit it multiple times:
   ```
   curl http://localhost:3000/
   ```

3. Capture snapshot:
   ```
   curl http://localhost:3000/heap
   ```

4. Open Chrome → `chrome://inspect` → Memory tab → Load the `.heapsnapshot` file.

You’ll see `leakedArray` growing with each request. 👀

---

## ✅ Fix the Memory Leak

Let’s limit the size or clear unused memory:

```js
const MAX_ENTRIES = 100;

http.createServer((req, res) => {
  if (leakedArray.length > MAX_ENTRIES) {
    leakedArray.shift(); // Remove oldest entry
  }
  leakedArray.push({ date: new Date(), url: req.url });
  res.end('Hello, World!');
});
```

Or better — don’t store at all if not needed!

---

## ✅ Bonus: Tips to Avoid Leaks

- Clean up `setInterval` or `setTimeout`
- Remove unused event listeners
- Use tools like:
  - `clinic doctor` for performance & memory analysis
  - `node --inspect` + Chrome DevTools for profiling

---

Would you like me to send you a **working GitHub repo example** of this leak/fix setup or help analyze a leak in your project?
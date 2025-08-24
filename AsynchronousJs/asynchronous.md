
## ✅ Tasks That Must Be Done Asynchronously

### 1. **I/O Operations**

* **File system** (read/write large files, streams)
  → `fs.readFile`, `fs.createReadStream`, etc.
* **Network requests**
  → `fetch`, `axios`, `http.request`, WebSockets.
* **Database queries**
  → MongoDB, MySQL, PostgreSQL queries.

👉 Reason: I/O is slow (ms to seconds). Doing it synchronously blocks the single thread.

---

### 2. **Timers & Scheduling**

* `setTimeout`, `setInterval`, `setImmediate`, `process.nextTick`
  👉 Used for deferring tasks or scheduling execution.

---

### 3. **Cryptography**

* Password hashing, encryption/decryption
  → `bcrypt.hash()`, `crypto.pbkdf2()`
  👉 Heavy CPU work, should be async to avoid blocking.

---

### 4. **Compression / Decompression**

* Gzip, Brotli, zlib compression
  👉 Often used in HTTP servers, async is required for large payloads.

---

### 5. **Child Processes & Worker Threads**

* Running external scripts, shell commands
  → `child_process.exec`, `spawn`, Worker Threads
  👉 Long-running CPU/OS tasks should be async.

---

### 6. **User Input & Events (Browser)**

* Mouse clicks, key presses, scrolling, DOM events
  👉 Triggered asynchronously in the event loop.

---

### 7. **Message Queues / Pub-Sub**

* RabbitMQ, Kafka, SQS, Redis Pub/Sub
  👉 Naturally async (wait for messages).

---

### 8. **Animation & Rendering (Browser)**

* `requestAnimationFrame`
  👉 Runs async, synchronized with screen refresh.

---

### 9. **Streams**

* File streams, network streams, process.stdin/stdout
  👉 Data comes in chunks asynchronously.

---

### 10. **Background Tasks**

* Notifications, email sending, logging to external service
  👉 Should be async because they don’t block main execution.

---

## 🚫 Examples of Tasks That Should *NOT* Be Async

* Simple math (`2 + 2`)
* JSON parsing small objects
* Looping small arrays
* Variable assignments

(These are fast and async would add unnecessary overhead.)

---

✅ **Rule of Thumb:**
If the task involves **waiting (I/O, events, network)** or **heavy computation (crypto, compression, CPU-bound)** → do it asynchronously.

---

Do you want me to also show you **a visual event loop lifecycle** (microtasks, macrotasks, I/O callbacks) with real code examples so you can confidently explain this in an interview?

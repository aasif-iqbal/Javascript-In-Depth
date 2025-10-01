Got it 👍 Let’s go step by step so you clearly understand **Cluster in Node.js**.

---

# 🚀 **What is Cluster in Node.js?**

* By default, **Node.js runs in a single process** (one thread running the event loop).
* That means, even if your machine has **8 CPU cores**, Node.js **uses only 1 core**.
* The **Cluster module** allows you to **fork multiple Node.js processes (workers)** that can **share the same server port**.
* This way, your app can **utilize all CPU cores**, improving throughput & scalability.

---

# ⚙️ **How Cluster Works**

1. **Master process** (primary) starts first.
2. Master forks **worker processes** (one per CPU core usually).
3. Workers are independent Node.js processes.
4. The **OS kernel load-balances incoming requests** across workers.
5. If one worker dies → master can spawn a new one.

---

# 🔹 Simple Example

```js
import cluster from "cluster";
import http from "http";
import os from "os";

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Fork workers equal to CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died, starting a new one...`);
    cluster.fork();
  });
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```

✅ Run:

```bash
node app.js
```

Open **[http://localhost:3000](http://localhost:3000)** multiple times → you’ll see responses from different worker PIDs.

---

# 🔑 **Key Points about Cluster**

* **Workers are processes**, not threads.
* Each worker has its own **event loop, memory, V8 instance**.
* Workers **don’t share memory directly**, but can communicate via **IPC (inter-process communication)** using `process.send()`.
* If one worker crashes, it doesn’t affect others (higher reliability).

---

# 📊 **When to Use Cluster**

✔️ Best for **I/O-bound applications** (e.g., web servers, APIs).
✔️ Use when you want to **scale across all CPU cores**.
✔️ Good for **stateless services** (e.g., REST APIs).

⚠️ Not ideal for **stateful apps** (e.g., in-memory sessions) unless you use Redis or another shared store.

---

# 🧠 Analogy

Think of **Node.js single process** like **one cashier in a supermarket**.

* Even if there are 10 counters, only **1 is open** → long queues.
* **Cluster** opens all 10 counters (workers).
* Customers (requests) get distributed among available counters → faster service.

---

👉 Do you want me to also explain **how workers communicate with each other and with the master** (using IPC in Node.js cluster)?

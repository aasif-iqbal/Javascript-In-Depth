## How does nodejs handle multiple cpu core.

Node.js is single-threaded by default, but it can leverage multiple CPU cores using the **Cluster** module and **Worker Threads**. Here’s how:

---

### **1. Using the Cluster Module**
The **Cluster** module allows Node.js to spawn multiple processes (workers) that share the same server port. Each worker runs independently, effectively utilizing multiple CPU cores.

#### **Example: Creating a Cluster**
```js
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master process ${process.pid} is running`);

    // Fork workers equal to the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died, restarting...`);
        cluster.fork(); // Restart the worker
    });
} else {
    // Worker processes handle HTTP requests
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from Worker ${process.pid}\n`);
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}
```
#### **How It Works:**
- The **master process** creates multiple worker processes, each handling requests independently.
- If a worker crashes, the master restarts it.
- Workers share the same port but handle requests in parallel.

---

### **2. Using Worker Threads**
The **Worker Threads** module allows running JavaScript in separate threads for CPU-intensive tasks.

#### **Example: Using Worker Threads**
```js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    console.log(`Main thread: ${process.pid}`);
    const worker = new Worker(__filename);
    
    worker.on('message', (msg) => console.log(`Worker says: ${msg}`));
    worker.postMessage('Hello Worker');
} else {
    parentPort.on('message', (msg) => {
        console.log(`Worker received: ${msg}`);
        parentPort.postMessage('Hello Main Thread');
    });
}
```
#### **When to Use Worker Threads?**
- When you need to perform **CPU-intensive operations** (e.g., image processing, cryptography, data parsing).
- Unlike the **Cluster** module, worker threads share memory and communicate via messages.

---

### **Choosing Between Cluster and Worker Threads**
| Feature | Cluster | Worker Threads |
|---------|--------|----------------|
| Processes or Threads? | Multiple processes | Multiple threads |
| Shared Memory? | No | Yes |
| Best for? | Handling multiple requests (e.g., web servers) | CPU-heavy tasks (e.g., computations, large file processing) |
| Communication | Inter-process messaging | Message passing with shared memory |

---

### **Conclusion**
- **Cluster** is ideal for scaling web applications across multiple CPU cores.
- **Worker Threads** is better for CPU-intensive tasks where you need to share memory between threads.
- Both can be combined depending on your needs.

Would you like a specific implementation for your Node.js app?
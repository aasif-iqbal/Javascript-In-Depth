import cluster from "node:cluster";
import express from "express";
// console.log(cluster.isPrimary); // in old version:isMaster
import { availableParallelism } from 'node:os';

process.env.UV_THREADPOOL_SIZE = 1; // every child in cluster one thread pool is avilable

import crypto from "node:crypto";

const numCPUs = availableParallelism();
console.log("Mac-Cpu:",numCPUs);
// is the file being executed in Master mode
if (cluster.isPrimary) {
    // Cause index.js to be executed *again* but in child mode
    cluster.fork();   // it will create one child
    cluster.fork();   // it will create one child
    cluster.fork();   // it will create one child
    cluster.fork();   // it will create one child
    cluster.fork();   // it will create one child
    cluster.fork();   // it will create one child
} else {
    // i'm child, act like server
  let app = express();
  let PORT = 3000;
  // app.use();

  app.get("/", (req, res) => {
    //5sec - wait for 5 sec
    doWork(5000);
    res.send("Health test");

    // open crome browser -> network
    // http://localhost:3000/  - tab 1 ,it takes 10ms open
    // http://localhost:3000/  - tab 2 ,it takes 66ms open
  });

  // blocking entire event-loop by doWork()
  function doWork(duration) {
    const start = Date.now();

    while (Date.now - start < duration) {
      //simulation - to do single thread busy
    }
  }

  app.get('/real-simulation', (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send('simulation started..')
    });
  });

  console.log("Time:", Date.now());

  app.listen(PORT, () => {
    console.log(`app is listen on port:${PORT}`);
  });
}
// nodejs - single thread - means single instance
// cluster - multiple instance in one computer
// cluster manager is responsiable for monitoring the health of each of these individual instance

// - cluster manager start them, stop them, send them data, restart
// when we create cluster every single child has their own thread pool
/*


                    ----> [single thread - {Node server}]    
                    |    
cluster manager -------> [single thread - {Node server}]
                    |
                    ----> [single thread - {Node server}]


*/

/*

ab - Apache Beanchmark or ApacheBench

one child with one thread, how long it takes to process one incoming request.
cmd > ab -c 1 -n 1 localhost:3000/real-simulation
that means 1 request with concurrency of 1. 

*/ 
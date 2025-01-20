## Event Loop execution

```js
const promise = new Promise((resolve, reject) => {
  
  console.log(1);
  setTimeout(function() {
    console.log('timer start');
    resolve('success');
    console.log('timer end');
  }, 0);
  console.log('2');
});

promise.then((res) => {
  console.log(res);
});

console.log(4);
```
output
```lua
1
2
4
timer start
timer end
success
```

2.
```js
console.log("Start of the program");

// Simulating an asynchronous operation using setTimeout
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);

// Adding another asynchronous task with a different timeout
setTimeout(() => {
  console.log("Executed after 1 second");
}, 1000);

// Using process.nextTick to queue a microtask
process.nextTick(() => {
  console.log("Executed in process.nextTick");
});

// A simple synchronous task
console.log("Synchronous task running");

// Adding a Promise to queue a microtask
Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("End of the program");
```
output:
```lua
Start of the program
Synchronous task running
End of the program
Executed in process.nextTick
Promise resolved
Executed after 1 second
Executed after 2 seconds
```

3.
```js
console.log("Start of the program");

// Microtask 1
process.nextTick(() => {
  console.log("Microtask 1: process.nextTick");
});

// Asynchronous I/O operation (Macrotask)
setTimeout(() => {
  console.log("Macrotask 1: setTimeout (2 seconds)");

  // Nested microtask inside macrotask
  process.nextTick(() => {
    console.log("Microtask 2: process.nextTick inside setTimeout");
  });

  // Nested macrotask inside macrotask
  setTimeout(() => {
    console.log("Nested Macrotask 1: setTimeout inside setTimeout (1 second)");
  }, 1000);
}, 2000);

// Microtask 3: Promise
Promise.resolve().then(() => {
  console.log("Microtask 3: Promise resolved");

  // Nested microtask inside microtask
  process.nextTick(() => {
    console.log("Microtask 4: process.nextTick inside Promise");
  });

  // Nested macrotask inside microtask
  setTimeout(() => {
    console.log("Nested Macrotask 2: setTimeout inside Promise (1 second)");
  }, 1000);
});

// Another asynchronous I/O operation (Macrotask)
setTimeout(() => {
  console.log("Macrotask 2: setTimeout (1 second)");
}, 1000);

console.log("End of the program");
```
output:
```lua
Start of the program
End of the program
Microtask 1: process.nextTick
Microtask 3: Promise resolved
Microtask 4: process.nextTick inside Promise
Macrotask 2: setTimeout (1 second)
Nested Macrotask 2: setTimeout inside Promise (1 second)
Macrotask 1: setTimeout (2 seconds)
Microtask 2: process.nextTick inside setTimeout
Nested Macrotask 1: setTimeout inside setTimeout (1 second)
```

4.
```js
const fs = require("fs");

console.log("Start of the program");

// Synchronous task
console.log("Synchronous task 1");

// Microtask 1: process.nextTick
process.nextTick(() => {
  console.log("Microtask 1: process.nextTick");

  // Nested microtask inside microtask
  process.nextTick(() => {
    console.log("Microtask 2: Nested process.nextTick inside Microtask 1");
  });
});

// Promise to add microtasks
Promise.resolve()
  .then(() => {
    console.log("Microtask 3: Promise resolved");

    // Nested macrotask inside microtask
    setTimeout(() => {
      console.log("Macrotask 1: Nested setTimeout inside Promise (500ms)");
    }, 500);
  })
  .then(() => {
    console.log("Microtask 4: Chained promise resolved");
  });

// File system I/O (Macrotask)
fs.readFile(__filename, () => {
  console.log("Macrotask 2: File system readFile callback");

  // Nested setImmediate inside file system callback
  setImmediate(() => {
    console.log("Macrotask 3: Nested setImmediate inside readFile");
  });

  // Nested microtask inside file system callback
  process.nextTick(() => {
    console.log("Microtask 5: Nested process.nextTick inside readFile");
  });
});

// setTimeout with immediate execution
setTimeout(() => {
  console.log("Macrotask 4: setTimeout (0ms)");

  // Nested setImmediate inside setTimeout
  setImmediate(() => {
    console.log("Macrotask 5: Nested setImmediate inside setTimeout");
  });
}, 0);

// setImmediate (Macrotask)
setImmediate(() => {
  console.log("Macrotask 6: setImmediate");

  // Nested microtask inside setImmediate
  process.nextTick(() => {
    console.log("Microtask 6: Nested process.nextTick inside setImmediate");
  });

  // Nested setTimeout inside setImmediate
  setTimeout(() => {
    console.log("Macrotask 7: Nested setTimeout inside setImmediate (300ms)");
  }, 300);
});

console.log("End of the program");
```
Output:
```lua
Start of the program
Synchronous task 1
End of the program
Microtask 1: process.nextTick
Microtask 2: Nested process.nextTick inside Microtask 1
Microtask 3: Promise resolved
Microtask 4: Chained promise resolved
Macrotask 4: setTimeout (0ms)
Macrotask 6: setImmediate
Microtask 6: Nested process.nextTick inside setImmediate
Macrotask 5: Nested setImmediate inside setTimeout
Macrotask 2: File system readFile callback
Microtask 5: Nested process.nextTick inside readFile
Macrotask 3: Nested setImmediate inside readFile
Macrotask 7: Nested setTimeout inside setImmediate (300ms)
Macrotask 1: Nested setTimeout inside Promise (500ms)
```

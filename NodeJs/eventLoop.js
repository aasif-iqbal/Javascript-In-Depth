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

/*
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
*/ 
// Step:1
let leaks = [];
setInterval(() => {
  leaks.push(new Array(1000000).fill("data"));
  console.log("Leaking memory...", leaks.length);
}, 5000);

// step:2
// node --inspect index.js or in package.json "start": "node --inspect index.js"

// step:3
// chrome://inspect

// step:4
// DevTools → Remote Target (inspect) → Memory

// step:5
// Profile -> Heap Snapshot
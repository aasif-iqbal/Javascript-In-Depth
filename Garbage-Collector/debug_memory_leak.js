
// https://www.youtube.com/watch?v=hliOMEQRqf8&t=816s

// setInterval(()=>{
//   const {heap, heapTotal, heapUsed} = process.memoryUsage()
  
//   console.log(`heapTotal: ${heapTotal} heapUsed: ${heapUsed}`)
// }, 5000);

/*
heapTotal: 5820416 heapUsed: 3647928
heapTotal: 5820416 heapUsed: 4267904
heapTotal: 5820416 heapUsed: 4270896
heapTotal: 5820416 heapUsed: 4273936
heapTotal: 6082560 heapUsed: 4287616
*/ 

setInterval(() => {
  const used = process.memoryUsage();
  console.log(`Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}, 5000);

/*
Heap Used: 3.48 MB
Heap Used: 4.07 MB
Heap Used: 4.07 MB
Heap Used: 4.08 MB
Heap Used: 4.09 MB
Heap Used: 4.10 MB
Heap Used: 4.11 MB
Heap Used: 4.12 MB
Heap Used: 4.14 MB
*/
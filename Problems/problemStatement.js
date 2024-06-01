var a1 = [ {id: 1, value: 'kkr'}, {id: 2, value: 'csk'} ];
var a2 = [ {id: 1, value: 'mi'} ]; 

// Combine the arrays
var combinedArray = [...a1, ...a2];

// Use a Map to remove duplicates based on the `id` property
var idMap = new Map();

// Populate the map with objects, overwriting duplicates
combinedArray.forEach(item => idMap.set(item.id, item));

// Convert the map back to an array
var result = Array.from(idMap.values());

console.log(result);
/*
[
s  { id: 1, value: 'mi' },
  { id: 2, value: 'csk' }
]

*/

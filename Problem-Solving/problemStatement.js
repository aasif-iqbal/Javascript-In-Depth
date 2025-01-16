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
  { id: 1, value: 'mi' },
  { id: 2, value: 'csk' }
]
*/

// Without using new Map() methods

var a1 = [{id: 1, value: 'kkr'}, {id: 2, value: 'csk'}];
var a2 = [{id: 1, value: 'mi'}];

function mergeAndRemoveDuplicates(arr1, arr2) {
  // Combine both arrays
  const combined = [...arr1, ...arr2];
  
  // Use an object to track unique ids
  const uniqueItems = {};
  
  // Populate the object with unique items based on id
  combined.forEach(item => {
    uniqueItems[item.id] = item;
  });
  
  // Convert the unique items object back to an array
  return Object.values(uniqueItems);
}

var result = mergeAndRemoveDuplicates(a1, a2);
console.log(result);


var a1 = [{id: 1, value: 'kkr'}, {id: 2, value: 'csk'}];
var a2 = [{id: 1, value: 'mi'}];

function mergeAndRemoveDuplicates2(arr1, arr2) {
  // Combine both arrays
  const combined = [...arr1, ...arr2];
  
  // Array to store unique items
  const uniqueItems = [];
  
  // Object to track unique ids
  const uniqueIds = {};
  
  // Iterate over the combined array
  combined.forEach(item => {
    // Check if the item's id is already added
    if (!uniqueIds[item.id]) {
      // If not, add it to the result array and mark its id as added
      uniqueItems.push(item);
      uniqueIds[item.id] = true;
    }
  });
  
  return uniqueItems;
}

var result = mergeAndRemoveDuplicates2(a1, a2);
console.log(result);


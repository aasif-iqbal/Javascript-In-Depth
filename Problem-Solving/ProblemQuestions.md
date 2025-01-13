# Bubble sort
```js
/**
 * Simplified Bubble Sort Implementation in JavaScript.
 * 
 * @param {number[]} arr - Array of numbers to be sorted
 * @returns {number[]} - The sorted array
 */
function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let swap = false;
        for (let j = 0; j < n - 1 - i; j++) {
            // Swap using a temporary variable
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swap = true;
            }
        }
        if(!flag){
          console.log(`Array is already sorted`);
          break;
        }
    }

    return arr;
}

// Example Usage
const unsortedArray = [5, 3, 8, 4, 2];
console.log("Unsorted Array:", unsortedArray);

const sortedArray = bubbleSort(unsortedArray);
console.log("Sorted Array:", sortedArray);
```
# Binary Search
```js
/**
 * Binary Search with Edge Case Handling
 * 
 * @param {number[]} arr - A sorted array of numbers
 * @param {number} target - The number to search for
 * @returns {number} - The index of the target if found, or -1 if not found
 */

function binarySearch(arr, target) {
    // Edge Case: Empty Array
    if (arr.length === 0) return -1;

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search the right half
        } else {
            right = mid - 1; // Search the left half
        }
    }

    return -1; // Target not found
}

// Example Usage and Edge Cases
const sortedArray = [1, 3, 5, 7, 9, 11];

// Case 1: Target is in the array
console.log(binarySearch(sortedArray, 7)); // Output: 3

// Case 2: Target is not in the array
console.log(binarySearch(sortedArray, 8)); // Output: -1

// Case 3: Empty array
console.log(binarySearch([], 7)); // Output: -1

// Case 4: Array with duplicates
const arrayWithDuplicates = [1, 3, 3, 3, 7, 9];
console.log(binarySearch(arrayWithDuplicates, 3)); // Output: 1 (first occurrence)
```

## Return All 2nd most repeated.
```js
let str = "ahksadhkjdhsajhaksd";

let imap = new Map();

for(let elem of str){
  if(!imap.has(elem)){
    imap.set(elem, (imap.get(elem)||0) + 1);
  }else{
    imap.set(elem, imap.get(elem)+1)
  }
}

let arr = Array.from(imap)
let sortedArr = arr.sort((a,b)=> b[1]-a[1])
console.log(sortedArr)
const arr = [
  ['a', 4],
  ['h', 4],
  ['k', 3],
  ['s', 3],
  ['d', 3],
  ['j', 2]
];

// Step 1: Sort the array by the second element in descending order
const sortedArr = [...arr].sort((a, b) => b[1] - a[1]);

// Step 2: Find the highest value
const highest = sortedArr[0][1];

// Step 3: Find the first value smaller than the highest (second highest)
const secondHighest = sortedArr.find(item => item[1] < highest)[1];

// Step 4: Filter and map to return only the keys
const result = arr.filter(item => item[1] === secondHighest).map(item => item[0]);

console.log(result);
// [ 'k', 's', 'd' ]

```

## Write your own map function. [Array.prototype.map]


## Rearrage the Array of Strings
```js
['Aasif', 'Iqbal'] // output = 
```
Solution:
```js
const arr = ['Aasif', 'Iqbal'];

function reverseArr(arr){
  const reversedArr = []; // Initialize an empty array to store the results

  for (let j = 0; j < arr.length; j++) {
    let str = arr[j];
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
    }
    // Capitalize the first character and make the rest lowercase
    reversed = reversed.charAt(0).toUpperCase() + reversed.slice(1).toLowerCase();
    reversedArr.push(reversed); // Add the reversed string to the result array
  }
return reversedArr;
}

console.log(reversedArr(arr)); // Output: ['Fisaa', 'Labqi']
```
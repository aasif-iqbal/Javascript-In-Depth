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
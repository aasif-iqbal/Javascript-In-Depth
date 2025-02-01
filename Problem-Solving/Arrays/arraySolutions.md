## 02. Array Rotation
```js
let arr = [1,2,3,4,5,6];

function rotateClockwise(arr, k){
    // k Number of rotations
    let n = arr.length;
    
    for(let i=0; i < k; i++){
      
      
      let last = arr[n-1];  
      
      for(let j=n-1; j>0; j--){
      
        //shift each elem 
        arr[j] = arr[j-1]
        
      }
      arr[0] = last;
    }
    return arr;
}

console.log(rotateClockwise(arr,2))
```
## 10. Move Zeroes

```js
function moveZeroes(arr) {
  let nonZeroIndex = 0; // Index for placing non-zero elements

  // Move all non-zero elements to the front
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[nonZeroIndex] = arr[i];
      nonZeroIndex++;
    }
  }

  // Fill the remaining positions with zeros
  for (let i = nonZeroIndex; i < arr.length; i++) {
    arr[i] = 0;
  }

  return arr;
}

// Example usage:
const input = [0, 1, 2, 0, 3, 4, 0];
const output = moveZeroes(input);
console.log(output); // Output: [1, 2, 3, 4, 0, 0, 0]
```

5. Merge Sorted Array
```lua
Input: [1, 3, 5, 7], [2, 4, 6, 8]
Output: [1, 2, 3, 4, 5, 6, 7, 8]
```
```js
let ar1 = [1, 3, 5, 7]; 
let ar2 = [2, 4, 6, 8];

function merge(ar1,ar2){

  let combined = [...ar1, ...ar2];
  return combined.sort((a,b)=>a-b);
}
console.log(merge(ar1,ar2));
```

## 14. Longest Consecutive Sequence
### **Optimized Approach (Using a Hash Set)**
To efficiently find the **longest consecutive sequence**, we can use a **HashSet (Set in JavaScript)** to store all numbers and check for sequences in **O(n) time complexity**.

---

### **JavaScript Solution**
```js
function longestConsecutive(nums) {
    if (nums.length === 0) return 0;

    let numSet = new Set(nums); // Store all numbers in a Set for O(1) lookups
    let maxLength = 0;

    for (let num of numSet) {
        // Check if it's the start of a sequence (num - 1 should not exist)
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // Expand the sequence
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            // Update maxLength if a longer sequence is found
            maxLength = Math.max(maxLength, currentStreak);
        }
    }

    return maxLength;
}

// Test Cases
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // Output: 4 (Sequence: [1, 2, 3, 4])
console.log(longestConsecutive([9, 1, 4, 7, 3, 2, 6, 5, 8, 10])); // Output: 10 (Sequence: [1,2,3,4,5,6,7,8,9,10])
console.log(longestConsecutive([0, -1])); // Output: 2 (Sequence: [-1, 0])
console.log(longestConsecutive([10, 20, 30, 40])); // Output: 1 (No consecutive sequence)
console.log(longestConsecutive([])); // Output: 0 (Empty input)
```

---

### **Explanation**
1. **Store elements in a Set** → Quick lookup in **O(1)** time.
2. **Find sequence starts** → A number is a **sequence start** if `num - 1` is not in the set.
3. **Expand the sequence** → Keep checking for `num + 1` and count the streak.
4. **Update maxLength** → Track the longest sequence found.

---

### **Time & Space Complexity**
- **Time Complexity:** \(O(n)\) (Each element is checked at most twice)
- **Space Complexity:** \(O(n)\) (Set stores all elements)

This approach ensures an **efficient** solution compared to sorting-based methods (**O(n log n)**). 🚀

Would you like a **brute force approach** as well? 🔥
### **Brute Force Approach (O(n²) Time Complexity)**  
In a brute force solution, we check each number to see how long a consecutive sequence it can form. This results in an **O(n²) time complexity**, which is inefficient for large inputs.

---

### **JavaScript Brute Force Solution**
```js
function longestConsecutiveBruteForce(nums) {
    if (nums.length === 0) return 0;

    let maxLength = 0;

    for (let i = 0; i < nums.length; i++) {
        let currentNum = nums[i];
        let currentStreak = 1;

        // Check if next consecutive numbers exist in the array
        while (nums.includes(currentNum + 1)) {
            currentNum++;
            currentStreak++;
        }

        maxLength = Math.max(maxLength, currentStreak);
    }

    return maxLength;
}

// Test Cases
console.log(longestConsecutiveBruteForce([100, 4, 200, 1, 3, 2])); // Output: 4 (Sequence: [1, 2, 3, 4])
console.log(longestConsecutiveBruteForce([9, 1, 4, 7, 3, 2, 6, 5, 8, 10])); // Output: 10 (Sequence: [1,2,3,4,5,6,7,8,9,10])
console.log(longestConsecutiveBruteForce([0, -1])); // Output: 2 (Sequence: [-1, 0])
console.log(longestConsecutiveBruteForce([10, 20, 30, 40])); // Output: 1 (No consecutive sequence)
console.log(longestConsecutiveBruteForce([])); // Output: 0 (Empty input)
```

---

### **Explanation**
1. Loop through each number in the array.
2. Try to build a consecutive sequence starting from that number.
3. Use `nums.includes()` to check for the next consecutive number.
4. Keep track of the maximum sequence length found.

---

### **Time & Space Complexity**
- **Time Complexity:** \(O(n^2)\)  
  - Each element is checked against `nums.includes()`, which is \(O(n)\) in the worst case.
  - For every number, we scan the array to find the next number, leading to **nested loops**.
- **Space Complexity:** \(O(1)\)  
  - We only use a few integer variables for tracking lengths.

🔴 **Why is this inefficient?**  
- **`nums.includes()`** is called repeatedly, making the solution slow for large inputs.

Would you like an even **more optimized** approach using sorting? 🚀


### **Problem Statement:**  
Given two arrays, check if they are **permutations** of each other.  
Two arrays are permutations if they contain the **same elements with the same frequency**, but possibly in a different order.

---

## Check if two arrays are permutations of each other.  - [Frequency Counting]


### **Example 1:**  
#### **Input:**  
```js
checkPermutation([1, 2, 3, 4], [4, 3, 2, 1])
```
#### **Output:**  
```js
true
```
(Both arrays contain the same numbers, just in different orders.)

---

### **Example 2:**  
#### **Input:**  
```js
checkPermutation([1, 2, 3], [1, 2, 2])
```
#### **Output:**  
```js
false
```
(Second array contains an extra **2** instead of **3**.)

---

### **Optimized Approach (Using Hash Map / Object)**
Instead of sorting, we use a **hash map (object) to count frequencies** in **O(n) time**.

```js
function checkPermutation(arr1, arr2) {
    if (arr1.length !== arr2.length) return false; // Different lengths → Not permutations

    let frequencyMap = {};

    // Count occurrences in arr1
    for (let num of arr1) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }

    // Decrease occurrences using arr2
    for (let num of arr2) {
        if (!frequencyMap[num]) return false; // Element missing or extra
        frequencyMap[num]--;
    }

    return true;
}

// Test Cases
console.log(checkPermutation([1, 2, 3, 4], [4, 3, 2, 1])); // true
console.log(checkPermutation([1, 2, 3], [1, 2, 2])); // false
console.log(checkPermutation([5, 6, 7, 8], [8, 7, 6, 5])); // true
console.log(checkPermutation([1, 2, 3], [1, 2, 3, 4])); // false
console.log(checkPermutation([], [])); // true (Empty arrays are permutations)
```

---

### **Time & Space Complexity**
- **Time Complexity:** \(O(n)\)  
  - Two passes over the array: One for counting, one for checking.
- **Space Complexity:** \(O(n)\)  
  - The **hash map** stores frequencies.

---

### **Alternative Approach (Sorting)**
A simpler (but slightly slower) approach is to **sort both arrays and compare**.

```js
function checkPermutationSort(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Test Cases
console.log(checkPermutationSort([1, 2, 3, 4], [4, 3, 2, 1])); // true
console.log(checkPermutationSort([1, 2, 3], [1, 2, 2])); // false
console.log(checkPermutationSort([5, 6, 7, 8], [8, 7, 6, 5])); // true
console.log(checkPermutationSort([1, 2, 3], [1, 2, 3, 4])); // false
console.log(checkPermutationSort([], [])); // true
```

---
### **Sorting vs Hash Map Approach**
| Approach | Time Complexity | Space Complexity | Best Use Case |
|----------|---------------|----------------|--------------|
| **Hash Map (Frequency Count)** | **O(n)** | **O(n)** | Best for large arrays with unique values |
| **Sorting & Comparing** | **O(n log n)** | **O(1) or O(n)** | Simple but slower for large inputs |

Would you like a **brute-force approach** (O(n²)) as well? 🚀
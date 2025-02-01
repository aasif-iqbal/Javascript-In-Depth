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

14. Longest Consecutive Sequence
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
## Find 2nd most frequent char
```js
let str = 'aaabbbbcccdde'; 
//find 2nd most frequent letter/char

function getFrequentChar(str){
  //count each char 
  
  let imap = new Map();
  let strLength = str.split('').length;
  
  for(let i=0; i< strLength; i++){
    
    if(!imap.has(str[i])){
      //for first-time
      imap.set(str[i], (imap.get(str[i]) || 0) + 1)
    }else{
      // for 2nd and more
      imap.set(str[i], (imap.get(str[i])) + 1)
    }
  }
  // console.log(imap)
  //convert map object to Array
  let strArr =  Array.from(imap);
  
  // console.log(strArr);
  
   
// Simple-solution:Sort the array by the second element in descending order
// const sortedArr = [...strArr].sort((a, b) => b[1] - a[1]);
  
  // sort according to char-count & return 2nd most freq. count.
  let sortedArr = bubbleSort(strArr)
  
  // console.log('value',sortedArr[1][0]);
return sortedArr[1][0];
}
//for 2d array
function bubbleSort(arr){
  let sortArr = [];
  for(let i=0; i < arr.length-1; i++){
      // console.log('row',arr[i][0])
      // console.log('col',arr[i][1])
      
      if(arr[i][1] < arr[i+1][1]){
        [arr[i][1],arr[i+1][1]] = [arr[i+1][1], arr[i][1]];
      }       
  }
  // console.log(arr)
  return arr;
}
let result = getFrequentChar(str);
console.log(result); // b
```

## Understand 2D martix
Here's how you can access all elements in the 2D array using their indices:

For the array:  
```javascript
const array = [ [ 'a', 3 ], [ 'b', 4 ], [ 'c', 3 ], [ 'd', 2 ], [ 'e', 1 ] ];
```

Access each element:

### Row 0
- **Access `'a'`:** `array[0][0]` → `'a'`
- **Access `3`:** `array[0][1]` → `3`

### Row 1
- **Access `'b'`:** `array[1][0]` → `'b'`
- **Access `4`:** `array[1][1]` → `4`

### Row 2
- **Access `'c'`:** `array[2][0]` → `'c'`
- **Access `3`:** `array[2][1]` → `3`

### Row 3
- **Access `'d'`:** `array[3][0]` → `'d'`
- **Access `2`:** `array[3][1]` → `2`

### Row 4
- **Access `'e'`:** `array[4][0]` → `'e'`
- **Access `1`:** `array[4][1]` → `1`

---

### **Summary of Access Operations**
| **Index**   | **Element** |
|-------------|-------------|
| `array[0][0]` | `'a'`       |
| `array[0][1]` | `3`         |
| `array[1][0]` | `'b'`       |
| `array[1][1]` | `4`         |
| `array[2][0]` | `'c'`       |
| `array[2][1]` | `3`         |
| `array[3][0]` | `'d'`       |
| `array[3][1]` | `2`         |
| `array[4][0]` | `'e'`       |
| `array[4][1]` | `1`         |

---

AceCreIm
leotcede

```js
function reverseVowels(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']); // Set for quick lookup
    const chars = s.split(''); // Convert string to array for easy swapping
    let left = 0, right = chars.length - 1;

    while (left < right) {
        // Move left pointer until it finds a vowel
        while (left < right && !vowels.has(chars[left])) {
            left++;
        }
        // Move right pointer until it finds a vowel
        while (left < right && !vowels.has(chars[right])) {
            right--;
        }
        // Swap the vowels
        if (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }

    return chars.join(''); // Convert array back to string
}

// Example Usage
console.log(reverseVowels("IceCreAm")); // Output: "AceCreIm"
console.log(reverseVowels("leetcode")); // Output: "leotcede"
```

## 
```js
/*
Input: gain = [-5,1,5,0,-7]
Output: 1
Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.

Input: gain = [-4,-3,-2,-1,4,3,2]
Output: 0
Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.
*/ 
// let gain = [-5,1,5,0,-7];
let gain = [-4,-3,-2,-1,4,3,2];

function largestAltitude(gain){

	let output = []		
	output[0]= 0;
	let temp = 0;
	let result = 0;
	for(let i=0; i < gain.length; i++){
	    temp += gain[i];
	    output.push(temp);
	}		
	return Math.max(...output);
}
let result = largestAltitude(gain);
console.log(result);
```

 ## Find Pivot Index
 ```lua
 Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

 

Example 1:

Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11
Example 2:

Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.
Example 3:

Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0
 

Constraints:

1 <= nums.length <= 104
-1000 <= nums[i] <= 1000
```
Here’s the **JavaScript solution** **without using `reduce`**, using a simple `for` loop to calculate the total sum:  

---

### **Approach**
1. Compute the **total sum** of the array using a loop.
2. Use a **left sum** variable to track the sum of elements to the left of the current index.
3. Iterate through the array, checking if `leftSum * 2 + nums[i] === totalSum`.
4. If the condition is met, return the index.
5. Otherwise, update `leftSum` and continue.
6. If no pivot index is found, return `-1`.

---

### **JavaScript Code**
```js
function pivotIndex(nums) {
    let totalSum = 0;
    let leftSum = 0;

    // Calculate total sum manually (without reduce)
    for (let num of nums) {
        totalSum += num;
    }

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        if (leftSum * 2 + nums[i] === totalSum) {
            return i;
        }
        leftSum += nums[i]; // Update left sum for the next index
    }

    return -1;
}

// Example Test Cases
console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // Output: 3
console.log(pivotIndex([1, 2, 3]));         // Output: -1
console.log(pivotIndex([2, 1, -1]));        // Output: 0
```

---

### **Explanation**
#### **Example 1: `[1,7,3,6,5,6]`**
- First loop calculates `totalSum = 28`
- Second loop:
  - `i=0`: `leftSum = 0`, check `0 * 2 + 1 == 28` (False)
  - `i=1`: `leftSum = 1`, check `1 * 2 + 7 == 28` (False)
  - `i=2`: `leftSum = 8`, check `8 * 2 + 3 == 28` (False)
  - **`i=3`: `leftSum = 11`, check `11 * 2 + 6 == 28` (True) → return `3`**

#### **Example 2: `[1,2,3]`**
- `totalSum = 6`, no valid pivot found → return `-1`

#### **Example 3: `[2,1,-1]`**
- `totalSum = 2`
- `i=0`: `leftSum = 0`, check `0 * 2 + 2 == 2` (True) → return `0`

---

### **Time Complexity**
- **O(n)** → Two passes through `nums`, but still efficient.


## Remove Spaces
```js
function removeSpaces(str){
  let start = 0;
  let end = str.length - 1;
  
  while(start <= end && str[start] == ' '){
    start++;
  }
  
  while(start >= end && str[end] == ' '){
    end--
  }
  
  return str.slice(start, end+1);
}


// Test Cases
console.log(removeSpaces("   Hello, World!   "));  // Output: "Hello, World!"
console.log(removeSpaces("   JavaScript   "));     // Output: "JavaScript"
console.log(removeSpaces("NoSpaces"));            // Output: "NoSpaces"
console.log(removeSpaces("      "));             // Output: "" (Empty String)
console.log(removeSpaces("  Trim  Me  "));       // Output: "Trim  Me"
```

# 28. Find the Index of the First Occurrence in a String
```lua
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
 
Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.
```
Solution:
```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle);
};
```
Brute-force:

```js
function strStr(haystack, needle) {
    let m = haystack.length, n = needle.length;

    for (let i = 0; i <= m - n; i++) {
        let j;
        for (j = 0; j < n; j++) {
            if (haystack[i + j] !== needle[j]) {
                break;
            }
        }
        if (j === n) {
            return i; // Found the first occurrence
        }
    }
    return -1; // Not found
}

// Example usage:
console.log(strStr("hello", "ll")); // Output: 2
console.log(strStr("sadbutsad", "sad")); // Output: 0
console.log(strStr("leetcode", "leeto")); // Output: -1
```
# Find the First Non-Repeating Character
```lua
Description:
Given a string s, return the index of the first non-repeating character. If there is no non-repeating character, return -1.

Input: "leetcode"
Output: 0
Explanation: The first non-repeating character is 'l' at index 0.

Input: "loveleetcode"
Output: 2
Explanation: The first non-repeating character is 'v' at index 2.

Input: "aabb"
Output: -1
Explanation: All characters repeat, so return -1.
```

Solution:
```js
function getNonRepeatChar(strg) {
  let imap = new Map();

  // Step 1: Count frequency of each character
  for (let i = 0; i < strg.length; i++) {
    imap.set(strg[i], (imap.get(strg[i]) || 0) + 1);
  }

  // Step 2: Find the first character with count == 1
  for (let i = 0; i < strg.length; i++) {
    if (imap.get(strg[i]) === 1) {
      return i; // Return the correct index
    }
  }

  return -1; // No non-repeating character found
}

// Example usage:
console.log(getNonRepeatChar("leetcode"));      // Output: 0
console.log(getNonRepeatChar("loveleetcode"));  // Output: 2
console.log(getNonRepeatChar("aabb"));          // Output: -1
```
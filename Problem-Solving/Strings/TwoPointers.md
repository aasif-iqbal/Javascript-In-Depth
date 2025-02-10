## **Two Pointers Technique in Programming**

The **Two Pointers** technique is an efficient approach used to solve problems involving **searching, sorting, and optimization** in arrays and linked lists. It involves using two pointers to traverse data structures in a specific manner to achieve the desired result.

---

### **Types of Two Pointers**
1. **Opposite Direction Pointers (Two Ends Approach)**  
   - Used for problems like finding pairs in a sorted array that satisfy a condition.
   - Works efficiently with **sorted arrays**.
   - Example: **Two Sum (Sorted Array), Finding a Pair with a Given Sum, Palindrome Checking**.

2. **Same Direction Pointers (Sliding Window Approach)**  
   - Used for problems involving **subarrays or subsequences**.
   - Helps in finding **maximum/minimum values** in a given range.
   - Example: **Finding Subarrays, Longest Substring without Repeating Characters, Removing Duplicates**.

---

## **1. Opposite Direction Pointers Example**
### **Problem: Find a pair with a given sum in a sorted array**
**Given a sorted array and a target sum, find if there exists a pair whose sum equals the target.**

### **Approach**
- Use **two pointers**, one at the beginning (`left`) and one at the end (`right`).
- If `arr[left] + arr[right] > target`, move `right` (decrease index).
- If `arr[left] + arr[right] < target`, move `left` (increase index).
- If a pair is found, return `true`.

### **Code (ES6 - JavaScript)**
```javascript
function hasPairWithSum(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];

        if (sum === target) {
            return true;
        } else if (sum < target) {
            left++; // Move left pointer right
        } else {
            right--; // Move right pointer left
        }
    }

    return false;
}

// Example Usage
console.log(hasPairWithSum([1, 2, 3, 4, 5, 6, 7], 9)); // Output: true (2+7 or 3+6)
```
✅ **Time Complexity:** O(N)  
✅ **Space Complexity:** O(1)

---

## **2. Same Direction Pointers (Sliding Window)**
### **Problem: Longest Substring Without Repeating Characters**
**Given a string, find the length of the longest substring without repeating characters.**

### **Approach**
- Use a **sliding window** with two pointers (`left` and `right`).
- Expand `right` pointer and keep track of visited characters.
- If a duplicate is found, move the `left` pointer to exclude it.

### **Code (ES6 - JavaScript)**
```javascript
function longestUniqueSubstring(s) {
    let left = 0, maxLength = 0;
    let charSet = new Set();

    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++; // Move left pointer to avoid duplicate
        }
        
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Example Usage
console.log(longestUniqueSubstring("abcabcbb")); // Output: 3 ("abc")
```
✅ **Time Complexity:** O(N)  
✅ **Space Complexity:** O(N)

---

## **Summary**
| Problem Type | Approach | Example |
|-------------|---------|---------|
| Finding a pair with a sum | Opposite Direction Pointers | Two Sum (Sorted Array) |
| Checking if a string is a palindrome | Opposite Direction Pointers | "madam" |
| Longest substring without repeating characters | Same Direction Pointers | Sliding Window |
| Finding the smallest/largest subarray | Same Direction Pointers | Sliding Window |

Would you like to see more problems or different variations of the two-pointer technique?
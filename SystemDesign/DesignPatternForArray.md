### **Design Patterns for Solving Array-Based Problems**  

When solving **array-based** coding problems, applying the right **design pattern** can make solutions **efficient and structured**. Below are the most common **array problem patterns**, categorized by their approach:

---

## **1. Sliding Window**
### **When to Use:**  
- Problems involving **subarrays** or **contiguous elements**.
- Finding **maximum/minimum/k-sum** in a **fixed or variable-sized** window.

### **Example Problems:**  
- Find the **maximum sum subarray** of size `k`.
- Longest **substring without repeating characters**.

### **Approach:**  
1. Maintain a **window** using two pointers (`left` and `right`).
2. Expand the window (`right++`).
3. Shrink the window (`left++`) when needed.

### **Example Code: Maximum Sum of a Subarray of Size `k`**
```js
function maxSumSubarray(arr, k) {
    let maxSum = 0, windowSum = 0;
    let left = 0;

    for (let right = 0; right < arr.length; right++) {
        windowSum += arr[right];

        if (right >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[left];  // Remove leftmost element
            left++;
        }
    }

    return maxSum;
}
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3));  // Output: 9
```

---

## **2. Two Pointers**
### **When to Use:**  
- **Sorted arrays**
- **Pair problems** (`two-sum`, `triplet-sum`)
- **Merging arrays**

### **Example Problems:**  
- **Two Sum (Sorted Array)**
- **Merge two sorted arrays**
- **Remove duplicates in-place**

### **Approach:**  
1. Use **two pointers** (one at the start, one at the end).
2. Move the pointers **based on conditions**.

### **Example Code: Two Sum (Sorted)**
```js
function twoSumSorted(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === target) return [left, right];

        sum < target ? left++ : right--;
    }
    return [];
}
console.log(twoSumSorted([1, 2, 3, 4, 6], 6)); // Output: [1, 3]
```

---

## **3. Fast and Slow Pointers (Floyd’s Cycle Detection)**
### **When to Use:**  
- **Cycle detection** in arrays or linked lists.
- **Finding middle of an array** (or linked list).

### **Example Problems:**  
- Detect cycle in a **circular array**.
- Find **duplicate number** in an array.

### **Example Code: Find Duplicate Number**
```js
function findDuplicate(nums) {
    let slow = nums[0], fast = nums[0];

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}
console.log(findDuplicate([1, 3, 4, 2, 2])); // Output: 2
```

---

## **4. Prefix Sum / Cumulative Sum**
### **When to Use:**  
- **Range sum queries**.
- **Finding subarrays with a given sum**.

### **Example Problems:**  
- **Find a subarray sum in O(1)**.
- **Count subarrays with sum `k`**.

### **Example Code: Find Subarray Sum**
```js
function subarraySum(arr, k) {
    let sum = 0, count = 0, prefixSum = {0: 1};

    for (let num of arr) {
        sum += num;
        if (prefixSum[sum - k]) count += prefixSum[sum - k];
        prefixSum[sum] = (prefixSum[sum] || 0) + 1;
    }

    return count;
}
console.log(subarraySum([1, 1, 1], 2));  // Output: 2
```

---

## **5. Binary Search**
### **When to Use:**  
- **Sorted arrays**.
- **Finding an element in O(log N)**.

### **Example Problems:**  
- Find an **element in a rotated sorted array**.
- Find **minimum in a rotated sorted array**.

### **Example Code: Binary Search**
```js
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;
        arr[mid] < target ? (left = mid + 1) : (right = mid - 1);
    }
    return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6], 4));  // Output: 3
```

---

## **6. Sorting + Greedy**
### **When to Use:**  
- **Optimizing** problems (min/max operations).
- **Pairing elements** efficiently.

### **Example Problems:**  
- **Meeting rooms problem** (minimum meeting rooms required).
- **Merge intervals**.

### **Example Code: Merge Intervals**
```js
function mergeIntervals(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    let merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        let prev = merged[merged.length - 1];
        let curr = intervals[i];

        if (prev[1] >= curr[0]) prev[1] = Math.max(prev[1], curr[1]);
        else merged.push(curr);
    }

    return merged;
}
console.log(mergeIntervals([[1,3], [2,6], [8,10], [15,18]]));  
// Output: [[1,6], [8,10], [15,18]]
```

---

## **7. Monotonic Stack (Next Greater Element)**
### **When to Use:**  
- Finding **next greater/smaller element**.
- **Histogram problems**.

### **Example Problems:**  
- **Next greater element**.
- **Largest rectangle in histogram**.

### **Example Code: Next Greater Element**
```js
function nextGreaterElement(nums) {
    let stack = [], result = Array(nums.length).fill(-1);

    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }

    return result;
}
console.log(nextGreaterElement([2, 1, 2, 4, 3]));  
// Output: [4, 2, 4, -1, -1]
```

---

## **Conclusion**
Understanding and recognizing these **patterns** is essential for solving array-based problems efficiently. Here’s a **quick guide** to choosing the right pattern:

| **Pattern**        | **Use Case** |
|--------------------|-------------|
| **Sliding Window** | Contiguous subarrays, max/min sum |
| **Two Pointers** | Searching pairs, sorting, merging |
| **Fast & Slow Pointers** | Cycle detection, duplicates |
| **Prefix Sum** | Subarray sum, range queries |
| **Binary Search** | Searching in sorted arrays |
| **Sorting + Greedy** | Optimization, merging intervals |
| **Monotonic Stack** | Next greater/smaller elements |

Would you like **practice problems** based on these patterns?
Excellent topic — let’s go over **Array Rotation with O(1) space complexity** 🔁

We’ll cover:

1. What array rotation means
2. The efficient algorithm (Reversal Algorithm)
3. Step-by-step example
4. Complete code (ES6)

---

## 🔹 1. What is Array Rotation?

Array rotation means shifting array elements to the left or right **by `k` positions**.

Example (Right rotation):

```
Input:  arr = [1, 2, 3, 4, 5, 6, 7], k = 3
Output: [5, 6, 7, 1, 2, 3, 4]
```

---

## 🔹 2. Goal: Do it in **O(1) space** and **O(n) time**

That means:

* No extra array (only use a few variables)
* Process elements in place

---

## 🔹 3. Solution: **Reversal Algorithm**

The idea is:

1. Reverse the entire array
2. Reverse the first `k` elements
3. Reverse the remaining `n - k` elements

---

## 🔹 4. Step-by-Step Example

Let’s rotate `[1, 2, 3, 4, 5, 6, 7]` right by `k = 3`.

```
Original: [1, 2, 3, 4, 5, 6, 7]
Step 1: Reverse all → [7, 6, 5, 4, 3, 2, 1]
Step 2: Reverse first 3 → [5, 6, 7, 4, 3, 2, 1]
Step 3: Reverse last 4 → [5, 6, 7, 1, 2, 3, 4]
✅ Result = [5, 6, 7, 1, 2, 3, 4]
```

---

## 🔹 5. ES6 Code (Right Rotation)

```js
const rotateRight = (arr, k) => {
  const n = arr.length;
  k = k % n; // handle if k > n

  // helper function to reverse a subarray
  const reverse = (start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };

  // 1. Reverse the whole array
  reverse(0, n - 1);

  // 2. Reverse the first k elements
  reverse(0, k - 1);

  // 3. Reverse the remaining elements
  reverse(k, n - 1);

  return arr;
};

// Example:
console.log(rotateRight([1, 2, 3, 4, 5, 6, 7], 3));
// Output: [5, 6, 7, 1, 2, 3, 4]
```

---

## 🔹 6. For Left Rotation (variation)

Just change the order:

1. Reverse first `k`
2. Reverse last `n - k`
3. Reverse entire array

```js
const rotateLeft = (arr, k) => {
  const n = arr.length;
  k = k % n;

  const reverse = (start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };

  reverse(0, k - 1);
  reverse(k, n - 1);
  reverse(0, n - 1);

  return arr;
};

console.log(rotateLeft([1, 2, 3, 4, 5, 6, 7], 3));
// Output: [4, 5, 6, 7, 1, 2, 3]
```

---

## ✅ Complexity Analysis

| Operation | Complexity               |
| --------- | ------------------------ |
| Time      | O(n)                     |
| Space     | O(1) (in-place rotation) |

---

Would you like me to explain the **mathematical intuition** behind why the reversal approach works (using index mapping)?

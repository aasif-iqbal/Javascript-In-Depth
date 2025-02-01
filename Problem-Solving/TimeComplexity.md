## What is time complexity 

### **What is Time Complexity?**
Time complexity is a measure of the amount of **time** an algorithm takes to run as a function of the **input size (n)**. It helps in analyzing how an algorithm's performance scales when the input size increases.

### **Why is Time Complexity Important?**
- Helps in comparing different algorithms.
- Predicts how an algorithm will perform with large inputs.
- Optimizes code to improve efficiency.

---

### **Common Time Complexities**
Here are the most common time complexities ranked from best (fastest) to worst (slowest):

| **Time Complexity**  | **Big-O Notation** | **Example** |
|----------------------|-------------------|-------------|
| Constant Time       | O(1)              | Accessing an element in an array (`arr[i]`) |
| Logarithmic Time    | O(log n)          | Binary search |
| Linear Time         | O(n)              | Looping through an array |
| Linearithmic Time   | O(n log n)        | Merge Sort, Quick Sort (average case) |
| Quadratic Time      | O(n²)             | Nested loops (e.g., Bubble Sort, Insertion Sort) |
| Cubic Time          | O(n³)             | Triple nested loops |
| Exponential Time    | O(2ⁿ)             | Recursive Fibonacci (without memoization) |
| Factorial Time      | O(n!)             | Traveling Salesman Problem (brute-force) |

---

### **Examples of Time Complexity**
#### **1. Constant Time – O(1)**
Regardless of input size, the execution time remains constant.
```js
function getFirstElement(arr) {
    return arr[0];  // Always takes constant time
}
```

#### **2. Linear Time – O(n)**
Execution time increases linearly with input size.
```js
function printAllElements(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);  // Executes n times
    }
}
```

#### **3. Quadratic Time – O(n²)**
Nested loops increase execution time quadratically.
```js
function printPairs(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);  // Executes n * n times
        }
    }
}
```

#### **4. Logarithmic Time – O(log n)**
Reduces the problem size at each step (Binary Search).
```js
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

#### **5. Exponential Time – O(2ⁿ)**
Recursive solutions without optimization.
```js
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);  // 2 recursive calls
}
```

---

### **How to Determine Time Complexity?**
1. **Identify loops** → Each loop contributes **O(n)**.
2. **Check recursive calls** → Number of recursive calls determines the complexity.
3. **Ignore constants** → O(2n) simplifies to O(n).
4. **Drop lower-order terms** → O(n² + n) simplifies to O(n²).

## What is Big O
### **What is Big O Notation?**
Big O notation is a mathematical way to describe the **time complexity** and **efficiency** of an algorithm as the input size **(n)** grows. It helps developers analyze how an algorithm **scales** and performs under different conditions.

---

### **Why Use Big O?**
- **Predict Performance**: Helps estimate how an algorithm behaves with large inputs.
- **Compare Algorithms**: Allows choosing the most efficient algorithm.
- **Optimize Code**: Helps improve runtime performance.

---

### **Common Big O Complexities**
Here’s a table ranking different time complexities from **best (fastest) to worst (slowest)**:

| **Big O Notation**  | **Name**            | **Example** |
|---------------------|--------------------|-------------|
| **O(1)**           | Constant Time      | Accessing an array element (`arr[i]`) |
| **O(log n)**       | Logarithmic Time   | Binary Search |
| **O(n)**           | Linear Time        | Looping through an array |
| **O(n log n)**     | Linearithmic Time  | Merge Sort, Quick Sort (average case) |
| **O(n²)**          | Quadratic Time     | Nested loops (Bubble Sort) |
| **O(n³)**          | Cubic Time         | Triple nested loops |
| **O(2ⁿ)**          | Exponential Time   | Fibonacci (without memoization) |
| **O(n!)**          | Factorial Time     | Traveling Salesman Problem (brute-force) |

---

### **Examples of Big O Notation**
#### **1. O(1) - Constant Time**
The runtime does not depend on the input size.
```js
function getFirstElement(arr) {
    return arr[0];  // Always takes the same time
}
```

#### **2. O(n) - Linear Time**
Runtime increases proportionally to input size.
```js
function printAll(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);  // Executes 'n' times
    }
}
```

#### **3. O(n²) - Quadratic Time**
Nested loops cause quadratic growth.
```js
function printPairs(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);  // Executes n * n times
        }
    }
}
```

#### **4. O(log n) - Logarithmic Time**
Each step **divides the problem size by 2**.
```js
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

#### **5. O(2ⁿ) - Exponential Time**
Recursive function **doubles** with each step.
```js
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);  // Calls itself twice
}
```

---

### **How to Determine Big O?**
1. **Identify loops** → Each loop contributes **O(n)**.
2. **Check recursive calls** → Number of recursive calls determines complexity.
3. **Ignore constants** → O(2n) simplifies to O(n).
4. **Drop lower-order terms** → O(n² + n) simplifies to O(n²).

Would you like a specific Big O analysis of your algorithm?
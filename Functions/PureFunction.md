# What is Pure function.
A **pure function** is a fundamental concept in functional programming. It refers to a function that adheres to the following two principles:

1. **Deterministic**: For the same input, it always produces the same output.
2. **No Side Effects**: It does not modify any state outside its scope or rely on any external state that can change. This means:
   - It doesn’t modify variables or data outside its function scope.
   - It doesn’t perform any observable side effects, like logging, writing to a database, or mutating inputs.

---

### **Characteristics of Pure Functions**
1. **Same Input, Same Output**:
   - Example: `f(x) = x * 2` is a pure function because it will always return `2` when `x = 1`.
   - Counterexample: `Math.random()` is **not pure** because it produces a different result for the same input.

2. **No Side Effects**:
   - A pure function does not:
     - Change global variables.
     - Modify the input parameters.
     - Interact with I/O (e.g., reading or writing files).
   - Counterexample: A function that writes to a log file or modifies a global variable is **not pure**.

---

### **Examples in JavaScript**

#### **Pure Function**
```javascript
// Pure Function
function add(a, b) {
    return a + b; // No side effects, deterministic
}

console.log(add(2, 3)); // Always 5
console.log(add(2, 3)); // Always 5
```

#### **Impure Function**
```javascript
// Impure Function - modifies external state
let counter = 0;

function increment() {
    counter++; // Modifies external variable
    return counter;
}

console.log(increment()); // Depends on external state
console.log(increment()); // Different result each time
```

#### **Pure Function with Immutable Data**
```javascript
// Pure Function - Avoiding mutation
function updateArray(arr, value) {
    return [...arr, value]; // Returns a new array without modifying the original
}

const originalArray = [1, 2, 3];
const newArray = updateArray(originalArray, 4);

console.log(originalArray); // [1, 2, 3] - Unchanged
console.log(newArray);      // [1, 2, 3, 4] - New array
```

---

### **Benefits of Pure Functions**
1. **Predictable**: Easier to understand and test since output depends solely on input.
2. **Parallelization**: No side effects mean they can be run safely in parallel.
3. **Debugging**: Debugging is simpler because they don’t rely on external state.
4. **Reusability**: Pure functions can be reused across different parts of a program without concerns about unintended effects.

---

### **Real-World Use Cases**
- **Functional Programming**: Libraries like Redux rely heavily on pure functions to manage state.
- **Data Transformation**: Array methods like `map`, `filter`, and `reduce` encourage writing pure functions.

---

**Suggestions for Next Steps**:
**a.** Should I provide examples of using pure functions in real-world applications like Redux?  
**b.** Would you like a comparison between pure and impure functions in practical scenarios?
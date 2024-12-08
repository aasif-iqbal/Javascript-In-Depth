
# Higher-Order Functions in JavaScript

A **higher-order function** is a function that either:
- Takes one or more functions as arguments, or
- Returns a function as its result.

This concept is central to functional programming and allows for more abstract and flexible code.

---

## Key Characteristics of Higher-Order Functions

### **1. Functions as Arguments**
Higher-order functions can take other functions as parameters to modify their behavior dynamically.

#### Example:
```javascript
const applyOperation = (num1, num2, operation) => operation(num1, num2);

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(applyOperation(5, 3, add));       // Output: 8
console.log(applyOperation(5, 3, multiply)); // Output: 15
```

---

### **2. Functions as Return Values**
Higher-order functions can return new functions, which is useful for creating closures or customizing behavior.

#### Example:
```javascript
const multiplier = (factor) => (num) => num * factor;

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
```

---

## Examples in JavaScript

### **1. Array Methods**
Many built-in JavaScript methods like `map`, `filter`, and `reduce` are higher-order functions.

#### Using `map`:
```javascript
const numbers = [1, 2, 3, 4];
const squares = numbers.map((n) => n * n);

console.log(squares); // Output: [1, 4, 9, 16]
```

#### Using `filter`:
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((n) => n % 2 === 0);

console.log(evenNumbers); // Output: [2, 4]
```

---

### **2. Event Listeners**
In web development, event listeners often use callback functions, making the listener a higher-order function.

#### Example:
```javascript
document.querySelector('button').addEventListener('click', () => {
    console.log('Button clicked!');
});
```

---

## Why Use Higher-Order Functions?

- **Abstraction**: They allow you to write concise and readable code.
- **Reusability**: You can pass different functions to achieve different outcomes.
- **Modularity**: Helps break down problems into smaller, more manageable functions.

---

## Related Topics
- **First class Function**
- **HOF**: Higher-Order Functions
- **Hoisting**: `var`, `let`, `const`
- **Scope Chaining**
- **Closure**
- **Callback**
- **Promise**
- **Async & Await**

---

## Learn More
Check out this [FreeCodeCamp article](https://www.freecodecamp.org/news/higher-order-functions-in-javascript-explained/) for an in-depth explanation.
```
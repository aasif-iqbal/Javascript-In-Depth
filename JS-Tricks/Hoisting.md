## Find output
```js
console.log(add(2,4))

function add(a, b){
  return a+b;
}
```
Output: 6

This works because of **hoisting** in JavaScript.

In JavaScript, function declarations are **hoisted** to the top of their scope during the compilation phase. This means that the entire function is moved to the top of its scope before the code is executed, regardless of where the function is defined in the code.

Here's how your code effectively runs:

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 4));
```

Even though `console.log(add(2, 4))` appears before the function `add` in the source code, the JavaScript engine "knows" about the function declaration due to hoisting, so it can safely call the `add` function.

### Key Points:
1. **Function Declarations** are fully hoisted.
   - You can use the function even before it is declared in the code.
2. **Function Expressions** (e.g., `const add = function(a, b) { ... }`) are **not hoisted** in the same way. If `add` were defined as a function expression, you would get an error (`ReferenceError` or `TypeError`) because the variable `add` wouldn't be initialized until after its declaration is reached.

## Function expressions vs. Function declarations?
Here's an example that illustrates the difference between **function declarations** and **function expressions** in terms of hoisting:

### Function Declaration
```javascript
console.log(add(2, 4)); // Works because of hoisting

function add(a, b) {
  return a + b;
}
```

- **Output**: `6`
- Explanation: The function `add` is hoisted to the top, so the code runs without issues.

---

### Function Expression
```javascript
console.log(add(2, 4)); // Throws an error

const add = function (a, b) {
  return a + b;
};
```

- **Error**: `ReferenceError: Cannot access 'add' before initialization`
- Explanation: In the case of a function expression, the variable `add` is declared but not initialized until the line with `const add = ...` is executed. At the time of `console.log(add(2, 4));`, `add` is still `undefined`.

---

### Arrow Function Expression
Arrow functions behave the same as regular function expressions in this context:
```javascript
console.log(add(2, 4)); // Throws an error

const add = (a, b) => a + b;
```

- **Error**: `ReferenceError: Cannot access 'add' before initialization`
- Explanation: Same as the function expression — the variable `add` is not initialized when the `console.log` is executed.

---

### Summary Table

| Type                 | Hoisted? | Can Be Called Before Declaration? |
|----------------------|----------|-------------------------------------|
| Function Declaration | Yes      | ✅ Yes                             |
| Function Expression  | No       | ❌ No                              |
| Arrow Function       | No       | ❌ No                              |
--- 
Here's an interesting problem based on the **weird parts of JavaScript** to test your understanding of hoisting, `this`, and scoping rules:

---

### Problem:
Consider the following code snippet. What will be the output, and why?

```javascript
var name = "Global";

function printName() {
  console.log(name);
  
  var name = "Local";
  
  console.log(name);
}

printName();
```
---
### Options:
1. `Global` followed by `Local`
2. `undefined` followed by `Local`
3. `ReferenceError`
4. `Global` followed by `undefined`

---

Think through the problem and take your time. Let me know your answer, and I'll explain it! 😊

Outpur: 2
---
You're absolutely correct! 🎉 The output is:

```
undefined
Local
```

### Why? 🤔
This happens because of **hoisting** and the way variable declarations with `var` behave in JavaScript.

Here's a step-by-step breakdown:

1. **Before Execution (Hoisting Phase)**:
   - JavaScript hoists the variable `name` declared inside the `printName` function.
   - However, only the **declaration** of `var name` is hoisted, not its **initialization**. 
   - After hoisting, the function looks like this:
     ```javascript
     function printName() {
       var name; // Hoisted declaration
       console.log(name); // `name` is declared but not initialized yet, so it's `undefined`
       name = "Local"; // Initialization happens here
       console.log(name); // Now, `name` holds the value "Local"
     }
     ```

2. **Execution Phase**:
   - On the first `console.log(name)`, the local `name` variable exists but is not yet initialized. It defaults to `undefined`.
   - After `name = "Local";`, the local variable is initialized, and the second `console.log(name)` outputs `"Local"`.

3. **The Global `name` Is Never Used**:
   - The global `name = "Global";` is ignored inside the function because the local variable `name` shadows the global one.

---

### Key Takeaways:
1. **`var` Hoisting**: Variable declarations with `var` are hoisted to the top of their scope but initialized to `undefined`.
2. **Shadowing**: Local variables take precedence over global variables when they share the same name.

Here’s another **tricky JavaScript problem** to challenge you. It involves closures, `var`, and asynchronous behavior.

---

### Problem:
What will be the output of the following code snippet? And why?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

---

### Options:
1. `0 1 2`
2. `3 3 3`
3. `undefined undefined undefined`
4. `Error`

---

Think carefully about how `var` and closures interact with asynchronous code. Let me know your answer, and I'll explain it! 😊

Output: 2
---
You're absolutely correct again! 🎉 The output is:

```
3
3
3
```

### Explanation:
This behavior is due to how **closures** and the `var` keyword work in JavaScript. Here's the step-by-step reasoning:

---

### 1. **Loop and `var` Scope**:
The `var` keyword has **function scope**, not block scope. This means that the variable `i` declared with `var` is shared across all iterations of the loop. By the time the `setTimeout` callbacks are executed, the loop has already completed, and the value of `i` is `3` (the condition `i < 3` fails).

---

### 2. **Asynchronous Execution**:
The `setTimeout` function schedules the callbacks to run **after 1 second**, but it doesn't execute them immediately. By the time the scheduled callbacks run, the loop is done, and the shared `i` variable has the value `3`.

---

### 3. **What Happens in Each Iteration**:
- Iteration 1: `i = 0`, schedules `console.log(i)` for later.
- Iteration 2: `i = 1`, schedules `console.log(i)` for later.
- Iteration 3: `i = 2`, schedules `console.log(i)` for later.
- By the time the callbacks execute, `i = 3`.

---

### 4. **Output**:
All three callbacks refer to the same `i` (shared due to `var`), which has the final value `3`.

---

### How to Fix This? 🤔
If you want the output to be `0 1 2`, you can use either of the following methods:

#### Method 1: **Use `let` Instead of `var`**
`let` has block scope, so each iteration gets its own `i`.

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

**Output**:
```
0
1
2
```

---

#### Method 2: **Create a Closure**
Wrap the `setTimeout` call in an immediately invoked function expression (IIFE) to capture the current value of `i`.

```javascript
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i);
}
```

**Output**:
```
0
1
2
```

---

### Key Takeaways:
1. `var` is **function-scoped**, so it doesn't create a new scope for each iteration of a loop.
2. `let` is **block-scoped**, which ensures that each iteration has its own separate variable.
3. Closures can be used to "lock in" values for asynchronous operations.

---

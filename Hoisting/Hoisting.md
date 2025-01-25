## Does `let` and `const` support hoisting.

Yes, `let` and `const` support hoisting, but their behavior differs significantly from `var`. Here's a breakdown:

### **Hoisting Overview**
- **Hoisting**: A process where variable and function declarations are moved to the top of their containing scope during the compile phase.

### **Behavior of `let` and `const`**
- `let` and `const` are hoisted, but they are not initialized during the hoisting process.
- They remain in a **temporal dead zone (TDZ)** from the start of the block until the line where they are explicitly declared.
- Accessing these variables before their declaration results in a **ReferenceError**.

### **Example**
```javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
const b = 20;
```

### **Key Points**
1. **Temporal Dead Zone (TDZ)**: The time between the start of the block scope and the variable declaration. Accessing a `let` or `const` variable during this period throws an error.
2. `let` and `const` are block-scoped, unlike `var`, which is function-scoped.
3. `const` requires an immediate initialization, whereas `let` does not.

### **Comparison with `var`**
```javascript
console.log(c); // undefined (due to hoisting)
var c = 30;

console.log(d); // ReferenceError: Cannot access 'd' before initialization
let d = 40;

console.log(e); // ReferenceError: Cannot access 'e' before initialization
const e = 50;
```

### Why This Behavior?
The TDZ ensures that variables declared with `let` and `const` behave predictably and avoid issues caused by accessing variables before they are defined.

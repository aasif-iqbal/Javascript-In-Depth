# Strict Mode
### Detailed Explanation of `"use strict"`

`"use strict"` is a directive in JavaScript that enables **strict mode**, a restricted variant of JavaScript. It helps you write cleaner, more secure, and error-free code by preventing certain actions and throwing more exceptions.

---

### **How to Enable Strict Mode**

1. **Globally in a Script**: Add `"use strict";` at the top of your JavaScript file.
   ```javascript
   "use strict";
   x = 10; // ReferenceError: x is not defined
   ```

2. **In a Specific Function**: Add `"use strict";` within a function's body to limit its scope.
   ```javascript
   function example() {
       "use strict";
       y = 5; // ReferenceError: y is not defined
   }
   example();
   ```

3. **Modules**: By default, ES6 modules are in strict mode, so you don't need `"use strict"` explicitly.

---

### **Key Features and Benefits of Strict Mode**

1. **Prevents Undeclared Variables**
   - In non-strict mode, assigning a value to an undeclared variable creates it as a global variable.
   - Strict mode prevents this and throws a `ReferenceError`.
   ```javascript
   "use strict";
   x = 10; // ReferenceError: x is not defined
   ```

2. **Eliminates `this` Binding for Global Context**
   - In strict mode, `this` in a global context is `undefined` instead of the global object (`window` or `global`).
   ```javascript
   "use strict";
   console.log(this); // undefined
   ```

3. **Prevents Duplicate Parameter Names**
   - Duplicate parameter names in functions are not allowed, ensuring code clarity.
   ```javascript
   "use strict";
   function example(a, a) { // SyntaxError
       return a;
   }
   ```

4. **Disallows Octal Literals**
   - Octal numeric literals like `012` are prohibited in strict mode.
   ```javascript
   "use strict";
   let num = 012; // SyntaxError: Octal literals are not allowed
   ```

5. **Throws Errors for Assigning to Read-Only Properties**
   - In non-strict mode, assigning to read-only properties fails silently.
   - Strict mode throws an error.
   ```javascript
   "use strict";
   const obj = Object.freeze({ a: 1 });
   obj.a = 2; // TypeError: Cannot assign to read-only property 'a'
   ```

6. **Disallows `with` Statements**
   - The `with` statement is forbidden in strict mode as it can make code ambiguous and hard to optimize.
   ```javascript
   "use strict";
   with (Math) { // SyntaxError
       console.log(sin(2));
   }
   ```

7. **Secure `eval`**
   - Variables created inside `eval` are not added to the surrounding scope.
   ```javascript
   "use strict";
   eval("let x = 2;");
   console.log(x); // ReferenceError: x is not defined
   ```

8. **Prevents Deleting Certain Objects or Variables**
   - Deleting variables, functions, or arguments throws an error.
   ```javascript
   "use strict";
   let x = 5;
   delete x; // SyntaxError: Cannot delete variable 'x'
   ```

9. **Forbids Setting `NaN`, `Infinity`, or `undefined`**
   - These cannot be redefined or assigned new values.
   ```javascript
   "use strict";
   NaN = 123; // TypeError: Cannot assign to read-only property
   ```

---

### **Why Use Strict Mode?**

1. **Catches Errors Early**: Many silent errors in non-strict mode throw exceptions in strict mode, making bugs easier to detect and fix.
2. **Prevents Accidental Globals**: It ensures variables are explicitly declared, reducing global scope pollution.
3. **Better Performance**: Strict mode makes it easier for JavaScript engines to optimize code.
4. **Future-Proof Code**: Some features incompatible with future versions of JavaScript are disallowed in strict mode.

---

### **When Not to Use Strict Mode**
Strict mode may not be suitable in:
1. **Legacy Codebases**: Older code relying on non-strict behaviors may break.
2. **Third-Party Libraries**: If the library doesn't follow strict mode rules, it can cause errors when integrated.

---

### Example: Mixing Strict and Non-Strict Modes
```javascript
// Non-strict mode
var globalVar = 10;

function strictExample() {
    "use strict";
    undeclaredVar = 20; // ReferenceError
}
strictExample();

console.log(globalVar); // 10 (non-strict mode behavior)
```

---

### Best Practices
- Always use `"use strict";` for modern JavaScript development.
- When transitioning to strict mode in legacy projects, start with specific functions before enabling it globally.

---

**Suggestions for Next Steps:**
**a.** Would you like examples of strict vs non-strict behaviors for advanced features?  
**b.** Should I help you enforce `"use strict"` in your existing codebase?
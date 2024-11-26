# Var, Let & Const
The `let`, `var`, and `const` keywords in JavaScript are used to declare variables, but they differ in terms of scope, reassignability, and behavior. Here’s a concise breakdown:

---

### 1. **`var`**
- **Scope**: 
  - Function-scoped: Accessible within the function where declared.
  - Not block-scoped, meaning it ignores `{}` blocks like `if` or `for`.
- **Hoisting**:
  - Hoisted to the top of its scope but initialized as `undefined`.
- **Reassignability**:
  - Can be re-declared and reassigned within its scope.
- **Behavior**:
  - More error-prone due to its loose scoping rules.

```javascript
function exampleVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (accessible outside the block)
}
exampleVar();
```

---

### 2. **`let`**
- **Scope**:
  - Block-scoped: Accessible only within the block `{}` where declared.
- **Hoisting**:
  - Hoisted but not initialized. Accessing it before declaration causes a `ReferenceError` due to the *temporal dead zone*.
- **Reassignability**:
  - Cannot be re-declared in the same scope but can be reassigned.
- **Behavior**:
  - Safer than `var` for managing scope.

```javascript
function exampleLet() {
  if (true) {
    let x = 10;
  }
  // console.log(x); // ReferenceError: x is not defined
}
exampleLet();
```

---

### 3. **`const`**
- **Scope**:
  - Block-scoped like `let`.
- **Hoisting**:
  - Hoisted but not initialized. Accessing it before declaration causes a `ReferenceError` due to the *temporal dead zone*.
- **Reassignability**:
  - Cannot be re-declared or reassigned. Must be initialized during declaration.
  - However, if the value is an object or array, its properties or elements can be mutated.
- **Behavior**:
  - Ideal for constants or immutable bindings.

```javascript
function exampleConst() {
  const x = 10;
  // x = 20; // TypeError: Assignment to constant variable

  const arr = [1, 2, 3];
  arr.push(4); // Allowed because array contents can be modified.
  console.log(arr); // [1, 2, 3, 4]
}
exampleConst();
```

---

### Key Differences:
| Feature                | `var`                  | `let`                    | `const`                  |
|------------------------|------------------------|--------------------------|--------------------------|
| **Scope**              | Function-scoped        | Block-scoped             | Block-scoped             |
| **Hoisting**           | Hoisted (initialized)  | Hoisted (uninitialized)  | Hoisted (uninitialized)  |
| **Reassignability**    | Re-declared/reassigned | Reassigned but not re-declared | Neither re-declared nor reassigned |
| **Behavior**           | Loosely scoped         | Safer scoping            | Immutable bindings       |

---

### When to Use:
1. **Use `let`** for variables whose values will change (preferred over `var`).
2. **Use `const`** for variables whose bindings should not change.
3. Avoid **`var`** unless working with legacy code or where necessary.

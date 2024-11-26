# Var, Let & Const
The `let`, `var`, and `const` keywords in JavaScript are used to declare variables, but they differ in terms of scope, reassignability, and behavior. Here’s a concise breakdown:

---

### 1. **`var`**
- **Scope**: 
  - Function-scoped: Accessible within the function where declared or to the global scope if declared outside a function.
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
  - let is also hoisted, but it is not initialized. It is in the "temporal dead zone" from the start of the block until the declaration is encountered.
- **Reassignability**:
  - Cannot be re-declared in the same scope but can be reassigned.
  ```js
  function scope(){
    if(1){
        let x = 2;
        // let x = 3; Can not redeclar
         x = 3 // re-assign
        console.log(x);
        }
    }
    scope()
  ```
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


## In Details
**What happens if you declare a `const` variable as an object or array? Can you modify the contents of the object or array?**

When you declare a variable using `const`, it means that the variable itself is **immutable**—i.e., you cannot reassign the variable to a new value or reference after it is initialized. However, **immutability only applies to the reference** of the variable, not the contents of objects or arrays that the variable points to. This distinction is crucial for understanding how `const` behaves when used with complex data types like objects and arrays.

### 1. **`const` with Primitive Values**

For primitive values (like numbers, strings, booleans), declaring a `const` means the value cannot be changed or reassigned:

```js
const num = 10;
num = 20; // Error: Assignment to constant variable
```

In this case, `num` holds a primitive value, and any attempt to reassign `num` results in an error.

### 2. **`const` with Objects**

When you declare an object with `const`, the object itself is **stored in memory** and the `const` variable holds a **reference** (or pointer) to the memory location of that object. While you can't reassign the variable to point to a different object, you can still modify the contents of the object (its properties) because the reference itself hasn’t changed.

Example:

```js
const person = { name: "Alice", age: 25 };

// Allowed: Modifying the properties of the object
person.age = 30; 
person.name = "Bob";

// Allowed: Adding a new property
person.city = "New York";

// Not Allowed: Reassigning the entire object
person = { name: "Charlie", age: 35 }; // Error: Assignment to constant variable
```

**Explanation**:
- **Modifying properties** (`person.age = 30`): This works because the reference to the object has not changed—`person` still points to the same memory location, but the contents of that object are being modified.
- **Adding properties** (`person.city = "New York"`): Similarly, you can add new properties to the object because the reference to the object remains the same.
- **Reassignment** (`person = { ... }`): This results in an error because `const` prohibits reassigning the reference to a different object.

### 3. **`const` with Arrays**

Arrays in JavaScript are also objects, so the same principles apply. You cannot reassign the array reference, but you can modify the contents of the array (i.e., add, remove, or change elements).

Example:

```js
const arr = [1, 2, 3];

// Allowed: Modifying elements of the array
arr[0] = 10;

// Allowed: Adding new elements
arr.push(4);

// Allowed: Removing elements
arr.pop();

// Not Allowed: Reassigning the entire array
arr = [5, 6, 7]; // Error: Assignment to constant variable
```

**Explanation**:
- **Changing elements** (`arr[0] = 10`): This is allowed because it changes an element inside the array without changing the reference to the array.
- **Adding elements** (`arr.push(4)`): Adding elements using `push` or other methods works because the array itself is not being reassigned, only its contents are changing.
- **Removing elements** (`arr.pop()`): Similarly, `pop` removes an element, but it does not reassign the array itself.
- **Reassigning the array** (`arr = [5, 6, 7]`): This throws an error because `const` prevents you from changing the reference to the array and pointing it to a different array.

### Why Does This Behavior Happen?

The key concept here is **reference immutability** versus **content mutability**. 

- A `const` variable holds a reference to a value stored in memory. For primitive values, that value is stored directly, so trying to change it violates the `const` rule.
- For objects and arrays, the `const` variable points to a memory location where the object/array is stored. While the reference (the pointer) is immutable (i.e., cannot point to another memory location), the contents at that memory location can be changed. This is why the properties of an object or elements of an array can be modified even when declared with `const`.

### Key Points to Remember:
- **`const` prevents reassignment** of the variable, but it does not prevent **modification of the contents** of an object or array.
- **Primitive values** declared with `const` cannot be changed, because they directly store their value.
- **Objects and arrays** declared with `const` can have their contents modified, but the reference to the object or array cannot change.

This behavior provides a flexible way of ensuring that variables pointing to complex data types remain consistent (i.e., their reference doesn’t change), while allowing for changes within those data structures.
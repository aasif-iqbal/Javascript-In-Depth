## How to do object immutiable deep freeze using recursive.

To **make an object deeply immutable (deep freeze)** in JavaScript, you can use a **recursive function** that:

1. Freezes the current object using `Object.freeze`.
2. Recursively freezes all nested objects and arrays.

---

### ✅ Deep Freeze Function (Recursive)

```js
function deepFreeze(obj) {
  // Freeze the current object
  Object.freeze(obj);

  // Freeze properties if they are objects (and not already frozen)
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Object.isFrozen(obj[key])
    ) {
      deepFreeze(obj[key]);  // Recursive call
    }
  }

  return obj;
}
```

---

### ✅ Example Usage:

```js
const user = {
  name: 'John',
  address: {
    city: 'Delhi',
    pin: 110011
  },
  skills: ['JS', 'Node']
};

deepFreeze(user);

// Test: This won't have any effect
user.name = 'Mike';               // ❌ Ignored
user.address.city = 'Mumbai';     // ❌ Ignored
user.skills.push('React');        // ❌ Ignored

console.log(user);
```

---

### ✅ Notes:

* `Object.freeze()` only **shallow freezes** the object by default.
* This recursive function ensures **deep immutability**.
* Works for both **nested objects** and **arrays**, since arrays are also objects in JavaScript.

---

## Would you like a version that handles **circular references** too?

To handle **circular references** while performing a **deep freeze**, you can use a `WeakSet` to keep track of visited objects. This prevents infinite recursion when the same object is encountered again.

---

### ✅ Deep Freeze with Circular Reference Handling

```js
function deepFreeze(obj, seen = new WeakSet()) {
  if (obj === null || typeof obj !== 'object') return obj;

  // If already seen, skip to avoid circular reference loop
  if (seen.has(obj)) return obj;

  // Mark this object as seen
  seen.add(obj);

  // Freeze the object itself
  Object.freeze(obj);

  // Recursively deep freeze properties
  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      deepFreeze(value, seen);
    }
  }

  return obj;
}
```

---

### ✅ Example with Circular Reference:

```js
const a = {
  name: 'A',
  child: {
    name: 'Child of A'
  }
};

a.child.parent = a; // Create circular reference

deepFreeze(a);

// These operations will fail silently or throw in strict mode
a.name = 'New A';                      // ❌
a.child.name = 'New Child';           // ❌
a.child.parent.name = 'Circular';     // ❌

console.log(a);
```

---

### ✅ Why This Works:

* `WeakSet` stores object references without preventing garbage collection.
* It ensures each object is only frozen once, preventing infinite loops from circular references.

[Garbage-Collector](https://www.youtube.com/shorts/IABmAgEuNTI)

## how GC decides what to free.
Great question 👌 — this is one of the most important concepts in **JavaScript memory management**.

---

## 🔹 How Garbage Collector (GC) decides what to free?

The GC frees memory based on **reachability**.

### ✅ 1. Roots

Every program has **root objects**:

* In browsers → `window`
* In Node.js → `global`
* Plus things like the current call stack, local variables, closures in scope, etc.

### ✅ 2. Reachability

A value is **reachable** if:

* It can be accessed directly from roots, OR
* It can be reached by following references from other reachable objects.

Example:

```js
let user = { name: "Aasif" };
```

* `user` is a root reference → reachable.
* The object `{ name: "Aasif" }` is reachable because `user` points to it.

If we do:

```js
user = null;
```

* The object `{ name: "Aasif" }` is now unreachable.
* GC will **mark** it as unreachable and **free it**.

---

## 🔹 3. Algorithm (Mark-and-Sweep in V8)

1. **Mark phase** → GC starts at the roots, marks all reachable objects.
2. **Sweep phase** → Anything not marked = unreachable → freed.
3. **Compaction** (sometimes) → Moves live objects together to avoid memory fragmentation.

---

## 🔹 4. Examples

### Example 1: Simple Unreachability

```js
let obj = { value: 10 };
obj = null; // now object is unreachable → GC frees it
```

### Example 2: Circular References (still collected if unreachable)

```js
function createCycle() {
  let a = {};
  let b = {};
  a.ref = b;
  b.ref = a;
  return true;
}

createCycle(); 
```

* `a` and `b` reference each other, but if nothing outside references them, they are **unreachable**, so GC frees them.

---

## 🔹 5. What GC does NOT free

GC **only frees unreachable memory**.
If you still keep a reference (even accidentally), it will **not** be freed.

```js
let cache = {};
function store() {
  cache.bigData = new Array(1000000).fill("data");
}
store();
// even if you don’t need it, as long as `cache.bigData` exists → GC cannot free it
```

---

✅ **In summary:**
GC frees memory of values that are **unreachable from the root set** (no active references). Even circular references are fine, as long as they’re unreachable. But **if you accidentally keep a reference (global vars, closures, event listeners, caches)** → GC won’t touch it → memory leak.

---

Would you like me to also show you **how GC works differently for `WeakMap`/`WeakSet` vs `Map`/`Set`** (this often comes in interviews)?

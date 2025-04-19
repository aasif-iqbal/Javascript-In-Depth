
# What does the word reference mean.
Awesome question! The word **“reference”** is key to understanding how memory and variables work in JavaScript (and other languages too).

---

## 🧠 **What Does "Reference" Mean?**

A **reference** is like a **pointer** or a **link** to where data is stored in memory — **not the data itself**.

So when you pass an object or array to a function, you're not giving it the whole object — you're giving it a **reference** to the place in memory where that object lives.

---

### 🔍 Visual Analogy:

Think of this like:

> 📦 `let box = 📍123`  
> (The variable `box` doesn't hold the thing — it holds the *address* where the thing lives.)

---

## 📌 Real-Life Example:

```js
let user = { name: "Aasif" };
let ref = user;
```

Here’s what’s happening:

- `user` holds a reference (e.g., memory address like `#abc123`)
- `ref` now points to the same memory address
- So changing `ref.name` also changes `user.name`, because they point to the same object

```js
ref.name = "Iqbal";

console.log(user.name); // "Iqbal" ✅
```

Both `ref` and `user` are just **references** to the same underlying object.

---

## ⚠️ With Primitives (No Reference)

```js
let a = 5;
let b = a;
b = 10;

console.log(a); // 5 ✅ Not affected
```

Here:
- `a` holds the actual value `5`
- `b = a` copies that value
- They are now **independent**

---

## 📝 Summary

| Concept         | Value                     |
|------------------|---------------------------|
| **Primitive**    | Holds the value itself    |
| **Object/Array** | Holds a reference (memory address) |
| **Reference**    | A link to where data is stored in memory |

---

# For Interview

## Call By Value 
### 📘 **Definition of Call by Value (in JavaScript - Interview Friendly)**

> **Call by Value** means that when a variable is passed to a function, **a copy of the variable's value** is passed. Changes made inside the function **do not affect** the original variable outside the function.

---

### ✅ Example:

```js
function update(num) {
  num = num + 10;
  console.log("Inside function:", num); // 20
}

let x = 10;
update(x);
console.log("Outside function:", x);    // 10
```

Here, `x` is passed **by value**, so `num` inside the function is just a **copy** of `x`. Changing `num` does **not** change `x`.

---

## Call By Reference
### 📘 **Definition of Call by Reference (Interview-Friendly)**

> **Call by Reference** means that when a variable (usually an object or array) is passed to a function, **a reference (memory address)** to the original value is passed. Changes made inside the function **directly affect** the original variable.

---

### ✅ Example:

```js
function update(obj) {
  obj.name = "Updated";
}

let person = { name: "Aasif" };
update(person);
console.log(person.name); // Output: "Updated"
```

Here, the object `person` is passed **by reference**, so `obj` inside the function **refers to the same object in memory**. Any changes made to `obj` will reflect on `person`.

---

### 🧠 Note in JavaScript:
- **Primitives** (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) → passed by **value**.
- **Objects & Arrays** → passed by **reference**.

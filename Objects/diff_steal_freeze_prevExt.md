## What is the difference between Object.freeze(), Object.seal(), and Object.preventExtensions().

Great question 🚀 This is often asked in **JavaScript interviews** to test understanding of immutability. Let’s break it down clearly:

---

### 🔹 **1. `Object.preventExtensions(obj)`**

* **What it does:**
  Stops new properties from being **added** to the object.
* **What still works:**

  * You can modify existing properties.
  * You can delete properties.

✅ Example:

```js
const obj = { name: "Aasif" };

Object.preventExtensions(obj);
obj.age = 25;  // ❌ won't be added
obj.name = "Iqbal"; // ✅ can modify
delete obj.name; // ✅ can delete

console.log(obj); // {}
```

---

### 🔹 **2. `Object.seal(obj)`**

* **What it does:**

  * Prevents adding new properties.
  * Prevents deleting properties.
* **What still works:**

  * You can still **modify values** of existing properties.

✅ Example:

```js
const obj = { name: "Aasif" };

Object.seal(obj);
obj.age = 25;     // ❌ can't add
delete obj.name;  // ❌ can't delete
obj.name = "Iqbal"; // ✅ can modify

console.log(obj); // { name: "Iqbal" }
```

---

### 🔹 **3. `Object.freeze(obj)`**

* **What it does:**

  * Prevents adding properties.
  * Prevents deleting properties.
  * Prevents modifying existing properties (values).

✅ Example:

```js
const obj = { name: "Aasif" };

Object.freeze(obj);
obj.age = 25;     // ❌ can't add
delete obj.name;  // ❌ can't delete
obj.name = "Iqbal"; // ❌ can't modify

console.log(obj); // { name: "Aasif" }
```

---

### 🔑 **Summary Table**

| Method                     | Add New Props | Delete Props | Modify Existing Props |
| -------------------------- | ------------- | ------------ | --------------------- |
| `Object.preventExtensions` | ❌ No          | ✅ Yes        | ✅ Yes                 |
| `Object.seal`              | ❌ No          | ❌ No         | ✅ Yes                 |
| `Object.freeze`            | ❌ No          | ❌ No         | ❌ No                  |

---

👉 Bonus: In strict mode (`"use strict"`), violations throw errors; otherwise, they fail silently.

---

Do you want me to also show you how to **check if an object is sealed, frozen, or non-extensible** (with `Object.isSealed`, `Object.isFrozen`, etc.)?

Great example 👌 — this is one of those **prototype trap questions** that interviewers love to ask.
Let’s break it down step by step.

---

### 🔹 Code Recap

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```

---

### 🔹 What’s Happening?

1. **`rabbit.sayHi();` → `"Rabbit"`**

   * Here `sayHi` is called **on the instance `rabbit`**.
   * Inside `sayHi`, `this` refers to the calling object (`rabbit`).
   * So `this.name === "Rabbit"` ✅.

---

2. **`Rabbit.prototype.sayHi();` → `undefined`**

   * Here the caller is **`Rabbit.prototype`** object itself.
   * `Rabbit.prototype` is just `{ sayHi: function() { ... } }`.
   * It does **not** have a `name` property.
   * So inside `sayHi`, `this === Rabbit.prototype`.
   * Since `Rabbit.prototype.name` is `undefined`, result = `undefined`.

---

3. **`Object.getPrototypeOf(rabbit).sayHi();` → `undefined`**

   * `Object.getPrototypeOf(rabbit)` returns `rabbit.__proto__`, which is **`Rabbit.prototype`**.
   * So this is the same as `Rabbit.prototype.sayHi()`.
   * Again, `this === Rabbit.prototype`, which has no `name`, so → `undefined`.

---

4. **`rabbit.__proto__.sayHi();` → `undefined`**

   * `rabbit.__proto__` is also `Rabbit.prototype`.
   * Same reasoning as above → `undefined`.

---

### 🔹 Key Concept

👉 In JavaScript, the value of `this` is determined by **the object before the dot at the time of the call**.
It does **not depend on where the function is defined**.

* `rabbit.sayHi()` → `this === rabbit`
* `Rabbit.prototype.sayHi()` → `this === Rabbit.prototype`
* `Object.getPrototypeOf(rabbit).sayHi()` → `this === Rabbit.prototype`
* `rabbit.__proto__.sayHi()` → `this === Rabbit.prototype`

---

✅ **That’s why only the first one prints `"Rabbit"`, and the others give `undefined`.**

---

⚡ Interview Tip: If they ask *“How to force `sayHi` to work on prototype itself?”* → you could set `Rabbit.prototype.name = "ProtoRabbit";` and then those calls would show `"ProtoRabbit"`.

---

Do you want me to also show **how `bind`, `call`, and `apply` can change the result** in this example (another common follow-up question)?

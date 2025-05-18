## How JIT Works

JIT (Just-In-Time) compilation is a behind-the-scenes performance optimization technique used by JavaScript engines like **V8** (used in Chrome and Node.js) to make your JavaScript code run faster.

Although you can’t “see” JIT directly in code, you **can observe its behavior** by writing code that the engine **optimizes (hot path)** vs **de-optimizes (cold path or polymorphic code)**.

---

## 🔍 What is JIT Compilation in JS?

* JavaScript is **interpreted**, but modern engines **optimize frequently-run code** by compiling it to **machine code at runtime** using JIT.
* V8 (used by Chrome and Node.js) has:

  * **Interpreter (Ignition)** for fast startup.
  * **JIT Compiler (TurboFan)** for optimizing hot code.

Sure! Here's a **simple and easy-to-understand** JIT example in JavaScript:

---

### ✅ Optimizable Function Example

```js
function square(x) {
  return x * x;
}

// Run it many times with same type
for (let i = 0; i < 1_000_000; i++) {
  square(10);
}
```

### 💡 What happens here:

* `square()` is called **1 million times** with a **number**.
* The JavaScript engine sees this function is **"hot"** (frequently used).
* JIT will **compile it to machine code** for better performance.

---

### ❌ De-Optimized Example

```js
function square(x) {
  return x * x;
}

for (let i = 0; i < 1_000_000; i++) {
  if (i === 999_999) {
    square("10");  // passing a string once
  } else {
    square(10);    // passing a number
  }
}
```

### 🧠 What happens here:

* The function starts off as **optimizable**.
* On the last call, you pass a **string**.
* Engine sees **inconsistent input types**, so it **de-optimizes** the function (slower again).

---

### ▶️ Try it in Node.js with trace:

Run with:

```bash
node --trace-opt --trace-deopt yourfile.js
```

You'll see messages like:

```
[optimizing: square ]
[deoptimizing (deopt #1): begin  at square]
```

---

Would you like a ready-to-run `.js` file you can test this with?

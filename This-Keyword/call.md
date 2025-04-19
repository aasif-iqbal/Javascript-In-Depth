Here are **interview-friendly definitions** of `call()`, `apply()`, and `bind()` in JavaScript — with clear meaning and distinction:

---

### 📌 **`call()` Method**

> The `call()` method invokes a function **with a specified `this` context** and **arguments passed individually**.

```js
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: "Alice" };
greet.call(person, "Hello"); // Output: Hello, Alice
```

✅ Use when you want to **immediately call** the function with a specific `this`.

---

### 📌 **`apply()` Method**

> The `apply()` method is similar to `call()`, but it takes **arguments as an array**.

```js
greet.apply(person, ["Hi"]); // Output: Hi, Alice
```

✅ Useful when you already have your arguments in an array (e.g., `[x, y]` for `Math.max.apply()`).

---

### 📌 **`bind()` Method**

> The `bind()` method **does not call the function immediately**. Instead, it **returns a new function** with a fixed `this` value and optional pre-set arguments.

```js
const boundGreet = greet.bind(person, "Hey");
boundGreet(); // Output: Hey, Alice
```

✅ Use when you want to **delay execution** or **store the function** for later use with a specific `this`.

---

### 🧠 Summary Table

| Method  | Executes Immediately | Arguments Format         | Returns a New Function | `this` Context |
|---------|----------------------|---------------------------|-------------------------|----------------|
| `call()` | ✅ Yes               | Comma-separated (arg1, arg2) | ❌ No                | Custom         |
| `apply()` | ✅ Yes              | Array of args ([arg1, arg2]) | ❌ No               | Custom         |
| `bind()`  | ❌ No               | Optional pre-set args        | ✅ Yes               | Custom         |

---

Let me know if you'd like a visual or real-world example (like in event handlers, classes, or callbacks)!
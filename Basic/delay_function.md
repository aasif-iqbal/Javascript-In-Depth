## Write a program such that after 1 sec it show 1,2,3,4 Done!

!Note: Run below program on Programiz.com

Perfect 👍 — this is a **classic async timing problem** in JavaScript.

Let’s go step-by-step on how to **show each array element with a 1-second delay** between each one.

---

## 🧩 Example Array

```js
const arr = [1, 2, 3, 4, 5];
```

---

## ✅ **Correct Way (using async/await + for...of)**

```js
const arr = [1, 2, 3, 4, 5];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showElements() {
  for (const num of arr) {
    console.log(num);
    await delay(1000); // wait 1 second before next iteration
  }
  console.log("Done!");
}

showElements();
```

🧠 Output (each printed after 1 sec):

```
1
2
3
4
5
Done!
```

✅ **Explanation**

* `delay(ms)` returns a promise that resolves after given milliseconds.
* `await delay(1000)` pauses the loop for 1 second before going to the next item.
* Works because `for...of` supports `await`.

---

## ❌ Wrong Way (using forEach)

```js
arr.forEach(async (num) => {
  await delay(1000);
  console.log(num);
});
```

🧠 Output (all printed together after ~1 second, not sequentially):

```
1
2
3
4
5
```

⚠️ Why?
`forEach` doesn’t **await** async callbacks — it starts all iterations **in parallel**.

---

## ⚡ Alternative: Using `for` Loop

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
  await delay(1000);
}
```

Works the same as `for...of`, just uses indexes.

---

## 💡 Bonus: If You Want to Repeat Forever

You can even make it run in a loop continuously:

```js
async function showLoop() {
  while (true) {
    for (const num of arr) {
      console.log(num);
      await delay(1000);
    }
  }
}

showLoop();
```

---

## 🧭 Summary

| Loop Type           | Works with await | Output delay          |
| ------------------- | ---------------- | --------------------- |
| `for...of`          | ✅ Yes            | ✅ Sequential (1s gap) |
| `for`               | ✅ Yes            | ✅ Sequential (1s gap) |
| `forEach`           | ❌ No             | ❌ All at once         |
| `map + Promise.all` | ✅ Parallel       | ❌ No delay between    |

---

## Explain delay(ms) function
```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```
what is resolve here, and why we pass resolve in setTimeout.

Great question 👏 — this is where **Promises** and **asynchronous behavior** in JavaScript really click.
Let’s break it down carefully 👇

---

### 💡 Code in question

```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

### 🧠 Step-by-step explanation

#### 1️⃣ `new Promise(...)`

When you create a new `Promise`, you pass a **function** (called the *executor*) that has two parameters:

```js
new Promise((resolve, reject) => { ... })
```

* `resolve` → a function you call when the async operation **succeeds**
* `reject` → a function you call when the async operation **fails**

So, `resolve` is **not a keyword**, it’s just a function provided automatically by the Promise constructor.

---

#### 2️⃣ Inside our `delay` function

We only care about *resolving* the promise after a certain delay, so we only use `resolve`.

```js
resolve => setTimeout(resolve, ms)
```

* `setTimeout(resolve, ms)` means:

  * “Call the function `resolve` after `ms` milliseconds.”
* We **don’t pass parentheses** (`resolve()`), because `setTimeout` expects a *function reference* to call later.

---

#### 3️⃣ What happens when `setTimeout` finishes?

After `ms` milliseconds, `setTimeout` calls the `resolve()` function.

This changes the Promise state from **pending → fulfilled**.

---

#### 4️⃣ Using the `delay` function

```js
async function showElements() {
  const arr = [1, 2, 3];
  for (let item of arr) {
    console.log(item);
    await delay(1000); // waits 1 second before moving to the next
  }
}
showElements();
```

Here’s what happens:

* Each `await delay(1000)` pauses the loop for 1 second.
* After 1 second, `resolve()` is called → Promise is fulfilled → loop continues.

---

### 🔁 Visualization

| Time (s) | Action    |
| -------- | --------- |
| 0        | Print `1` |
| 1        | Print `2` |
| 2        | Print `3` |
| 3        | Done ✅    |

---

### 🧩 Summary

| Term                      | Meaning                                                     |
| ------------------------- | ----------------------------------------------------------- |
| `resolve`                 | A function that marks the Promise as completed successfully |
| `setTimeout(resolve, ms)` | Runs `resolve()` after `ms` milliseconds                    |
| `delay(ms)`               | A Promise that fulfills after `ms` milliseconds             |
| `await delay(ms)`         | Pauses code execution for `ms` milliseconds                 |

---

Would you like me to show **how this same concept can be written without `async/await`**, using `.then()` — to see the difference?




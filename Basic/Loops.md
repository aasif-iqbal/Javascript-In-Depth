## Different Types of Loops

Good question 👍 — let’s go through **all the types of loops in JavaScript**, both **basic** and **advanced**, with examples and when to use each.

---

## 🧩 1. **for loop**

Used when you know **how many times** you want to loop.

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

🧠 Runs 5 times: `0 1 2 3 4`

✅ **Use when:** You know the exact number of iterations.

---

## 🔁 2. **while loop**

Runs **as long as** a condition is true.

```js
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

✅ **Use when:** You don’t know the number of iterations in advance.

---

## 🔂 3. **do...while loop**

Executes the block **at least once**, even if the condition is false.

```js
let i = 5;
do {
  console.log(i);
  i++;
} while (i < 5);
```

🧠 Output → `5` (runs once even though condition is false)

✅ **Use when:** You want to guarantee at least one execution.

---

## 🧱 4. **for...of loop**

Used to iterate over **iterable objects** like arrays, strings, Maps, Sets.

```js
const arr = [10, 20, 30];
for (const value of arr) {
  console.log(value);
}
```

🧠 Output → `10 20 30`

✅ **Use when:** You need **values** from arrays, strings, etc.

---

## 🔡 5. **for...in loop**

Used to loop over **object keys** (enumerable properties).

```js
const user = { name: "John", age: 25 };
for (const key in user) {
  console.log(key, user[key]);
}
```

🧠 Output →

```
name John
age 25
```

✅ **Use when:** You need **keys** from an object (not arrays!).

---

## ⚙️ 6. **Array iteration methods (higher-order loops)**

Technically not “loops” but often used instead of them.

### a. `forEach()`

Executes a function for each array element.

```js
[1, 2, 3].forEach(num => console.log(num));
```

✅ No `break` or `continue` allowed.

---

### b. `map()`

Creates a new array after applying a function to each element.

```js
const result = [1, 2, 3].map(num => num * 2);
console.log(result); // [2, 4, 6]
```

---

### c. `filter()`

Filters elements based on a condition.

```js
const even = [1, 2, 3, 4].filter(num => num % 2 === 0);
console.log(even); // [2, 4]
```

---

### d. `reduce()`

Reduces array to a single value.

```js
const sum = [1, 2, 3].reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 6
```

---

## 🌀 7. **for await...of**

Used to loop through **asynchronous iterables** (e.g., promises or streams).

```js
const promises = [Promise.resolve(1), Promise.resolve(2)];

for await (const result of promises) {
  console.log(result);
}
```

🧠 Output → `1 2`

✅ **Use when:** Working with async data streams or APIs.

---

## 🧮 Summary Table

| Loop Type                         | Used For                       | Works On | Can Break | Async Support        |
| --------------------------------- | ------------------------------ | -------- | --------- | -------------------- |
| `for`                             | Fixed iteration                | Any      | ✅         | ❌                    |
| `while`                           | Unknown iteration count        | Any      | ✅         | ❌                    |
| `do...while`                      | At least once                  | Any      | ✅         | ❌                    |
| `for...of`                        | Iterables (Array, String, Map) | ✅        | ✅         | ✅ (`for await...of`) |
| `for...in`                        | Object properties              | Object   | ✅         | ❌                    |
| `forEach()`                       | Array iteration                | Array    | ❌         | ❌                    |
| `map()` / `filter()` / `reduce()` | Functional style               | Array    | ❌         | ❌                    |

---

Would you like me to show **which loop performs best** (speed comparison between `for`, `forEach`, `map`, etc.) with a real benchmark example?

## Problem with callback

Perfect 🚀 Let’s walk step by step from **callbacks → Promises → async/await**, and see how the **IoC problem gets solved**.

---

## 🟢 Step 1: Callback (IoC Problem)

```js
function getUser(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: "Aasif" });
  }, 1000);
}

getUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log("User:", user);
});
```

🔴 Problems:

* **IoC** → `setTimeout` decides *when* to call your function.
* If library calls `callback` twice, you’re in trouble.
* Nesting multiple async tasks → "callback hell".

---

## 🟡 Step 2: Callback Hell Example

```js
getUser(1, (err, user) => {
  if (err) return console.error(err);

  getOrders(user.id, (err, orders) => {
    if (err) return console.error(err);

    getPayment(orders[0], (err, payment) => {
      if (err) return console.error(err);

      console.log("Payment:", payment);
    });
  });
});
```

👉 Code is deeply nested, error handling everywhere, **hard to maintain**.
This is the classic **IoC + callback hell problem**.

---

## 🟠 Step 3: Using Promises (IoC Reduced)

We wrap async tasks in a **Promise**.
Now, instead of the library calling *your callback*, it returns a **Promise**, and *you* decide what to do.

```js
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: "Aasif" });
    }, 1000);
  });
}

function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["order1", "order2"]);
    }, 1000);
  });
}

function getPayment(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ orderId, status: "Paid" });
    }, 1000);
  });
}

// Now we control chaining
getUser(1)
  .then((user) => getOrders(user.id))
  .then((orders) => getPayment(orders[0]))
  .then((payment) => console.log("Payment:", payment))
  .catch((err) => console.error(err));
```

✅ Improvements:

* No deep nesting → flat `.then` chain.
* Error handling centralized with `.catch`.
* Control flows **back to you**, not the library.

---

## 🔵 Step 4: async/await (Best & Cleanest)

Async/await is just **syntactic sugar** on top of Promises.
Now async code looks like sync code.

```js
async function showPayment() {
  try {
    const user = await getUser(1);
    const orders = await getOrders(user.id);
    const payment = await getPayment(orders[0]);
    console.log("Payment:", payment);
  } catch (err) {
    console.error(err);
  }
}

showPayment();
```

✅ Final Result:

* **Readability** → looks synchronous.
* **Error handling** → simple `try...catch`.
* **No IoC problem** → library only returns a Promise; *you decide* how and when to use it.

---

📌 **Summary**

* **Callback → IoC problem** (loss of control, messy nesting).
* **Promise → fixes IoC** (library gives you a Promise, you chain/control it).
* **Async/await → best solution** (clean, readable, error-handling friendly).

---

Would you like me to also explain **how internally async/await is still using callbacks under the hood** (event loop + microtasks), but shields you from IoC pain?

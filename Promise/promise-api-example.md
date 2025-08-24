## Perfect example(real-world) for promise.all(), promise.allSettled(), promise.any() and promise.race().

Perfect 👍 Let’s take **real-world relatable scenarios** for each of the Promise APIs so you can clearly understand when to use `Promise.all()`, `Promise.allSettled()`, `Promise.any()`, and `Promise.race()`.

---

## 1. **`Promise.all()`** – Wait for **all promises to succeed**

👉 Use when **all async tasks are required**, and if one fails, the whole thing fails.

**Example (real-world):**
You’re building a **travel booking system**. A user wants to book:

* Flight
* Hotel
* Taxi

All three must succeed; otherwise, the booking fails.

```js
const flight = new Promise((resolve) => setTimeout(() => resolve("Flight booked"), 1000));
const hotel = new Promise((resolve) => setTimeout(() => resolve("Hotel booked"), 1500));
const taxi  = new Promise((resolve) => setTimeout(() => resolve("Taxi booked"), 2000));

Promise.all([flight, hotel, taxi])
  .then((results) => console.log("All booked:", results))
  .catch((err) => console.log("Booking failed:", err));
```

✅ If any booking fails → the whole process fails.

---

## 2. **`Promise.allSettled()`** – Wait for **all promises regardless of success/failure**

👉 Use when you need the **results of everything**, even if some fail.

**Example (real-world):**
You’re running a **social media dashboard** that fetches posts from multiple platforms:

* Twitter
* Facebook
* Instagram

You want results from all, but some APIs may fail.

```js
const twitter = new Promise((resolve) => setTimeout(() => resolve("Twitter data"), 1000));
const facebook = new Promise((_, reject) => setTimeout(() => reject("Facebook API error"), 1500));
const instagram = new Promise((resolve) => setTimeout(() => resolve("Instagram data"), 2000));

Promise.allSettled([twitter, facebook, instagram])
  .then((results) => console.log("Results:", results));
```

✅ You’ll always get the **status of each API** (fulfilled or rejected).

---

## 3. **`Promise.any()`** – First **successful** promise wins

👉 Use when you need just **one success**, ignoring failures.

**Example (real-world):**
You’re fetching product data from multiple **backup servers**. You only need the fastest one that works.

```js
const server1 = new Promise((_, reject) => setTimeout(() => reject("Server1 failed"), 1000));
const server2 = new Promise((resolve) => setTimeout(() => resolve("Server2 response"), 1500));
const server3 = new Promise((resolve) => setTimeout(() => resolve("Server3 response"), 2000));

Promise.any([server1, server2, server3])
  .then((result) => console.log("Fastest success:", result))
  .catch((err) => console.log("All servers failed:", err));
```

✅ Only the **first successful response** matters.

---

## 4. **`Promise.race()`** – First promise to settle (success OR failure) wins

👉 Use when **timing matters**, not just success.

**Example (real-world):**
You want to fetch data, but if it takes too long, you fall back to a **timeout error**.

```js
const fetchData = new Promise((resolve) => setTimeout(() => resolve("Data fetched"), 2000));
const timeout = new Promise((_, reject) => setTimeout(() => reject("Request timed out!"), 1500));

Promise.race([fetchData, timeout])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

✅ Whichever finishes first (data or timeout) decides the outcome.

---

### 🔑 Quick Recap:

* **`Promise.all()`** → All must succeed (best for combined operations like booking system).
* **`Promise.allSettled()`** → Get all results regardless of success/failure (best for dashboards).
* **`Promise.any()`** → First success wins (best for backup servers).
* **`Promise.race()`** → First to finish (success OR failure) wins (best for timeout handling).
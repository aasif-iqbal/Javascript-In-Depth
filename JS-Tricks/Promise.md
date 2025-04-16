## Convert Promise chaining to async-await

Yes, your `asynTask` function is **syntactically and logically correct** for chaining Promises, assuming that:

- `functionA`, `functionB`, `functionC`, and `functionD` each return a Promise.
- `logger.error(err)` is a valid way to log errors (i.e., `logger` is defined and has an `error` method).

Here's a quick breakdown:

```js
function asynTask() {
  return functionA()
    .then((valueA) => functionB(valueA))   // Takes output of A, passes to B
    .then((valueB) => functionC(valueB))   // Takes output of B, passes to C
    .then((valueC) => functionD(valueC))   // Takes output of C, passes to D
    .catch((err) => logger.error(err));    // Catches any error in the chain
}
```

### Optional: Cleaner version using async/await

If you'd like a cleaner version using `async/await`, here’s how you can rewrite it:

```js
async function asynTask() {
  try {
    const valueA = await functionA();
    const valueB = await functionB(valueA);
    const valueC = await functionC(valueB);
    const result = await functionD(valueC);
    return result;
  } catch (err) {
    logger.error(err);
  }
}
```

Both versions are valid; the choice depends on your preference or codebase style. Let me know if you'd like help converting any real functions into this format!

---

## 📄 JavaScript Interview Sheet: Promises & Async/Await

### 🔗 Promise Chaining

---

**Q1.**  
**What will be the output of the following code?**
```js
functionA()
  .then((res) => {
    console.log('A resolved');
    return functionB(res);
  })
  .then((res) => {
    throw new Error('Something went wrong');
  })
  .then(() => {
    console.log('This will not be called');
  })
  .catch((err) => {
    console.error('Caught error:', err.message);
  });
```
**Answer:**
```
A resolved
Caught error: Something went wrong
```

---

**Q2.**  
**Rewrite the following code using Promise chaining:**
```js
async function runTasks() {
  const data1 = await getData1();
  const data2 = await getData2(data1);
  return process(data2);
}
```
**Answer:**
```js
function runTasks() {
  return getData1()
    .then((data1) => getData2(data1))
    .then((data2) => process(data2));
}
```

---

**Q3.**  
**Identify the mistake in the Promise chain below:**
```js
getUser()
  .then((user) => getProfile(user))
  .catch((err) => console.log(err))
  .then((profile) => showProfile(profile));
```
**Answer:**
The final `.then()` runs even if an error occurred earlier because `.catch()` handles the error and continues the chain. If `getUser()` fails, `profile` will be `undefined`, possibly causing an issue in `showProfile(profile)`.

**Fix:**
```js
getUser()
  .then((user) => getProfile(user))
  .then((profile) => showProfile(profile))
  .catch((err) => console.log(err));
```

---

**Q4.**  
**Convert this Promise chain into an async/await version:**
```js
loadConfig()
  .then((config) => initApp(config))
  .then((app) => startApp(app))
  .catch((err) => handleError(err));
```
**Answer:**
```js
async function start() {
  try {
    const config = await loadConfig();
    const app = await initApp(config);
    await startApp(app);
  } catch (err) {
    handleError(err);
  }
}
```

---

**Q5.**  
**What happens if you forget to return a value in a `.then()` block?**
```js
fetchData()
  .then((res) => {
    process(res); // No return
  })
  .then((result) => {
    console.log(result); // What is logged?
  });
```
**Answer:**
`undefined` will be logged because nothing was returned in the first `.then()`, so the next `.then()` receives `undefined`.

---

### ⏳ Async/Await

---

**Q6.**  
**Explain the difference between `await something()` and `return something().then(...)`.**
**Answer:**
Both wait for the Promise to resolve, but `await` can only be used inside async functions and leads to more readable, synchronous-looking code. `.then()` can be used in both sync and async contexts and supports chaining.

---

**Q7.**  
**What happens if you don’t `await` an async function inside another async function?**  
> Example:  
```js
async function outer() {
  inner(); // no await
  console.log('Done');
}
```
**Answer:**
`inner()` will run asynchronously and `console.log('Done')` may execute before `inner()` completes. This may lead to race conditions or missed results.

---

**Q8.**  
**Can you use `try...catch` instead of `.catch()` with Promises?**  
**Answer:**
Yes, inside `async` functions:
```js
async function run() {
  try {
    const result = await someAsyncFunction();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```
This is equivalent to:
```js
someAsyncFunction()
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

---

**Q9.**  
**What will the following code print?**
```js
async function test() {
  try {
    throw new Error('Oops!');
  } catch {
    return 'Recovered';
  } finally {
    return 'Finally Block';
  }
}

test().then(console.log);
```
**Answer:**
```
Finally Block
```
The `finally` block overrides the return from `catch`. `finally` always runs and if it returns something, it becomes the final result.

---

**Q10.**  
**How can you handle multiple Promises in sequence vs. parallel using async/await?**  
**Answer:**
**Sequential:**
```js
async function sequential() {
  const res1 = await task1();
  const res2 = await task2(res1);
  const res3 = await task3(res2);
  return res3;
}
```

**Parallel:**
```js
async function parallel() {
  const [res1, res2, res3] = await Promise.all([task1(), task2(), task3()]);
  return { res1, res2, res3 };
}
```
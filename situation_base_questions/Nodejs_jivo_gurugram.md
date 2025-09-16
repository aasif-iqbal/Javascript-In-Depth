## Nodejs(handle api call) - if one api is not working then jump to next and if next api is not working jump to next.

Ahh, got it now! 🔥
You’re talking about **aggregating multiple APIs** — meaning:

> **Call API 1 → if it fails, call API 2 → if it fails, call API 3... until one works (or all fail).**

This is a **fallback mechanism**, not MongoDB aggregation.
Let’s implement it 👇

---

## ✅ **API Fallback Implementation in Node.js**

Here’s a clean way to do it:

```js
// Mock APIs for demo
const api1 = async () => {
  throw new Error("API 1 failed"); // simulate failure
};

const api2 = async () => {
  return { data: "✅ Response from API 2" }; // success
};

const api3 = async () => {
  return { data: "✅ Response from API 3" };
};

// Fallback function
async function fetchWithFallback(apis) {
  for (let i = 0; i < apis.length; i++) {
    try {
      const result = await apis[i]();
      console.log(`✅ Success from API ${i + 1}`);
      return result;
    } catch (error) {
      console.warn(`⚠️ API ${i + 1} failed: ${error.message}`);
    }
  }
  console.error("❌ All APIs failed!");
  return null;
}

// Usage
(async () => {
  const response = await fetchWithFallback([api1, api2, api3]);
  console.log("Final Response:", response);
})();
```

---

### 🧠 **How It Works**

1. Takes an array of API functions (`api1, api2, api3`).
2. Loops over them sequentially.
3. If one **succeeds**, it **returns immediately** (stops checking others).
4. If all fail, it returns `null`.

---

### ✅ **Output Example**

```
⚠️ API 1 failed: API 1 failed
✅ Success from API 2
Final Response: { data: '✅ Response from API 2' }
```

---

## 🔥 When to Use This

* **Redundancy:** Multiple APIs provide the same data (different providers).
* **Failover:** Primary service might be down, fallback to secondary.
* **Performance:** You might try the fastest API first, then fallback to slower ones.

---

Would you like me to make a **concurrent + fallback version** (try first API, but also start others in parallel and pick whichever succeeds first — fastest win)?
This is called a **"race strategy"** and is used in high-performance systems.

---
## From Grok.
I'll create a Node.js script that demonstrates aggregating multiple APIs with a fallback mechanism, trying each API in sequence until one succeeds or all fail.

```js
const axios = require('axios');

// List of API endpoints to try in order
const apiEndpoints = [
  'https://api1.example.com/data',
  'https://api2.example.com/data',
  'https://api3.example.com/data'
];

// Function to try APIs sequentially with fallback
async function fetchWithFallback() {
  for (let i = 0; i < apiEndpoints.length; i++) {
    try {
      const response = await axios.get(apiEndpoints[i], {
        timeout: 5000 // 5 second timeout per request
      });
      console.log(`Success: Got data from API ${i + 1}`);
      return response.data; // Return data on first successful response
    } catch (error) {
      console.error(`API ${i + 1} failed: ${error.message}`);
      if (i === apiEndpoints.length - 1) {
        throw new Error('All APIs failed');
      }
      // Continue to next API if current one fails
    }
  }
}

// Example usage
async function main() {
  try {
    const data = await fetchWithFallback();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```


## Question:
i have a n api's and i want to create aggrigate function for api in nodejs so that after 1st api failed then i jump to next and if 2nd failed it automatically jump to next and until it get working api if all fail it return null

Got it — you want a **fallback API aggregator** in Node.js:

* Try API 1 → if it fails, try API 2 → if it fails, try API 3 → …
* If **all fail**, return `null`.
* This is very useful for **redundant services** or **load balancing**.

Here’s a clean implementation:

```js
const axios = require('axios');

/**
 * Try APIs one by one until one succeeds.
 * @param {string[]} apiUrls - List of API endpoints.
 * @param {object} [options] - Axios request options (headers, params etc.)
 * @returns {Promise<any|null>} - Returns first successful response data or null.
 */
async function aggregateApiCalls(apiUrls, options = {}) {
  for (let i = 0; i < apiUrls.length; i++) {
    try {
      console.log(`🔄 Trying API ${i + 1}: ${apiUrls[i]}`);
      const response = await axios.get(apiUrls[i], options);

      // Consider non-2xx status as failure
      if (response.status >= 200 && response.status < 300) {
        console.log(`✅ Success at API ${i + 1}`);
        return response.data;
      } else {
        console.warn(`⚠️ API ${i + 1} failed with status: ${response.status}`);
      }
    } catch (err) {
      console.warn(`❌ API ${i + 1} failed: ${err.message}`);
    }
  }

  console.error("🚫 All APIs failed.");
  return null;
}

// Example usage:
(async () => {
  const apis = [
    "https://invalid-api.com/data", // will fail
    "https://jsonplaceholder.typicode.com/posts/1", // will succeed
    "https://jsonplaceholder.typicode.com/posts/2"  // will not be called
  ];

  const result = await aggregateApiCalls(apis);
  console.log("Final Result:", result);
})();
```

---

### ✅ How This Works

1. Takes an array of API URLs.
2. Uses a `for` loop (sequential, so order matters).
3. Calls each API with `axios.get`.
4. If one succeeds (`2xx` response), returns immediately.
5. If all fail → returns `null`.

---

### 🔑 Benefits of This Approach

* **Sequential execution:** Doesn’t call all APIs at once — only calls next if previous fails.
* **Error-handling built-in:** Catches network errors & logs them.
* **Customizable:**

  * You can pass `headers`, `params`, or `timeout` in `options`.
  * You can extend it to POST requests by changing `axios.get` to `axios.post`.

---

Would you like me to **add a timeout per API** (so if one API is hanging too long, it automatically jumps to the next)? This will make it more robust for real production use.

Perfect — adding a **timeout per API** is a great idea to avoid getting stuck on a slow or hanging API.
We'll use **Axios' `timeout` option** so that if an API doesn't respond within the given time, we skip it and move to the next one.

Here’s the improved version:

```js
const axios = require('axios');

/**
 * Try APIs one by one until one succeeds, with timeout for each.
 * @param {string[]} apiUrls - List of API endpoints.
 * @param {object} [options] - Axios request options (headers, params etc.)
 * @param {number} timeoutMs - Timeout in milliseconds for each API call.
 * @returns {Promise<any|null>} - Returns first successful response data or null.
 */
async function aggregateApiCalls(apiUrls, options = {}, timeoutMs = 5000) {
  for (let i = 0; i < apiUrls.length; i++) {
    try {
      console.log(`🔄 Trying API ${i + 1}: ${apiUrls[i]}`);
      const response = await axios.get(apiUrls[i], {
        ...options,
        timeout: timeoutMs // ⏱ timeout per request
      });

      if (response.status >= 200 && response.status < 300) {
        console.log(`✅ Success at API ${i + 1}`);
        return response.data;
      } else {
        console.warn(`⚠️ API ${i + 1} failed with status: ${response.status}`);
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.warn(`⏳ API ${i + 1} timed out after ${timeoutMs}ms`);
      } else {
        console.warn(`❌ API ${i + 1} failed: ${err.message}`);
      }
    }
  }

  console.error("🚫 All APIs failed.");
  return null;
}

// Example usage:
(async () => {
  const apis = [
    "https://invalid-api.com/data", // will fail
    "https://httpstat.us/200?sleep=6000", // will timeout (takes 6s)
    "https://jsonplaceholder.typicode.com/posts/1" // will succeed
  ];

  const result = await aggregateApiCalls(apis, {}, 3000); // 3s timeout
  console.log("Final Result:", result);
})();
```

---

### ✅ What Changed

✔ **Timeout support per API** (default `5000ms`, configurable).
✔ **Logs timeout clearly** so you know which API was too slow.
✔ Still preserves sequential fallback behavior.

---

### 🔧 Sample Output

For the above example:

```
🔄 Trying API 1: https://invalid-api.com/data
❌ API 1 failed: getaddrinfo ENOTFOUND invalid-api.com
🔄 Trying API 2: https://httpstat.us/200?sleep=6000
⏳ API 2 timed out after 3000ms
🔄 Trying API 3: https://jsonplaceholder.typicode.com/posts/1
✅ Success at API 3
Final Result: { userId: 1, id: 1, title: "...", body: "..." }
```

---

Would you like me to make it **parallel + first-success** (race mode) — meaning all APIs fire at once and you take whichever responds first, ignoring failures? (That’s useful if speed matters more than order.)

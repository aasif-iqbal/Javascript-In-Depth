```sql
Coding Challenge
 
Write a Node.js function in TypeScript that fetches a list of user profiles. A mock API function that
sometimes fails will be provided.
The function must accept an array of user IDs and fetch the corresponding profiles using the mock API.
If an API call fails, you must implement an exponential backoff retry strategy. The final result
should contain a profile object for successful fetches and null for any that failed after all retries.
 
You can use the following mock API function:
```
```js
const mockExternalApi = async (userId: number): Promise<{ id: number; name: string }> => {
  // 30% chance of failure to simulate a flaky network
  const isFlaky = Math.random() > 0.7; 
  if (isFlaky) {
    throw new Error(`Mock API failure for user ${userId}`);
  }
  return {
    id: userId,
    name: `User ${userId}`  };
};
```
Requirements:
Function Signature: The main function should be named fetchUserProfiles and accept an array of user IDs.
Concurrency: Fetch the user profiles concurrently to improve performance.
Error Handling: Gracefully handle failed API requests. If a request repeatedly fails after several 
retries, log the error but do not halt the entire process.
Exponential Backoff: Implement a retry mechanism that waits for a progressively longer period after 
each failed attempt before retrying.
Output: Return an array of user profile objects or null values for any failed fetches.
```json
Sample Input: [1, 2, 3, 4, 5]
Expected Output:
 
[{
    id: 1, name: "User 1"
},{
    id: 2, name: "User 2"
},
null,
{
    id: 4, name: "User 4"
},{
    id: 5, name: "User 5"
}]
```
### Solution - (in Javascript)

```js
const { setTimeout } = require('timers/promises');

// Mock API function provided
const mockExternalApi = async (userId) => {
  const isFlaky = Math.random() > 0.7;
  if (isFlaky) {
    throw new Error(`Mock API failure for user ${userId}`);
  }
  return {
    id: userId,
    name: `User ${userId}`
  };
};

// Configuration for retry mechanism
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 100;
const MAX_DELAY_MS = 1000;

/**
 * Fetches user profiles concurrently with exponential backoff retry strategy
 * @param {number[]} userIds Array of user IDs to fetch profiles for
 * @returns {Promise<(Object|null)[]>} Array of user profiles or null for failed fetches
 */
async function fetchUserProfiles(userIds) {
  // Helper function to fetch a single profile with retry
  async function fetchWithRetry(userId, retries = MAX_RETRIES, delay = INITIAL_DELAY_MS) {
    try {
      return await mockExternalApi(userId);
    } catch (error) {
      if (retries === 0) {
        console.error(`Failed to fetch profile for user ${userId} after ${MAX_RETRIES} retries: ${error.message}`);
        return null;
      }

      // Calculate next delay with exponential backoff and some jitter
      const nextDelay = Math.min(delay * 2, MAX_DELAY_MS) * (1 + Math.random() * 0.1);
      await setTimeout(nextDelay);
      
      return fetchWithRetry(userId, retries - 1, nextDelay);
    }
  }

  // Fetch all profiles concurrently using Promise.all
  const profilePromises = userIds.map(userId => fetchWithRetry(userId));
  return Promise.all(profilePromises);
}

// Example usage
async function main() {
  const userIds = [1, 2, 3, 4, 5];
  const profiles = await fetchUserProfiles(userIds);
  console.log(profiles);
}

// Run example
main().catch(console.error);
```

### Solution (in typescript)

```ts
import { setTimeout } from 'timers/promises';

// Mock API function provided
const mockExternalApi = async (userId: number): Promise<{ id: number; name: string }> => {
  const isFlaky = Math.random() > 0.7;
  if (isFlaky) {
    throw new Error(`Mock API failure for user ${userId}`);
  }
  return {
    id: userId,
    name: `User ${userId}`
  };
};

// Interface for user profile
interface UserProfile {
  id: number;
  name: string;
}

// Configuration for retry mechanism
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 100;
const MAX_DELAY_MS = 1000;

/**
 * Fetches user profiles concurrently with exponential backoff retry strategy
 * @param userIds Array of user IDs to fetch profiles for
 * @returns Array of user profiles or null for failed fetches
 */
async function fetchUserProfiles(userIds: number[]): Promise<(UserProfile | null)[]> {
  // Helper function to fetch a single profile with retry
  async function fetchWithRetry(userId: number, retries: number = MAX_RETRIES, delay: number = INITIAL_DELAY_MS): Promise<UserProfile | null> {
    try {
      return await mockExternalApi(userId);
    } catch (error) {
      if (retries === 0) {
        console.error(`Failed to fetch profile for user ${userId} after ${MAX_RETRIES} retries: ${error.message}`);
        return null;
      }

      // Calculate next delay with exponential backoff and some jitter
      const nextDelay = Math.min(delay * 2, MAX_DELAY_MS) * (1 + Math.random() * 0.1);
      await setTimeout(nextDelay);
      
      return fetchWithRetry(userId, retries - 1, nextDelay);
    }
  }

  // Fetch all profiles concurrently using Promise.all
  const profilePromises = userIds.map(userId => fetchWithRetry(userId));
  return Promise.all(profilePromises);
}

// Example usage
async function main() {
  const userIds = [1, 2, 3, 4, 5];
  const profiles = await fetchUserProfiles(userIds);
  console.log(profiles);
}

// Run example
main().catch(console.error);
```

### Solution (with any lib(setTimeout()))
```js
Got it! Here’s the **JavaScript version** of the same solution (clean and production-ready):

```js
// Mock external API function (provided)
const mockExternalApi = async (userId) => {
  const isFlaky = Math.random() > 0.7; // 30% failure chance
  if (isFlaky) {
    throw new Error(`Mock API failure for user ${userId}`);
  }
  return {
    id: userId,
    name: `User ${userId}`
  };
};

// Utility function to wait for a given duration (ms)
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry wrapper with exponential backoff
async function fetchWithRetry(fn, retries = 3, delay = 500, factor = 2) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > retries) {
        console.error(`❌ Failed after ${retries} retries:`, error.message);
        return null;
      }
      const waitTime = delay * Math.pow(factor, attempt - 1);
      console.warn(`⚠️ Attempt ${attempt} failed. Retrying in ${waitTime} ms...`);
      await wait(waitTime);
    }
  }
  return null;
}

// Main function
async function fetchUserProfiles(userIds) {
  const results = await Promise.all(
    userIds.map(userId =>
      fetchWithRetry(() => mockExternalApi(userId), 3, 500, 2)
    )
  );
  return results;
}

// Example usage
(async () => {
  const input = [1, 2, 3, 4, 5];
  const profiles = await fetchUserProfiles(input);
  console.log(JSON.stringify(profiles, null, 2));
})();
```

---

### ✅ Features in This JavaScript Version

* **Parallel execution** with `Promise.all()` → Faster results.
* **Exponential backoff retry** → `500ms → 1000ms → 2000ms`.
* **Graceful error handling** → Returns `null` for failed calls, does not stop other requests.
* **Reusable retry logic** → `fetchWithRetry` can wrap any async function.

---

Would you like me to add **a concurrency limiter** (e.g., only 3 requests at a time) so this solution is safer for APIs with strict rate limits?

```
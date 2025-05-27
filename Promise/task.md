**Problem: Fetching User Data with Promises**

You are building a web application that needs to fetch user data from two different APIs sequentially. The first API provides a user’s basic profile (name and user ID), and the second API uses the user ID to fetch the user’s order history. However, both APIs are asynchronous and may fail due to network issues or invalid data.

**Task:**
Write a JavaScript function `getUserOrderDetails` that:
1. Takes a `username` as input.
2. Uses a Promise to fetch the user’s profile from a simulated API (`fetchUserProfile`).
3. If successful, uses the user ID from the profile to fetch the user’s order history from another simulated API (`fetchOrderHistory`).
4. Handles errors (e.g., if the username is invalid or the order history is unavailable).
5. Returns a Promise that resolves with an object containing the user’s name and their order history, or rejects with an appropriate error message.

**Simulated APIs:**
- `fetchUserProfile(username)`: Returns a Promise that resolves with `{ name: string, userId: number }` after 1 second. Rejects with "User not found" if the username is "invalid".
- `fetchOrderHistory(userId)`: Returns a Promise that resolves with an array of orders (e.g., `[{ orderId: 1, item: "Book" }, { orderId: 2, item: "Laptop" }]`) after 1 second. Rejects with "Orders unavailable" if the userId is less than 0.

**Example Output:**
- For username "john":
  - Resolves: `{ name: "John Doe", orders: [{ orderId: 1, item: "Book" }, { orderId: 2, item: "Laptop" }] }`
- For username "invalid":
  - Rejects: "User not found"

**Constraints:**
- Use Promises (not async/await) for this solution.
- Simulate API delays using `setTimeout`.
- Handle all possible errors gracefully.

---
It seems like you're asking if I’d like to provide a solution to the "Fetching User Data with Promises" problem I generated for you. Since my role is to assist you, I’ll assume you’re asking me to provide a solution to the problem. Here’s a JavaScript solution using Promises:

```javascript
// Simulated API to fetch user profile
function fetchUserProfile(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "invalid") {
        reject("User not found");
      } else {
        resolve({ name: "John Doe", userId: 123 });
      }
    }, 1000);
  });
}

// Simulated API to fetch order history
function fetchOrderHistory(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId < 0) {
        reject("Orders unavailable");
      } else {
        resolve([
          { orderId: 1, item: "Book" },
          { orderId: 2, item: "Laptop" }
        ]);
      }
    }, 1000);
  });
}

// Main function to get user order details
function getUserOrderDetails(username) {
  return fetchUserProfile(username)
    .then(profile => {
      // Successfully got profile, now fetch order history
      return fetchOrderHistory(profile.userId)
        .then(orders => {
          // Combine name and orders into one object
          return { name: profile.name, orders: orders };
        });
    })
    .catch(error => {
      // Handle any errors from either API
      throw new Error(error);
    });
}

// Test the function
getUserOrderDetails("john")
  .then(result => {
    console.log("Success:", result);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });

getUserOrderDetails("invalid")
  .then(result => {
    console.log("Success:", result);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });
```

**Explanation:**
- `fetchUserProfile` simulates an API call, resolving with a user profile object for valid usernames or rejecting for "invalid".
- `fetchOrderHistory` simulates fetching orders, resolving with an array of orders if the userId is valid, or rejecting if negative.
- `getUserOrderDetails` chains the Promises: it first fetches the profile, then uses the userId to fetch orders, and combines the results.
- Errors are caught and re-thrown as Error objects for consistent handling.
- The test cases demonstrate success (username "john") and failure (username "invalid").

**Output:**
- For "john": `Success: { name: "John Doe", orders: [{ orderId: 1, item: "Book" }, { orderId: 2, item: "Laptop" }] }`
- For "invalid": `Error: User not found`

Let me know if you’d like to modify the problem, test the solution, or explore a different aspect of Promises!
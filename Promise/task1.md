## Write a Promise-chain and also convert it into async-await

### **Scenario:**

You have an app where:

1. A user logs in.
2. Their profile is fetched.
3. Their recent activity is then loaded.
4. All results are displayed in the end.

---

### ✅ **Code Example with Promise Chaining**

```js
// Simulate user login
function loginUser(username, password) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (username === 'john' && password === '1234') {
				resolve({ userId: 1, username: 'john' });
			} else {
				reject('Invalid username or password');
			}
		}, 1000);
	});
}

// Simulate fetching user profile
function getUserProfile(userId) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ userId, name: 'John Doe', email: 'john@example.com' });
		}, 1000);
	});
}

// Simulate fetching recent activity
function getRecentActivity(userId) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(['Logged in', 'Updated profile', 'Posted a comment']);
		}, 1000);
	});
}

// Promise chaining
loginUser('john', '1234')
	.then((user) => {
		console.log('User logged in:', user.username);
		return getUserProfile(user.userId);
	})
	.then((profile) => {
		console.log('User Profile:', profile);
		return getRecentActivity(profile.userId);
	})
	.then((activity) => {
		console.log('Recent Activity:', activity);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
```

---

### ✅ Output:

```
User logged in: john
User Profile: { userId: 1, name: 'John Doe', email: 'john@example.com' }
Recent Activity: [ 'Logged in', 'Updated profile', 'Posted a comment' ]
```

Let me know if you want this same example rewritten using `async/await`!

---

Great! Here's the **same example rewritten using `async/await`** syntax for better readability and modern usage.

---

### ✅ **Async/Await Version**

```js
// Simulate user login
function loginUser(username, password) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (username === 'john' && password === '1234') {
				resolve({ userId: 1, username: 'john' });
			} else {
				reject('Invalid username or password');
			}
		}, 1000);
	});
}

// Simulate fetching user profile
function getUserProfile(userId) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ userId, name: 'John Doe', email: 'john@example.com' });
		}, 1000);
	});
}

// Simulate fetching recent activity
function getRecentActivity(userId) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(['Logged in', 'Updated profile', 'Posted a comment']);
		}, 1000);
	});
}

// Async function to handle the flow
async function showUserDashboard() {
	try {
		const user = await loginUser('john', '1234');
		console.log('User logged in:', user.username);

		const profile = await getUserProfile(user.userId);
		console.log('User Profile:', profile);

		const activity = await getRecentActivity(profile.userId);
		console.log('Recent Activity:', activity);
	} catch (error) {
		console.error('Error:', error);
	}
}

// Run the async function
showUserDashboard();
```

---

### ✅ Output (same as promise chaining version):

```
User logged in: john
User Profile: { userId: 1, name: 'John Doe', email: 'john@example.com' }
Recent Activity: [ 'Logged in', 'Updated profile', 'Posted a comment' ]
```

This version is easier to read and maintain, especially when handling multiple asynchronous steps sequentially.

Let me know if you want to add parallel execution or error retries!

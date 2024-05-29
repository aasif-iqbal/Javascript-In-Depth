A callback is a function that is passed as an argument to another function, which can be executed after the first function completes its operation. Here's a simple example in JavaScript to illustrate how callbacks work:

### Example: Using Callbacks in JavaScript

Imagine you have a function that performs some asynchronous operation, like fetching data from a server, and you want to execute another function once this operation is complete. Here's how you might do it using a callback:

#### Step 1: Define the callback function
This is the function that will be called after the main operation is complete.

```javascript
function displayMessage(message) {
    console.log(message);
}
```

#### Step 2: Define the function that accepts a callback
This function performs some operation and then executes the callback function.

```javascript
function fetchData(callback) {
    // Simulate a time-consuming operation using setTimeout
    setTimeout(() => {
        // Operation complete, now call the callback
        callback("Data fetched successfully!");
    }, 2000); // 2 seconds delay to mimic async operation
}
```

#### Step 3: Execute the main function and pass the callback
Call `fetchData` and pass `displayMessage` as the callback function.

```javascript
fetchData(displayMessage);
```

### Full Example Code

```javascript
// Step 1: Define the callback function
function displayMessage(message) {
    console.log(message);
}

// Step 2: Define the function that accepts a callback
function fetchData(callback) {
    // Simulate a time-consuming operation using setTimeout
    setTimeout(() => {
        // Operation complete, now call the callback
        callback("Data fetched successfully!");
    }, 2000); // 2 seconds delay to mimic async operation
}

// Step 3: Execute the main function and pass the callback
fetchData(displayMessage);
```

### Explanation
1. **displayMessage**: This function simply logs a message to the console.
2. **fetchData**: This function simulates fetching data asynchronously using `setTimeout`. Once the data fetching simulation is complete, it calls the provided callback function (`displayMessage`) with a message.
3. **fetchData(displayMessage)**: This line executes the `fetchData` function and passes `displayMessage` as the callback. When the data fetching is done, `displayMessage` is called with the message `"Data fetched successfully!"`.

When you run this code, you will see the message `"Data fetched successfully!"` printed to the console after a 2-second delay, demonstrating the use of a callback function.
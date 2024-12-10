# Async & await
Let's dive deep into `async` and `await` in JavaScript, which provide a more intuitive and readable way to handle asynchronous operations compared to traditional callbacks or Promises.

### Overview

`async` and `await` are syntactic sugar built on top of Promises. They simplify writing and reading asynchronous code, making it look more like synchronous code.

### The `async` Keyword

The `async` keyword is used to define an asynchronous function. When a function is declared with `async`, it automatically returns a Promise. If the function explicitly returns a value, the Promise will resolve with that value. If the function throws an error, the Promise will be rejected with that error.

**Example**:
```javascript
async function myAsyncFunction() {
    return 'Hello, Async!';
}

myAsyncFunction().then((value) => console.log(value)); // Output: 'Hello, Async!'
```

### The `await` Keyword

The `await` keyword can only be used inside an `async` function. It pauses the execution of the `async` function until the Promise is resolved or rejected. It makes the code wait for the Promise to settle and returns the resolved value. If the Promise is rejected, an error is thrown.

**Example**:
```javascript
async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

### Using `async` and `await`

#### Example: Fetching Data from an API
Here’s an example of using `async` and `await` to fetch data from an API:

```javascript
async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

getData();
```
### Detailed Steps

1. **Define an `async` Function**: The `getData` function is defined as `async`, allowing the use of `await` within it.
2. **Fetch Data**: The `await fetch('...')` pauses the execution of the function until the fetch Promise is resolved.
3. **Check Response**: The response is checked to ensure it’s okay (status code is in the 200-299 range).
4. **Parse JSON**: `await response.json()` pauses the execution until the Promise returned by `response.json()` is resolved, resulting in the parsed JSON data.
5. **Handle Errors**: The `try...catch` block is used to handle any errors that may occur during the fetch or parsing process.

### Handling Multiple Promises

You can use `async` and `await` to handle multiple Promises sequentially or in parallel.

#### Sequential Execution
**Example**:
```javascript
async function fetchSequentially() {
    try {
        const response1 = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data1 = await response1.json();

        const response2 = await fetch('https://jsonplaceholder.typicode.com/todos/2');
        const data2 = await response2.json();

        console.log('Data 1:', data1);
        console.log('Data 2:', data2);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

fetchSequentially();
```

#### Parallel Execution
**Example**:
```javascript
async function fetchInParallel() {
    try {
        const [response1, response2] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/todos/1'),
            fetch('https://jsonplaceholder.typicode.com/todos/2')
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();

        console.log('Data 1:', data1);
        console.log('Data 2:', data2);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

fetchInParallel();
```

### Summary

- **`async` Functions**: Return a Promise and allow the use of `await`.
- **`await` Keyword**: Pauses the execution of an `async` function, waiting for the Promise to resolve or reject.
- **Error Handling**: Use `try...catch` blocks to handle errors in `async` functions.
- **Sequential vs. Parallel**: Use `await` for sequential operations and `Promise.all` for parallel operations.

Using `async` and `await` improves the readability and maintainability of asynchronous code by making it look and behave more like synchronous code. 

Guess output
```js
async function test(){
    console.log('A')
    let task1 = await setTimeout(()=>{
        console.log('task 1')
    }, 2000);
    console.log('B')
    let task2 = await setTimeout(()=>{
        console.log('task 2')
    }, 1000);
    console.log('C')
}

test().then(()=>{
    setTimeout(()=>{
        console.log('task A1')
    }, 2000);
}).then(()=>{
     setTimeout(()=>{
        console.log('task A2')
    }, 1000);
})
```
output:
```js
A
B
C
task 2
task A2
task 1
task A1

```
## In `async` and `await` functions, the `await` keyword is used to pause the execution of the function until the Promise returned by the function is resolved.

NO,
```js
async function monitor(){
console.log('start')
await task1()
console.log('end')    
}


function task1(){
    return setTimeout(() => {
        console.log('task 1 - done')
    }, 5000);
}

monitor()
```
output:
```js       
start
end
task 1 - done
```

## Suppose we have multiple async task and we want use task1 output in task2 and task 2 output in task3. what should we use , `Promise` or `async- await`.

For a situation where you have multiple asynchronous tasks, and each task's output is used as input to the next, you should use **`async/await`** because it allows you to write code that is easier to read and reason about compared to chaining multiple Promises.

### Why Use `async/await`?

1. **Sequential Execution**: `async/await` naturally handles sequential tasks where the output of one task is required by the next.
2. **Improved Readability**: The code structure with `async/await` resembles synchronous code, making it easier to follow the logic.
3. **Error Handling**: You can use `try...catch` blocks to handle errors in a more straightforward manner than with `.catch` in Promises.

### Example: Using `async/await`

```javascript
async function task1() {
    console.log("Running Task 1");
    return new Promise((resolve) => setTimeout(() => resolve(10), 1000));
}

async function task2(input) {
    console.log(`Running Task 2 with input: ${input}`);
    return new Promise((resolve) => setTimeout(() => resolve(input * 2), 1000));
}

async function task3(input) {
    console.log(`Running Task 3 with input: ${input}`);
    return new Promise((resolve) => setTimeout(() => resolve(input + 5), 1000));
}

async function executeTasks() {
    try {
        const result1 = await task1();
        const result2 = await task2(result1);
        const result3 = await task3(result2);
        console.log(`Final Result: ${result3}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

executeTasks();
```

### Why Not Just Promises?

Using Promises involves chaining `.then` calls, which can become cumbersome and less readable when dependencies increase:

```javascript
task1()
    .then((result1) => task2(result1))
    .then((result2) => task3(result2))
    .then((result3) => {
        console.log(`Final Result: ${result3}`);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });
```

While this works, it's harder to read and maintain, especially when adding error handling or additional logic.

### Summary

- **Use `async/await`** for tasks requiring sequential execution with dependencies between tasks.
- **Use Promises** when tasks are independent and can be executed in parallel.

**Suggestions for further exploration:**
**a.** Add a scenario where one of the tasks fails and explore the error handling.  
**b.** Refactor the example to execute independent tasks in parallel using `Promise.all`.  
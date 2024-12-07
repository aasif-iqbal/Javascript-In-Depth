# What is closure.
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). When you create a closure, you gain access to an outer function’s scope from an inner function. Closures are automatically created every time a function is defined in JavaScript.

```js
function closureDemo(){
    //outerScope
    let _pvtVar = 10;
    
    return function innerFn(){
        //innerScope
        console.log(_pvtVar)
    }
}
let result = closureDemo();
result()
```
### another example
```js
function foo() {
    let b = 1;
    function inner() {
        return b;
    }
    return inner;
}
let get_func_inner = foo();

console.log(get_func_inner());
console.log(get_func_inner());
console.log(get_func_inner());
```
# when closure is created
In JavaScript, a **closure** is created when a function "remembers" the variables from its lexical scope even after the function is executed and the outer function has returned.

## When is a closure created?
1. **During Function Creation**: 
   A closure is formed when an inner function is defined inside an outer function and "captures" variables from the outer function's scope.

2. **When a Function is Returned**: 
   If an inner function is returned or passed outside its parent function, the closure retains access to the variables in the parent scope, even though the parent function has finished executing.

3. **Whenever a Function Retains References to its Outer Scope**:
   Closures are also created in scenarios like event handlers, callbacks, or even when simply accessing outer variables from within nested functions.

### Example of Closure
```javascript
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log(`Outer Variable: ${outerVariable}`);
        console.log(`Inner Variable: ${innerVariable}`);
    };
}

const closureInstance = outerFunction("outside");
closureInstance("inside"); 
// Output:
// Outer Variable: outside
// Inner Variable: inside
```

### Key Points:
- The `innerFunction` "remembers" `outerVariable` because it is part of its closure.
- Even if `outerFunction` has completed execution, the `innerFunction` retains access to `outerVariable`.

### When Closures are Commonly Used:
1. **Data Encapsulation**:
   ```javascript
   function counter() {
       let count = 0;
       return function() {
           count++;
           return count;
       };
   }
   const increment = counter();
   console.log(increment()); // 1
   console.log(increment()); // 2
   ```

2. **Event Listeners**:
   ```javascript
   function setup() {
       let name = "John";
       document.getElementById("btn").addEventListener("click", function() {
           console.log(`Hello, ${name}`);
       });
   }
   setup();
   ```

3. **Callbacks**:
   ```javascript
   function fetchData(url) {
       setTimeout(function() {
           console.log(`Fetching from ${url}`);
       }, 1000);
   }
   fetchData("https://api.example.com");
   ```

### Summary
A **closure** is created when a function retains access to variables in its outer lexical scope, enabling powerful patterns like data hiding, maintaining state, and asynchronous programming.

## Real world example: Closures are essential for handling callbacks and asynchronous operations

Absolutely, closures are indeed crucial for managing callbacks and asynchronous operations in JavaScript. Here's a real-world example where closures are used to handle asynchronous data fetching, such as making an API call and then processing the data once it's available.

### Example: Fetching Data from an API

Imagine you want to fetch user data from an API and then process it to display the user's name and email.

```javascript
// Function to fetch user data from an API
function fetchData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('Request failed'));
            }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send();
    });
}

// Function to process user data using a closure
function processUserData(url) {
    fetchData(url)
        .then(userData => {
            // This is where the closure comes into play
            return function() {
                console.log(`User Name: ${userData.name}`);
                console.log(`User Email: ${userData.email}`);
            };
        })
        .then(displayUserInfo => {
            // Calling the function returned by the closure
            displayUserInfo();
        })
        .catch(error => console.error(error));
}

// URL of the API endpoint
const apiURL = 'https://jsonplaceholder.typicode.com/users/1';
processUserData(apiURL);
```

### Explanation

1. **fetchData Function:** This function takes a URL and returns a promise that resolves with the fetched data or rejects if there's an error. 

2. **processUserData Function:** This function calls `fetchData` and processes the returned user data using a closure. The closure allows the function to remember and access the `userData` even after the asynchronous operation is complete.

3. **Using the Closure:** Once the data is fetched, the inner function (closure) is created to log the user's name and email. This inner function is then called to display the user information.

In this example, closures help manage asynchronous operations by ensuring that the data fetched asynchronously is accessible when needed. This pattern is often used in real-world applications to handle data fetching, event handling, and more.
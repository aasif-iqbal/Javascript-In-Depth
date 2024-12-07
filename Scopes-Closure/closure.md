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

## How to use multiple functions in closure.
Handling multiple functions inside a closure can be achieved by carefully organizing the functions so they share the same lexical environment. You can return multiple functions from the closure, either as properties of an object, methods of a class, or standalone functions that all have access to the closure's scope.

Here’s how to handle multiple functions inside a closure:

---

### 1. **Using an Object to Group Functions**
This is a straightforward way to manage multiple functions while sharing the same scope.

```javascript
function createCalculator() {
    let total = 0;

    return {
        add(value) {
            total += value;
            return total;
        },
        subtract(value) {
            total -= value;
            return total;
        },
        reset() {
            total = 0;
            return total;
        },
        getTotal() {
            return total;
        }
    };
}

const calculator = createCalculator();
console.log(calculator.add(5));       // 5
console.log(calculator.subtract(2));  // 3
console.log(calculator.getTotal());   // 3
console.log(calculator.reset());      // 0
```

In this example:
- `total` is shared across all functions via the closure.
- Each function has access to `total`.

---

### 2. **Using a Function Factory**
Here, each function returned can perform specific operations while maintaining access to the shared variables.

```javascript
function createOperations() {
    let value = 10;

    function multiply(factor) {
        value *= factor;
        return value;
    }

    function divide(divisor) {
        value /= divisor;
        return value;
    }

    function getValue() {
        return value;
    }

    return { multiply, divide, getValue };
}

const operations = createOperations();
console.log(operations.multiply(2)); // 20
console.log(operations.divide(4));   // 5
console.log(operations.getValue());  // 5
```

---

### 3. **Using a Class for Encapsulation**
Closures can also be created through classes by encapsulating functions and shared variables as methods and private fields.

```javascript
class Counter {
    #count = 0; // Private field

    increment() {
        this.#count++;
        return this.#count;
    }

    decrement() {
        this.#count--;
        return this.#count;
    }

    reset() {
        this.#count = 0;
        return this.#count;
    }

    getCount() {
        return this.#count;
    }
}

const myCounter = new Counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.decrement()); // 1
console.log(myCounter.reset());     // 0
```

---

### 4. **Using Closures for Private State**
If you need to maintain private variables that aren't accessible externally, use closures directly.

```javascript
function createLogger() {
    const logs = [];

    function log(message) {
        logs.push(message);
        console.log(message);
    }

    function getLogs() {
        return logs;
    }

    return { log, getLogs };
}

const logger = createLogger();
logger.log("First log");
logger.log("Second log");
console.log(logger.getLogs()); // ['First log', 'Second log']
```

---

### Key Strategies:
- **Shared Scope:** Ensure all the functions returned by the closure share the same lexical scope.
- **Encapsulation:** Return an object containing all the functions or methods you need.
- **Organization:** Keep the code structured for readability.

---

### Advantages:
- **Data Encapsulation:** Closures help keep variables private and inaccessible from the outside.
- **Shared State:** Multiple functions can interact with the same set of variables, avoiding global scope pollution.


## Should I add more practical use cases for multiple functions in closures?
Here are more **practical use cases** where handling multiple functions inside a closure proves beneficial:

---

### 1. **Authentication System**
Manage user login state with shared scope.

```javascript
function authManager() {
    let isAuthenticated = false;

    return {
        login(username, password) {
            // For simplicity, assume any non-empty username/password is valid
            if (username && password) {
                isAuthenticated = true;
                console.log(`${username} is logged in`);
                return isAuthenticated;
            }
            console.log("Login failed");
            return isAuthenticated;
        },
        logout() {
            isAuthenticated = false;
            console.log("Logged out");
            return isAuthenticated;
        },
        checkAuth() {
            console.log(`Authenticated: ${isAuthenticated}`);
            return isAuthenticated;
        }
    };
}

const auth = authManager();
auth.login("user", "password"); // user is logged in
auth.checkAuth();               // Authenticated: true
auth.logout();                  // Logged out
auth.checkAuth();               // Authenticated: false
```

---

### 2. **Custom Event Manager**
Create a simple event emitter to manage events using closures.

```javascript
function createEventEmitter() {
    const events = {};

    return {
        on(event, listener) {
            if (!events[event]) events[event] = [];
            events[event].push(listener);
        },
        emit(event, ...args) {
            if (events[event]) {
                events[event].forEach(listener => listener(...args));
            }
        },
        off(event, listener) {
            if (events[event]) {
                events[event] = events[event].filter(l => l !== listener);
            }
        }
    };
}

const emitter = createEventEmitter();

const greetListener = name => console.log(`Hello, ${name}!`);
emitter.on("greet", greetListener);
emitter.emit("greet", "Alice");  // Hello, Alice!
emitter.off("greet", greetListener);
emitter.emit("greet", "Bob");    // No output
```

---

### 3. **Shopping Cart System**
Implement a simple shopping cart with private state for items.

```javascript
function createCart() {
    const items = [];

    return {
        addItem(item) {
            items.push(item);
            console.log(`${item} added to cart`);
        },
        removeItem(item) {
            const index = items.indexOf(item);
            if (index > -1) {
                items.splice(index, 1);
                console.log(`${item} removed from cart`);
            } else {
                console.log(`${item} not found in cart`);
            }
        },
        getItems() {
            return [...items]; // Return a copy to prevent mutation
        },
        clearCart() {
            items.length = 0;
            console.log("Cart cleared");
        }
    };
}

const cart = createCart();
cart.addItem("Apple");         // Apple added to cart
cart.addItem("Banana");        // Banana added to cart
console.log(cart.getItems());  // ['Apple', 'Banana']
cart.removeItem("Apple");      // Apple removed from cart
cart.clearCart();              // Cart cleared
console.log(cart.getItems());  // []
```

---

### 4. **Rate Limiter**
Limit the number of actions a user can perform in a given timeframe.

```javascript
function rateLimiter(limit, interval) {
    let actions = 0;
    const reset = () => (actions = 0);
    setInterval(reset, interval);

    return {
        attempt() {
            if (actions < limit) {
                actions++;
                console.log(`Action allowed (${actions}/${limit})`);
                return true;
            }
            console.log("Rate limit exceeded");
            return false;
        },
        getRemaining() {
            return limit - actions;
        }
    };
}

const limiter = rateLimiter(3, 5000); // 3 actions allowed every 5 seconds
limiter.attempt(); // Action allowed (1/3)
limiter.attempt(); // Action allowed (2/3)
limiter.attempt(); // Action allowed (3/3)
limiter.attempt(); // Rate limit exceeded
console.log(`Remaining: ${limiter.getRemaining()}`); // Remaining: 0
```

---

### 5. **Game State Manager**
Keep track of a player's score, lives, and other states.

```javascript
function gameManager() {
    let score = 0;
    let lives = 3;

    return {
        addScore(points) {
            score += points;
            console.log(`Score: ${score}`);
        },
        loseLife() {
            lives--;
            console.log(`Lives remaining: ${lives}`);
            if (lives <= 0) {
                console.log("Game Over");
            }
        },
        reset() {
            score = 0;
            lives = 3;
            console.log("Game reset");
        },
        getState() {
            return { score, lives };
        }
    };
}

const game = gameManager();
game.addScore(10);            // Score: 10
game.loseLife();              // Lives remaining: 2
console.log(game.getState()); // { score: 10, lives: 2 }
game.reset();                 // Game reset
```

---

### General Tips:
- **Return an Object:** Use an object to group multiple related functions.
- **Immutability:** Return copies of internal state if exposing them to prevent unintended changes.
- **Avoid Excessive Logic in Closures:** For complex scenarios, consider using classes or external libraries.

---

**a.** Do you want to expand on advanced use cases like debouncing or throttling?  
**b.** Would you like to add unit tests for any of the examples?

## Advanced use cases like debouncing or throttling?  
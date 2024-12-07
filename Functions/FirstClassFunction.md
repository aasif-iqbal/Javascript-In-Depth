# What is First-Class Function.

A **first-class function** in JavaScript means that functions are treated as **first-class citizens**. This allows them to be used like any other value. Specifically, functions can be:

1. **Assigned to a variable**  
2. **Passed as arguments to other functions**  
3. **Returned from other functions**  
4. **Stored in data structures like arrays or objects**

This makes JavaScript a **functional programming language**, where functions can be manipulated like any other object.

---

### Characteristics of First-Class Functions

1. **Assigned to Variables**
   ```javascript
   const sayHello = function(name) {
       return `Hello, ${name}!`;
   };

   console.log(sayHello("Alice")); // Output: Hello, Alice!
   ```

2. **Passed as Arguments**
   ```javascript
   function greet(name, formatter) {
       console.log(formatter(name));
   }

   function upperCaseFormatter(name) {
       return name.toUpperCase();
   }

   greet("Alice", upperCaseFormatter); // Output: ALICE
   ```

3. **Returned from Functions**
   ```javascript
   function createMultiplier(multiplier) {
       return function(num) {
           return num * multiplier;
       };
   }

   const double = createMultiplier(2);
   console.log(double(5)); // Output: 10
   ```

4. **Stored in Data Structures**
   ```javascript
   const operations = {
       add: (a, b) => a + b,
       subtract: (a, b) => a - b
   };

   console.log(operations.add(5, 3)); // Output: 8
   console.log(operations.subtract(5, 3)); // Output: 2
   ```

---

### Practical Examples

#### Higher-Order Functions
Functions that take other functions as arguments or return them as results.

```javascript
function mapArray(arr, transform) {
    return arr.map(transform);
}

const numbers = [1, 2, 3];
const squared = mapArray(numbers, num => num * num);

console.log(squared); // Output: [1, 4, 9]
```

#### Callback Functions
A function passed as an argument to another function.

```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}

fetchData(message => console.log(message)); // Output after 1 second: Data received
```

#### Closures
A function returning another function with access to outer variables.

```javascript
function counter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const increment = counter();
console.log(increment()); // Output: 1
console.log(increment()); // Output: 2
```

---

### Why are First-Class Functions Important?
1. **Reusability**: Enables **functional programming patterns** like higher-order functions.
2. **Flexibility**: Allows dynamic behavior, such as passing logic as arguments.
3. **Modularity**: Simplifies code by separating concerns.

---

**a.** Would you like to explore more on **higher-order functions** like `map`, `reduce`, and `filter`?  
**b.** Do you need examples comparing **first-class functions** with other paradigms?
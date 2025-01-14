Closure is a javascript function which retain the access of outer scope, even after the outer function has finished execution. It allows the function to remember and access variables from its outer function's scope.

Closures are created automatically every time a when we create a function in JavaScript.

```js
function counter(){
  let count = 0;
  // here the variable of outer scope is accessble by inner function 
  return function(){
    return count++;
  }
}

// after outer function finished execution
let makeCount = counter();

console.log(makeCount());
console.log(makeCount());
console.log(makeCount());
```
Here we make two counters: counter and counter2 using the same makeCounter function.

Are they independent? What is the second counter going to show? 0,1 or 2,3 or something else?
```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
//independent counters 
alert( counter2() ); // 0
alert( counter2() ); // 1
```
Reason: 
```
Functions counter and counter2 are created by different invocations of makeCounter.

So they have independent outer Lexical Environments, each one has its own count.
```
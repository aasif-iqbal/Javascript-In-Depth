## Scope chaining
Scope chaining in JavaScript is the mechanism the JavaScript engine uses to find variables. When a variable is accessed, the engine first searches in the current scope. If the variable is not found there, it looks in the outer scope, and so on, up the chain of nested scopes until the global scope is reached. If the variable is still not found, a ReferenceError is thrown. 

Consider the following example:

```js
var globalVar = "global";

function outerFunction() {
  var outerVar = "outer";

  function innerFunction() {
    var innerVar = "inner";
    console.log(innerVar); // Output: inner
    console.log(outerVar); // Output: outer
    console.log(globalVar); // Output: global
  }

  innerFunction();
  console.log(globalVar) // Output: global
}

outerFunction();
```

In this example:
- innerFunction can access innerVar, outerVar, and globalVar.
- outerFunction can access outerVar and globalVar but not innerVar.
- The global scope can only access globalVar.

Each function creates a new scope. When innerFunction is called, it first looks for variables within its own scope. If not found, it goes up the scope chain to outerFunction's scope, and then to the global scope. This chain of scopes is determined by where the functions are defined, not where they are called, which is known as lexical scoping. 
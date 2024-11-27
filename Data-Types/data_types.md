# JavaScript data types and data structures - 
[Primitive values - mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values)

Primitive data type - immutable - value type
1. null
2. undefined
3. number
4. boolean
5. string
6. symbol
7. BigInt

Non-primitive data type - immutable - reference type
1. Object
2. Array
3. Functions

Other the that Date(), RegExp, Map(), Set(), WeakMap(), WeakSet() are also non-primitive.

## Primitive data type
[Primitive - mdn](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- All primitives are immutable; that is, they cannot be altered. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned to a new value, but the existing value can not be changed in the ways that objects, arrays, and functions can be altered. The language does not offer utilities to mutate primitive values.

- Primitives have no methods but still behave as if they do. When properties are accessed on primitives, JavaScript auto-boxes the value into a wrapper object and accesses the property on that object instead. For example, "foo".includes("f") implicitly creates a String wrapper object and calls String.prototype.includes() on that object. This auto-boxing behavior is not observable in JavaScript code but is a good mental model of various behaviors — for example, why "mutating" primitives does not work (because str.foo = 1 is not assigning to the property foo of str itself, but to an ephemeral wrapper object).

<!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures -->

## Non Primitive data type
In JavaScript, non-primitive data types, also sometimes referred to as reference types, are those that store collections of data or provide more complex structures. Unlike primitive data types, which hold single values, non-primitive data types act as references to locations in memory where the actual data is stored.

## Difference between null and undefined.

Null type
The Null type is inhabited by exactly one value: null.

Undefined type
The Undefined type is inhabited by exactly one value: undefined.

Conceptually, undefined indicates the absence of a value, while null indicates the absence of an object (which could also make up an excuse for typeof null === "object"). The language usually defaults to undefined when something is devoid of a value:

A return statement with no value (return;) implicitly returns undefined.
Accessing a nonexistent object property (obj.iDontExist) returns undefined.
A variable declaration without initialization (let x;) implicitly initializes the variable to undefined.
Many methods, such as Array.prototype.find() and Map.prototype.get(), return undefined when no element is found.
null is used much less often in the core language. The most important place is the end of the prototype chain — subsequently, methods that interact with prototypes, such as Object.getPrototypeOf(), Object.create(), etc., accept or return null instead of undefined.

null is a keyword, but undefined is a normal identifier that happens to be a global property. In practice, the difference is minor, since undefined should not be redefined or shadowed.

Example:
```js
// Bad Practice: Redefining undefined
undefined = 123; // Attempting to redefine (in strict mode, this will throw an error)
console.log(undefined); // Output: 123 (in non-strict mode)

// Bad Practice: Shadowing undefined in a local scope
function example() {
    let undefined = 'I am not undefined'; // Shadowing the global undefined
    console.log(undefined); // Output: I am not undefined
}

example();
console.log(undefined); // Output: 123 or undefined depending on strict mode

```


### What is Shadowing in Js.
In JavaScript, the term "shadowing" refers to the situation where a variable declared within a certain scope (e.g., a function or block) has the same name as a variable declared in an outer scope. The inner variable "shadows" the outer variable, meaning that within the inner scope, any reference to that variable name will refer to the inner variable, effectively hiding the outer variable.

Here's a breakdown of how variable shadowing works in JavaScript:

Example of Variable Shadowing
Consider the following code:

```js
let x = 10; // Outer variable

function exampleFunction() {
    let x = 20; // Inner variable shadows the outer variable
    console.log(x); // Output: 20
}

exampleFunction();
console.log(x); // Output: 10

```
In this example:

The x declared outside of the exampleFunction is the outer variable.
Inside exampleFunction, a new x is declared with the value 20. This inner x shadows the outer x.
When console.log(x) is called inside exampleFunction, it refers to the inner x (value 20).
Outside the function, console.log(x) refers to the outer x (value 10).


Block Scope Shadowing
Shadowing can also occur within block scopes (e.g., within if, for, while blocks) when using let or const.

```js
let y = 30;

if (true) {
    let y = 40; // This 'y' shadows the outer 'y' within this block
    console.log(y); // Output: 40
}

console.log(y); // Output: 30

```
Function Scope vs. Block Scope
In the context of functions, JavaScript uses function scope for variables declared with var and block scope for variables declared with let and const.
```js
var z = 50;

function anotherFunction() {
    var z = 60; // Function-scoped shadowing
    console.log(z); // Output: 60
}

anotherFunction();
console.log(z); // Output: 50

```
### Avoiding Unintentional Shadowing
Unintentional shadowing can lead to bugs and confusing code. Here are some tips to avoid it:

Use meaningful variable names that reflect their purpose.
Be mindful of variable scopes and declarations, especially when nesting functions or blocks.
Consider using const for variables that shouldn't be reassigned, reducing the chance of accidental shadowing.
### Best Practices
Always declare variables at the top of their scope to minimize shadowing issues.
Avoid reusing variable names in nested scopes.
Use linters (like ESLint) to catch potential shadowing issues in your codebase.

Example of Avoiding Shadowing

```js
let a = 100;

function someFunction() {
    let b = 200; // Use a different name to avoid shadowing 'a'
    console.log(a); // Accessing outer variable 'a'
    console.log(b); // Output: 200
}

someFunction();
console.log(a); // Output: 100

```
By being aware of how shadowing works and following best practices, you can write cleaner, more understandable JavaScript code.


## Type coercion
JavaScript is a weakly typed language. This means that you can often use a value of one type where another type is expected, and the language will convert it to the right type for you. To do so, JavaScript defines a handful of coercion rules.

 TODO
- Primitive coercion
- Numeric coercion
- String coercion

[Type coercion - freecodecamp](https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/)

## Type Conversion

Type conversion (or typecasting) means transfer of data from one data type to another. Implicit conversion happens when the compiler (for compiled languages) or runtime (for script languages like JavaScript) automatically converts data types. The source code can also explicitly require a conversion to take place.

For example, given the expression "foo" + 1, the Number 1 is implicitly converted into a String and the expression returns "foo1". Given the instruction Number("0x11"), the string "0x11" is explicitly converted to the number 17.

[Type_Conversion - mdn](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion)


## TypeScript
[Typescript - Offical](https://www.typescriptlang.org/)
## This keyword
In JavaScript, the this keyword is a special keyword that refers to the current execution context.  This context can be different depending on how a function is called.

It's sort of like the this keyword is a placeholder in a template. That placeholder's value-replacement doesn't get determined when we author(write) the code; it gets determined while the code is running.

Keep reminding yourself as you go through the rest of this chapter: the this value for a function is determined by how the function is invoked. That means you can't look at the function's definition, nor where the function is defined (not even the enclosing class!). In fact, it doesn't even matter where the function is called from.

We only need to look at how the functions are called; that's the only factor that matters.

Let's take a example:
```js
"use strict"

var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};
```
1. a.Implicit Context Invocation - with strict mode
```js
"use strict"

var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
        console.log(this.x);    //3
        console.log(this.y);    //4
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

point.init(3,4);
```
1. b.Implicit Context Invocation - without strict mode

```js
var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
        console.log(this.x);    //3
        console.log(this.y);    //4
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

point.init(3,4);
```

2. a.Default Context Invocation - strict mode
```js
"use strict";

var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
        console.log(this.x);  // TypeError: Cannot set properties of undefined (setting 'x')
        console.log(this.y);
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

const init = point.init; //- Default Context Invocation
init(4,7);

```
2. a.Default Context Invocation - without strict mode
```js
var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
        console.log(this.x);    // 3
        console.log(this.y);    // 4
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

const init = point.init; //- Default Context Invocation
init(3,4);
```
!NOTE:
That means init(3,4), if run in strict-mode, would throw an exception. Why? Because the this.x reference in init(..) is a .x property access on undefined (i.e., undefined.x), which is not allowed.

why would JS choose to default the context to undefined, so that any default context invocation of a this-aware function will fail with such an exception?

Because a this-aware function always needs a this. The invocation init(3,4) isn't providing a this, so that is a mistake, and should raise an exception so the mistake can be corrected. The lesson: never invoke a this-aware function without providing it a this!

Just for completeness sake: in the less common non-strict mode, the default context is the global object -- JS defines it as globalThis, which in browser JS is essentially an alias to window, and in Node it's global. So, when init(3,4) runs in non-strict mode, the this.x expression is globalThis.x -- also known as window.x in the browser, or global.x in Node. Thus, globalThis.x gets set as 3 and globalThis.y gets set as 4.

```js
// no strict-mode here, beware!

var point = { /* .. */ };

const init = point.init;
init(3,4);

globalThis.x;   // 3
globalThis.y;   // 4
point.x;        // null
point.y;        // null
```

3.Explicit Context Invocation - with and without strict mode - will be same
Functions can alternately be invoked with explicit context, using the built-in call(..) or apply(..) utilities:

```js
"use strict";

var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

const init = point.init;

init.call(point, 3, 4);
// Or init.apply(point, [3, 4]);

console.log(point.x)
console.log(point.y)
```

What if i want to defined anotherPoint but I didn't want to repeat the definitions of those init(..) / toString() functions from point. So I "borrowed" a function reference, point.init, and explicitly set the empty object anotherPoint as the this context, via call(..).

When init(..) is running at that moment, this inside it will reference anotherPoint, and that's why the x / y properties (values 5 / 6, respectively) get set there.

```js
var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
    },     
    toString() {
        return `(${this.x},${this.y})`;
    },
};

point.init(3,4);

var anotherPoint = {};
point.init.call( anotherPoint, 5, 6 );

point.x;                // 3
point.y;                // 4
anotherPoint.x;         // 5
anotherPoint.y;         // 6
```

4. New Context Invocation

We've so far seen three different ways of context assignment at the function call-site: default, implicit, and explicit.

A fourth way to call a function, and assign the this for that invocation, is with the new keyword:

```js
"use strict"

var point = {
    x: null,
    y: null,

    init: function(x,y) {
        this.x = x;
        this.y = y;
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

var anotherPoint = new point.init(3, 4);
console.log(anotherPoint.x)
console.log(anotherPoint.y)
```
#
You've typically seen new used with class for creating instances. But as an underlying mechanism of the JS language, new is not inherently a class operation.

In a sense, the new keyword hijacks a function and forces its behavior into a different mode than a normal invocation. Here are the 4 special steps that JS performs when a function is invoked with new:

1. create a brand new empty object, out of thin air.

2. link the [[Prototype]] of that new empty object to the function's .prototype object.

3. invoke the function with the `this` context set to that new empty object.

4. if the function doesn't return its own object value explicitly (with a return .. statement), assume the function call should instead return the new object (from steps 1-3).

Step 4 implies that if you new invoke a function that does return its own object -- like return { .. }, etc -- then the new object from steps 1-3 is not returned. That's a tricky gotcha to be aware of, in that it effectively discards that new object before the program has a chance to receive and store a reference to it. Essentially, new should never be used to invoke a function that has explicit return .. statement(s) in it.

```js
// alternative to:
//   var anotherPoint = new point.init(3,4)

var anotherPoint;
// this is a bare block to hide local
// `let` declarations
{
    // (Step 1)
    let tmpObj = {};

    // (Step 2)
    Object.setPrototypeOf(
        tmpObj, point.init.prototype
    );
    // or: tmpObj.__proto__ = point.init.prototype

    // (Step 3)
    let res = point.init.call(tmpObj,3,4);

    // (Step 4)
    anotherPoint = (
        typeof res !== "object" ? tmpObj : res
    );
}
```

Review This
We've seen four rules for this context assignment in function calls. Let's put them in order of precedence:

1. Is the function invoked with new, creating and setting a new this?

2. Is the function invoked with call(..) or apply(..), explicitly setting this?

3. Is the function invoked with an object reference at the call-site (e.g., point.init(..)), implicitly setting this?

4. If none of the above... are we in non-strict mode? If so, default the this to globalThis. But if in strict-mode, default the this to undefined.

These rules, in this order, are how JS determines the this for a function invocation. If multiple rules match a call-site (e.g., new point.init.call(..)), the first rule from the list to match wins.

That's it, you're now master over the this keyword.

## Arrow 










### Nested Arrow function

Arrow function doesnt have this binding. it take the value from enclose lexical context
Arrow functions create closures over the this value of the enclosing execution context.

```js
let point3 = {
    a:10,
    init: ()=>{
        console.log(this); // {}
    }
}
point3.init();
```








```js
globalThis.value = { result: "Sad face" };

function one() {
    function two() {
        var three = {
            value: { result: "Hmmm" },

            fn: () => {
                const four = () => this.value;
                return four.call({
                    value: { result: "OK", },
                });
            },
        };
        return three.fn();
    };
    return two();
}

new one();          // ???
```
The call-stack for that new one() invocation is:
```js
four         |
three.fn     |
two          | (this = globalThis)
one          | (this = {})
[ global ]   | (this = globalThis)
```
Since four() and fn() are both => arrow functions, the three.fn() and four.call(..) call-sites are not this-assigning; thus, they're irrelevant for our query. What's the next invocation to consider in the call-stack? two(). That's a regular function (it can accept this-assignment), and the call-site matches the default context assignment rule (#4). Since we're not in strict-mode, this is assigned globalThis.

When four() is running, this is just a normal variable. It looks then to its containing function (three.fn()), but it again finds a function with no this. So it goes up another level, and finds a two() regular function that has a this defined. And that this is globalThis. So the this.value expression resolves to globalThis.value, which returns us... { result: "Sad face" }.


## DOM 


## Class and Constructor
```js
class Point2d {
    x = null
    getDoubleX = () => this.x * 2

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    toString() { /* .. */ }
}

var point = new Point2d(3,4);

const getX = point.getDoubleX;

console.log(getX()); // 6
```


## Use-case
when we have to use this-keyword
1.You typically use the "this" keyword in JavaScript when you want to refer to the current object within a method or a constructor function. Here are some common scenarios where you would use "this":

1. Inside Object Methods: When you define methods for objects, you often use "this" to refer to properties or methods of the object itself. For example:
```js
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};
console.log(person.fullName()); // Output: "John Doe"
```
2. Constructor Functions: When creating objects using constructor functions, "this" refers to the newly created instance of the object. It allows you to set properties on the newly created object. For example:
```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function() {
    return this.firstName + " " + this.lastName;
  };
}

// Internal work
````js
function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}
``````
More details: https://javascript.info/constructor-new

const john = new Person("John", "Doe");
console.log(john.fullName()); // Output: "John Doe"
```

3. Event Handlers: In event handlers, "this" typically refers to the element that triggered the event. For example:

```js
document.getElementById("myButton").addEventListener("click", function() {
  console.log(this); // Output: the button element that triggered the event
});

```
# 
Reference:
For Browser - how it behaves
https://www.freecodecamp.org/news/the-this-keyword-in-javascript/

Book: You Don't Know Js Yet
https://github.com/Aasif-github/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch4.md

VideoLink: https://www.youtube.com/watch?v=9T4z98JcHR0
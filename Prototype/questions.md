## how to check object's prototype

Good one 👍 — checking an object’s **prototype** is another common interview point.
Here are the main ways you can do it:

---

### 🔹 1. **Using `Object.getPrototypeOf()` (recommended)**

This is the modern, standard way.

```js
let obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
```

---

### 🔹 2. **Using `__proto__` (legacy but widely used)**

Every object has an internal `[[Prototype]]` that can be accessed via `__proto__` (not recommended for production, but useful in debugging/interviews).

```js
let obj = {};
console.log(obj.__proto__ === Object.prototype); // true
```

---

### 🔹 3. **Using `instanceof`**

Checks if an object is an instance of a constructor function, i.e., if it appears in the prototype chain.

```js
function Rabbit() {}
let rabbit = new Rabbit();

console.log(rabbit instanceof Rabbit); // true
console.log(rabbit instanceof Object); // true
```

---

### 🔹 4. **Using `isPrototypeOf()`**

You can check if an object exists in another object’s prototype chain.

```js
function Rabbit() {}
let rabbit = new Rabbit();

console.log(Rabbit.prototype.isPrototypeOf(rabbit)); // true
console.log(Object.prototype.isPrototypeOf(rabbit)); // true
```

---

✅ **Summary**

* `Object.getPrototypeOf(obj)` → best & standard.
* `obj.__proto__` → works, but legacy.
* `obj instanceof Constructor` → checks if in prototype chain.
* `Constructor.prototype.isPrototypeOf(obj)` → direct check.

---

👉 In an **interview**, if asked *“How do you check an object’s prototype?”*, the safest answer is:
**“I would use `Object.getPrototypeOf(obj)`, since it’s the standard and cleanest way to access an object’s prototype.”**

## Performance impact of prototype chain.

Excellent question 👌 — this is **exactly the kind of "deeper" prototype question** interviewers ask to see if you understand not just *what* prototypes are, but also *how they affect performance*.

---

## 🔹 **Performance Impact of Prototype Chain**

### 1. **Property Lookup Cost**

* When you access `obj.prop`, the JS engine looks:

  1. In the object itself.
  2. If not found → in its prototype (`__proto__` / `Object.getPrototypeOf`).
  3. If not found → in the next prototype, and so on.
  4. Until `Object.prototype` or `null`.

👉 Longer chains = more steps = **slower lookup**.
But note: modern engines (V8, SpiderMonkey, etc.) **optimize heavily**, so usually it’s negligible unless you’re in a hot loop with millions of lookups.

---

### 2. **Method Definitions**

* If methods are defined **inside the constructor**, each instance gets its own copy (bad for memory).
* If methods are defined **on the prototype**, they are shared (better for memory + performance).

✅ Example:

```js
function A() {
  this.say = function() {}; // bad: new copy per instance
}

function B() {}
B.prototype.say = function() {}; // good: shared method
```

---

### 3. **Shadowing Properties**

If an object has its **own property with the same name** as one in the prototype, lookup stops earlier.
But if it doesn’t, the engine climbs the chain.
So unnecessary deep inheritance → more lookups → worse performance.

---

### 4. **Changing Prototype at Runtime**

* Using `Object.setPrototypeOf(obj, proto)` or `obj.__proto__ = proto` is **very slow** because it forces the engine to re-optimize internal property lookups.
* Recommended: **avoid changing prototypes dynamically**. Always set them up when the object is created.

---

### 5. **Practical Impact**

* For 99% of apps, prototype chain lookup is **not a bottleneck**.
* Performance issues show up only in:

  * **Extremely deep inheritance chains**.
  * **Tight loops** where the same lookup is repeated millions of times.
  * **Changing prototypes dynamically**.

---

✅ **Best Practices**

1. Keep prototype chains shallow (2–3 levels max: `Instance → Constructor.prototype → Object.prototype`).
2. Define methods on the prototype, not inside constructors.
3. Avoid runtime prototype reassignments.
4. If performance is critical, cache frequently accessed properties in local variables.

---

🔹 **Interview Answer (short & crisp):**

> *“Each property lookup climbs the prototype chain until found, so longer chains mean slower lookups. In practice, modern JS engines optimize this well, but deep inheritance or dynamic prototype changes can hurt performance. The best practice is to keep chains shallow and define shared methods on the prototype to save memory and improve performance.”*

---

## How does class syntax in es06 handle prototype and inheritance.

Great 👍 this is a **very common interview question** because many developers think ES6 `class` introduced a “new” inheritance system — but actually, **it’s just syntactic sugar over prototypes**.

Let’s break it down.

---

## 🔹 1. **Classes in ES6**

When you write:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + " makes a noise");
  }
}
```

Under the hood, this is essentially the same as:

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(this.name + " makes a noise");
};
```

👉 So:

* `constructor` in a class = constructor function.
* Methods inside a class = added to **`ClassName.prototype`**.
* No per-instance copies, they are shared like in prototypes.

---

## 🔹 2. **Inheritance in ES6 Classes**

When you write:

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // calls Animal constructor
    this.breed = breed;
  }
  speak() {
    console.log(this.name + " barks");
  }
}
```

It does the same as:

```js
function Dog(name, breed) {
  Animal.call(this, name); // call parent constructor
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype); // inheritance
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(this.name + " barks");
};
```

👉 So:

* `extends` = sets up prototype chain using `Object.create()`.
* `super()` = calls parent constructor.
* Methods defined in the subclass = placed on `Dog.prototype`.

---

## 🔹 3. **Prototype Chain with Classes**

For the above `Dog extends Animal`:

```js
let d = new Dog("Tommy", "Beagle");
```

The chain looks like:

```
d
  ⬆ __proto__
Dog.prototype
  ⬆ __proto__
Animal.prototype
  ⬆ __proto__
Object.prototype
  ⬆ __proto__
null
```

👉 So property lookup still follows the same **prototype chain rules**.

---

## 🔹 4. **Special Points About ES6 Classes**

* Classes are **not hoisted** (unlike function declarations).
* Class methods are **non-enumerable** by default (better than normal prototypes).
* Strict mode is applied inside classes automatically.
* You can use `super.methodName()` to call parent methods (syntactic sugar for prototype lookup).

---

✅ **Interview Answer (short & crisp):**

> *“ES6 `class` syntax is just syntactic sugar over JavaScript’s prototypal inheritance. A class’s methods are stored on its `.prototype`, and `extends` sets up the prototype chain with `Object.create()`. The `super` keyword is used to call the parent constructor or parent methods. Under the hood, it’s still the same prototype-based inheritance model.”*

---
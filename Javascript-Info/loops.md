## Diff btw for..of & for.
The main difference between the `for...of` loop and the traditional `for` loop in JavaScript lies in their **usage**, **syntax**, and the types of collections they are designed to iterate over.

---

### **1. `for...of` Loop**

- **Purpose**:  
  Specifically designed to iterate over **iterable objects** such as arrays, strings, maps, sets, and more.
- **Syntax**:  
  ```javascript
  for (const element of iterable) {
      // Use element directly
  }
  ```
- **Behavior**:  
  It iterates over the **values** of the iterable, making it simpler to work with collections where you only need the items (not the indices).

#### **Example: Using `for...of` with an Array**
```javascript
const arr = [10, 20, 30];
for (const value of arr) {
    console.log(value); // Logs: 10, 20, 30
}
```

#### **Example: Using `for...of` with a String**
```javascript
const str = "hello";
for (const char of str) {
    console.log(char); // Logs: h, e, l, l, o
}
```

#### **Key Points**:
- Automatically handles the iteration over values.
- Does not give access to the index directly (but you can use `Array.entries()` if indices are needed).

---

### **2. `for` Loop**

- **Purpose**:  
  A general-purpose loop that can be used to iterate over anything, given the correct logic is implemented. Commonly used with **arrays** and **objects** where you need control over the **indices** or conditions.

- **Syntax**:  
  ```javascript
  for (initialization; condition; increment) {
      // Access elements using indices
  }
  ```

- **Behavior**:  
  Allows more control over the iteration process by specifying the start point, condition to continue, and step size.

#### **Example: Using `for` with an Array**
```javascript
const arr = [10, 20, 30];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // Logs: 10, 20, 30
}
```

#### **Example: Using `for` with a String**
```javascript
const str = "hello";
for (let i = 0; i < str.length; i++) {
    console.log(str[i]); // Logs: h, e, l, l, o
}
```

#### **Key Points**:
- Gives complete control over how the iteration is performed.
- Allows access to both **indices** and **values**.
- Useful for situations where you need more complex conditions or custom iteration steps.

---

### **Comparison Table**

| Feature                        | `for...of`                                   | `for`                                      |
|--------------------------------|---------------------------------------------|--------------------------------------------|
| **Purpose**                    | Iterating over iterable objects (values).   | General-purpose looping over any data.     |
| **Focus**                      | Values of the iterable.                     | Index-based or condition-based iteration.  |
| **Ease of Use**                | Simpler for iterables (arrays, strings).    | More verbose but highly customizable.      |
| **Direct Index Access**        | Not directly available.                     | Direct access via the loop variable.       |
| **Complexity of Iteration**    | Cannot specify custom conditions.           | Full control over iteration logic.         |
| **Data Types**                 | Works with iterables like arrays, strings, maps, sets. | Works with arrays, objects, or any condition-driven logic. |
| **Common Use Case**            | Simple traversal of arrays, strings, etc.   | More complex iterations with custom logic. |

---

### **When to Use What**
1. **Use `for...of`**:
   - When you only need the **values** of an iterable (like an array or string).
   - For simpler and cleaner code when working with collections.

2. **Use `for`**:
   - When you need precise control over the iteration process (e.g., skipping elements, iterating in reverse).
   - When you need access to **indices** or need to use custom iteration logic.

---

### **Example Comparing Both**

```javascript
const arr = [10, 20, 30];

// Using for...of
for (const value of arr) {
    console.log(value); // Logs: 10, 20, 30
}

// Using for
for (let i = 0; i < arr.length; i++) {
    console.log(`Index: ${i}, Value: ${arr[i]}`);
    // Logs: Index: 0, Value: 10
    //       Index: 1, Value: 20
    //       Index: 2, Value: 30
}
```

Both loops are powerful in their own contexts, and the choice depends on the specific problem you are solving! 😊

## For..in
The **`for...in`** loop in JavaScript is specifically designed to iterate over the **enumerable properties** of an object. It is often used to loop through the **keys** of an object but can also be used with arrays (though it's not recommended).

---

### **Key Characteristics of `for...in`**

- Iterates over the **keys** (or property names) of an object.
- Works for both objects and arrays but is primarily intended for objects.
- Includes inherited enumerable properties (not just the object's own properties).
- Does **not guarantee the order** of iteration.

---

### **Syntax**

```javascript
for (key in object) {
    // Use 'key' to access properties
    console.log(key);         // Key name
    console.log(object[key]); // Key's value
}
```

---

### **Example: Using `for...in` with an Object**

```javascript
const person = {
    name: "Aasif",
    age: 25,
    profession: "Developer"
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Output:
// name: Aasif
// age: 25
// profession: Developer
```

---

### **Example: Using `for...in` with an Array**

While you can use `for...in` with arrays, it iterates over the **indices** (not the values), and it is slower compared to `for` or `for...of`. Additionally, it may include inherited properties if they exist.

```javascript
const arr = [10, 20, 30];

for (const index in arr) {
    console.log(`Index: ${index}, Value: ${arr[index]}`);
}

// Output:
// Index: 0, Value: 10
// Index: 1, Value: 20
// Index: 2, Value: 30
```

#### **Why Not to Use `for...in` for Arrays**
- Iterates over all enumerable properties, including non-index properties or inherited properties.
- Does not guarantee order for arrays.

---

### **Comparison of `for`, `for...of`, and `for...in`**

| Feature                  | `for`                                 | `for...of`                              | `for...in`                               |
|--------------------------|---------------------------------------|-----------------------------------------|------------------------------------------|
| **Purpose**              | General-purpose loop.                | Iterates over values of an iterable.    | Iterates over enumerable properties.     |
| **Use Case**             | Arrays, complex conditions, indices. | Arrays, strings, sets, maps (iterables).| Objects (properties/keys).               |
| **Iteration Focus**      | Custom control (index or value).      | Values of iterable.                     | Keys/properties of an object.            |
| **Array Iteration**      | Yes (direct and efficient).           | Yes (clean and simple).                 | Yes (not recommended).                   |
| **Object Iteration**     | Requires `Object.keys()`.             | Not suitable.                           | Directly iterates over object properties.|
| **Includes Inherited Properties** | No                           | No                                      | Yes.                                     |
| **Order Guarantee**      | Yes (array indices).                 | Yes (values).                           | No.                                      |

---

### **When to Use What**

1. **`for`**:
   - When you need full control over iteration (start, stop, step).
   - When working with arrays and indices.

2. **`for...of`**:
   - When you need to iterate over the values of an iterable (array, string, etc.).
   - Preferred for cleaner, more readable array traversal.

3. **`for...in`**:
   - When iterating over the keys/properties of an object.
   - Use with caution for arrays (avoid if possible).

---

### **Example to Combine All Loops**

```javascript
const person = { name: "Aasif", age: 25, profession: "Developer" };
const arr = [10, 20, 30];
const str = "hello";

// Using for
for (let i = 0; i < arr.length; i++) {
    console.log(`Index: ${i}, Value: ${arr[i]}`);
}

// Using for...of
for (const char of str) {
    console.log(`Character: ${char}`);
}

// Using for...in
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

### Output:
```plaintext
Index: 0, Value: 10
Index: 1, Value: 20
Index: 2, Value: 30

Character: h
Character: e
Character: l
Character: l
Character: o

name: Aasif
age: 25
profession: Developer
```

---

**Summary**:  
- Use `for...in` for object properties.
- Use `for...of` for array or string values.
- Use `for` for full control in custom iterations.
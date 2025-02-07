1.  **Reverse Array of String**
```js
let arr = ['OneCompiler','Javascript']
// [ 'RelipmoCeno', 'Tpircsavaj' ]
```

2. **Find all duplicate numbers in an array**
```js
   let arr = [1,2,4,1,4,6,6,6,3,9] // return all duplicate
```
3. **Bubble Sort**

4. **Binary Search**

5. **Find Second Most Repeated Element in String**   
```js
let str = "ahksadhkjdhsajhaksd"; 
// [ 'k', 's', 'd' ]
```
[Solution](https://github.com/aasif-iqbal/Javascript-In-Depth/blob/master/Problem-Solving/ProblemQuestions.md)

6. **Sort each fruit by length**
```js
Const str = ['apple', 'banana', 'kiwi', 'jackfruit', 'mango'];

// output: [ 'kiwi', 'apple', 'mango', 'banana', 'jackfruit' ]
// {
//   kiwi: 4,
//   apple: 5,
//   mango: 5,
//   banana: 6,
//   jackfruit: 9
// }
```

7. **Make the array empty**
```js
let arr = [4, 3, 2, 7, 8, 2, 3, 1];
arr.length = 0;
console.log(arr); // Output: []
```

8. Merge two arrays on base of id
```js    
let arr1 = [{ id:1, name:'a' }, { id:2, name:'b' }, { id:3, name:'c' }];
let arr2 = [{ id:1, name:'d' }, { id:5, name:'e' }];

// output = [{ id:1, name:'a' }, { id:2, name:'b' }, { id:3, name:'c' }, { id:5, name:'e' }]
```

9. Filter User based on their age(age > 40)
```js
const User = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 35 },
    { name: 'Alice', age: 40 },
    { name: 'Charlie', age: 45 },
    { name: 'David', age: 50 },]
```

10. **Find the second largest number in an array**
```js
let arr = [1,2,4,1,4,6,6,6,3,9] // return 6
```

11.  Remove duplicate from Object of array.
```js
let obj = [
    { name: 'Sid' },
    { name: 'Mark' },
    { name: 'Sid' },
    { name: 'Jane' },
    { name: 'Sid' }
];
```
You can remove duplicates **without using `filter` or `Set`** by using an **object (hashmap)** to track seen values and then constructing a new array. Here's how:

### **Solution using an Object (`Map` alternative)**
```javascript
let obj = [
    { name: 'Sid' },
    { name: 'Mark' },
    { name: 'Sid' },
    { name: 'Jane' },
    { name: 'Sid' }
];

let seen = {}; // Hashmap to track seen names
let uniqueArray = [];

for (let i = 0; i < obj.length; i++) {
    if (!seen[obj[i].name]) {
        seen[obj[i].name] = true; // Mark name as seen
        uniqueArray.push(obj[i]); // Add to result array
    }
}

console.log(uniqueArray);
```

### **Output:**
```javascript
[
  { name: 'Sid' },
  { name: 'Mark' },
  { name: 'Jane' }
]
```

---

### **💡 Explanation:**
1. We create an **empty object (`seen`)** to track encountered names.
2. Loop through the `obj` array:
   - If `name` is **not in `seen`**, add it to `uniqueArray` and mark it as seen.
   - If `name` is already in `seen`, **skip it**.
3. This ensures that only the **first occurrence** of each name is kept.

---

### **🔹 Time Complexity:**
- **O(N)** → Since we loop through the array once and lookup operations in objects are **O(1)**.

Would you like an alternative solution using **reduce()** or other methods? 🚀

# Find Leader in array
```js
function findLeaders(arr) {
    let n = arr.length;
    let leaders = [];
    let maxSoFar = arr[n - 1]; // Rightmost element is always a leader
    leaders.push(maxSoFar);

    // Traverse from second last element to the first
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] >= maxSoFar) {
            maxSoFar = arr[i];
            leaders.push(maxSoFar);
        }
    }

    return leaders.reverse(); // Reverse to maintain the original order
}

// Example usage
let arr = [16, 17, 4, 3, 5, 2];
console.log(findLeaders(arr));  // Output: [17, 5, 2]
```

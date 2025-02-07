# Working with Objects

JavaScript objects are powerful data structures that allow you to store, manipulate, and retrieve key-value pairs efficiently. You can use objects to model real-world problems and solve complex tasks in a structured manner.

---

## **Step-by-Step Approach to Problem Solving Using JavaScript Objects**

### **1. Understand the Problem**
Before jumping into coding, break down the problem into smaller parts. Identify:
- The input data (what information you have).
- The expected output (what you need to achieve).
- The operations needed to transform the input into the output.

---

### **2. Choose an Object Representation**
Decide how to structure your data using objects. Objects are useful when dealing with:
- **Entities** (e.g., user profiles, products, orders).
- **Key-value pairs** (e.g., storing settings, configurations).
- **Grouping related information** (e.g., organizing data from an API).

#### **Example: Storing User Information**
```js
const user = {
  name: "Aasif Iqbal",
  age: 28,
  email: "aasif@example.com",
  isAdmin: true
};
```

---

### **3. Manipulating Object Data**
Once you have the object, you can:
- **Access properties** using dot or bracket notation.
- **Modify existing properties** or **add new ones**.
- **Delete properties** if needed.

#### **Example: Updating and Accessing Object Properties**
```js
user.age = 29;  // Modify an existing property
user.address = "Delhi, India";  // Add a new property
delete user.isAdmin;  // Remove a property

console.log(user.name); // Output: Aasif Iqbal
console.log(user["email"]); // Output: aasif@example.com
console.log(user); 
```

---

### **4. Iterating Over Objects**
You can iterate over an object to process data dynamically.

#### **Example: Looping Through an Object**
```js
for (let key in user) {
  console.log(`${key}: ${user[key]}`);
}
```

#### **Using `Object.keys()`, `Object.values()`, and `Object.entries()`**
```js
console.log(Object.keys(user)); // ['name', 'age', 'email', 'address']
console.log(Object.values(user)); // ['Aasif Iqbal', 29, 'aasif@example.com', 'Delhi, India']
console.log(Object.entries(user)); 
// [['name', 'Aasif Iqbal'], ['age', 29], ['email', 'aasif@example.com'], ['address', 'Delhi, India']]
```

---

### **5. Using Objects for Real-World Problem Solving**
#### **Problem 1: Counting Word Occurrences in a String**
✅ **Use Case:** Given a sentence, count how many times each word appears.

```js
function wordCount(sentence) {
  const words = sentence.toLowerCase().split(" ");
  const wordFrequency = {};

  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  return wordFrequency;
}

console.log(wordCount("hello world hello again world"));
// Output: { hello: 2, world: 2, again: 1 }
```

---

#### **Problem 2: Storing and Updating Student Records**
✅ **Use Case:** Create a function to store student details and update their marks.

```js
const students = {};

function addStudent(id, name, marks) {
  students[id] = { name, marks };
}

function updateMarks(id, newMarks) {
  if (students[id]) {
    students[id].marks = newMarks;
  }
}

addStudent(1, "Aasif", 85);
addStudent(2, "Iqbal", 90);
updateMarks(1, 95);

console.log(students);
// Output: { '1': { name: 'Aasif', marks: 95 }, '2': { name: 'Iqbal', marks: 90 } }
```

---

#### **Problem 3: Grouping People by Age**
✅ **Use Case:** Given an array of people, group them by age.

```js
const people = [
  { name: "Aasif", age: 25 },
  { name: "Iqbal", age: 30 },
  { name: "Sara", age: 25 },
  { name: "Mike", age: 30 }
];

function groupByAge(peopleArray) {
  const ageGroups = {};

  peopleArray.forEach(person => {
    if (!ageGroups[person.age]) {
      ageGroups[person.age] = [];
    }
    ageGroups[person.age].push(person.name);
  });

  return ageGroups;
}

console.log(groupByAge(people));
/* Output:
{
  25: ["Aasif", "Sara"],
  30: ["Iqbal", "Mike"]
}
*/
```

---

### **6. Advanced Object Operations**
#### **Merging Objects**
```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { a: 1, b: 3, c: 4 }
```

#### **Checking If an Object Has a Key**
```js
console.log("age" in user); // true
console.log(user.hasOwnProperty("email")); // true
```

#### **Using Object Methods (`this`)**
```js
const car = {
  brand: "Toyota",
  model: "Corolla",
  start() {
    console.log(`${this.brand} ${this.model} is starting...`);
  }
};

car.start(); // Output: Toyota Corolla is starting...
```

---

## **Conclusion**
- **JavaScript objects** are flexible and powerful for solving real-world problems.
- Use **dot notation** or **bracket notation** to access properties.
- Iterate over objects using `for...in`, `Object.keys()`, or `Object.entries()`.
- Use objects for **data storage**, **lookup tables**, and **grouping data**.

Would you like to solve a specific problem using objects? 🚀

Great! Let’s solve a real-world problem using JavaScript objects.  

---

## **Problem: Implement a Simple Inventory System**
### **Use Case:**  
You are managing a store's inventory. You need to:  
1. **Add new products** to the inventory.  
2. **Update the stock** of existing products.  
3. **Remove products** when they are out of stock.  
4. **Retrieve details** of a product when needed.  
5. **List all available products.**  

---

### **Step 1: Define the Inventory Object**
We will use an object to store products, where each product has:
- **name**: The product's name.
- **price**: The cost of the product.
- **stock**: The available quantity.

```js
const inventory = {};
```

---

### **Step 2: Implement Inventory Functions**
#### **1️⃣ Add a Product**
This function adds a new product to the inventory.

```js
function addProduct(id, name, price, stock) {
  if (inventory[id]) {
    console.log(`Product with ID ${id} already exists.`);
  } else {
    inventory[id] = { name, price, stock };
    console.log(`Added ${name} to inventory.`);
  }
}
```

#### **2️⃣ Update Stock of an Existing Product**
This function updates the stock of an existing product.

```js
function updateStock(id, newStock) {
  if (inventory[id]) {
    inventory[id].stock = newStock;
    console.log(`Updated stock for ${inventory[id].name}.`);
  } else {
    console.log(`Product with ID ${id} not found.`);
  }
}
```

#### **3️⃣ Remove a Product**
If a product is out of stock, remove it from the inventory.

```js
function removeProduct(id) {
  if (inventory[id]) {
    console.log(`${inventory[id].name} has been removed.`);
    delete inventory[id];
  } else {
    console.log(`Product with ID ${id} not found.`);
  }
}
```

#### **4️⃣ Get Product Details**
This function retrieves details of a product by ID.

```js
function getProduct(id) {
  if (inventory[id]) {
    return inventory[id];
  } else {
    console.log(`Product with ID ${id} not found.`);
    return null;
  }
}
```

#### **5️⃣ List All Available Products**
This function displays all products that are in stock.

```js
function listProducts() {
  console.log("Available Products:");
  for (let id in inventory) {
    console.log(`ID: ${id}, Name: ${inventory[id].name}, Price: ₹${inventory[id].price}, Stock: ${inventory[id].stock}`);
  }
}
```

---

### **Step 3: Test the Inventory System**
Now, let's add some products and test the system.

```js
// Adding products
addProduct(101, "Laptop", 60000, 10);
addProduct(102, "Smartphone", 25000, 15);
addProduct(103, "Headphones", 3000, 50);

// Updating stock
updateStock(102, 20);

// Removing a product
removeProduct(103);

// Getting product details
console.log(getProduct(101));

// Listing all products
listProducts();
```

---

### **Expected Output**
```plaintext
Added Laptop to inventory.
Added Smartphone to inventory.
Added Headphones to inventory.
Updated stock for Smartphone.
Headphones has been removed.
{ name: 'Laptop', price: 60000, stock: 10 }
Available Products:
ID: 101, Name: Laptop, Price: ₹60000, Stock: 10
ID: 102, Name: Smartphone, Price: ₹25000, Stock: 20
```

---

## **Conclusion**
- We used a **JavaScript object (`inventory`)** to store and manage product details.
- We implemented **functions** to **add, update, remove, and retrieve products** efficiently.
- The **real-time manipulation** of the object makes it dynamic and scalable.

Would you like to enhance this further, such as adding **search, sorting, or filtering features**? 🚀

Awesome! Let's enhance our inventory system by adding the following features:  

1. **Search for a product** by name.  
2. **Sort products** by price (ascending or descending).  
3. **Filter products** based on stock availability.  

---

### **1️⃣ Search for a Product by Name**
This function searches for products that contain a given keyword in their name.

```js
function searchProduct(keyword) {
  const results = [];
  for (let id in inventory) {
    if (inventory[id].name.toLowerCase().includes(keyword.toLowerCase())) {
      results.push({ id, ...inventory[id] });
    }
  }

  if (results.length > 0) {
    console.log("Search Results:");
    results.forEach(product => {
      console.log(`ID: ${product.id}, Name: ${product.name}, Price: ₹${product.price}, Stock: ${product.stock}`);
    });
  } else {
    console.log(`No products found for "${keyword}".`);
  }
}
```

---

### **2️⃣ Sort Products by Price**
This function sorts the products by price, either **ascending** (low to high) or **descending** (high to low).

```js
function sortProducts(order = "asc") {
  const sortedProducts = Object.entries(inventory)
    .map(([id, product]) => ({ id, ...product }))
    .sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);

  console.log(`Products sorted by price (${order.toUpperCase()}):`);
  sortedProducts.forEach(product => {
    console.log(`ID: ${product.id}, Name: ${product.name}, Price: ₹${product.price}, Stock: ${product.stock}`);
  });
}
```

---

### **3️⃣ Filter Products by Stock Availability**
This function filters products that have a stock above a given threshold.

```js
function filterProducts(minStock = 1) {
  const availableProducts = Object.entries(inventory)
    .map(([id, product]) => ({ id, ...product }))
    .filter(product => product.stock >= minStock);

  if (availableProducts.length > 0) {
    console.log(`Products with stock ≥ ${minStock}:`);
    availableProducts.forEach(product => {
      console.log(`ID: ${product.id}, Name: ${product.name}, Price: ₹${product.price}, Stock: ${product.stock}`);
    });
  } else {
    console.log(`No products available with stock ≥ ${minStock}.`);
  }
}
```

---

### **Testing the Enhanced System**
Now, let’s test all our new functionalities.

```js
// Adding products again
addProduct(101, "Laptop", 60000, 10);
addProduct(102, "Smartphone", 25000, 20);
addProduct(103, "Headphones", 3000, 50);
addProduct(104, "Tablet", 40000, 5);
addProduct(105, "Monitor", 12000, 8);

// Searching for a product
searchProduct("Laptop"); // Should find "Laptop"

// Sorting products by price
sortProducts("asc"); // Sorts in ascending order
sortProducts("desc"); // Sorts in descending order

// Filtering products with stock greater than or equal to 10
filterProducts(10);
```

---

### **Expected Output**
```plaintext
Added Laptop to inventory.
Added Smartphone to inventory.
Added Headphones to inventory.
Added Tablet to inventory.
Added Monitor to inventory.

Search Results:
ID: 101, Name: Laptop, Price: ₹60000, Stock: 10

Products sorted by price (ASC):
ID: 103, Name: Headphones, Price: ₹3000, Stock: 50
ID: 105, Name: Monitor, Price: ₹12000, Stock: 8
ID: 102, Name: Smartphone, Price: ₹25000, Stock: 20
ID: 104, Name: Tablet, Price: ₹40000, Stock: 5
ID: 101, Name: Laptop, Price: ₹60000, Stock: 10

Products sorted by price (DESC):
ID: 101, Name: Laptop, Price: ₹60000, Stock: 10
ID: 104, Name: Tablet, Price: ₹40000, Stock: 5
ID: 102, Name: Smartphone, Price: ₹25000, Stock: 20
ID: 105, Name: Monitor, Price: ₹12000, Stock: 8
ID: 103, Name: Headphones, Price: ₹3000, Stock: 50

Products with stock ≥ 10:
ID: 101, Name: Laptop, Price: ₹60000, Stock: 10
ID: 102, Name: Smartphone, Price: ₹25000, Stock: 20
ID: 103, Name: Headphones, Price: ₹3000, Stock: 50
```

---

### **Final Thoughts**
- 🔥 We improved the **inventory system** by adding **search, sorting, and filtering** capabilities.  
- 🚀 This approach makes the inventory **more dynamic** and **efficient**.  
- 💡 You can extend this further by adding **categories, discounts, or a user-friendly interface (UI).**  

Would you like to implement a **web-based UI** for this inventory system using **React or Angular**? 🎨💻

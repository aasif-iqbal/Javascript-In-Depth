## **Shallow Copy and Deep Copy**

A **copy** in programming refers to creating a new object based on an existing one. The way this copy behaves depends on whether it is **shallow** or **deep**.

---

### 1. **Shallow Copy**
A **shallow copy** creates a new object but does not recursively copy nested objects. Instead, it copies references to the nested objects. This means changes to the nested objects in the original will reflect in the copy and vice versa.

#### Characteristics:
- The top-level structure is copied.
- Nested objects are **shared** between the original and the copy.

#### Example in JavaScript:
```javascript
const original = { 
  name: "Alice", 
  address: { city: "Wonderland" } 
};

// Create a shallow copy
const shallowCopy = { ...original };

// Modify the nested object
shallowCopy.address.city = "New York";

console.log(original.address.city); // "New York" (shared reference)
```

#### Shallow Copy Methods:
- **JavaScript**: Spread operator (`{ ...obj }`), `Object.assign()`, `Array.slice()`
- **Python**: `copy.copy()` (from `copy` module)

---

### 2. **Deep Copy**
A **deep copy** creates a completely independent copy of an object, including all nested objects. Changes to the nested objects in the original do not affect the deep copy.

#### Characteristics:
- The entire structure is copied recursively.
- No shared references between the original and the copy.

#### Example in JavaScript:
```javascript
const original = { 
  name: "Alice", 
  address: { city: "Wonderland" } 
};

// Create a deep copy
const deepCopy = JSON.parse(JSON.stringify(original));

// Modify the nested object
deepCopy.address.city = "New York";

console.log(original.address.city); // "Wonderland" (no shared reference)
```

#### Deep Copy Methods:
- **JavaScript**: 
  - `JSON.parse(JSON.stringify(obj)` (simple but has limitations with functions, dates, etc.)
  - Libraries like Lodash (`_.cloneDeep()`)
- **Python**: `copy.deepcopy()` (from `copy` module)

---

### **Key Differences**

| Feature              | Shallow Copy                               | Deep Copy                                |
|----------------------|--------------------------------------------|------------------------------------------|
| **Copies Top-Level** | Yes                                        | Yes                                      |
| **Copies Nested**    | No (only references copied)                | Yes (new objects created recursively)   |
| **Shared References**| Yes                                        | No                                       |
| **Performance**      | Faster (no recursion)                     | Slower (recursion is involved)          |

---

### When to Use:
- **Shallow Copy:** When you want to duplicate an object but are okay with shared references for nested objects (e.g., small or immutable structures).
- **Deep Copy:** When you need a completely independent copy to avoid unintended side effects (e.g., complex objects with mutable nested structures).


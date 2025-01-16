##  Linked List
A **linked list** is a linear data structure in which elements, called **nodes**, are connected using **pointers**. Each node contains:

1. **Data**: The actual value or information.
2. **Pointer (or reference)**: A reference to the next node in the sequence.

Unlike arrays, linked lists do not store elements in contiguous memory locations. Instead, each element points to the next, forming a chain-like structure.

---

### **Types of Linked Lists**

1. **Singly Linked List**:
   - Each node contains data and a pointer to the next node.
   - Traversal is one-way (from head to the last node).
   - **Example**:
     ```
     [data, next] -> [data, next] -> [data, null]
     ```

2. **Doubly Linked List**:
   - Each node contains data, a pointer to the next node, and a pointer to the previous node.
   - Allows traversal in both directions.
   - **Example**:
     ```
     null <- [prev, data, next] <-> [prev, data, next] -> null
     ```

3. **Circular Linked List**:
   - In a singly or doubly linked list, the last node points back to the first node, forming a circular structure.
   - **Example** (Singly Circular Linked List):
     ```
     [data, next] -> [data, next] -> [data, head]
     ```

---

### **Why Use Linked Lists?**
- **Dynamic Size**: Unlike arrays, linked lists can grow or shrink in size dynamically.
- **Efficient Insertions/Deletions**: Inserting or deleting elements in a linked list does not require shifting elements, making it efficient compared to arrays.
- **Memory Allocation**: Does not require a contiguous block of memory.

---

### **Advantages**
1. Dynamic memory allocation.
2. Insertion and deletion are efficient (O(1) at the head or tail).
3. No memory wastage due to resizing.

---

### **Disadvantages**
1. Slower access (O(n) time) because elements are not stored contiguously.
2. Additional memory is required for pointers.
3. Traversal is less straightforward compared to arrays.

---

### **Example Use Cases**
1. **Implementing Queues and Stacks**.
2. **Dynamic Memory Allocation** in operating systems.
3. **Undo Functionality** in applications.
4. **Browser History Management**.

---

### **Visualization: Singly Linked List**
Imagine a list: `10 -> 20 -> 30 -> null`

| Node | Data | Next   |
|------|------|--------|
| 1    | 10   | Node 2 |
| 2    | 20   | Node 3 |
| 3    | 30   | null   |

Each node points to the next node, and the last node points to `null`. The head points to the first node.


```js
class Node {
    constructor(value) {
        this.value = value; // Value of the node
        this.next = null;   // Pointer to the next node
    }
}

class LinkedList {
    constructor() {
        this.head = null; // First node in the list
        this.size = 0;    // Size of the linked list
    }

    // Add a node at the end of the list
    add(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode; // If the list is empty, set head to the new node
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next; // Traverse to the last node
            }
            current.next = newNode; // Add the new node at the end
        }
        this.size++;
    }

    // Remove a node by value
    remove(value) {
        if (this.head === null) {
            console.log("List is empty");
            return;
        }

        // If the head is the node to be removed
        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;
        let previous = null;

        while (current !== null && current.value !== value) {
            previous = current;
            current = current.next;
        }

        if (current === null) {
            console.log("Value not found in the list");
            return;
        }

        previous.next = current.next; // Remove the node
        this.size--;
    }

    // Display the linked list
    display() {
        if (this.head === null) {
            console.log("List is empty");
            return;
        }

        let current = this.head;
        let result = "";

        while (current !== null) {
            result += current.value + " -> ";
            current = current.next;
        }
        result += "null"; // End of the list
        console.log(result);
    }

    // Get the size of the linked list
    getSize() {
        return this.size;
    }
}

// Example Usage
const list = new LinkedList();
list.add(10);
list.add(20);
list.add(30);

list.display(); // Output: 10 -> 20 -> 30 -> null

list.remove(20);
list.display(); // Output: 10 -> 30 -> null

console.log("Size:", list.getSize()); // Output: Size: 2
```
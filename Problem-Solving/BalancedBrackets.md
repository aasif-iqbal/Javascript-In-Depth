## Balanced Brackets
Here’s a JavaScript program to check if an expression with brackets (parentheses `()`, curly braces `{}`, and square brackets `[]`) is well-formed (balanced) using a stack-based approach.

---

### **Algorithm**
1. Create a stack to keep track of opening brackets.
2. Traverse the expression:
   - Push opening brackets (`(`, `{`, `[`) onto the stack.
   - For closing brackets (`)`, `}`, `]`):
     - Check if the stack is not empty and the top of the stack matches the corresponding opening bracket.
     - If they match, pop the top of the stack.
     - If not, the expression is unbalanced.
3. After traversal:
   - If the stack is empty, the expression is well-formed.
   - If the stack is not empty, it means there are unmatched opening brackets.

---

### **Code Example**
```javascript
function isBalanced(expression) {
    const stack = [];
    const matchingBrackets = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of expression) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char); // Push opening brackets onto the stack
        } else if (char === ')' || char === '}' || char === ']') {
            // Check if the stack is empty or doesn't match the corresponding opening bracket
            if (stack.length === 0 || stack.pop() !== matchingBrackets[char]) {
                return false; // Not balanced
            }
        }
    }

    // If the stack is empty, the expression is balanced
    return stack.length === 0;
}

// Example Usage
console.log(isBalanced("{[()]}")); // Output: true
console.log(isBalanced("{[(])}")); // Output: false
console.log(isBalanced("{[}"));    // Output: false
```

---

### **Explanation**
1. **Input: `{[()]}`**
   - Push `{`, `[`, `(` onto the stack: `stack = ['{', '[', '(']`.
   - Match `)` with `(`, pop: `stack = ['{', '[']`.
   - Match `]` with `[`, pop: `stack = ['{']`.
   - Match `}` with `{`, pop: `stack = []`.
   - Stack is empty → Balanced.

2. **Input: `{[(])}`**
   - Push `{`, `[`, `(` onto the stack: `stack = ['{', '[', '(']`.
   - Match `)` with `(`, pop: `stack = ['{', '[']`.
   - Match `]` with `[`, but encounter a mismatch with `)`.
   - Return `false` → Not balanced.

3. **Input: `{[}`**
   - Push `{`, `[` onto the stack: `stack = ['{', '[']`.
   - Encounter `}` but mismatch with `[`.
   - Return `false` → Not balanced.

---
const stack = ['{', '[', '('];
console.log(stack.pop()); // Output: '('
console.log(stack);       // Remaining stack: ['{', '[']


### **Key Points**
- Time Complexity: **O(n)** where `n` is the length of the expression.
- Space Complexity: **O(n)** for the stack, in the worst case when all characters are opening brackets.


345. Reverse Vowels of a String | Easy
Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

Example 1:

Input: s = "IceCreAm"

Output: "AceCreIm"

Explanation:

The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

Example 2:

Input: s = "leetcode"

Output: "leotcede" 

Constraints:

1 <= s.length <= 3 * 105
s consist of printable ASCII characters.


## By Brut force
Yes, you can solve this problem using a **brute force** approach. The brute force method focuses on explicitly finding and reversing the vowels in the string with a straightforward process. Here's how you can do it:

---

### **Steps for Brute Force Approach**

1. **Extract All Vowels**:
   - Traverse the string and collect all vowels (both uppercase and lowercase) in a separate list.

2. **Reverse the Vowel List**:
   - Reverse the list of vowels.

3. **Replace Vowels in the String**:
   - Traverse the string again and replace each vowel with the corresponding element from the reversed vowel list.

---

### **Brute Force Code Implementation**

```javascript
function reverseVowelsBruteForce(s) {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']; // Define vowel set
    let vowelList = []; // To store vowels from the string

    // Step 1: Collect all vowels
    for (let char of s) {
        if (vowels.includes(char)) {
            vowelList.push(char);
        }
    }

    // Step 2: Reverse the collected vowels
    vowelList.reverse();

    // Step 3: Replace vowels in the string with reversed vowels
    let result = "";
    let index = 0; // Pointer for reversed vowel list

    for (let char of s) {
        if (vowels.includes(char)) {
            result += vowelList[index];
            index++;
        } else {
            result += char; // Non-vowel characters remain unchanged
        }
    }

    return result;
}

// Example Usage
console.log(reverseVowelsBruteForce("IceCreAm")); // Output: "AceCreIm"
console.log(reverseVowelsBruteForce("leetcode")); // Output: "leotcede"
```

---

### **Explanation of the Brute Force Steps**

#### Example: `s = "IceCreAm"`

1. **Collect Vowels**:
   - Traverse the string and collect all vowels: `['I', 'e', 'e', 'A']`.

2. **Reverse the Vowels**:
   - Reverse the list of vowels: `['A', 'e', 'e', 'I']`.

3. **Replace Vowels**:
   - Traverse the string and replace each vowel:
     - Replace `I` (index `0`) with `A`.
     - Replace `e` (index `2`) with `e`.
     - Replace `e` (index `6`) with `e`.
     - Replace `A` (index `7`) with `I`.

   Final result: `"AceCreIm"`

---

### **Complexity Analysis**

#### Time Complexity:
1. Collecting vowels: O(n), where `n` is the length of the string.
2. Reversing vowels: O(k), where `k` is the number of vowels.
3. Replacing vowels in the string: O(n).

Overall: **O(n)**.

#### Space Complexity:
- Storing the vowels requires O(k) space, where `k` is the number of vowels in the string.

---

### **Why Choose Brute Force?**
- Simple and easy to understand.
- Works well for smaller strings.
- Not as efficient as the two-pointer method for larger inputs but is a valid solution.


## By Two Pointers
Let’s break down the process step-by-step for the input `s = "IceCreAm"` to understand how the output becomes `"AceCreIm"`.

---

### **Input**:
`"IceCreAm"`

### **Vowels**:
The vowels in the input string are `I, e, e, A`.  
Their **positions** in the string are:
- `I` at index `0`
- `e` at index `2`
- `e` at index `6`
- `A` at index `7`

---

### **Objective**:
Reverse the order of vowels in the string while leaving other characters in their original positions.

---

### **Steps**:

1. **Original String**:
   ```
   I c e C r e A m
   ```

2. **Reverse the Vowels**:
   Reverse the sequence of vowels: `['I', 'e', 'e', 'A']` becomes `['A', 'e', 'e', 'I']`.

3. **Start Swapping Vowels**:
   Use a **two-pointer approach** to swap vowels while leaving other characters untouched.

   - **Initial Setup**:
     - `left = 0` (pointing to the first character)
     - `right = 7` (pointing to the last character)

   - **Step 1**: 
     Swap the vowels at `left` and `right`:
     - `I` (index `0`) ↔ `A` (index `7`)
     ```
     A c e C r e I m
     ```
     Move `left` to `1` and `right` to `6`.

   - **Step 2**:
     Move `left` to `2` because `c` is not a vowel. Similarly, move `right` to `6`.

     Swap the vowels at `left` and `right`:
     - `e` (index `2`) ↔ `e` (index `6`)
     - No visible change as they are the same:
     ```
     A c e C r e I m
     ```

     Move `left` to `3` and `right` to `5`.

   - **Step 3**:
     Since the pointers have crossed (`left > right`), stop swapping.

---

### **Final String**:
The modified string after all swaps is:
```
AceCreIm
```

---

### **Output**:
`"AceCreIm"`

---

### **Explanation of Changes**:
- The vowels `I, e, e, A` were reversed to `A, e, e, I`.
- The consonants and their positions (`c, C, r, m`) remain unchanged.

This step-by-step vowel reversal achieves the desired output while preserving the structure of the original string.

## By Using Two Pointers
```js
function reverseVowels(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']); // Set for quick lookup
    const chars = s.split(''); // Convert string to array for easy swapping
    let left = 0, right = chars.length - 1;

    while (left < right) {
        // Move left pointer until it finds a vowel
        while (left < right && !vowels.has(chars[left])) {
            left++;
        }
        // Move right pointer until it finds a vowel
        while (left < right && !vowels.has(chars[right])) {
            right--;
        }
        // Swap the vowels
        if (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }

    return chars.join(''); // Convert array back to string
}

// Example Usage
console.log(reverseVowels("IceCreAm")); // Output: "AceCreIm"
console.log(reverseVowels("leetcode")); // Output: "leotcede"
```
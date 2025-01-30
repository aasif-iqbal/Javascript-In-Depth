443. String Compression

```lua
Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

 

Example 1:

Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
Example 2:

Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.
Example 3:

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
 

Constraints:

1 <= chars.length <= 2000
chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.
```
Here's an **efficient JavaScript solution** using **constant extra space (O(1))**:

---

### **Approach**
1. Use a **pointer `i`** to traverse the array.
2. Use a **write pointer `writeIndex`** to track where the compressed characters should be written.
3. For each group of consecutive characters:
   - Write the character to `chars[writeIndex]` and increment `writeIndex`.
   - If the group has more than one occurrence, write the count **digit by digit**.
4. Continue until `i` reaches the end of the array.
5. Return `writeIndex` as the new length of the modified array.

---

### **JavaScript Code**
```js
function compress(chars) {
    let writeIndex = 0; // Pointer to write compressed chars
    let i = 0; // Pointer to traverse the array

    while (i < chars.length) {
        let char = chars[i];
        let count = 0;

        // Count occurrences of the current character
        while (i < chars.length && chars[i] === char) {
            i++;
            count++;
        }

        // Write the character
        chars[writeIndex] = char;
        writeIndex++;

        // Write the count if greater than 1
        if (count > 1) {
            for (let digit of count.toString()) {
                chars[writeIndex] = digit;
                writeIndex++;
            }
        }
    }

    return writeIndex; // New length of the array
}

// Example Test Cases
console.log(compress(["a","a","b","b","c","c","c"])); // Output: 6 (["a","2","b","2","c","3"])
console.log(compress(["a"])); // Output: 1 (["a"])
console.log(compress(["a","b","b","b","b","b","b","b","b","b","b","b","b"])); // Output: 4 (["a","b","1","2"])
```

---

### **Explanation**
#### **Example 1: `["a","a","b","b","c","c","c"]`**
1. `'a'` appears **2** times → store `"a2"`.
2. `'b'` appears **2** times → store `"b2"`.
3. `'c'` appears **3** times → store `"c3"`.
4. **Final array**: `["a","2","b","2","c","3"]`
5. **Return length**: `6`

#### **Example 2: `["a"]`**
1. `'a'` appears **1** time → remains `"a"`.
2. **Final array**: `["a"]`
3. **Return length**: `1`

#### **Example 3: `["a","b","b","b","b","b","b","b","b","b","b","b","b"]`**
1. `'a'` appears **1** time → remains `"a"`.
2. `'b'` appears **12** times → store `"b12"`.
3. **Final array**: `["a","b","1","2"]`
4. **Return length**: `4`

---

### **Time & Space Complexity**
- **Time Complexity**: **O(n)** → Iterates through `chars` once.
- **Space Complexity**: **O(1)** → No extra space used.

🚀 **This solution modifies `chars` in-place and returns the new length efficiently!** Let me know if you have any questions! 😊

## Not Recommended
```js
var compress = function(chars) {
   let imap = new Map();
   if(chars.length == 1) return 1;
   for(let i=0; i<chars.length; i++){     
     if(!imap.has(chars[i])){
        imap.set(chars[i], (imap.get(chars[i])||0) + 1)  
     }else{
       imap.set(chars[i], imap.get(chars[i]) + 1)  
     }
   }
   
   let arr = Array.from([...imap])
   let newStr = arr.join().replace('1','').replaceAll(',','');
   return newStr.split('').length;
};
```
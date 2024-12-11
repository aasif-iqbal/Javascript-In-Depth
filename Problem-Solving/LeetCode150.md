Visit [Top-interview-150](https://leetcode.com/studyplan/top-interview-150/) With Gmail - aasif.iqbal4000@gmail.com

# 205. Isomorphic Strings - [Easy]
```txt
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

Example 1:

Input: s = "egg", t = "add"

Output: true

Explanation:

The strings s and t can be made identical by:

Mapping 'e' to 'a'.
Mapping 'g' to 'd'.
Example 2:

Input: s = "foo", t = "bar"

Output: false

Explanation:

The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'.

Example 3:

Input: s = "paper", t = "title"

Output: true

 

Constraints:

- 1 <= s.length <= 5 * 104
- t.length == s.length
- s and t consist of any valid ascii character.
```
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
     // Mappings for s -> t and t -> s
    const mappingSToT = new Map();
    const mappingTToS = new Map();

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];

        // Check if the mapping is consistent for s -> t
        if (mappingSToT.has(charS)) {
            if (mappingSToT.get(charS) !== charT) {
                return false;
            }
        } else {
            mappingSToT.set(charS, charT);
        }

        // Check if the mapping is consistent for t -> s
        if (mappingTToS.has(charT)) {
            if (mappingTToS.get(charT) !== charS) {
                return false;
            }
        } else {
            mappingTToS.set(charT, charS);
        }
    }
    return true;
};
```

# 151. Reverse Words in a String - [***Medium***]
```
Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

 

Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"
Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
 

Constraints:

- 1 <= s.length <= 104
- s contains English letters (upper-case and lower-case), digits, and spaces ' '.
- There is at least one word in s.
 

Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?
```
Here’s another approach to reverse the words in a string without explicitly using `split()` or `reverse()`.

### Implementation:
```javascript
function reverseWords(s) {
    let result = "";
    let word = "";
    
    // Step 1: Traverse the string in reverse
    for (let i = s.length - 1; i >= 0; i--) {
        const char = s[i];
        
        // Step 2: Build words character by character
        if (char !== ' ') {
            word = char + word;
        } else if (word) { // If a word is completed and there's a space
            if (result) result += " ";
            result += word;
            word = ""; // Reset for the next word
        }
    }
    
    // Step 3: Add the last word if it exists
    if (word) {
        if (result) result += " ";
        result += word;
    }

    return result;
}

// Test cases
console.log(reverseWords("the sky is blue"));       // Output: "blue is sky the"
console.log(reverseWords("  hello world  "));       // Output: "world hello"
console.log(reverseWords("a good   example"));      // Output: "example good a"
console.log(reverseWords("   a"));                  // Output: "a"
```

### Explanation:
1. **Traverse Backward**:
   - Start from the end of the string to find words in reverse order.
2. **Build Words**:
   - Use a temporary variable (`word`) to construct words character by character.
3. **Add Words to Result**:
   - When a word ends (indicated by a space), append it to the result.
   - Use a check to ensure no leading or trailing spaces are added.
4. **Final Word**:
   - Add the last word after the loop completes if it exists.

### Advantages:
- Avoids using built-in methods like `split()` and `reverse()` for educational purposes.
- Handles spaces naturally due to the character-by-character traversal.

**a.** Should we explore more edge cases like strings with only spaces or single-character words?  
**b.** Would you like to compare this approach to a more efficient `regex`-based solution?


# 58. Length of Last Word
```
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal 
substring
 consisting of non-space characters only.

Example 1:

Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
Example 2:

Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
Example 3:

Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
 
Constraints:

1 <= s.length <= 104
s consists of only English letters and spaces ' '.
There will be at least one word in s.
```

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let str = s.trim();
     
     let arr = str.split(' ');
     let imap = new Map();
     
     for(let i=0; i< arr.length; i++){
            imap.set(arr[i], arr[i].length)    
     };
     
     let sortMap = Array.from(imap).at(-1);
     
     return sortMap[1]
};
```
# 50. Length Of Largest Word
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLargestWord = function(s) {
  let str = s.trim();
     
     let arr = str.split(' ');
     let imap = new Map();
     
     for(let i=0; i< arr.length; i++){
            imap.set(arr[i], arr[i].length)    
     };
     
     let sortMap = Array.from(imap).sort((a, b)=>b[1] - a[1])
     // return largest string in array.
     let output = sortMap[0].slice(1)
     return parseInt(output);  
};
```
```text
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings. 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.
```

```js
//Method 1: 

function longestCommonPrefix(strs) {
    if (strs.length === 0) return ""; // No strings in the array

    // Sort the array to bring similar prefixes closer
    strs.sort();

    // Compare the first and last string only, as they will be the most dissimilar
    const first = strs[0];
    const last = strs[strs.length - 1];

    let i = 0;
    while (i < first.length && first[i] === last[i]) {
        i++;
    }

    return first.slice(0, i); // Common prefix
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""

// Method 2:

function longestCommonPrefix(strs) {
    if (strs.length === 0) return ""; // No strings in the array

    // Start with the first string as the prefix
    let prefix = strs[0];

    // Compare the prefix with each subsequent string
    for (let i = 1; i < strs.length; i++) {
        // Keep reducing the prefix until it matches the start of the current string
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1); // Remove the last character from the prefix
            if (prefix === "") return ""; // No common prefix
        }
    }

    return prefix;
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""
```

# 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum

```txt
You are given a 0-indexed array of integers nums.

A prefix nums[0..i] is sequential if, for all 1 <= j <= i, nums[j] = nums[j - 1] + 1. In particular, the prefix consisting only of nums[0] is sequential.

Return the smallest integer x missing from nums such that x is greater than or equal to the sum of the longest sequential prefix.

Example 1:

Input: nums = [1,2,3,2,5]
Output: 6
Explanation: The longest sequential prefix of nums is [1,2,3] with a sum of 6. 6 is not in the array, therefore 6 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
Example 2:

Input: nums = [3,4,5,1,12,14,13]
Output: 15
Explanation: The longest sequential prefix of nums is [3,4,5] with a sum of 12. 12, 13, and 14 belong to the array while 15 does not. Therefore 15 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
 

Constraints:

1 <= nums.length <= 50
1 <= nums[i] <= 50
```

```js
function findSmallestMissing(nums) {
    let sum = nums[0];
     
    let i = 1;

    // Find the longest sequential prefix
    while (i < nums.length && nums[i] === nums[i - 1] + 1) {
        sum += nums[i];
        i++;
    }
    
    console.log(sum)
    
    // Find the smallest missing integer >= sum 
    // 
    while (nums.includes(sum)) {      
        sum++;
        console.log('inside:',sum) //13,14,15
    }

    return sum;
}

// Example usage:
// console.log(findSmallestMissing([1, 2, 3, 2, 5])); // Output: 6
console.log(findSmallestMissing([3, 4, 5, 1, 12, 14, 13])); // Output: 15
```
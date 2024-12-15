## 1071. Greatest Common Divisor of Strings
```txt
For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

Example 1:

Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"

Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"

Example 3:

Input: str1 = "LEET", str2 = "CODE"
Output: "" 

Constraints:

1 <= str1.length, str2.length <= 1000

str1 and str2 consist of English uppercase letters.
```
```javascript
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function gcdOfStrings(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const gcdLen = gcd(len1, len2); // Step 1: Compute GCD of lengths
    const potentialDivisor = str1.slice(0, gcdLen); // Step 2: Extract potential divisor
    
    // Step 3: Check if the potential divisor divides both strings
    if (potentialDivisor.repeat(len1 / gcdLen) === str1 && potentialDivisor.repeat(len2 / gcdLen) === str2) {
        return potentialDivisor;
    }
    return "";
}

// Examples
console.log(gcdOfStrings("ABCABC", "ABC")); // Output: "ABC"
console.log(gcdOfStrings("ABABAB", "ABAB")); // Output: "AB"
console.log(gcdOfStrings("LEET", "CODE"));   // Output: ""
```
Method 2:
```js
function gcdOfStrings(str1, str2) {
  // Helper function to calculate the GCD of two numbers
  function gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Check if concatenated strings are equal
  if (str1 + str2 !== str2 + str1) {
    return "";
  }

  // Find the GCD of the lengths of str1 and str2
  let gcdLength = gcd(str1.length, str2.length);

  // Return the substring from the start of str1 up to gcdLength
  let result = "";
  for (let i = 0; i < gcdLength; i++) {
    result += str1[i];
  }
  return result;
}

// Example Usage
console.log(gcdOfStrings("ABCABC", "ABC"));  // Output: "ABC"
console.log(gcdOfStrings("ABABAB", "ABAB")); // Output: "AB"
console.log(gcdOfStrings("LEET", "CODE"));   // Output: ""
```
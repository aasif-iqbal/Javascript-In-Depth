### **Design Patterns for Solving String Problems**

When solving **string-based** problems, applying certain design patterns can help improve efficiency and provide structured solutions. Below are the most common design patterns used for string manipulation, categorized by their approach.

---

## **1. Two Pointers**
### **When to Use:**  
- Problems involving **reversing** or **modifying** strings.
- **Palindrome detection** or **substring searching**.

### **Example Problems:**  
- **Check if a string is a palindrome**.
- **Reverse a string**.

### **Approach:**  
1. Use two pointers: one starting at the beginning and one at the end.
2. Move both pointers towards the center, comparing characters.

### **Example Code: Check Palindrome**
```js
function isPalindrome(str) {
    let left = 0, right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    
    return true;
}
console.log(isPalindrome("racecar"));  // Output: true
```

---

## **2. Sliding Window**
### **When to Use:**  
- **Substring problems** or finding the **longest substring** with specific conditions.
- **Dynamic windows** based on characters (e.g., without repeating characters).

### **Example Problems:**  
- **Longest substring without repeating characters**.
- **Anagram matching** (find all anagrams of a string in a text).

### **Approach:**  
1. Maintain a **window** of characters using two pointers.
2. Adjust the window size based on the current conditions.

### **Example Code: Longest Substring Without Repeating Characters**
```js
function lengthOfLongestSubstring(str) {
    let map = new Map();
    let left = 0, maxLength = 0;

    for (let right = 0; right < str.length; right++) {
        if (map.has(str[right])) {
            left = Math.max(map.get(str[right]) + 1, left);
        }
        map.set(str[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
console.log(lengthOfLongestSubstring("abcabcbb"));  // Output: 3
```

---

## **3. Hashing / Frequency Map**
### **When to Use:**  
- Problems involving **counting occurrences** of characters.
- **Character matching** (anagrams, pattern matching).

### **Example Problems:**  
- **Anagram check** (Are two strings anagrams?).
- **Character frequency count**.

### **Approach:**  
1. Use a **hash map** to store character counts.
2. Compare the character frequencies between different substrings or strings.

### **Example Code: Check if Two Strings are Anagrams**
```js
function areAnagrams(str1, str2) {
    if (str1.length !== str2.length) return false;
    
    let freqMap = new Map();
    
    for (let char of str1) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    
    for (let char of str2) {
        if (!freqMap.has(char) || freqMap.get(char) === 0) return false;
        freqMap.set(char, freqMap.get(char) - 1);
    }
    
    return true;
}
console.log(areAnagrams("listen", "silent"));  // Output: true
```

---

## **4. Backtracking**
### **When to Use:**  
- Problems that involve **all possible combinations** or **permutations**.
- **Pattern matching** or generating **substrings**.

### **Example Problems:**  
- **Generate all permutations** of a string.
- **Find all valid permutations** of a string with given constraints.

### **Approach:**  
1. Recursively build **partial solutions** and backtrack if needed.
2. Explore all possibilities by including/excluding characters.

### **Example Code: Generate All Permutations**
```js
function permute(str) {
    let results = [];
    
    function backtrack(path, remaining) {
        if (remaining.length === 0) {
            results.push(path);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            backtrack(path + remaining[i], remaining.slice(0, i) + remaining.slice(i + 1));
        }
    }
    
    backtrack("", str);
    return results;
}
console.log(permute("abc"));  // Output: ["abc", "acb", "bac", "bca", "cab", "cba"]
```

---

## **5. Dynamic Programming (DP)**
### **When to Use:**  
- Problems involving **overlapping subproblems**.
- **Optimal substructure**, such as **edit distance**, **longest common subsequence**.

### **Example Problems:**  
- **Longest common subsequence**.
- **Edit distance** between two strings.

### **Approach:**  
1. Break the problem into subproblems and store the results in a **table**.
2. Build up the solution by solving smaller problems first.

### **Example Code: Longest Common Subsequence**
```js
function longestCommonSubsequence(str1, str2) {
    const dp = Array(str1.length + 1).fill().map(() => Array(str2.length + 1).fill(0));

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[str1.length][str2.length];
}
console.log(longestCommonSubsequence("abcde", "ace"));  // Output: 3
```

---

## **6. Greedy Algorithms**
### **When to Use:**  
- Problems that can be solved by making **locally optimal choices** at each step.
- **String rearrangements** or **partitioning problems**.

### **Example Problems:**  
- **Rearrange characters** in a string.
- **Maximize substring** problems.

### **Approach:**  
1. Make a choice that seems **best at the moment**, with the hope of finding the global optimum.

### **Example Code: Rearrange Characters to Avoid Adjacent Duplicates**
```js
function rearrangeString(str) {
    let freqMap = new Map();
    for (let char of str) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    let maxHeap = new MaxHeap((a, b) => a[1] - b[1]);
    for (let [char, freq] of freqMap) {
        maxHeap.push([char, freq]);
    }

    let result = '';
    let prev = null;

    while (maxHeap.size() > 0) {
        let [char, freq] = maxHeap.pop();
        result += char;

        if (prev) {
            maxHeap.push(prev);
        }

        if (freq - 1 > 0) {
            prev = [char, freq - 1];
        } else {
            prev = null;
        }
    }

    return result.length === str.length ? result : '';
}
console.log(rearrangeString("aaabbbcc"));  // Output: "abcabc"
```

---

## **7. Trie (Prefix Tree)**
### **When to Use:**  
- **Autocomplete** or **dictionary-based problems**.
- **Prefix matching** and **word searching**.

### **Example Problems:**  
- **Search for a word in a dictionary**.
- **Find all words with a given prefix**.

### **Approach:**  
1. Store strings as a **prefix tree** to quickly access all words starting with a particular prefix.
2. Use DFS or BFS to explore possible matches.

---

## **Conclusion**
The design patterns applied to string problems depend on the nature of the problem and the approach required to solve it. Here's a quick guide to choosing the right pattern:

| **Pattern**        | **Use Case** |
|--------------------|-------------|
| **Two Pointers**    | Reversing strings, palindrome checking |
| **Sliding Window**  | Substring problems, pattern matching |
| **Hashing/Frequency Map** | Counting characters, anagram checking |
| **Backtracking**    | Permutation, combination problems |
| **Dynamic Programming** | LCS, Edit distance |
| **Greedy Algorithms** | String rearrangement, optimization |
| **Trie**            | Autocomplete, dictionary search |

Would you like more **hands-on practice** with any of these patterns?
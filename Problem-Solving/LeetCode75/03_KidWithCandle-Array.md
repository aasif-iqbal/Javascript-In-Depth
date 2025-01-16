## 1431. Kids With the Greatest Number of Candies
```
There are n kids with candies. You are given an integer array candies, where each candies[i] represents the number of candies the ith kid has, and an integer extraCandies, denoting the number of extra candies that you have.

Return a boolean array result of length n, where result[i] is true if, after giving the ith kid all the extraCandies, they will have the greatest number of candies among all the kids, or false otherwise.

Note that multiple kids can have the greatest number of candies.


Example 1:

Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true] 
Explanation: If you give all extraCandies to:
- Kid 1, they will have 2 + 3 = 5 candies, which is the greatest among the kids.
- Kid 2, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
- Kid 3, they will have 5 + 3 = 8 candies, which is the greatest among the kids.
- Kid 4, they will have 1 + 3 = 4 candies, which is not the greatest among the kids.
- Kid 5, they will have 3 + 3 = 6 candies, which is the greatest among the kids.

Example 2:

Input: candies = [4,2,1,1,2], extraCandies = 1
Output: [true,false,false,false,false] 
Explanation: There is only 1 extra candy.
Kid 1 will always have the greatest number of candies, even if a different kid is given the extra candy.

Example 3:

Input: candies = [12,1,12], extraCandies = 10
Output: [true,false,true]
 

Constraints:

n == candies.length
2 <= n <= 100
1 <= candies[i] <= 100
1 <= extraCandies <= 50
```

```javascript
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
  let candies = [4,2,1,1,2], extraCandies = 1;

function kidsWithCandies(candies, extraCandies){
  
  let newArr = candies.map((candy)=>candy+extraCandies);
  
  let output = [];
  
  for(let i=0; i<newArr.length; i++){
    for(let j=0; j<candies.length; j++){
      
      if(newArr[i] > candies[j]){
        output.push(true);
        break;
      }else{
        output.push(false);  
        break;
      }
      console.log('This will not execute - break throw out of j loop');
    }
    console.log('here after break',i)
  }
 return output;
}

console.log(kidsWithCandies(candies, extraCandies));  
};
```
Method 2: (Best way)
```js
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {

  let newArr = candies.map((candy)=>candy+extraCandies);
  let max = Math.max(...candies);
  let output = [];
  
  for(let i=0; i<newArr.length; i++){
      if(newArr[i] >= max){
        output.push(true);
      }else{
        output.push(false);  
      }
  }
 return output;
}
```
Method 3: (ChatGPT)
```js
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
    // Find the maximum number of candies any kid currently has
    const maxCandies = Math.max(...candies);
    
    // Initialize the result array
    const result = [];
    
    // Loop through each kid's candies
    for (let i = 0; i < candies.length; i++) {
        // Check if the current kid's candies + extraCandies >= maxCandies
        if (candies[i] + extraCandies >= maxCandies) {
            result.push(true);
        } else {
            result.push(false);
        }
    }
    
    return result;
};

// Example usage
console.log(kidsWithCandies([2, 3, 5, 1, 3], 3)); // Output: [true, true, true, false, true]
console.log(kidsWithCandies([4, 2, 1, 1, 2], 1)); // Output: [true, false, false, false, false]
console.log(kidsWithCandies([12, 1, 12], 10));    // Output: [true, false, true]
```
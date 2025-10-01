```js
/*
Given two strings s and goal, return true if and only if s can become goal after some number 
of shifts on s.
A shift on s consists of moving the leftmost character of s to the rightmost position.
For example, if s = "abcde", then it will be "bcdea" after one shift.
 
Example 1:
Input: s = "abcde", goal = "cdeab"Output: true
Example 2:
Input: s = "abcde", goal = "abced"Output: false
*/

// n -> number of rotations

function shiftString(string, goal, n){
  
  if(typeof string != 'string' && typeof goal != 'string') return null;
  
  let result = "";
  const len = string.length;
  const shift = ((n % len) + len) % len;
  
  result = string.slice(shift) + string.slice(0, shift);
  
  if(result == goal){
    return true;
  }else{
    return false;
  }
}

let s = 1234; 
let goal = "qrsp";

const result = shiftString(s, goal, 2)
console.log(result);
```
-----------------------------------
WellFound | found It | InstaHyre 
-----------------------------------
Prototype
Event loop in nodejs
Closure
Call stack
SOLID princple
Scope chaining
kafka 
Pub-sub 
Microservice and how to create. why we need it.
Microservice architure.
What is interface (typescript)
What is authentication and autherisation.
what is generator function.
what is async await.

//  remove duplicate value and output should be in decending order

let arr = [1,4,7,9,34,45,12,4,9,77,55,64];

function removeDuplicate(arr){
  
  const uniqueArr = [...new Map(arr.map(item => [item, item])).values()];
  // return uniqueArr.sort((a,b)=>b-a);
  console.log(uniqueArr)
  
  let imap = new Map();
  let result = [];
  
  for(let elem of arr){
   
   if(!imap.has(elem)){
    imap.set(elem, (imap.get(elem)||0)+1);  
   }else{
     imap.set(elem, (imap.get(elem))+1);  
   }
  }
  // console.log(imap)
  
  for(let [key, value] of imap){
    if(value < 2){
      result.push(key);
    }  
  }
  
  console.log(result.sort((a,b)=>b-a))
}

let result = removeDuplicate(arr);
// console.log(result);




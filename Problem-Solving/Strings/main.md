## Find 2nd most frequent char
```js
let str = 'aaabbbbcccdde'; 
//find 2nd most frequent letter/char

function getFrequentChar(str){
  //count each char 
  
  let imap = new Map();
  let strLength = str.split('').length;
  
  for(let i=0; i< strLength; i++){
    
    if(!imap.has(str[i])){
      //for first-time
      imap.set(str[i], (imap.get(str[i]) || 0) + 1)
    }else{
      // for 2nd and more
      imap.set(str[i], (imap.get(str[i])) + 1)
    }
  }
  // console.log(imap)
  //convert map object to Array
  let strArr =  Array.from(imap);
  
  // console.log(strArr);
  
   
// Simple-solution:Sort the array by the second element in descending order
// const sortedArr = [...strArr].sort((a, b) => b[1] - a[1]);
  
  // sort according to char-count & return 2nd most freq. count.
  let sortedArr = bubbleSort(strArr)
  
  // console.log('value',sortedArr[1][0]);
return sortedArr[1][0];
}
//for 2d array
function bubbleSort(arr){
  let sortArr = [];
  for(let i=0; i < arr.length-1; i++){
      // console.log('row',arr[i][0])
      // console.log('col',arr[i][1])
      
      if(arr[i][1] < arr[i+1][1]){
        [arr[i][1],arr[i+1][1]] = [arr[i+1][1], arr[i][1]];
      }       
  }
  // console.log(arr)
  return arr;
}
let result = getFrequentChar(str);
console.log(result); // b
```

## Understand 2D martix
Here's how you can access all elements in the 2D array using their indices:

For the array:  
```javascript
const array = [ [ 'a', 3 ], [ 'b', 4 ], [ 'c', 3 ], [ 'd', 2 ], [ 'e', 1 ] ];
```

Access each element:

### Row 0
- **Access `'a'`:** `array[0][0]` → `'a'`
- **Access `3`:** `array[0][1]` → `3`

### Row 1
- **Access `'b'`:** `array[1][0]` → `'b'`
- **Access `4`:** `array[1][1]` → `4`

### Row 2
- **Access `'c'`:** `array[2][0]` → `'c'`
- **Access `3`:** `array[2][1]` → `3`

### Row 3
- **Access `'d'`:** `array[3][0]` → `'d'`
- **Access `2`:** `array[3][1]` → `2`

### Row 4
- **Access `'e'`:** `array[4][0]` → `'e'`
- **Access `1`:** `array[4][1]` → `1`

---

### **Summary of Access Operations**
| **Index**   | **Element** |
|-------------|-------------|
| `array[0][0]` | `'a'`       |
| `array[0][1]` | `3`         |
| `array[1][0]` | `'b'`       |
| `array[1][1]` | `4`         |
| `array[2][0]` | `'c'`       |
| `array[2][1]` | `3`         |
| `array[3][0]` | `'d'`       |
| `array[3][1]` | `2`         |
| `array[4][0]` | `'e'`       |
| `array[4][1]` | `1`         |

---

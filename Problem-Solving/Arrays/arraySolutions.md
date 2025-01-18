## 02. Array Rotation
```js
let arr = [1,2,3,4,5,6];

function rotateClockwise(arr, k){
    // k Number of rotations
    let n = arr.length;
    
    for(let i=0; i < k; i++){
      
      
      let last = arr[n-1];  
      
      for(let j=n-1; j>0; j--){
      
        //shift each elem 
        arr[j] = arr[j-1]
        
      }
      arr[0] = last;
    }
    return arr;
}

console.log(rotateClockwise(arr,2))
```
## 10. Move Zeroes

```js
function moveZeroes(arr) {
  let nonZeroIndex = 0; // Index for placing non-zero elements

  // Move all non-zero elements to the front
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[nonZeroIndex] = arr[i];
      nonZeroIndex++;
    }
  }

  // Fill the remaining positions with zeros
  for (let i = nonZeroIndex; i < arr.length; i++) {
    arr[i] = 0;
  }

  return arr;
}

// Example usage:
const input = [0, 1, 2, 0, 3, 4, 0];
const output = moveZeroes(input);
console.log(output); // Output: [1, 2, 3, 4, 0, 0, 0]
```
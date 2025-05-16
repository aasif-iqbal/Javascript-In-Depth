## Can we handle Promise without using `.catch()`.

Solution:
```js
const promise = new Promise((resolve, reject) => {
  
  console.log(1);
  setTimeout(function() {
    console.log('timer start');
    reject('error');
    console.log('timer end');
  }, 0);
  console.log('2');
});

promise.then(
  (res) => {
  console.log('Resolve', res);
  },
  (err) => {
  console.log('Reject', err);
  }
);

console.log(4);
```
Output:
```sql
1
2
4
timer start
timer end
Reject error
```

```js
const user = {
  name:'John',
  greet: function(){
    return `Hello ${this.name}`;
  }
}

// case-1
// const getUserName = user.greet()
// console.log(getUserName);

// case-2
// const getUserName = user.greet
// console.log(getUserName()); // undefined

// fixing it
const getUserName = user.greet.call(user);
console.log(getUserName); 
```
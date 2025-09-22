## Api-handle
```js
const mockExternalApi = async (userId) => {
  const isFlaky = Math.random() > 0.7; // 30% failure chance
  if (isFlaky) {
    throw new Error(`Mock API failure for user ${userId}`);
  }
  return {
    id: userId,
    name: `User ${userId}`
  };
};

async function fetchUsersWithErrorHandling(userIds) {
  // Create promises for all API calls
  const promises = userIds.map(async (id) => {
    try {
      const user = await mockExternalApi(id);
      return user;
    } catch (error) {
      // On failure, return null to maintain array position
      return null;
    }
  });

  // Wait for all promises to resolve
  const results = await Promise.all(promises);
  return results;
}

// Usage example
async function example() {
  const userIds = [1, 2, 3, 4, 5];
  const users = await fetchUsersWithErrorHandling(userIds);
  console.log(users);
  // Output will be similar to: [
  //   { id: 1, name: "User 1" },
  //   { id: 2, name: "User 2" },
  //   null,  // Failed API call for ID 3
  //   { id: 4, name: "User 4" },
  //   { id: 5, name: "User 5" }
  // ]
}

example();
```


```js
let task1 = () => {
  let taskStatus = true;
  
  return new Promise((resolve, reject)=>{
    
    setTimeout(function() {
      if(taskStatus){
        resolve(`Task 1 - done`);
      }else{
        reject(`Task 1 - failed`);
      }      
    }, 2000);
  })
}

let task2 = () => {
  let taskStatus = true;
  
  return new Promise((resolve, reject)=>{
    
    setTimeout(function() {
      if(taskStatus){
        resolve(`Task 1 - done`);
      }else{
        reject(`Task 1 - failed`);
      }      
    }, 3000);
  })
}

let task3 = () => {
  let taskStatus = false;
  
  return new Promise((resolve, reject)=>{
    
    setTimeout(function() {
      if(taskStatus){
        resolve(`Task 1 - done`);
      }else{
        reject(`Task 1 - failed`);
      }      
    }, 1000);
  })
}


async function main(){
  
  try{
  // let result = await Promise.allSettled([task1(), task2(), task3()]);
  let result2 = await Promise.all([task1(), task2(), task3()])
  let result3 = await Promise.any([task1(), task2(), task3()]) //Task 1 - failed
  let result4 = await Promise.race([task1(), task2(), task3()]);  
  console.log('Result:', result4);
  }catch(error){
    console.log('Error:', error);
    return new Error('ERROR:', error);
  }
  
}

main();
```js

Promise.any() → Best when you want at least one success, ignore failures (good for redundant API calls to different servers).

Promise.race() → Best when you want the fastest result, even if it fails (useful for implementing timeouts).

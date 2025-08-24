// Fake Network Request with setTimeout
function fakeRequest(url) {
  return new Promise((resolve, reject) => {
    console.log(`Starting request to ${url}...`);

    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success, 30% fail
      if (success) {
        resolve({ status: 200, data: `Response from ${url}` });
      } else {
        reject(new Error(`Network error while fetching ${url}`));
      }
    }, 1000); // delay = 1 second
  });
}

fakeRequest("https://api.example.com/user")
  .then((res) => {
    console.log("✅ Success:", res);
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
  });


/*
Here are some promise-based coding questions to solve, which will help you practice asynchronous JavaScript and Promises:

1. **Fetch Data from API**:  
   Write a function `fetchUserData()` that returns a promise. This promise should fetch user data from an API (e.g., `https://jsonplaceholder.typicode.com/users`) and log the response data once resolved. If the request fails, handle the error gracefully and log an error message.
*/
function fetchUserData() {
  return fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Responce not found");
      }
      return response.json;
    })
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
// fetchUserData();

/*
  TypeError: fetch failed
      at node:internal/deps/undici/undici:12345:11
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
    cause: ConnectTimeoutError: Connect Timeout Error
        at onConnectTimeout (node:internal/deps/undici/undici:7492:28)
        at node:internal/deps/undici/undici:7448:50
        at Immediate._onImmediate (node:internal/deps/undici/undici:7480:13)
        at process.processImmediate (node:internal/timers:478:21) {
      code: 'UND_ERR_CONNECT_TIMEOUT'
    }
  }
  */

function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// fetchWithTimeout("https://jsonplaceholder.typicode.com/users", {}, 5000)
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error:", error));

/*
  2. **Chaining Promises**:  
    Create two functions, `getUserInfo()` and `getUserPosts()`. The `getUserInfo()` function should return a promise that resolves to a user object. Then, chain it to `getUserPosts()` which fetches posts based on the user's ID and resolves to a list of the user's posts.
  */

function getUserInfo() {
  let user = { id: 1, name: "john" };
  return new Promise((resolve, reject) => {
    resolve(user);
  });
}

function getUserPosts(userId) {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  ).then((response) => {
    if (!response.ok) throw new Error("Network error");
    return response.json();
  });
}

// getUserInfo()
//   .then((user) => {
//       console.log(user);
//       return user.id
//     })
//   .then((userId) => {
//     return getUserPosts(userId);
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch(err => console.error(err));

/*
  3. **Simulating API Calls with Timeout**:  
    Write a function `simulateNetworkRequest(url, delay)` that simulates a network request by returning a promise. This promise should resolve after the given delay. Test it by calling multiple requests and handling them using `.then()` and `.catch()`.
  */

function simulateNetworkRequest(url, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, delay);
  });
}

// simulateNetworkRequest('https://api.example.com', 3000)
//     .then(value => console.log('3::',value))
//     .catch(err => console.error(err));

/*
  4. **Promise with Error Handling**:  
     Write a function `validateUserData()` that returns a promise. This function should validate user data (e.g., ensure that the username is not empty). If the validation fails, the promise should be rejected with an error message, otherwise, it should resolve with the validated data.
  */

function validateUserData(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      return reject(`username or password not empty`);
    }

    if (username.length === 0 || password.length <= 2) {
      return reject(
        `Invalid username or password. Password must be at least 3 characters long`
      );
    }

    resolve(`welcome ${username}`);
  });
}

validateUserData("suresh", "orio")
  .then((response) => {
    console.log("response:", response);
  })
  .catch((err) => {
    console.error(err);
  });
/*
  5. **Race Condition using Promises**:  
    Write a function `fetchFirstToResolve()` that accepts an array of URLs and returns a promise that resolves with the first fetched data (the quickest to respond). Use `Promise.race()` to achieve this.
  */

const fetchFirstToResolve = (urls) => {
    
    const request = urls.map((url) => {
       return fetch(url).then(result => result.json());
    });

    return Promise.race(request);
};

// fetchFirstToResolve([
//     'https://jsonplaceholder.typicode.com/posts/2',
//     'https://jsonplaceholder.typicode.com/posts/1',
//     'https://jsonplaceholder.typicode.com/posts/3'
    
// ]).then(data => console.log('First resolve', data))
// .catch(err => console.error(err));

/*
  6. **Parallel Execution of Promises**:  
     Write a function `getAllUsersData()` that fetches data from three different APIs at the same time and returns the results as a single array. Use `Promise.all()` to ensure that all requests are executed in parallel.
*/
const getAllUsersData = () => {

    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3'
    ]
    
    const requests = urls.map(url => fetch(url).then(res=> res.json()));

    return Promise.all(requests);
}

// getAllUsersData()
//     .then(data => console.log('Users Data:', data))
//     .catch(err => console.log(err))

/*
  7. **Retry Logic with Promises**:  
     Write a function `fetchWithRetry(url, maxRetries)` that fetches data from an API, but if the request fails, it retries up to `maxRetries` times. Use recursion or `.then()` and `.catch()` for handling retries.
*/
    const fetchWithRetry = (url, maxRetries) => {
        return fetch(url).then((response)=> { 
            if(!response.ok) throw new Error(`Failed to fetch`);   
            return response.json()
        })
        .catch(error => {
            if(maxRetries > 0){
                console.log(`Retrying... (${maxRetries} attempts left)`);
                return fetchWithRetry(url, maxRetries - 1);
            }else{
                throw new Error('Max retries reaches');
            }
        })
    }
    //pass error url to check recursion
    // fetchWithRetry('https://jsonplaceholder.typicode.com/users', 3)
    //     .then(data => console.log('mx',data))
    //     .catch(err => console.log(err));
/*
  8. **Sequential Promises**:  
     Write a function `executeSequentially(promises)` that accepts an array of promises and executes them sequentially, one after another, regardless of whether they resolve or reject. The function should return the result of each promise in the order it was processed.
*/

const executeSequentially = () => {
    return promises.reduce((acc, currentPromise) => {
        return acc.then(results => 
          currentPromise
            .then(result => [...results, result])
            .catch(error => [...results, error])
        );
      }, Promise.resolve([]));
}

const promises = [
    Promise.resolve('First Promise Resolved'),
    Promise.resolve('Second Promise Resolved'),
    Promise.reject('Third Promise Rejected')
  ];
  
  executeSequentially(promises)
    .then(results => console.log('Results:', results))
    .catch(error => console.error('Error:', error));
/*
  9. **Delayed Execution using Promise**:  
     Write a function `delay(ms)` that returns a promise that resolves after `ms` milliseconds. Chain this function with a task (like logging a message) to delay its execution.
*/  
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  delay(2000)
    .then(() => console.log('Executed after 2 seconds delay'));
  
/*
  10. **Promise-based File Reader**:  
     Write a function `readFilePromise(file)` that reads a file using the FileReader API (for the browser) and returns a promise. The promise should resolve with the file contents and reject if there's an error while reading the file.
  
  These problems will help in mastering the use of promises and their application in asynchronous workflows!
  */

  function readFilePromise(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('Error reading file');
      reader.readAsText(file);
    });
}

// Usage (in browser environment):
// const file = document.querySelector('input[type="file"]').files[0];
// readFilePromise(file)
//   .then(content => console.log('File Content:', content))
//   .catch(error => console.error(error));


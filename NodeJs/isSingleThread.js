const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a','b', 100000, 512, 'sha512', ()=>{
    console.log('1:', Date.now() - start); //1653 ~ 1sec
})

// if node js is really a single threaded, then next function will take 2sec

crypto.pbkdf2('a','b', 100000, 512, 'sha512', ()=>{
    console.log('2:', Date.now() - start); //1676 ~ 1sec
})

// if node js is really a single threaded, then next function will take 3sec

crypto.pbkdf2('a','b', 100000, 512, 'sha512', ()=>{
    console.log('3:', Date.now() - start); //1688 ~ 1sec
})

// output

/*
1: 1653
2: 1676
3: 1680
*/

// crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)

 


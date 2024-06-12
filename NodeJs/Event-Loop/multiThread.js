/*
Here we demostrate that, in LibUV there is 4 threads.
*/ 

// Also, we can manage these threads.

// process.env.UV_THREADPOOL_SIZE = 2;  // it's allow only 2 thread to use below code

process.env.UV_THREADPOOL_SIZE = 5; 

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

crypto.pbkdf2('a','b', 100000, 512, 'sha512', ()=>{
    console.log('4:', Date.now() - start); //1688 ~ 1sec
})

crypto.pbkdf2('a','b', 100000, 512, 'sha512', ()=>{
    console.log('5:', Date.now() - start); //1688 ~ 1sec
})

// output

/*
2: 2175
1: 2189
4: 2200
3: 2214
(pause for a while)
5: 3184
*/

// crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)


/*
After apply process.env.UV_THREADPOOL_SIZE = 2;

1: 1072
2: 1098
<pause>
3: 2142
4: 2147
<pause>
5: 3227

*/

/*
process.env.UV_THREADPOOL_SIZE = 5;

<pause>
5: 2626
2: 2646
3: 2653
1: 2682
4: 2688

*/

/*

                    Macbook Air 2017
                    -----------------------------
                    | Core #1    |  Core #2      |   
                    -----------------------------
                            ^
                            |
                    ------------------------------
                    |   OS Thread Scheduler       |
                    -------------------------------
                                ^
                                |
                    -------------------------------------
                    |           Thread Pool             |
                    -------------------------------------
                    |Thread#1|Thread#2|Thread#3|Thread#4|
                    -------------------------------------
                        |         |        |        |
                    ---------------------------------------    
                    |PBKDF#1 | PBKDF#2 | PBKDF#3 | PBKDF#4|
                    ---------------------------------------

Here each PBKDF handle by each thread (with pause) and uses core #1 and core #2 as per Os thread Scheduler scheduled it.
*/
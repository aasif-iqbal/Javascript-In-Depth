import express from 'express';
let app = express();
let PORT = 3000;
// app.use();

app.get('/', (req, res) => {
    //5sec - wait for 5 sec
    doWork(5000);
    res.send('Health test');
    
    // open crome browser -> network
    // http://localhost:3000/  - tab 1 ,it takes 10ms open
    // http://localhost:3000/  - tab 2 ,it takes 66ms open
});

// blocking entire event-loop by doWork()
function doWork(duration){
    const start = Date.now();

    while(Date.now - start < duration){
        //simulation - to do single thread busy
    }
}

console.log(Date.now() / 1000);

app.listen(PORT,()=>{
    console.log(`app is listen on port:${PORT}`);
});
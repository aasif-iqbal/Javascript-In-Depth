// process.env.UV_THREADPOOL_SIZE = 1;

process.env.UV_THREADPOOL_SIZE = 5;

const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Http:", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

doRequest();

fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

/*
Http: 984  ?? why (becz all network request is directly access to OS)
Hash: 1150
Hash: 2134
Hash: 3112
Hash: 4155
FS: 4156
*/


/*

    Threadpool
|-------------------|
|     Fs Module     |
|-------------------|       


        OS
|-------------------|
|      HTTPS        |
|-------------------|

*/

/*
if we increase the size of UV_THREADPOOL_SIZE to 5

FS: 104
Http: 731
Hash: 2776
Hash: 2788
Hash: 2823
Hash: 2857
*/
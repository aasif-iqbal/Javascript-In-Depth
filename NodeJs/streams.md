## Streams

In Node.js, **streams** are objects that enable you to work with data incrementally and efficiently. They allow data to be processed in chunks rather than loading it all into memory, making them especially useful for handling large files or real-time data.

### Types of Streams in Node.js

1. **Readable Streams**: Used to read data from a source.
   - Example: Reading files, HTTP requests, or standard input.
   - Events: 
     - `data`: Emitted when a chunk of data is available.
     - `end`: Emitted when there is no more data to read.
     - `error`: Emitted in case of an error.

   ```javascript
   const fs = require('fs');
   const readableStream = fs.createReadStream('file.txt', { encoding: 'utf8' });

   readableStream.on('data', chunk => {
       console.log('Chunk:', chunk);
   });

   readableStream.on('end', () => {
       console.log('No more data.');
   });
   ```

2. **Writable Streams**: Used to write data to a destination.
   - Example: Writing to files, HTTP responses, or standard output.
   - Events:
     - `drain`: Emitted when the stream is ready for more data.
     - `finish`: Emitted when all data has been flushed.
     - `error`: Emitted in case of an error.

   ```javascript
   const writableStream = fs.createWriteStream('output.txt');

   writableStream.write('Hello, World!\n');
   writableStream.end('Finished writing.');
   ```

3. **Duplex Streams**: Both readable and writable (e.g., network sockets).
   - Example: `net.Socket` or implementing custom streams.

4. **Transform Streams**: A type of duplex stream that modifies the data as it is read and written.
   - Example: `zlib.createGzip()` for compressing data.

   ```javascript
   const { Transform } = require('stream');

   const transformStream = new Transform({
       transform(chunk, encoding, callback) {
           this.push(chunk.toString().toUpperCase());
           callback();
       }
   });

   process.stdin.pipe(transformStream).pipe(process.stdout);
   ```

### Why Use Streams?

- **Memory Efficiency**: Process data chunk-by-chunk rather than loading it all at once.
- **Time Efficiency**: Start processing data as it becomes available without waiting for the entire payload.
- **Flexibility**: Useful for handling large files, network operations, or real-time applications.

### Modes of Stream Operation

1. **Flowing Mode**: Data is read automatically and provided via events.
2. **Paused Mode**: Data is read explicitly using `.read()`.

Streams are a fundamental concept in Node.js, enabling high-performance and scalable applications by handling I/O efficiently.
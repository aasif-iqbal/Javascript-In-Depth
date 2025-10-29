## Child Process
In Node.js, a **child process** is a separate process created by a Node.js application (the parent process) to execute tasks independently. It allows Node.js to run external commands, scripts, or programs outside the main event loop, enabling parallel execution, CPU-intensive tasks, or interaction with system commands without blocking the main application.

Node.js provides the **`child_process`** module to create and manage child processes. There are four main methods to spawn child processes:

1. **`child_process.spawn(command[, args][, options])`**
   - Launches a new process with a given command and arguments.
   - Streams output (stdout/stderr) and input (stdin) for communication.
   - Suitable for long-running processes or handling large data streams.
   - Example:
     ```javascript
     const { spawn } = require('child_process');
     const ls = spawn('ls', ['-lh']);
     ls.stdout.on('data', (data) => console.log(`Output: ${data}`));
     ls.on('close', (code) => console.log(`Exited with code ${code}`));
     ```

2. **`child_process.exec(command[, options][, callback])`**
   - Runs a command in a shell and buffers the output.
   - Returns the complete output as a single chunk when the process ends.
   - Best for small outputs or simple commands.
   - Example:
     ```javascript
     const { exec } = require('child_process');
     exec('ls -lh', (err, stdout, stderr) => {
       if (err) console.error(`Error: ${err}`);
       console.log(`Output: ${stdout}`);
     });
     ```

3. **`child_process.execFile(file[, args][, options][, callback])`**
   - Similar to `exec`, but directly executes a file without a shell.
   - More efficient for running executable files.
   - Example:
     ```javascript
     const { execFile } = require('child_process');
     execFile('node', ['--version'], (err, stdout) => {
       console.log(`Node version: ${stdout}`);
     });
     ```

4. **`child_process.fork(modulePath[, args][, options])`**
   - A specialized version of `spawn` for running Node.js scripts.
   - Establishes a communication channel (IPC - Inter-Process Communication) between parent and child.
   - Ideal for running JavaScript modules in a separate process.
   - Example:
     ```javascript
     const { fork } = require('child_process');
     const child = fork('child.js');
     child.on('message', (msg) => console.log('Child says:', msg));
     child.send('Hello from parent!');
     ```

### Key Features of Child Processes
- **Isolation**: Child processes run independently, so crashes in a child process don’t affect the parent process.
- **Communication**: Parent and child can communicate via IPC (with `fork`) or streams (with `spawn`, `exec`, etc.).
- **Use Cases**:
  - Running shell commands (e.g., `ls`, `git`).
  - Executing CPU-heavy tasks (e.g., image processing, data crunching).
  - Running separate Node.js scripts or external programs.
- **Events**: Child processes emit events like `exit`, `error`, `close`, `message`, and `data` (for streams).
- **Resource Management**: Child processes consume system resources, so they must be managed carefully to avoid memory leaks or zombie processes.

### Example Scenario
Suppose you want to run a Python script from a Node.js application:
```javascript
const { spawn } = require('child_process');
const pythonProcess = spawn('python3', ['script.py']);
pythonProcess.stdout.on('data', (data) => console.log(`Python output: ${data}`));
pythonProcess.on('close', (code) => console.log(`Python process exited with code ${code}`));
```

### Notes
- Use `spawn` for streaming or large outputs, `exec` for small buffered outputs, and `fork` for Node.js scripts with IPC.
- Always handle errors and process exits to prevent unexpected behavior.
- Child processes are OS-dependent, so commands may differ across platforms (e.g., `ls` vs. `dir`).

For more details, check the [Node.js `child_process` documentation](https://nodejs.org/api/child_process.html).
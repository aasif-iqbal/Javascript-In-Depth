## 👶 What is a Child Process in Node.js?

In Node.js, a **child process** is a way to **run another script or command** in a **separate process** from the main Node.js process.

This helps in:

* Performing **CPU-intensive tasks**
* Running **shell commands**
* Keeping the main event loop **non-blocking**

Node uses the **`child_process` module** for this.

---

## 🔧 Why Use Child Processes?

* Node.js is **single-threaded**, so long-running or heavy tasks (like video processing or big calculations) can block the event loop.
* Child processes allow you to **offload heavy work** to another process while the main app keeps running smoothly.

---

## 🛠️ Ways to Create a Child Process

You can use these methods from `child_process`:

| Method  | Use Case                                         |
| ------- | ------------------------------------------------ |
| `exec`  | Run a shell command, buffer the output           |
| `spawn` | Run command with streams (good for large output) |
| `fork`  | Specifically for spawning new Node.js scripts    |

---

## ✅ Example 1: Using `exec` to run a shell command

```js
const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  console.log(`📄 Output:\n${stdout}`);
});
```

---

## ✅ Example 2: Using `fork` to run another Node.js script

**main.js**

```js
const { fork } = require('child_process');

const child = fork('./child.js');

child.on('message', (msg) => {
  console.log(`📩 Message from child: ${msg}`);
});

child.send('Hello Child!');
```

**child.js**

```js
process.on('message', (msg) => {
  console.log(`👶 Child received: ${msg}`);
  process.send('Hi Parent!');
});
```

---

## 🔁 Summary

* Child processes help run tasks **outside the main event loop**.
* Use them when:

  * Running **OS commands**
  * Doing **heavy CPU work**
  * Running another **Node script in isolation**

---

Would you like a real-world use case, like processing files or using ffmpeg via child process?

Great! Let’s go through a real-world use case where a child process is very helpful:

🧩 Using FFmpeg to convert a video via child process in Node.js.

Awesome! Let's build a **simple video conversion API** using **Node.js + Express + child process + FFmpeg**.

---

## 🧩 Project Structure

```
video-api/
├── index.js         # Express server
├── convert.js       # Video conversion logic
└── uploads/
    └── input.mp4    # Your test input video
```

---

## 📦 Step 1: Initialize project

```bash
mkdir video-api && cd video-api
npm init -y
npm install express multer
```

---

## 🧾 Step 2: `convert.js` – FFmpeg child process logic

```js
// convert.js
const { spawn } = require('child_process');
const path = require('path');

function convertVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-i', inputPath,
      '-c:v', 'libvpx',
      '-b:v', '1M',
      '-c:a', 'libvorbis',
      outputPath
    ]);

    ffmpeg.stderr.on('data', data => {
      console.log(`stderr: ${data}`);
    });

    ffmpeg.on('error', (err) => {
      reject(`❌ Failed to start ffmpeg: ${err.message}`);
    });

    ffmpeg.on('close', code => {
      if (code === 0) {
        resolve('✅ Conversion complete');
      } else {
        reject(`❌ FFmpeg exited with code ${code}`);
      }
    });
  });
}

module.exports = convertVideo;
```

---

## 🚀 Step 3: `index.js` – Express API

```js
// index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const convertVideo = require('./convert');

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No video uploaded.');
  }

  const inputPath = req.file.path;
  const outputPath = path.join('uploads', `${req.file.filename}.webm`);

  try {
    await convertVideo(inputPath, outputPath);
    res.download(outputPath, 'converted.webm', (err) => {
      // Clean up files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`🎬 Server running on http://localhost:${PORT}`);
});
```

---

## 📤 Step 4: Test It!

Use Postman or curl:

```bash
curl -X POST http://localhost:3000/convert \
  -F "video=@/path/to/your/video.mp4" \
  --output converted.webm
```

---

## ✅ Summary

* You're running FFmpeg in a child process to avoid blocking the event loop.
* Multer handles file upload.
* You serve the converted file directly as a response.

---

Would you like to improve this to:

* Queue multiple conversions?
* Show live progress?
* Upload to S3?

Let me know how far you want to go!

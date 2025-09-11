## There are multiple ways to implement an **expiring URL (valid only for 3 days)** in Node.js depending on your use case:

---

# ✅ Approaches to Expire a URL After 3 Days

## 1. **JWT Token–Based (Stateless Approach)**

Use a **signed token** in the URL that has an expiration (`exp` claim). After 3 days, the token becomes invalid automatically.

🔹 Example:

```js
import jwt from "jsonwebtoken";
import express from "express";

const app = express();
const SECRET_KEY = "mysecretkey";

// Generate URL with 3 days expiry
app.get("/generate-url", (req, res) => {
  const token = jwt.sign({ fileId: "12345" }, SECRET_KEY, { expiresIn: "3d" });
  const url = `http://localhost:3000/download?token=${token}`;
  res.send({ url });
});

// Validate URL
app.get("/download", (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.send(`File ID ${decoded.fileId} is downloaded!`);
  } catch (err) {
    res.status(401).send("Link expired or invalid");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

✅ Pros: No DB lookup needed, secure, automatic expiry.
⚠️ Cons: If you want **manual revocation** before 3 days, you’ll need blacklisting.

---

## 2. **Database Expiry (Stateful Approach)**

Store URLs in the database with an `expiryDate`. Each time someone accesses, check if it’s still valid.

🔹 Example with MongoDB & Mongoose:

```js
// url.model.js
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: String,
  expiryDate: Date
});

export default mongoose.model("Url", urlSchema);
```

```js
// usage
import Url from "./url.model.js";
import express from "express";
const app = express();

// Generate expiring URL
app.get("/generate-url", async (req, res) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 3);

  const newUrl = await Url.create({
    url: "http://localhost:3000/download/123",
    expiryDate
  });

  res.send({ url: newUrl.url, expiresAt: newUrl.expiryDate });
});

// Validate before use
app.get("/download/:id", async (req, res) => {
  const record = await Url.findOne({ url: `http://localhost:3000/download/${req.params.id}` });

  if (!record) return res.status(404).send("URL not found");
  if (record.expiryDate < new Date()) return res.status(401).send("URL expired");

  res.send("File downloaded successfully!");
});
```

✅ Pros: Easy to revoke URLs early.
⚠️ Cons: Requires DB queries for each request.

---

## 3. **Cloud Storage Pre-Signed URLs (Best for File Downloads)**

If you’re storing files in **AWS S3, GCP, or Azure**, use **pre-signed URLs**. They automatically expire after given time (e.g., 3 days).

🔹 Example with AWS S3:

```js
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-south-1"
});

// Generate pre-signed URL (expires in 3 days = 259200 seconds)
const params = {
  Bucket: "my-bucket",
  Key: "myfile.pdf",
  Expires: 259200
};

s3.getSignedUrl("getObject", params, (err, url) => {
  if (err) throw err;
  console.log("Presigned URL:", url);
});
```

✅ Pros: Super secure, no DB, storage handles expiry.
⚠️ Cons: Works only for file downloads/uploads.

---

# 🔑 Which one to use?

* For **temporary download links** (files) → **S3 pre-signed URL** is best.
* For **secure API endpoints** → **JWT with 3-day expiry** is best.
* For **custom app logic (revocable links)** → **DB expiry** is best.

---

👉 Do you want me to give you a **ready-to-use implementation** for your case (download link in your booking app), or just a **general-purpose API link expiration**?

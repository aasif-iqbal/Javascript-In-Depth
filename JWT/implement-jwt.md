## How to implement token blacklist with Rotate tokens frequently with refresh tokens.

Great question 👌 — this is one of the **most common JWT interview topics**: *How do you invalidate tokens if JWTs are stateless?*

Let’s go step by step.

---

## 🔑 Problem

JWTs are **stateless** → once issued, they cannot be revoked until they expire.
To solve this, companies use **token rotation** + **blacklisting**.

---

## ✅ Approach: Rotate tokens with refresh tokens + blacklist

### 1. **Use Access Token + Refresh Token**

* **Access token**: Short-lived (e.g., 15 min).
* **Refresh token**: Longer-lived (e.g., 7 days).
* Client uses refresh token to get a new access token when expired.

---

### 2. **Rotate Refresh Tokens**

* When user refreshes, issue a **new refresh token** and **invalidate the old one**.
* Store the valid refresh tokens in DB/Redis.
* If an attacker steals one, it becomes useless after first use.

---

### 3. **Blacklist Old Tokens**

* Keep a **Blacklist DB/Redis store** of revoked tokens.
* On every request → check if the token is in the blacklist before processing.
* Set TTL = token expiry so that Redis auto-cleans them.

---

## 🛠 Example Implementation (Node.js + Express + JWT + Redis)

### Step 1: Issue tokens

```js
import jwt from "jsonwebtoken";
import redis from "redis";

const redisClient = redis.createClient();

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

  // Store refresh token in Redis
  redisClient.set(userId.toString(), refreshToken);

  return { accessToken, refreshToken };
};
```

---

### Step 2: Verify & blacklist access token

```js
const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  // Check if blacklisted
  const isBlacklisted = await redisClient.get(`bl_${token}`);
  if (isBlacklisted) return res.status(403).json({ message: "Token blacklisted" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid/Expired token" });
  }
};
```

---

### Step 3: Rotate refresh token

```js
app.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Check if refresh token matches stored one
    const storedToken = await redisClient.get(decoded.userId.toString());
    if (storedToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token invalidated" });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefresh } = generateTokens(decoded.userId);

    // Replace old refresh token with new
    await redisClient.set(decoded.userId.toString(), newRefresh);

    res.json({ accessToken, refreshToken: newRefresh });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});
```

---

### Step 4: Logout (Blacklist token)

```js
app.post("/logout", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  // Blacklist the token
  const decoded = jwt.decode(token);
  const expiry = decoded.exp - Math.floor(Date.now() / 1000); // seconds left

  await redisClient.set(`bl_${token}`, "true", "EX", expiry);

  // Remove refresh token
  await redisClient.del(decoded.userId.toString());

  res.json({ message: "Logged out successfully" });
});
```

---

## ⚡ Key Benefits

1. **Short access tokens** → limits exposure.
2. **Rotating refresh tokens** → prevent reuse if stolen.
3. **Blacklist** → ensures immediate revocation of access tokens.

---

👉 This is **exactly the kind of system design interview question** companies ask around JWT.

Do you want me to also explain **how to handle token rotation failures** (like if user sends an already-used refresh token → possible attack detection)?

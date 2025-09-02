Good one 👍 — JWT (**JSON Web Token**) is very popular in **authentication & authorization**, so interviewers love asking about it.

Here’s a **complete list of JWT interview questions with answers** (from basic to advanced):

---

# 🔹 **Basic Questions**

### 1. What is JWT?

👉 A **compact, URL-safe token** used for securely transmitting information between parties as a JSON object.

---

### 2. What are the parts of a JWT?

A JWT has **3 parts**, separated by `.`:

1. **Header** – contains type of token (JWT) and signing algorithm.
2. **Payload** – contains claims (data).
3. **Signature** – verifies token integrity.

Example:

```
xxxxx.yyyyy.zzzzz
```

---

### 3. What are JWT claims?

👉 Claims are pieces of information stored in the payload.

* **Registered claims**: `iss` (issuer), `exp` (expiry), `sub` (subject), `aud` (audience).
* **Public claims**: custom claims with agreed meaning.
* **Private claims**: custom claims between parties.

---

### 4. How is JWT different from Session?

* **JWT**: stateless, stored on client, server just verifies signature.
* **Session**: stored on server, requires DB or memory lookup.

---

### 5. How is JWT stored on client?

* **LocalStorage** → persists even after page refresh (but vulnerable to XSS).
* **SessionStorage** → cleared on tab close.
* **HTTP-only cookies** → safer against XSS but need CSRF protection.

---

# 🔹 **Intermediate Questions**

### 6. How does JWT authentication work?

1. User logs in with credentials.
2. Server generates JWT (signed with secret/private key).
3. Token is sent to client (stored in localStorage/cookie).
4. For each request → client sends JWT in `Authorization: Bearer <token>`.
5. Server verifies token signature + expiry.
6. If valid → access granted.

---

### 7. What is the difference between **access token** and **refresh token**?

* **Access token** → short-lived, used for API requests.
* **Refresh token** → long-lived, used to generate new access tokens.

---

### 8. How do you secure JWT?

* Always use **HTTPS**.
* Set **short expiration times** for access tokens.
* Store refresh tokens securely (preferably HTTP-only cookies).
* Use **RS256 (asymmetric)** instead of HS256 (symmetric) for better security.
* Never store sensitive info (like passwords) in JWT payload.

---

### 9. What happens if JWT is stolen?

👉 If stolen, attacker can impersonate user until token expires.
✅ Solution → Use **short expiry** + **refresh tokens** + token revocation (blacklist).

---

### 10. Can JWT be invalidated before expiry?

By default, **no** (since it's stateless).
✅ Workarounds:

* Maintain a **blacklist** of revoked tokens.
* Use **token versioning** in DB and compare.
* Rotate tokens frequently with refresh tokens.

---

# 🔹 **Advanced Questions**

### 11. Difference between HS256 and RS256?

* **HS256 (HMAC-SHA256)** → uses a shared secret for both signing & verifying.
* **RS256 (RSA-SHA256)** → uses **private key** for signing & **public key** for verifying. Safer for distributed systems.

---

### 12. Why is JWT considered stateless?

👉 Server doesn’t store any session info. The token itself carries all necessary claims. Verification is done only via signature.

---

### 13. Can JWT be used for authorization as well as authentication?

* **Authentication** → proves identity (login).
* **Authorization** → carries roles/permissions inside payload (`role: admin`).

---

### 14. What are the risks of storing JWT in localStorage?

* Vulnerable to **XSS attacks** → attacker can steal token.
  ✅ Mitigation → Use **HTTP-only Secure Cookies**.

---

### 15. What is JWT expiration (`exp`) and why is it important?

* JWT contains an `exp` claim (epoch time).
* Prevents tokens from being valid forever → reduces risk if stolen.

---

### 16. When should you NOT use JWT?

* For short-lived, server-only sessions (traditional apps).
* When you need token revocation frequently.
* When payload becomes too large (JWTs are sent on every request).

---

🔥 Pro Interview Tip: If asked *“What are JWT limitations?”* → Answer with:

* Hard to revoke.
* Payload is visible (Base64 encoded, not encrypted).
* Can get large.
* Risky if stored improperly.

---

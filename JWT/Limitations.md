### 🔑 **Limitations of JWT**

1. **Token Revocation is Hard**

   * Once a JWT is issued, it’s valid until it expires.
   * If a user logs out or the token is compromised, you can’t easily invalidate it unless you use a **blacklist/whitelist** mechanism.

2. **Payload is Not Encrypted**

   * By default, JWT payload is only **Base64Url-encoded**, not encrypted.
   * Sensitive data inside JWT can be read by anyone who has the token.
   * You must avoid storing passwords or confidential info inside JWT.

3. **Token Size**

   * JWT can grow large (especially with many claims).
   * Unlike sessions (stored on server), JWT is sent on **every request** → larger network overhead.

4. **No Built-in Expiration Control**

   * You can set an `exp` claim, but once issued, it cannot be changed until a new token is generated.
   * This makes **token rotation** necessary for security.

5. **Statelessness Trade-off**

   * JWT is designed to be stateless (server doesn’t store session).
   * But if you need fine-grained control (e.g., instant logout for all devices), you must store tokens in DB (which kills some benefits of statelessness).

6. **Replay Attacks**

   * If an attacker steals a valid token, they can use it until it expires.
   * Mitigation: Use **short-lived access tokens + refresh tokens** with rotation.

7. **Complexity in Refresh Token Management**

   * Securely storing, rotating, and blacklisting refresh tokens adds complexity to system design.

---

### ⚡ Interview Tip

If asked in an interview:
👉 Say JWT is great for **stateless authentication** and scaling across distributed systems, but you must design carefully to handle **revocation, replay attacks, and sensitive data exposure**.

---

Do you want me to also give you a **scenario-based JWT interview question with solution** (like how to handle logout across multiple devices)?

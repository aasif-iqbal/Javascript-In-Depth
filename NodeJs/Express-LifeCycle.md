# Express App - LifeCycle

The **Express app life cycle** refers to the flow of how a request is handled from the moment it hits your server to the time a response is sent back to the client.

Let’s break it down clearly 👇

---

### 🔄 **Express App Request-Response Life Cycle**

```plaintext
Client → Request → Middleware(s) → Route Handler → Response → Client
```

---

### ✅ Step-by-Step Life Cycle

1. **🛰 Request Received**
   - A client (browser, app, etc.) sends a request to the Express server.
   - The request contains info like method (GET, POST), URL, headers, etc.

2. **🧱 Global Middleware Runs (if any)**
   - Express runs middleware functions in the order they are declared.
   - Examples: logging, parsing JSON, setting headers, authentication.

   ```js
   app.use(express.json());         // Built-in body parser
   app.use(cors());                 // Enable CORS
   app.use(logger());               // Custom middleware
   ```

3. **🎯 Route Matching**
   - Express checks if the request matches any defined route.
   - If matched, it passes the request to that route’s middleware and handler.

   ```js
   app.get('/api/users', (req, res) => {
     res.send("User list");
   });
   ```

4. **🔁 Route Middleware (optional)**
   - You can define middleware specific to certain routes (e.g. auth check).

   ```js
   app.get('/dashboard', checkAuth, (req, res) => {
     res.send("Welcome to dashboard");
   });
   ```

5. **📤 Response Sent**
   - Once the route handler finishes its job, it sends a response using:
     - `res.send()`
     - `res.json()`
     - `res.render()` (for views)
     - or `res.redirect()`

6. **🧼 Request Ends**
   - The response is sent back to the client, and the cycle ends.

---

### 💥 What if no route matches?

If no route matches:
- Express will skip to the **404 handler** or default to a generic 404.

```js
app.use((req, res) => {
  res.status(404).send("Route not found");
});
```

---

### 💣 What if an error happens?

You can define an **error-handling middleware**:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

---

### 🧠 Summary Diagram (Conceptually)

```plaintext
Client
  ↓
Express Server
  ↓
[Global Middleware]
  ↓
[Route Middleware]
  ↓
[Route Handler]
  ↓
[Response Sent]
  ↓
Client
```

---
Here’s a simple diagram to visualize the Express App Life Cycle:
```pgsql
          ┌────────────────────┐
          │  Client Request    │
          └────────┬───────────┘
                   │
                   ▼
         ┌────────────────────┐
         │  App-level Middleware │
         │  (e.g. Logging, CORS) │
         └────────┬───────────┘
                   │
                   ▼
        ┌────────────────────────┐
        │  Body Parser Middleware │
        │  (e.g. express.json()) │
        └────────┬──────────────┘
                   │
                   ▼
        ┌────────────────────┐
        │ Route Matching     │◄────────────┐
        └────────┬───────────┘             │
                   │                       │
                   ▼                       │
        ┌──────────────────────────────┐   │
        │ Route Middleware (optional) │   │
        │  (e.g. auth check)          │   │
        └────────┬────────────────────┘   │
                   │                       │
                   ▼                       │
        ┌──────────────────────────────┐   │
        │ Route Handler                │   │
        │ (Send response with res.*)   │   │
        └────────┬────────────────────┘   │
                   │                       │
                   ▼                       │
           ┌────────────────────┐          │
           │ Send Response      │──────────┘
           └────────────────────┘
                   │
                   ▼
          ┌────────────────────┐
          │  Request Ends      │
          └────────────────────┘

```

---
## Suppose we have api/v1/ and we are writing api/v2 for the same. there are some code writin in api/v1 that will need on api/v2 . Also we don't want to affect api/v1.and we add some code on api/v2. How do we write this.

To develop `api/v2` while reusing code from `api/v1` without affecting `api/v1` and adding new functionality to `api/v2`, you need a structured approach to code organization, versioning, and modularity. Below is a detailed guide on how to achieve this:

---

### 1. Understand the Requirements
- **Goal**: Create `api/v2` with some shared code from `api/v1`, ensure `api/v1` remains unaffected, and add new functionality to `api/v2`.
- **Constraints**:
  - `api/v1` must continue to function as is (backward compatibility).
  - Shared code should be reusable to avoid duplication.
  - New code for `api/v2` should be isolated to avoid impacting `api/v1`.

---

### 2. Organize the Codebase
To ensure modularity and reusability, structure the codebase to separate shared logic, version-specific logic, and routing.

#### Directory Structure
A typical structure for a versioned API might look like this:

```
project/
├── api/
│   ├── v1/
│   │   ├── controllers/    # v1-specific business logic
│   │   ├── routes/         # v1-specific routes
│   │   ├── models/         # v1-specific data models (if needed)
│   │   └── middleware/     # v1-specific middleware
│   ├── v2/
│   │   ├── controllers/    # v2-specific business logic
│   │   ├── routes/         # v2-specific routes
│   │   ├── models/         # v2-specific data models (if needed)
│   │   └── middleware/     # v2-specific middleware
│   ├── common/             # Shared code (utils, services, etc.)
│   │   ├── utils/          # Shared utilities
│   │   ├── services/       # Shared business logic
│   │   └── middleware/     # Shared middleware
├── config/                 # Configuration (e.g., database, environment)
├── tests/                  # Tests for v1 and v2
└── index.js                # Entry point
```

- **v1/**: Contains code specific to `api/v1`.
- **v2/**: Contains code specific to `api/v2`.
- **common/**: Contains shared utilities, services, or middleware reused by both versions.
- **config/**: Shared configuration (e.g., database connections).

---

### 3. Steps to Implement `api/v2`

#### Step 1: Identify Reusable Code in `api/v1`
- Review `api/v1` to identify code that can be reused (e.g., database queries, utility functions, authentication logic).
- Move reusable code to the `common/` directory. Examples:
  - Database access functions (e.g., `getUserById`, `updateRecord`).
  - Utility functions (e.g., `formatResponse`, `validateInput`).
  - Shared middleware (e.g., authentication, logging).

**Example (Node.js/Express)**:
```javascript
// common/services/userService.js
exports.getUserById = async (id) => {
  // Database query to fetch user
  return await db.users.findById(id);
};

// common/utils/formatResponse.js
exports.successResponse = (data, message = 'Success') => ({
  status: 'success',
  message,
  data,
});
```

#### Step 2: Set Up Routing for `api/v2`
- Create separate routes for `api/v2` to ensure it’s isolated from `api/v1`.
- Use a router to mount `api/v1` and `api/v2` on different paths.

**Example (Node.js/Express)**:
```javascript
// index.js
const express = require('express');
const v1Routes = require('./api/v1/routes');
const v2Routes = require('./api/v2/routes');

const app = express();

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.listen(3000, () => console.log('Server running on port 3000'));
```

- Define routes for `api/v2` in `api/v2/routes/index.js`:
```javascript
// api/v2/routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);

module.exports = router;
```

#### Step 3: Reuse Code from `common/` in `api/v2`
- In `api/v2` controllers, import shared code from the `common/` directory.
- Add new functionality specific to `api/v2`.

**Example**:
```javascript
// api/v2/controllers/userController.js
const { getUserById } = require('../../common/services/userService');
const { successResponse } = require('../../common/utils/formatResponse');

exports.getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    // v2-specific logic (e.g., add new fields to response)
    user.newField = 'v2-specific-data';
    res.json(successResponse(user));
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.createUser = async (req, res) => {
  // New v2-specific endpoint
  try {
    const user = await db.users.create(req.body);
    res.json(successResponse(user, 'User created in v2'));
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
```

#### Step 4: Ensure `api/v1` Remains Unaffected
- Do not modify `api/v1` code directly. Instead, rely on the shared `common/` code for any logic needed in both versions.
- If `api/v1` has hardcoded logic that needs to be reused, refactor it into the `common/` directory first.
- Test `api/v1` endpoints after changes to ensure no regressions.

#### Step 5: Add New Features to `api/v2`
- Implement new endpoints or logic in `api/v2` as needed.
- Example: If `api/v2` requires a new endpoint or modified response format, add it in `api/v2/controllers` or `api/v2/models`.

**Example**:
```javascript
// api/v2/controllers/newFeatureController.js
exports.newFeature = (req, res) => {
  // v2-specific feature
  res.json({ status: 'success', data: { feature: 'New v2 feature' } });
};
```

#### Step 6: Handle Version-Specific Models (if needed)
- If `api/v2` requires different data models (e.g., new fields in a database schema), create a separate model or extend the existing one with versioning logic.

**Example**:
```javascript
// api/v2/models/userModel.js
const baseUser = require('../../common/models/userModel');

exports.getUser = async (id) => {
  const user = await baseUser.findById(id);
  // Add v2-specific fields
  user.apiVersion = 'v2';
  return user;
};
```

#### Step 7: Testing
- Write tests for both `api/v1` and `api/v2` to ensure functionality.
- Use tools like Jest, Mocha, or Postman to test endpoints.
- Verify that `api/v1` endpoints return the same responses as before.
- Test new `api/v2` endpoints for correctness.

**Example (Jest)**:
```javascript
// tests/api.test.js
describe('API Tests', () => {
  test('GET /api/v1/users/:id', async () => {
    const response = await request(app).get('/api/v1/users/1');
    expect(response.status).toBe(200);
    expect(response.body.data).not.toHaveProperty('newField');
  });

  test('GET /api/v2/users/:id', async () => {
    const response = await request(app).get('/api/v2/users/1');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('newField', 'v2-specific-data');
  });
});
```

---

### 4. Best Practices
- **Versioning Strategy**:
  - Use URL versioning (`/api/v1`, `/api/v2`) as shown, or consider header-based versioning (e.g., `Accept: application/vnd.api+json; version=2.0`) for more flexibility.
- **Avoid Code Duplication**:
  - Refactor shared logic into `common/` to follow the DRY (Don’t Repeat Yourself) principle.
- **Documentation**:
  - Update API documentation (e.g., OpenAPI/Swagger) for `api/v2` to reflect new endpoints or changes.
- **Deprecation Plan**:
  - If `api/v1` will be phased out, include deprecation headers in responses (e.g., `Deprecation: true`, `Sunset: <date>`).
- **Error Handling**:
  - Use consistent error handling across both versions, ideally in `common/middleware/errorHandler.js`.
- **Environment Configuration**:
  - Store version-specific configurations (e.g., feature flags) in `config/` to toggle behavior if needed.

**Example Error Handler**:
```javascript
// common/middleware/errorHandler.js
exports.handleError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};
```

---

### 5. Example Full Implementation (Node.js/Express)
Here’s a minimal example tying it all together:

```javascript
// index.js
const express = require('express');
const v1Routes = require('./api/v1/routes');
const v2Routes = require('./api/v2/routes');

const app = express();
app.use(express.json());
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.listen(3000, () => console.log('Server running on port 3000'));

// common/services/userService.js
exports.getUserById = async (id) => {
  // Simulated DB call
  return { id, name: 'John Doe' };
};

// api/v1/controllers/userController.js
const { getUserById } = require('../../common/services/userService');

exports.getUser = async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json({ status: 'success', data: user });
};

// api/v2/controllers/userController.js
const { getUserById } = require('../../common/services/userService');

exports.getUser = async (req, res) => {
  const user = await getUserById(req.params.id);
  user.newField = 'v2-specific-data'; // v2-specific logic
  res.json({ status: 'success', data: user });
};

// api/v1/routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:id', userController.getUser);
module.exports = router;

// api/v2/routes/index.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:id', userController.getUser);
module.exports = router;
```

---

### 6. Handling API Evolution
- **Backward Compatibility**:
  - If `api/v2` changes the response format, ensure clients using `api/v1` are not impacted.
  - Use feature flags to toggle new behavior in `api/v2`.
- **Database Considerations**:
  - If `api/v2` requires new fields, ensure the database schema supports both versions (e.g., nullable fields for `api/v1` compatibility).
- **Monitoring**:
  - Monitor usage of both `api/v1` and `api/v2` to plan for eventual deprecation of `api/v1`.

---

### 7. Additional Considerations
- **Performance**: Ensure shared code in `common/` is optimized, as it’s used by both versions.
- **Security**: Apply the same security practices (e.g., input validation, authentication) to both versions, ideally in shared middleware.
- **Scalability**: If `api/v2` introduces heavy new features, test performance impacts and consider microservices if the codebase grows significantly.

---

### 8. If You Need More Specificity
- **Programming Language**: The example uses Node.js/Express, but let me know if you’re using another framework (e.g., Django, Spring, Laravel) for tailored guidance.
- **Specific Code to Reuse**: If you can share details about the code in `api/v1` you want to reuse, I can provide more targeted examples.
- **New Features**: If you specify the new functionality for `api/v2`, I can suggest exact implementations.

Would you like me to elaborate on any part (e.g., a specific language/framework, database integration, or testing setup)?

=========================================================

From ChatGPT
Excellent and very practical question 👏 — this is exactly what **API versioning and code reusability** are about.

Let’s break it down step by step 👇

---

## 🧩 Scenario

You currently have:

```
/api/v1/
```

and now you’re building:

```
/api/v2/
```

You want:

* ✅ To reuse **some logic/code from v1** (no duplication)
* ✅ To **not break v1** when changing or adding features in v2
* ✅ To keep the code **clean, modular, and maintainable**

---

## 🏗️ Best Practice: Use a Modular Folder Structure

Organize your project like this:

```
src/
 ├── routes/
 │    ├── v1/
 │    │    ├── user.routes.js
 │    │    └── product.routes.js
 │    ├── v2/
 │    │    ├── user.routes.js
 │    │    └── product.routes.js
 │
 ├── controllers/
 │    ├── user.controller.js        <-- Shared logic
 │    ├── product.controller.js     <-- Shared logic
 │    ├── v2/
 │    │    ├── user.controller.js   <-- Extended logic
 │    │    └── product.controller.js
 │
 ├── services/
 │    ├── user.service.js           <-- Core reusable business logic
 │    ├── product.service.js
 │
 ├── app.js
```

---

## 🧠 How It Works

### 1️⃣ Common Logic Lives in **Services**

Create reusable logic once and use it across versions.

```js
// services/user.service.js
export const getUserById = async (id) => {
  return { id, name: "John Doe" };
};
```

---

### 2️⃣ API v1 Controller Uses the Service

```js
// controllers/user.controller.js
import { getUserById } from '../services/user.service.js';

export const getUserV1 = async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json({ version: "v1", user });
};
```

---

### 3️⃣ API v2 Extends or Overrides Logic

If most logic is same, import from v1 and modify only needed parts.

```js
// controllers/v2/user.controller.js
import { getUserById } from '../../services/user.service.js';

export const getUserV2 = async (req, res) => {
  const user = await getUserById(req.params.id);
  // Add new fields or modify response for v2
  user.newField = "extra data for v2";
  res.json({ version: "v2", user });
};
```

---

### 4️⃣ Define Versioned Routes

```js
// routes/v1/user.routes.js
import express from "express";
import { getUserV1 } from "../../controllers/user.controller.js";

const router = express.Router();
router.get("/users/:id", getUserV1);
export default router;
```

```js
// routes/v2/user.routes.js
import express from "express";
import { getUserV2 } from "../../controllers/v2/user.controller.js";

const router = express.Router();
router.get("/users/:id", getUserV2);
export default router;
```

---

### 5️⃣ Mount in `app.js`

```js
import express from "express";
import userRoutesV1 from "./routes/v1/user.routes.js";
import userRoutesV2 from "./routes/v2/user.routes.js";

const app = express();

// Versioned base paths
app.use("/api/v1", userRoutesV1);
app.use("/api/v2", userRoutesV2);

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 🧱 Benefits of This Approach

✅ **No breaking changes** — v1 stays untouched.
✅ **Shared code** — services are reused.
✅ **Future proof** — you can easily add `/api/v3`.
✅ **Clean separation** — each version has its own routes/controllers.

---

## ⚡ Bonus Tip — Inheritance-Like Reuse

If v2 needs to reuse most of v1 but just tweak a few lines:

```js
// controllers/v2/user.controller.js
import * as v1UserController from '../user.controller.js';

export const getUserV2 = async (req, res) => {
  const response = await v1UserController.getUserV1(req, res);
  // modify response if needed
};
```

---

Here's a **complete CRUD REST API** in **Node.js + Express** with **MongoDB**, including:

- Full CRUD operations
- Mongoose models
- Express routes & controllers
- Validation
- Error handling
- **Unit tests** (using Jest + Supertest)
- **Integration tests**
- Docker support (optional)

---

## Project Structure

```
crud-api/
├── src/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── user.routes.js
│   ├── controllers/
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── config/
│   │   └── db.js
│   └── app.js
├── tests/
│   ├── unit/
│   │   └── user.controller.test.js
│   └── integration/
│   │   └── user.routes.test.js
├── .env
├── .gitignore
├── jest.config.js
├── package.json
└── server.js
```

---

## 1. `package.json`

```json
{
  "name": "crud-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --watch",
    "test:ci": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "nodemon": "^3.0.1"
  }
}
```

Run:
```bash
npm install
```

---

## 2. `.env`

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crud-api-test
NODE_ENV=development
```

> Use `crud-api-test` DB for testing.

---

## 3. `src/config/db.js`

```js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 4. `src/models/User.js`

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

---

## 5. `src/controllers/user.controller.js`

```js
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create user
// @route   POST /api/users
const createUser = async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    const user = new User({ name, email, age });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age !== undefined ? age : user.age;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
```

---

## 6. `src/routes/user.routes.js`

```js
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
```

---

## 7. `src/middleware/errorHandler.js`

```js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
```

---

## 8. `src/app.js`

```js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CRUD API is running!' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
```

---

## 9. `server.js`

```js
const app = require('./src/app');
const connectDB = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
```

---

## 10. `jest.config.js`

```js
module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
};
```

---

## 11. `tests/setup.js`

```js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  process.env.MONGODB_URI = uri;

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
```

> Install `mongodb-memory-server` for in-memory DB:
```bash
npm install --save-dev mongodb-memory-server
```

---

## 12. **Unit Test** – `tests/unit/user.controller.test.js`

```js
const { createUser } = require('../../src/controllers/user.controller');
const User = require('../../src/models/User');

jest.mock('../../src/models/User');

describe('User Controller - Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('should create a user successfully', async () => {
    req.body = { name: 'John', email: 'john@example.com', age: 30 };
    const mockUser = { ...req.body, _id: '123' };
    User.prototype.save = jest.fn().mockResolvedValue(mockUser);

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 400 if name or email missing', async () => {
    req.body = { name: 'John' };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Name and email are required' });
  });
});
```

---

## 13. **Integration Test** – `tests/integration/user.routes.test.js`

```js
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/User');

describe('User API - Integration Tests', () => {
  let userId;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com', age: 25 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Alice');
    userId = res.body._id;
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get user by id', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('alice@example.com');
  });

  it('should update user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Alice Updated', age: 26 });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alice Updated');
  });

  it('should delete user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User removed');
  });

  it('should return 404 for non-existing user', async () => {
    const res = await request(app).get('/api/users/507f1f77bcf86cd799439011');
    expect(res.statusCode).toBe(404);
  });
});
```

---

## Run Tests

```bash
# Unit + Integration
npm test

# Watch mode
npm run test
```

---

## API Endpoints

| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| GET    | `/api/users`      | Get all users         |
| POST   | `/api/users`      | Create user           |
| GET    | `/api/users/:id`  | Get user by ID        |
| PUT    | `/api/users/:id`  | Update user           |
| DELETE | `/api/users/:id`  | Delete user           |

---

## Optional: Docker

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```docker-compose
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/crud-api
    depends_on:
      - mongo
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
```

---

## Summary

You now have:

- Clean, modular CRUD API
- Input validation & error handling
- Unit tests (mocked DB)
- Integration tests (real DB in memory)
- Ready for production or CI/CD

Let me know if you want:
- Authentication (JWT)
- Pagination
- Swagger docs
- TypeScript version
- Deployment to Vercel/AWS

Happy coding!
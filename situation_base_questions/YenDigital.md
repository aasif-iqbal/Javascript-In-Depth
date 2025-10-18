## If i have service like order service and payment service. and i want to build a system like after adding orders in cart we need to place an order then do payment if payment fails(due to slow network or any thing) make sure it rollback properly. how to do this - tech nodejs.

To build a system with an **Order Service** and **Payment Service** in Node.js, where orders are placed after adding items to a cart and payments are processed with proper rollback in case of failure, you need to implement a **transactional workflow**. This ensures that if the payment fails (e.g., due to a slow network or other issues), the system rolls back the order to maintain consistency. Below is a detailed guide to achieve this using Node.js, focusing on best practices like distributed transactions, saga patterns, and proper error handling.

### System Overview
- **Order Service**: Manages cart operations (add items to cart) and order placement.
- **Payment Service**: Handles payment processing (e.g., via a third-party payment gateway like Stripe).
- **Goal**: Ensure that order placement and payment are atomic. If payment fails, the order is rolled back (canceled or marked as failed).
- **Tech Stack**: Node.js, Express for APIs, a database (e.g., MongoDB or PostgreSQL), and a message queue (e.g., RabbitMQ or Kafka) for handling asynchronous communication if needed.

### Approach: Saga Pattern for Distributed Transactions
Since the system involves multiple services (Order and Payment), a **monolithic transaction** spanning both services is impractical due to distributed systems' nature. Instead, use the **Saga pattern** (specifically, a **choreographed saga** or **orchestrated saga**) to coordinate the workflow. Each service performs its local transaction and communicates via events or an orchestrator. If a step fails, compensating transactions (rollbacks) are triggered.

Here’s how to implement this:

---

### Step-by-Step Implementation

#### 1. **Define the Workflow**
The workflow for placing an order and processing payment:
1. User adds items to the cart (Order Service).
2. User initiates "Place Order" (Order Service creates a pending order).
3. Order Service requests Payment Service to process payment.
4. If payment succeeds, the order is confirmed.
5. If payment fails, the order is rolled back (canceled or marked as failed).

#### 2. **Tech Stack and Dependencies**
- **Node.js**: Use Express for REST APIs.
- **Database**: MongoDB (or PostgreSQL) for storing orders and cart data.
- **Message Queue (Optional)**: RabbitMQ or Kafka for event-driven communication between services.
- **Payment Gateway**: Stripe (or similar) for payment processing.
- **Libraries**:
  - `express`: For building APIs.
  - `mongoose` (for MongoDB) or `sequelize` (for PostgreSQL).
  - `amqplib` (for RabbitMQ) or `kafkajs` (for Kafka).
  - `stripe`: For payment processing.
  - `axios` or `node-fetch`: For HTTP communication between services.

Install dependencies:
```bash
npm install express mongoose amqplib stripe axios
```

#### 3. **Database Schema**
For simplicity, assume MongoDB is used.

**Order Schema (Order Service)**:
```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [{ productId: String, quantity: Number, price: Number }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed', 'canceled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
```

**Cart Schema (Order Service)**:
```javascript
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [{ productId: String, quantity: Number, price: Number }],
  updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);
```

**Payment Schema (Payment Service)**:
```javascript
const paymentSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  transactionId: String, // From payment gateway
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);
```

#### 4. **Order Service Implementation**
The Order Service handles cart management and order placement. It communicates with the Payment Service to process payments and triggers rollbacks if needed.

**Order Service (order-service.js)**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/order-service', { useNewUrlParser: true, useUnifiedTopology: true });

// Add item to cart
app.post('/cart/add', async (req, res) => {
  const { userId, productId, quantity, price } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  cart.items.push({ productId, quantity, price });
  cart.updatedAt = Date.now();
  await cart.save();
  res.status(200).json(cart);
});

// Place order and initiate payment
app.post('/order/place', async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Create pending order
    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      status: 'pending',
    });
    await order.save();

    // Call Payment Service
    try {
      const paymentResponse = await axios.post('http://localhost:3001/payment/process', {
        orderId: order._id,
        userId,
        amount: totalAmount,
      });

      if (paymentResponse.data.status === 'completed') {
        // Update order status to confirmed
        order.status = 'confirmed';
        await order.save();
        // Clear cart
        await Cart.deleteOne({ userId });
        return res.status(200).json({ order, message: 'Order placed successfully' });
      } else {
        // Payment failed, rollback order
        order.status = 'failed';
        await order.save();
        return res.status(400).json({ error: 'Payment failed', order });
      }
    } catch (paymentError) {
      // Handle payment service failure (e.g., network issue)
      order.status = 'failed';
      await order.save();
      return res.status(500).json({ error: 'Payment service error', details: paymentError.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Order placement failed', details: error.message });
  }
});

app.listen(3000, () => console.log('Order Service running on port 3000'));
```

#### 5. **Payment Service Implementation**
The Payment Service processes payments using a third-party gateway (e.g., Stripe) and handles success or failure scenarios.

**Payment Service (payment-service.js)**:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const stripe = require('stripe')('your_stripe_secret_key');
const Payment = require('./models/Payment');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/payment-service', { useNewUrlParser: true, useUnifiedTopology: true });

// Process payment
app.post('/payment/process', async (req, res) => {
  const { orderId, userId, amount } = req.body;

  try {
    // Create payment record
    const payment = new Payment({
      orderId,
      userId,
      amount,
      status: 'pending',
    });

    // Process payment with Stripe
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe expects amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
        confirm: true,
        payment_method: 'pm_card_visa', // Use a test card for simulation
      });

      // Update payment record
      payment.status = 'completed';
      payment.transactionId = paymentIntent.id;
      await payment.save();

      return res.status(200).json({ status: 'completed', payment });
    } catch (stripeError) {
      // Payment failed
      payment.status = 'failed';
      await payment.save();
      return res.status(400).json({ status: 'failed', error: stripeError.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed', details: error.message });
  }
});

app.listen(3001, () => console.log('Payment Service running on port 3001'));
```

#### 6. **Rollback Mechanism**
The rollback is handled in the Order Service:
- When the Payment Service returns a failure (e.g., `status: 'failed'` or an HTTP error), the Order Service updates the order status to `'failed'`.
- The cart is only cleared if the payment succeeds, ensuring the user can retry the order without losing their cart items.
- If you want to delete the failed order instead of marking it as `'failed'`, you can replace `order.status = 'failed'` with `await Order.deleteOne({ _id: order._id })`.

#### 7. **Using a Saga Orchestrator (Optional)**
For better scalability, use a **Saga Orchestrator** to manage the workflow. The orchestrator coordinates the steps and triggers compensating transactions if needed.

**Orchestrator Service (saga-orchestrator.js)**:
```javascript
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Saga to place order and process payment
app.post('/saga/place-order', async (req, res) => {
  const { userId } = req.body;

  try {
    // Step 1: Create order
    const orderResponse = await axios.post('http://localhost:3000/order/create', { userId });
    const order = orderResponse.data;

    try {
      // Step 2: Process payment
      const paymentResponse = await axios.post('http://localhost:3001/payment/process', {
        orderId: order._id,
        userId,
        amount: order.totalAmount,
      });

      if (paymentResponse.data.status === 'completed') {
        // Step 3: Confirm order
        await axios.post('http://localhost:3000/order/confirm', { orderId: order._id });
        return res.status(200).json({ message: 'Order placed successfully', order });
      } else {
        // Step 4: Rollback order
        await axios.post('http://localhost:3000/order/cancel', { orderId: order._id });
        return res.status(400).json({ error: 'Payment failed', order });
      }
    } catch (paymentError) {
      // Rollback order on payment failure
      await axios.post('http://localhost:3000/order/cancel', { orderId: order._id });
      return res.status(500).json({ error: 'Payment service error', details: paymentError.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Saga failed', details: error.message });
  }
});

app.listen(3002, () => console.log('Saga Orchestrator running on port 3002'));
```

**Update Order Service**:
Add endpoints for creating and canceling orders:
```javascript
// Create order (called by orchestrator)
app.post('/order/create', async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  const totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const order = new Order({ userId, items: cart.items, totalAmount, status: 'pending' });
  await order.save();
  res.status(200).json(order);
});

// Confirm order
app.post('/order/confirm', async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'confirmed';
  await order.save();
  await Cart.deleteOne({ userId: order.userId });
  res.status(200).json(order);
});

// Cancel order (rollback)
app.post('/order/cancel', async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'canceled';
  await order.save();
  res.status(200).json(order);
});
```

#### 8. **Handling Slow Networks or Timeouts**
To handle slow networks or timeouts:
- **Set timeouts** for HTTP requests using `axios`:
  ```javascript
  const paymentResponse = await axios.post('http://localhost:3001/payment/process', {
    orderId: order._id,
    userId,
    amount: totalAmount,
  }, { timeout: 10000 }); // 10-second timeout
  ```
- **Retry mechanism**: Use a library like `async-retry` to retry failed payment requests:
  ```javascript
  const retry = require('async-retry');

  await retry(
    async () => {
      return axios.post('http://localhost:3001/payment/process', { orderId, userId, amount });
    },
    {
      retries: 3,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 5000,
    }
  );
  ```
- **Idempotency**: Ensure payment requests are idempotent by including an `idempotencyKey` in the Payment Service (Stripe supports this natively).

#### 9. **Event-Driven Approach (Alternative)**
Instead of HTTP calls, use a message queue like RabbitMQ for asynchronous communication:
- Order Service publishes an `OrderCreated` event.
- Payment Service subscribes to `OrderCreated`, processes payment, and publishes `PaymentCompleted` or `PaymentFailed`.
- Order Service subscribes to these events to confirm or cancel the order.

**Example with RabbitMQ**:
```javascript
const amqp = require('amqplib');

async function publishEvent(queue, message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  await channel.close();
  await connection.close();
}

async function consumeEvent(queue, callback) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.consume(queue, (msg) => {
    const message = JSON.parse(msg.content.toString());
    callback(message);
    channel.ack(msg);
  });
}

// In Order Service: Publish OrderCreated event
await publishEvent('order-created', { orderId, userId, totalAmount });

// In Payment Service: Consume OrderCreated and publish PaymentCompleted/Failed
consumeEvent('order-created', async (message) => {
  const { orderId, userId, amount } = message;
  // Process payment and publish result
  const payment = new Payment({ orderId, userId, amount, status: 'completed' });
  await payment.save();
  await publishEvent('payment-completed', { orderId, status: 'completed' });
});
```

#### 10. **Testing the System**
- **Test Success Case**:
  1. Add items to cart (`POST /cart/add`).
  2. Place order (`POST /order/place` or `/saga/place-order`).
  3. Verify order status is `'confirmed'` and cart is cleared.
- **Test Failure Case**:
  1. Simulate payment failure (e.g., use an invalid card in Stripe).
  2. Verify order status is `'failed'` or `'canceled'` and cart remains intact.
- **Test Network Failure**:
  1. Stop the Payment Service and place an order.
  2. Verify order status is `'failed'` and cart remains intact.

#### 11. **Best Practices**
- **Idempotency**: Ensure all API calls (especially payment) are idempotent to handle retries safely.
- **Logging**: Use a logging library (e.g., `winston`) to log all events and errors for debugging.
- **Monitoring**: Use tools like Prometheus and Grafana to monitor service health and transaction success rates.
- **Database Transactions**: If using a relational database like PostgreSQL, use transactions for local operations (e.g., creating an order).
- **Timeouts and Retries**: Implement timeouts and retries for external calls to handle network issues.
- **Eventual Consistency**: Accept that distributed systems may have eventual consistency. Ensure the user interface reflects the order status accurately.

#### 12. **Scaling Considerations**
- **Horizontal Scaling**: Deploy multiple instances of Order and Payment Services behind a load balancer.
- **Message Queue**: Use RabbitMQ or Kafka for reliable event delivery in high-traffic scenarios.
- **Database Sharding**: Shard MongoDB or PostgreSQL if data volume grows significantly.
- **Circuit Breaker**: Use a library like `opossum` to prevent cascading failures in case the Payment Service is down.

---

### Example API Flow
1. **Add to Cart**:
   ```bash
   curl -X POST http://localhost:3000/cart/add -H "Content-Type: application/json" -d '{"userId":"user123","productId":"prod1","quantity":2,"price":50}'
   ```
2. **Place Order**:
   ```bash
   curl -X POST http://localhost:3000/order/place -H "Content-Type: application/json" -d '{"userId":"user123"}'
   ```
3. **Orchestrated Saga (if used)**:
   ```bash
   curl -X POST http://localhost:3002/saga/place-order -H "Content-Type: application/json" -d '{"userId":"user123"}'
   ```

---

### Notes
- **Stripe Testing**: Use Stripe’s test cards (e.g., `4242 4242 4242 4242` for success, `4000 0000 0000 9995` for failure) to simulate payment scenarios.
- **Error Handling**: Always catch and handle errors at each step to avoid partial failures.
- **Security**: Secure APIs with authentication (e.g., JWT) and validate all inputs.
- **Environment Variables**: Store sensitive data like Stripe keys in environment variables using `dotenv`.

This implementation ensures that if the payment fails due to a slow network or other issues, the order is properly rolled back, and the system remains consistent. Let me know if you need further clarification or additional features like retry policies or advanced saga patterns!
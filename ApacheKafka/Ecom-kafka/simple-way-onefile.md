Perfect scenario — this is a **classic microservices pattern** using **Apache Kafka** for event-driven communication between services.

Let’s implement a **simple working version** in **Node.js (JavaScript)** using **KafkaJS**.

---

## 🧩 Project Setup

You’ll have **two services**:

* **Order Service**
* **Inventory Service**

Both will connect to the same Kafka broker and communicate asynchronously.

---

### 🧠 Prerequisites

1. **Kafka running (locally or via Docker)**

   ```bash
   docker-compose up -d
   ```

   Use this simple `docker-compose.yml`:

   ```yaml
   version: '3'
   services:
     zookeeper:
       image: bitnami/zookeeper:latest
       environment:
         - ALLOW_ANONYMOUS_LOGIN=yes
       ports:
         - 2181:2181

     kafka:
       image: bitnami/kafka:latest
       environment:
         - KAFKA_BROKER_ID=1
         - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
         - ALLOW_PLAINTEXT_LISTENER=yes
         - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
       ports:
         - 9092:9092
   ```

2. **Install dependencies** in both services:

   ```bash
   npm install kafkajs express uuid
   ```

---

## ⚙️ 1. Order Service (`orderService.js`)

This service:

* Receives new orders (`POST /orders`)
* Publishes `OrderCreated` events
* Listens for `InventoryUpdated` events

```js
// orderService.js
import express from "express";
import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

// Kafka setup
const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "order-service-group" });

const orders = new Map(); // In-memory order DB

// Produce order-created event
app.post("/orders", async (req, res) => {
  const { items } = req.body;
  const orderId = uuidv4();
  const order = { orderId, items, status: "PENDING" };

  orders.set(orderId, order);
  console.log(`✅ Order created: ${orderId}`);

  await producer.send({
    topic: "orders-topic",
    messages: [{ key: orderId, value: JSON.stringify(order) }],
  });

  res.status(201).json({ message: "Order created", orderId });
});

// Consume inventory updates
const consumeInventoryUpdates = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "inventory-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { orderId, status } = JSON.parse(message.value.toString());
      const order = orders.get(orderId);

      if (order) {
        order.status = status;
        console.log(`📦 Order ${orderId} updated → ${status}`);
      }
    },
  });
};

// Initialize producer & consumer
const start = async () => {
  await producer.connect();
  consumeInventoryUpdates();
  app.listen(4000, () => console.log("🚀 Order Service running on port 4000"));
};

start();
```

---

## ⚙️ 2. Inventory Service (`inventoryService.js`)

This service:

* Subscribes to `orders-topic`
* Deducts stock if available
* Publishes `InventoryUpdated` event

```js
// inventoryService.js
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "inventory-service-group" });
const producer = kafka.producer();

// Simulated inventory stock
const inventory = {
  laptop: 5,
  phone: 3,
  charger: 10,
};

const processOrder = async (order) => {
  let isAvailable = true;

  for (const item of order.items) {
    if (!inventory[item] || inventory[item] <= 0) {
      isAvailable = false;
      break;
    }
  }

  if (isAvailable) {
    order.items.forEach((item) => (inventory[item] -= 1));
    console.log(`✅ Inventory updated for order ${order.orderId}`);
    return { orderId: order.orderId, status: "CONFIRMED" };
  } else {
    console.log(`❌ Out of stock for order ${order.orderId}`);
    return { orderId: order.orderId, status: "OUT_OF_STOCK" };
  }
};

const consumeOrders = async () => {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: "orders-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      const result = await processOrder(order);

      // Publish inventory update event
      await producer.send({
        topic: "inventory-topic",
        messages: [{ key: order.orderId, value: JSON.stringify(result) }],
      });
    },
  });
};

consumeOrders();
console.log("🚀 Inventory Service running...");
```

---

## 🧪 3. Test the Flow

1. Run both services:

   ```bash
   node orderService.js
   node inventoryService.js
   ```

2. Create an order using **Postman or curl**:

   ```bash
   curl -X POST http://localhost:4000/orders \
   -H "Content-Type: application/json" \
   -d '{"items":["laptop","phone"]}'
   ```

✅ You should see logs like:

```
[Order Service]
✅ Order created: 93f2b...
📦 Order 93f2b... updated → CONFIRMED

[Inventory Service]
✅ Inventory updated for order 93f2b...
```

---

## 🧠 Key Takeaways

| Concept                        | Description                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kafka Topics**               | Decouple services; each service only listens to relevant events.                                                                                  |
| **Producers & Consumers**      | Order Service (producer of orders-topic, consumer of inventory-topic); Inventory Service (consumer of orders-topic, producer of inventory-topic). |
| **Event-driven Communication** | Services communicate asynchronously without direct API calls.                                                                                     |
| **Scalability**                | Multiple consumers in the same group can process messages in parallel.                                                                            |

---

Would you like me to extend this with **error handling and retry mechanism** (e.g., using Kafka dead-letter queues)?

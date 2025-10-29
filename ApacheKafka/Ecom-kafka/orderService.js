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

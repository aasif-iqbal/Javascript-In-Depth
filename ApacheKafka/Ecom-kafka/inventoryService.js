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

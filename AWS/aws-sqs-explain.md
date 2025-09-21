AWS **SQS (Simple Queue Service)** is a **fully managed message queuing service** provided by AWS.
It allows you to **decouple and scale** microservices, distributed systems, and serverless applications by passing messages through a reliable queue.

---

## 📝 **Key Points About AWS SQS**

* **Message Queue** – Stores messages until they are processed and deleted by consumers.
* **Decoupling** – Producers (senders) and consumers (receivers) don’t need to communicate directly.
* **Fully Managed** – AWS automatically scales, handles availability, and guarantees at-least-once delivery.
* **Durable & Reliable** – Messages are redundantly stored across multiple availability zones.
* **Visibility Timeout** – Prevents multiple consumers from processing the same message at the same time.

---

## 🛠 **How SQS Works**

1. **Producer** sends a message to an SQS queue.
2. Message stays in the queue until a **consumer** picks it up.
3. Consumer processes the message.
4. Message is deleted from the queue after successful processing.

---

## 📌 **Types of Queues**

1. **Standard Queue** (default)

   * Nearly unlimited throughput.
   * Messages may be delivered more than once (at-least-once delivery).
   * Order of messages is not guaranteed.

2. **FIFO Queue** (First-In-First-Out)

   * Guarantees exactly-once processing.
   * Maintains the order in which messages are sent.
   * Slightly lower throughput than standard queues.

---

## 🔗 **Example**

Imagine a video processing app:

* User uploads a video → Your app sends a message to SQS.
* Multiple worker services pick up messages from the queue and process them (convert to different resolutions, generate thumbnails).
* If one worker fails, the message stays in the queue until another worker processes it.

---

## ✅ **SQS vs SNS**

| Feature          | SNS (Pub/Sub)            | SQS (Queue)            |
| ---------------- | ------------------------ | ---------------------- |
| Message Delivery | Push to subscribers      | Pull by consumers      |
| Use Case         | Broadcast events to many | Process tasks reliably |
| Order Guarantee  | Not guaranteed           | FIFO queue guarantees  |

---

Would you like me to show you a **Node.js/TypeScript example** of sending a message to an SQS queue and then consuming it (reading + deleting)?
This is a very common **interview scenario** and **real-world use case**.

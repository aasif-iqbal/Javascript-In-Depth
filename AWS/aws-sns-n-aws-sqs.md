# **AWS SNS (Simple Notification Service)**

AWS **SNS (Simple Notification Service)** is a **fully managed pub/sub (publish-subscribe) messaging service** that enables you to send messages or notifications to multiple subscribers simultaneously.

#### **Key Features:**
- **Pub/Sub Model:** Allows applications to publish messages to **topics**, and multiple **subscribers** (e.g., SQS queues, Lambda functions, HTTP/S endpoints, or email) receive them.
- **Multiple Delivery Methods:** Supports **SMS, email, mobile push notifications, HTTP(S), Lambda, and SQS**.
- **Message Filtering:** Subscribers can filter messages based on attributes to receive only relevant messages.
- **Fan-out Architecture:** A single published message can be delivered to multiple subscribers at once.
- **Durability & Scalability:** Fully managed and scales automatically.

#### **Use Cases:**
- Sending **push notifications** (e.g., mobile app alerts).
- Distributing **event-driven notifications** (e.g., AWS Lambda processing events).
- **Decoupling microservices** by allowing one service to publish messages while multiple services consume them.

---

# **AWS SQS (Simple Queue Service)**

AWS **SQS (Simple Queue Service)** is a **fully managed message queue service** that enables asynchronous communication between distributed systems by **decoupling** components.

#### **Key Features:**
- **Message Queueing:** Stores messages until they are processed by consumers.
- **Two Types of Queues:**
  - **Standard Queue:** At-least-once delivery, best-effort ordering.
  - **FIFO Queue:** Exactly-once processing, strict ordering.
- **Scalability:** Automatically scales to handle high message loads.
- **Dead Letter Queue (DLQ):** Handles unprocessed messages to avoid data loss.

#### **Use Cases:**
- **Decoupling microservices** (e.g., API requests queued for later processing).
- **Task processing pipelines** (e.g., video encoding jobs).
- **Load balancing between services** (e.g., distributing tasks to worker nodes).

---

### **SNS vs. SQS: When to Use What?**
| Feature | SNS (Pub/Sub) | SQS (Queue) |
|---------|--------------|-------------|
| **Message Pattern** | Publish-subscribe (1-to-many) | Point-to-point (1-to-1 or many-to-1) |
| **Delivery Method** | Push (messages are pushed to subscribers) | Pull (messages are retrieved by consumers) |
| **Message Storage** | No message retention after delivery | Messages are retained until processed |
| **Use Case** | Notifications, fan-out, event-driven messaging | Task queues, job processing, decoupling services |

### **SNS + SQS Integration**
SNS and SQS **can work together** in scenarios where a published message needs to be distributed to multiple queues for processing.

For example:
1. An **SNS topic** receives a message.
2. Multiple **SQS queues** subscribe to the topic.
3. Each queue independently processes the message.

This pattern is **common in event-driven architectures** and **microservices**.

---

# what do you mean by decoupling? 

### **What is Decoupling?**  

**Decoupling** refers to designing a system in a way that its components (e.g., services, modules, or applications) are **independent** of each other. This means that changes in one component **do not directly impact** others, making the system more **scalable, maintainable, and resilient**.  

### **🔹 Why is Decoupling Important?**  
1. **Flexibility:** You can modify or replace one component without breaking the entire system.  
2. **Scalability:** Independent components can be scaled separately based on demand.  
3. **Fault Tolerance:** If one part fails, the rest of the system continues working.  
4. **Maintainability:** Easier debugging and updates since components operate separately.  

---

### **🔹 Example of Coupled vs. Decoupled Systems**  

#### ❌ **Tightly Coupled System (Bad Example)**  
Imagine a **Node.js backend** that directly calls a **database** whenever a request comes in:  

```js
app.post("/order", async (req, res) => {
  const order = await db.collection("orders").insertOne(req.body);
  sendEmail(order);  // Synchronous email sending
  res.json(order);
});
```  
💥 **Problem:** If the email service fails, the entire request might fail, affecting performance and reliability.  

---

#### ✅ **Loosely Coupled System (Better Approach)**  
Now, let's **decouple** the email service using **AWS SQS**:  

1. **Order Service:** Saves order data and sends an SQS message.  
2. **Email Service:** Listens to SQS and sends emails separately.  

```js
app.post("/order", async (req, res) => {
  const order = await db.collection("orders").insertOne(req.body);
  await sqs.sendMessage({
    QueueUrl: process.env.SQS_URL,
    MessageBody: JSON.stringify({ orderId: order.insertedId })
  }).promise();
  
  res.json(order);  // Order request completes fast, email is sent separately
});
```  

📌 **Now:**  
✔ The **order service** does not depend on the **email service**.  
✔ If the email service fails, orders **still get processed** and emails can be retried later.  

---

### **🔹 Decoupling with AWS Services**
- **SNS + SQS** → Send events without worrying about consumers.  
- **EventBridge** → Decoupled event-driven workflows.  
- **Lambda Functions** → Process tasks asynchronously without tight service dependency.  
- **Kafka** → Stream events to multiple independent consumers.  

Would you like a hands-on example using AWS SNS + SQS for decoupling? 🚀
Yes:

### **🔹 Hands-on Example: AWS SNS + SQS for Decoupling**  
We'll create a **decoupled** architecture where:  
1. **SNS (Publisher)** sends messages.  
2. **SQS (Subscriber)** receives messages for processing.  
3. A **Node.js script** publishes messages to SNS and reads them from SQS.  

---

### **🔹 Step 1: Setup AWS SNS & SQS**
1. **Create an SNS Topic**  
   - Go to AWS SNS → Create Topic → Choose **Standard**  
   - Name: `order-topic`  
   - Copy the **Topic ARN**  

2. **Create an SQS Queue**  
   - Go to AWS SQS → Create Queue → Choose **Standard**  
   - Name: `order-queue`  

3. **Subscribe SQS to SNS**  
   - Open the SNS topic (`order-topic`) → Click **Create Subscription**  
   - Choose **SQS** as protocol → Select `order-queue`  
   - Confirm subscription  

---

### **🔹 Step 2: Install AWS SDK**
```sh
npm install aws-sdk dotenv
```

---

### **🔹 Step 3: Publish Messages to SNS**
```js
require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Change to your AWS region

const sns = new AWS.SNS();
const topicArn = "arn:aws:sns:us-east-1:123456789012:order-topic"; // Replace with your SNS Topic ARN

async function publishMessage(orderId) {
  const params = {
    Message: JSON.stringify({ orderId, status: "created" }),
    TopicArn: topicArn
  };

  try {
    const result = await sns.publish(params).promise();
    console.log("Message sent:", result.MessageId);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
}

// Example usage
publishMessage("ORDER123");
```
✅ **This sends a message to SNS, which then delivers it to SQS.**  

---

### **🔹 Step 4: Read Messages from SQS**
```js
const sqs = new AWS.SQS();
const queueUrl = "https://sqs.us-east-1.amazonaws.com/123456789012/order-queue"; // Replace with your SQS Queue URL

async function receiveMessages() {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 5
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      for (const message of data.Messages) {
        console.log("Received:", message.Body);

        // Delete message after processing
        await sqs.deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle
        }).promise();
      }
    } else {
      console.log("No messages received");
    }
  } catch (error) {
    console.error("Error receiving messages:", error);
  }
}

// Poll for messages
setInterval(receiveMessages, 5000);
```
✅ **This script pulls messages from SQS, processes them, and deletes them from the queue.**  

---

### **🔹 How This Helps in Decoupling**
- **SNS allows multiple consumers** (e.g., SQS, Lambda, Email) to receive messages.  
- **SQS ensures message durability**, so even if a service is down, it can process messages later.  
- **Publisher (SNS) doesn’t wait for processing**, making the system **asynchronous** and **scalable**.  

Would you like to extend this with Lambda or event filtering? 🚀
yes:

### **🔹 Extending SNS + SQS with AWS Lambda & Event Filtering**  

Now, let's enhance our system by:  
1. **Triggering an AWS Lambda function when a new message arrives in SQS.**  
2. **Filtering SNS messages based on attributes (e.g., order status).**  

---

## **🔹 Step 1: Create an AWS Lambda Function**
1. **Go to AWS Lambda** → Create function  
   - **Name:** `processOrderLambda`  
   - **Runtime:** Node.js 18.x  
   - **Permissions:** Attach the **AWSLambdaBasicExecutionRole** and **SQS full access**.  

2. **Attach Lambda to SQS**  
   - Go to AWS SQS → Select `order-queue`  
   - Click **Trigger** → Choose **Lambda**  
   - Select `processOrderLambda`  

---

## **🔹 Step 2: Update Lambda Function**
Modify the Lambda function to process orders from SQS:  

```js
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    console.log("Processing Order:", message.orderId);

    // Simulate order processing
    await processOrder(message.orderId);

    console.log("Order Processed:", message.orderId);
  }
};

async function processOrder(orderId) {
  return new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing delay
}
```
✅ **Now, whenever an order message arrives in SQS, Lambda processes it automatically!**  

---

## **🔹 Step 3: Filter Messages in SNS**
We can configure **SNS message filtering** to allow SQS to receive only specific messages.  

### **Example: Only Forward "created" Orders to SQS**
1. Go to **AWS SNS** → Open `order-topic`  
2. Click **Subscriptions** → Edit `order-queue` subscription  
3. Under **Subscription filter policy**, add this JSON:  

```json
{
  "status": ["created"]
}
```
✅ **Now, SNS will send only "created" orders to SQS. Other order statuses (e.g., "shipped", "cancelled") will be ignored.**  

---

## **🔹 Step 4: Publish Filtered Messages**
Modify the **SNS publisher** to include the `status` attribute:  

```js
async function publishMessage(orderId, status) {
  const params = {
    Message: JSON.stringify({ orderId, status }),
    TopicArn: "arn:aws:sns:us-east-1:123456789012:order-topic",
    MessageAttributes: {
      "status": {
        DataType: "String",
        StringValue: status
      }
    }
  };

  try {
    const result = await sns.publish(params).promise();
    console.log("Message sent:", result.MessageId);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
}

// Example Usage
publishMessage("ORDER123", "created");  // ✅ Sent to SQS
publishMessage("ORDER456", "shipped");  // ❌ Not sent to SQS
```

---

## **🔹 Final Workflow**
1. `publishMessage()` sends an **order event** to **SNS** with a status (`created`, `shipped`, etc.).  
2. **SNS filtering** ensures that **only "created" orders** go to **SQS**.  
3. **Lambda** automatically picks up messages from **SQS** and processes the orders.  

---

### **🚀 Benefits of This Approach**
✔ **Fully decoupled architecture**  
✔ **Lambda scales automatically**  
✔ **SNS filtering reduces unnecessary messages**  
✔ **SQS guarantees message durability**  

Would you like to extend this further with **DynamoDB or event-driven microservices**? 😊🚀
yes:
### **🔹 Extending SNS + SQS with AWS Lambda & DynamoDB for Event-Driven Microservices**  

Now, we will:  
✅ **Store order events in DynamoDB** using Lambda.  
✅ **Trigger additional microservices** based on order status.  
✅ **Ensure reliability with Dead Letter Queue (DLQ).**  

---

## **🔹 Step 1: Create a DynamoDB Table**
1. **Go to AWS DynamoDB** → Create Table  
   - **Table Name:** `Orders`  
   - **Partition Key:** `orderId (String)`  
   - **Sort Key (optional):** `status (String)`  
2. Click **Create Table** and wait for provisioning.  

---

## **🔹 Step 2: Update Lambda to Store Orders in DynamoDB**
Modify `processOrderLambda` to **store order details in DynamoDB**:  

```js
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "Orders";

exports.handler = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    console.log("Processing Order:", message.orderId);

    await saveToDynamoDB(message);

    console.log("Order Stored:", message.orderId);
  }
};

async function saveToDynamoDB(order) {
  const params = {
    TableName: tableName,
    Item: {
      orderId: order.orderId,
      status: order.status,
      timestamp: new Date().toISOString()
    }
  };
  return dynamoDB.put(params).promise();
}
```
✅ **Now, each order event is saved to DynamoDB.**  

---

## **🔹 Step 3: Add a Dead Letter Queue (DLQ) for Failed Messages**  
To ensure messages are **not lost if Lambda fails**, create a **DLQ**.  

1. **Go to AWS SQS** → Create Queue  
   - **Queue Name:** `order-dlq`  
   - **Standard Queue**  

2. **Attach DLQ to SQS**
   - Open `order-queue` → Click **Edit**  
   - Under **Dead Letter Queue**, select `order-dlq`  
   - Set **Maximum Receives** to `3` (after 3 failures, messages go to DLQ)  

✅ **Now, unprocessed messages are retried before moving to DLQ.**  

---

## **🔹 Step 4: Trigger a Shipping Service from SNS**
We want to **notify a separate microservice** when an order is "shipped".  
- **SNS will send "shipped" events to another SQS queue.**  
- **A new Lambda (`shippingLambda`) processes these events.**  

### **1️⃣ Create `shipping-queue` in AWS SQS**  
- Name: `shipping-queue`  
- Type: **Standard Queue**  

### **2️⃣ Subscribe `shipping-queue` to SNS**  
- **SNS Topic:** `order-topic`  
- **Filter Policy:**  

```json
{
  "status": ["shipped"]
}
```
✅ **Only "shipped" orders go to `shipping-queue`.**  

---

## **🔹 Step 5: Create `shippingLambda` to Process Shipped Orders**  

```js
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event) => {
  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    console.log("Shipping Order:", message.orderId);

    // Simulate shipping process
    await processShipping(message.orderId);

    console.log("Order Shipped:", message.orderId);
  }
};

async function processShipping(orderId) {
  return new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate shipping delay
}
```
✅ **Now, whenever an order is marked as "shipped", `shippingLambda` processes it.**  

---

## **🔹 Final Architecture**
🚀 **Event-driven order processing with AWS SNS, SQS, Lambda, and DynamoDB**  

1️⃣ **SNS (`order-topic`) receives messages.**  
2️⃣ **SQS (`order-queue`) receives "created" orders.**  
3️⃣ **Lambda (`processOrderLambda`) saves orders to DynamoDB.**  
4️⃣ **SQS (`shipping-queue`) receives "shipped" orders.**  
5️⃣ **Lambda (`shippingLambda`) processes shipping.**  
6️⃣ **DLQ (`order-dlq`) stores failed messages for debugging.**  

---

## **🔹 Benefits of This Architecture**
✔ **Fully decoupled microservices**  
✔ **DynamoDB stores order history**  
✔ **SNS filtering prevents unnecessary messages**  
✔ **DLQ ensures no message loss**  
✔ **Scalable & resilient**  

---

💡 **Next Steps**:  
Would you like to extend this with **API Gateway for real-time order tracking**? 🚀
Yes:
### **🔹 Extending SNS + SQS with API Gateway for Real-Time Order Tracking**  

Now, we will:  
✅ **Expose a REST API using API Gateway to track orders.**  
✅ **Fetch order status from DynamoDB.**  
✅ **Allow users to check their order progress in real-time.**  

---

## **🔹 Step 1: Create an API Gateway (HTTP API)**
1. **Go to AWS API Gateway** → Create API  
   - **Choose HTTP API**  
   - **Name:** `OrderTrackingAPI`  
   - **Endpoint:** `/order/{orderId}`  
   - **Method:** `GET`  

2. **Create an AWS Lambda Integration**  
   - Attach a Lambda function to handle order tracking (`orderTrackingLambda`).  
   - Deploy API and copy the endpoint URL.  

---

## **🔹 Step 2: Create `orderTrackingLambda`**
Modify the Lambda function to fetch order details from DynamoDB.  

```js
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "Orders";

exports.handler = async (event) => {
  const orderId = event.pathParameters.orderId; // Extract orderId from API request
  if (!orderId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing orderId" }),
    };
  }

  const params = {
    TableName: tableName,
    KeyConditionExpression: "orderId = :orderId",
    ExpressionAttributeValues: {
      ":orderId": orderId,
    },
  };

  try {
    const data = await dynamoDB.query(params).promise();
    if (data.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Order not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
```
✅ **This function fetches order details based on `orderId`.**  

---

## **🔹 Step 3: Deploy API and Test**
1. **Deploy the API Gateway.**  
2. **Copy the endpoint URL:**  
   ```
   https://your-api-id.execute-api.us-east-1.amazonaws.com/order/{orderId}
   ```
3. **Test with cURL or Postman:**  
   ```sh
   curl -X GET "https://your-api-id.execute-api.us-east-1.amazonaws.com/order/ORDER123"
   ```

---

## **🔹 Step 4: Add Real-Time Order Tracking with WebSockets**
For **real-time updates**, we can use **WebSockets with API Gateway**:  
1. **Go to AWS API Gateway** → Create WebSocket API  
   - **Route:** `$connect`, `$disconnect`, `orderUpdates`  
   - **Integration:** Attach to a new Lambda function (`websocketLambda`).  

2. **Create `websocketLambda` to Send Real-Time Updates**
```js
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const apigwManagementApi = new AWS.ApiGatewayManagementApi({
  endpoint: "https://your-api-id.execute-api.us-east-1.amazonaws.com/",
});

exports.handler = async (event) => {
  for (const record of event.Records) {
    const orderUpdate = JSON.parse(record.body);
    
    // Fetch all WebSocket connections
    const connections = await dynamoDB.scan({ TableName: "WebSocketConnections" }).promise();
    
    // Send update to each connected client
    for (const connection of connections.Items) {
      try {
        await apigwManagementApi.postToConnection({
          ConnectionId: connection.connectionId,
          Data: JSON.stringify(orderUpdate),
        }).promise();
      } catch (err) {
        console.error("Error sending update:", err);
      }
    }
  }
};
```
✅ **This will notify clients in real-time when an order status changes.**  

---

## **🔹 Final Architecture**
🚀 **Event-driven order tracking with SNS, SQS, Lambda, API Gateway (REST & WebSockets)**  

1️⃣ **User places an order (`POST /order`) → SNS (`order-topic`)**  
2️⃣ **SQS (`order-queue`) receives the message**  
3️⃣ **Lambda (`processOrderLambda`) saves the order in DynamoDB**  
4️⃣ **User queries order status via API Gateway (`GET /order/{orderId}`)**  
5️⃣ **When order status updates, WebSockets send real-time notifications**  

---

## **🔹 Benefits of This Approach**
✔ **API Gateway provides REST API for order tracking**  
✔ **WebSockets enable real-time updates**  
✔ **SNS + SQS keep microservices decoupled**  
✔ **DynamoDB ensures high-speed order retrieval**  

Would you like to extend this further with **user authentication (Cognito) or event-driven analytics (Kinesis)?** 🚀
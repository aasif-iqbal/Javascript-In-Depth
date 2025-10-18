## 🧩 **What is the Saga Pattern?**

The **Saga Pattern** is a **design pattern for managing distributed transactions** across multiple microservices **without using a global transaction (like 2-phase commit)**.

It ensures **data consistency** across services **by using a sequence of local transactions**, each with a **compensating (rollback) transaction** in case something fails.

---

## 🧠 **Why We Need It**

In a **monolithic application**, you can wrap all operations in a single database transaction:

```sql
BEGIN;
INSERT INTO orders ...;
UPDATE payments ...;
COMMIT;
```

But in **microservices**, each service has its own database.
So you **can’t use a single COMMIT/ROLLBACK** across multiple services.

That’s where **Saga Pattern** helps — it provides a **logical transaction** across distributed services using **events** and **compensations**.

---

## ⚙️ **How It Works**

A **Saga** is a sequence of **steps (local transactions)**:

```
T1 → T2 → T3 → ... → Tn
```

Each step updates data within **one service** and publishes an **event** to trigger the next step.
If any step fails, the system triggers **compensating transactions** to undo previous successful steps:

```
T1, T2 fail → C1, C2 (rollback)
```

---

## 🧾 **Example: Order & Payment**

Imagine you have:

* **Order Service**
* **Payment Service**
* **Inventory Service**

### ✅ Success Flow:

1. Order Service creates an order → emits `OrderCreated`
2. Inventory Service reserves stock → emits `StockReserved`
3. Payment Service processes payment → emits `PaymentCompleted`
4. Order Service updates status → `OrderConfirmed`

### ❌ Failure Flow (Payment Fails):

1. Order Service creates an order → emits `OrderCreated`
2. Inventory Service reserves stock → emits `StockReserved`
3. Payment Service fails → emits `PaymentFailed`
4. Inventory Service performs **compensation** → releases stock
5. Order Service performs **compensation** → cancels order

---

## 🧱 **Two Saga Implementation Types**

### **1️⃣ Choreography-Based Saga (Decentralized)**

* Each service **listens to events** and reacts.
* No central coordinator.
* Simple for small systems.

#### Example:

* `OrderCreated` → triggers `InventoryService`
* `StockReserved` → triggers `PaymentService`
* `PaymentFailed` → triggers `OrderService` to cancel order

✅ **Pros**

* Simple, no central orchestration
* Loosely coupled services

❌ **Cons**

* Complex event flow for many services
* Hard to trace/debug

---

### **2️⃣ Orchestration-Based Saga (Centralized)**

* A **central Saga orchestrator** (e.g., AWS Step Functions, a SagaManager) controls the flow.
* It tells each service what to do next.

#### Example:

* Orchestrator → call `OrderService` → `InventoryService` → `PaymentService`
* On failure → orchestrator calls compensating actions in reverse order.

✅ **Pros**

* Easier to monitor and handle failures
* Centralized logic

❌ **Cons**

* Adds coupling to the orchestrator

---

## 💡 **Saga in Node.js Example**

**Using Event-Driven Choreography (with AWS SQS/SNS/EventBridge):**

```js
// Order Service - Create Order
await db.saveOrder({ status: "PENDING" });
await publishEvent("OrderCreated", order);

// Inventory Service - Subscribe to OrderCreated
await reserveStock(order);
await publishEvent("StockReserved", order);

// Payment Service - Subscribe to StockReserved
try {
  await processPayment(order);
  await publishEvent("PaymentCompleted", order);
} catch (err) {
  await publishEvent("PaymentFailed", order);
}

// Order Service - Handle PaymentFailed
await updateOrderStatus(order.id, "CANCELLED");
```

---

## ⚖️ **Key Concepts**

| Term                         | Meaning                                        |
| ---------------------------- | ---------------------------------------------- |
| **Local Transaction**        | A DB operation within one service              |
| **Compensating Transaction** | Action to undo a local transaction             |
| **Saga Orchestrator**        | Central manager controlling steps              |
| **Event Bus**                | Medium for communication (SNS/SQS/EventBridge) |
| **Idempotency**              | Ensures retries don’t cause duplicates         |

---

## 🧩 **In AWS Serverless Context**

| AWS Service                 | Role in Saga                                    |
| --------------------------- | ----------------------------------------------- |
| **Lambda**                  | Executes each step or compensation              |
| **SQS / SNS / EventBridge** | Passes events between services                  |
| **Step Functions**          | Orchestrates Saga flow (if using orchestration) |
| **DynamoDB / RDS**          | Stores local state per service                  |
| **CloudWatch**              | Monitors execution and failures                 |

---

## ✅ **Summary**

| Concept                   | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| **Pattern Name**          | Saga Pattern                                              |
| **Problem Solved**        | Distributed transaction consistency                       |
| **Approach**              | Local + Compensating transactions                         |
| **Implementation Styles** | Choreography or Orchestration                             |
| **Tech Stack (Node.js)**  | AWS Lambda, SQS/SNS, Step Functions, DynamoDB             |
| **Goal**                  | Maintain consistency across services without global locks |

---

Would you like me to show a **diagram of the Saga pattern** (showing both Choreography and Orchestration flow) to visualize how these events and compensations happen?

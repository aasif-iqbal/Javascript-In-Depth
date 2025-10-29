### Scenario: E-commerce Order and Inventory Management
Context: In an online store, when a customer places an order, the Order Service creates an order and notifies the Inventory Service to deduct stock for the ordered items. The Inventory Service processes the request and confirms stock availability by publishing an event back to Kafka, which the Order Service consumes to update the order status (e.g., "Confirmed" or "OutOfStock").
Why Kafka? Kafka is ideal here because:

Orders and inventory updates are high-throughput operations.
Asynchronous communication ensures the Order Service isn't blocked waiting for inventory checks.
Kafka's durability and scalability handle large event volumes and ensure no messages are lost.

Flow:

A customer places an order via the Order Service (e.g., POST /orders).
The Order Service saves the order and publishes an OrderCreated event to a Kafka topic (orders-topic).
The Inventory Service subscribes to orders-topic, processes the event, and deducts stock if available.
The Inventory Service publishes an InventoryUpdated event to another topic (inventory-topic).
The Order Service subscribes to inventory-topic and updates the order status based on the event.

Implement this in javascript.
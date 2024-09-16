/*
Here’s a detailed implementation of the `processDelivery` function with realistic mock asynchronous functions to simulate the steps of finding restaurants, placing an order, assigning a delivery person, and tracking the delivery. Each step will simulate asynchronous behavior using `setTimeout` to represent the delay in real-time operations, with success or failure at each step.

*/

// Simulated asynchronous function to find nearby restaurants
function findNearbyRestaurants(orderId, callback) {
  console.log(`Finding restaurants for order ${orderId}...`);
  setTimeout(() => {
    const restaurants = ['Pizza Palace', 'Burger Haven', 'Taco Town']; // Mocked list
    const error = Math.random() > 0.9 ? 'No restaurants available' : null;
    if (error) return callback(error);
    console.log(`Restaurants found: ${restaurants}`);
    callback(null, restaurants);
  }, 1000); // Simulating a 1 second delay
}

// Simulated asynchronous function to place an order
function placeOrder(orderId, callback) {
  console.log(`Placing order ${orderId}...`);
  setTimeout(() => {
    const orderDetails = { orderId, items: ['Pizza', 'Burger'], status: 'Order Placed' };
    const error = Math.random() > 0.9 ? 'Failed to place order' : null;
    if (error) return callback(error);
    console.log(`Order placed: ${JSON.stringify(orderDetails)}`);
    callback(null, orderDetails);
  }, 1500); // Simulating a 1.5 second delay
}

// Simulated asynchronous function to assign a delivery person
function assignDeliveryPerson(orderId, callback) {
  console.log(`Assigning delivery person for order ${orderId}...`);
  setTimeout(() => {
    const deliveryPerson = { name: 'John Doe', vehicle: 'Bike', estimatedTime: '20 mins' };
    const error = Math.random() > 0.8 ? 'No delivery person available' : null;
    if (error) return callback(error);
    console.log(`Delivery person assigned: ${JSON.stringify(deliveryPerson)}`);
    callback(null, deliveryPerson);
  }, 2000); // Simulating a 2 second delay
}

// Simulated asynchronous function to track delivery
function trackDelivery(orderId, callback) {
  console.log(`Tracking delivery for order ${orderId}...`);
  setTimeout(() => {
    const status = 'Delivered';
    const error = Math.random() > 0.95 ? 'Delivery tracking failed' : null;
    if (error) return callback(error);
    console.log(`Delivery status: ${status}`);
    callback(null, status);
  }, 2500); // Simulating a 2.5 second delay
}

// Main processDelivery function
function processDelivery(orderId, callback) {
  findNearbyRestaurants(orderId, (err, restaurants) => {
    if (err) return callback(`Error finding restaurants: ${err}`);
    
    placeOrder(orderId, (err, orderDetails) => {
      if (err) return callback(`Error placing order: ${err}`);

      assignDeliveryPerson(orderId, (err, deliveryPerson) => {
        if (err) return callback(`Error assigning delivery person: ${err}`);

        trackDelivery(orderId, (err, status) => {
          if (err) return callback(`Error tracking delivery: ${err}`);

          callback(null, `Order ${orderId} delivered successfully!`);
        });
      });
    });
  });
}

// Example usage
const orderId = 12345;
processDelivery(orderId, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

/*

### Detailed Breakdown:

1. **`findNearbyRestaurants`:** 
   - Simulates finding restaurants within a certain radius for the order.
   - Introduces a small chance of failure (10% chance with `Math.random()`).
   - After a 1-second delay, either returns the list of restaurants or an error.

2. **`placeOrder`:**
   - Simulates the action of placing an order for the selected restaurant.
   - Has a 10% chance of failure.
   - Takes 1.5 seconds to complete.

3. **`assignDeliveryPerson`:**
   - Simulates assigning a delivery person to the order.
   - Introduces a slightly higher chance of failure (20% chance).
   - Completes after 2 seconds, returning the delivery person’s information if successful.

4. **`trackDelivery`:**
   - Simulates the process of tracking the delivery after it has been dispatched.
   - Has a very small chance of failure (5% chance).
   - Takes 2.5 seconds to simulate tracking the delivery status.

### Output Example:

```
Finding restaurants for order 12345...
Restaurants found: Pizza Palace,Burger Haven,Taco Town
Placing order 12345...
Order placed: {"orderId":12345,"items":["Pizza","Burger"],"status":"Order Placed"}
Assigning delivery person for order 12345...
Delivery person assigned: {"name":"John Doe","vehicle":"Bike","estimatedTime":"20 mins"}
Tracking delivery for order 12345...
Delivery status: Delivered
Order 12345 delivered successfully!
```

This setup simulates a realistic asynchronous flow for a food delivery system, with time delays and the possibility of failure at each step. You can tweak the failure rates (`Math.random()`) and the delays (`setTimeout`) to better simulate real-world conditions or stress-test the system.
*/
Here’s a list of problems based on callbacks, each grounded in real-life scenarios. These will help understand the flow and challenge of handling asynchronous operations with callbacks:

---

### 1. **Food Delivery App**
You are building a food delivery app, and the delivery process has several asynchronous steps:
- **Find Nearby Restaurants:** Given a user's location, find restaurants within a 5-mile radius.
- **Place Order:** After the user selects a restaurant, place an order. The restaurant might reject the order if they are too busy.
- **Assign Delivery Person:** After placing the order, assign a delivery person. If no one is available, an error is returned.
- **Track Delivery:** Once the order is out for delivery, allow the user to track it.
  
Implement a function `processDelivery` that follows these steps. Use callbacks to handle errors like no nearby restaurants, failed order placement, or no available delivery person.

---

### 2. **Hotel Reservation System**
In a hotel reservation system, a guest makes a booking. The system has the following asynchronous steps:
- **Check Room Availability:** Check if there is any room available for the given date range. If no rooms are available, return an error.
- **Hold Room:** Temporarily hold the room for the guest. If the hold fails, return an error.
- **Process Payment:** Process the payment using the guest’s credit card. If the payment fails, return an error.
- **Confirm Booking:** Finally, confirm the booking by sending a confirmation message.

Simulate this process using callbacks, ensuring that if any step fails, subsequent steps are skipped and an error is returned.

---

### 3. **Online Store: Order Processing**
In an online store, after a customer places an order, several operations happen:
- **Validate Cart:** Ensure all items in the cart are in stock.
- **Calculate Shipping:** Estimate shipping costs based on the customer’s location and the size/weight of the items.
- **Process Payment:** Charge the customer’s credit card. If the card is declined, return an error.
- **Confirm Order:** Send the customer a confirmation message via email.

Write a callback-based function that simulates this order processing pipeline, with error handling at each step.

---

### 4. **Customer Support System**
In a customer support system, the support process follows these steps:
- **Ticket Creation:** A customer submits a support request.
- **Assign Agent:** Assign the ticket to an available support agent. If no agents are available, return an error.
- **Resolve Issue:** The agent works on the ticket, and after some time, resolves the issue. Simulate random success or failure for this step.
- **Follow-up:** After the issue is resolved, send a follow-up message to the customer to ensure satisfaction.

Implement a callback-based function `processSupportTicket` that handles these steps, stopping at any failure point and returning an appropriate error message.

---

### 5. **Flight Booking System**
In a flight booking system, several steps are performed after the user selects a flight:
- **Check Flight Availability:** Ensure the selected flight has seats available.
- **Reserve Seat:** Reserve the selected seat for the user. If the seat reservation fails, return an error.
- **Process Payment:** Charge the user’s credit card for the flight.
- **Send Confirmation:** Once the payment is processed, send the flight confirmation to the user’s email.

Create a function `bookFlight` that uses callbacks to handle each step, including error handling for flight unavailability, failed seat reservation, or payment issues.

---

### 6. **Movie Ticket Booking System**
In an online movie ticket booking system, the following steps are involved:
- **Check Show Availability:** Check if there are seats available for a selected show.
- **Reserve Seat:** Reserve the seat. If no seats are available, return an error.
- **Process Payment:** Charge the user for the ticket.
- **Send Ticket:** Send the ticket to the user’s email.

Write a function `bookMovieTicket(showId, callback)` that processes the booking using callbacks, stopping if any step fails.

---

### 7. **Bank Loan Application**
In a bank loan application system, the application undergoes these steps:
- **Check Credit Score:** Fetch the applicant’s credit score from a third-party service.
- **Verify Income:** Verify the applicant’s income by connecting to an external service. If income verification fails, return an error.
- **Calculate Loan Offer:** Based on the credit score and verified income, calculate the loan offer. This may fail if the applicant doesn’t meet the minimum requirements.
- **Submit Application:** Submit the application to the bank for approval.

Simulate the loan application process using callbacks, ensuring proper error handling at each step.

---

### 8. **Social Media Post Scheduler**
A social media platform allows users to schedule posts for future publication. The steps include:
- **Verify Account:** Verify that the user’s account is in good standing before allowing post scheduling.
- **Check Time Slot:** Ensure that the selected time slot for scheduling is available. If it is already booked, return an error.
- **Prepare Content:** Validate and prepare the content for posting.
- **Schedule Post:** Schedule the post at the specified time.

Implement a function `schedulePost` that handles these asynchronous operations using callbacks, halting the process if any step fails.

---

### 9. **Smart Home Automation System**
In a smart home system, when the user activates "Good Night" mode, several asynchronous actions happen:
- **Lock Doors:** Lock all the doors in the house. If a door fails to lock, return an error.
- **Turn Off Lights:** Turn off all lights in the house. If any light fails to turn off, return an error.
- **Adjust Thermostat:** Set the thermostat to a lower temperature for sleeping.
- **Activate Alarm System:** Activate the security system for the night.

Simulate this smart home automation process using callbacks, ensuring proper error handling.

---

### 10. **Car Rental Service**
In a car rental service, a customer needs to rent a car, and the process follows these steps:
- **Check Car Availability:** Ensure the selected car model is available for the chosen date.
- **Reserve Car:** Reserve the car for the customer.
- **Process Payment:** Charge the customer’s credit card for the rental.
- **Send Confirmation:** Send the rental confirmation to the customer’s email.

Write a callback-based function that handles each of these steps, stopping and returning an error if any step fails.

---

These problems help solidify the understanding of how callback-based asynchronous programming works, especially when managing dependent tasks and error handling.
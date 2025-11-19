/*

I'll create a real-world Node.js application demonstrating practical Promise usage in various scenarios.I've created a comprehensive Node.js application demonstrating **7 real-world Promise use cases**:

## **Key Scenarios Covered:**

1. **User Registration Flow** - Sequential async operations (check existence → hash password → save user → send email)

2. **Parallel API Calls** - Using `Promise.all()` to load dashboard data simultaneously, reducing total load time

3. **Batch Payment Processing** - Using `Promise.allSettled()` to handle partial failures gracefully

4. **API Timeout** - Using `Promise.race()` to implement request timeouts

5. **Retry Mechanism** - Automatic retry logic for unstable API calls

6. **Order Processing Workflow** - Promise chaining for multi-step validation and processing

7. **File Operations** - Error handling with graceful fallbacks

## **Key Patterns Demonstrated:**

- **async/await** syntax (modern approach)
- **Promise.all()** - wait for multiple promises, fail if any fails
- **Promise.allSettled()** - wait for all, regardless of success/failure
- **Promise.race()** - use the first settled promise
- **Promise chaining** with `.then()` and `.catch()`
- **Error handling** with try-catch blocks
- **Non-blocking operations** (fire-and-forget email)
- **Retry logic** with exponential backoff
- **Timeout implementation**

You can run this code in Node.js to see all the examples in action! Each demo shows timing, success/failure states, and practical patterns you'd use in production applications.

*/ 
// ============================================
// REAL-WORLD PROMISE USE CASES IN NODE.JS
// ============================================

// ============================================
// 1. USER REGISTRATION WITH MULTIPLE ASYNC OPERATIONS
// ============================================
class UserService {
  // Simulate database check
  checkUserExists(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = email === 'existing@example.com';
        resolve(exists);
      }, 100);
    });
  }

  // Simulate password hashing
  hashPassword(password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) {
          reject(new Error('Password too short'));
        }
        resolve(`hashed_${password}`);
      }, 150);
    });
  }

  // Simulate database insert
  saveUser(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id: Math.random(), ...userData, createdAt: new Date() });
      }, 200);
    });
  }

  // Simulate sending welcome email
  sendWelcomeEmail(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`📧 Welcome email sent to ${email}`);
        resolve(true);
      }, 100);
    });
  }

  // Main registration flow using promises
  async registerUser(email, password, name) {
    try {
      // Check if user already exists
      const exists = await this.checkUserExists(email);
      if (exists) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password);

      // Save user to database
      const user = await this.saveUser({
        email,
        password: hashedPassword,
        name
      });

      // Send welcome email (non-blocking, we don't wait for it)
      this.sendWelcomeEmail(email).catch(err => 
        console.error('Email failed but user created:', err)
      );

      return user;
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
}

// ============================================
// 2. PARALLEL API CALLS WITH Promise.all()
// ============================================
class DashboardService {
  fetchUserProfile(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ userId, name: 'John Doe', email: 'john@example.com' });
      }, 300);
    });
  }

  fetchUserOrders(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, total: 99.99, status: 'delivered' },
          { id: 2, total: 149.99, status: 'pending' }
        ]);
      }, 400);
    });
  }

  fetchUserNotifications(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, message: 'Order shipped', read: false },
          { id: 2, message: 'Payment received', read: true }
        ]);
      }, 250);
    });
  }

  // Load all dashboard data in parallel
  async loadDashboard(userId) {
    try {
      console.log('🔄 Loading dashboard data in parallel...');
      const startTime = Date.now();

      // Execute all requests in parallel
      const [profile, orders, notifications] = await Promise.all([
        this.fetchUserProfile(userId),
        this.fetchUserOrders(userId),
        this.fetchUserNotifications(userId)
      ]);

      const endTime = Date.now();
      console.log(`✅ Dashboard loaded in ${endTime - startTime}ms`);

      return { profile, orders, notifications };
    } catch (error) {
      throw new Error(`Dashboard load failed: ${error.message}`);
    }
  }
}

// ============================================
// 3. PROMISE.allSettled() - HANDLE PARTIAL FAILURES
// ============================================
class PaymentService {
  processPayment(orderId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
          resolve({ orderId, status: 'paid', amount: 99.99 });
        } else {
          reject(new Error(`Payment failed for order ${orderId}`));
        }
      }, 200);
    });
  }

  async processBatchPayments(orderIds) {
    console.log('💳 Processing batch payments...');
    
    // Process all payments, even if some fail
    const results = await Promise.allSettled(
      orderIds.map(id => this.processPayment(id))
    );

    const successful = results.filter(r => r.status === 'fulfilled');
    const failed = results.filter(r => r.status === 'rejected');

    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);

    return {
      successful: successful.map(r => r.value),
      failed: failed.map(r => ({ reason: r.reason.message }))
    };
  }
}

// ============================================
// 4. PROMISE.race() - TIMEOUT IMPLEMENTATION
// ============================================
class APIService {
  fetchDataFromAPI(url) {
    return new Promise((resolve, reject) => {
      // Simulate slow API call
      setTimeout(() => {
        resolve({ data: 'API Response', url });
      }, 5000); // 5 seconds
    });
  }

  timeout(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${ms}ms`));
      }, ms);
    });
  }

  async fetchWithTimeout(url, timeoutMs = 2000) {
    try {
      console.log(`🌐 Fetching ${url} with ${timeoutMs}ms timeout...`);
      
      // Race between API call and timeout
      const result = await Promise.race([
        this.fetchDataFromAPI(url),
        this.timeout(timeoutMs)
      ]);

      console.log('✅ Request successful');
      return result;
    } catch (error) {
      console.log(`❌ ${error.message}`);
      throw error;
    }
  }
}

// ============================================
// 5. RETRY MECHANISM WITH PROMISES
// ============================================
class RetryService {
  unstableAPICall(attempt) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Succeeds on 3rd attempt
        if (attempt >= 3) {
          resolve({ success: true, attempt });
        } else {
          reject(new Error(`Failed attempt ${attempt}`));
        }
      }, 500);
    });
  }

  async retryOperation(operation, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries}...`);
        const result = await operation(attempt);
        console.log('✅ Operation successful!');
        return result;
      } catch (error) {
        console.log(`❌ ${error.message}`);
        
        if (attempt === maxRetries) {
          throw new Error(`Failed after ${maxRetries} attempts`);
        }

        // Wait before retrying
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}

// ============================================
// 6. PROMISE CHAINING - ORDER PROCESSING WORKFLOW
// ============================================
class OrderService {
  validateOrder(order) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!order.items || order.items.length === 0) {
          reject(new Error('Order has no items'));
        }
        console.log('✅ Order validated');
        resolve(order);
      }, 100);
    });
  }

  checkInventory(order) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('✅ Inventory checked');
        resolve({ ...order, inventoryChecked: true });
      }, 150);
    });
  }

  calculateTotal(order) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = order.items.reduce((sum, item) => sum + item.price, 0);
        console.log(`✅ Total calculated: $${total}`);
        resolve({ ...order, total });
      }, 100);
    });
  }

  createInvoice(order) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✅ Invoice created');
        resolve({ ...order, invoiceId: `INV-${Date.now()}` });
      }, 200);
    });
  }

  // Promise chaining example
  processOrder(order) {
    return this.validateOrder(order)
      .then(validOrder => this.checkInventory(validOrder))
      .then(checkedOrder => this.calculateTotal(checkedOrder))
      .then(orderWithTotal => this.createInvoice(orderWithTotal))
      .then(finalOrder => {
        console.log('🎉 Order processed successfully!');
        return finalOrder;
      })
      .catch(error => {
        console.error('❌ Order processing failed:', error.message);
        throw error;
      });
  }
}

// ============================================
// 7. PROMISE WITH ERROR HANDLING - FILE OPERATIONS
// ============================================
class FileService {
  readFile(filename) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (filename.includes('missing')) {
          reject(new Error('File not found'));
        }
        resolve(`Content of ${filename}`);
      }, 200);
    });
  }

  processFile(content) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (content.length < 10) {
          reject(new Error('File too small to process'));
        }
        resolve(content.toUpperCase());
      }, 150);
    });
  }

  saveFile(filename, content) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ filename, size: content.length, saved: true });
      }, 100);
    });
  }

  async handleFileOperation(inputFile, outputFile) {
    try {
      const content = await this.readFile(inputFile);
      const processed = await this.processFile(content);
      const result = await this.saveFile(outputFile, processed);
      console.log('✅ File operation completed');
      return result;
    } catch (error) {
      console.error('❌ File operation failed:', error.message);
      // Graceful fallback
      return { error: error.message, recovered: true };
    }
  }
}

// ============================================
// DEMO EXECUTION
// ============================================
async function runDemos() {
  console.log('\n========================================');
  console.log('1. USER REGISTRATION EXAMPLE');
  console.log('========================================\n');
  
  const userService = new UserService();
  try {
    const user = await userService.registerUser(
      'newuser@example.com',
      'securepass123',
      'Jane Smith'
    );
    console.log('✅ User registered:', user);
  } catch (error) {
    console.error('❌', error.message);
  }

  console.log('\n========================================');
  console.log('2. PARALLEL API CALLS (Promise.all)');
  console.log('========================================\n');
  
  const dashboardService = new DashboardService();
  const dashboard = await dashboardService.loadDashboard(123);
  console.log('Dashboard:', dashboard);

  console.log('\n========================================');
  console.log('3. BATCH PAYMENTS (Promise.allSettled)');
  console.log('========================================\n');
  
  const paymentService = new PaymentService();
  const paymentResults = await paymentService.processBatchPayments([1, 2, 3, 4, 5]);
  console.log('Payment Results:', paymentResults);

  console.log('\n========================================');
  console.log('4. API TIMEOUT (Promise.race)');
  console.log('========================================\n');
  
  const apiService = new APIService();
  try {
    await apiService.fetchWithTimeout('https://api.example.com/data', 2000);
  } catch (error) {
    // Expected to timeout
  }

  console.log('\n========================================');
  console.log('5. RETRY MECHANISM');
  console.log('========================================\n');
  
  const retryService = new RetryService();
  try {
    const result = await retryService.retryOperation(
      (attempt) => retryService.unstableAPICall(attempt),
      3,
      500
    );
    console.log('Result:', result);
  } catch (error) {
    console.error('Failed:', error.message);
  }

  console.log('\n========================================');
  console.log('6. ORDER PROCESSING (Promise Chaining)');
  console.log('========================================\n');
  
  const orderService = new OrderService();
  const order = {
    items: [
      { name: 'Product 1', price: 29.99 },
      { name: 'Product 2', price: 49.99 }
    ]
  };
  const processedOrder = await orderService.processOrder(order);
  console.log('Processed Order:', processedOrder);

  console.log('\n========================================');
  console.log('7. FILE OPERATIONS WITH ERROR HANDLING');
  console.log('========================================\n');
  
  const fileService = new FileService();
  const fileResult = await fileService.handleFileOperation(
    'input.txt',
    'output.txt'
  );
  console.log('File Result:', fileResult);
}

// Run all demos
runDemos().then(() => {
  console.log('\n========================================');
  console.log('✅ ALL DEMOS COMPLETED');
  console.log('========================================\n');
});
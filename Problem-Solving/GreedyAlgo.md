### **Greedy Algorithm Explained (With Examples)**
A **greedy algorithm** makes decisions step by step, choosing the **locally optimal** solution at each step with the hope that it will lead to a **globally optimal** solution.

🔹 **Key Idea**: "Take the best choice at the moment and never reconsider past choices."

✅ **When to Use Greedy Algorithms?**  
- **Optimal Substructure** → An optimal solution can be built using optimal solutions of subproblems.  
- **Greedy Choice Property** → A locally optimal choice leads to a globally optimal solution.  

---

## **🛠 How to Solve Problems Using Greedy Algorithm**
1. **Sort the input** (if needed).  
2. **Make the best (greedy) choice at each step**.  
3. **Repeat until the problem is solved**.  

---

## **📌 Example 1: Activity Selection Problem (Interval Scheduling)**
💡 **Problem**: You are given `n` activities with their start and end times. You need to **select the maximum number of activities** that don’t overlap.

🔹 **Greedy Strategy**: Always **select the activity with the earliest finishing time**.

### **🔢 Example**
| Activity | Start | End  |
|----------|------|------|
| A1       | 1    | 3    |
| A2       | 2    | 5    |
| A3       | 4    | 6    |
| A4       | 5    | 7    |
| A5       | 6    | 8    |

🔹 **Step 1:** Sort by **end time** → `[(1,3), (2,5), (4,6), (5,7), (6,8)]`  
🔹 **Step 2:** Pick first activity → `(1,3)`  
🔹 **Step 3:** Pick the next **non-overlapping** activity → `(4,6)`  
🔹 **Step 4:** Pick the next **non-overlapping** activity → `(6,8)`  

✅ **Selected Activities** → `A1, A3, A5`  

### **📝 Code in JavaScript (Greedy)**
```javascript
function activitySelection(activities) {
    activities.sort((a, b) => a[1] - b[1]); // Sort by end time
    let selected = [activities[0]]; // Pick first activity
    let lastEndTime = activities[0][1];

    for (let i = 1; i < activities.length; i++) {
        if (activities[i][0] >= lastEndTime) { // Non-overlapping condition
            selected.push(activities[i]);
            lastEndTime = activities[i][1];
        }
    }
    return selected;
}

// Example Usage
const activities = [[1, 3], [2, 5], [4, 6], [5, 7], [6, 8]];
console.log(activitySelection(activities)); 
```
✅ **Time Complexity** → **O(n log n)** (due to sorting)  

---

## **📌 Example 2: Coin Change Problem (Greedy)**
💡 **Problem**: Given **denominations** of coins (e.g., `{1, 5, 10, 25}`), find the **minimum number of coins** to make a given amount.

🔹 **Greedy Strategy**: Always **pick the largest coin possible**.

### **🔢 Example**
If `amount = 30` and coins `{1, 5, 10, 25}`,  
1. Pick `25` → Remaining `5`  
2. Pick `5` → Remaining `0`  

✅ **Total coins used: 2 (`{25, 5}`)**  

### **📝 Code in JavaScript**
```javascript
function minCoins(coins, amount) {
    coins.sort((a, b) => b - a); // Sort coins in descending order
    let count = 0, i = 0;

    while (amount > 0) {
        if (coins[i] <= amount) {
            amount -= coins[i];
            count++;
        } else {
            i++; // Move to next smaller coin
        }
    }
    return count;
}

// Example Usage
const coins = [1, 5, 10, 25];
console.log(minCoins(coins, 30)); // Output: 2
```
✅ **Time Complexity** → **O(n)**  

📌 **⚠️ Limitation**: Greedy doesn’t always work (e.g., `{1, 3, 4}` for `6`, it would pick `{4,1,1}` instead of `{3,3}`).

---

## **📌 Example 3: Huffman Coding (File Compression)**
💡 **Problem**: Given character frequencies, build the **minimum-cost prefix tree** (Huffman Tree) for encoding.

🔹 **Greedy Strategy**:  
1. Always merge the **two least frequent** elements first.  
2. Repeat until one tree remains.

✅ **Used in data compression algorithms** like **ZIP, JPEG, and MP3**.

---

## **💡 When NOT to Use Greedy Algorithms**
Greedy algorithms **don’t work well** if:
❌ **Future choices affect current decisions** (e.g., Dynamic Programming is better).  
❌ **The problem doesn’t have the greedy choice property**.  

Example: **Knapsack Problem**  
- Greedy fails when items **must be fully taken or left** (0/1 Knapsack).  
- **Solution** → Use **Dynamic Programming**.

---

## **🔥 Summary**
| Problem Type                | Greedy Works? | Alternative |
|-----------------------------|--------------|------------|
| Activity Selection          | ✅ Yes       | -          |
| Coin Change (Certain Cases) | ✅ Sometimes | DP         |
| Huffman Coding              | ✅ Yes       | -          |
| 0/1 Knapsack                | ❌ No        | DP         |

Would you like more hands-on problems to practice? 🚀
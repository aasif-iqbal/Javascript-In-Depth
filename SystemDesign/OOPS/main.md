## OOP's concepts
Let’s go step-by-step and understand **OOPs concepts in TypeScript** with **real-world relatable examples** — not just abstract ones.

We’ll use a **“Hospital Management System”** (since you built *BookMyDoc*) — to make it more practical.

---

## 🧩 1. Class & Object

A **class** is a blueprint for creating **objects** (real entities).

```ts
class Doctor {
  constructor(public name: string, public specialization: string) {}

  getDetails(): string {
    return `${this.name} is a ${this.specialization} specialist.`;
  }
}

const doctor1 = new Doctor("Dr. Aasif", "Cardiologist");
console.log(doctor1.getDetails());
```

🧠 **Explanation:**

* `Doctor` is a **class** (blueprint).
* `doctor1` is an **object** (instance).
* `public` allows direct access to properties.

---

## 🔒 2. Encapsulation (Data Hiding)

Encapsulation means restricting direct access to some properties to protect data.

```ts
class Patient {
  private _medicalHistory: string[] = [];

  constructor(public name: string) {}

  addRecord(record: string): void {
    this._medicalHistory.push(record);
  }

  getRecords(): string[] {
    return this._medicalHistory;
  }
}

const patient = new Patient("John");
patient.addRecord("Fever in Jan 2024");
patient.addRecord("Allergy test in Mar 2024");

console.log(patient.getRecords()); // ✅ Access through method
// console.log(patient._medicalHistory); // ❌ Error: private property
```

🧠 **Why useful:** Keeps sensitive medical data **private** and exposes it **safely** using getter methods.

---

## 🎭 3. Abstraction (Hiding Complexity)

You expose **only what’s necessary** to the outside world, hiding the internal details.

```ts
abstract class Appointment {
  abstract bookAppointment(): void; // only define what to do, not how
}

class OnlineAppointment extends Appointment {
  bookAppointment(): void {
    console.log("Appointment booked via BookMyDoc website.");
  }
}

class WalkInAppointment extends Appointment {
  bookAppointment(): void {
    console.log("Appointment booked at hospital front desk.");
  }
}

const online = new OnlineAppointment();
online.bookAppointment();
```

🧠 **Explanation:**

* `abstract class` defines a **contract**.
* Each subclass **implements it differently**.
* Users just call `bookAppointment()` — they don’t care *how* it’s done.

---

## 🧬 4. Inheritance (Code Reuse)

A **child class** can inherit from a **parent class**, reusing code and extending functionality.

```ts
class User {
  constructor(public name: string, public email: string) {}

  login() {
    console.log(`${this.name} logged in.`);
  }
}

class DoctorUser extends User {
  constructor(name: string, email: string, public specialization: string) {
    super(name, email);
  }

  viewPatients() {
    console.log(`${this.name} is viewing patient list.`);
  }
}

const doc = new DoctorUser("Dr. Iqbal", "iqbal@bookmydoc.life", "Dermatologist");
doc.login();
doc.viewPatients();
```

🧠 **Explanation:**

* `DoctorUser` **inherits** from `User`.
* `super()` calls the parent constructor.
* Avoids rewriting login logic.

---

## 🌀 5. Polymorphism (Same method, different behavior)

Different classes can define **the same method name** but with **different behavior**.

```ts
class Notification {
  send(): void {
    console.log("Sending generic notification...");
  }
}

class EmailNotification extends Notification {
  send(): void {
    console.log("Sending email notification to doctor...");
  }
}

class SMSNotification extends Notification {
  send(): void {
    console.log("Sending SMS to patient...");
  }
}

function sendNotification(notification: Notification) {
  notification.send(); // Behavior depends on object type
}

sendNotification(new EmailNotification());
sendNotification(new SMSNotification());
```

🧠 **Explanation:**

* The method `send()` behaves differently depending on the object passed.
* This is **runtime polymorphism**.

---

## 🧩 6. Interface (Contract for classes)

Interfaces define **structure**, not implementation — ensuring consistency.

```ts
interface IUser {
  name: string;
  email: string;
  login(): void;
}

class Admin implements IUser {
  constructor(public name: string, public email: string) {}

  login(): void {
    console.log(`Admin ${this.name} logged in with admin privileges.`);
  }
}

const admin = new Admin("Alice", "admin@bookmydoc.life");
admin.login();
```

🧠 **Explanation:**

* `IUser` ensures any class implementing it **must** define `name`, `email`, and `login()`.
* Helps maintain **consistent structure** across multiple classes.

---

## 🧠 Summary Table

| Concept            | Meaning                | TypeScript Example                                 |
| ------------------ | ---------------------- | -------------------------------------------------- |
| **Class & Object** | Blueprint and instance | `Doctor` class                                     |
| **Encapsulation**  | Protect data           | `private` medical history                          |
| **Abstraction**    | Hide details           | `abstract class Appointment`                       |
| **Inheritance**    | Reuse code             | `DoctorUser extends User`                          |
| **Polymorphism**   | One method, many forms | `send()` in `EmailNotification`, `SMSNotification` |
| **Interface**      | Contract definition    | `IUser` implemented by `Admin`                     |

---

Would you like me to show **how to structure this OOP design into actual folders/files** in a **Node.js + TypeScript backend** (like in your BookMyDoc project)?
That will make the connection from concept → real project clearer.



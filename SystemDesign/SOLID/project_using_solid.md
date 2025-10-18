Perfect 👏
Let’s build a **real-world, production-style Node.js + TypeScript service** that applies **all SOLID principles** — clean, extensible, and testable.

We’ll take your **BookMyDoc** system and design a small **Appointment Booking Service**.

---

# 🏗️ Project: Appointment Booking Service (TypeScript + Node.js)

## 🎯 Goal:

Apply **SOLID principles** in a real backend service where:

* A patient can book an appointment.
* A doctor is notified (via Email/SMS).
* The logic is modular and easily extendable.

---

# 📁 Folder Structure (Clean Architecture)

```
src/
 ├── controllers/
 │    └── appointment.controller.ts
 ├── services/
 │    ├── appointment.service.ts
 │    ├── notification/
 │    │    ├── notification.service.ts
 │    │    ├── email.notification.ts
 │    │    └── sms.notification.ts
 ├── repositories/
 │    └── appointment.repository.ts
 ├── interfaces/
 │    ├── appointment.interface.ts
 │    └── notification.interface.ts
 ├── models/
 │    └── appointment.model.ts
 ├── app.ts
 └── server.ts
```

---

# 🧩 Step 1: Define Interfaces (`interfaces/`)

## ✅ `notification.interface.ts`

```ts
// DIP (Dependency Inversion Principle)
export interface INotificationService {
  sendNotification(recipient: string, message: string): Promise<void>;
}
```

## ✅ `appointment.interface.ts`

```ts
export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
}
```

---

# 🧩 Step 2: Notification Implementations (`services/notification/`)

## ✅ `email.notification.ts`

```ts
import { INotificationService } from "../../interfaces/notification.interface";

export class EmailNotificationService implements INotificationService {
  async sendNotification(recipient: string, message: string): Promise<void> {
    console.log(`📧 Email sent to ${recipient}: ${message}`);
  }
}
```

## ✅ `sms.notification.ts`

```ts
import { INotificationService } from "../../interfaces/notification.interface";

export class SMSNotificationService implements INotificationService {
  async sendNotification(recipient: string, message: string): Promise<void> {
    console.log(`📱 SMS sent to ${recipient}: ${message}`);
  }
}
```

✅ **Applies:**

* **OCP:** Add new notification types (e.g., WhatsApp) without modifying existing code.
* **DIP:** Both are independent of `AppointmentService`.

---

# 🧩 Step 3: Repository Layer (`repositories/appointment.repository.ts`)

```ts
import { Appointment } from "../interfaces/appointment.interface";

export class AppointmentRepository {
  private appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<Appointment> {
    this.appointments.push(appointment);
    return appointment;
  }

  async getAll(): Promise<Appointment[]> {
    return this.appointments;
  }
}
```

✅ **Applies:**

* **SRP (Single Responsibility):** Only deals with data persistence.

---

# 🧩 Step 4: Business Logic Layer (`services/appointment.service.ts`)

```ts
import { Appointment } from "../interfaces/appointment.interface";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { INotificationService } from "../interfaces/notification.interface";

export class AppointmentService {
  constructor(
    private repo: AppointmentRepository,
    private notifier: INotificationService
  ) {}

  async bookAppointment(appointment: Appointment): Promise<Appointment> {
    const created = await this.repo.create(appointment);
    await this.notifier.sendNotification(
      appointment.doctorName,
      `New appointment booked with ${appointment.patientName} on ${appointment.date} at ${appointment.time}`
    );
    return created;
  }

  async listAppointments(): Promise<Appointment[]> {
    return this.repo.getAll();
  }
}
```

✅ **Applies:**

* **SRP:** Only business logic.
* **DIP:** Depends on `INotificationService` abstraction.
* **OCP:** Easy to extend notification type (Email → SMS → Push).
* **LSP:** Any `INotificationService` can replace another.

---

# 🧩 Step 5: Controller Layer (`controllers/appointment.controller.ts`)

```ts
import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { EmailNotificationService } from "../services/notification/email.notification";
// import { SMSNotificationService } from "../services/notification/sms.notification"; // optional

const repo = new AppointmentRepository();
const notifier = new EmailNotificationService(); // DIP: can switch to SMS
const service = new AppointmentService(repo, notifier);

export class AppointmentController {
  async create(req: Request, res: Response) {
    const appointment = await service.bookAppointment(req.body);
    res.json({ success: true, appointment });
  }

  async list(req: Request, res: Response) {
    const appointments = await service.listAppointments();
    res.json(appointments);
  }
}
```

✅ **Applies:**

* **SRP:** Only handles HTTP interaction.
* **OCP:** Swap Email → SMS easily without changing logic.
* **DIP:** Injected dependencies.

---

# 🧩 Step 6: Express App Setup (`app.ts`)

```ts
import express from "express";
import bodyParser from "body-parser";
import { AppointmentController } from "./controllers/appointment.controller";

const app = express();
const controller = new AppointmentController();

app.use(bodyParser.json());

app.post("/appointments", (req, res) => controller.create(req, res));
app.get("/appointments", (req, res) => controller.list(req, res));

export default app;
```

---

# 🧩 Step 7: Start Server (`server.ts`)

```ts
import app from "./app";

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

# 🧪 Test Run (Example)

**POST** `/appointments`

```json
{
  "id": "1",
  "patientName": "Aasif",
  "doctorName": "Dr. Iqbal",
  "date": "2025-10-20",
  "time": "10:30 AM"
}
```

✅ Console Output:

```
📧 Email sent to Dr. Iqbal: New appointment booked with Aasif on 2025-10-20 at 10:30 AM
```

✅ Response:

```json
{
  "success": true,
  "appointment": {
    "id": "1",
    "patientName": "Aasif",
    "doctorName": "Dr. Iqbal",
    "date": "2025-10-20",
    "time": "10:30 AM"
  }
}
```

---

# 🔥 Recap: Where Each SOLID Principle Is Applied

| Principle                     | Applied In                                                  | Explanation                       |
| ----------------------------- | ----------------------------------------------------------- | --------------------------------- |
| **S (Single Responsibility)** | Each class (Controller, Service, Repo)                      | One job per class                 |
| **O (Open/Closed)**           | Notification system                                         | Add new types (Email, SMS) easily |
| **L (Liskov Substitution)**   | Notification subclasses                                     | Any notification type works       |
| **I (Interface Segregation)** | Separate interfaces for Appointment & Notification          | Focused contracts                 |
| **D (Dependency Inversion)**  | AppointmentService depends on interface, not implementation | Loose coupling                    |

---

# 🧱 Benefits

✅ Extensible (e.g., add WhatsAppNotification easily)
✅ Testable (mock INotificationService in unit tests)
✅ Reusable (Appointment logic can be used across services)
✅ Maintainable (each layer changes independently)

---

Would you like me to extend this to show **how to add a new feature (e.g., WhatsAppNotification)** *without touching* the existing code — proving Open/Closed principle in action?

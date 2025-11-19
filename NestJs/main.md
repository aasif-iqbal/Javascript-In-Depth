
https://github.com/gasangw/NestJS-Interview-Questions-And-Answers

`Here’s a **comprehensive list of NestJS interview questions and answers** — from beginner to advanced — covering core concepts, architecture, decorators, lifecycle, and advanced topics like interceptors, guards, microservices, and testing.
`
---

## 🟢 **Beginner-Level Questions**

### 1. **What is NestJS?**

**Answer:**
NestJS is a progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.
It uses **TypeScript by default** and is heavily inspired by **Angular’s architecture**, focusing on **modularity, dependency injection, and decorators**.

---

### 2. **What are the main features of NestJS?**

**Answer:**

* Built with TypeScript
* Uses **Dependency Injection (DI)**
* **Modular architecture** (modules, controllers, services)
* Supports **MVC** pattern
* Built-in **exception filters, guards, interceptors, and pipes**
* Integrates with **Express** or **Fastify**
* **Microservices** and **GraphQL** support out of the box

---

### 3. **What is a Module in NestJS?**

**Answer:**
A **module** is a class annotated with `@Module()` decorator. It organizes related code like controllers and providers into a single unit.

**Example:**

```typescript
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

---

### 4. **What is a Controller in NestJS?**

**Answer:**
Controllers handle **incoming HTTP requests** and return **responses** to the client.
They are decorated with `@Controller()`.

**Example:**

```typescript
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}
```

---

### 5. **What is a Provider in NestJS?**

**Answer:**
Providers (mainly services) are classes that can be **injected** into other classes.
They are marked with `@Injectable()` decorator.

**Example:**

```typescript
@Injectable()
export class UserService {
  getUsers() {
    return ['John', 'Doe'];
  }
}
```

---

### 6. **What is Dependency Injection in NestJS?**

**Answer:**
Dependency Injection (DI) is a **design pattern** where the framework **injects dependencies** (like services) into classes instead of creating them manually.
NestJS’s DI system uses TypeScript’s metadata and decorators to manage dependencies automatically.

---

### 7. **What is a Decorator in NestJS?**

**Answer:**
Decorators are **functions that add metadata** to classes, methods, or properties.
Examples include:

* `@Controller()`
* `@Get()`, `@Post()`
* `@Injectable()`
* `@Module()`
* `@Body()`, `@Param()`

---

## 🟡 **Intermediate-Level Questions**

### 8. **What are Pipes in NestJS?**

**Answer:**
Pipes are used to **transform** or **validate** incoming data before it reaches the route handler.

**Example:**

```typescript
@Post()
createUser(@Body(new ValidationPipe()) userData: CreateUserDto) {
  return this.userService.create(userData);
}
```

---

### 9. **What are Guards in NestJS?**

**Answer:**
Guards determine whether a request should be handled by a route or not.
They are mainly used for **authentication and authorization**.

**Example:**

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return req.headers.authorization === 'Bearer token';
  }
}
```

---

### 10. **What are Interceptors in NestJS?**

**Answer:**
Interceptors are used for **transforming responses**, **logging**, **caching**, or **error handling**.
They work like middleware but are more powerful.

**Example:**

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Before...');
    return next.handle().pipe(tap(() => console.log('After...')));
  }
}
```

---

### 11. **What are Filters in NestJS?**

**Answer:**
Filters handle **exceptions** thrown during request processing.

**Example:**

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(exception.getStatus()).json({
      message: exception.message,
      statusCode: exception.getStatus(),
    });
  }
}
```

---

### 12. **What is Middleware in NestJS?**

**Answer:**
Middleware is a function executed **before** route handlers.
It can modify the request or response objects.

**Example:**

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... ${req.method} ${req.url}`);
    next();
  }
}
```

---

### 13. **Explain the Lifecycle of a NestJS Application.**

**Answer:**

1. **Bootstrap phase** – `main.ts` runs and creates a Nest application.
2. **Module initialization** – root and imported modules are loaded.
3. **Dependency injection** – providers are resolved and instantiated.
4. **Middleware execution** – before route handling.
5. **Guards** – authorize request.
6. **Interceptors** – preprocess and postprocess data.
7. **Pipes** – validate and transform data.
8. **Controller/Handler** – business logic runs.
9. **Exception filters** – handle thrown errors.

---

### 14. **What are DTOs (Data Transfer Objects)?**

**Answer:**
DTOs define the **shape of data** sent between client and server.

**Example:**

```typescript
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

---

### 15. **How do you connect NestJS with a Database (like MongoDB or MySQL)?**

**Answer:**
Use modules like:

* `@nestjs/mongoose` for MongoDB
* `@nestjs/typeorm` for SQL databases

**Example (MongoDB):**

```typescript
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
```

---

## 🔴 **Advanced-Level Questions**

### 16. **How to handle global exceptions in NestJS?**

**Answer:**
You can use a **Global Filter** or **built-in exception handler**.

**Example:**

```typescript
app.useGlobalFilters(new HttpExceptionFilter());
```

---

### 17. **What is the difference between Middleware, Guard, and Interceptor?**

| Feature     | Middleware              | Guard                 | Interceptor            |
| ----------- | ----------------------- | --------------------- | ---------------------- |
| Runs before | Controller              | Route handler         | Before & after handler |
| Purpose     | Modify request/response | Auth & access control | Transform/log data     |
| Scope       | Global or per route     | Per route             | Per route/global       |

---

### 18. **How to use environment variables in NestJS?**

**Answer:**
Use `@nestjs/config` module.

```typescript
@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

Then use:

```typescript
constructor(private config: ConfigService) {
  console.log(config.get('DATABASE_URL'));
}
```

---

### 19. **How to implement caching in NestJS?**

**Answer:**
Use built-in `CacheModule`.

```typescript
@Module({
  imports: [CacheModule.register()],
})
export class AppModule {}
```

---

### 20. **How to test a NestJS application?**

**Answer:**
NestJS uses **Jest** by default.

**Example Unit Test:**

```typescript
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

---

### 21. **What are Microservices in NestJS?**

**Answer:**
Microservices in NestJS allow distributed systems using **message-based communication** with transport layers like:

* TCP
* Redis
* Kafka
* MQTT
* RabbitMQ

---

### 22. **How do you create a custom decorator in NestJS?**

**Answer:**
Custom decorators add reusable metadata logic.

**Example:**

```typescript
export const User = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
```

---

### 23. **What is the difference between `@Inject()` and `@Injectable()`?**

**Answer:**

* `@Injectable()` → Marks a class as a provider that can be injected.
* `@Inject()` → Manually injects a specific provider or token.

---

### 24. **What is the difference between Express and Fastify in NestJS?**

**Answer:**

| Feature   | Express | Fastify  |
| --------- | ------- | -------- |
| Speed     | Slower  | Faster   |
| Ecosystem | Mature  | Newer    |
| Default   | Yes     | Optional |

You can switch with:

```typescript
NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
```

---

### 25. **What are the best practices in NestJS?**

**Answer:**

* Use **DTOs** and **ValidationPipe**
* Implement **Global Exception Filters**
* Organize code using **modules**
* Use **environment variables**
* Add **unit and e2e tests**
* Keep **services stateless**
* Use **async/await** and **RxJS** where necessary

---

Would you like me to prepare this as a **PDF or a categorized sheet** (e.g., Beginner / Intermediate / Advanced) for interview revision?

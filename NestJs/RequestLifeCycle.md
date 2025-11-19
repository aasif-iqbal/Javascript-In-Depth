### Request Lifecycle
[Official - NestJs Request Lifecycle](https://docs.nestjs.com/faq/request-lifecycle)

- This describes the sequence of events that occur when a single HTTP request is received by the NestJS application until a response is sent back to the client. The general flow is as follows:

1. Request Initialization: The incoming request hits the NestJS application.

2. Middleware: Global, module-level, or route-level middleware functions are executed for tasks like logging, authentication, or request modification.

3. Guards: Guards are applied to determine if the request should be allowed to proceed based on authorization or other conditions.

4. Interceptors (Pre-Processing): Interceptors can transform the request before it reaches the route handler or add pre-processing logic.

5. Pipes: Pipes are used for validation and transformation of request data (e.g., query parameters, body payload).

6. Controller Handling: The appropriate controller method is invoked to handle the request logic.

7. Service Layer Execution: The controller typically delegates business logic to services.

8. Interceptors (Post-Processing): Interceptors can transform the response before it is sent back to the client or add post-processing logic.

9. Exception Filters: If any uncaught exceptions occur during the request processing, exception filters are triggered to handle them and format the error response.

10. Response: The final response is sent back to the client.
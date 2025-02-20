## Microservices

Microservices architecture is a software development approach where an application is built as a collection of small, loosely coupled, independently deployable services. Each service is focused on a specific business capability and communicates with other services through well-defined APIs. This architecture contrasts with monolithic architectures, where all components are tightly integrated into a single application.

### Key Characteristics of Microservices
1. **Modularity**: Each microservice is a discrete unit that performs a specific function, such as user management, payment processing, or order handling.
2. **Independent Deployment**: Services can be developed, deployed, and scaled independently without impacting the entire application.
3. **Technology Diversity**: Teams can use different programming languages, frameworks, or databases for different microservices based on the specific requirements of each.
4. **Decentralized Data Management**: Each microservice manages its own database or data source, ensuring loose coupling and independent scalability.
5. **Resilience**: Failures in one service are isolated and do not bring down the entire system.
6. **Communication**: Services typically communicate via lightweight protocols like REST, gRPC, or messaging systems like RabbitMQ, Kafka, or AWS SQS.

### How Microservices Work
1. **Service Decomposition**:
   - The application is broken into distinct services based on business domains or functionalities, such as authentication, billing, or notifications.

2. **API Communication**:
   - Microservices communicate with each other through APIs.
   - Synchronous communication: Using HTTP/HTTPS with REST or gRPC.
   - Asynchronous communication: Using message brokers (e.g., RabbitMQ, Kafka).

3. **Independent Development**:
   - Each microservice is developed by a dedicated team.
   - Teams can use Agile and DevOps methodologies to build, test, and deploy services.

4. **Deployment**:
   - Services are deployed independently in containers (e.g., Docker) or on cloud platforms using Kubernetes or other orchestration tools.

5. **Service Discovery**:
   - Services register themselves with a service registry (e.g., Consul, Eureka), enabling dynamic discovery by other services.

6. **Load Balancing and Scaling**:
   - Microservices are scaled horizontally based on demand, ensuring efficient use of resources.
   - Load balancers distribute requests to available service instances.

7. **Monitoring and Logging**:
   - Tools like Prometheus, Grafana, or ELK Stack (Elasticsearch, Logstash, Kibana) are used to monitor and log the health, performance, and usage of microservices.

### Benefits of Microservices Architecture
1. **Scalability**: Services can be scaled independently based on demand.
2. **Flexibility**: Teams can adopt the best tools and technologies for each service.
3. **Faster Development**: Parallel development enables faster release cycles.
4. **Resilience**: Isolated failures prevent a cascading system-wide failure.
5. **Improved Maintainability**: Smaller codebases are easier to understand, test, and update.

### Challenges of Microservices
1. **Complexity**: Managing multiple services, their dependencies, and communication can be complex.
2. **Deployment Overhead**: Increased number of deployments requires sophisticated CI/CD pipelines.
3. **Data Consistency**: Ensuring consistency across distributed data sources can be challenging.
4. **Latency and Network Issues**: Communication between services introduces network overhead and potential latency.
5. **Monitoring and Debugging**: Tracking issues across multiple services requires advanced monitoring and tracing tools.

Microservices architecture is widely adopted in large-scale applications where flexibility, scalability, and resilience are critical. Examples include Netflix, Amazon, and Spotify.

## How to build simple microservice
[Build Microservice architecture using Node js, MongoDB, Postgresql, Expressjs, JWT](https://www.youtube.com/watch?v=w3iXACKB_wQ&t=4156s)


[Flow-diagram](https://whimsical.com/nodejs-microservice-with-sls-U8x7rhE232reoZEVhH6RrR)
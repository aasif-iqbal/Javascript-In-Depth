# Docker
### **What is Docker?**
Docker is an **open-source platform** that allows developers to automate the deployment, scaling, and management of applications using **containers**. Containers are lightweight, portable, and run the same way across different environments.

---

## **🔹 Why Use Docker?**
1. **Portability:** Works the same on any machine (local, server, cloud).
2. **Lightweight:** Uses less memory compared to virtual machines.
3. **Faster Deployment:** Containers start in seconds.
4. **Scalability:** Easily scale up or down using container orchestration tools like **Docker Swarm** or **Kubernetes**.
5. **Dependency Management:** Packages all dependencies in a container.

---

## **🔹 How Docker Works**
Docker uses a **client-server architecture**:
- **Docker Client** (`docker CLI`): Used to interact with the Docker daemon.
- **Docker Daemon** (`dockerd`): Manages images, containers, and networks.
- **Docker Hub:** A registry for storing and sharing Docker images.

---

## **🔹 Key Docker Components**
1. **Docker Image:** A blueprint of the application (like a snapshot).
2. **Docker Container:** A running instance of an image.
3. **Dockerfile:** A script that defines how to build an image.
4. **Docker Compose:** A tool to manage multi-container applications using `docker-compose.yml`.
5. **Docker Volumes:** Persistent storage for containers.

---

## **🔹 Basic Docker Commands**
### **1️⃣ Install Docker**
For Ubuntu:
```sh
sudo apt update
sudo apt install docker.io -y
```

For Mac/Windows, download from [Docker’s official site](https://www.docker.com/get-started/).

### **2️⃣ Check Docker Version**
```sh
docker --version
```

### **3️⃣ Run a Container (Example: Nginx)**
```sh
docker run -d -p 8080:80 nginx
```
- `-d` → Run in detached mode (background).
- `-p 8080:80` → Map container port 80 to local port 8080.
- `nginx` → Official Nginx image.

### **4️⃣ List Running Containers**
```sh
docker ps
```

### **5️⃣ Stop a Running Container**
```sh
docker stop <container_id>
```

### **6️⃣ Remove a Container**
```sh
docker rm <container_id>
```

### **7️⃣ Build an Image from a Dockerfile**
```sh
docker build -t my-app .
```

### **8️⃣ Push Image to Docker Hub**
```sh
docker login
docker tag my-app username/my-app
docker push username/my-app
```

---

## **🔹 Docker vs Virtual Machines (VMs)**
| Feature         | Docker Containers | Virtual Machines (VMs) |
|---------------|-----------------|-----------------|
| Boot Time | Seconds | Minutes |
| Performance | Faster | Slower |
| Size | Lightweight | Heavy |
| Isolation | Process-Level | Full OS-Level |
| Portability | High | Limited |

---

## **🔹 Where is Docker Used?**
- **DevOps & CI/CD Pipelines** (Jenkins, GitHub Actions)
- **Microservices Deployment**
- **Cloud Applications** (AWS, Azure, GCP)
- **Local Development Environments**
- **Big Data & AI Model Deployment**

---

## **🔹 Next Steps**
🚀 Since you’re working on a **Node.js** project and AWS deployment, you can start by:
1. **Containerizing your Node.js app** using a `Dockerfile`.
2. **Using Docker Compose** for multi-container setup (e.g., Node.js + MongoDB).
3. **Deploying on AWS** using **ECS, EKS, or EC2**.

Would you like a hands-on example of **containerizing a Node.js app**? 🚀

## Sources

[Docker - Piyush - 1st Video](https://www.youtube.com/watch?v=31k6AtW-b3Y&t=2902s)
[Docker - Piyush - 2nd Video](https://www.youtube.com/watch?v=xPT8mXa-sJg)

[Docker - Piyush - Image Optimization](https://www.youtube.com/watch?v=hX2UAHhX8E8)

https://app.eraser.io/workspace/yTPql82lXyOpbyX63Xgn

[Docker-aws](https://www.youtube.com/watch?v=AiiFbsAlLaI&t=24s)


## How to see all images in docker

```sh
docker images
or
sudo docker images
```

## Run the container

```sh
docker run -d -p 4000:3000 my-node-app
```
## Check running containers

```sh   
docker ps
```

# Docker Interview Questions
### **🔥 Top Docker Interview Questions & Answers**  
Here’s a **comprehensive list** of **Docker** interview questions based on **fundamentals, advanced topics, and real-world use cases**.  

---

## **🔹 Basic Docker Questions**
### **1️⃣ What is Docker?**
**Answer:**  
Docker is an **open-source containerization platform** that allows developers to package applications and their dependencies into **lightweight, portable containers** that run consistently across different environments.

### **2️⃣ What are Docker containers?**
**Answer:**  
A Docker **container** is a lightweight, standalone executable package that includes everything needed to run a piece of software, including **code, runtime, system tools, libraries, and dependencies**.

### **3️⃣ What is the difference between a container and a virtual machine (VM)?**  
| Feature       | Docker Container | Virtual Machine |
|--------------|----------------|----------------|
| **Size**     | Lightweight (MBs) | Heavy (GBs) |
| **Boot Time** | Seconds | Minutes |
| **Resource Usage** | Shares host OS | Includes Guest OS |
| **Performance** | Faster | Slower |
| **Isolation** | Process-level | Full OS-level |

---

## **🔹 Docker Images & Containers**
### **4️⃣ What is a Docker image?**
**Answer:**  
A **Docker image** is a **blueprint** for creating containers. It contains the application code, libraries, dependencies, and configurations.

### **5️⃣ How do you create a Docker image?**
**Answer:**  
Using a **Dockerfile**, you can build an image with:  
```sh
docker build -t my-image .
```

### **6️⃣ How do you run a container from an image?**
**Answer:**  
```sh
docker run -d -p 4000:3000 my-image
```
- `-d`: Runs in detached mode  
- `-p`: Maps ports (Host:Container)  

### **7️⃣ How do you list running containers?**
```sh
docker ps
```
To list **all** containers (including stopped ones):  
```sh
docker ps -a
```

### **8️⃣ How do you stop and remove a container?**
```sh
docker stop <container_id>
docker rm <container_id>
```

---

## **🔹 Docker Networking**
### **9️⃣ What are Docker networking modes?**
| Mode        | Description |
|------------|-------------|
| **Bridge**  | Default mode; connects containers to the host via NAT |
| **Host**    | Shares host network stack directly |
| **None**    | No network interface |
| **Overlay** | Used in Swarm mode for multi-host networking |

### **🔟 How do you connect containers using a network?**
```sh
docker network create my-network
docker network connect my-network container1
docker network connect my-network container2
```

---

## **🔹 Docker Volumes & Data Management**
### **1️⃣1️⃣ What are Docker volumes?**
**Answer:**  
Volumes are **persistent storage** for containers that survive even when a container is removed.

### **1️⃣2️⃣ How do you create and mount a volume?**
```sh
docker volume create my-volume
docker run -v my-volume:/app/data my-container
```

---

## **🔹 Docker Compose**
### **1️⃣3️⃣ What is Docker Compose?**
**Answer:**  
Docker Compose is a tool to define and run multi-container Docker applications using a `docker-compose.yml` file.

### **1️⃣4️⃣ How do you start services using Docker Compose?**
```sh
docker-compose up -d
```
- `-d`: Runs in detached mode  

### **1️⃣5️⃣ How do you stop and remove all services?**
```sh
docker-compose down
```

---

## **🔹 Docker Swarm & Kubernetes**
### **1️⃣6️⃣ What is Docker Swarm?**
**Answer:**  
Docker Swarm is Docker's **native orchestration tool** that manages **clustering** and **scaling** of containers.

### **1️⃣7️⃣ What is Kubernetes, and how is it different from Docker Swarm?**
| Feature       | Docker Swarm | Kubernetes |
|--------------|-------------|------------|
| **Complexity** | Simple | More Complex |
| **Scalability** | Limited | Highly Scalable |
| **Load Balancing** | Basic | Advanced |

### **1️⃣8️⃣ What is the difference between Docker and Kubernetes?**
**Docker** is a containerization platform, while **Kubernetes** is a **container orchestration tool** that manages and scales containers.

---

## **🔹 Advanced Docker Questions**
### **1️⃣9️⃣ How do you optimize a Docker image size?**
1. Use a **smaller base image** (`alpine` instead of `ubuntu`):
   ```dockerfile
   FROM node:18-alpine
   ```
2. Use **multi-stage builds** to remove unnecessary dependencies.
3. Clean up temporary files using:
   ```dockerfile
   RUN apt-get clean && rm -rf /var/lib/apt/lists/*
   ```

### **2️⃣0️⃣ What is a multi-stage build in Docker?**
**Answer:**  
Multi-stage builds allow using multiple `FROM` statements in a Dockerfile to **reduce the final image size**.

Example:
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package.json .  
RUN npm install

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "server.js"]
```

---

## **🔹 Debugging & Security**
### **2️⃣1️⃣ How do you check container logs?**
```sh
docker logs <container_id>
```

### **2️⃣2️⃣ How do you access a running container’s shell?**
```sh
docker exec -it <container_id> /bin/sh
```

### **2️⃣3️⃣ How do you secure Docker containers?**
- Use **minimal base images** (`alpine`, `scratch`).
- Run as a **non-root user**:
  ```dockerfile
  RUN adduser -D appuser
  USER appuser
  ```
- Scan for vulnerabilities with:
  ```sh
  docker scan my-image
  ```

---

## **🔹 Real-World Scenario-Based Questions**
### **2️⃣4️⃣ If your Docker container keeps restarting, how do you debug it?**
1. Check logs:  
   ```sh
   docker logs <container_id>
   ```
2. Inspect container:  
   ```sh
   docker inspect <container_id>
   ```
3. Run in interactive mode:
   ```sh
   docker run -it my-image /bin/sh
   ```

### **2️⃣5️⃣ How would you deploy a Node.js app using Docker in production?**
1. Create a **Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package.json .  
   RUN npm install
   COPY . .
   CMD ["node", "index.js"]
   ```
2. Build the image:
   ```sh
   docker build -t my-node-app .
   ```
3. Run it:
   ```sh
   docker run -d -p 4000:3000 my-node-app
   ```

---

### **💡 Pro Tip: Be Ready for Hands-on Tasks!**
Interviewers may ask you to:
✅ Write a Dockerfile  
✅ Debug a broken container  
✅ Deploy a multi-container app with Docker Compose  

 
 # Docker - Termology
 ### **🔹 Docker Terminologies Cheat Sheet 🚀**  
Here’s a **comprehensive list** of all key **Docker terms** you need to know!  

---

## **1️⃣ Core Docker Concepts**
| **Term**       | **Description** |
|---------------|---------------|
| **Docker** | A platform for **containerizing applications**. |
| **Container** | A lightweight, standalone executable that **packages applications and dependencies**. |
| **Docker Image** | A **blueprint** for creating Docker containers. |
| **Dockerfile** | A **script** that contains a set of instructions to **build a Docker image**. |
| **Docker Hub** | A **public repository** for storing and sharing Docker images. |
| **Registry** | A storage system for Docker images (e.g., **Docker Hub, AWS ECR, Google Container Registry**). |
| **Repository** | A collection of **different versions** of a Docker image. |

---

## **2️⃣ Docker Image & Container Management**
| **Term**        | **Description** |
|---------------|----------------|
| **Base Image** | The **starting point** for creating a new image (e.g., `node:18`, `ubuntu`). |
| **Layer** | Each command in a Dockerfile creates a **new layer** in the image. |
| **Tag** | A label assigned to a Docker image (e.g., `node:18-alpine`). |
| **Pull** | Downloading an image from a registry:  `docker pull node:18`. |
| **Push** | Uploading an image to a registry: `docker push my-image`. |
| **Run** | Creating and starting a container: `docker run my-image`. |
| **Exec** | Running a command inside a running container: `docker exec -it my-container bash`. |
| **Logs** | Viewing container logs: `docker logs my-container`. |

---

## **3️⃣ Docker Networking**
| **Term**         | **Description** |
|-----------------|----------------|
| **Bridge Network** | Default network mode, connects containers via a virtual network. |
| **Host Network** | Uses the host’s network stack (faster but less isolated). |
| **None Network** | Completely disables networking. |
| **Overlay Network** | Used in **Docker Swarm** to connect containers across multiple hosts. |
| **Port Mapping** | Maps a container port to a host port: `-p 8080:3000`. |

---

## **4️⃣ Docker Volumes & Data Management**
| **Term**       | **Description** |
|--------------|----------------|
| **Volume** | Persistent storage for Docker containers (survives restarts). |
| **Bind Mount** | Directly mounts a **host directory** into a container. |
| **Anonymous Volume** | A temporary volume that is removed when the container stops. |
| **Named Volume** | A persistent volume that can be reused by multiple containers. |
| **TMPFS Mount** | A memory-backed temporary filesystem. |

---

## **5️⃣ Docker Compose**
| **Term**       | **Description** |
|--------------|----------------|
| **Docker Compose** | A tool to manage **multi-container applications** with a `docker-compose.yml` file. |
| **Service** | A container running inside **Docker Compose**. |
| **Scale** | Running multiple instances of a service: `docker-compose up --scale app=3`. |
| **Override File** | Additional configuration files to modify `docker-compose.yml`. |

---

## **6️⃣ Docker Orchestration (Docker Swarm & Kubernetes)**
| **Term**       | **Description** |
|--------------|----------------|
| **Docker Swarm** | Docker’s native clustering and orchestration tool. |
| **Kubernetes** | A **container orchestration platform** for managing and scaling containers. |
| **Swarm Node** | A machine participating in a **Docker Swarm** cluster. |
| **Manager Node** | Controls the **Swarm cluster** and schedules tasks. |
| **Worker Node** | Executes tasks assigned by the **manager node**. |
| **Service** | A task definition that runs in **Swarm mode**. |
| **Stack** | A collection of services deployed together. |
| **Ingress Networking** | Enables containers to communicate in **Swarm mode**. |

---

## **7️⃣ Docker Security & Optimization**
| **Term**         | **Description** |
|---------------|----------------|
| **Dockerfile Best Practices** | Writing optimized Dockerfiles to reduce image size and improve security. |
| **Non-Root User** | Running containers as a **non-root user** for security. |
| **Multi-Stage Build** | Using multiple `FROM` statements in Dockerfile to reduce image size. |
| **Scanning Images** | `docker scan` to check for vulnerabilities. |
| **Seccomp Profiles** | Security profiles restricting system calls in containers. |

---

## **8️⃣ Docker CLI Commands**
| **Command** | **Description** |
|------------|----------------|
| `docker build -t my-image .` | Builds a Docker image. |
| `docker run -d -p 4000:3000 my-image` | Runs a container in detached mode. |
| `docker ps` | Lists running containers. |
| `docker logs my-container` | Shows container logs. |
| `docker stop my-container` | Stops a running container. |
| `docker rm my-container` | Removes a stopped container. |
| `docker rmi my-image` | Removes a Docker image. |
| `docker network ls` | Lists all Docker networks. |
| `docker volume ls` | Lists all Docker volumes. |

---

### **💡 Pro Tip:**
✅ **Master these terms** to confidently answer any **Docker interview question!**  
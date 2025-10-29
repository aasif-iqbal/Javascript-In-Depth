Below is a **battle-tested, production-ready workflow** for deploying a Node.js application.  
It works whether you run on a single VM, a Kubernetes cluster, or a serverless platform.

---

## 1. Core Principles (never skip these)

| Principle | Why it matters |
|-----------|----------------|
| **Git-based source control** | Every deploy is traceable. |
| **CI/CD pipeline** | Automates testing & linting → no “it works on my machine”. |
| **Immutable artifacts** | Docker images / tarballs that never change after build. |
| **Zero-downtime rollout** | Rolling updates, blue-green, or canary. |
| **Rollback plan** | One click to previous version. |

---

## 2. Repository Layout (example)

```
my-app/
├─ src/                # Node.js source
├─ test/               # Jest / Mocha tests
├─ Dockerfile          # ← build stage
├─ .github/workflows/ci.yml   # GitHub Actions
├─ k8s/                # optional Helm chart / manifests
└─ package.json
```

---

## 3. CI Pipeline (GitHub Actions – adapt to GitLab, CircleCI, etc.)

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci --production

      # Build Docker image
      - name: Build image
        run: |
          docker build -t ghcr.io/${{github.repository}}:${{github.sha}} .
      - name: Push to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{github.actor}}
          password: ${{secrets.GITHUB_TOKEN}}
      - run: docker push ghcr.io/${{github.repository}}:${{github.sha}}
```

**Key points**

* `npm ci` → reproducible `node_modules`.  
* Image tag = commit SHA → immutable.  
* Only `main` branch triggers a push.

---

## 4. CD – Choose Your Target

### A. Bare-metal / VM (PM2 + systemd)

```bash
# On the server
git pull
npm ci --production
pm2 reload ecosystem.config.js --env production
```

**Zero-downtime**: PM2 cluster mode restarts one instance at a time.

---

### B. Docker Compose (single host)

```yaml
# docker-compose.yml
services:
  app:
    image: ghcr.io/yourorg/my-app:${SHA}
    restart: unless-stopped
    ports: ["3000:3000"]
```

Deploy:

```bash
export SHA=$(git rev-parse HEAD)
docker compose pull app
docker compose up -d app
```

---

### C. Kubernetes (recommended for scale)

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
        - name: app
          image: ghcr.io/yourorg/my-app:${SHA}
          ports: [{ containerPort: 3000 }]
          envFrom:
            - secretRef: { name: app-secrets }
```

Deploy:

```bash
export SHA=$(git rev-parse HEAD)
kubectl set image deployment/my-app app=ghcr.io/yourorg/my-app:${SHA} --record
kubectl rollout status deployment/my-app
```

**Rollback**

```bash
kubectl rollout undo deployment/my-app
```

---

### D. Serverless (Vercel, AWS Lambda, Cloudflare Workers)

```bash
vercel --prod   # Vercel detects package.json → Node.js
```

or

```bash
serverless deploy   # serverless framework
```

---

## 5. Post-Deploy Checks

```bash
# Health endpoint
curl -f https://api.example.com/healthz

# Smoke test
npm run smoke-test
```

Hook them into the pipeline (`post-deploy` job) or into Kubernetes `readinessProbe`.

---

## 6. Full Example Script (one-liner for VM)

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO="git@github.com:yourorg/my-app.git"
DIR="/opt/my-app"

cd "$DIR"
git fetch --tags
git checkout $(git rev-list --tags --max-count=1)   # latest tag
npm ci --production
pm2 reload ecosystem.config.js --env production

echo "Deployed $(git describe --tags)"
```

---

## TL;DR Checklist

1. **Push to `main` → CI runs tests → builds Docker image tagged with commit SHA.**  
2. **CD pulls the exact image and rolls it out** (PM2, Docker Compose, K8s, serverless).  
3. **Verify health endpoint** → done.  
4. **Rollback = redeploy previous SHA** (or `kubectl rollout undo`).

Adapt the target (VM, K8s, serverless) but **never skip the immutable artifact + automated pipeline**—that’s what makes Node.js deploys reliable at scale.
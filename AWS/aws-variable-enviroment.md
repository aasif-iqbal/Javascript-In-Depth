## Variables in AWS Lambda.

Managing **variables in AWS Lambda** means controlling configuration values like database credentials, API keys, environment modes, and URLs — **securely and efficiently**.

Let’s go step-by-step through **how to manage environment variables in AWS Lambda (production-grade way)** 👇

---

## ⚙️ 1. What Are Lambda Environment Variables?

Environment variables are **key–value pairs** you define in Lambda that your function can access at runtime (e.g., `process.env.DB_URI`).

These can store:

* Database connection strings
* API base URLs
* Secrets (not recommended — use AWS Secrets Manager)
* Feature flags
* Environment identifiers (`NODE_ENV=production`)

---

## 🧩 2. Ways to Manage Variables

| Method                                   | Use Case                     | Security  |
| ---------------------------------------- | ---------------------------- | --------- |
| **Lambda Console / CLI**                 | Simple use (manual)          | Basic     |
| **AWS CLI / SDK**                        | Scripted deployments         | Medium    |
| **Serverless Framework**                 | Infrastructure as code       | High      |
| **AWS CloudFormation / CDK / Terraform** | Automated infrastructure     | High      |
| **AWS Systems Manager Parameter Store**  | Secure config storage        | High      |
| **AWS Secrets Manager**                  | Secure sensitive credentials | Very High |

---

## 🔐 3. Accessing Environment Variables in Node.js

In your Lambda handler:

```js
export const handler = async (event) => {
  const dbUri = process.env.DB_URI;
  const env = process.env.NODE_ENV || "development";

  console.log(`Running in ${env} mode`);
  console.log(`Database URI: ${dbUri}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ env }),
  };
};
```

---

## 🧰 4. Setting Environment Variables

### ✅ (a) Using AWS Console

1. Go to **AWS Lambda > Your Function > Configuration > Environment variables**
2. Add key–value pairs like:

   ```
   NODE_ENV = production
   DB_URI = mongodb+srv://user:pass@cluster/db
   JWT_SECRET = supersecretkey
   ```

---

### ✅ (b) Using AWS CLI

```bash
aws lambda update-function-configuration \
  --function-name MyLambdaFunction \
  --environment "Variables={NODE_ENV=production,DB_URI=mongodb+srv://...,JWT_SECRET=supersecret}"
```

Verify:

```bash
aws lambda get-function-configuration --function-name MyLambdaFunction
```

---

### ✅ (c) Using Serverless Framework (Recommended for Teams)

`serverless.yml`

```yaml
service: bookmydoc-api
provider:
  name: aws
  runtime: nodejs20.x
  environment:
    NODE_ENV: production
    DB_URI: ${ssm:/bookmydoc/db-uri}
    JWT_SECRET: ${ssm:/bookmydoc/jwt-secret}
```

Then deploy:

```bash
sls deploy
```

---

## 🧠 5. For Secrets → Use **Parameter Store or Secrets Manager**

### 🔸 AWS Systems Manager Parameter Store

For non-critical configs (DB URIs, API URLs)

```bash
aws ssm put-parameter \
  --name "/bookmydoc/db-uri" \
  --value "mongodb+srv://user:pass@cluster/db" \
  --type "SecureString"
```

Access in code:

```js
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient();

export const handler = async () => {
  const param = await ssm.send(
    new GetParameterCommand({ Name: "/bookmydoc/db-uri", WithDecryption: true })
  );
  console.log("DB_URI:", param.Parameter.Value);
};
```

---

### 🔸 AWS Secrets Manager

For sensitive credentials (tokens, passwords)

```bash
aws secretsmanager create-secret \
  --name "bookmydoc/DBCredentials" \
  --secret-string '{"username":"admin","password":"StrongPass123"}'
```

Access in code:

```js
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient();

export const handler = async () => {
  const data = await client.send(
    new GetSecretValueCommand({ SecretId: "bookmydoc/DBCredentials" })
  );
  const secret = JSON.parse(data.SecretString);
  console.log("DB user:", secret.username);
};
```

---

## 🧩 6. Best Practices for Managing Variables

| Category       | Recommendation                                                        |
| -------------- | --------------------------------------------------------------------- |
| **Security**   | Never store secrets directly in Lambda env vars. Use Secrets Manager. |
| **Versioning** | Use versioned Parameter Store keys (`/myapp/v1/db-uri`).              |
| **Encryption** | Enable KMS encryption for environment variables.                      |
| **IAM Access** | Restrict Lambda role permissions (only read its own secrets).         |
| **Local Dev**  | Use `.env` with dotenv (for local testing).                           |
| **Deployment** | Inject environment variables via IaC (Serverless / Terraform).        |
| **Auditing**   | Use CloudTrail to monitor parameter access.                           |

---

## ⚙️ 7. Example Setup: Secure + Scalable

1. Store database credentials in **AWS Secrets Manager**
2. Store app configs (like `NODE_ENV`, `API_URL`) in **SSM Parameter Store**
3. Lambda retrieves both at cold start and caches them in memory
4. Configuration is versioned and environment-aware:

   ```
   /bookmydoc/dev/db-uri
   /bookmydoc/prod/db-uri
   ```

---

## 🧾 8. Example: Combined Setup

```js
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const ssm = new SSMClient();
const secrets = new SecretsManagerClient();

let cachedConfig;

export const handler = async () => {
  if (!cachedConfig) {
    const [dbUri, secret] = await Promise.all([
      ssm.send(new GetParameterCommand({ Name: "/bookmydoc/prod/db-uri", WithDecryption: true })),
      secrets.send(new GetSecretValueCommand({ SecretId: "bookmydoc/DBCredentials" })),
    ]);

    cachedConfig = {
      dbUri: dbUri.Parameter.Value,
      credentials: JSON.parse(secret.SecretString),
    };
  }

  console.log("Config loaded:", cachedConfig);
  return { statusCode: 200, body: "Config loaded successfully" };
};
```

This way, the config is fetched once and reused (reducing latency).

---

## ✅ 9. Summary

| Goal                    | Solution                         |
| ----------------------- | -------------------------------- |
| Basic configs           | Lambda environment variables     |
| Secure configs          | AWS SSM Parameter Store          |
| Sensitive secrets       | AWS Secrets Manager              |
| Automation              | Serverless Framework / Terraform |
| Local testing           | dotenv `.env` file               |
| Avoid cold-start delays | Cache config after first load    |

---

Would you like me to show how to **integrate Secrets Manager + SSM in a single reusable config loader module** (so all Lambdas share the same code)?
It’s a common production pattern.

If you’re using the **Serverless Framework** with AWS Lambda, you can **manage environment variables** easily through the `serverless.yml` file or via AWS Console/CLI. Here’s a detailed, production-grade guide 👇

---

# if i am using serverless framework then?

## 🧩 **1. Define Environment Variables in `serverless.yml`**

This is the **most common and maintainable** way to manage variables in a Serverless project.

```yaml
service: user-api
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: ap-south-1
  environment:
    NODE_ENV: production
    MONGODB_URI: ${env:MONGODB_URI}
    JWT_SECRET: ${ssm:/myapp/${self:provider.stage}/JWT_SECRET~true}
    LOG_LEVEL: info

functions:
  getUser:
    handler: src/handlers/getUser.handler
    environment:
      FUNCTION_SPECIFIC_VAR: "getUserHandler"
```

### 💡 Notes:

* `${env:VAR_NAME}` → reads from your **local `.env`** file.
* `${ssm:/path/to/param~true}` → reads **securely** from AWS **SSM Parameter Store**.
* You can also use `${ssmSecure:}` for encrypted secrets.
* `provider.environment` applies to all functions.
* Each `function.environment` overrides/extends provider variables.

---

## 🧾 **2. Use `.env` Files (Local Development Only)**

For local testing with the **Serverless Offline Plugin**:

```
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=devsecret123
```

Then install:

```bash
npm install dotenv
```

And in your code (e.g. `src/config/env.js`):

```js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV || 'development',
};
```

Serverless automatically loads `.env` values if you use `${env:VAR_NAME}` in `serverless.yml`.

---

## 🔐 **3. Use AWS SSM Parameter Store (Recommended for Production)**

Store secrets securely:

```bash
aws ssm put-parameter \
  --name "/myapp/prod/JWT_SECRET" \
  --value "superSecretKey123" \
  --type "SecureString"
```

Then reference in `serverless.yml`:

```yaml
JWT_SECRET: ${ssm:/myapp/${self:provider.stage}/JWT_SECRET~true}
```

This keeps secrets out of code and `.env` files.

---

## 🛠️ **4. Access Variables Inside Lambda**

Once deployed, access environment variables directly in your function:

```js
export const handler = async (event) => {
  const dbURI = process.env.MONGODB_URI;
  const jwtSecret = process.env.JWT_SECRET;
  
  console.log(`Environment: ${process.env.NODE_ENV}`);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Variables loaded successfully" }),
  };
};
```

---

## 🚀 **5. Deployment-Specific Variables**

You can have stage-based configurations:

```yaml
custom:
  stages:
    dev:
      MONGODB_URI: mongodb://localhost:27017/devdb
    prod:
      MONGODB_URI: mongodb+srv://cluster.mongodb.net/proddb

provider:
  environment:
    MONGODB_URI: ${self:custom.stages.${self:provider.stage}.MONGODB_URI}
```

Then deploy:

```bash
sls deploy --stage dev
sls deploy --stage prod
```

---

## ⚙️ **6. Best Practices**

✅ Never hardcode credentials in code
✅ Use **SSM or Secrets Manager** for sensitive values
✅ Use `dotenv` only in local development
✅ Use separate stages for **dev**, **staging**, and **prod**
✅ Use **Serverless Variables Syntax** for dynamic configurations

---

Would you like me to show you a **complete example** `serverless.yml` + `config.js` setup (with SSM + stage-based environments)?

AWS CDK (**Cloud Development Kit**) is a **framework** that lets you define your AWS infrastructure using familiar **programming languages** (TypeScript, JavaScript, Python, Java, C#, Go) instead of manually writing **CloudFormation YAML/JSON templates**.

---

### 📝 **In Simple Words**

Instead of writing long, static configuration files, you write code like this:

```ts
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new s3.Bucket(stack, 'MyBucket', {
  versioned: true,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});
```

Then you run:

```bash
cdk synth   # generates CloudFormation template
cdk deploy  # deploys to AWS
```

---

### 🚀 **Why People Use AWS CDK**

✅ **Faster development:** You use loops, conditionals, and variables like normal code.
✅ **Reusable code:** Create constructs (reusable infrastructure components).
✅ **Infrastructure as Code (IaC):** Version control your infrastructure just like app code.
✅ **Easier maintenance:** No need to manually edit JSON/YAML templates.
✅ **Automatic generation:** CDK synthesizes code → CloudFormation template → deploys.

---

### 🔑 **Key Components**

* **App** → The root of the CDK project.
* **Stack** → Represents a CloudFormation stack (a group of AWS resources).
* **Constructs** → Building blocks (like EC2 instance, S3 bucket, Lambda).
* **cdk synth** → Generates CloudFormation template.
* **cdk deploy** → Deploys resources on AWS.

---

### 📊 **Relation to AWS CloudFormation**

* **CloudFormation** → AWS-native IaC tool that uses JSON/YAML.
* **CDK** → Higher-level abstraction that generates CloudFormation automatically.

So **CDK = Developer-friendly code → generates CloudFormation templates → deploys on AWS.**

---

Would you like me to show you a **real-world Node.js project example** where AWS CDK deploys a REST API (Lambda + API Gateway + DynamoDB)?
This is very popular in interviews and real projects.

# DynamoDB Notes

A simple note-taking app built with Next.js (App Router) and Amazon DynamoDB. It is
the finished, API-connected reference app used in a beginner DynamoDB workshop. Notes
are created, read, updated, and deleted through Next.js route handlers that talk to a
DynamoDB table.

## Prerequisites

- Node.js 20 or newer
- Git
- An AWS account with access to DynamoDB

## Environment variables

Copy `.env.example` to `.env.local` and fill in your real AWS credentials:

```
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
DYNAMODB_TABLE_NAME=Notes
```

`.env.local` is gitignored. These variables are only read on the server (never
exposed to client code).

## DynamoDB table

Create a table in the **ap-southeast-1** region:

- **Table name:** `Notes`
- **Partition key:** `id` (String) — no sort key, no secondary indexes
- **Capacity:** On-demand

Each item stores: `id`, `title`, `content`, `createdAt` (ISO string), and
`updatedAt` (ISO string).

## IAM policy

The access key used above needs permission to read and write the table. Attach this
policy to the corresponding IAM user or role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:ap-southeast-1:*:table/Notes*"
    }
  ]
}
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start adding notes.

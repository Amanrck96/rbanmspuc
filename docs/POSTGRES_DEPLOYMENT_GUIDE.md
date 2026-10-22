# 🐘 PostgreSQL Production Deployment Guide
## Full-Stack Institutional Web Portal & Admissions CRM

This guide provides step-by-step instructions for deploying the **Institutional Web Portal & Admissions CRM** to production using **Vercel** and a hosted **PostgreSQL** database (e.g., Supabase, Neon, AWS RDS, or Vercel Postgres).

---

## 1. Why PostgreSQL for Production?

While SQLite (`prisma/dev.db`) is ideal for rapid local development and demo testing, serverless runtimes (like Vercel Lambda functions) are ephemeral and stateless. 

Running with PostgreSQL gives you:
- **Zero stale data**: Real-time write and read consistency across all serverless instances and counselor sessions.
- **Connection pooling**: Seamlessly handles admission season traffic spikes (thousands of students applying simultaneously).
- **Automated backups**: Daily automated snapshots and point-in-time recovery for student enquiry data.
- **Data sovereignty**: Complete control over your database credentials, schema, and backups.

---

## 2. Recommended Database Providers

| Provider | Free Tier | Production Cost | Highlights |
| :--- | :--- | :--- | :--- |
| **Supabase** | 500 MB DB, 2 projects | \$25/mo (Pro) | Built-in connection pooler (port 6543), daily backups, UI dashboard |
| **Neon Serverless** | 0.5 GB storage | \$19/mo | Instant branching, auto-suspend when idle, built-in connection pooler |
| **Vercel Postgres** | 256 MB storage | Usage-based | Native 1-click integration with Vercel deployments |
| **AWS RDS (t4g.micro)** | 750 hrs (1st yr) | ~\$15-25/mo | Complete enterprise compliance, VPC isolation |

---

## 3. Step-by-Step Setup

### Step A: Provision Database & Obtain Connection String
1. Create a PostgreSQL database on your chosen provider (e.g. Supabase or Neon).
2. Choose AWS Region **ap-south-1 (Mumbai)** or **ap-southeast-1 (Singapore)** for lowest latency to Bengaluru visitors.
3. Obtain your connection strings:
   - **Direct URL**: Used for migrations and seeding (`postgresql://postgres:[PASSWORD]@[HOST]:5432/[DB]`)
   - **Pooled URL**: Used by the Next.js application on Vercel (`postgresql://postgres:[PASSWORD]@[HOST]:6543/[DB]?pgbouncer=true`)

### Step B: Sync Schema & Seed Data
On your local machine or build runner, point `DATABASE_URL` to your PostgreSQL database and run:

```bash
# 1. Push schema to PostgreSQL
npx prisma db push --schema=prisma/schema.postgresql.prisma

# 2. Seed initial institutional data & admin users
SEED_ADMIN_EMAIL="admin@institution.edu.in" \
SEED_ADMIN_PASSWORD="StrongInitialAdminPassword2025!" \
SEED_STAFF_EMAIL="counselor@institution.edu.in" \
SEED_STAFF_PASSWORD="StrongInitialStaffPassword2025!" \
npx tsx prisma/seed.ts
```

Alternatively, to make PostgreSQL the permanent local default in `prisma/schema.prisma`, update line 2:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step C: Configure Vercel Project Environment Variables
In your Vercel Dashboard (`Project Settings` > `Environment Variables`), configure the following variables for **Production** and **Preview**:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | Pooled PostgreSQL connection string | `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | 32+ character random secret for admin auth | Generated via `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | Live institutional domain | `https://portal.institution.edu.in` |

### Step D: Deploy to Vercel
Connect your GitHub repository to Vercel and trigger the deployment.
Next.js will automatically build the static pages and dynamic serverless API routes.

---

## 4. Media Storage Strategy for Production

For small-to-medium institutions with under 1 GB of documents and images, the shared `public/uploads/` directory bundled in the repository is sufficient.

For production multi-campus institutions with high-volume photo uploads and prospectus PDFs:
1. Connect **AWS S3** or **Cloudflare R2** (zero egress fee).
2. Configure AWS S3 credentials in environment variables (`S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).
3. Update `src/app/api/upload/route.ts` to stream directly to S3/R2 with custom CDN URLs.

---

## 5. Security & Maintenance Checklist

- [ ] `JWT_SECRET` is at least 32 characters long and not shared across environments.
- [ ] Direct database port (5432) is restricted or protected by SSL/TLS (`sslmode=require`).
- [ ] Daily automated database backup snapshot is enabled on the cloud provider.
- [ ] Admin login credentials rotated immediately after first deployment.
- [ ] `/admin` routes verified to require active JWT authentication.

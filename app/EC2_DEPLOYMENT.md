# EC2 Backend Deployment Guide

Deploy the Nowest FastAPI backend on an AWS EC2 instance using Docker (recommended) or systemd.

## Architecture

```
Internet → EC2 Security Group (80/443) → Nginx → Gunicorn/Uvicorn → FastAPI → MySQL (RDS or EC2)
                                                      ↓
                                                   S3 (nowest bucket, via IAM role)
```

## 1. EC2 instance requirements

| Item | Recommendation |
|------|----------------|
| AMI | Ubuntu 22.04/24.04 or Amazon Linux 2023 |
| Instance | `t3.small` or larger |
| Storage | 20 GB+ |
| Security group | Inbound: **22** (SSH), **80** (HTTP), **443** (HTTPS optional) |

If MySQL is on RDS, allow the EC2 security group (or EC2 private IP) in the RDS inbound rules on port **3306**.

### IAM role (recommended for S3)

Attach an instance profile with read access to the `nowest` S3 bucket so portfolio image resolution works without storing AWS keys in `.env`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::nowest"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::nowest/*"
    }
  ]
}
```

## 2. One-time host setup

SSH into the instance:

```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

Clone the repo and run host setup:

```bash
git clone https://github.com/Mohji12/nowest.git /opt/nowest
cd /opt/nowest/app
chmod +x ec2/setup-host.sh ec2/deploy.sh
./ec2/setup-host.sh
```

Log out and SSH back in so the `docker` group applies.

## 3. Configure environment

```bash
cd /opt/nowest/app
cp .env.example .env
nano .env
```

**Required values:**

- `DATABASE_URL` — MySQL connection string (URL-encode `@` as `%40` in passwords)
- `SECRET_KEY` — long random string
- `SESSION_SECRET` — long random string
- `ALLOWED_ORIGINS` — your frontend URL(s), comma-separated

Example:

```env
APP_ENV=production
DATABASE_URL=mysql+pymysql://adminuser:MyPass%40123@52.90.192.59:3306/nowest_interior
SECRET_KEY=your-production-secret-key
SESSION_SECRET=your-production-session-secret
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173
AWS_REGION=ap-south-1
```

## 4. Deploy with Docker (recommended)

```bash
cd /opt/nowest/app
./ec2/deploy.sh
```

This builds the API image, starts the API on port **8000**, and Nginx on port **80**.

Verify:

```bash
curl http://localhost/health
curl http://YOUR_EC2_PUBLIC_IP/health
```

### Manual Docker commands

```bash
docker compose -f docker-compose.ec2.yml build
docker compose -f docker-compose.ec2.yml up -d
docker compose -f docker-compose.ec2.yml logs -f nowest-api
```

### Update after code changes

```bash
cd /opt/nowest
git pull
cd app
./ec2/deploy.sh
```

## 5. Deploy without Docker (systemd)

```bash
cd /opt/nowest/app
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # edit values first

sudo cp ec2/nowest-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now nowest-api
sudo systemctl status nowest-api
```

Install Nginx on the host and proxy `localhost:8000` using `ec2/nginx.conf` as a reference.

## 6. Connect the frontend

Point the frontend API base URL to your EC2 instance.

**Option A — Vercel env var (recommended):**

Set in Vercel project settings:

```
VITE_API_URL=http://YOUR_EC2_PUBLIC_IP
```

Then update `frontend/src/lib/baseUrl.ts` to use `import.meta.env.VITE_API_URL`.

**Option B — Vercel proxy:** update `frontend/vercel.json` rewrite destination from the Lambda URL to `http://YOUR_EC2_PUBLIC_IP`.

## 7. HTTPS (optional)

Use **Certbot** on the EC2 host or put the instance behind an **Application Load Balancer** with an ACM certificate.

## 8. Troubleshooting

| Issue | Fix |
|-------|-----|
| `Cannot connect to database` | Check RDS security group allows EC2; verify `DATABASE_URL` |
| `502 Bad Gateway` | API container not healthy: `docker compose -f docker-compose.ec2.yml logs nowest-api` |
| Portfolio images missing | Attach IAM S3 role to EC2 or set `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` |
| CORS errors | Add frontend URL to `ALLOWED_ORIGINS` in `.env` and redeploy |

### Useful commands

```bash
docker compose -f docker-compose.ec2.yml ps
docker compose -f docker-compose.ec2.yml logs --tail=100 nowest-api
curl -v http://localhost:8000/health
```

## Files added for EC2

| File | Purpose |
|------|---------|
| `Dockerfile.ec2` | Production Docker image (Gunicorn + Uvicorn workers) |
| `docker-compose.ec2.yml` | API + Nginx stack |
| `.env.example` | Environment template |
| `ec2/deploy.sh` | Build and start containers |
| `ec2/setup-host.sh` | Install Docker on EC2 |
| `ec2/nginx.conf` | Reverse proxy to API |
| `ec2/nowest-api.service` | systemd unit (non-Docker option) |

Lambda deployment (`Dockerfile.lambda`) is unchanged and still works for serverless.

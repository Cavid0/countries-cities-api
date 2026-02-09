# Deployment Guide

This guide will help you deploy your Countries and Cities API to various cloud platforms.

## Prerequisites

Before deploying, ensure:
- Your code is pushed to a Git repository (GitHub, GitLab, etc.)
- All environment variables are documented in `.env.example`
- The application works correctly locally
- Database migrations are ready
- You have an account on your chosen cloud platform

---

## Option 1: Railway.app (Recommended for Beginners)

Railway offers the easiest deployment with built-in PostgreSQL and Redis.

### Steps:

1. **Sign up at [Railway.app](https://railway.app/)**

2. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select your repository

3. **Add PostgreSQL**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically create a PostgreSQL instance
   - Environment variables will be automatically set

4. **Add Redis**
   - Click "New" → "Database" → "Add Redis"
   - Environment variables will be automatically set

5. **Configure Environment Variables**
   - Go to your app service → Variables
   - Add the following:
     ```
     NODE_ENV=production
     JWT_SECRET=your_production_secret
     JWT_REFRESH_SECRET=your_refresh_secret
     ITEMS_PER_PAGE=20
     ```
   - Railway automatically provides: `DATABASE_URL`, `REDIS_URL`

6. **Deploy**
   - Railway automatically deploys on every push to main branch
   - First deployment: Click "Deploy"

7. **Run Database Setup**
   - Go to your service → Settings
   - Add a deployment command: `npm run db:setup && npm start`
   - Or run it manually from Railway's terminal

8. **Get Your URL**
   - Go to Settings → Generate Domain
   - Your API will be available at: `https://your-app.railway.app`

### Cost: FREE (with limitations)
- $5 credit per month on free plan
- Should be enough for development/portfolio projects

---

## Option 2: AWS (Amazon Web Services)

### Services Needed:
- **EC2** - Server
- **RDS** - PostgreSQL Database
- **ElastiCache** - Redis
- **Elastic Beanstalk** - Easy deployment (optional)

### Steps:

1. **Set up RDS (PostgreSQL)**
   ```
   - Go to RDS Console
   - Create database → PostgreSQL
   - Choose Free Tier (db.t2.micro)
   - Set database name, username, password
   - Note the endpoint URL
   ```

2. **Set up ElastiCache (Redis)**
   ```
   - Go to ElastiCache Console
   - Create Redis cluster
   - Choose cache.t2.micro (Free Tier)
   - Note the endpoint URL
   ```

3. **Deploy using Elastic Beanstalk**
   ```bash
   # Install EB CLI
   pip install awsebcli
   
   # Initialize
   eb init -p node.js your-app-name --region us-east-1
   
   # Create environment
   eb create production-env
   
   # Set environment variables
   eb setenv NODE_ENV=production \
     DB_HOST=your-rds-endpoint \
     DB_PORT=5432 \
     DB_NAME=your-db-name \
     DB_USER=your-db-user \
     DB_PASSWORD=your-db-password \
     REDIS_HOST=your-redis-endpoint \
     REDIS_PORT=6379 \
     JWT_SECRET=your-secret
   
   # Deploy
   eb deploy
   ```

4. **Run Database Setup**
   ```bash
   eb ssh
   cd /var/app/current
   npm run db:setup
   exit
   ```

### Cost: FREE for 12 months (Free Tier)
- t2.micro EC2 instance
- 20 GB storage
- db.t2.micro RDS instance
- cache.t2.micro ElastiCache

---

## Option 3: Google Cloud Platform

### Services Needed:
- **Cloud Run** - Serverless containers
- **Cloud SQL** - PostgreSQL
- **Memorystore** - Redis

### Steps:

1. **Install Google Cloud SDK**
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # Login
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Create Cloud SQL Instance**
   ```bash
   gcloud sql instances create countries-db \
     --database-version=POSTGRES_14 \
     --tier=db-f1-micro \
     --region=us-central1
   
   # Create database
   gcloud sql databases create countries_cities_db \
     --instance=countries-db
   ```

3. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   
   EXPOSE 8080
   
   CMD ["npm", "start"]
   ```

4. **Build and Deploy to Cloud Run**
   ```bash
   # Build container
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/countries-api
   
   # Deploy
   gcloud run deploy countries-api \
     --image gcr.io/YOUR_PROJECT_ID/countries-api \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production,JWT_SECRET=your-secret
   ```

### Cost: FREE ($300 credit for 90 days)

---

## Option 4: Azure

### Services Needed:
- **App Service** - Web hosting
- **Azure Database for PostgreSQL**
- **Azure Cache for Redis**

### Steps:

1. **Install Azure CLI**
   ```bash
   brew install azure-cli
   az login
   ```

2. **Create Resource Group**
   ```bash
   az group create --name countries-api-rg --location eastus
   ```

3. **Create PostgreSQL Database**
   ```bash
   az postgres server create \
     --resource-group countries-api-rg \
     --name countries-db \
     --location eastus \
     --admin-user myadmin \
     --admin-password YourPassword123 \
     --sku-name B_Gen5_1
   ```

4. **Create Redis Cache**
   ```bash
   az redis create \
     --name countries-redis \
     --resource-group countries-api-rg \
     --location eastus \
     --sku Basic \
     --vm-size c0
   ```

5. **Create and Deploy App Service**
   ```bash
   az webapp up \
     --resource-group countries-api-rg \
     --name countries-api \
     --runtime "NODE:18-lts" \
     --sku B1
   
   # Set environment variables
   az webapp config appsettings set \
     --resource-group countries-api-rg \
     --name countries-api \
     --settings NODE_ENV=production \
       DB_HOST=your-db-host \
       JWT_SECRET=your-secret
   ```

### Cost: FREE ($200 credit for 30 days)

---

## Post-Deployment Checklist

After deploying to any platform:

- [ ] Test all API endpoints
- [ ] Verify database connection
- [ ] Check Redis caching is working
- [ ] Test authentication and authorization
- [ ] Access Swagger documentation at `/api-docs`
- [ ] Run database setup: `npm run db:setup`
- [ ] Seed with data: `npm run db:seed`
- [ ] Monitor logs for errors
- [ ] Set up SSL/TLS (most platforms do this automatically)
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring and alerts
- [ ] Create Postman collection and publish
- [ ] Update README with live URL

---

## Environment Variables for Production

Make sure to set these in your cloud platform:

```env
NODE_ENV=production
PORT=3000 (or platform default)

# Database (from cloud provider)
DB_HOST=
DB_PORT=5432
DB_NAME=
DB_USER=
DB_PASSWORD=

# Redis (from cloud provider)
REDIS_HOST=
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT (generate strong secrets!)
JWT_SECRET=
JWT_REFRESH_SECRET=

# API Config
ITEMS_PER_PAGE=20
CORS_ORIGIN=https://yourdomain.com
```

---

## Monitoring and Maintenance

### Health Check
Your API has a health check endpoint:
```
GET https://your-api-url/health
```

### Logs
Check application logs regularly:
- **Railway**: Dashboard → Logs
- **AWS**: CloudWatch
- **GCP**: Cloud Logging
- **Azure**: App Service Logs

### Performance Monitoring
Consider adding:
- New Relic
- DataDog
- Sentry (for error tracking)

---

## Troubleshooting

### Database Connection Issues
- Verify database credentials
- Check firewall rules (whitelist your app's IP)
- Ensure database is in same region as app

### Redis Connection Issues
- Check Redis host and port
- Verify password (if required)
- Ensure app can reach Redis (network/firewall)

### Application Crashes
- Check logs for errors
- Verify all environment variables are set
- Ensure Node.js version matches (18+)

---

## Need Help?

- Railway: [Railway Discord](https://discord.gg/railway)
- AWS: [AWS Documentation](https://docs.aws.amazon.com/)
- GCP: [GCP Documentation](https://cloud.google.com/docs)
- Azure: [Azure Documentation](https://docs.microsoft.com/azure/)

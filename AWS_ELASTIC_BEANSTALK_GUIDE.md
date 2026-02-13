# 🚀 AWS Elastic Beanstalk Deployment Guide

**Elastic Beanstalk (EB) - Railway.app-a ən yaxın AWS service-dir. Node.js backend-i direct run edir.**

---

## ⏱️ Vaxt: ~30 dəqiqə

---

## 📋 Ön Şərtlər

- ✅ GitHub repo hazırdır: https://github.com/Cavid0/countries-cities-api
- ✅ AWS hesabınız var (credit card lazımdır - Free Tier-da işləyəcəyik)
- ✅ Local kod işləyir

---

## 🎯 ADDIM 1: AWS CLI Yüklə və Configure Et (5 dəqiqə)

### 1.1 AWS CLI Yüklə (macOS)

Terminal-da:

```bash
# Homebrew ilə yüklə
brew install awscli

# Version yoxla
aws --version
# Output: aws-cli/2.x.x
```

### 1.2 AWS Credentials Configure Et

```bash
# AWS configure başlat
aws configure

# Soruşacaq:
# AWS Access Key ID: [Your Access Key]
# AWS Secret Access Key: [Your Secret Key]
# Default region name: eu-central-1  (və ya us-east-1)
# Default output format: json
```

**Access Key hardan alım?**

1. AWS Console açın: https://console.aws.amazon.com
2. Top right: Account name → Security credentials
3. Scroll down: "Access keys" → "Create access key"
4. Key-i kopyalayın (bir dəfə göstərilir!)

---

## 🎯 ADDIM 2: EB CLI Yüklə (3 dəqiqə)

```bash
# EB CLI yüklə
brew install awsebcli

# Version yoxla
eb --version
# Output: EB CLI 3.x.x
```

---

## 🎯 ADDIM 3: Elastic Beanstalk Application Yarat (10 dəqiqə)

### 3.1 EB Initialize

Proyekt direktoriyasında:

```bash
cd /Users/cavid2006/Desktop/api

# EB initialize
eb init
```

**Soruşacaq:**

```
Select a default region:
→ 11) eu-central-1 (Frankfurt)  # və ya us-east-1 (Virginia)

Enter Application Name:
→ countries-cities-api

It appears you are using Node.js. Is this correct?
→ Y

Select a platform branch:
→ Node.js 18 running on 64bit Amazon Linux 2

Do you want to set up SSH for your instances?
→ n (No, lazım deyil şimdilik)
```

**✅ `.elasticbeanstalk/config.yml` faylı yaranacaq**

### 3.2 Environment Configuration Faylı Yarat

`.ebextensions/` folder və config faylları:

```bash
mkdir -p .ebextensions
```

**Fayl 1: `.ebextensions/nodecommand.config`**

```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    PORT: 8080
```

**Fayl 2: `.ebextensions/https-redirect.config`** (optional)

```yaml
Resources:
  AWSEBV2LoadBalancerTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      HealthCheckPath: /health
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 3
      Matcher:
        HttpCode: "200"
```

### 3.3 Environment Variables Faylı (.env.production)

Proyekt root-da:

```bash
# .env.production yaradın (bu EB-yə yükləyəcəyik)
cat > .env.production << 'EOF'
NODE_ENV=production
PORT=8080

# PostgreSQL (RDS-dən alacaqsan)
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=5432
DB_NAME=countries_cities_db
DB_USER=postgres
DB_PASSWORD=YourStrongPassword123

# Redis (ElastiCache-dən alacaqsan)
REDIS_HOST=your-redis-endpoint.cache.amazonaws.com
REDIS_PORT=6379

# JWT
JWT_SECRET=my_super_secret_key_2026_production_aws
JWT_REFRESH_SECRET=my_refresh_secret_2026_production_aws
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Pagination
ITEMS_PER_PAGE=20
EOF
```

**⚠️ DB və Redis endpoints-i sonra dolduracağıq**

---

## 🎯 ADDIM 4: RDS PostgreSQL Yarat (7 dəqiqə)

### 4.1 AWS Console-da RDS

1. https://console.aws.amazon.com/rds açın
2. "Create database" düyməsi
3. **Database creation method:** Standard create
4. **Engine:** PostgreSQL 14
5. **Templates:** Free tier ✓
6. **DB instance identifier:** countries-cities-db
7. **Master username:** postgres
8. **Master password:** YourStrongPassword123 (qeyd edin!)
9. **DB instance class:** db.t3.micro (Free Tier)
10. **Storage:** 20 GB gp2
11. **Connectivity:**
    - VPC: Default
    - Public access: **Yes** (EB-nin access olması üçün)
    - VPC security group: Create new → `countries-api-db-sg`
12. **Additional configuration:**
    - Initial database name: `countries_cities_db`
13. "Create database" click

**⏳ 5-7 dəqiqə gözləyin - database yaranacaq**

### 4.2 Endpoint Kopyalayın

Database yarandıqdan sonra:

1. RDS Dashboard → Databases → countries-cities-db
2. "Connectivity & security" tab
3. **Endpoint** kopyalayın:
   ```
   countries-cities-db.xxxxx.eu-central-1.rds.amazonaws.com
   ```
4. `.env.production` faylına əlavə edin:
   ```
   DB_HOST=countries-cities-db.xxxxx.eu-central-1.rds.amazonaws.com
   ```

---

## 🎯 ADDIM 5: ElastiCache Redis Yarat (5 dəqiqə) - OPTIONAL

Redis **optional**-dır. Skip edib davam edə bilərsən (app Redis olmadan da işləyəcək).

### 5.1 AWS Console-da ElastiCache

1. https://console.aws.amazon.com/elasticache
2. "Get started" → "Create cluster"
3. **Cluster engine:** Redis
4. **Cluster mode:** Disabled
5. **Name:** countries-api-redis
6. **Node type:** cache.t2.micro (Free Tier-da yoxdur, amma ən ucuz)
7. **Number of replicas:** 0
8. **Subnet group:** Default
9. "Create" düyməsi

**⏳ 5 dəqiqə gözləyin**

### 5.2 Endpoint Kopyalayın

1. ElastiCache Dashboard → Redis clusters → countries-api-redis
2. **Primary endpoint** kopyalayın:
   ```
   countries-api-redis.xxxxx.cache.amazonaws.com:6379
   ```
3. `.env.production`-a əlavə:
   ```
   REDIS_HOST=countries-api-redis.xxxxx.cache.amazonaws.com
   REDIS_PORT=6379
   ```

**⚠️ Əgər ElastiCache bahalıdırsa, Redis-siz davam et:**

`src/config/redis.js`-də error handling var, Redis yoxdursa skip edəcək.

---

## 🎯 ADDIM 6: Elastic Beanstalk Environment Yarat və Deploy (10 dəqiqə)

### 6.1 Environment Yarat

```bash
# EB environment yarat və deploy et
eb create countries-api-production

# Soruşacaq:
# Enter Environment Name: countries-api-production
# Enter DNS CNAME prefix: countries-api-prod  (və ya boş saxla - unique olmalı)
# Select a load balancer type:
#   1) classic
#   2) application  ← BU
#   3) network
# → 2
```

**⏳ 5-7 dəqiqə deployment işləyəcək**

Output:
```
Creating application version archive "app-xxx".
Uploading: [...] 100.0%
Environment details for: countries-api-production
  Application name: countries-cities-api
  Region: eu-central-1
  Deployed Version: app-xxx
  Environment ID: e-xxxxxxxxx
  Platform: arn:aws:elasticbeanstalk:...
  Tier: WebServer
  CNAME: countries-api-prod.eu-central-1.elasticbeanstalk.com
  Updated: 2026-02-09 12:00:00
  Status: Launching
```

### 6.2 Status Yoxla

```bash
# Status yoxla
eb status

# Logs bax
eb logs
```

### 6.3 Environment Variables Set Et

RDS və Redis endpoints hazırdırsa:

```bash
# .env.production faylından environment variables-ı EB-yə yüklə
eb setenv $(cat .env.production | grep -v '^#' | xargs)

# Və ya manual:
eb setenv \
  NODE_ENV=production \
  DB_HOST=countries-cities-db.xxxxx.rds.amazonaws.com \
  DB_PORT=5432 \
  DB_NAME=countries_cities_db \
  DB_USER=postgres \
  DB_PASSWORD=YourStrongPassword123 \
  JWT_SECRET=my_super_secret_key_2026_production_aws \
  JWT_REFRESH_SECRET=my_refresh_secret_2026_production_aws
```

**⏳ Redeploy başlayacaq (2-3 dəqiqə)**

---

## 🎯 ADDIM 7: Database Setup (SSH ilə)

### 7.1 SSH Enable Et

```bash
# SSH enable
eb ssh --setup

# SSH-la connect ol
eb ssh
```

### 7.2 Database Setup

SSH içində:

```bash
# Node modules və app directory
cd /var/app/current

# Database setup (tables + admin user)
npm run db:setup

# Seed data (10 countries + 19 cities)
npm run db:seed

# Exit SSH
exit
```

---

## 🎯 ADDIM 8: Test Et

### 8.1 URL Tap

```bash
# Environment URL-i tap
eb status | grep CNAME
```

Output:
```
CNAME: countries-api-prod.eu-central-1.elasticbeanstalk.com
```

**Live URL:**
```
http://countries-api-prod.eu-central-1.elasticbeanstalk.com
```

### 8.2 API Test

```bash
# Health check
curl http://countries-api-prod.eu-central-1.elasticbeanstalk.com/health

# Countries endpoint
curl http://countries-api-prod.eu-central-1.elasticbeanstalk.com/api/countries

# Swagger UI (browser-da)
open http://countries-api-prod.eu-central-1.elasticbeanstalk.com/api-docs
```

**✅ Əgər işləyirsə - deployment complete! 🎉**

---

## 🎯 ADDIM 9: Custom Domain (Optional)

### 9.1 Route 53-də Domain

Əgər domain alıbsansa (məsələn: `api.mycountries.com`):

```bash
# EB-də custom domain set et
eb config
```

Fayl açılacaq, belə əlavə et:

```yaml
aws:elasticbeanstalk:environment:
  EnvironmentType: LoadBalanced
  LoadBalancerType: application

aws:elbv2:listener:443:
  Protocol: HTTPS
  SSLCertificateArns: arn:aws:acm:...
```

---

## 📋 Final URLs

Deployment tamamlandıqdan sonra:

```
GitHub Repo: https://github.com/Cavid0/countries-cities-api
Live API: http://countries-api-prod.eu-central-1.elasticbeanstalk.com
Swagger: http://countries-api-prod.eu-central-1.elasticbeanstalk.com/api-docs
Health: http://countries-api-prod.eu-central-1.elasticbeanstalk.com/health
```

---

## 🔄 Yeniləmələr (Redeploy)

Hər dəfə kod dəyişdirəndə:

```bash
# 1. Git commit
git add .
git commit -m "feat: New feature"
git push

# 2. EB deploy
eb deploy

# ⏳ 2-3 dəqiqə deployment
```

---

## 💰 Qiymət (Free Tier)

**İlk 12 ay Free Tier:**
- ✅ EC2 t2.micro: 750 saat/ay (free)
- ✅ RDS db.t3.micro: 750 saat/ay (free)
- ✅ 20 GB storage (free)
- ❌ ElastiCache Redis: ~$15/ay (əgər istifadə edirsənsə)

**Free Tier bitdikdən sonra:**
- EB + EC2 t2.micro: ~$10/ay
- RDS db.t3.micro: ~$15/ay
- **Cəmi: ~$25-30/ay**

**💡 Tip:** Redis-siz davam et, Free Tier müddətindən istifadə et.

---

## 🆘 Troubleshooting

### Problem 1: Environment Health Red

```bash
# Logs yoxla
eb logs

# EB Console-da health details bax
eb console
```

**Common errors:**
- Database connection refused → Security group yoxla
- Module not found → `npm install` düzgün run olmayıb
- Port binding failed → `PORT=8080` environment variable set et

### Problem 2: RDS Connection Refused

**Səbəb:** Security group EB instance-a access vermir.

**Həll:**

1. RDS Console → countries-cities-db → Security groups
2. Inbound rules → Edit
3. Əlavə et:
   - Type: PostgreSQL
   - Source: EB environment security group

**EB security group hardan tapım?**
```bash
eb console
# Environment → Configuration → Instances → EC2 security groups
```

### Problem 3: 502 Bad Gateway

**Səbəb:** Application start olmayıb.

**Həll:**
```bash
# SSH ilə connect ol
eb ssh

# Logs yoxla
sudo tail -f /var/log/nodejs/nodejs.log

# Environment variables yoxla
printenv | grep DB_
```

---

## ✅ BÜDCƏ ÜÇE TÖVSĬYE

**Minimal setup (Free Tier):**
- ✅ Elastic Beanstalk (EC2 t2.micro)
- ✅ RDS PostgreSQL (db.t3.micro)
- ❌ Redis skip et (optional)

**Əgər Redis lazımdırsa:**
- Upstash Redis (free tier): https://upstash.com
- RedisLabs Cloud (free 30MB): https://redis.com/try-free/

---

## 🎉 UĞURLAR!

EB deployment Railway-dən bir qədər complex, amma:
- ✅ Daha çox control
- ✅ AWS ekosistemində
- ✅ Free Tier 12 ay
- ✅ Professional CV-yə əlavə edə bilərsən!

**Next:** README.md-yə EB URLs əlavə et və bootcamp-ə təqdim et! 🚀

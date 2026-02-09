# 🔧 Troubleshooting Guide

**Bu faylda ən çox rast gəlinən problemlər və onların həll yolları göstərilib.**

---

## 📋 İçindəkilər

1. [GitHub Problems](#github-problems)
2. [Railway Deployment Errors](#railway-deployment-errors)
3. [Database Issues](#database-issues)
4. [Authentication Errors](#authentication-errors)
5. [Postman Collection Issues](#postman-collection-issues)
6. [API Response Errors](#api-response-errors)
7. [Performance Issues](#performance-issues)
8. [Local Development Problems](#local-development-problems)

---

## 🐙 GitHub Problems

### ❌ Problem 1.1: Git push rejected

**Error:**
```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/...'
```

**Səbəb:** Remote repository-də local-da olmayan yeni commit var.

**Həll:**
```bash
# 1. Remote-dən pull et
git pull origin main --rebase

# 2. Conflicts varsa həll et
# 3. Push et
git push origin main
```

---

### ❌ Problem 1.2: Permission denied (publickey)

**Error:**
```
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Səbəb:** SSH key yoxdur və ya yanlışdır.

**Həll (HTTPS istifadə edin):**
```bash
# Remote URL-i HTTPS-ə dəyiş
git remote set-url origin https://github.com/YOUR_USERNAME/countries-cities-api.git

# Push et (username/password və ya token soruşacaq)
git push -u origin main
```

**Həll (SSH düzəlt):**
```bash
# 1. SSH key yarat
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. Key-i GitHub-a əlavə et
cat ~/.ssh/id_ed25519.pub
# Kopyalayın və GitHub Settings → SSH Keys-ə əlavə edin
```

---

### ❌ Problem 1.3: .env file pushed to GitHub

**Error:** Private secrets GitHub-da görünür!

**Həll:**
```bash
# 1. .env-i git-dən sil (amma local-da saxla)
git rm --cached .env

# 2. .gitignore-a əlavə et (olmalıdır)
echo ".env" >> .gitignore

# 3. Commit və push
git add .gitignore
git commit -m "fix: Remove .env from git tracking"
git push

# 4. GitHub-da secrets-i dəyişdir!
# Çünki köhnə secrets artıq public olub
```

---

## 🚂 Railway Deployment Errors

### ❌ Problem 2.1: Build failed - Module not found

**Error (Railway Logs):**
```
Error: Cannot find module 'express'
```

**Səbəb:** Dependencies install olmayıb.

**Həll:**
```bash
# Local-da test edin:
rm -rf node_modules package-lock.json
npm install
npm start

# Əgər local işləyirsə, Railway-də redeploy edin:
# Railway Dashboard → Service → Deployments → Latest → Redeploy
```

---

### ❌ Problem 2.2: Application failed to respond

**Error (Railway Logs):**
```
Application failed to respond on port 3000
```

**Səbəb:** Environment variables yanlışdır və ya PORT dəyişəni yoxdur.

**Həll:**

1. Railway Dashboard → Service → Variables
2. Yoxlayın:
   ```
   PORT=3000
   NODE_ENV=production
   DATABASE_URL=(auto-injected)
   REDIS_URL=(auto-injected)
   JWT_SECRET=my_super_secret_key_2026_production
   JWT_REFRESH_SECRET=my_refresh_secret_2026_production
   ```
3. Save və redeploy

---

### ❌ Problem 2.3: PostgreSQL connection refused

**Error (Railway Logs):**
```
Error: getaddrinfo ENOTFOUND postgres
Connection refused
```

**Səbəb:** PostgreSQL service yaradılmayıb və ya DATABASE_URL yanlışdır.

**Həll:**

1. **PostgreSQL service olduğunu yoxlayın:**
   - Project view-da "PostgreSQL" service kartı görünməliidr
   - Status: 🟢 Running

2. **Variables yoxlayın:**
   - Node.js service → Variables
   - `DATABASE_URL` orada olmalıdır (auto-injected)
   - Format: `postgresql://user:pass@host:port/dbname`

3. **Əgər yoxdursa, reference edin:**
   - Node.js service → Variables → "New Variable"
   - Add Reference:
     - Variable: `DATABASE_URL`
     - From: PostgreSQL service
     - Variable: `DATABASE_URL`

---

### ❌ Problem 2.4: Redis connection failed

**Error (Railway Logs):**
```
Error: Redis connection to 127.0.0.1:6379 failed
```

**Səbəb:** Redis service yoxdur və ya REDIS_URL yanlışdır.

**Həll:**

1. Redis service əlavə edin:
   - Project → New → Database → Add Redis

2. REDIS_URL reference:
   - Node.js service → Variables → New Variable
   - Add Reference:
     - Variable: `REDIS_URL`
     - From: Redis service
     - Variable: `REDIS_URL`

3. Redeploy

---

### ❌ Problem 2.5: Domain not working (502 Bad Gateway)

**Error (Browser):**
```
502 Bad Gateway
```

**Səbəb:** Application crash olub və ya start olmayıb.

**Həll:**

1. **Logs yoxlayın:**
   - Service → Deployments → Latest → View Logs
   - Son error-a baxın

2. **Start script yoxlayın (package.json):**
   ```json
   "scripts": {
     "start": "node src/server.js"
   }
   ```

3. **Health check edin (Railway Shell):**
   ```bash
   curl http://localhost:3000/health
   ```

4. **Restart service:**
   - Service → Settings → Restart

---

## 🗄️ Database Issues

### ❌ Problem 3.1: Tables not created

**Error:**
```
relation "countries" does not exist
```

**Səbəb:** `npm run db:setup` çalışmayıb.

**Həll (Railway Shell):**
```bash
# 1. Shell açın
npm run db:setup

# 2. Output yoxlayın:
# ✔ Database connected successfully
# ✔ Tables created
# ✔ Admin user created

# 3. Test edin:
npm run db:seed
```

**Həll (Local):**
```bash
# Local-da test edin:
npm run db:setup
npm run db:seed

# PostgreSQL-a bağlanıb yoxlayın:
psql -d countries_cities_db -c "SELECT COUNT(*) FROM countries;"
```

---

### ❌ Problem 3.2: Duplicate key error

**Error:**
```
ERROR: duplicate key value violates unique constraint "users_email_key"
```

**Səbəb:** Admin user artıq mövcuddur, `db:setup` 2 dəfə çalışıb.

**Həll:**

**Variantı 1: Database reset (bütün data silinir!):**
```bash
# Railway Shell:
npm run db:reset  # əgər script varsa

# Və ya manual:
npx sequelize-cli db:drop
npx sequelize-cli db:create
npm run db:setup
npm run db:seed
```

**Variantı 2: Xətanı ignore et:**
Script `db/setup.js`-də error handling var, duplicate error normal ola bilər.

---

### ❌ Problem 3.3: No data returned (empty array)

**Error (API Response):**
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "totalItems": 0
  }
}
```

**Səbəb:** Seed əməliyyatı çalışmayıb.

**Həll:**
```bash
# Railway Shell:
npm run db:seed

# Output:
# ✔ Seeding 10 countries...
# ✔ Seeding 19 cities...

# Test:
curl https://your-app.up.railway.app/api/countries
```

---

## 🔐 Authentication Errors

### ❌ Problem 4.1: Login returns 401 Unauthorized

**Error (API):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Səbəb:** Email və ya password yanlışdır.

**Həll:**

1. **Admin credentials yoxlayın:**
   ```
   Email: admin@example.com
   Password: Admin123
   ```

2. **Database-də user olduğunu yoxlayın (Railway Shell):**
   ```bash
   # PostgreSQL-a bağlan (Railway Shell):
   echo "SELECT email, role FROM users;" | psql $DATABASE_URL
   ```

3. **Əgər admin yoxdursa, yarat:**
   ```bash
   npm run db:setup  # admin user yaradır
   ```

---

### ❌ Problem 4.2: Token expired

**Error (API):**
```json
{
  "success": false,
  "message": "Token expired"
}
```

**Səbəb:** JWT token-in müddəti bitib (default: 1 saat).

**Həll:**

**Postman-da:**
1. Login request-i yenidən göndər
2. Yeni token avtomatik environment variable-a yazılacaq (Tests script)
3. Və ya manual kopyalayıb yapışdırın

**cURL-də:**
```bash
# 1. Login et və token al:
TOKEN=$(curl -s -X POST https://your-app.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123"}' \
  | jq -r '.data.accessToken')

# 2. Token istifadə et:
curl -H "Authorization: Bearer $TOKEN" \
  https://your-app.up.railway.app/api/countries
```

---

### ❌ Problem 4.3: Forbidden - Admin access required

**Error (API):**
```json
{
  "success": false,
  "message": "Admin access required"
}
```

**Səbəb:** Regular user-lə admin endpoint-ə daxil olmağa çalışırsınız.

**Həll:**

1. **Admin hesabı ilə login olun:**
   ```json
   {
     "email": "admin@example.com",
     "password": "Admin123"
   }
   ```

2. **Və ya user-i admin et (Database):**
   ```sql
   -- Railway Shell (psql):
   UPDATE users SET role = 'admin' WHERE email = 'test@example.com';
   ```

---

## 📮 Postman Collection Issues

### ❌ Problem 5.1: {{base_url}} not working

**Error (Postman):**
```
Could not send request: Could not get any response
```

**Səbəb:** Environment seçilməyib və ya variable yanlışdır.

**Həll:**

1. **Environment seçin:**
   - Top right corner: Environment dropdown
   - "Railway Production" seçin

2. **Variable yoxlayın:**
   - Environments tab → Railway Production
   - `base_url` variable olmalıdır
   - Value: `https://your-app.up.railway.app/api`

3. **Test edin:**
   - Request URL-də `{{base_url}}` yazıldığında, mouse hover edəndə dəyər görünməlidir

---

### ❌ Problem 5.2: Token not automatically set

**Error:** Login request işləyir, amma sonra token yoxdur.

**Səbəb:** Tests script düzgün yazılmayıb.

**Həll:**

1. **Login request-də Tests tab açın**
2. **Bu script-i əlavə edin:**
   ```javascript
   if (pm.response.code === 200) {
       const jsonData = pm.response.json();
       pm.environment.set("token", jsonData.data.accessToken);
       console.log("Token set:", jsonData.data.accessToken);
   } else {
       console.log("Login failed:", pm.response.text());
   }
   ```
3. **Test request göndərin:**
   - Send düyməsi
   - Console açın (View → Show Postman Console)
   - "Token set: eyJhbGc..." görməlir

---

### ❌ Problem 5.3: Public link not working

**Error:** Postman documenter link açılmır və ya Documentation empty görsənir.

**Səbəb:** Collection publish edilməyib və ya visibility private-dır.

**Həll:**

1. **Collection settings:**
   - Collection-a sağ klik → Edit
   - Authorization → No Auth (və ya Inherit from parent)
   - Save

2. **Workspace public et:**
   - Workspace settings
   - Visibility: Public

3. **Yenidən publish:**
   - Collection → Share → Get Public Link
   - Generate new link

---

## 📡 API Response Errors

### ❌ Problem 6.1: Cannot GET /countries

**Error (Browser):**
```
Cannot GET /countries
```

**Səbəb:** `/api` prefix unudulub.

**Həll:**

Düzgün URL:
```
https://your-app.up.railway.app/api/countries  ✓
```

Yanlış URL:
```
https://your-app.up.railway.app/countries  ✗
```

---

### ❌ Problem 6.2: CORS error in browser

**Error (Console):**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Səbəb:** Frontend application CORS-a icazə verilməyib.

**Həll:**

`src/app.js`-də CORS configuration yoxlayın:

```javascript
// Allow all origins (development)
app.use(cors());

// Və ya specific origins:
app.use(cors({
  origin: ['https://your-frontend.com', 'http://localhost:3001'],
  credentials: true
}));
```

Railway-də redeploy.

---

### ❌ Problem 6.3: Rate limit exceeded

**Error (API):**
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

**Səbəb:** Rate limiter aktivdir (100 req / 15 min).

**Həll:**

**Development üçün disable et:**

`src/middleware/rateLimiter.js`:
```javascript
// Disable for development
if (process.env.NODE_ENV === 'development') {
  module.exports = {
    generalLimiter: (req, res, next) => next(),
    authLimiter: (req, res, next) => next(),
    apiLimiter: (req, res, next) => next()
  };
} else {
  // Production limits
  // ...
}
```

**Production-da gözlə:** 15 dəqiqə

---

## ⚡ Performance Issues

### ❌ Problem 7.1: Slow response times (>5 seconds)

**Səbəb:** Redis cache işləmir və ya database slow query.

**Həll:**

1. **Redis əlaqəni yoxlayın:**
   ```bash
   # Railway Shell:
   node -e "const redis = require('redis'); const client = redis.createClient({url: process.env.REDIS_URL}); client.connect().then(() => console.log('✓ Redis OK')).catch(err => console.error('✗ Redis error:', err));"
   ```

2. **Cache headers yoxlayın:**
   ```bash
   curl -I https://your-app.up.railway.app/api/countries
   ```
   Output-da `X-Cache: HIT` və ya `MISS` görməlisiz.

3. **Database indexes yoxlayın:**
   Models-də indexes olmalıdır:
   ```javascript
   // Country.js
   indexes: [
     { fields: ['code'] },
     { fields: ['name'] },
     { fields: ['region'] }
   ]
   ```

---

### ❌ Problem 7.2: Memory limit exceeded (Railway)

**Error (Railway Logs):**
```
Error: JavaScript heap out of memory
```

**Səbəb:** Node.js default memory limit (512MB) kifayət etmir.

**Həll:**

Railway-də memory artır (Free plan: 512MB, Pro: 8GB+)

Və ya package.json-da:
```json
"scripts": {
  "start": "node --max-old-space-size=512 src/server.js"
}
```

---

## 💻 Local Development Problems

### ❌ Problem 8.1: PostgreSQL connection error (local)

**Error:**
```
Error: getaddrinfo ENOTFOUND localhost
```

**Səbəb:** PostgreSQL service start olmayıb.

**Həll (macOS - Homebrew):**
```bash
# Start PostgreSQL
brew services start postgresql@14

# Yoxlayın:
brew services list | grep postgresql

# Database yarat (ilk dəfə):
createdb countries_cities_db
```

---

### ❌ Problem 8.2: Redis connection error (local)

**Error:**
```
Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED
```

**Səbəb:** Redis service işləmir.

**Həll (macOS - Homebrew):**
```bash
# Start Redis
brew services start redis

# Yoxlayın:
redis-cli ping
# Response: PONG
```

---

### ❌ Problem 8.3: npm install fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Həll:**

```bash
# 1. npm cache təmizlə
npm cache clean --force

# 2. node_modules və lock file sil
rm -rf node_modules package-lock.json

# 3. Yenidən install (force ile)
npm install --legacy-peer-deps

# Və ya:
npm install --force
```

---

### ❌ Problem 8.4: Port 3000 already in use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Səbəb:** Başqa proces port 3000 istifadə edir.

**Həll:**

```bash
# Port-u işləden proses-i tap
lsof -i :3000

# PID-ni öyrən və kill et
kill -9 <PID>

# Və ya fərqli port istifadə et:
PORT=3001 npm run dev
```

---

## 🆘 Emergency Quick Fixes

### 🔴 Hərsənə "işləmir", heçnə başa düşmürəm

**Step-by-step minimum test:**

```bash
# 1. Health check (ən sadə endpoint)
curl https://your-app.up.railway.app/health

# Əgər bu işləyirsə → API live-dır ✓
# Əgər error → Railway deploy problem

# 2. Public endpoint
curl https://your-app.up.railway.app/api/countries

# Əgər [] (empty array) → db:seed çalışmayıb
# Əgər error → database problem
# Əgər 10 ölkə → API işləyir! ✓

# 3. Railway logs
# Dashboard → Service → Deployments → Latest → View Logs
# Son 50 xətt oxuyun, error tapın
```

---

### 🔴 "Mən Railway-da nə eyləmişəm, hər şey pozuldu"

**Rollback to previous deploy:**

1. Railway Dashboard → Service → Deployments
2. Previous successful deployment-ə klik
3. "Redeploy" düyməsi
4. 2-3 dəqiqə gözlə

---

### 🔴 "GitHub-a push etdim, amma Railway deploy olmadı"

**Manual redeploy:**

1. Railway Dashboard → Service
2. Top right: "⚙️" icon → "Redeploy"
3. Və ya:
   - Settings → "Re-run Build"

---

### 🔴 "Database-də heç nə yoxdur, təzədən restart"

**Complete database reset:**

```bash
# Railway Shell:
# 1. Drop tables (maləmat silincək!)
npx sequelize-cli db:drop || echo "Ignored"
npx sequelize-cli db:create

# 2. Setup + Seed
npm run db:setup
npm run db:seed

# 3. Verify
curl https://your-app.up.railway.app/api/countries
```

---

## 📞 Daha Kömək Lazımdır?

### Dokumentasiyalar:

- **Railway Docs:** https://docs.railway.app
- **Sequelize Docs:** https://sequelize.org/docs/v6/
- **Express.js Guide:** https://expressjs.com/en/guide/routing.html
- **Postman Learning:** https://learning.postman.com

### Debugging Tips:

1. **Logs həmişə oxuyun!** (Railway logs ən vacibdir)
2. **Bir dəfə bir şey dəyişdir** (bütün problemləri birdən həll etmə)
3. **Git commit tez-tez et** (rollback asandır)
4. **Postman Console** (View → Show Postman Console) açıq saxla

### Community Support:

- Railway Discord: https://discord.gg/railway
- Stack Overflow: `express.js`, `sequelize`, `jwt`
- GitHub Issues: Əgər bug varsa repo-da issue açın

---

## ✅ Problem həll oldumu?

- [ ] GitHub düzgün push oldu
- [ ] Railway deployed və running
- [ ] Database-də data var (countries/cities)
- [ ] Health endpoint işləyir
- [ ] Swagger docs açılır
- [ ] Postman collection work edir
- [ ] README linkləri düzgün

**Hamısı ✅ olarsa, təqdim etməyə hazırsınız! 🎉**

---

**💡 Yadda saxla: 90% problemlər environment variables, database setup və authentication-la bağlıdır. Logs oxumaq ən yaxşı debug metodudur!**

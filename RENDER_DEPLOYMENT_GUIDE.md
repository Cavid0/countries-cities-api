# 🎨 Render.com Complete Deployment Guide

**⏱️ Ümumi vaxt: ~15 dəqiqə**

---

## 📋 NƏYİ YARADACAĞIQ?

1. ✅ PostgreSQL Database (pulsuz)
2. ✅ Node.js Web Service (pulsuz)

**⚠️ Redis:** Render Free tier-da Redis yoxdur. Problemsiz - API Redis olmadan da işləyir! Cache feature disable olacaq.

---

## 🚀 ADDIM 1: POSTGRESQL DATABASE YARAT (3 dəqiqə)

### 1.1 Dashboard açın

Render.com-da login olduqdan sonra:

1. **Dashboard** səhifəsinə get
2. Sol üst küncdə **"New +"** düyməsi
3. Dropdown-dan **"PostgreSQL"** seç

### 1.2 Database konfiqurasiyası

Form-da doldur:

| Field | Value |
|-------|-------|
| **Name** | `countries-cities-db` |
| **Database** | `countries_cities_db` |
| **User** | `countries_user` (default OK) |
| **Region** | 🇪🇺 Frankfurt (EU Central) |
| **PostgreSQL Version** | 16 (default OK) |
| **Instance Type** | ⭐ **Free** (mütləq seç!) |

### 1.3 Create düyməsi

- ✅ **"Create Database"** düyməsinə bas
- ⏳ 1-2 dəqiqə gözlə
- 🟢 Status **"Available"** olmalıdır

### 1.4 Connection məlumatlarını NOT ET!

Database səhifəsində (yarandıqdan sonra):

**"Connections"** bölməsində:

```
Internal Database URL:
postgresql://countries_user:xxxx@dpg-xxx-a.frankfurt-postgres.render.com/countries_cities_db

External Database URL:
postgresql://countries_user:xxxx@dpg-xxx-a.frankfurt-postgres.render.com/countries_cities_db
```

**⚠️ Bu URL-i kopyalama! Render avtomatik connect edəcək!**

---

## 🚀 ADDIM 2: WEB SERVICE YARAT (GitHub-dan Deploy)

**⚠️ Redis Skip:** Render free tier-da Redis mövcud deyil. Cache olmadan da API işləyəcək - kodda Redis error handling var!

### 2.1 GitHub Repo Connect Et

Dashboard-da:

1. **"New +"** → **"Web Service"**
2. **"Build and deploy from a Git repository"** seç
3. **"Next"** düyməsi

### 2.2 Repository Seç

**"Connect a repository" bölməsi:**

- Əgər GitHub görünmürsə: **"Connect GitHub"** düyməsi
- GitHub authorization prompt → **"Authorize Render"**
- Repository list görünəcək

**Repository seç:**
- Axtarış box-a yaz: `countries-cities-api`
- Repository tap: `Cavid0/countries-cities-api`
- **"Connect"** düyməsi

### 2.3 Web Service Konfiqurasiyası

**Form doldur (DİQQƏTLƏ!):**

#### Basic Settings

| Field | Value |
|-------|-------|
| **Name** | `countries-cities-api` |
| **Region** | 🇪🇺 Frankfurt (eyni region!) |
| **Branch** | `main` |
| **Root Directory** | (boş saxla) |
| **Runtime** | **Node** |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

#### Instance Type

- ⭐ **Free** seç (mütləq!)

### 2.4 Environment Variables Əlavə Et

**"Advanced" düyməsini aç!**

**"Environment Variables" bölməsində:**

Hər variable üçün **"Add Environment Variable"** düyməsi bas və əlavə et:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `JWT_SECRET` | `my_super_secret_key_2026_production` |
| `JWT_REFRESH_SECRET` | `my_refresh_secret_2026_production` |
| `JWT_EXPIRES_IN` | `1h` |
| `JWT_REFRESH_EXPIRES_IN` | `7d` |
| `ITEMS_PER_PAGE` | `20` |

### 2.5 Database Connect Et

**2 variant var:**

#### **VARIANT A: Əgər "Add from database" düyməsi VARSA:**

1. Scroll down: **"Add from database"** bölməsi
2. **"Add from database"** düyməsi
3. Select database: `countries-cities-db`
4. Property to add: `DATABASE_URL` ✅
5. Render avtomatik əlavə edəcək!

#### **VARIANT B: Əgər "Add from database" YOXSA (Manual):**

PostgreSQL Database-in connection URL-ini əldə et:

1. Başqa tab-da PostgreSQL səhifəsini aç: `countries-cities-db`
2. **"Connect"** və ya **"Info"** bölməsinə get
3. **"Internal Database URL"** tap və **KOPYALA**:
   ```
   postgresql://countries_user:xxxxx@dpg-xxxxx.frankfurt-postgres.render.com/countries_cities_db
   ```

4. Web Service səhifəsinə qayıt
5. Environment Variables-a manual əlavə et:
   - **Key:** `DATABASE_URL`
   - **Value:** (kopyaladığın PostgreSQL URL-i yapışdır)
   - "Add" düyməsi

**✅ İndi environment variables-da bunlar olmalıdır:**
- NODE_ENV
- PORT
- JWT_SECRET
- JWT_REFRESH_SECRET
- JWT_EXPIRES_IN
- JWT_REFRESH_EXPIRES_IN
- ITEMS_PER_PAGE
- DATABASE_URL (PostgreSQL connection URL) 🟢

**⚠️ Redis yoxdur - problemsiz!** Kod Redis olmadan da işləyir, cache feature disable olacaq.

### 2.6 Create Web Service!

- ✅ **"Create Web Service"** düyməsinə bas
- ⏳ 3-5 dəqiqə deploy başlayacaq

**Deploy logs-u canlı görəcəksən:**

```
==> Cloning from https://github.com/Cavid0/countries-cities-api...
==> Using Node version 18.x
==> Running 'npm install'
...
==> Build successful 🎉
==> Starting service with 'npm start'
...
Server is running on port 10000
==> Your service is live 🎉
```

**Status: 🟢 Live**

---

## 🚀 ADDIM 3: DATABASE SETUP (Shell ilə)

### 3.1 Render Shell Aç

Web Service səhifəsində (countries-cities-api):

**Top navigation bar:**
- **"Shell"** tab-a klik et
- Terminal interface açılacaq

### 3.2 Database Setup Komandaları

Shell-də (terminal kimi) yazın:

```bash
# 1. Database connection test
npm run db:setup
```

**Output görməlisən:**

```
✔ Database connected successfully
✔ Syncing models...
✔ Creating tables...
  - users table created
  - countries table created
  - cities table created
✔ Creating admin user...
  Admin user created: admin@example.com / Admin123
✓ Database setup complete!
```

### 3.3 Seed Data (10 ölkə + 19 şəhər)

```bash
# 2. Seed sample data
npm run db:seed
```

**Output:**

```
✔ Seeding countries...
  - Azerbaijan added
  - Turkey added
  - USA added
  - United Kingdom added
  - Germany added
  - France added
  - Japan added
  - Australia added
  - Canada added
  - Brazil added
✔ 10 countries seeded

✔ Seeding cities...
  - Baku added (Azerbaijan)
  - Ganja added (Azerbaijan)
  - Ankara added (Turkey)
  - Istanbul added (Turkey)
  ...
✔ 19 cities seeded

✓ Seed completed successfully!
```

**✅ Database hazırdır!**

---

## 🚀 ADDIM 4: TEST ET!

### 4.1 Live URL-i Tap

Web Service səhifəsində (top):

**URL görəcəksən:**
```
https://countries-cities-api.onrender.com
```

**Kopyalayın!**

### 4.2 Terminal Test

Local terminal-da test et:

```bash
# 1. Health check
curl https://countries-cities-api.onrender.com/health

# Cavab:
# {"status":"OK","message":"Server is running","timestamp":"..."}
```

```bash
# 2. Countries endpoint
curl https://countries-cities-api.onrender.com/api/countries

# Cavab: 10 ölkə JSON data
```

```bash
# 3. Cities endpoint
curl https://countries-cities-api.onrender.com/api/cities

# Cavab: 19 şəhər JSON data
```

### 4.3 Browser Test

Browser-da açın:

```
https://countries-cities-api.onrender.com/api-docs
```

**✅ Swagger UI açılmalıdır!**

**Test edin:**

1. **Authentication** → **POST /api/auth/login**
   - "Try it out" düyməsi
   - Body:
     ```json
     {
       "email": "admin@example.com",
       "password": "Admin123"
     }
     ```
   - Execute
   - ✅ Token almalısan

2. **Countries** → **GET /api/countries**
   - "Try it out"
   - Execute
   - ✅ 10 ölkə görməlisən

**🎉 API TAMAMILƏ İŞLƏYİR!**

---

## 📋 FINAL URLs (README-yə əlavə et)

```
GitHub Repo:
https://github.com/Cavid0/countries-cities-api

Live API:
https://countries-cities-api.onrender.com

Swagger Documentation:
https://countries-cities-api.onrender.com/api-docs

API Endpoints:
https://countries-cities-api.onrender.com/api/countries
https://countries-cities-api.onrender.com/api/cities

Health Check:
https://countries-cities-api.onrender.com/health
```

**Admin Credentials:**
```
Email: admin@example.com
Password: Admin123
```

---

## 🔄 YENILEMELER (Auto Deploy)

Render GitHub-la sync olur!

Kod dəyişdirəndə:

```bash
# 1. Local dəyişiklik et
git add .
git commit -m "feat: New feature"

# 2. GitHub-a push et
git push

# 3. Render AVTOMATIK deploy edəcək! 🚀
```

Render dashboard-da "Deploy" tarixçəsi görəcəksən.

---

## ⚙️ RENDER SETTINGS

### Environment Variables Yeniləmək

Web Service → **"Environment"** tab:

- Variable əlavə et / sil / dəyişdir
- "Save Changes" → avtomatik redeploy

### Database Backup

PostgreSQL səhifəsində → **"Backups"** tab:

- Günlük backup avtomatik (free plan-da 7 gün saxlanır)

### Logs Baxmaq

Web Service → **"Logs"** tab:

- Real-time application logs
- Error debugging

### Metrics

Web Service → **"Metrics"** tab:

- CPU usage
- Memory usage
- Response time

---

## 💰 RENDER FREE TIER

**Tamamilə pulsuz! (credit card tələb etmir)**

### Free Plan Limitləri:

✅ **Web Service:**
- 750 saat/ay (1 service üçün 24/7 kifayətdir)
- 512 MB RAM
- Shared CPU
- 15 dəqiqə inactivity-dən sonra sleep (ilk request 1-2 saniyəlik cold start)

✅ **PostgreSQL:**
- 1 GB storage
- 90 günlük backup retention

❌ **Redis:**
- Free tier-da mövcud deyil
- API Redis olmadan da işləyir (cache disable)

### ⚠️ Məhdudiyyətlər:

- 🟡 **Cold Start:** 15 dəqiqə istifadə olmazsa, service sleep olur (ilk request ləng ola bilər)
- 🟡 **750 saat/ay:** 1 service üçün kifayətdir (31 gün × 24 saat = 744 saat)

**💡 Həll:** Bootcamp presentation üçün kifayət edir!

---

## 🆘 TROUBLESHOOTING

### Problem 1: Deploy Failed

**Logs yoxla:**
- Web Service → "Logs" tab
- Son error mesajına bax

**Ən çox:**
- `npm install` error → `package.json` yoxla
- Port error → Environment-da `PORT=10000` olduğunu yoxla

### Problem 2: Database Connection Error

**Yoxla:**
- DATABASE_URL environment variable var?
- PostgreSQL status "Available"?

**Həll:**
```bash
# Shell-də test et:
echo $DATABASE_URL

# Əgər boşdursa:
# Web Service → Environment → "Add from database" → PostgreSQL
```

### Problem 3: Health Check Failed

**Test et:**
```bash
curl -v https://your-app.onrender.com/health
```

**Əgər 502:**
- Service start olmayıb
- Logs-da error var

### Problem 4: Cold Start Ləngdir

**Normal!** Free plan-da 15 dəqiqə inactivity sonra sleep olur.

**Test üçün problem deyil** - ilk request-dən sonra normal işləyir.

---

## ✅ CHECKLIST

Deploy tamamlandı?

- [ ] PostgreSQL yaradıldı və "Available"
- [ ] Web Service yaradıldı və "Live"
- [ ] DATABASE_URL environment-da var
- [ ] `npm run db:setup` işlədi
- [ ] `npm run db:seed` işlədi
- [ ] `/health` endpoint 200 OK qaytarır
- [ ] `/api/countries` 10 ölkə qaytarır
- [ ] `/api-docs` Swagger UI açılır
- [ ] Admin login işləyir

**Hamısı ✅ olarsa - HAZIRSAN! 🎉**

---

## 📝 NEXT STEPS

1. ✅ **README.md Update:** Render URLs əlavə et
2. ✅ **Postman Collection:** Create və publish et
3. ✅ **Bootcamp Submission:** Bütün linkləri göndər

---

## 🎉 TƏBRIK EDİRƏM!

API-n tamamilə pulsuz cloud-da çalışır! 🚀

**Professional Features:**
- ✅ PostgreSQL database
- ⚠️ Redis caching (skip - free tier)
- ✅ JWT authentication
- ✅ Swagger documentation
- ✅ Live URL
- ✅ Auto-deploy from GitHub

**BOOTCAMP-Ə GÖNDƏRMƏYƏ HAZIRAMSAN! 💪**

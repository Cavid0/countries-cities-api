# 🚀 SÜRƏTLƏ SETUP - İZLƏYİN! (5 Addım)

Bu faylda **YALNIZ SİZİN ETMƏLİ OLDUĞUNUZ** addımlar var!

---

## ⚠️ MÜHİM: Mən etdim ✅

- ✅ Kod hazırdır (43 fayl)
- ✅ Git repository yaratdım
- ✅ İlk commit etdim
- ✅ Server işləyir (localhost:3000)
- ✅ Database hazırdır (10 ölkə + 19 şəhər)

---

## 🎯 SİZ ETMƏLİSİNİZ (addım-addım):

### ADDIM 1: GitHub Hesabı və Repository (5 dəqiqə)

#### 1.1 GitHub hesabı açın (əgər yoxdursa)
- 🌐 Girin: https://github.com/signup
- Email-inizi daxil edin
- Password yaradın
- Username seçin (məsələn: cavid2006)

#### 1.2 Yeni Repository yaradın
- GitHub-da sağ yuxarı "+" → "New repository"
- **Repository name:** `countries-cities-api`
- **Description:** `RESTful API for countries and cities with authentication and caching`
- **Public** seçin (hamı görə bilsin)
- **README və .gitignore əlavə ETMƏYİN** (artıq var)
- "Create repository" düyməsi

#### 1.3 Repository URL-ini kopyalayın
GitHub sizə göstərəcək:
```
https://github.com/SIZIN-USERNAME/countries-cities-api.git
```

#### 1.4 Bu komandaları terminalda işlədin:

```bash
# 1. Remote əlavə et (URL-i özünüzkü ilə əvəz edin!)
git remote add origin https://github.com/SIZIN-USERNAME/countries-cities-api.git

# 2. Branch adını main et
git branch -M main

# 3. GitHub-a push et
git push -u origin main
```

**✅ GitHub tamamlandı!** Repository-niz burda: `https://github.com/SIZIN-USERNAME/countries-cities-api`

---

### ADDIM 2: Railway.app-da Deploy (20 dəqiqə)

#### 2.1 Railway hesabı açın
- 🌐 Girin: https://railway.app
- "Start a New Project" düyməsi
- **"Login with GitHub"** düyməsi (GitHub hesabınızla)
- Railway-ə GitHub access verin

#### 2.2 Yeni Project yaradın
- Dashboard açıldıqdan sonra: "New Project"
- "Deploy from GitHub repo" seçin
- Repository-nizi seçin: `countries-cities-api`

#### 2.3 PostgreSQL əlavə edin
- Project-də "New" düyməsi
- "Database" → "Add PostgreSQL"
- Railway avtomatik yaradacaq

#### 2.4 Redis əlavə edin
- Yenə "New" düyməsi
- "Database" → "Add Redis"
- Railway avtomatik yaradacaq

#### 2.5 Environment Variables təyin edin
- Service-nizi seçin (app/countries-cities-api)
- "Variables" tab
- Bu variable-ları əlavə edin:

```bash
NODE_ENV=production
JWT_SECRET=my_super_secret_key_2026_countries_api_cavid_production_min32chars
JWT_REFRESH_SECRET=my_refresh_secret_key_2026_countries_api_cavid_production_min32
ITEMS_PER_PAGE=20
PORT=3000
```

**💡 NOT:** DATABASE_URL və REDIS_URL avtomatik əlavə olunacaq!

#### 2.6 Deploy edin
- Railway avtomatik deploy etməli
- Əgər etmirsə: "Deploy" düyməsinə klikləyin

#### 2.7 Domain yaradın
- Settings → "Networking"
- "Generate Domain" düyməsi
- **URL alacaqsınız:** `https://your-app.up.railway.app`
- **Bu URL-i yadda saxlayın!** 📝

#### 2.8 Database-i setup edin

**Variant A: Railway Shell-dən (UI-da)**
- Service → "Shell" tab
```bash
npm run db:setup
npm run db:seed
```

**Variant B: Lokal terminaldan**
```bash
# Railway CLI quraşdırın
brew install railway

# Login olun
railway login

# Project-ə connect olun
railway link

# Komandaları işə salın
railway run npm run db:setup
railway run npm run db:seed
```

#### 2.9 Test edin
Browser-da açın:
- Health: `https://your-app.up.railway.app/health`
- Countries: `https://your-app.up.railway.app/api/v1/countries`
- Swagger: `https://your-app.up.railway.app/api-docs`

**✅ Railway tamamlandı!** API-niz live: `https://your-app.up.railway.app`

---

### ADDIM 3: Postman Collection (25 dəqiqə)

#### 3.1 Postman yükləyin
- 🌐 Girin: https://www.postman.com/downloads/
- Download edin və quraşdırın

#### 3.2 Hesab açın
- Postman-ı açın
- "Sign Up" və ya GitHub ilə login

#### 3.3 Workspace yaradın
- Sol yuxarı "Workspaces" → "Create Workspace"
- Name: "Countries API"
- Visibility: "Public"
- "Create"

#### 3.4 Collection yaradın
- "New" → "Collection"
- Name: `Countries and Cities API`
- Description:
```
A comprehensive RESTful API for countries and cities data.

Features:
- JWT Authentication
- Admin authorization
- Pagination
- Redis caching
- Complete CRUD operations

Base URL: https://your-app.up.railway.app
```

#### 3.5 Environment yaradın
- Environments (sol yan panel)
- "+" düyməsi → "Environment"
- Name: "Production"
- Variables:
```
Variable: base_url
Initial Value: https://your-app.up.railway.app
Current Value: https://your-app.up.railway.app

Variable: token
Initial Value: (boş)
Current Value: (boş)
```
- Save

#### 3.6 Folder və Request-ləri əlavə edin

**Folder 1: Authentication**

Request 1: **Register**
```
Method: POST
URL: {{base_url}}/api/v1/auth/register
Headers: Content-Type: application/json
Body (raw, JSON):
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123456"
}
```

Request 2: **Login**
```
Method: POST
URL: {{base_url}}/api/v1/auth/login
Headers: Content-Type: application/json
Body (raw, JSON):
{
  "email": "admin@example.com",
  "password": "Admin123"
}

Tests (tab):
// Save token
var jsonData = pm.response.json();
if (jsonData.data && jsonData.data.accessToken) {
    pm.environment.set("token", jsonData.data.accessToken);
}
```

Request 3: **Get Current User**
```
Method: GET
URL: {{base_url}}/api/v1/auth/me
Headers: Authorization: Bearer {{token}}
```

**Folder 2: Countries (Public)**

Request 4: **Get All Countries**
```
Method: GET
URL: {{base_url}}/api/v1/countries?page=1&size=20
```

Request 5: **Get Country by ID**
```
Method: GET
URL: {{base_url}}/api/v1/countries/PASTE_REAL_ID_HERE
```

Request 6: **Search Countries**
```
Method: GET
URL: {{base_url}}/api/v1/countries?search=Azerbaijan&region=Asia
```

**Folder 3: Countries (Admin Only)**

Request 7: **Create Country**
```
Method: POST
URL: {{base_url}}/api/v1/countries
Headers: 
  Authorization: Bearer {{token}}
  Content-Type: application/json
Body (raw, JSON):
{
  "name": "Test Country",
  "code": "TC",
  "capital": "Test Capital",
  "population": 1000000,
  "region": "Test Region"
}
```

Request 8: **Update Country**
```
Method: PUT
URL: {{base_url}}/api/v1/countries/PASTE_REAL_ID_HERE
Headers: 
  Authorization: Bearer {{token}}
  Content-Type: application/json
Body (raw, JSON):
{
  "population": 1500000
}
```

Request 9: **Delete Country**
```
Method: DELETE
URL: {{base_url}}/api/v1/countries/PASTE_REAL_ID_HERE
Headers: Authorization: Bearer {{token}}
```

**Folder 4: Cities**

Request 10-15: Oxşar structure... (Countries kimi edin)

#### 3.7 Test edin
- Login request-i işə salın → token alın
- Token avtomatik environment-də save olmalı
- Protected request-ləri test edin

#### 3.8 Publish edin
- Collection-ın üzərinə sağ klik
- "Share collection"
- "Via JSON Link" və ya "Publish"
- "Publish documentation"
- Visibility: "Public"
- **Link alacaqsınız:** Copy edin! 📝

**✅ Postman tamamlandı!** Link: `https://documenter.getpostman.com/view/...`

---

### ADDIM 4: README.md-i Yeniləyin (5 dəqiqə)

README.md faylını açın və bu hissələri doldurun:

```markdown
## 👨‍💻 Author
Cavid (və ya öz adınız)
- GitHub: [@your-github-username](https://github.com/your-github-username)
- Email: your.email@example.com

## 🔗 Links

### Live Application
- **Live API:** https://your-app.up.railway.app
- **Swagger Docs:** https://your-app.up.railway.app/api-docs
- **Health Check:** https://your-app.up.railway.app/health

### Resources
- **GitHub Repository:** https://github.com/your-username/countries-cities-api
- **Postman Collection:** https://documenter.getpostman.com/view/your-id
```

Git commit:
```bash
git add README.md
git commit -m "docs: Update README with deployment URLs"
git push
```

---

### ADDIM 5: Final Test və Təqdim (5 dəqiqə)

#### Test edin:

```bash
# 1. Health
curl https://your-app.up.railway.app/health

# 2. Countries
curl https://your-app.up.railway.app/api/v1/countries

# 3. Swagger (browser-da)
open https://your-app.up.railway.app/api-docs
```

#### Təqdim məlumatları:

```
📦 TƏQDIM MƏLUMATLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Student Name: [Adınız]
Date: 9 Şubat 2026

🔗 GitHub Repository: 
https://github.com/your-username/countries-cities-api

🌐 Live API: 
https://your-app.up.railway.app

📚 Swagger Documentation: 
https://your-app.up.railway.app/api-docs

📮 Postman Collection: 
https://documenter.getpostman.com/view/your-id

👤 Admin Credentials:
Email: admin@example.com
Password: Admin123

✅ Features:
- JWT Authentication ✓
- Admin Authorization ✓
- CRUD Operations ✓
- Pagination (max 20) ✓
- Redis Caching ✓
- Swagger Docs ✓
- Rate Limiting ✓
- 10 Countries + 19 Cities ✓

🛠️ Tech Stack:
Node.js, Express.js, PostgreSQL, Redis, JWT, Swagger

☁️ Cloud Platform: Railway.app
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ⏱️ ÜMUMI VAXT: ~1 saat

| Addım | Vaxt |
|-------|------|
| 1. GitHub | 5 dəq |
| 2. Railway | 20 dəq |
| 3. Postman | 25 dəq |
| 4. README | 5 dəq |
| 5. Test | 5 dəq |

---

## 🎯 HAZIR OLDUQDA:

Bu linkləri təqdim edin:
1. ✅ GitHub: `https://github.com/...`
2. ✅ Live API: `https://....railway.app`
3. ✅ Swagger: `https://....railway.app/api-docs`
4. ✅ Postman: `https://documenter.getpostman.com/view/...`

---

## 🆘 PROBLEM OLARSA:

### Railway deploy olmuyor?
```bash
# Logs-da baxın: Railway Dashboard → Service → Logs
# Database variable-ları yoxlayın
```

### Postman token işləmir?
```bash
# Login request-də Tests tab-ını əlavə etdiniz?
# Token environment-də save olur?
```

### Database boşdur?
```bash
railway run npm run db:setup
railway run npm run db:seed
```

---

## ✅ UĞURLAR! 🚀

Sualınız varsa yaz!

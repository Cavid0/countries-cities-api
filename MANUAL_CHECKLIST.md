# ✅ Manual Deploy Checklist

**Qeyd:** Bu checklist-i print edib və ya ayrı tab-da açıb işarələyə bilərsiniz!

---

## 🎯 ÜMUMİ PROSESİN İCMALI

| Step | Name | Vaxt | Status |
|------|------|------|--------|
| 1 | GitHub Repo | 5 dəq | ⬜ |
| 2 | Railway Deploy | 20 dəq | ⬜ |
| 3 | Postman Collection | 25 dəq | ⬜ |
| 4 | README Update | 5 dəq | ⬜ |
| 5 | Final Test | 5 dəq | ⬜ |

**Cəmi Vaxt:** ~60 dəqiqə

---

## 📋 ADDIM 1: GITHUB REPOSITORY (5 dəqiqə)

### 1.1 Hesab Yarat
- ⬜ https://github.com/signup açın
- ⬜ Email ilə qeydiyyatdan keçin
- ⬜ Username seçin (məsələn: `cavid2006`)
- ⬜ Email verify edin

### 1.2 Repo Yarat
- ⬜ https://github.com/new açın
- ⬜ Repository name: `countries-cities-api`
- ⬜ Description: `RESTful API for countries and cities with JWT auth`
- ⬜ **Public** seçin (mühüm! private olmamalı)
- ⬜ README, .gitignore əlavə ETMƏYİN (bizim var)
- ⬜ "Create repository" düyməsi

### 1.3 Local Kodu Push Edin
Terminal-da bu komandaları run edin:

```bash
# 1. Remote əlavə edin (YOUR_USERNAME-ni dəyişdirin!)
git remote add origin https://github.com/YOUR_USERNAME/countries-cities-api.git

# 2. Push edin
git push -u origin main
```

**YOXLAMA:**
- ⬜ https://github.com/YOUR_USERNAME/countries-cities-api açıldı?
- ⬜ 43 fayl görünür?
- ⬜ README.md düzgün render olunur?

**Repo URL-ni qeyd edin:**
```
GitHub: https://github.com/_______________/countries-cities-api
```

---

## 📋 ADDIM 2: RAILWAY.APP DEPLOY (20 dəqiqə)

### 2.1 Hesab Aç
- ⬜ https://railway.app açın
- ⬜ "Login with GitHub" düyməsi
- ⬜ GitHub ilə authorize edin

### 2.2 New Project
- ⬜ Dashboard-da "New Project"
- ⬜ "Deploy from GitHub repo" seçin
- ⬜ `countries-cities-api` repository seçin
- ⬜ Deploy başlasın (2-3 dəqiqə çəkə bilər)

### 2.3 PostgreSQL Əlavə Et
- ⬜ Project-də "New" → "Database"
- ⬜ "Add PostgreSQL" seçin
- ⬜ Database yaradılsın

### 2.4 Redis Əlavə Et
- ⬜ Project-də "New" → "Database"
- ⬜ "Add Redis" seçin
- ⬜ Redis yaradılsın

### 2.5 Environment Variables
- ⬜ Service-i seçin (Node.js app)
- ⬜ "Variables" tab
- ⬜ "Raw Editor" düyməsi
- ⬜ Bu dəyişənləri əlavə edin:

```bash
NODE_ENV=production
JWT_SECRET=my_super_secret_key_2026_production
JWT_REFRESH_SECRET=my_refresh_secret_2026_production
ITEMS_PER_PAGE=20
PORT=3000
```

- ⬜ "Save Changes" və redeploy gözləyin

### 2.6 Domain Yarat
- ⬜ Service → "Settings" tab
- ⬜ "Networking" bölməsi
- ⬜ "Generate Domain" düyməsi
- ⬜ URL kopyalayın (məsələn: `https://countries-api-xxx.up.railway.app`)

### 2.7 Database Setup
Railway Shell açın və komandaları run edin:

- ⬜ Service seçin → ⚡ icon (Shell)
- ⬜ `npm run db:setup` (admin user yarat)
- ⬜ `npm run db:seed` (10 ölkə + 19 şəhər)

### 2.8 Test
Terminal-dan test edin:

```bash
# Health check
curl https://your-app.up.railway.app/health

# Countries endpoint
curl https://your-app.up.railway.app/api/countries
```

**YOXLAMA:**
- ⬜ Health endpoint 200 OK qaytarır?
- ⬜ Countries endpoint 10 ölkə görsənir?
- ⬜ Swagger açılır: `/api-docs`

**Railway URL-ni qeyd edin:**
```
Live API: https://_________________________________.up.railway.app
Swagger: https://_________________________________.up.railway.app/api-docs
```

---

## 📋 ADDIM 3: POSTMAN COLLECTION (25 dəqiqə)

### 3.1 Postman Yüklə
- ⬜ https://www.postman.com/downloads/ açın
- ⬜ macOS versiyasını yükləyin
- ⬜ İnstall və açın
- ⬜ Account yaradın (email ilə)

### 3.2 Workspace Yarat
- ⬜ Sol tərəfdə "Workspaces"
- ⬜ "Create Workspace"
- ⬜ Name: `Countries API`
- ⬜ Visibility: **Public** (mühüm!)

### 3.3 Collection Yarat
- ⬜ "New" → "Collection"
- ⬜ Name: `Countries and Cities API`
- ⬜ Description: `RESTful API with JWT authentication for countries and cities data. Bootcamp project.`

### 3.4 Environment Yarat
- ⬜ Environments tab (sol sidebar)
- ⬜ "+" düyməsi
- ⬜ Name: `Railway Production`
- ⬜ Variable əlavə:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `https://your-app.up.railway.app/api` | (same) |
| `token` | | |

### 3.5 Authentication Folder
Folder yaradın: **📁 1. Authentication**

- ⬜ Request 1: `Register User`
  - Method: POST
  - URL: `{{base_url}}/auth/register`
  - Body (JSON):
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "Test1234"
    }
    ```

- ⬜ Request 2: `Login`
  - Method: POST
  - URL: `{{base_url}}/auth/login`
  - Body (JSON):
    ```json
    {
      "email": "admin@example.com",
      "password": "Admin123"
    }
    ```
  - **Tests** tab-a əlavə edin:
    ```javascript
    if (pm.response.code === 200) {
        const jsonData = pm.response.json();
        pm.environment.set("token", jsonData.data.accessToken);
    }
    ```

- ⬜ Request 3: `Get My Profile`
  - Method: GET
  - URL: `{{base_url}}/auth/me`
  - Authorization: Bearer Token → `{{token}}`

- ⬜ Request 4: `Refresh Token`
  - Method: POST
  - URL: `{{base_url}}/auth/refresh`
  - Body (JSON):
    ```json
    {
      "refreshToken": "paste_token_here"
    }
    ```

### 3.6 Countries Public Folder
Folder yaradın: **📁 2. Countries (Public)**

- ⬜ `Get All Countries`
  - Method: GET
  - URL: `{{base_url}}/countries`
  
- ⬜ `Get Countries with Pagination`
  - Method: GET
  - URL: `{{base_url}}/countries?page=1&limit=5`

- ⬜ `Search Countries by Name`
  - Method: GET
  - URL: `{{base_url}}/countries?search=aze`

- ⬜ `Filter by Region`
  - Method: GET
  - URL: `{{base_url}}/countries?region=Asia`

- ⬜ `Get Country by ID`
  - Method: GET
  - URL: `{{base_url}}/countries/:id` (id parametri düzəldin)

- ⬜ `Get Country Statistics`
  - Method: GET
  - URL: `{{base_url}}/countries/stats/summary`

### 3.7 Countries Admin Folder
Folder yaradın: **📁 3. Countries (Admin Only)**

**Qeyd:** Bütün requestlərə Authorization əlavə edin: Bearer Token → `{{token}}`

- ⬜ `Create Country (Admin)`
  - Method: POST
  - URL: `{{base_url}}/countries`
  - Authorization: Bearer `{{token}}`
  - Body (JSON):
    ```json
    {
      "name": "Test Country",
      "code": "TC",
      "capital": "Test Capital",
      "population": 1000000,
      "area": 50000,
      "region": "Test Region",
      "latitude": "40.0",
      "longitude": "45.0"
    }
    ```

- ⬜ `Update Country (Admin)`
  - Method: PUT
  - URL: `{{base_url}}/countries/:id`
  - Authorization: Bearer `{{token}}`
  - Body (JSON):
    ```json
    {
      "population": 2000000
    }
    ```

- ⬜ `Delete Country (Admin)`
  - Method: DELETE
  - URL: `{{base_url}}/countries/:id`
  - Authorization: Bearer `{{token}}`

### 3.8 Cities Folder
Folder yaradın: **📁 4. Cities**

- ⬜ `Get All Cities`
  - Method: GET
  - URL: `{{base_url}}/cities`

- ⬜ `Get Capital Cities`
  - Method: GET
  - URL: `{{base_url}}/cities/capitals`

- ⬜ `Get Cities by Country`
  - Method: GET
  - URL: `{{base_url}}/cities/country/:countryId`

- ⬜ `Create City (Admin)`
  - Method: POST
  - URL: `{{base_url}}/cities`
  - Authorization: Bearer `{{token}}`
  - Body (JSON):
    ```json
    {
      "name": "Test City",
      "countryId": "paste_country_id",
      "population": 500000,
      "latitude": "40.0",
      "longitude": "45.0",
      "isCapital": false
    }
    ```

### 3.9 Publish Collection
- ⬜ Collection-a sağ klik → "Share"
- ⬜ "Get Public Link" tab
- ⬜ "Generate Public Link" düyməsi
- ⬜ URL kopyalayın

**Postman URL-ni qeyd edin:**
```
Postman: https://documenter.getpostman.com/_____________________________
```

---

## 📋 ADDIM 4: README.md UPDATE (5 dəqiqə)

### 4.1 README-ni Redaktə Edin
Fayl açın: `README.md`

**Author bölməsini tapın və dəyişdirin:**

```markdown
## 👤 Author

**Cavid Aliyev**
- GitHub: [@cavid2006](https://github.com/cavid2006)
- Email: cavid.aliyev@example.com
- Bootcamp: [Bootcamp Name] - 2026
```

**Links bölməsini tapın və dəyişdirin:**

```markdown
## 🔗 Links

- **Live API**: https://your-app.up.railway.app
- **Swagger Documentation**: https://your-app.up.railway.app/api-docs
- **Postman Collection**: https://documenter.getpostman.com/...
- **GitHub Repository**: https://github.com/cavid2006/countries-cities-api
```

### 4.2 Commit və Push
Terminal-da:

```bash
git add README.md
git commit -m "docs: Add deployment URLs and author info"
git push
```

**YOXLAMA:**
- ⬜ GitHub-da README düzgün görünür?
- ⬜ Linklərin hamısı işləyir?

---

## 📋 ADDIM 5: FINAL TEST (5 dəqiqə)

### 5.1 Health Check
```bash
curl https://your-app.up.railway.app/health
```
- ⬜ Status: OK

### 5.2 Public Endpoints
```bash
# Countries
curl https://your-app.up.railway.app/api/countries

# Cities
curl https://your-app.up.railway.app/api/cities
```
- ⬜ 10 ölkə qayıdır
- ⬜ 19 şəhər qayıdır

### 5.3 Swagger UI
Browser-da açın:
```
https://your-app.up.railway.app/api-docs
```
- ⬜ Swagger UI düzgün render olunur
- ⬜ Authentication → Login test edin
- ⬜ Countries → GET /countries test edin

### 5.4 Postman Collection
- ⬜ Public link açılır
- ⬜ Documentation oxunaqlıdır
- ⬜ "Run in Postman" düyməsi işləyir

---

## ✅ TƏQDİM MƏLUMATLARı

İndi bu məlumatları bootcamp təqdimat formasına və ya Google Form-a daxil edin:

### Mütləq Linklərimiz:

| Item | Link |
|------|------|
| **GitHub Repo** | https://github.com/____________/countries-cities-api |
| **Live API** | https://____________.up.railway.app |
| **Swagger Docs** | https://____________.up.railway.app/api-docs |
| **Postman Collection** | https://documenter.getpostman.com/____________ |

### Test Credentials:
```
Admin User:
Email: admin@example.com
Password: Admin123
```

### API Features:
- ✅ JWT Authentication (Login/Register/Refresh)
- ✅ Public GET endpoints (Countries, Cities)
- ✅ Protected POST/PUT/DELETE (Admin only)
- ✅ Pagination (max 20 items per page)
- ✅ Redis Caching (60 sec TTL)
- ✅ Swagger/OpenAPI Documentation
- ✅ PostgreSQL Database
- ✅ Rate Limiting (100 req/15min general, 5 req/15min auth)
- ✅ Input Validation
- ✅ Error Handling
- ✅ Search & Filtering
- ✅ Statistics Endpoints

### Data Count:
- **Countries:** 10
- **Cities:** 19
- **Users:** 1 (admin)

---

## 🎉 UĞURLAR!

İndi bütün proseslər tamamlanıb. Bootcamp mentorlarınıza təqdim edə bilərsiniz!

**Qeyd:** Problemləriniz varsa:
1. `TROUBLESHOOTING.md` faylına baxın
2. Railway logs-lara baxın: Service → Deployments → Logs
3. Postman Console açın (View → Show Postman Console)

---

**⏱️ Ümumi Müddət:** ~60 dəqiqə  
**✅ Status:** [ ] Tamamlandı  
**📅 Tarix:** ___ / ___ / 2026


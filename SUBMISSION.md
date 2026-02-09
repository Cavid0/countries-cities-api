# 📤 TAPŞIRIĞIN TƏQDİMİ (Submission Guide)

Bu fayl sizə tapşırığı necə təqdim edəcəyinizi izah edir.

---

## ✅ NƏ GÖNDƏRMƏLİSİNİZ?

Tapşırığı təqdim edərkən aşağıdakıları **mütləq** göndərməlisiniz:

### 1. GitHub Repository URL
```
https://github.com/sizin-username/countries-cities-api
```

**Necə hazırlamaq:**

#### Addım 1: GitHub-da hesab açın
- [github.com](https://github.com) - əgər hesabınız yoxdursa

#### Addım 2: Repository yaradın
- "New Repository" düyməsinə klikləyin
- Ad: `countries-cities-api` (və ya istədiyiniz ad)
- Description: `A RESTful API for countries and cities data with authentication, caching, and documentation`
- Public seçin (hamı görə bilsin)
- README və .gitignore əlavə etməyin (artıq var)
- "Create Repository" düyməsinə klikləyin

#### Addım 3: Kodu GitHub-a yükləyin
```bash
cd /Users/cavid2006/Desktop/api

# Git-i başlat
git init

# .gitignore yoxlayın (artıq var)
# .env faylı commit edilməməlidir!

# Bütün faylları əlavə edin
git add .

# İlk commit
git commit -m "feat: Initial commit - Countries and Cities API with authentication, caching, and Swagger docs"

# Remote əlavə edin (GitHub-dan aldığınız URL)
git remote add origin https://github.com/sizin-username/countries-cities-api.git

# Push edin
git branch -M main
git push -u origin main
```

---

### 2. Live API URL (Deploy edilmiş)
```
https://your-api-name.railway.app
```

**Necə əldə etmək:**

#### Variant A: Railway.app (Tövsiyə edilir - ən asan)

1. **Railway.app-da qeydiyyatdan keçin**
   - [railway.app](https://railway.app)
   - GitHub hesabınızla daxil olun

2. **Yeni project yaradın**
   - "New Project" düyməsi
   - "Deploy from GitHub repo" seçin
   - Repository-nizi seçin (`countries-cities-api`)

3. **PostgreSQL əlavə edin**
   - "New" → "Database" → "Add PostgreSQL"
   - Railway avtomatik environment variables təyin edəcək

4. **Redis əlavə edin**
   - "New" → "Database" → "Add Redis"
   - Railway avtomatik environment variables təyin edəcək

5. **Environment Variables təyin edin**
   Service-nizi seçin → Variables tab:
   ```
   NODE_ENV=production
   JWT_SECRET=your_production_secret_key_here_min_32_chars
   JWT_REFRESH_SECRET=your_refresh_secret_key_here_min_32_chars
   ITEMS_PER_PAGE=20
   PORT=3000
   ```

6. **Domain yaradın**
   - Settings → Networking → "Generate Domain"
   - URL alacaqsınız: `https://your-app.railway.app`

7. **Database setup edin**
   - Service → "Shell" açın (və ya local terminaldan)
   ```bash
   npm run db:setup
   npm run db:seed
   ```

8. **Test edin:**
   ```
   https://your-app.railway.app/health
   https://your-app.railway.app/api-docs
   ```

#### Variant B: Heroku, AWS, Azure
- [DEPLOYMENT.md](DEPLOYMENT.md) faylına baxın

---

### 3. Swagger Documentation URL
```
https://your-api-name.railway.app/api-docs
```

Deploy edildikdən sonra avtomatik işləyir!

Test edin:
- Bütün endpoint-lərin göründüyünü yoxlayın
- "Try it out" funksiyası işləməlidir
- Authentication testi edin

---

### 4. Postman Collection URL
```
https://documenter.getpostman.com/view/12345678/your-collection
```

**Necə hazırlamaq:**

#### Addım 1: Postman yükləyin
- [postman.com/downloads](https://www.postman.com/downloads)

#### Addım 2: Collection yaradın

**Workspace:**
- "My Workspace" və ya yeni workspace yaradın

**Collection yaradın:**
- "New" → "Collection"
- Ad: `Countries and Cities API`
- Description: API haqqında qısa məlumat

#### Addım 3: Endpoint-ləri əlavə edin

**Folder strukturu:**
```
Countries and Cities API/
├── Authentication/
│   ├── Register
│   ├── Login
│   ├── Refresh Token
│   └── Get Current User
├── Countries/
│   ├── Get All Countries
│   ├── Get Country by ID
│   ├── Get Country Stats
│   ├── Create Country (Admin)
│   ├── Update Country (Admin)
│   └── Delete Country (Admin)
└── Cities/
    ├── Get All Cities
    ├── Get City by ID
    ├── Get Cities by Country
    ├── Get Capital Cities
    ├── Create City (Admin)
    ├── Update City (Admin)
    └── Delete City (Admin)
```

**Hər endpoint üçün:**
- Method (GET, POST, PUT, DELETE)
- URL: `{{base_url}}/api/v1/...`
- Headers (əgər lazımdırsa): `Authorization: Bearer {{token}}`
- Body (POST/PUT üçün)
- Nümunə response

#### Addım 4: Environment variables
Collection-unuzda environment yaradın:

**Variables:**
```
base_url: https://your-api.railway.app
token: (login edəndən sonra avtomatik set ediləcək)
```

**Scripts əlavə edin (Login üçün):**
```javascript
// Tests tab-da:
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
});

// Tokeni yadda saxla
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.data.accessToken);
```

#### Addım 5: Collection-u test edin
- Bütün endpoint-ləri test edin
- Screenshot-lar alın (lazım ola bilər)

#### Addım 6: Publish edin
- Collection → "..." → "Publish"
- "Publish as public documentation" seçin
- Link alacaqsınız: `https://documenter.getpostman.com/view/...`

#### Addım 7: README-yə əlavə edin
README.md faylındakı Postman linkini yeniləyin

---

### 5. README.md Yeniləyin

README.md faylında bu məlumatlar **mütləq** olmalıdır:

```markdown
## 👨‍💻 Author
Adınız Soyadınız
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🔗 Links
- **Live API:** https://your-api.railway.app
- **Swagger Docs:** https://your-api.railway.app/api-docs
- **Postman Collection:** https://documenter.getpostman.com/view/your-id
- **GitHub Repository:** https://github.com/your-username/countries-cities-api

## 🚀 Quick Test
\`\`\`bash
# Health check
curl https://your-api.railway.app/health

# Get countries
curl https://your-api.railway.app/api/v1/countries
\`\`\`

## 📊 Database Stats
- Countries: 10+ (sample data)
- Cities: 19+ (sample data)
- Note: Can be expanded to 1000+ records
```

---

## 📋 SUBMISSION CHECKLIST

Təqdim etməzdən əvvəl bu checklist-i yoxlayın:

### GitHub Repository
- [ ] Kod GitHub-a yüklənib
- [ ] README.md dolduruludur
- [ ] .env faylı commit EDİLMƏYİB (.gitignore-da var)
- [ ] Repository public-dir (hamı görə bilər)
- [ ] Repository description yazılıb
- [ ] README-də bütün başlıqlar doludur

### Deployed Application
- [ ] API Railway/Heroku/AWS-də deploy olunub
- [ ] Database setup edilib (cədvəllər yaradılıb)
- [ ] Sample data yüklənib (10+ ölkə)
- [ ] Health endpoint işləyir: `/health`
- [ ] Countries endpoint işləyir: `/api/v1/countries`
- [ ] Swagger docs açılır: `/api-docs`
- [ ] Authentication işləyir (login/register)
- [ ] Admin endpoints işləyir (token ilə)
- [ ] Redis cache işləyir

### API Requirements
- [ ] ✅ User authentication (JWT)
- [ ] ✅ User token (OAuth - JWT)
- [ ] ✅ GET endpoints public (token tələb etmir)
- [ ] ✅ POST/PUT/DELETE protected (admin token lazım)
- [ ] ✅ Pagination (max 20 per page)
- [ ] ✅ Redis caching
- [ ] ✅ Swagger documentation
- [ ] ✅ Rate limiting
- [ ] ⏳ Data 1000+ rows (optional - minimum 10+ var)
- [ ] ⏳ GraphQL interface (OPTIONAL)

### Documentation
- [ ] Swagger docs işləyir və complete
- [ ] Postman collection yaradılıb
- [ ] Postman collection publish edilib
- [ ] README.md complete və oxunaqlıdır
- [ ] README-də bütün URL-lər düzgün
- [ ] API endpoints sənədləşdirilib

### Security
- [ ] .env faylı GitHub-da YOX
- [ ] Production JWT secrets təyin edilib
- [ ] Admin password dəyişdirilib (demodan fərqli)
- [ ] CORS konfiqurasiyası düzgündür
- [ ] Rate limiting aktiv

---

## 📤 TƏQDİM FORMATI

Tapşırığı təqdim edərkən bu formatda göndərin:

### Email/Platform üzərindən:

**Subject:** Countries and Cities API - Final Submission

**Body:**
```
Project: Countries and Cities API
Student Name: [Adınız Soyadınız]
Date: [Tarix]

Links:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 GitHub Repository: https://github.com/your-username/countries-cities-api
🌐 Live API: https://your-api.railway.app
📚 Swagger Docs: https://your-api.railway.app/api-docs
📮 Postman Collection: https://documenter.getpostman.com/view/your-id

Test Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Admin Email: admin@example.com
Admin Password: [your-new-password]

Quick Test:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Health: https://your-api.railway.app/health
Countries: https://your-api.railway.app/api/v1/countries

Features Implemented:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ JWT Authentication
✅ User Authorization (Admin/User roles)
✅ CRUD Operations (Countries & Cities)
✅ Pagination (max 20 per page)
✅ Redis Caching
✅ Swagger Documentation
✅ Rate Limiting
✅ Input Validation
✅ Error Handling
✅ Public GET endpoints
✅ Protected POST/PUT/DELETE endpoints

Database:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Countries: 10
Cities: 19
(Can be expanded to 1000+ records)

Tech Stack:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Node.js + Express.js
- PostgreSQL
- Redis
- JWT Authentication
- Swagger/OpenAPI
- Sequelize ORM

Cloud Platform: Railway.app

Notes:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
All endpoints are tested and working.
Full documentation available in README.md and Swagger.

Thank you!
```

---

## ⏱️ ZAMAN PLANI

**Ümumi vaxt: 2-3 saat**

| Task | Time | Description |
|------|------|-------------|
| GitHub setup | 10 min | Repository yarat və push et |
| Railway deploy | 30 min | Database, Redis, deploy |
| Database setup | 10 min | npm run db:setup, seed |
| Test endpoints | 15 min | Bütün endpoint-ləri test et |
| Postman collection | 30 min | 15+ endpoint əlavə et |
| Publish Postman | 10 min | Collection-u publish et |
| README update | 15 min | Bütün linkləri əlavə et |
| Final testing | 20 min | Hər şeyi yenidən test et |

---

## 🆘 PROBLEM OLARSA

### Deploy işləmir
- Railway logs-a baxın
- Environment variables düzgündürmü yoxlayın
- Database connection string-i yoxlayın

### Database boşdur
```bash
# Railway shell-dən və ya local-dan:
npm run db:setup
npm run db:seed
```

### Swagger açılmır
- `/api-docs` URL-ə daxil olun
- Logs-da error varmı yoxlayın
- Port düzgündürmü yoxlayın

### Postman 401 error
- Token almısınızmı yoxlayın
- Token expired ola bilər (yenidən login)
- Bearer prefix var? `Bearer your-token`

---

## ✅ SON YOXLAMA

Təqdim etməzdən əvvəl bu URL-ləri yoxlayın:

```bash
# 1. Health check
curl https://your-api.railway.app/health

# 2. Countries (public)
curl https://your-api.railway.app/api/v1/countries

# 3. Swagger docs (browser-da)
https://your-api.railway.app/api-docs

# 4. Login (token alın)
curl -X POST https://your-api.railway.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123"}'

# 5. Protected endpoint (token ilə)
curl https://your-api.railway.app/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Hamısı işləyirsə - təqdim etməyə hazırsınız! ✅

---

## 📞 Contact

Sualınız varsa:
- GitHub Issues: Repository-nizdə issue açın
- Email: Müəllim/mentor emailinə yazın

**Uğurlar! 🚀**

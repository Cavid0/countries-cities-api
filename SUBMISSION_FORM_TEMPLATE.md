# 📝 Bootcamp Submission Form Template

**Bu template-i bootcamp təqdimat formasına və ya mentor-a email göndərəndə istifadə edə bilərsiniz.**

---

## 🎓 BOOTCAMP SUBMISSION

### 1️⃣ Project Information

**Project Title:**  
Countries and Cities RESTful API

**Project Description:**  
Professional RESTful API service providing comprehensive information about countries and cities worldwide. Features JWT-based authentication, role-based access control (public/admin), Redis caching, pagination, search/filter capabilities, and complete API documentation via Swagger/OpenAPI 3.0.

**Tech Stack:**
- Backend: Node.js 18+ with Express.js 4.18
- Database: PostgreSQL 14
- Cache: Redis 8.4
- ORM: Sequelize 6.35
- Authentication: JWT (jsonwebtoken + bcryptjs)
- Documentation: Swagger UI Express
- Deployment: Railway.app (Cloud Platform)

**Development Duration:**  
[X] gün (və ya: Approximately 3-5 days)

---

### 2️⃣ Links & URLs

**GitHub Repository:**  
`https://github.com/YOUR_USERNAME/countries-cities-api`

**Live API URL:**  
`https://your-app.up.railway.app`

**API Documentation (Swagger):**  
`https://your-app.up.railway.app/api-docs`

**Postman Collection:**  
`https://documenter.getpostman.com/view/...`

---

### 3️⃣ Test Credentials

**Admin Account:**
```
Email: admin@example.com
Password: Admin123
```

**Test User Account (optional):**
```
Email: test@example.com
Password: Test1234
```

> **Qeyd:** Admin hesabı ilə POST/PUT/DELETE əməliyyatları etmək olar.  
> Regular user yalnız public GET endpoint-lərə daxil ola bilər.

---

### 4️⃣ API Features Checklist

#### ✅ Authentication & Authorization
- [x] User Registration (POST /auth/register)
- [x] User Login with JWT (POST /auth/login)
- [x] Token Refresh (POST /auth/refresh)
- [x] Get Current User Profile (GET /auth/me)
- [x] Password Hashing (bcryptjs)
- [x] Role-Based Access Control (user/admin)

#### ✅ Public Endpoints (No Auth Required)
- [x] Get All Countries (GET /countries)
- [x] Get Country by ID (GET /countries/:id)
- [x] Search Countries (GET /countries?search=...)
- [x] Filter by Region (GET /countries?region=...)
- [x] Get All Cities (GET /cities)
- [x] Get Capital Cities (GET /cities/capitals)
- [x] Get Cities by Country (GET /cities/country/:id)
- [x] Pagination Support (max 20 items per page)

#### ✅ Protected Endpoints (Admin Only)
- [x] Create Country (POST /countries)
- [x] Update Country (PUT /countries/:id)
- [x] Delete Country (DELETE /countries/:id)
- [x] Create City (POST /cities)
- [x] Update City (PUT /cities/:id)
- [x] Delete City (DELETE /cities/:id)

#### ✅ Advanced Features
- [x] Redis Caching (60 seconds TTL)
- [x] Automatic Cache Invalidation on mutations
- [x] Rate Limiting (100 req/15min general, 5 req/15min auth)
- [x] Input Validation (express-validator)
- [x] Global Error Handling
- [x] Statistics Endpoints (GET /countries/stats/summary)
- [x] Sorting & Searching
- [x] CORS Enabled
- [x] Security Headers (Helmet.js)
- [x] Request Compression

#### ✅ Documentation & Testing
- [x] Swagger/OpenAPI 3.0 Documentation
- [x] Postman Collection (15+ requests)
- [x] Comprehensive README.md
- [x] API Testing Guide
- [x] Deployment Instructions

---

### 5️⃣ Database Statistics

**Total Records:**
- Countries: 10
- Cities: 19
- Users: 1 (admin)

**Sample Countries:**
- Azerbaijan 🇦🇿
- Turkey 🇹🇷
- USA 🇺🇸
- United Kingdom 🇬🇧
- Germany 🇩🇪
- France 🇫🇷
- Japan 🇯🇵
- Australia 🇦🇺
- Canada 🇨🇦
- Brazil 🇧🇷

**Sample Cities:**
- Baku (Azerbaijan - Capital)
- Ganja (Azerbaijan)
- Ankara (Turkey - Capital)
- Istanbul (Turkey)
- Washington DC (USA - Capital)
- New York (USA)
- London (UK - Capital)
- Berlin (Germany - Capital)
- Paris (France - Capital)
- Tokyo (Japan - Capital)
- ... və s.

---

### 6️⃣ API Test Examples

#### Example 1: Get All Countries
```bash
curl https://your-app.up.railway.app/api/countries
```

**Expected Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 10,
    "itemsPerPage": 20,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

#### Example 2: Login & Get Token
```bash
curl -X POST https://your-app.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "...",
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

#### Example 3: Create New Country (Admin)
```bash
curl -X POST https://your-app.up.railway.app/api/countries \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Country",
    "code": "NC",
    "capital": "New Capital",
    "population": 1000000,
    "area": 50000,
    "region": "Europe"
  }'
```

---

### 7️⃣ Project Structure

```
api/
├── src/
│   ├── config/          # Database, Redis, Auth configs
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, Cache, Error handling
│   ├── models/          # Sequelize models (User, Country, City)
│   ├── routes/          # API routes
│   ├── validators/      # Request validation
│   ├── database/        # Setup & seed scripts
│   ├── utils/           # Helper functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── .env.example         # Environment variables template
├── package.json         # Dependencies
└── README.md            # Documentation
```

---

### 8️⃣ Environment Variables

```env
NODE_ENV=production
PORT=3000

# Database (Auto-injected by Railway)
DATABASE_URL=postgresql://...

# Redis (Auto-injected by Railway)
REDIS_URL=redis://...

# JWT Secrets
JWT_SECRET=my_super_secret_key_2026_production
JWT_REFRESH_SECRET=my_refresh_secret_2026_production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Pagination
ITEMS_PER_PAGE=20
```

---

### 9️⃣ Deployment Platform

**Platform:** Railway.app  
**Reason for Choice:**
- Free tier available for bootcamp projects
- Automatic deployments from GitHub
- Built-in PostgreSQL and Redis
- Zero-config deployment
- Custom domain support
- Easy environment variable management
- Real-time logs and monitoring

**Deployment Steps:**
1. Connect GitHub repository
2. Add PostgreSQL database
3. Add Redis cache
4. Configure environment variables
5. Generate public domain
6. Run database migrations

---

### 🔟 Additional Notes

**Security Implementation:**
- [x] Password hashing with bcryptjs (10 salt rounds)
- [x] JWT tokens with expiration
- [x] Helmet.js for HTTP headers
- [x] CORS configuration
- [x] Rate limiting (brute-force protection)
- [x] Input validation & sanitization
- [x] SQL injection prevention (Sequelize ORM)
- [x] Error messages without sensitive info

**Performance Optimizations:**
- [x] Redis caching for read-heavy endpoints
- [x] Database indexes on frequently queried fields
- [x] Response compression (gzip)
- [x] Connection pooling (Sequelize)
- [x] Pagination to limit response size

**Code Quality:**
- [x] ESLint configuration
- [x] Consistent error handling
- [x] Modular architecture (MVC pattern)
- [x] Reusable middleware
- [x] Comprehensive comments
- [x] Git version control

---

### 📞 Contact Information

**Student Name:** [Your Full Name]  
**Email:** [your.email@example.com]  
**GitHub:** [@your_username](https://github.com/your_username)  
**LinkedIn:** [Your LinkedIn Profile] (optional)  
**Bootcamp:** [Bootcamp Name / Cohort]  
**Submission Date:** [DD/MM/YYYY]

---

### 🙏 Acknowledgments

- REST Countries API (data source reference)
- Railway.app (hosting platform)
- Postman (API testing)
- Swagger/OpenAPI (documentation)
- Node.js & Express.js community

---

## ✅ SELF-ASSESSMENT

| Criteria | Status | Notes |
|----------|--------|-------|
| All endpoints work | ✅ | Tested via Postman |
| Authentication secure | ✅ | JWT + bcrypt |
| Pagination implemented | ✅ | Max 20 items |
| Caching working | ✅ | Redis 60s TTL |
| Swagger docs complete | ✅ | All endpoints documented |
| Postman collection ready | ✅ | 15+ requests |
| Deployed to cloud | ✅ | Railway.app |
| Code on GitHub | ✅ | Public repository |
| README comprehensive | ✅ | Setup + usage guide |
| Error handling robust | ✅ | Global error middleware |

**Overall Completion:** ✅ 100%

---

**Declaration:**  
I hereby declare that this project is my original work completed during the bootcamp program. All external resources and references have been properly acknowledged.

**Signature:** _______________  
**Date:** ___ / ___ / 2026

---

## 📎 Attachments (if required)

- [ ] Screenshots of Swagger UI
- [ ] Postman test results
- [ ] Database schema diagram
- [ ] Architecture diagram
- [ ] Performance metrics
- [ ] Video demonstration (optional)

---

**🎯 Ready to Submit! Good luck! 🚀**

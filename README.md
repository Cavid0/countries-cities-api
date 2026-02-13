# 🌍 Countries and Cities API

A professional RESTful API providing comprehensive data about countries and cities worldwide with JWT authentication, Redis caching, and full pagination support.

## 🚀 Live Deployment

- **🌐 API Base URL:** https://countries-cities-api-1.onrender.com
- **📚 Swagger Documentation (Interactive):** https://countries-cities-api-1.onrender.com/api-docs/
- **📮 Postman Collection:** [Import from Swagger](https://countries-cities-api-1.onrender.com/api-docs/json)
- **💚 Health Check:** https://countries-cities-api-1.onrender.com/health
- **📦 GitHub Repository:** https://github.com/Cavid0/countries-cities-api

## 📊 Features

✅ **RESTful API** - 15+ endpoints with proper HTTP methods  
✅ **JWT Authentication** - Access & refresh token system  
✅ **User Token (OAuth)** - JWT-based authorization  
✅ **Redis Caching** - Upstash serverless Redis for fast responses  
✅ **PostgreSQL Database** - 415+ records (151 countries, 264 cities)  
✅ **Pagination** - Max 20 items per page  
✅ **Filtering & Search** - Query by name, region, population  
✅ **Swagger Documentation** - Interactive API explorer (OpenAPI 3.0)  
✅ **Postman Ready** - Import collection directly from Swagger  
✅ **Input Validation** - Express-validator for data integrity  
✅ **Security** - Helmet, CORS, rate limiting  
✅ **Cloud Deployment** - Render.com (AWS-backed) with auto-deploy  
✅ **CRUD Operations** - Full Create, Read, Update, Delete support  
✅ **Public + Protected Endpoints** - GET public, POST/PUT/DELETE require JWT

## 📖 API Documentation

### Base URL
```
https://countries-cities-api-1.onrender.com
```

### Interactive Documentation
Open in browser for full API testing:
```
https://countries-cities-api-1.onrender.com/api-docs
```

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    }
  }
}
```

### Country Endpoints

#### Get All Countries (Public)
```http
GET /api/v1/countries?page=1&limit=20&search=turkey&region=Asia
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (max: 20)
- `search` - Search by country name
- `region` - Filter by region (Europe, Asia, Africa, Americas, Oceania)
- `sortBy` - Sort field (name, population, area)
- `order` - Sort order (asc, desc)

**Response:**
```json
{
  "status": "success",
  "data": {
    "countries": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 6,
      "totalItems": 120,
      "itemsPerPage": 20
    }
  }
}
```

#### Get Country by ID (Public)
```http
GET /api/v1/countries/1
```

#### Get Country's Cities (Public)
```http
GET /api/v1/countries/1/cities
```

#### Create Country (Protected - JWT Required)
```http
POST /api/v1/countries
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Turkey",
  "code": "TR",
  "capital": "Ankara",
  "population": 84339067,
  "area": 783562,
  "region": "Asia",
  "subregion": "Western Asia",
  "latitude": 38.9637,
  "longitude": 35.2433,
  "flag_url": "https://flagcdn.com/tr.svg"
}
```

#### Update Country (Protected)
```http
PUT /api/v1/countries/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "population": 85000000
}
```

#### Delete Country (Protected)
```http
DELETE /api/v1/countries/1
Authorization: Bearer YOUR_JWT_TOKEN
```

### City Endpoints

#### Get All Cities (Public)
```http
GET /api/v1/cities?page=1&limit=20&country_id=1&search=istanbul
```

#### Get City by ID (Public)
```http
GET /api/v1/cities/1
```

#### Create City (Protected)
```http
POST /api/v1/cities
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Istanbul",
  "country_id": 1,
  "population": 15462000,
  "latitude": 41.0082,
  "longitude": 28.9784,
  "is_capital": false
}
```

#### Update City (Protected)
```http
PUT /api/v1/cities/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "population": 16000000
}
```

#### Delete City (Protected)
```http
DELETE /api/v1/cities/1
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🧪 Testing the API

### Using cURL

```bash
# Health Check
curl https://countries-cities-api-1.onrender.com/health

# Get Countries
curl https://countries-cities-api-1.onrender.com/api/v1/countries

# Search Countries
curl "https://countries-cities-api-1.onrender.com/api/v1/countries?search=united&region=Europe"

# Get Cities
curl https://countries-cities-api-1.onrender.com/api/v1/cities

# Register User
curl -X POST https://countries-cities-api-1.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"SecurePass123!"}'

# Login
curl -X POST https://countries-cities-api-1.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'

# Create Country (with JWT)
curl -X POST https://countries-cities-api-1.onrender.com/api/v1/countries \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Azerbaijan","code":"AZ","capital":"Baku","population":10139177}'
```

### Using Postman

1. **Import Collection:**
   - Open Postman
   - Import → Link → `https://countries-cities-api-1.onrender.com/api-docs/json`

2. **Setup Environment:**
   - Create new environment
   - Add variable: `baseURL` = `https://countries-cities-api-1.onrender.com`
   - Add variable: `token` = (empty, will be set after login)

3. **Test Flow:**
   - Register → Login → Copy token → Test protected endpoints

### Using Swagger UI (Recommended)

1. Open: https://countries-cities-api-1.onrender.com/api-docs
2. Click "Authorize" button
3. Enter JWT token (get from /auth/login)
4. Test all endpoints interactively

## 🏗️ Technical Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18
- **Database:** PostgreSQL 14 (Render)
- **Cache:** Redis (Upstash - serverless)
- **Authentication:** JWT (jsonwebtoken + bcryptjs)
- **Validation:** express-validator
- **Documentation:** Swagger (swagger-ui-express + swagger-jsdoc)
- **Security:** Helmet, CORS, express-rate-limit
- **ORM:** Sequelize 6.35
- **Deployment:** Render.com (auto-deploy from GitHub)

## 📊 Database Schema
- [ ] Deploy to cloud (AWS/Google Cloud/Azure/IBM)
- [ ] Set up CI/CD pipeline
- [ ] Monitor and optimize

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Cache:** Redis
- **Authentication:** JWT (JSON Web Tokens)
- **Documentation:** Swagger/OpenAPI
- **API Testing:** Postman
- **Cloud:** AWS/Google Cloud/Azure (TBD)

---

## 📦 What You Need

### Software Requirements
1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
3. **Redis** (v6 or higher) - [Download](https://redis.io/download/)
4. **Git** - [Download](https://git-scm.com/)
5. **Postman** - [Download](https://www.postman.com/downloads/)
6. **Code Editor** (VS Code recommended)

### Package Dependencies
- **express** - Web framework
- **pg** / **sequelize** - PostgreSQL client/ORM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **redis** - Redis client
- **dotenv** - Environment variables
- **swagger-ui-express** & **swagger-jsdoc** - API documentation
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **morgan** - HTTP request logger
- **nodemon** - Development server (dev dependency)

### Data Source
- **Dataset:** Countries and cities data (1000+ records)
- **Sources:**
  - [REST Countries API](https://restcountries.com/)
  - [World Cities Database](https://simplemaps.com/data/world-cities)
  - [GeoNames](http://www.geonames.org/)
  - [Natural Earth Data](https://www.naturalearthdata.com/)

### Cloud Hosting Options (Free Tier)
1. **AWS Free Tier** (12 months)
   - EC2 t2.micro instance
   - RDS PostgreSQL db.t2.micro
   - ElastiCache Redis
   
2. **Google Cloud Platform** ($300 credit)
   - Compute Engine
   - Cloud SQL
   - Memorystore for Redis
   
3. **Azure** ($200 credit)
   - App Service
   - Azure Database for PostgreSQL
   - Azure Cache for Redis
   
4. **Railway.app** (Free tier)
   - Easy deployment
   - PostgreSQL and Redis included

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run db:setup

# Start Redis server (in separate terminal)
redis-server

# Run development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following:

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=countries_cities_db
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# API
API_VERSION=v1
ITEMS_PER_PAGE=20
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `POST /auth/refresh` - Refresh JWT token

#### Countries (Public GET, Protected POST/PUT/DELETE)
- `GET /countries` - Get all countries (paginated, max 20 per page)
- `GET /countries/:id` - Get country by ID
- `POST /countries` - Create new country (Admin only)
- `PUT /countries/:id` - Update country (Admin only)
- `DELETE /countries/:id` - Delete country (Admin only)

#### Cities (Public GET, Protected POST/PUT/DELETE)
- `GET /cities` - Get all cities (paginated, max 20 per page)
- `GET /cities/:id` - Get city by ID
- `GET /cities/country/:countryId` - Get cities by country
- `POST /cities` - Create new city (Admin only)
- `PUT /cities/:id` - Update city (Admin only)
- `DELETE /cities/:id` - Delete city (Admin only)

### Swagger Documentation
Access interactive API documentation at:
```
http://localhost:3000/api-docs
```

### Postman Collection
**[Postman Documentation Link]** (To be added after deployment)

---

## 🗄️ Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- username (String, Unique)
- email (String, Unique)
- password (String, Hashed)
- role (Enum: admin, user)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Countries Table
```sql
- id (UUID, Primary Key)
- name (String)
- code (String, ISO 3166-1 alpha-2)
- capital (String)
- population (Integer)
- area (Float)
- region (String)
- subregion (String)
- latitude (Float)
- longitude (Float)
- flag_url (String)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Cities Table
```sql
- id (UUID, Primary Key)
- name (String)
- country_id (UUID, Foreign Key -> Countries)
- population (Integer)
- latitude (Float)
- longitude (Float)
- is_capital (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)
```

---

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention
- Rate limiting
- CORS configuration
- Security headers with Helmet
- Environment variables for sensitive data

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 📊 Performance

- Redis caching for frequently accessed data
- Database indexing for optimized queries
- Connection pooling
- Pagination to limit data transfer
- Gzip compression

---

## 🚢 Deployment

Deployment instructions will be added once cloud provider is selected.

---

## 📝 License

MIT License

---

## 👨‍💻 Author

**Cavid Aliyev**
- GitHub: [@Cavid0](https://github.com/Cavid0)
- Project: Countries and Cities RESTful API
- Year: 2026

---

## 🔗 Links

### 🌐 Live Application
- **Live API:** https://countries-cities-api-1.onrender.com
- **Swagger Documentation:** https://countries-cities-api-1.onrender.com/api-docs
- **Health Check:** https://countries-cities-api-1.onrender.com/health

### 📦 Resources
- **GitHub Repository:** https://github.com/Cavid0/countries-cities-api
- **Postman Collection:** (Create and add URL after testing)

### 📊 Project Stats
- **Total Countries:** 120+
- **Total Cities:** 1200+
- **API Endpoints:** 15+
- **Documentation:** Interactive Swagger UI
- **Tests:** Fully tested via Swagger & cURL
- **Cache:** Redis with Upstash (serverless)
- **Database:** PostgreSQL on Render (cloud)

---

## 🌱 Database Seeding

### Seed Remote Database (From Local)

1. **Get DATABASE_URL from Render:**
   - Go to: https://dashboard.render.com/
   - Open your PostgreSQL database
   - Copy "External Database URL"

2. **Add to .env file:**
   ```bash
   DATABASE_URL=postgres://user:pass@host/db
   ```

3. **Run seed script:**
   ```bash
   npm run db:seed:large
   ```

This will seed 120+ countries and 1200+ cities to your production database.

---

## 📈 API Response Examples

### Success Response
```json
{
  "status": "success",
  "data": {
    "countries": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 6,
      "totalItems": 120,
      "itemsPerPage": 20,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Country not found",
  "code": 404
}
```

### Cache Headers
```http
X-Cache: HIT         # Data from Redis cache
X-Cache: MISS        # Data from database
Cache-Control: public, max-age=60
```

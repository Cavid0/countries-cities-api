# 🌍 Countries and Cities API

A comprehensive RESTful API providing data about countries and cities worldwide with authentication, caching, and pagination.

## 📋 Project Roadmap

### Phase 1: Setup & Data Preparation (Week 1)
- [x] Choose tech stack (Node.js + Express.js + PostgreSQL)
- [ ] Set up project structure
- [ ] Initialize Git repository
- [ ] Find and prepare countries/cities dataset (1000+ rows)
- [ ] Set up PostgreSQL database
- [ ] Set up Redis for caching
- [ ] Create database schema and migrations

### Phase 2: Core API Development (Week 2-3)
- [ ] Implement user authentication (JWT)
- [ ] Create OAuth token system
- [ ] Build CRUD endpoints:
  - GET /api/countries (public, with pagination)
  - GET /api/countries/:id (public)
  - POST /api/countries (protected)
  - PUT /api/countries/:id (protected)
  - DELETE /api/countries/:id (protected)
  - GET /api/cities (public, with pagination)
  - GET /api/cities/:id (public)
  - POST /api/cities (protected)
  - PUT /api/cities/:id (protected)
  - DELETE /api/cities/:id (protected)
- [ ] Implement pagination (max 20 items per page)
- [ ] Add Redis caching layer
- [ ] Input validation and error handling

### Phase 3: Documentation & Testing (Week 4)
- [ ] Set up Swagger/OpenAPI documentation
- [ ] Create Postman collection
- [ ] Write API documentation
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance testing

### Phase 4: Optional Features
- [ ] GraphQL interface
- [ ] Rate limiting
- [ ] API versioning
- [ ] Advanced filtering and search

### Phase 5: Deployment (Week 5)
- [ ] Prepare for cloud deployment
- [ ] Set up environment variables
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
- **Total Countries:** 10
- **Total Cities:** 19
- **API Endpoints:** 15+
- **Documentation:** Complete
- **Tests:** API tested via Swagger & Postman

# Welcome to Countries and Cities API
***

## Task

Build a RESTful API that provides data about countries and cities worldwide with the following requirements:

- JWT authentication with access and refresh tokens
- Redis caching for performance
- PostgreSQL database with 1000+ rows
- Full CRUD with pagination and filtering
- Rate limiting, input validation, CORS
- Interactive API documentation (Swagger)
- Cloud deployment

## Description

A REST API built with Node.js, Express.js, PostgreSQL, and Redis providing geographical data on countries and cities.

Authentication uses JWT with access/refresh token rotation and bcrypt password hashing. Role-based access control separates public read endpoints from admin-only write endpoints.

The database runs on PostgreSQL via Sequelize ORM with 191 countries and 809 cities (1000+ total records). Country and city records are linked by foreign key with cascade operations.

Caching is handled by Upstash Redis (serverless). Cache is invalidated automatically on mutations and falls back gracefully if Redis is unavailable.

Security includes Helmet headers, CORS, rate limiting (100 req/15min general, 5 req/15min auth), and express-validator on all inputs.

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis or Upstash account

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Cavid0/countries-cities-api.git
cd countries-cities-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://username:password@localhost:5432/countries_db

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRE=7d

REDIS_ENABLED=true
REDIS_URL=your_upstash_redis_url
REDIS_TOKEN=your_upstash_token

ITEMS_PER_PAGE=20
CORS_ORIGIN=*
```

4. Set up database:
```bash
npm run db:setup
```

5. Seed database:
```bash
npm run db:seed:large
```

## Usage

### Development
```bash
npm run dev
```

- API: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api-docs`
- Health check: `http://localhost:3000/health`

### Production
```bash
npm start
```

### Scripts
```bash
npm run dev            # Development with nodemon
npm start              # Production server
npm run db:setup       # Create tables
npm run db:seed        # Seed sample data (5 countries)
npm run db:seed:large  # Full dataset (191 countries, 809+ cities)
npm run db:reset       # Drop and recreate all tables
```

## API Endpoints

### Public

```
GET  /api/v1/countries           - List countries (paginated)
GET  /api/v1/countries/stats     - Country statistics
GET  /api/v1/countries/:id       - Country by ID
GET  /api/v1/cities              - List cities (paginated)
GET  /api/v1/cities/capitals     - Capital cities
GET  /api/v1/cities/:id          - City by ID
GET  /api/v1/cities/country/:id  - Cities by country
```

Query parameters: `page`, `size`, `search`, `region`, `subregion`, `isCapital`

### Authentication

```
POST /api/v1/auth/register  - Register
POST /api/v1/auth/login     - Login
POST /api/v1/auth/refresh   - Refresh token
GET  /api/v1/auth/me        - Current user (JWT required)
```

### Protected (Admin only)

```
POST   /api/v1/countries      - Create country
PUT    /api/v1/countries/:id  - Update country
DELETE /api/v1/countries/:id  - Delete country
POST   /api/v1/cities         - Create city
PUT    /api/v1/cities/:id     - Update city
DELETE /api/v1/cities/:id     - Delete city
```

### OAuth

```
GET /api/v1/auth/google           - Google OAuth login
GET /api/v1/auth/google/callback  - Google OAuth callback
```

**Live Link (Render):**
- Login: `https://countries-cities-api-1.onrender.com/api/v1/auth/google`

**Localhost:**
- Login: `http://localhost:3000/api/v1/auth/google`

### GraphQL

```
POST /graphql - GraphQL endpoint
GET  /graphql - GraphQL Apollo Studio playground (in browser)
```

**Live Link (Render):**
- Playground: `https://countries-cities-api-1.onrender.com/graphql`

**Localhost:**
- Playground: `http://localhost:3000/graphql`

Example GraphQL query:
```graphql
{
  countries(page: 1, size: 5, region: "Europe") {
    totalItems
    items {
      name
      code
      capital
      cities {
        name
        population
      }
    }
  }
  stats {
    totalCountries
    totalCities
  }
}
```

### Example requests

```bash
# Register
curl -X POST https://countries-cities-api-1.onrender.com/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"username":"johndoe","email":"john@example.com","password":"SecurePass123"}'

# Login
curl -X POST https://countries-cities-api-1.onrender.com/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"john@example.com","password":"SecurePass123"}'

# Get countries
curl "https://countries-cities-api-1.onrender.com/api/v1/countries?page=1&size=20"

# Search
curl "https://countries-cities-api-1.onrender.com/api/v1/countries?search=Azerbaijan"

# Create country (admin)
curl -X POST https://countries-cities-api-1.onrender.com/api/v1/countries \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"New Country","code":"NC","capital":"Capital","population":1000000,"region":"Europe"}'
```

## Live Deployment

- Production API: https://countries-cities-api-1.onrender.com
- Swagger docs: https://countries-cities-api-1.onrender.com/api-docs
- Health check: https://countries-cities-api-1.onrender.com/health
- GitHub: https://github.com/Cavid0/countries-cities-api

Platform: Render.com with PostgreSQL 14 and Upstash Redis. Auto-deploy from GitHub main branch.

## Technologies

- Node.js 18 / Express.js 4
- PostgreSQL 14 + Sequelize ORM
- Redis (Upstash serverless)
- jsonwebtoken + bcryptjs
- express-validator
- swagger-jsdoc + swagger-ui-express
- Helmet, cors, express-rate-limit
- compression, morgan, dotenv, nodemon

## Project Structure

```
src/
  config/         - database.js, redis.js, auth.js, oauth.js, graphql.js
  controllers/    - authController, countryController, cityController
  middleware/     - auth, cache, validate, errorHandler, notFound, rateLimiter
  models/         - User, Country, City, index
  routes/         - authRoutes, countryRoutes, cityRoutes, index
  validators/     - authValidator, countryValidator, cityValidator
  database/       - setup, seed, seedLarge, migrate
  utils/          - ApiError, importData
  app.js
  server.js
```

## Database Schema

**countries** - id (UUID), name, code (2-char), capital, population, area, region, subregion, latitude, longitude, flag_url, timestamps

**cities** - id (UUID), name, country_id (FK), population, latitude, longitude, is_capital, timestamps

**users** - id (UUID), username, email, password (hashed), role (user/admin), timestamps

## Deployment

1. Create a Web Service on Render.com, connect the GitHub repo, set build command `npm install` and start command `npm start`.
2. Add a PostgreSQL database service and copy the connection URL.
3. Set environment variables in the Render dashboard (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, REDIS_URL, REDIS_TOKEN).
4. For Google OAuth, set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_CALLBACK_URL` in the Render environment variables.
5. Run `npm run db:setup` and `npm run db:seed:large` via the Render shell.

## License

MIT License

---

### The Core Team

**Developer:** Cavid Shukurov

**Project Link:** https://github.com/Cavid0/countries-cities-api

**Live API:** https://countries-cities-api-1.onrender.com

---

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>

# 🚀 Quick Start Guide

Get your Countries and Cities API up and running in 10 minutes!

## Prerequisites

Make sure you have installed:
- ✅ Node.js (v18 or higher)
- ✅ PostgreSQL (v14 or higher)
- ✅ Redis (v6 or higher)

---

## Step 1: Install Dependencies

```bash
cd /Users/cavid2006/Desktop/api
npm install
```

---

## Step 2: Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

#  Edit .env with your settings
# Most importantly, update these:
# - DB_NAME, DB_USER, DB_PASSWORD (PostgreSQL credentials)
# - JWT_SECRET (choose a strong secret key)
```

---

## Step 3: Start PostgreSQL

```bash
# macOS with Homebrew
brew services start postgresql@14

# Or manually
postgres -D /usr/local/var/postgres

# Create database
createdb countries_cities_db

# Or using psql
psql postgres
CREATE DATABASE countries_cities_db;
\q
```

---

## Step 4: Start Redis

```bash
# macOS with Homebrew
brew services start redis

# Or manually
redis-server

# Test Redis is running
redis-cli ping
# Should return: PONG
```

---

## Step 5: Set Up Database

```bash
# This will:
# - Create all tables
# - Create a default admin user
npm run db:setup
```

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `Admin123`

⚠️ **IMPORTANT**: Change the admin password immediately after first login!

---

## Step 6: Import Data (Choose One)

### Option A: Sample Data (Quick)
```bash
# Import ~10 countries and ~20 cities
npm run db:seed
```

### Option B: Full Countries Data (Recommended)
```bash
# Import 250+ countries from REST Countries API
npm run import:countries
```

---

## Step 7: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ Database connection established successfully.
✅ Database models synchronized.
✅ Redis connection established successfully.
🚀 Server is running on http://localhost:3000
📚 API Documentation available at http://localhost:3000/api-docs
🔗 Health check available at http://localhost:3000/health
```

---

## Step 8: Test the API

### Using Browser
1. Open http://localhost:3000/health (should return "OK")
2. Open http://localhost:3000/api-docs (Swagger documentation)

### Using cURL
```bash
# Health check
curl http://localhost:3000/health

# Get countries (no auth required)
curl http://localhost:3000/api/v1/countries

# Login as admin
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin123"
  }'

# Copy the accessToken from the response
```

### Using Postman
1. Open Postman
2. Import the collection from the repository (if available)
3. Set base URL to `http://localhost:3000/api/v1`
4. Test endpoints

---

## 🎉 Success!

Your API is now running! Here's what you can do next:

### Explore the API
- 📚 **Swagger Docs**: http://localhost:3000/api-docs
- 🏥 **Health Check**: http://localhost:3000/health

### Available Endpoints

#### Public (No Auth Required)
- `GET /api/v1/countries` - List all countries
- `GET /api/v1/countries/:id` - Get country details
- `GET /api/v1/cities` - List all cities
- `GET /api/v1/cities/:id` - Get city details

#### Authentication Required
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

#### Admin Only
- `POST /api/v1/countries` - Create country
- `PUT /api/v1/countries/:id` - Update country
- `DELETE /api/v1/countries/:id` - Delete country
- `POST /api/v1/cities` - Create city
- `PUT /api/v1/cities/:id` - Update city
- `DELETE /api/v1/cities/:id` - Delete city

---

## Common Commands

```bash
# Start server in development mode
npm run dev

# Start server in production mode
npm start

# Set up database (create tables)
npm run db:setup

# Seed sample data
npm run db:seed

# Import real countries data
npm run import:countries

# Run migrations
npm run db:migrate

# Run tests (when implemented)
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

---

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Make sure PostgreSQL is running
```bash
brew services start postgresql@14
# or
postgres -D /usr/local/var/postgres
```

### Redis Connection Error
```
Error: Redis connection to 127.0.0.1:6379 failed
```
**Solution**: Make sure Redis is running
```bash
brew services start redis
# or
redis-server
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: Change the PORT in `.env` file or kill the process
```bash
lsof -ti:3000 | xargs kill
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Install dependencies
```bash
npm install
```

---

## Next Steps

1. ✅ Read the [README.md](README.md) for detailed documentation
2. ✅ Check [API_TESTING.md](API_TESTING.md) for testing examples
3. ✅ Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
4. ✅ Import more data using [DATA_IMPORT.md](DATA_IMPORT.md)
5. ✅ Create your own Postman collection
6. ✅ Deploy to a cloud platform

---

## Need Help?

- 📖 Check the documentation files
- 🐛 Found a bug? Open an issue
- 💡 Have a suggestion? Contribute!

---

**Happy Coding! 🚀**

# API Testing Guide

This guide will help you test the API using various methods.

## Testing with Postman

### 1. Import the Postman Collection

You can import the collection from `postman-collection.json` file.

### 2. Set Up Environment Variables

Create a new environment in Postman with these variables:

```
base_url: http://localhost:3000/api/v1
token: (will be set automatically after login)
```

### 3. Testing Flow

#### Step 1: Register a New User
```
POST {{base_url}}/auth/register

Body (JSON):
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123456",
  "role": "user"
}
```

#### Step 2: Login
```
POST {{base_url}}/auth/login

Body (JSON):
{
  "email": "test@example.com",
  "password": "Test123456"
}

Save the accessToken from response for next requests.
```

#### Step 3: Get Countries (Public)
```
GET {{base_url}}/countries?page=1&size=20
```

#### Step 4: Create Country (Admin Only)
```
POST {{base_url}}/countries
Authorization: Bearer YOUR_TOKEN

Body (JSON):
{
  "name": "Test Country",
  "code": "TC",
  "capital": "Test Capital",
  "population": 1000000,
  "region": "Test Region"
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### Get Countries (Public)
```bash
curl http://localhost:3000/api/v1/countries
```

### Create Country (Protected - Admin)
```bash
curl -X POST http://localhost:3000/api/v1/countries \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Country",
    "code": "TC",
    "capital": "Test Capital",
    "population": 1000000
  }'
```

---

## Testing with JavaScript (fetch)

```javascript
// Register
const register = async () => {
  const response = await fetch('http://localhost:3000/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Test123456'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Get Countries
const getCountries = async () => {
  const response = await fetch('http://localhost:3000/api/v1/countries');
  const data = await response.json();
  console.log(data);
};
```

---

## API Endpoints Reference

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user (Protected)

### Countries
- `GET /countries` - Get all countries (Public, Paginated)
- `GET /countries/:id` - Get country by ID (Public)
- `GET /countries/stats` - Get statistics (Public)
- `POST /countries` - Create country (Admin)
- `PUT /countries/:id` - Update country (Admin)
- `DELETE /countries/:id` - Delete country (Admin)

### Cities
- `GET /cities` - Get all cities (Public, Paginated)
- `GET /cities/:id` - Get city by ID (Public)
- `GET /cities/country/:countryId` - Get cities by country (Public)
- `GET /cities/capitals` - Get capital cities (Public)
- `POST /cities` - Create city (Admin)
- `PUT /cities/:id` - Update city (Admin)
- `DELETE /cities/:id` - Delete city (Admin)

---

## Expected Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    // Validation errors if any
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": {
    "totalItems": 100,
    "items": [],
    "totalPages": 5,
    "currentPage": 1,
    "itemsPerPage": 20
  }
}
```

---

## Interactive API Documentation

Access Swagger documentation at:
```
http://localhost:3000/api-docs
```

This provides:
- Interactive API testing
- Request/response examples
- Schema definitions
- Authentication testing

#!/bin/bash

# 🧪 API Test Commands
# Run after database setup

API_URL="https://countries-cities-api-1.onrender.com"

echo "════════════════════════════════════════════════"
echo "🧪 Testing Countries & Cities API"
echo "════════════════════════════════════════════════"
echo ""

# 1. Health Check
echo "1️⃣ Health Check:"
curl -s "$API_URL/health" | jq

echo ""
echo "════════════════════════════════════════════════"
echo ""

# 2. Get All Countries
echo "2️⃣ Get All Countries:"
curl -s "$API_URL/api/countries" | jq '.pagination'

echo ""
echo "════════════════════════════════════════════════"
echo ""

# 3. Get All Cities
echo "3️⃣ Get All Cities:"
curl -s "$API_URL/api/cities" | jq '.pagination'

echo ""
echo "════════════════════════════════════════════════"
echo ""

# 4. Login (get token)
echo "4️⃣ Admin Login:"
TOKEN=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123"}' \
  | jq -r '.data.accessToken')

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
  echo "✅ Login successful!"
  echo "Token: ${TOKEN:0:50}..."
else
  echo "❌ Login failed!"
fi

echo ""
echo "════════════════════════════════════════════════"
echo ""

# 5. Get Profile (with token)
if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
  echo "5️⃣ Get Profile (authenticated):"
  curl -s "$API_URL/api/auth/me" \
    -H "Authorization: Bearer $TOKEN" \
    | jq '.data | {username, email, role}'
fi

echo ""
echo "════════════════════════════════════════════════"
echo ""

# 6. Search Countries
echo "6️⃣ Search Azerbaijan:"
curl -s "$API_URL/api/countries?search=azer" | jq '.data[0] | {name, capital, population}'

echo ""
echo "════════════════════════════════════════════════"
echo ""

# 7. Get Capital Cities
echo "7️⃣ Get Capital Cities:"
curl -s "$API_URL/api/cities/capitals" | jq '.data[0:3] | .[] | {name, country: .Country.name, isCapital}'

echo ""
echo "════════════════════════════════════════════════"
echo ""

# 8. Swagger UI
echo "8️⃣ Swagger Documentation:"
echo "🌐 Open in browser: $API_URL/api-docs"

echo ""
echo "════════════════════════════════════════════════"
echo "✅ ALL TESTS COMPLETE!"
echo "════════════════════════════════════════════════"
echo ""
echo "📝 Admin Credentials:"
echo "   Email: admin@example.com"
echo "   Password: Admin123"
echo ""
echo "🔗 Important URLs:"
echo "   Live API: $API_URL"
echo "   Swagger: $API_URL/api-docs"
echo "   GitHub: https://github.com/Cavid0/countries-cities-api"
echo ""

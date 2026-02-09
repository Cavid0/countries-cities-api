#!/bin/bash

# 🎯 Bu script-i terminal-da işə sala bilərsiniz!
# chmod +x quick-deploy.sh
# ./quick-deploy.sh

echo "════════════════════════════════════════════════"
echo "🚀 Countries & Cities API - Quick Deploy Helper"
echo "════════════════════════════════════════════════"
echo ""

# Rənglər
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: GitHub
echo -e "${BLUE}ADDIM 1: GitHub Setup${NC}"
echo "────────────────────────────────────────────────"
echo ""
echo -e "${YELLOW}1.1 GitHub hesabınız varmı?${NC}"
echo "    Əgər yoxsa: https://github.com/signup"
echo ""
read -p "GitHub username-nizi daxil edin: " GITHUB_USERNAME
echo ""

echo -e "${YELLOW}1.2 GitHub-da repository yaradın:${NC}"
echo "    1. https://github.com/new açın"
echo "    2. Name: countries-cities-api"
echo "    3. Description: RESTful API for countries and cities"
echo "    4. Public seçin"
echo "    5. README və .gitignore əlavə ETMƏYİN"
echo "    6. Create repository"
echo ""
read -p "Repository yaratdınızmı? (y/n): " REPO_CREATED

if [ "$REPO_CREATED" = "y" ]; then
    REPO_URL="https://github.com/${GITHUB_USERNAME}/countries-cities-api.git"
    echo ""
    echo -e "${GREEN}✓ Repository URL: ${REPO_URL}${NC}"
    echo ""
    
    echo -e "${YELLOW}1.3 Git remote əlavə edirəm...${NC}"
    git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
    
    echo -e "${YELLOW}1.4 GitHub-a push edirəm...${NC}"
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ GitHub-a push olundu!${NC}"
        echo -e "${GREEN}   Repository: https://github.com/${GITHUB_USERNAME}/countries-cities-api${NC}"
    else
        echo -e "${RED}❌ Push error! Manual olaraq edin:${NC}"
        echo "   git remote add origin $REPO_URL"
        echo "   git push -u origin main"
    fi
fi

echo ""
echo "════════════════════════════════════════════════"
echo ""

# Step 2: Railway
echo -e "${BLUE}ADDIM 2: Railway.app Deploy${NC}"
echo "────────────────────────────────────────────────"
echo ""
echo -e "${YELLOW}2.1 Railway.app hesabı açın:${NC}"
echo "    1. https://railway.app açın"
echo "    2. 'Login with GitHub' düyməsi"
echo "    3. GitHub hesabınızla login olun"
echo ""
echo -e "${YELLOW}2.2 Project yaradın:${NC}"
echo "    1. 'New Project' düyməsi"
echo "    2. 'Deploy from GitHub repo'"
echo "    3. Repository seçin: countries-cities-api"
echo ""
echo -e "${YELLOW}2.3 PostgreSQL əlavə edin:${NC}"
echo "    1. 'New' → 'Database' → 'Add PostgreSQL'"
echo ""
echo -e "${YELLOW}2.4 Redis əlavə edin:${NC}"
echo "    1. 'New' → 'Database' → 'Add Redis'"
echo ""
echo -e "${YELLOW}2.5 Environment Variables:${NC}"
echo "    Service seçin → Variables tab → Add:"
echo "    NODE_ENV=production"
echo "    JWT_SECRET=my_super_secret_key_2026_production"
echo "    JWT_REFRESH_SECRET=my_refresh_secret_2026_production"
echo ""
echo -e "${YELLOW}2.6 Domain yaradın:${NC}"
echo "    Settings → Networking → 'Generate Domain'"
echo ""
read -p "Railway URL-nizi daxil edin (https://...railway.app): " RAILWAY_URL
echo ""

if [ ! -z "$RAILWAY_URL" ]; then
    echo -e "${GREEN}✓ Railway URL: ${RAILWAY_URL}${NC}"
    echo ""
    echo -e "${YELLOW}2.7 Test edirəm...${NC}"
    
    # Health check
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${RAILWAY_URL}/health" 2>/dev/null)
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Health check OK!${NC}"
    else
        echo -e "${YELLOW}⚠️  Health check gözləyir (deploy olunur olsa bilər)${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}2.8 Database setup edin (Railway Shell-dən):${NC}"
    echo "    npm run db:setup"
    echo "    npm run db:seed"
fi

echo ""
echo "════════════════════════════════════════════════"
echo ""

# Step 3: Postman
echo -e "${BLUE}ADDIM 3: Postman Collection${NC}"
echo "────────────────────────────────────────────────"
echo ""
echo -e "${YELLOW}3.1 Postman yükləyin:${NC}"
echo "    https://www.postman.com/downloads/"
echo ""
echo -e "${YELLOW}3.2 Collection yaradın:${NC}"
echo "    Name: Countries and Cities API"
echo ""
echo -e "${YELLOW}3.3 15+ endpoint əlavə edin${NC}"
echo "    (Ətraflı: SETUP_INSTRUCTIONS.md)"
echo ""
echo -e "${YELLOW}3.4 Publish edin və URL alın${NC}"
echo ""
read -p "Postman Collection URL-ni daxil edin: " POSTMAN_URL
echo ""

if [ ! -z "$POSTMAN_URL" ]; then
    echo -e "${GREEN}✓ Postman: ${POSTMAN_URL}${NC}"
fi

echo ""
echo "════════════════════════════════════════════════"
echo ""

# Step 4: README Update
echo -e "${BLUE}ADDIM 4: README.md Yenilə${NC}"
echo "────────────────────────────────────────────────"
echo ""

if [ ! -z "$RAILWAY_URL" ] && [ ! -z "$POSTMAN_URL" ]; then
    echo -e "${YELLOW}README.md yenilənir...${NC}"
    
    # README-yə URL-ləri əlavə et (sadə sed)
    echo ""
    echo "Manual olaraq README.md-ə əlavə edin:"
    echo ""
    echo "## 🔗 Links"
    echo "- Live API: $RAILWAY_URL"
    echo "- Swagger: $RAILWAY_URL/api-docs"
    echo "- Postman: $POSTMAN_URL"
    echo "- GitHub: https://github.com/$GITHUB_USERNAME/countries-cities-api"
fi

echo ""
echo "════════════════════════════════════════════════"
echo ""

# Final Summary
echo -e "${GREEN}🎉 TƏBRIK EDİRƏM!${NC}"
echo ""
echo -e "${BLUE}TƏQDIM MƏLUMATLARI:${NC}"
echo "────────────────────────────────────────────────"
[ ! -z "$GITHUB_USERNAME" ] && echo "GitHub: https://github.com/$GITHUB_USERNAME/countries-cities-api"
[ ! -z "$RAILWAY_URL" ] && echo "Live API: $RAILWAY_URL"
[ ! -z "$RAILWAY_URL" ] && echo "Swagger: $RAILWAY_URL/api-docs"
[ ! -z "$POSTMAN_URL" ] && echo "Postman: $POSTMAN_URL"
echo ""
echo -e "${YELLOW}Test edin:${NC}"
[ ! -z "$RAILWAY_URL" ] && echo "curl ${RAILWAY_URL}/health"
echo ""
echo "════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}UĞURLAR! 🚀${NC}"
echo ""

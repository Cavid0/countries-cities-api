# 🎬 Video Tutorial Guide - Step by Step

**Bu guide video tutorial kimi hazırlanıb. Hər addımı ardıcıl izləyin!**

---

## 🎯 Timeline Overview

| Time | Task | Detail |
|------|------|--------|
| 0:00 - 5:00 | GitHub Setup | Repository creation + push |
| 5:00 - 25:00 | Railway Deploy | Database + deploy + domain |
| 25:00 - 50:00 | Postman Collection | 15+ requests + publish |
| 50:00 - 55:00 | README Update | Links + author info |
| 55:00 - 60:00 | Final Testing | All endpoints test |

**Total Duration: ~60 minutes**

---

## 📹 PART 1: GITHUB REPOSITORY (0:00 - 5:00)

### ⏱️ Minute 0:00 - 2:00: Account & Repository

**[Screen: Browser - github.com]**

1. **0:00** - Browser açın: `https://github.com`
2. **0:10** - Hesabınız varsa login olun, yoxsa:
   - Click "Sign up"
   - Email daxil edin
   - Username seçin (məsələn: `cavid2006`)
   - Password yaradın
   - Email verify edin
3. **1:30** - Login olduqdan sonra:
   - Top right corner: "+" düyməsi
   - "New repository" click
4. **1:45** - Repository settings:
   ```
   Repository name: countries-cities-api
   Description: RESTful API for countries and cities with JWT auth
   Visibility: ✓ Public
   ✗ Add a README file (bizim var)
   ✗ Add .gitignore (bizim var)
   ```
5. **2:00** - "Create repository" click

---

### ⏱️ Minute 2:00 - 5:00: Push Code

**[Screen: Terminal]**

6. **2:05** - Repository yarandı! İndi səhifədə göstərilən URL-i kopyalayın:
   ```
   https://github.com/YOUR_USERNAME/countries-cities-api.git
   ```

7. **2:15** - Terminal açın və proyekt direktoriyasında:
   ```bash
   cd /Users/cavid2006/Desktop/api
   ```

8. **2:30** - Git remote əlavə edin (YOUR_USERNAME-i dəyişdirin!):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/countries-cities-api.git
   ```

9. **2:45** - Git push edin:
   ```bash
   git push -u origin main
   ```

10. **3:00** - Push progress görəcəksiniz:
    ```
    Enumerating objects: 56, done.
    Counting objects: 100% (56/56), done.
    ...
    To https://github.com/YOUR_USERNAME/countries-cities-api.git
     * [new branch]      main -> main
    ```

11. **3:30** - Browser-da GitHub repository refresh edin

12. **4:00** - Verify edilsin:
    - ✅ 43+ fayl görünür
    - ✅ README.md render olunur
    - ✅ src/ folder strukturu var

13. **4:30** - Repository URL-ni not edin:
    ```
    GitHub: https://github.com/YOUR_USERNAME/countries-cities-api
    ```

**[✅ Part 1 Complete!]**

---

## 📹 PART 2: RAILWAY.APP DEPLOYMENT (5:00 - 25:00)

### ⏱️ Minute 5:00 - 7:00: Account Creation

**[Screen: Browser - railway.app]**

14. **5:00** - Browser açın: `https://railway.app`

15. **5:10** - "Login" və ya "Start a New Project" düyməsi

16. **5:20** - "Login with GitHub" seçin

17. **5:30** - GitHub authorization prompt:
    - "Authorize Railway" click
    - Password confirm (lazımsa)

18. **6:00** - Railway dashboard açılır

19. **6:30** - Dashboard-da "New Project" düyməsi

**[✅ Account Ready!]**

---

### ⏱️ Minute 7:00 - 10:00: Deploy from GitHub

**[Screen: Railway Dashboard]**

20. **7:00** - "New Project" → "Deploy from GitHub repo"

21. **7:15** - Repository list görünür:
    - Scroll down və **countries-cities-api** tapın
    - Click

22. **7:30** - Deploy başlayır:
    ```
    ⚙️ Building...
    📦 Installing dependencies...
    🚀 Starting application...
    ```

23. **8:00** - Sol sidebar-da service kartı görünür:
    - Name: countries-cities-api
    - Status: 🔴 Failed (normal! environment variables yoxdur)

24. **8:30** - Service kartına click

25. **9:00** - Top tabs: Deployments, Variables, Settings

**[✅ Initial Deploy Complete (with expected errors)]**

---

### ⏱️ Minute 10:00 - 13:00: Add PostgreSQL

**[Screen: Railway Project View]**

26. **10:00** - Project dashboard-da "New" düyməsi (sol üst künc)

27. **10:10** - "Database" seçin

28. **10:20** - "Add PostgreSQL" click

29. **10:30** - PostgreSQL service yaranır:
    - Name: PostgreSQL
    - Status: 🟢 Running

30. **11:00** - PostgreSQL kartına click

31. **11:15** - "Variables" tab açın

32. **11:30** - Copy variables (lazım olacaq):
    - `DATABASE_URL` - avtomatik application-a inject olunur

33. **12:00** - Back to project view (top left: project name)

**[✅ PostgreSQL Added!]**

---

### ⏱️ Minute 13:00 - 15:00: Add Redis

**[Screen: Railway Project View]**

34. **13:00** - Yenə "New" düyməsi

35. **13:10** - "Database" → "Add Redis"

36. **13:20** - Redis service yaranır:
    - Name: Redis
    - Status: 🟢 Running

37. **14:00** - Redis kartına click

38. **14:15** - "Variables" tab - `REDIS_URL` görünür

39. **14:30** - Back to project view

**[✅ Redis Added!]**

---

### ⏱️ Minute 15:00 - 18:00: Environment Variables

**[Screen: Node.js Service Settings]**

40. **15:00** - Node.js service kartına (countries-cities-api) click

41. **15:15** - "Variables" tab açın

42. **15:30** - "Raw Editor" düyməsi (top right)

43. **15:45** - Bu texti paste edin:
    ```bash
    NODE_ENV=production
    JWT_SECRET=my_super_secret_key_2026_production
    JWT_REFRESH_SECRET=my_refresh_secret_2026_production
    ITEMS_PER_PAGE=20
    PORT=3000
    ```

44. **16:30** - Scroll down - auto-injected variables görünür:
    - `DATABASE_URL` (from PostgreSQL)
    - `REDIS_URL` (from Redis)

45. **17:00** - "Save Changes" düyməsi (bottom)

46. **17:30** - Redeploy başlayır:
    ```
    🔄 Redeploying...
    ✅ Build successful
    🚀 Service running
    ```

47. **18:00** - Status: 🟢 Running (env variables düzgün olsa)

**[✅ Variables Configured!]**

---

### ⏱️ Minute 18:00 - 20:00: Generate Domain

**[Screen: Service Settings]**

48. **18:00** - "Settings" tab açın

49. **18:15** - Scroll down to "Networking" section

50. **18:30** - "Generate Domain" düyməsi

51. **18:45** - Domain yaranır:
    ```
    https://countries-api-production-a1b2.up.railway.app
    ```

52. **19:00** - Domain-i kopyalayın (copy icon)

53. **19:30** - URL-i not edin:
    ```
    Live API: https://countries-api-production-a1b2.up.railway.app
    Swagger: https://countries-api-production-a1b2.up.railway.app/api-docs
    ```

**[✅ Domain Generated!]**

---

### ⏱️ Minute 20:00 - 25:00: Database Setup

**[Screen: Railway Shell]**

54. **20:00** - Service view-da top right: ⚡ icon (Shell)

55. **20:15** - Terminal-like interface açılır

56. **20:30** - Command yazın:
    ```bash
    npm run db:setup
    ```

57. **20:45** - Output:
    ```
    ✔ Database connected successfully
    ✔ Tables created (users, countries, cities)
    ✔ Admin user created
    ✓ Database setup complete!
    ```

58. **21:30** - İkinci command:
    ```bash
    npm run db:seed
    ```

59. **21:45** - Output:
    ```
    ✔ Seeding 10 countries...
    ✔ Seeding 19 cities...
    ✓ Seed completed!
    ```

60. **22:30** - Test health endpoint:
    ```bash
    curl https://your-app.up.railway.app/health
    ```

61. **22:45** - Response:
    ```json
    {"status":"OK","message":"Server is running","timestamp":"..."}
    ```

62. **23:30** - Test countries endpoint:
    ```bash
    curl https://your-app.up.railway.app/api/countries | jq
    ```

63. **24:00** - Response: 10 ölkə görünür

64. **24:30** - Browser-da Swagger açın:
    ```
    https://your-app.up.railway.app/api-docs
    ```

65. **25:00** - Swagger UI render olur ✅

**[✅ Part 2 Complete! API is LIVE! 🎉]**

---

## 📹 PART 3: POSTMAN COLLECTION (25:00 - 50:00)

### ⏱️ Minute 25:00 - 28:00: Install Postman

**[Screen: Browser - postman.com]**

66. **25:00** - Browser açın: `https://www.postman.com/downloads/`

67. **25:15** - macOS versiyasını yükləyin (Download düyməsi)

68. **26:00** - DMG file yüklənir

69. **26:30** - Installer açın:
    - Postman.app-i Applications folder-ə drag edin

70. **27:00** - Postman.app açın (Applications > Postman)

71. **27:30** - İlk açılış:
    - "Sign up for free" və ya "Sign in"
    - Email ilə qeydiyyat

72. **28:00** - Postman workspace açılır

**[✅ Postman Installed!]**

---

### ⏱️ Minute 28:00 - 30:00: Create Workspace

**[Screen: Postman App]**

73. **28:00** - Sol sidebar: "Workspaces" dropdown

74. **28:15** - "Create Workspace" click

75. **28:30** - Workspace details:
    ```
    Name: Countries API
    Summary: RESTful API testing workspace
    Visibility: Public (mühüm!)
    ```

76. **29:00** - "Create Workspace" düyməsi

77. **29:30** - Yeni workspace açılır

**[✅ Workspace Created!]**

---

### ⏱️ Minute 30:00 - 32:00: Create Collection

**[Screen: Postman Workspace]**

78. **30:00** - "New" düyməsi (top left) → "Collection"

79. **30:15** - Collection name:
    ```
    Countries and Cities API
    ```

80. **30:30** - Description əlavə:
    ```
    RESTful API with JWT authentication for countries and cities data.
    
    Features:
    - JWT Authentication
    - Public GET endpoints
    - Admin-only POST/PUT/DELETE
    - Pagination & Search
    - Redis Caching
    ```

81. **31:30** - "Create" düyməsi

82. **32:00** - Boş collection görünür

**[✅ Collection Created!]**

---

### ⏱️ Minute 32:00 - 34:00: Create Environment

**[Screen: Postman Environments]**

83. **32:00** - Sol sidebar: "Environments" tab

84. **32:15** - "+" düyməsi (Create Environment)

85. **32:30** - Name: `Railway Production`

86. **32:45** - Variables əlavə:
    
    | Variable | Initial Value | Current Value |
    |----------|---------------|---------------|
    | `base_url` | `https://your-app.up.railway.app/api` | (same) |
    | `token` | | (empty for now) |

87. **33:30** - "Save" click (Ctrl+S)

88. **34:00** - Top right: Environment dropdown-da "Railway Production" seçin

**[✅ Environment Ready!]**

---

### ⏱️ Minute 34:00 - 40:00: Authentication Requests

**[Screen: Postman Collection]**

89. **34:00** - Collection-a sağ klik → "Add folder"
    - Name: `1. Authentication`

90. **34:30** - Folder-a sağ klik → "Add request"

**Request 1: Register User**

91. **34:45** - Name: `Register User`
92. **35:00** - Method: `POST`
93. **35:15** - URL: `{{base_url}}/auth/register`
94. **35:30** - Body tab → raw → JSON:
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "Test1234"
    }
    ```
95. **36:00** - Save (Ctrl+S)

**Request 2: Login**

96. **36:15** - New request: `Login`
97. **36:30** - Method: `POST`
98. **36:45** - URL: `{{base_url}}/auth/login`
99. **37:00** - Body:
    ```json
    {
      "email": "admin@example.com",
      "password": "Admin123"
    }
    ```
100. **37:30** - **Tests tab** açın və əlavə:
     ```javascript
     if (pm.response.code === 200) {
         const jsonData = pm.response.json();
         pm.environment.set("token", jsonData.data.accessToken);
     }
     ```
101. **38:00** - Save

**Request 3: Get Profile**

102. **38:15** - New request: `Get My Profile`
103. **38:30** - Method: `GET`
104. **38:45** - URL: `{{base_url}}/auth/me`
105. **39:00** - Authorization tab:
     - Type: Bearer Token
     - Token: `{{token}}`
106. **39:30** - Save

**Request 4: Refresh Token**

107. **39:45** - New request: `Refresh Token`
108. **40:00** - Method: `POST`, URL: `{{base_url}}/auth/refresh`

**[✅ Auth Folder Complete - 4 requests]**

---

### ⏱️ Minute 40:00 - 44:00: Countries Public Requests

**[Screen: Postman Collection]**

109. **40:00** - New folder: `2. Countries (Public)`

**Request 5-10:**

110. **40:30** - `Get All Countries`
     - GET `{{base_url}}/countries`

111. **41:00** - `Get with Pagination`
     - GET `{{base_url}}/countries?page=1&limit=5`

112. **41:30** - `Search by Name`
     - GET `{{base_url}}/countries?search=aze`

113. **42:00** - `Filter by Region`
     - GET `{{base_url}}/countries?region=Asia`

114. **42:30** - `Get by ID`
     - GET `{{base_url}}/countries/:id`
     - (Path Variables tab: id = paste actual UUID)

115. **43:00** - `Get Statistics`
     - GET `{{base_url}}/countries/stats/summary`

116. **43:30** - Save all (Ctrl+S)

**[✅ Public Folder Complete - 6 requests]**

---

### ⏱️ Minute 44:00 - 46:00: Countries Admin Requests

**[Screen: Postman Collection]**

117. **44:00** - New folder: `3. Countries (Admin Only)`

**Request 11-13:**

118. **44:30** - `Create Country (Admin)`
     - POST `{{base_url}}/countries`
     - Authorization: Bearer `{{token}}`
     - Body:
       ```json
       {
         "name": "Test Country",
         "code": "TC",
         "capital": "Test Capital",
         "population": 1000000,
         "area": 50000,
         "region": "Test Region"
       }
       ```

119. **45:00** - `Update Country (Admin)`
     - PUT `{{base_url}}/countries/:id`
     - Authorization: Bearer `{{token}}`
     - Body:
       ```json
       {
         "population": 2000000
       }
       ```

120. **45:30** - `Delete Country (Admin)`
     - DELETE `{{base_url}}/countries/:id`
     - Authorization: Bearer `{{token}}`

121. **46:00** - Save all

**[✅ Admin Folder Complete - 3 requests]**

---

### ⏱️ Minute 46:00 - 48:00: Cities Requests

**[Screen: Postman Collection]**

122. **46:00** - New folder: `4. Cities`

**Request 14-17:**

123. **46:20** - `Get All Cities`
     - GET `{{base_url}}/cities`

124. **46:40** - `Get Capital Cities`
     - GET `{{base_url}}/cities/capitals`

125. **47:00** - `Get Cities by Country`
     - GET `{{base_url}}/cities/country/:countryId`

126. **47:20** - `Create City (Admin)`
     - POST `{{base_url}}/cities`
     - Authorization: Bearer `{{token}}`
     - Body:
       ```json
       {
         "name": "Test City",
         "countryId": "paste_country_uuid",
         "population": 500000,
         "isCapital": false
       }
       ```

127. **47:40** - Save all

**[✅ Cities Folder Complete - 4 requests]**

---

### ⏱️ Minute 48:00 - 50:00: Publish Collection

**[Screen: Postman Collection]**

128. **48:00** - Collection-a sağ klik → "Share"

129. **48:15** - Modal açılır → "Get Public Link" tab

130. **48:30** - "Generate Public Link" düyməsi

131. **48:45** - Link yaranır:
     ```
     https://documenter.getpostman.com/view/12345678/...
     ```

132. **49:00** - "Copy Link" düyməsi

133. **49:15** - Browser-da link-i açıb test edin

134. **49:30** - Public documentation görünür ✅

135. **49:45** - URL-i not edin:
     ```
     Postman: https://documenter.getpostman.com/view/...
     ```

**[✅ Part 3 Complete! 17 requests published! 🎉]**

---

## 📹 PART 4: README UPDATE (50:00 - 55:00)

### ⏱️ Minute 50:00 - 53:00: Edit README

**[Screen: VS Code / Text Editor]**

136. **50:00** - Proyekt folder açın: `/Users/cavid2006/Desktop/api`

137. **50:15** - `README.md` faylını açın

138. **50:30** - **Author section** tapın (Ctrl+F: "## 👤 Author")

139. **50:45** - Dəyişdirin:
     ```markdown
     ## 👤 Author
     
     **Cavid Aliyev**
     - GitHub: [@cavid2006](https://github.com/cavid2006)
     - Email: cavid.aliyev@example.com
     - Bootcamp: [Your Bootcamp Name] - 2026
     ```

140. **51:30** - **Links section** tapın (Ctrl+F: "## 🔗 Links")

141. **51:45** - Dəyişdirin:
     ```markdown
     ## 🔗 Links
     
     - **Live API**: https://countries-api-production-a1b2.up.railway.app
     - **Swagger Documentation**: https://countries-api-production-a1b2.up.railway.app/api-docs
     - **Postman Collection**: https://documenter.getpostman.com/view/12345678/...
     - **GitHub Repository**: https://github.com/cavid2006/countries-cities-api
     ```

142. **52:30** - **Save** (Ctrl+S)

**[✅ README Updated!]**

---

### ⏱️ Minute 53:00 - 55:00: Commit & Push

**[Screen: Terminal]**

143. **53:00** - Terminal açın

144. **53:15** - Status yoxlayın:
     ```bash
     git status
     ```
     Output: `modified: README.md`

145. **53:30** - Stage edin:
     ```bash
     git add README.md
     ```

146. **53:45** - Commit:
     ```bash
     git commit -m "docs: Add deployment URLs and author information"
     ```

147. **54:00** - Push:
     ```bash
     git push
     ```

148. **54:30** - Browser-da GitHub repo refresh edin

149. **54:45** - README-də linklərin düzgün göründüyünü verify edin ✅

**[✅ Part 4 Complete!]**

---

## 📹 PART 5: FINAL TESTING (55:00 - 60:00)

### ⏱️ Minute 55:00 - 57:00: Health & Endpoints

**[Screen: Terminal & Browser]**

150. **55:00** - Terminal-da health check:
     ```bash
     curl https://your-app.up.railway.app/health
     ```
     ✅ Status: OK

151. **55:30** - Countries endpoint:
     ```bash
     curl https://your-app.up.railway.app/api/countries
     ```
     ✅ 10 ölkə qayıdır

152. **56:00** - Cities endpoint:
     ```bash
     curl https://your-app.up.railway.app/api/cities
     ```
     ✅ 19 şəhər qayıdır

153. **56:30** - Browser-da Swagger açın:
     ```
     https://your-app.up.railway.app/api-docs
     ```

154. **56:45** - Swagger UI-da:
     - Authentication → POST /login test
     - Token kopyalayın
     - "Authorize" düyməsi → Token paste
     - Countries → GET /countries test
     - ✅ Hamısı işləyir

**[✅ API Tests Pass!]**

---

### ⏱️ Minute 57:00 - 60:00: Final Verification

**[Screen: Browser - Multiple Tabs]**

155. **57:00** - **Tab 1: GitHub**
     - https://github.com/YOUR_USERNAME/countries-cities-api
     - ✅ Code visible
     - ✅ README renders correctly

156. **57:30** - **Tab 2: Railway Dashboard**
     - https://railway.app/project/...
     - ✅ All services running (green status)
     - ✅ PostgreSQL: 10 countries, 19 cities
     - ✅ Redis: caching works

157. **58:00** - **Tab 3: Swagger**
     - https://your-app.up.railway.app/api-docs
     - ✅ All endpoints documented
     - ✅ Try it out buttons work

158. **58:30** - **Tab 4: Postman Docs**
     - https://documenter.getpostman.com/view/...
     - ✅ Public documentation
     - ✅ Run in Postman button works

159. **59:00** - **Final Checklist:**
     - ✅ GitHub repo: public + code pushed
     - ✅ Railway: deployed + databases + domain
     - ✅ Postman: 17 requests + published
     - ✅ README: all links updated
     - ✅ All endpoints tested

160. **59:30** - **Submission URLs ready:**
     ```
     GitHub: https://github.com/cavid2006/countries-cities-api
     Live API: https://countries-api-production-a1b2.up.railway.app
     Swagger: https://countries-api-production-a1b2.up.railway.app/api-docs
     Postman: https://documenter.getpostman.com/view/12345678/...
     ```

161. **60:00** - 🎉 **PROJECT COMPLETE! READY TO SUBMIT!** 🎉

**[✅✅✅ ALL PARTS COMPLETE! 🚀]**

---

## 📝 Post-Video Checklist

Əgər videonu izləyib bitirdinizsə, bu son yoxlamaları edin:

- [ ] GitHub-da bütün kodlar var?
- [ ] Railway-də 3 service (app + postgres + redis) işləyir?
- [ ] Swagger documentation açılır?
- [ ] Postman collection public link işləyir?
- [ ] README.md-də 4 link (GitHub, API, Swagger, Postman) düzgündür?
- [ ] Health endpoint test edildi?
- [ ] Admin login test edildi?
- [ ] Public endpoints test edildi?

---

## 🎬 Tips for Recording (if you make video)

Əgər bu prosesi video çəkmək istəyirsinizsə:

1. **Screen Recording:**
   - macOS: Cmd+Shift+5 (built-in)
   - OBS Studio (free, advanced)
   - QuickTime Player (simple)

2. **What to Show:**
   - Terminal commands və outputs
   - Browser navigation
   - Configuration inputs
   - Test results

3. **Audio (optional):**
   - Türk və ya İngilis dilində izah
   - "İndi... edirəm", "Sonra..."
   - Key commands verbalize edin

4. **Editing:**
   - Speed up waiting moments (deploys, installs)
   - Add text overlays for important URLs
   - Chapter markers (YouTube Chapters)

---

## 🏁 TƏBRIK EDİRƏM!

API-niz tamamilə hazırdır və bootcamp submission-a göndərə bilərsiniz!

**Next Steps:**
1. `SUBMISSION_FORM_TEMPLATE.md` faylını oxuyun
2. Bootcamp formasına və ya Google Form-a məlumatları daxil edin
3. Mentor və ya instructor-a göndərin

**UĞURLAR! 🚀🎉**

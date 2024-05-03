# Pantry 🍞
Household stock management is challenging.
Keeping track of expenses, perishable item expiration, and meal planning requires a lot of manual work, and physical labor.

This is where Pantry comes in with an all-in-one solution.

# Core Features
### Stock Management with Receipt Scanning 📷
Easily add items into your stock dashboard by uploading images of your receipts.
Backed by Gemini API.

### Recipe Recommendation 👨‍🍳
Recieve daily recommendations on recipes that you can create with items in your Pantry!

### Finance Tracking 💰
Keep track of your spending habits through the year. View your previous grocery runs, and the items you spend most of your money on.

## Build Instructions
Prerequisites:
1. Docker
2. Node v20+
3. Auth0 Account
4. Edamam API account
5. Gemini API key

1. Clone the Repo
```
git clone {REPO_URL}
```
2. Create a .ENV file in your PROJECT_ROOT/pantry-backend/, replace any value that starts with "INSERT"
```
AUTH0_SECRET="INSERT_YOUR_AUTH0_SECRET"
AUTH0_BASE_URL="http://localhost:5000"
AUTH0_ISSUER_BASE_URL="INSERT_YOUR_AUTH0_ISSUER_BASE_URL"
AUTH0_CLIENT_ID='INSERT_YOUR_AUTH0_CLIENT_ID'
DB_USER="pantry"
DB_PASS="pantry"
DB_HOST="localhost"
DB_NAME="pantry"
DB_PORT=5432
GEMINI_API_KEY="INSERT_YOUR_GEMINI_API_KEY"
RECIPE_API_KEY="INSERT_EDAMAM_API_KEY"
RECIPE_API_APP_ID="INSERT_EDAMAM_APP_ID"
RECIPE_API_URL="https://api.edamam.com/api/recipes/v2"
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASS="pass"
REDIS_USER="pantry"
```
4. Start your Databases, and Redis Cache
```
cd pantry-backend && docker-compose up -d
```
5. Start your Backend
```
cd pantry-backend && npm i && npm start
```
6. Start your Frontend
```
cd pantry-frontend && npm i && npm build && npm start
```

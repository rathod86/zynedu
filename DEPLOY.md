# ZynEdu – Deploy & Git

## Deploy with Docker (YAML)

### 1. Set environment variables

Create a `.env` file in the project root (or export in the shell):

```env
JWT_SECRET=your-strong-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-domain.com/api/auth/google/callback
FRONTEND_URL=https://your-domain.com
```

### 2. Build and run

```bash
cd zynedu
docker compose up -d --build
```

- App: **http://localhost:5000**
- MongoDB: `localhost:27017` (internal in Docker: `mongodb://mongo:27017/zynedu`)

### 3. Stop

```bash
docker compose down
```

### 4. View logs

```bash
docker compose logs -f app
```

---

## Push project to Git

### First time (new repo)

```bash
cd zynedu
git init
git add .
git commit -m "Initial commit: ZynEdu app with Docker deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zynedu.git
git push -u origin main
```

### Already a Git repo – push updates

```bash
cd zynedu
git add .
git status
git commit -m "Add Docker Compose and Dockerfile for deployment"
git push origin main
```

### Using SSH

```bash
git remote add origin git@github.com:YOUR_USERNAME/zynedu.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `zynedu` with your GitHub username and repo name.

# ZynEdu - AI-Powered Learning Platform

ZynEdu is a full-stack educational platform that leverages AI-driven course recommendations to provide personalized learning experiences. The platform combines modern web technologies with machine learning to help students discover and learn from courses tailored to their preferences.

## 🚀 Features

- **AI-Powered Course Recommendations**: Intelligent recommendation engine using sentence transformers and embeddings
- **User Authentication**: Secure authentication with Google OAuth and JWT tokens
- **Personalized Dashboard**: Track enrolled courses and learning progress
- **Course Management**: Browse, enroll, and manage courses
- **Adaptive Learning**: AI-driven content adaptation based on user behavior
- **Analytics & Insights**: Performance metrics and sentiment analysis
- **Interactive Features**: Smart tutor assistance and real-time feedback

## 📋 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Modern build tool
- **React Router** - Client-side routing
- **CSS3** - Styling

### Backend
- **Node.js + Express** - REST API server
- **MongoDB + Mongoose** - Database & ODM
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication
- **Google OAuth 2.0** - Social authentication

### AI Service
- **FastAPI** - Python async API framework
- **Sentence Transformers** - NLP embeddings
- **scikit-learn** - Machine learning algorithms
- **Pandas & NumPy** - Data processing

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.10+
- MongoDB (local or cloud instance)
- Google OAuth credentials

### 1. Clone Repository
```bash
git clone https://github.com/rathod86/zynedu.git
cd zynedu
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/zynedu
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=http://localhost:8000
NODE_ENV=development
```

### 3. Install Frontend Dependencies
```bash
npm install
```

### 4. Install Backend Dependencies
Dependencies are included in `package.json`

### 5. Install AI Service Dependencies
```bash
cd ai-service
python -m venv venv
source venv/Scripts/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 📦 Project Structure

```
zynedu/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── component/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── context/      # React context (auth)
│   │   └── routers/      # Route configuration
│   └── vite.config.js
├── backend/               # Express.js REST API
│   ├── config/           # Database & passport config
│   ├── models/           # Mongoose schemas
│   ├── routers/          # API routes
│   ├── middleware/       # Authentication middleware
│   ├── controllers/      # Route controllers
│   └── server.js         # Express app entry
├── ai-service/           # Python FastAPI service
│   ├── models/           # ML models
│   ├── routers/          # API endpoints
│   ├── datasets/         # Course data
│   ├── main.py          # FastAPI app entry
│   └── requirements.txt
└── README.md
```

## 🚀 Getting Started

### Option 1: Run Frontend + Backend Concurrently
```bash
npm start
```
This starts both the Vite dev server (port 5173) and Express backend (port 5000)

### Option 2: Run Services Separately

**Terminal 1 - Start Backend:**
```bash
npm run backend
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

**Terminal 3 - Start AI Service:**
```bash
cd ai-service
python main.py
```
AI service runs on `http://localhost:8000`

## 📝 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run backend` - Start Express backend
- `npm start` - Start both backend and frontend concurrently
- `npm run build` - Build React app for production
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application supports:
1. **Google OAuth** - Sign in with Google account
2. **Email/Password** - Traditional registration and login
3. **JWT Tokens** - Secure API communication

Google OAuth credentials are configured in `backend/config/passport.js`

## 🤖 AI Recommendation Engine

The AI service provides course recommendations based on:
- User learning history
- Course content embeddings
- User preference embeddings
- Collaborative filtering

### Recommendation API Endpoints
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/categories` - Get course categories

## 🗄️ Database Schema

### User Model
- Email, password (hashed)
- Google profile info
- Enrolled courses
- Learning preferences

### Course Model
- Title, description
- Category, difficulty level
- Course content
- Embedding vectors

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port
lsof -i :5000  # Backend
lsof -i :5173  # Frontend
lsof -i :8000  # AI Service
```

### MongoDB Connection Issues
- Ensure MongoDB is running
- Verify connection string in `.env`
- Check firewall rules

### CORS Errors
- Verify frontend URL matches CORS config in `backend/server.js`
- Default: `http://localhost:5173`

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [FastAPI Tutorial](https://fastapi.tiangolo.com)
- [MongoDB Documentation](https://docs.mongodb.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Authors

- **Abhishek Rathod** - Initial development

## 📧 Contact

For questions or support, please reach out via GitHub issues.

---

**Last Updated:** January 2026

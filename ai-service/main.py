from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Routers (existing)
from routers.recommendation import router as rec_router
from routers.categories import router as category_router

# Your AI recommender function
from recommender import get_recommendations

app = FastAPI()

# ---------------------- CORS ----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------- USER REQUEST MODEL ----------------------
class UserRequest(BaseModel):
    category: str
    skills: str
    studyNext: str
    priority: str

# ---------------------- DIRECT AI RECOMMEND ROUTE ----------------------
@app.post("/recommend")
def recommend(data: UserRequest):
    recommendations = get_recommendations(
        category=data.category,
        skills=data.skills,
        study_next=data.studyNext,
        priority=data.priority
    )
    return recommendations

# ---------------------- EXISTING ROUTES ----------------------
app.include_router(category_router)
app.include_router(rec_router)

# ---------------------- HOME ----------------------
@app.get("/")
def home():
    return {"message": "AI Service running!"}

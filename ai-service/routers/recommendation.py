from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging

router = APIRouter()
logger = logging.getLogger("uvicorn.error")

# Simple request models
class SkillsRequest(BaseModel):
    category: str
    skills: List[str]
    history: Optional[List[int]] = []

class HistoryRequest(BaseModel):
    user_id: int
    history: List[int]

class HybridRequest(BaseModel):
    category: Optional[str] = None
    skills: Optional[List[str]] = None
    history: Optional[List[int]] = None

# Simple in-memory "course catalog" for demo
COURSE_DB = [
    {"id": 0, "title": "React Basics", "description": "Learn the basics of React", "tags": ["react", "javascript", "frontend"]},
    {"id": 1, "title": "Advanced React", "description": "Hooks, Context, Performance", "tags": ["react", "frontend"]},
    {"id": 2, "title": "Node.js Mastery", "description": "Backend APIs and servers", "tags": ["node", "javascript", "backend"]},
    {"id": 3, "title": "Next.js Practical", "description": "SSR and SSG with Next.js", "tags": ["nextjs", "react"]},
    {"id": 4, "title": "Deep Learning", "description": "Neural networks and ML", "tags": ["ml", "deeplearning"]},
    {"id": 5, "title": "Fullstack Web Dev", "description": "Front + Back + Deployment", "tags": ["react", "node", "devops"]},
]

# Helper: simple matching algorithm (demo)
def recommend_by_skills(skills: List[str], top_k: int = 5):
    if not skills:
        return COURSE_DB[:top_k]
    skills_lower = set([s.lower() for s in skills])
    scored = []
    for c in COURSE_DB:
        tags = set([t.lower() for t in c.get("tags", [])])
        score = len(tags & skills_lower)
        scored.append((score, c))
    scored.sort(key=lambda x: (-x[0], x[1]["id"]))
    return [c for score, c in scored if score > 0][:top_k] or COURSE_DB[:top_k]

def recommend_by_history(history: List[int], top_k: int = 5):
    # naive approach: recommend courses with different ids than history, plus some related tags
    seen = set(history or [])
    recs = [c for c in COURSE_DB if c["id"] not in seen]
    return recs[:top_k]

def hybrid_recommend(category: Optional[str], skills: Optional[List[str]], history: Optional[List[int]], top_k: int = 5):
    # combine simple heuristics
    by_skills = recommend_by_skills(skills or [], top_k=top_k)
    by_history = recommend_by_history(history or [], top_k=top_k)
    # merge while preserving order and uniqueness
    merged = []
    ids = set()
    for item in (by_skills + by_history):
        if item["id"] not in ids:
            merged.append(item)
            ids.add(item["id"])
        if len(merged) >= top_k:
            break
    return merged

# ROUTES

@router.post("/recommend/skills")
async def recommend_skills(req: SkillsRequest):
    try:
        recs = recommend_by_skills(req.skills, top_k=10)
        return {"mode": "skills", "data": recs}
    except Exception as e:
        logger.exception("Failed recommend_skills")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend/history")
async def recommend_history(req: HistoryRequest):
    try:
        if not isinstance(req.history, list):
            raise HTTPException(status_code=400, detail="history must be a list of course ids")
        recs = recommend_by_history(req.history, top_k=10)
        return {"mode": "history", "data": recs}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed recommend_history")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend/hybrid")
async def recommend_hybrid(req: HybridRequest):
    try:
        recs = hybrid_recommend(req.category, req.skills, req.history, top_k=10)
        return {"mode": "hybrid", "data": recs}
    except Exception as e:
        logger.exception("Failed recommend_hybrid")
        raise HTTPException(status_code=500, detail=str(e))

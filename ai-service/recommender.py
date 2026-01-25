from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# ------------------------------------
# NEW FUNCTION (YOUR LOGIC ADDED HERE)
# ------------------------------------
def get_recommendations(category, skills, study_next, priority):

    # Example math dataset
    math_courses = [
        {"title": "Basic Integration", "desc": "Beginner friendly", "level": "Beginner"},
        {"title": "Integration Techniques", "desc": "Intermediate concepts", "level": "Intermediate"},
        {"title": "Advanced Calculus", "desc": "Advanced integrals", "level": "Advanced"}
    ]

    # Example programming dataset
    programming_courses = [
        {"title": "Python Basics", "desc": "Start coding with Python", "level": "Beginner"},
        {"title": "Data Structures in Python", "desc": "Intermediate coding topics", "level": "Intermediate"},
        {"title": "Advanced Algorithms", "desc": "Hard level DSA", "level": "Advanced"}
    ]

    # Example AI dataset
    ai_courses = [
        {"title": "Intro to AI", "desc": "Basic AI concepts", "level": "Beginner"},
        {"title": "Neural Networks", "desc": "Learn deep learning", "level": "Intermediate"},
        {"title": "Advanced Machine Learning", "desc": "Advanced models & AI systems", "level": "Advanced"}
    ]

    # Category selection
    if category == "Mathematics":
        dataset = math_courses
    elif category == "Programming":
        dataset = programming_courses
    elif category == "Artificial Intelligence":
        dataset = ai_courses
    else:
        return []

    # Filter by difficulty level (priority)
    result = [c for c in dataset if c["level"] == priority]

    # Filter by studyNext keyword
    keyword = study_next.lower()
    result = [c for c in result if keyword in c["title"].lower()]

    return result


# ------------------------------------
# EXISTING REQUEST MODEL
# ------------------------------------
class Req(BaseModel):
    category: str
    skills: list
    history: list


# ------------------------------------
# ROUTE
# ------------------------------------
@router.post("/recommend/skills")
def recommend(req: Req):
    data = get_recommendations(
        category=req.category,
        skills=req.skills,
        study_next=req.history[-1] if req.history else "",
        priority="Beginner"  # you can modify as needed
    )
    return {"status": True, "data": data}

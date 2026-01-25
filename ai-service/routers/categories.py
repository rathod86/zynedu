from fastapi import APIRouter

router = APIRouter()

# You can load this from DB or JSON file later
CATEGORIES = [
    "Web Development", "App Development", "AI & Machine Learning", "Data Science",
    "Cyber Security", "Cloud Computing", "Software Engineering",

    "Business Management", "Marketing", "Finance & Investment",
    "Entrepreneurship", "E-Commerce",

    "Graphic Design", "Video Editing", "Photography",
    "Music Production", "Animation & VFX",

    "Communication Skills", "Public Speaking", "Personal Finance",
    "Career Development",

    "Mathematics", "Physics", "Biology", "Chemistry", "English Learning",

    "Fitness & Nutrition", "Yoga & Meditation", "Mental Health",

    "Cooking & Food", "Travel & Lifestyle", "Agriculture",
    "Automobile", "Fashion Design"
]

@router.get("/categories")
def get_categories():
    return {"categories": CATEGORIES}

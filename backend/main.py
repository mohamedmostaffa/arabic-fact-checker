from dotenv import load_dotenv

load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from providers.gemini_provider import GeminiAgent

app = FastAPI(title="TruthLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ClaimRequest(BaseModel):
    claim: str


@app.get("/")
def home():
    return {"message": "TruthLens API Running"}


@app.post("/check")
def check_claim(data: ClaimRequest):

    agent = GeminiAgent()

    report = agent.check(data.claim)

    return {
        "claim": report.الادعاء,
        "verdict": report.الحكم,
        "confidence": report.نسبة_الثقة,
        "summary": getattr(report, "الشرح", ""),
        "sources": [
            {
                "name": s.name,
                "domain": s.domain,
                "url": s.url,
                "credibility": s.credibility,
            }
            for s in report.المصادر_المفندة
        ]
    }
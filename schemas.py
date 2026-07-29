from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Verdict(str, Enum):
    TRUE = "صحيح"
    MISLEADING = "مضلل"
    UNVERIFIED = "غير مؤكد"
    FABRICATED = "مُفبرك"


class SourceRef(BaseModel):
    domain: str
    name: Optional[str] = None
    url: Optional[str] = None
    credibility: Optional[int] = Field(None, ge=0, le=100)


class FactCheckReport(BaseModel):
    الادعاء: str = Field(..., description="الادعاء الأساسي المُستخرج من كلام المستخدم")
    الحكم: Verdict
    نسبة_الثقة: int = Field(..., ge=0, le=100, description="ثقة الوكيل في الحكم")
    المصادر_المؤيدة: list[SourceRef] = Field(default_factory=list)
    المصادر_المفندة: list[SourceRef] = Field(default_factory=list)
    ملخص_التفنيد: str = Field(..., description="ملخص قصير يشرح سبب الحكم")

    class Config:
        use_enum_values = True


OUTPUT_JSON_SCHEMA_DESCRIPTION = """
لازم تكون الاستجابة النهائية (بعد ما تخلص استخدام الأدوات) JSON فقط بالشكل ده، من غير أي نص إضافي قبله أو بعده:

{
  "الادعاء": "string - الادعاء الأساسي بجملة واضحة",
  "الحكم": "صحيح" | "مضلل" | "غير مؤكد" | "مُفبرك",
  "نسبة_الثقة": integer 0-100,
  "المصادر_المؤيدة": [{"domain": "...", "name": "...", "url": "...", "credibility": 0-100}],
  "المصادر_المفندة": [{"domain": "...", "name": "...", "url": "...", "credibility": 0-100}],
  "ملخص_التفنيد": "string - 2-4 جمل تشرح ليه وصلت للحكم ده"
}
"""

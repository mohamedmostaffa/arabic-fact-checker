import json
from abc import ABC, abstractmethod

from schemas import FactCheckReport


class BaseAgent(ABC):
    @abstractmethod
    def check(self, claim_text: str, verbose: bool = True) -> FactCheckReport:
        raise NotImplementedError

    @staticmethod
    def parse_final_report(final_text: str) -> FactCheckReport:
        cleaned = (final_text or "").strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.strip("`")
            if cleaned.lower().startswith("json"):
                cleaned = cleaned[4:]
        cleaned = cleaned.strip()

        if not cleaned:
            raise ValueError("The model returned an empty final response - no JSON to validate.")

        data = json.loads(cleaned)
        return FactCheckReport(**data)

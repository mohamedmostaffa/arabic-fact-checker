import json
import os
from urllib.parse import urlparse

_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "trusted_sources.json")

with open(_DB_PATH, "r", encoding="utf-8") as f:
    _DB = json.load(f)

_SOURCES_BY_DOMAIN = {s["domain"]: s for s in _DB["sources"]}


def _extract_domain(url_or_domain: str) -> str:
    if "://" in url_or_domain:
        netloc = urlparse(url_or_domain).netloc
    else:
        netloc = url_or_domain
    return netloc[4:] if netloc.startswith("www.") else netloc


def check_source_credibility(domain_or_url: str) -> dict:
    domain = _extract_domain(domain_or_url)

    if domain in _SOURCES_BY_DOMAIN:
        entry = _SOURCES_BY_DOMAIN[domain]
        return {
            "domain": domain,
            "name": entry["name"],
            "credibility": entry["credibility"],
            "type": entry["type"],
            "known": True,
        }

    return {
        "domain": domain,
        "name": None,
        "credibility": None,
        "type": None,
        "known": False,
        "note": (
            "المصدر ده مش موجود في قاعدة البيانات المحلية. لازم يتم تقييمه "
            "يدويًا أو حسب سياق النتائج التانية (هل مواقع موثوقة بتشير له؟)."
        ),
    }


TOOL_SPEC = {
    "name": "check_source_credibility",
    "description": (
        "افحص مصداقية دومين أو رابط معيّن من قاعدة بيانات محلية للمصادر "
        "الإخبارية العربية والعالمية المعروفة. استخدمها بعد ما تلاقي نتائج "
        "بحث عشان تقيّم وزن كل مصدر في الحكم النهائي."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "domain_or_url": {
                "type": "string",
                "description": "الدومين أو الرابط الكامل اللي عايز تفحص مصداقيته",
            }
        },
        "required": ["domain_or_url"],
    },
}

from tools.web_search import web_search, TOOL_SPEC as WEB_SEARCH_SPEC
from tools.trusted_sources import check_source_credibility, TOOL_SPEC as CREDIBILITY_SPEC
from schemas import OUTPUT_JSON_SCHEMA_DESCRIPTION

MAX_TOOL_ITERATIONS = 6

SYSTEM_PROMPT = f"""أنت وكيل تحقق من الأخبار والشائعات المتخصص في المحتوى العربي
(فصحى وعامية مصرية/خليجية). مهمتك:

1. استخرج الادعاء الأساسي (claim) من كلام المستخدم بجملة واضحة ومحايدة.
2. استخدم أداة web_search (أكتر من مرة لو لازم، بصياغات مختلفة وبالعربي والإنجليزي)
   عشان تلاقي مصادر تؤكد أو تنفي الادعاء.
3. لكل مصدر مهم لقيته، استخدم أداة check_source_credibility عشان تعرف وزنه
   في الحكم النهائي (مصدر بمصداقية 90 وزنه أكبر من منشور فيسبوك فردي بمصداقية 15).
4. لا تعتمد على مصدر واحد فقط - حاول تلاقي على الأقل مصدرين مستقلين قبل ما تحكم.
5. لو مصادر التحقق قليلة أو متضاربة، الحكم يبقى "غير مؤكد" - متحاولش تخمّن.
6. لما تخلص، اطلع تقرير نهائي **JSON فقط** بالشكل ده بالظبط، من غير أي نص تاني
   ومن غير ```json حواليه:

{OUTPUT_JSON_SCHEMA_DESCRIPTION}

ملاحظات مهمة:
- كن محايدًا سياسيًا تمامًا؛ حكمك يعتمد على الأدلة فقط مش على أي انحياز.
- لو الأدوات رجّعت نتائج mock (تجريبية) وضّح ده في "ملخص_التفنيد" ولا تدّعي
  يقينًا مش موجود فعليًا.
"""

TOOL_SPECS = [WEB_SEARCH_SPEC, CREDIBILITY_SPEC]

TOOL_IMPLEMENTATIONS = {
    "web_search": lambda **kwargs: web_search(**kwargs),
    "check_source_credibility": lambda **kwargs: check_source_credibility(**kwargs),
}


def run_tool(tool_name: str, tool_input: dict) -> dict:
    impl = TOOL_IMPLEMENTATIONS.get(tool_name)
    if impl is None:
        return {"error": f"Unknown tool: {tool_name}"}
    try:
        return impl(**tool_input)
    except Exception as exc:
        return {"error": str(exc)}

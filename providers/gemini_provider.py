import os

from google import genai
from google.genai import types

from providers.base import BaseAgent
from providers.registry import SYSTEM_PROMPT, TOOL_SPECS, MAX_TOOL_ITERATIONS, run_tool
from providers.schema_adapters import to_gemini
from schemas import FactCheckReport

GEMINI_TOOLS = [
    types.Tool(function_declarations=[to_gemini(spec) for spec in TOOL_SPECS])
]


class GeminiAgent(BaseAgent):
    def __init__(self, api_key: str | None = None, model: str | None = None):
        self.client = genai.Client(api_key=api_key or os.environ.get("GEMINI_API_KEY"))
        self.model_name = model or os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
        self.config = types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            tools=GEMINI_TOOLS,
        )

    def check(self, claim_text: str, verbose: bool = True) -> FactCheckReport:
        chat = self.client.chats.create(model=self.model_name, config=self.config)
        response = chat.send_message(claim_text)

        for _ in range(MAX_TOOL_ITERATIONS):
            parts = response.candidates[0].content.parts
            function_calls = [p.function_call for p in parts if p.function_call]

            if not function_calls:
                final_text = (response.text or "").strip()
                return self.parse_final_report(final_text)

            response_parts = []
            for fc in function_calls:
                tool_input = dict(fc.args) if fc.args else {}
                if verbose:
                    print(f"  [Tool] {fc.name}({tool_input})")
                result = run_tool(fc.name, tool_input)
                response_parts.append(
                    types.Part.from_function_response(name=fc.name, response={"result": result})
                )

            response = chat.send_message(response_parts)

        raise RuntimeError(
            f"Agent exceeded the maximum number of iterations ({MAX_TOOL_ITERATIONS}) without producing a final report."
        )

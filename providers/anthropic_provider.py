import json
import os

from anthropic import Anthropic

from providers.base import BaseAgent
from providers.registry import SYSTEM_PROMPT, TOOL_SPECS, MAX_TOOL_ITERATIONS, run_tool
from providers.schema_adapters import to_anthropic
from schemas import FactCheckReport

ANTHROPIC_TOOLS = [to_anthropic(spec) for spec in TOOL_SPECS]


class AnthropicAgent(BaseAgent):
    def __init__(self, api_key: str | None = None, model: str | None = None):
        self.client = Anthropic(api_key=api_key or os.environ.get("ANTHROPIC_API_KEY"))
        self.model = model or os.environ.get("CLAUDE_MODEL", "claude-sonnet-4-6")

    def check(self, claim_text: str, verbose: bool = True) -> FactCheckReport:
        messages = [{"role": "user", "content": claim_text}]

        for _ in range(MAX_TOOL_ITERATIONS):
            response = self.client.messages.create(
                model=self.model,
                max_tokens=2000,
                system=SYSTEM_PROMPT,
                tools=ANTHROPIC_TOOLS,
                messages=messages,
            )

            tool_uses = [b for b in response.content if b.type == "tool_use"]

            if not tool_uses:
                final_text = "".join(b.text for b in response.content if b.type == "text").strip()
                return self.parse_final_report(final_text)

            messages.append({"role": "assistant", "content": response.content})

            tool_results = []
            for tool_use in tool_uses:
                if verbose:
                    print(f"  [Tool] {tool_use.name}({tool_use.input})")
                result = run_tool(tool_use.name, tool_use.input)
                tool_results.append(
                    {
                        "type": "tool_result",
                        "tool_use_id": tool_use.id,
                        "content": json.dumps(result, ensure_ascii=False),
                    }
                )
            messages.append({"role": "user", "content": tool_results})

        raise RuntimeError(
            f"Agent exceeded the maximum number of iterations ({MAX_TOOL_ITERATIONS}) without producing a final report."
        )

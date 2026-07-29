def to_anthropic(spec: dict) -> dict:
    return {
        "name": spec["name"],
        "description": spec["description"],
        "input_schema": spec["parameters"],
    }


def to_openai_style(spec: dict) -> dict:
    return {
        "type": "function",
        "function": {
            "name": spec["name"],
            "description": spec["description"],
            "parameters": spec["parameters"],
        },
    }


def to_gemini(spec: dict) -> dict:
    return {
        "name": spec["name"],
        "description": spec["description"],
        "parameters": spec["parameters"],
    }

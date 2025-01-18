import requests
from typing import Optional
import warnings
import os
from dotenv import load_dotenv
load_dotenv()
try:
    from langflow.load import upload_file
except ImportError:
    warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
    upload_file = None

BASE_API_URL = os.getenv("BASE_API_URL")
LANGFLOW_ID = os.getenv("LANGFLOW_ID")
FLOW_ID = os.getenv("FLOW_ID")
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")
ENDPOINT = "media-insight"

TWEAKS = {
    "ChatInput-bGuBU": {},
    "ChatOutput-6XGb8": {},
    "AstraDB-gDBtl": {},
    "ParseData-e4Vkc": {},
    "Prompt-59qpd": {},
    "File-IkrWp": {},
    "SplitText-Pdall": {},
    "AstraDB-GXmZL": {},
    "Agent-N43tY": {},
    "GroqModel-xMcLv": {},
    "GoogleGenerativeAIModel-QNpZL": {}
}

def run_flow(message: str, output_type: str = "chat", input_type: str = "chat",
             tweaks: Optional[dict] = None, application_token: Optional[str] = None) -> dict:
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID}"
    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    if tweaks:
        payload["tweaks"] = tweaks

    headers = {"Authorization": f"Bearer {application_token}", "Content-Type": "application/json"} if application_token else None

    response = requests.post(api_url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()

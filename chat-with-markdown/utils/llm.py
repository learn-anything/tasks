import os, requests
from dotenv import load_dotenv

load_dotenv()
API_TOKEN = os.getenv("API_TOKEN")
API_BASE_URL = os.getenv("API_BASE_URL")

system_prompt = """
You extract information from the given page delimited in ||| 
and answers question on its content only, 
if the question is not answered in the page asnwer "NA".
The author of the content is named nikita. Answer shortly

|||
{context_md}
|||
"""

def llm_inference(model, inputs):
    headers = {"Authorization": f"Bearer {API_TOKEN}"}
    input = {"messages": inputs, "temperature": 0}
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

def generate_answer(md_path: str, context_doc: str, chat_logs: list):
    history = []
    history.append(
        {
            "role": "system",
            "content": system_prompt.replace("{context_md}", context_doc),
        }
    )
    history.append(chat_logs[-1])
    output = llm_inference("@cf/meta/llama-2-7b-chat-int8", history)
    return f"(Taken from {md_path})\n\n" + output["result"]["response"]
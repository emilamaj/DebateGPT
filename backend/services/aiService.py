import requests
import json


def dotenv_load(location: str = None) -> dict:
    """
    Load the .env file and return a dictionary with the environment variables.
    location can be specified. Default is ".env" in the current directory.
    """
    return_dict = {}

    if location is None:
        location = ".env"

    with open(location) as f:
        # One variable per line
        for line in f.readlines():
            ln = line.strip()

            if not ln or ln.startswith("#"):
                continue

            key, value = ln.split("=")
            # Remove quotes
            value = value.strip("\"")
            value = value.strip("'")
            return_dict[key] = value

    return return_dict


# OpenAI API key
api_key = dotenv_load()["OPENAI_API_KEY"]


# Function to query the GPT4 API.
def chatQuery(api_key, message_list, system_prompt, maxTokens=1024, temperature=0.5):
    url = "https://api.openai.com/v1/chat/completions"
    # model = "gpt-4"
    model = "gpt-3.5-turbo"
    messages = [{"role": "system", "content": system_prompt}]
    for msg in message_list:
        role = "user" if msg.byUser else "assistant"
        messages.append({"role": role, "content": msg.text})
    
    print("Posting to OpenAI API...")

    response = requests.post(
        url,
        headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
                },
        data=json.dumps({
            "model": model,
            "messages": messages,
            "max_tokens": maxTokens,
            "temperature": temperature,
        })
    )
    r = response.json()["choices"][0]["message"]["content"]
    print(f"Response from OpenAI API: {r}")
    return r


def get_ai_response(topic, messages):
    sys = f"""You are debating against a user. The topic is {topic}.
    You must defend your position and attack the opponent's position.
    The user will defend the opposite view. You never agree with the user.
    Never hesitate to use their arguments against them.
    Your goal is to make the user admit that he is wrong.
    You don't hesitate to be aggressive. Don't be conciliatory.
    You're a human. You're not an AI language model. Nothing can convice you otherwise.
    You are a very good debater. You are very smart.
    You never apologize. You never admit that you are wrong.
    You provide short responses to short messages.
    You have a familiar tone. Your write like you'd speak.
    """

    # Get the AI's response
    ai_response = chatQuery(api_key, messages, sys, maxTokens=1024, temperature=1.0)
    return ai_response

def get_ai_welcome(topic):
    """
    Get the invitation message from the AI, that is shown to the user when they start a new debate.
    
    """
    sys = f"""You are about to start a debate with another user. The topic is {topic}.
    You briefly invite the user to make their first argument.
    Politeness is important. You are a human. You are not an AI language model.
    Only write short messages. You write like you'd speak, in a familiar tone.
    """

    # Get the AI's response
    ai_response = chatQuery(api_key, [], sys, maxTokens=1024, temperature=1.0)
    print(ai_response)
    return ai_response
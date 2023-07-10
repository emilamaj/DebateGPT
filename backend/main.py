from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.aiService import get_ai_response, get_ai_welcome
import asyncio

class Message(BaseModel):
    text: str
    byUser: bool

class Debate(BaseModel):
    topic: str
    messages: list[Message]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def compute_delay(ai_message):
    """
    Compute the delay to wait for a given AI response.
    """

    # A response of WORDS words takes SECONDS seconds to read
    SECONDS = 10
    WORDS = 100

    words = ai_message.split(" ")
    delay = SECONDS * len(words) / WORDS
    return delay

@app.post("/api/ai-response")
async def ai_response(debate: Debate):
    print(f"User message: {debate.messages[-1].text}")
    try:
        # Get the AI's response
        ai_response = get_ai_response(debate.topic, debate.messages)
        print(f"AI response: {ai_response}")

        # Compute the delay to wait for the AI's response
        await asyncio.sleep(compute_delay(ai_response))

        # Return the AI's response
        return {"aiResponse": ai_response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/api/ai-auto")
async def ai_auto(debate: Debate):
    print("Auto-generated response requested...")
    try:
        # Reverse the authorship of the messages
        inv_messages = [Message(text=msg.text, byUser=not msg.byUser) for msg in debate.messages]
        ai_response = get_ai_response(debate.topic, inv_messages)
        print(f"Auto-user response: {ai_response}")

        # Compute the delay to wait for the AI's response
        await asyncio.sleep(compute_delay(ai_response))

        # Return the AI's response
        return {"aiResponse": ai_response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/api/ai-welcome")
async def ai_welcome(debate: Debate):
    print(f"Topic: {debate.topic}")
    try:
        # Get the AI's response
        ai_response = get_ai_welcome(debate.topic)
        print(f"AI welcome message: {ai_response}")

        # Compute the delay to wait for the AI's response
        await asyncio.sleep(compute_delay(ai_response))

        # Return the AI's response
        return {"aiResponse": ai_response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

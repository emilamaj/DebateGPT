from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from services.aiService import get_ai_response

class Message(BaseModel):
    text: str
    byUser: bool

class Debate(BaseModel):
    topic: str
    messages: List[Message]

app = FastAPI()

@app.post("/api/ai-response")
async def ai_response(debate: Debate):
    try:
        # Extract the user's message from the debate
        user_message = debate.messages[-1].text if debate.messages else ""

        # Get the AI's response
        ai_response = get_ai_response(debate.topic, user_message)

        # Return the AI's response
        return {"aiResponse": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.aiService import get_ai_response, get_ai_welcome

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

@app.post("/api/ai-response")
async def ai_response(debate: Debate):
    print(f"User message: {debate.messages[-1].text}")
    try:
        # Get the AI's response
        ai_response = get_ai_response(debate.topic, debate.messages)

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

        # Return the AI's response
        return {"aiResponse": ai_response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

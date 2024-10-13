from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.aiService import get_ai_response, rate_new_message, get_ai_welcome
import asyncio

GPT_MODEL = "gpt-4o-mini"

class Message(BaseModel):
    text: str
    comment: str
    note: str
    byUser: bool

class Debate(BaseModel):
    topic: str
    messages: list[Message]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://debategpt.emileamaj.xyz"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def compute_delay(ai_message):
    """
    Compute the delay to wait for a given AI response.
    """

    # A response of WORDS words takes SECONDS seconds to read
    SECONDS = 15
    WORDS = 100

    words = ai_message.split(" ")
    delay = SECONDS * len(words) / WORDS
    return delay


@app.post("/api/ai-response")
async def ai_response(debate: Debate):
    print(f"User message: {debate.messages[-1].text}")
    user_rating = rate_new_message(debate.messages[:-1], debate.messages[-1].text, resp_by_user=True, model=GPT_MODEL)
    print(f"User rating: {user_rating}")

    try:
        # Get the AI's response
        ai_response = get_ai_response(debate.topic, debate.messages, model=GPT_MODEL)
        print(f"AI response: {ai_response}")

        # Compute the delay to wait for the AI's response
        await asyncio.sleep(compute_delay(ai_response))

        # Rate the new message
        ai_rating = rate_new_message(debate.messages, ai_response, resp_by_user=False, model=GPT_MODEL)
        print(f"AI rating: {ai_rating}")

        # Return the AI's response
        return {"userRating": user_rating, "aiResponse": ai_response, "aiRating": ai_rating}
    except Exception as e:
        print(repr(e))
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/api/ai-auto")
async def ai_auto(debate: Debate):
    print("Auto-generated response requested...")
    try:
        # Reverse the authorship of the messages
        inv_messages = [Message(text=msg.text, byUser=not msg.byUser, comment=msg.comment, note=msg.note) for msg in debate.messages]
        ai_response = get_ai_response(debate.topic, inv_messages, model=GPT_MODEL)
        print(f"Auto-user response: {ai_response}")

        # Compute the delay to wait for the AI's response
        await asyncio.sleep(compute_delay(ai_response))

        # # Rate the new message
        # user_rating = rate_new_message(debate.messages, ai_response, resp_by_user=True, model=GPT_MODEL)
        # print(f"Auto-user rating: {user_rating}")

        # Return the AI's response
        return {"autoResponse": ai_response}
    except Exception as e:
        print(repr(e))
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/api/ai-welcome")
async def ai_welcome(debate: Debate):
    print(f"Topic: {debate.topic}")
    try:
        # Get the AI's response
        ai_response = get_ai_welcome(debate.topic, model=GPT_MODEL)
        print(f"AI welcome message: {ai_response}")

        # Compute the delay to wait for the AI's response
        await asyncio.sleep(compute_delay(ai_response))

        # Return the AI's response
        return {"aiResponse": ai_response, "rating": ""}
    except Exception as e:
        print(repr(e))
        raise HTTPException(status_code=500, detail=str(e))

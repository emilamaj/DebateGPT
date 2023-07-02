import requests

def get_ai_response(topic, user_message):
    # Define the API endpoint
    api_endpoint = "https://api.example.com/ai-response"

    # Define the request payload
    payload = {
        "topic": topic,
        "userMessage": user_message
    }

    # Send the request to the AI text generation service
    response = requests.post(api_endpoint, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        # Extract the AI's response from the response body
        ai_response = response.json().get("aiResponse", "")

        # Return the AI's response
        return ai_response
    else:
        # If the request was not successful, raise an exception
        raise Exception("Failed to get AI response")
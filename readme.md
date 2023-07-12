# DebateGPT: A Debate adversary on any topic
## Access
You can try out the demo at [debategpt.emileamaj.xyz](http://debategpt.emileamaj.xyz/).

## Introduction
DebateGPT is an AI adversary chatbot that can debate on any topic.  
You select the topic, and start to debate right away.  
The arguments of each side are commented by an external AI, which give a rating out of 10 to the argument.  
You can write your own text or ask an AI to generate a response on your behalf, making DebateGPT debate with itself.  
DebateGPT will always take the opposite side of your argument, and try to refute it.  
It uses the [GPT-3.5-turbo](https://platform.openai.com/docs/models/gpt-3-5) model to generate the responses to your arguments.  

This project was inspired by Marc Andreessen's remarks on [Lex Fridman's podcast 386](https://www.youtube.com/watch?v=-hxeDjAxvJ8&t=940s) (at 15:40), where he talks about his experiments with GPT-4 debating with itself.

## Interface
![Landing page, with "Taxation" set as the topic](screen-debate-landing.png)

Set the topic of the debate, and click on "Start debate".  


![The AI taking the side of not taxing the poor](screen-debate-thread.png)

The AI automatically takes the opposite side of the user's argument, and tries to refute it.  


![The AI against taxing the rich](screen-debate-thread-opposite.png)

The "convictions" of the AI are set by the user's initial stance in the debate. By restarting the debate with a different stance, the AI will take the opposite side of the argument.

## Running the project
To run this project on your local machine, you need to have [Node.js](https://nodejs.org/en/) installed.
The backend of this project is in [Python](https://www.python.org/) and uses [FastAPI](https://fastapi.tiangolo.com/).
You also need to have an OpenAI API key, which you can generate [here](https://platform.openai.com/account/api-keys).
You need to create `.env` files in the `backend` and `frontend` folders, with the following content:

Set the `REACT_APP_BACKEND_URL` variable to the URL of the backend server.
./frontend/.env
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

./backend/.env
```
OPENAI_API_KEY="sk-xxxxxxxxx"
```
Where `sk-xxxxxxxxx` is your OpenAI API key.

In the **frontend** folder, run:
```
npm install
```
if this is the first time you run the project, or if you want to update the dependencies.

Then, in the same folder, run:
```
npm run start
```
To start the frontend dev server.

In the **backend** folder, run:
```
uvicorn main:app --port 8000
```
To start the backend server.

If everything went well, you should be able to access the project at [http://localhost:3000](http://localhost:3000).

## To do
- [ ] Add a "share" button to share the debate thread
- [ ] Add rate-limiting to prevent abuse
- [ ] Add support for GPT-4
- [ ] Additional languages (currently only English is supported)
- [ ] Add debate parameters (aggressive, polite, good faith, etc.)
- [x] Argument quality estimation
- [ ] Update ratings after argument text edition
- [ ] Debate winner estimation
- [x] Allow editing of the user's arguments
- [x] Allow the AI to respond to the AI's arguments
- [x] Emulate depth of thought by adding a delay in the response
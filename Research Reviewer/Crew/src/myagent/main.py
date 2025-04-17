#!/usr/bin/env python
import sys
import warnings
import os
from datetime import datetime
from fastapi.responses import HTMLResponse
import markdown
from myagent.crew import Myagent
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'Crew', '.env'))
load_dotenv(dotenv_path= dotenv_path)

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

def get_paper1_content():
    paper1_path = os.path.join('Crew', 'knowledge', 'paper1.txt')
    print(f"[DEBUG] Looking for paper1 at: {os.path.abspath(paper1_path)}")
    if os.path.exists(paper1_path):
        with open(paper1_path, 'r', encoding='utf-8') as file:
            return file.read()
    else:
        return "paper1.txt does not exist."

    
def get_paper2_content():
    paper2_path = os.path.join('Crew', 'knowledge', 'paper2.txt')
    if os.path.exists(paper2_path):
        with open(paper2_path, 'r', encoding='utf-8') as file:
            return file.read()
    else:
        return "paper2.txt does not exist."

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to MyAgent API"}

# Define the request body schema
class QuestionRequest(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    """
    Endpoint to interact with the ReviewChatBot agent and get an answer to the question.
    """
    myagent = Myagent()
    crew = myagent.chat_crew()

    review = final_review_content
    
    input = { "question": request.question,
            "review_content": review}
    if not request.question:
        raise HTTPException(status_code=400, detail="Question is required")

    print(f"[DEBUG] Response from ReviewChatBot: {request.question}")
    try:
        
        response = crew.kickoff(inputs=input)
        return {"answer": response}
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.on_event("shutdown")
async def shutdown_event():
    print("Shutting down the server...")
    
    
@app.get("/myagent", response_class=HTMLResponse)
@app.post("/myagent")
async def run_crew():
    global final_review_content 
    agent = Myagent()
    crew = agent.crew()
    
    inputs = {
        "paper1": get_paper1_content(),
        "paper2": get_paper2_content()
    }
    
    try:
        print("Starting kickoff...")
        result = crew.kickoff(inputs=inputs) 
        print("Kickoff completed.")

        file_path = "Crew/knowledge/final_review.md"
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                md_content = f.read()
                final_review_content = md_content 
                html_content = markdown.markdown(md_content)
                return HTMLResponse(content=html_content)
        else:
            return HTMLResponse(content="<h1>No summary found</h1>") 
        
        return {"result": result}  
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}



main = app


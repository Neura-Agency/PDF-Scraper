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
from fastapi import UploadFile, File
import shutil
import subprocess

dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'Crew', '.env'))
load_dotenv(dotenv_path=dotenv_path)

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# Canonical knowledge directory (Crew/knowledge)
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
KNOWLEDGE_DIR = os.path.join(ROOT_DIR, "knowledge")




def get_paper1_content():
    paper1_path = os.path.join(KNOWLEDGE_DIR, 'paper1.txt')
    print(f"[DEBUG] Looking for paper1 at: {os.path.abspath(paper1_path)}")
    if os.path.exists(paper1_path):
        with open(paper1_path, 'r', encoding='utf-8') as file:
            return file.read()
    return "paper1.txt does not exist."


def get_paper2_content():
    paper2_path = os.path.join(KNOWLEDGE_DIR, 'paper2.txt')
    print(f"[DEBUG] Looking for paper2 at: {os.path.abspath(paper2_path)}")
    if os.path.exists(paper2_path):
        with open(paper2_path, 'r', encoding='utf-8') as file:
            return file.read()
    return "paper2.txt does not exist."


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://research-reviewer.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=[
        "*",
        "Content-Type",
        "Content-Length",
        "Accept",
        "Accept-Encoding",
        "Accept-Language",
    ],
)


@app.get("/")
async def root():
    return {"message": "Welcome to MyAgent API"}


# Define the request body schema
class QuestionRequest(BaseModel):
    question: str
    search: bool


@app.post("/ask")
async def ask_question(request: QuestionRequest):
    """
    Endpoint to interact with the ReviewChatBot agent and get an answer to the question.
    """
    myagent = Myagent()
    crew = myagent.chat_crew()

    file_path = os.path.join(KNOWLEDGE_DIR, "final_review.md")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            review = f.read()
    else:
        review = "No review content available."

    input = {"question": request.question,
             "review_content": review, "search": request.search}
    print(request.search)
    if not request.question:
        raise HTTPException(status_code=400, detail="Question is required")
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

        file_path = os.path.join(KNOWLEDGE_DIR, "final_review.md")

        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                md_content = f.read()
                final_review_content = md_content  # Store the final review content
                html_content = markdown.markdown(md_content)
                return HTMLResponse(content=html_content)
        else:
            return HTMLResponse(content="<h1>No summary found</h1>")

        return {"result": result}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}


@app.post("/process-pdfs")
async def process_pdfs(
    pdf: UploadFile = File(..., description="First PDF file"),
    pdf2: UploadFile = File(..., description="Second PDF file")
):
    try:
        print("\n=== Processing PDFs ===")
        print(f"[DEBUG] Received files:")
        print(f"PDF1: {pdf.filename} ({pdf.content_type})")
        print(f"PDF2: {pdf2.filename} ({pdf.content_type})")

        # Validate content types
        if not pdf.content_type == "application/pdf" or not pdf2.content_type == "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only PDFs are accepted."
            )

        os.makedirs(KNOWLEDGE_DIR, exist_ok=True)
        paper1_path = os.path.join(KNOWLEDGE_DIR, "paper1.pdf")
        paper2_path = os.path.join(KNOWLEDGE_DIR, "paper2.pdf")

        # Save files using async read
        print(f"[DEBUG] Saving files to {KNOWLEDGE_DIR}")
        
        content1 = await pdf.read()
        content2 = await pdf2.read()

        with open(paper1_path, "wb") as f:
            f.write(content1)
        with open(paper2_path, "wb") as f:
            f.write(content2)

        print("[DEBUG] Files saved successfully")

        # Rest of your existing processing code...
        script_path = os.path.join(os.path.dirname(__file__), "tools", "pdfdatascraper.py")
        print(f"[DEBUG] Running pdfdatascraper.py at: {script_path}")

        result = subprocess.run(
            [sys.executable, script_path, paper1_path, paper2_path],
            capture_output=True,
            text=True,
        )

        print("[DEBUG] pdfdatascraper return code:", result.returncode)
        print("[DEBUG] pdfdatascraper stdout:", result.stdout.strip())
        print("[DEBUG] pdfdatascraper stderr:", result.stderr.strip())

        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr or "pdfdatascraper failed")

        texts = {}
        paper1_txt = os.path.join(KNOWLEDGE_DIR, "paper1.txt")
        paper2_txt = os.path.join(KNOWLEDGE_DIR, "paper2.txt")

        print(f"[DEBUG] Looking for extracted TXT files: {paper1_txt}, {paper2_txt}")

        if os.path.exists(paper1_txt):
            with open(paper1_txt, "r", encoding="utf-8") as f:
                texts["paper1"] = f.read()
            print("[DEBUG] paper1.txt loaded successfully")
        else:
            print("[WARN] paper1.txt not found!")

        if os.path.exists(paper2_txt):
            with open(paper2_txt, "r", encoding="utf-8") as f:
                texts["paper2"] = f.read()
            print("[DEBUG] paper2.txt loaded successfully")
        else:
            print("[WARN] paper2.txt not found!")

        return {
            "message": "PDFs processed successfully",
            "texts": texts,
            "stdout": result.stdout.strip(),
        }

    except Exception as e:
        print("[ERROR] process_pdfs failed:", str(e))
        raise HTTPException(status_code=500, detail=str(e))



main = app

#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from myagent.crew import Myagent

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


from fastapi import FastAPI
from .crew import Myagent

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to MyAgent API"}

@app.get("/myagent")
@app.post("/myagent")
async def run_crew():
    agent = Myagent()
    crew = agent.crew()
    result = crew.kickoff()
    return {"result": result.content}

main = app



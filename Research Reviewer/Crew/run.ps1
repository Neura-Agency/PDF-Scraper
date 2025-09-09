$env:PYTHONPATH = ".\src"
uvicorn myagent.main:app --reload

import pdfplumber
import sys
import os

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("[ERROR] No file paths provided")
        sys.exit(1)

    file_paths = sys.argv[1:]
    print(f"[DEBUG] Received paths to process: {file_paths}")
    
    for path in file_paths:
        if not os.path.exists(path):
            print(f"[ERROR] File not found: {path}")
            sys.exit(1)
        print(f"[DEBUG] Found file: {path} (size: {os.path.getsize(path)} bytes)")

    # Canonical knowledge directory (/Research_Reviewer/Crew/knowledge)
    ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    KNOWLEDGE_DIR = os.path.join(ROOT_DIR, "knowledge")
    os.makedirs(KNOWLEDGE_DIR, exist_ok=True)

    for file_path in file_paths:
        print(f"[DEBUG] Processing: {file_path}")
        output_text = extract_text_from_pdf(file_path)
        
        filename = os.path.basename(file_path).lower()
        if "paper2" in filename:
            output_filename = "paper2.txt"
        elif "paper1" in filename:
            output_filename = "paper1.txt"
        else:
            output_filename = "output.txt"
            
        output_path = os.path.join(KNOWLEDGE_DIR, output_filename)
        print(f"[DEBUG] Writing output to: {output_path}")
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(output_text)
        print(f"[DEBUG] Successfully wrote: {output_path}")

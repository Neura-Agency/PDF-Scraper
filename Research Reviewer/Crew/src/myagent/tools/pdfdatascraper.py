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
        print("No file paths provided")
        sys.exit(1)

    file_paths = sys.argv[1:]

    for file_path in file_paths:
        output_text = extract_text_from_pdf(file_path)

        filename = os.path.basename(file_path).lower()
        if "paper2" in filename:
            output_filename = "paper2.txt"
        elif "paper1" in filename:
            output_filename = "paper1.txt"
        else:
            output_filename = "output.txt"

        output_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'knowledge', output_filename)

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(output_text)

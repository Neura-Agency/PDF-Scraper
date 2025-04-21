import fitz  
import sys
import os

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()

    doc.close()
    return text

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No file paths provided")
        sys.exit(1)

    file_paths = sys.argv[1:]  # Get all PDF file paths passed as arguments

    for file_path in file_paths:
        output_text = extract_text_from_pdf(file_path)

        # Determine output file name based on input file name
        filename = os.path.basename(file_path).lower()
        if "paper2" in filename:
            output_filename = "paper2.txt"
        if "paper1" in filename:
            output_filename = "paper1.txt"

        output_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'knowledge', output_filename)

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(output_text)

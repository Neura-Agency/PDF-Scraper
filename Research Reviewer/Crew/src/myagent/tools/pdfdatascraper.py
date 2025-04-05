import fitz  # PyMuPDF
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
        print("No file path provided")
        sys.exit(1)

    file_path = sys.argv[1]
    output_text = extract_text_from_pdf(file_path)

    # Save to extracted_text.txt in the same folder
    output_path = os.path.join(os.path.dirname(__file__), "extracted_text.txt")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output_text)

    # Optional: print to return it to the frontend as well
    print(output_text)

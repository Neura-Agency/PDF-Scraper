import { spawn } from "child_process";
import { formidable } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ uploadDir: "./upload", keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Formidable parsing error:", err);
      return res.status(500).send("Error parsing form");
    }
  
    if (!files.pdf || files.pdf.length === 0) {
      console.error("PDF not found in files:", files);
      return res.status(400).send("No PDF file uploaded");                                                                                            
    }
  
    const pdfPath = files.pdf[0].filepath;

    const python = spawn("python", [
      "C:\\Users\\Hamza khan\\OneDrive\\Desktop\\projects\\Neura Agency\\Research Reviewer\\Crew\\src\\myagent\\tools\\pdfdatascraper.py",
      pdfPath,
    ]);

    let output = "";

    python.stdout.on("data", (data) => (output += data.toString()));
    python.stderr.on("data", (data) => console.error("Python error:", data.toString()));

    python.on("close", () => {
      res.status(200).json({ text: output });
    });

    python.on("error", (err) => {
      console.error("Python error:", err);
      res.status(500).send("Error processing the file");
    });
  });
}

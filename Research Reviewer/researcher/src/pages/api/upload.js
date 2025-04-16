import { spawn } from "child_process";
import { formidable } from "formidable";
import path from "path";
import fs from "fs";

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

    const paper1Path = files.pdf[0].filepath;
    const paper2Path = files.pdf2[0].filepath;

    // Define new file names
    const newPaper1Path = path.join(path.dirname(paper1Path), "paper1.pdf");
    const newPaper2Path = path.join(path.dirname(paper2Path), "paper2.pdf");

    // Rename the files
    fs.renameSync(paper1Path, newPaper1Path);
    fs.renameSync(paper2Path, newPaper2Path);

    const pythonScriptPath = path.join(
      __dirname,
      '..', 
      '..', 
      '..', 
      '..', 
      '..',
      '..', 
      'Crew',
      'src',
      'myagent',
      'tools',
      'pdfdatascraper.py'
    );

    const python = spawn("python", [
      pythonScriptPath,
      newPaper1Path,
      newPaper2Path, 
    ]);

    let output = "";

    python.stdout.on("data", (data) => (output += data.toString()));
    python.stderr.on("data", (data) => console.error("Python error:", data.toString()));

    python.on("close", (code) => {
      if (code === 0) {
        res.status(200).json({ text: output }); // Send response on success
      } else {
        res.status(500).send("Error processing the files"); // Send error response
      }
    });

    python.on("error", (err) => {
      console.error("Python error:", err);
      res.status(500).send("Error processing the file");
    });
  });
}
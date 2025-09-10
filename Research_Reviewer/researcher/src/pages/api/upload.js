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

    // Resolve python script path relative to repository root to avoid duplicate segments
    const pythonScriptPath = path.resolve(
      process.cwd(),
      "..", // up from researcher -> Research Reviewer
      "Crew",
      "src",
      "myagent",
      "tools",
      "pdfdatascraper.py"
    );

    // Debug: ensure script exists
    if (!fs.existsSync(pythonScriptPath)) {
      console.error("Python script not found at:", pythonScriptPath);
      return res.status(500).send(`Python script not found: ${pythonScriptPath}`);
    }

    // locate venv python (Windows) relative to repo root
    const venvPython = path.resolve(process.cwd(), "..", "Crew", ".venv", "Scripts", "python.exe");
    const pythonExecutable = fs.existsSync(venvPython) ? venvPython : "python";

    // Debug: show which python will be used
    console.log("Using python executable:", pythonExecutable);
    console.log("Running script:", pythonScriptPath);

    const python = spawn(pythonExecutable, [
      pythonScriptPath,
      newPaper1Path,
      newPaper2Path,
    ], { cwd: path.dirname(pythonScriptPath) });
    
    let output = "";

    python.stdout.on("data", (data) => (output += data.toString()));
    python.stderr.on("data", (data) =>
      console.error("Python error:", data.toString())
    );

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

// src/pages/api/upload.ts
import { IncomingForm, File as FormidableFile } from "formidable";
import fs from "fs";
import FormData from "form-data";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // disable default body parser for multipart
  },
};

// Helper to normalize formidable file objects (works for v2 + v3)
function getFile(file) {
  if (!file) return null;
  return Array.isArray(file) ? file[0] : file;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = new IncomingForm({
      uploadDir: "/tmp", // Vercel's writable tmp dir
      keepExtensions: true,
    });

    console.log("[DEBUG] Parsing incoming form...");

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("[ERROR] Formidable parse failed:", err);
        return res.status(500).json({ error: "File parsing failed" });
      }

      const pdfFile = getFile(files.pdf);
      const pdf2File = getFile(files.pdf2);

      console.log("[DEBUG] Parsed files:", {
        pdf: pdfFile?.originalFilename,
        pdf2: pdf2File?.originalFilename,
        path1: pdfFile?.filepath,
        path2: pdf2File?.filepath,
      });

      try {
        const paper1Path = pdfFile?.filepath;
        const paper2Path = pdf2File?.filepath;

        if (!paper1Path || !paper2Path) {
          console.error("[ERROR] Missing file paths", { paper1Path, paper2Path });
          return res.status(400).json({ error: "Both PDFs are required" });
        }

        // Verify files exist
        if (!fs.existsSync(paper1Path) || !fs.existsSync(paper2Path)) {
          console.error("[ERROR] File(s) missing on disk", {
            exists1: fs.existsSync(paper1Path),
            exists2: fs.existsSync(paper2Path),
          });
          return res.status(400).json({ error: "Uploaded file(s) not found" });
        }

        console.log("[DEBUG] Preparing FormData to forward...");
        const formData = new FormData();

        formData.append("pdf", fs.createReadStream(paper1Path), {
          filename: pdfFile.originalFilename || path.basename(paper1Path),
          contentType: "application/pdf",
        });

        formData.append("pdf2", fs.createReadStream(paper2Path), {
          filename: pdf2File.originalFilename || path.basename(paper2Path),
          contentType: "application/pdf",
        });

        // Debug: list keys + filenames in FormData
        console.log("[DEBUG] FormData keys being sent:");
        for (const [key, value] of formData) {
          console.log(
            "  ",
            key,
            value?.path ? `ReadStream(${value.path})` : value
          );
        }

        const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/process-pdfs`;
        console.log("[DEBUG] Forwarding request to backend:", { url: backendUrl });

        const response = await fetch(backendUrl, {
          method: "POST",
          body: formData, // don't set headers manually
        });

        console.log("[DEBUG] Backend responded with status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("[ERROR] Backend error response:", {
            status: response.status,
            body: errorText,
          });
          throw new Error(`Backend error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log("[DEBUG] Backend response JSON:", data);

        // Cleanup temp files
        for (const filePath of [paper1Path, paper2Path]) {
          try {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log("[DEBUG] Temp file deleted:", filePath);
            }
          } catch (cleanupErr) {
            console.warn("[WARN] Failed to cleanup temp file:", {
              filePath,
              error: cleanupErr,
            });
          }
        }

        return res.status(200).json(data);
      } catch (error) {
        console.error("[ERROR] Upload forwarding failed:", error);
        return res.status(500).json({ error: "Error forwarding to backend" });
      }
    });
  } catch (error) {
    console.error("[ERROR] Handler crashed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

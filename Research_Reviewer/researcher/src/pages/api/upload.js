// src/pages/api/upload.ts
import { IncomingForm } from "formidable";
import fs from "fs";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false, // we handle multipart manually
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = new IncomingForm({
      uploadDir: "/tmp", // only writable dir on Vercel
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(500).json({ error: "File parsing failed" });
      }

      console.log("[DEBUG] Received files:", {
        pdf: files.pdf?.[0]?.originalFilename,
        pdf2: files.pdf2?.[0]?.originalFilename,
        path1: files.pdf?.[0]?.filepath,
        path2: files.pdf2?.[0]?.filepath
      });

      try {
        const paper1Path = files.pdf?.[0]?.filepath;
        const paper2Path = files.pdf2?.[0]?.filepath;

        if (!paper1Path || !paper2Path) {
          console.error("[ERROR] Missing file paths:", { paper1Path, paper2Path });
          return res.status(400).json({ error: "Both PDFs are required" });
        }

        // Check if files exist before creating streams
        if (!fs.existsSync(paper1Path) || !fs.existsSync(paper2Path)) {
          console.error("[ERROR] Files don't exist:", { paper1Path, paper2Path });
          return res.status(400).json({ error: "File not found on server" });
        }

        // Prepare files to forward to backend
        const formData = new FormData();
        formData.append("pdf", fs.createReadStream(paper1Path));
        formData.append("pdf2", fs.createReadStream(paper2Path));

        console.log("[DEBUG] Sending files to backend:", process.env.NEXT_PUBLIC_BACKEND_URL);

        // Call FastAPI backend
        const backendRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/process-pdfs`,
          {
            method: "POST",
            body: formData, 
            headers: formData.getHeaders(),  
          }
        );

        const data = await backendRes.json();

        return res.status(200).json(data);
      } catch (error) {
        console.error("Upload forwarding error:", error);
        return res.status(500).json({ error: "Error forwarding to backend" });
      }
    });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

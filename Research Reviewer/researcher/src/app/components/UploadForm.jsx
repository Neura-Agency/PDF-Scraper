// components/UploadForm.jsx
"use client";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponseText(data?.text || "No text extracted.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload PDF</button>
      {responseText && <pre>{responseText}</pre>}
    </form>
  );
}

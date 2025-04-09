// components/UploadForm.jsx
"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !file2) return;

    const formData = new FormData();
    if (file) formData.append("pdf", file);
    if (file2) formData.append("pdf2", file2);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponseText(data?.text || "No text extracted.");

    try {
      const getResponse = await axios.get("http://127.0.0.1:8000/myagent");
      console.log("GET Response:", getResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile2(e.target.files[0])}
      />
      <button type="submit">Upload PDFs</button>
       {responseText && <pre>{responseText}</pre>}
    </form>
  );
}

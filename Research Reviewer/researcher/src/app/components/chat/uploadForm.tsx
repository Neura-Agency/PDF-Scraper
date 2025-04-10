"use client";
import { useState } from "react";
import axios from "axios";

interface UploadFormProps {
  setResponseData: (data: string) => void;
}

export default function UploadForm({ setResponseData }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file && !file2) return;

    const formData = new FormData();
    if (file) formData.append("pdf", file);
    if (file2) formData.append("pdf2", file2);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const getResponse = await axios.get("http://127.0.0.1:8000/myagent");
      setResponseData(getResponse.data || "No data received.");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile2(e.target.files?.[0] || null)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
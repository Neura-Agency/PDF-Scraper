"use client";
import { useState } from "react";
import axios from "axios";


export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [responseText, setResponseText] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files) {
              setFile2(e.target.files[0]);
            }
          }}
        />
        <button
          type="submit"
          className="rounded-full"
          style={{
            backgroundImage: 'url("/path/to/upload.png")', 
            backgroundSize: 'cover',
            width: '100px',
            height: '40px', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Upload
        </button>
      </form>
    </>
  );
}
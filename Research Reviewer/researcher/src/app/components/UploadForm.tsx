"use client";
import { useState } from "react";
import axios from "axios";
import Chatbox from './chat/chatbox';
import Upload from "./chat/upload";

export default function UploadForm() {
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
        <Chatbox />  
        <Upload />
      </>
  );
} 
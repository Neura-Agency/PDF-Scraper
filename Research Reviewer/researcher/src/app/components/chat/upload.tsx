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
      <form onSubmit={handleSubmit} className="flex w-full">
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
        <div className="p-[1px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="rounded-full flex items-center bg-[#000a38] w-10 h-10">
              <button
                type="submit"
                className="bg-[url('/images/upload.png')] bg-contain bg-no-repeat w-6 h-6 m-auto cursor-pointer"
              >
              </button>
            </div>
        </div>
      </form>
    </>
  );
}
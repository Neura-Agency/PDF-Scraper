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
      <div className="flex w-full p-2 bg-[#000B16]/70 border-1 border-[#27d2f070] rounded-4xl bg-opacity-48">
        <input
         type="text" 
         value={responseText}
         className="focus:outline-none bg-none text-white p-2 rounded-lg w-full"
         placeholder="Response will be shown here..."
        />

        <form onSubmit={handleSubmit} className="flex w-full">
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <img
              src="/images/add.png"
              alt="Upload"
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files) {
                  setFile2(e.target.files[0]);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <img
              src="/images/add.png"
              alt="Upload"
              className="w-10 h-10 cursor-pointer"
            />
          </div>

          <div className="p-[1px] rounded-full bg-gradient-to-b from-[#27D1F0] from-45% to-[#FF00AA]">
            <div className="rounded-full flex items-center bg-[#000a38] w-10 h-10">
              <button
                type="submit"
                className="bg-[url('/images/upload.png')] bg-contain bg-no-repeat w-6 h-6 m-auto cursor-pointer"
              ></button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import axios from "axios";
import SubmitButton from "../chatbox/components/SubmitButton";
import TextBox from "./textbox";

interface UploadProps {
  setResponseData: (data: string) => void;
  setaiResponseData: (data: string) => void;
  setLoading: (loading: boolean) => void;
  setChatLoading: (loading: boolean) => void;
  messages: { user: string; ai: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ user: string; ai: string }[]>
  >;
}

export default function Upload({
  setResponseData,
  setLoading,
  setChatLoading,
  setaiResponseData,
  messages,
  setMessages,
}: UploadProps) {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [responseText, setResponseText] = useState<string>("");

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!file && !file2) return;

    setLoading(true);

    try {
      const formData = new FormData();
      if (file) formData.append("pdf", file);
      if (file2) formData.append("pdf2", file2);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponseText(data?.text || "No text extracted.");

      const getResponse = await axios.get("http://127.0.0.1:8000/myagent");
      setResponseData(getResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="chat flex w-full justify-around p-2 bg-[#000B16]/70 border-1 border-[#27d2f070] rounded-2xl bg-opacity-48">
          <TextBox value={question} onChange={handleChange} />
          <SubmitButton
            setResponseData={setaiResponseData}
            question={question}
            setQuestion={setQuestion}
            onAnswer={(user, aiResponse) => {
              if (!aiResponse) {
                setMessages((prev) => [...prev, { user, ai: "Processing..." }]); // Placeholder for AI response
              } else {
                setMessages((prev) => {
                  const updatedMessages = [...prev];
                  updatedMessages[updatedMessages.length - 1].ai = aiResponse;
                  return updatedMessages;
                });
              }
            }}
            setLoading={setChatLoading}
          />
        </div>

        <div className="flex items-center gap-2 p-2 bg-[#000B16]/70 border-1 border-[#27d2f070] rounded-2xl bg-opacity-48">
          <form className="flex gap-2">
            <div className="relative w-10 h-10 flex items-center">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <img
                src="/images/add.png"
                alt="Upload"
                className="w-9 h-9 cursor-pointer"
              />
            </div>
            <div className="relative w-10 h-10 flex items-center">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile2(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <img
                src="/images/add.png"
                alt="Upload"
                className="w-9 h-9 cursor-pointer"
              />
            </div>
          </form>
          <div className="p-[1px] rounded-full bg-gradient-to-b from-[#27D1F0] from-45% to-[#FF00AA]">
            <div className="rounded-full flex items-center bg-[#000a38] w-10 h-10">
              <button
                onClick={() => handleSubmit()}
                className="bg-[url('/images/upload.png')] bg-contain bg-no-repeat w-6 h-6 m-auto cursor-pointer"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import axios from "axios";
import Chatbox from "./chatbox/chatbox";
import Upload from "./textbar/upload";

interface UploadFormProps {
  setResponseData: (data: string) => void;
  setLoading: (loading: boolean) => void;
}

export default function UploadForm({
  setResponseData,
  setLoading,
}: UploadFormProps) {
  const [chatmessages, setMessages] = useState<{ user: string; ai: string }[]>(
    []
  );
  const [chatloading, setChatloading] = useState<boolean>(false);
  const [setaichat, setaiResponseData] = useState<string>("");


  return (
    <>
      <div className="flex flex-col h-screen w-full gap-4 p-12">
        <Chatbox messages={chatmessages} loading={chatloading} aitext={setaichat} />
        <Upload
          setResponseData={setResponseData}
          setaiResponseData={setaiResponseData}
          setLoading={setLoading} 
          setChatLoading={setChatloading}
          messages={chatmessages}
          setMessages={setMessages}
        />
      </div>
    </>
  );
}

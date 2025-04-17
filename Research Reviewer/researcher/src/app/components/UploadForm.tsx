"use client";
import { useState } from "react";
import axios from "axios";
import Chatbox from './chat/chatbox/chatbox';
import Upload from "./chat/upload";

interface UploadFormProps {
  setResponseData: (data: string) => void;
  setLoading: (loading: boolean) => void;
}

export default function UploadForm({ setResponseData, setLoading }: UploadFormProps) {
  const [messages, setMessages] = useState<{ user: string; ai: string }[]>([]);


  return (
    <>
      <div className="flex flex-col h-screen w-full gap-4 p-12">
      <Chatbox messages={messages} />
      <Upload
        setResponseData={setResponseData}
        setLoading={setLoading}
        messages={messages}
        setMessages={setMessages}
      />
      </div>
    </>
  );
}
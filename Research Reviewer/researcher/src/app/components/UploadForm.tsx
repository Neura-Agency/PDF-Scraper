"use client";
import { useState } from "react";
import axios from "axios";
import Chatbox from './chat/chatbox';
import Upload from "./chat/upload";

interface UploadFormProps {
  setResponseData: (data: string) => void;
}

export default function UploadForm({ setResponseData }: UploadFormProps) {
  return (
    <>
      <div className="flex flex-col h-screen w-full gap-4 p-12">
        <Chatbox />
        <Upload setResponseData={setResponseData} />
      </div>
    </>
  );
}
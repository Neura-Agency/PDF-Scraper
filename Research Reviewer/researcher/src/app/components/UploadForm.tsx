"use client";
import { useState } from "react";
import axios from "axios";
import Chatbox from './chat/chatbox';
import Upload from "./chat/upload";

export default function UploadForm() {
  return (
      <>
        <div className="flex flex-col h-screen w-full gap-4 p-12 ">
        <Chatbox />  
        <Upload />
        </div>
      </>
  );
} 
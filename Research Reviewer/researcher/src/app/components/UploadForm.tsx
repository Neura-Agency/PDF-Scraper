"use client";
import { useState } from "react";
import axios from "axios";
import Chatbox from './chat/chatbox';
import Upload from "./chat/upload";

export default function UploadForm() {
  return (
      <>
        <div className="flex flex-col h-screen w-full p-12 ">
        <Chatbox />  
        <Upload />
        </div>
      </>
  );
} 
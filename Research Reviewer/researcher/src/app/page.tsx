"use client";

import { useState } from "react";
import UploadForm from "./components/UploadForm";
import Preview from "./components/preview/Preview";
import "./globals.css";

export default function HomePage() {
  const [responseData, setResponseData] = useState<string>("");

  return (
    <main className="flex items-center justify-around h-screen w-screen bg-radial from-[#001F53] to-[#000026] backdrop-blur-3xl">
      <UploadForm setResponseData={setResponseData} />
      <Preview responseData={responseData} />
    </main>
  );
}

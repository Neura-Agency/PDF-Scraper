"use client";

import { useState } from "react";
import UploadForm from "./components/UploadForm";
import Preview from "./components/preview/preview/Preview";
import "./globals.css";

export default function HomePage() {
  const [responseData, setResponseData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <main className="flex items-center justify-around h-screen w-screen bg-radial from-[#001F53] to-[#000026] backdrop-blur-3xl">
      <UploadForm setResponseData={setResponseData} setLoading={setLoading} />
      <span className="min-h-[90%] w-1 bg-gradient-to-t from-[#27D1F0] from-30% to-[#FF00AA]"></span>
      <Preview responseData={responseData} loading={loading} />
    </main>
  );
}

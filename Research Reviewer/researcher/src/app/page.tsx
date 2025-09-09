"use client";

import { useState } from "react";
import UploadForm from "./components/chat/UploadForm";
import Preview from "./components/preview/preview/Preview";
import "./globals.css";

export default function HomePage() {
  const [responseData, setResponseData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Mobile nav
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<"upload" | "preview">("upload");

  return (
    <main className="flex max-md:flex-col items-center justify-around h-screen overflow-hidden w-screen bg-radial from-[#001F53] to-[#000026] backdrop-blur-3xl relative">
      {/* ---------- MOBILE HAMBURGER ---------- */}
      {!menuOpen && (
        <div className="absolute top-4 left-4 md:hidden z-50">
          <button
            className="px-2 rounded-md bg-[#0a1a3a] text-white"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      )}

      {/* ---------- DESKTOP LAYOUT ---------- */}
      <div className="hidden md:flex items-center justify-around w-full h-full">
        <UploadForm setResponseData={setResponseData} setLoading={setLoading} />
        <span className="min-h-[90%] w-1 bg-gradient-to-t from-[#27D1F0] from-30% to-[#FF00AA]"></span>
        <Preview responseData={responseData} loading={loading} />
      </div>

      {/* ---------- MOBILE CONTENT ---------- */}
      <div className="md:hidden flex-1 w-full overflow-hidden mt-8">
        {activeView === "upload" && (
          <UploadForm
            setResponseData={setResponseData}
            setLoading={setLoading}
          />
        )}
        {activeView === "preview" && (
          <Preview responseData={responseData} loading={loading} />
        )}
      </div>

      {/* ---------- MOBILE DRAWER MENU ---------- */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex">
          <div className="w-3/4 max-w-xs h-full bg-[#0a1a3a] text-white p-6 shadow-lg rounded-r-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <button
                className={`text-left px-3 py-2 rounded-md ${
                  activeView === "upload"
                    ? "bg-gradient-to-r from-[#27D1F0] to-[#FF00AA] text-black font-semibold"
                    : "hover:bg-white/10"
                }`}
                onClick={() => {
                  setActiveView("upload");
                  setMenuOpen(false);
                }}
              >
                Upload
              </button>
              <button
                className={`text-left px-3 py-2 rounded-md ${
                  activeView === "preview"
                    ? "bg-gradient-to-r from-[#27D1F0] to-[#FF00AA] text-black font-semibold"
                    : "hover:bg-white/10"
                }`}
                onClick={() => {
                  setActiveView("preview");
                  setMenuOpen(false);
                }}
              >
                Preview
              </button>
            </nav>
          </div>

          {/* Click outside closes menu */}
          <div className="flex-1" onClick={() => setMenuOpen(false)}></div>
        </div>
      )}
    </main>
  );
}

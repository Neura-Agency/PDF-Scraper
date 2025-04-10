// app/page.tsx
import Preview from "./components/preview/Preview";
import UploadForm from "./components/UploadForm";
import "./globals.css";

export default function HomePage() {
  return (
    <main className="flex items-center justify-around gap-12 h-screen w-screen bg-radial from-[#001F53] to-[#000026] backdrop-blur-3xl">
      <UploadForm />
      <Preview />
    </main>
  );
}

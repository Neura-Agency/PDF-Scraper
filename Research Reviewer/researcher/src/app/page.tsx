// app/page.tsx
import Preview from "./components/preview/Preview";
import UploadForm from "./components/UploadForm";
import "./globals.css"

export default function HomePage() {
  return (
    <main className="flex items-center justify-around h-screen">
      <UploadForm />
      <Preview/>
    </main>
  );
}
  
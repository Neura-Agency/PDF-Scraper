// app/page.tsx
import UploadForm from "./components/UploadForm";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload PDF</h1>
      <UploadForm />
    </main>
  );
}
  
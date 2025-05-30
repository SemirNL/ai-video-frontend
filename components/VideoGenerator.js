'use client';
import { useState } from 'react';

export default function VideoGenerator() {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setVideoUrl(null);
    try {
      const res = await fetch("https://ai-video-tool.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ script })
      });
      if (!res.ok) throw new Error("Er is iets misgegaan.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    } catch (err) {
      alert("Fout bij genereren van video. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 mt-12">
      <h1 className="text-4xl font-extrabold mb-2 text-center text-indigo-600">🎬 AI Video Generator</h1>
      <p className="text-center text-gray-600 mb-6">Plak je script hieronder en ontvang een gegenereerde video met voice-over, beelden en muziek.</p>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        rows={8}
        placeholder="Bijvoorbeeld: The ocean is mysterious. Sharks live deep underwater..."
        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleGenerate}
        disabled={loading || !script}
        className="mt-4 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300"
      >
        {loading ? "Genereren..." : "🎞️ Genereer video"}
      </button>

      {videoUrl && (
        <div className="mt-8 text-center space-y-4">
          <video controls src={videoUrl} className="w-full rounded-xl shadow-lg" />
          <a href={videoUrl} download="ai-video.mp4">
            <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition">
              ⬇️ Download video
            </button>
          </a>
        </div>
      )}
    </main>
  );
}

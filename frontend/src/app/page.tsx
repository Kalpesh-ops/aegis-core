'use client';
import { useRef, useState } from 'react';

export default function AegisDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = e.target.files?.[0] ?? null;
    setSelectedFile(nextFile);
  };

  const resetSelectedFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const executeLiveScan = async () => {
    if (!selectedFile) return;
    
    setIsScanning(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Pinging the real Python backend with the video payload
      const res = await fetch('http://localhost:8000/api/scan', { 
        method: 'POST',
        body: formData,
        // Note: Do not manually set Content-Type to 'multipart/form-data'. 
        // The browser automatically sets it with the correct boundary.
      });
      
      if (!res.ok) throw new Error("Backend pipeline failed.");
      
      const data = await res.json();
      setLogs(prev => [data, ...prev]);
      resetSelectedFile();
      
    } catch (error) {
      console.error("Transmission error:", error);
      // Optional: Add a UI toast notification here for errors
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 font-mono">
      <header className="flex justify-between items-center border-b border-gray-800 pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-500">PROJECT AEGIS</h1>
          <p className="text-sm text-gray-400">Vertex AI Media Authentication Node</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-green-500">GCP Pipeline Active</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column: Asset Registry */}
        <div className="col-span-1 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Protected Assets</h2>
          <div className="space-y-3">
            {['NBA_Finals_Clip_04.mp4', 'UFC_299_MainEvent.mp4', 'F1_Monaco_Lap1.mp4'].map((asset, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-800 p-3 rounded text-sm border-l-4 border-blue-500">
                <span>{asset}</span>
                <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">Vectorized</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Threat Radar & Ingestion */}
        <div className="col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col">
          
          {/* File Ingestion Zone */}
          <div className="mb-6 p-4 border border-dashed border-gray-600 rounded-lg bg-gray-950 flex justify-between items-center">
            <input 
              ref={fileInputRef}
              type="file" 
              accept="video/mp4,video/x-m4v,video/*"
              onChange={handleFileChange}
              className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-300 hover:file:bg-blue-800 cursor-pointer"
            />
            <button 
              onClick={executeLiveScan}
              disabled={!selectedFile || isScanning}
              className={`px-6 py-2 rounded font-bold transition-colors ${!selectedFile || isScanning ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white'}`}
            >
              {isScanning ? 'Processing Video...' : 'Initialize Scan'}
            </button>
          </div>

          <div className="mb-4 text-sm text-gray-400">
            {selectedFile ? (
              <span>Selected file: <span className="text-gray-200">{selectedFile.name}</span></span>
            ) : (
              <span>No file selected</span>
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-300 mb-4">Live Threat Radar</h2>
          <div className="overflow-hidden border border-gray-800 rounded-lg flex-grow">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800 text-gray-400">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Anomaly Type</th>
                  <th className="p-3">Matched Asset</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr><td colSpan={4} className="p-6 text-center text-gray-500">Awaiting stream ingestion...</td></tr>
                ) : (
                  logs.map((log, i) => (
                    <tr key={i} className="border-t border-gray-800 bg-red-950/20 text-red-400">
                      <td className="p-3">{log.timestamp}</td>
                      <td className="p-3 font-bold">{log.confidence_score}%</td>
                      <td className="p-3">{log.anomaly_type}</td>
                      <td className="p-3">{log.matched_asset}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
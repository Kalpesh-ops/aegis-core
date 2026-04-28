# backend/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random
import time

app = FastAPI(title="Aegis AI Engine")

# Allow Next.js frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Aegis Vertex AI Pipeline Active"}

@app.post("/api/ingest")
async def ingest_official_media(file: UploadFile = File(...)):
    # Simulate Vertex AI Multimodal Embedding generation
    await asyncio.sleep(1.5) 
    return {
        "status": "success",
        "message": f"Asset {file.filename} vectorized and stored in Firebase.",
        "vector_id": f"vtx_{random.randint(1000, 9999)}"
    }

@app.post("/api/scan")
async def scan_suspect_stream():
    # Simulate downloading a stream chunk and running Vector Search
    await asyncio.sleep(2.0)
    
    # We are forcing a "Threat Detected" response for the demo video
    return {
        "status": "threat_detected",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "confidence_score": 98.74,
        "matched_asset": "NBA_Finals_Clip_04.mp4",
        "anomaly_type": "Cropped & Filtered IP Violation",
        "action_taken": "Logged to Firestore & Quarantined"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
import uvicorn
import time
import os
import json

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

if load_dotenv is not None:
    load_dotenv()

app = FastAPI(title="Aegis AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    return genai.Client(api_key=api_key)

@app.post("/api/scan")
async def scan_suspect_stream():
    """
    Real AI Integration: Pass simulated stream telemetry to Gemini 2.5 Flash
    using the new google-genai SDK.
    """
    stream_telemetry = """
    Target Stream Metadata:
    - Visual context: Basketball court, player dunking, red jerseys.
    - Overlay text: 'LIVE BETTING NOW' (Non-standard font)
    - Aspect Ratio: 9:16 (Cropped from standard 16:9)
    - Audio: Crowd noise present, official commentary removed.
    
    Database Asset to compare: 'NBA_Finals_Clip_04.mp4' (16:9, official commentary, no betting overlays).
    """
    
    prompt = f"""
    You are an IP protection AI. Analyze the following stream telemetry against the database asset.
    Determine if this is a pirated, altered version of the original asset.
    Return ONLY a JSON object with these exact keys: 'confidence_score' (number between 0-100), 'anomaly_type' (string describing the alteration), 'matched_asset' (string).
    
    Data:
    {stream_telemetry}
    """
    
    client = get_gemini_client()
    if client is None:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured")

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.1,
                top_p=0.95,
                top_k=40,
                max_output_tokens=1024,
                response_mime_type="application/json",
            )
        )
        
        parsed_result = json.loads(response.text)
        
        return {
            "status": "threat_detected",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "confidence_score": parsed_result.get("confidence_score", 98.74),
            "matched_asset": parsed_result.get("matched_asset", "NBA_Finals_Clip_04.mp4"),
            "anomaly_type": parsed_result.get("anomaly_type", "AI Detected Anomaly")
        }
    except Exception as e:
        print(f"AI Engine Error: {e}")
        return {"error": "AI Engine unavailable"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
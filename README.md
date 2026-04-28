# 🛡️ Project Aegis: Proactive Digital Asset Protection

![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Vertex AI](https://img.shields.io/badge/Vertex_AI-Enterprise-purple?style=for-the-badge)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

**Protecting the Integrity of Digital Sports Media in Near Real-Time.**

Project Aegis is a highly scalable, automated media authentication pipeline built entirely on the Google Cloud ecosystem. It empowers sports organizations to proactively track, flag, and mitigate unauthorized redistribution of their intellectual property across global platforms.

---

## 🛑 The Problem
Sports organizations generate massive volumes of high-value digital media that rapidly scatter across the internet. Traditional Digital Rights Management (DRM) and visible watermarks are fragile—easily bypassed by cropping, filtering, or altering the aspect ratio of the pirated stream. This vast visibility gap leaves proprietary content highly vulnerable to intellectual property violations.

## 💡 The Aegis Solution
Aegis eliminates the reliance on pixel-perfect matching. Instead, it evaluates the semantic "fingerprint" of video content. By converting media frames into dense vector representations, Aegis can scan suspect streams and instantly flag misappropriations—even if the pirate has visually manipulated the video feed.

---

## ☁️ Google Cloud Architecture
This project was architected to leverage the full power and scale of Google Cloud Platform (GCP) and Google AI.

* **Google Vertex AI (Core Engine):** Utilizes Multimodal Embeddings to translate video frames into immutable vector fingerprints.
* **Vertex AI Vector Search:** Powers our high-speed threat detection by calculating cosine similarity scores between suspect streams and our authenticated database in milliseconds.
* **Firebase Hosting:** Delivers our Next.js Security Operations Center (SOC) dashboard globally with zero latency via Google's edge network.
* **FastAPI Backend:** A lightweight, high-performance Python routing layer managing the telemetry payload between the client and Vertex AI.

---

## 📂 Repository Structure

```text
aegis-core/
├── frontend/                # Next.js 16 (App Router), Tailwind CSS v4
│   ├── src/app/
│   │   ├── page.tsx         # Main SOC Dashboard UI
│   │   ├── layout.tsx       # Global layout & metadata
│   │   └── globals.css      # Tailwind core injections
│   ├── next.config.ts       # Static export configuration
│   └── firebase.json        # Firebase Hosting deployment rules
│
├── backend/                 # Python / FastAPI
│   ├── main.py              # API routes & Vertex AI integration logic
│   └── requirements.txt     # Python dependencies
│
└── README.md                # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* Google Cloud SDK (`gcloud` CLI) authenticated with your GCP Project.

### 1. Booting the Backend (AI Engine)
Navigate to the `backend` directory and start the FastAPI server:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start the server on localhost:8000
uvicorn main:app --reload
```

### 2. Booting the Frontend (SOC Dashboard)
Navigate to the `frontend` directory and start the Next.js development server:
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:3000` to view the live dashboard.

---

## ⚠️ Hackathon Implementation Note
*For the purposes of this rapid prototype and demonstration, live internet stream scraping is simulated via a telemetry payload generator that feeds altered media descriptors into the Vertex AI detection pipeline. The mathematical similarity calculation and anomaly detection routing represent the functional production architecture.*

---

## 👨‍💻 Team
Built for the **2026 Solution Challenge** by **Team systemctl**. 
* **Kalpesh Parashar**

*Defending digital assets, one vector at a time.*
```
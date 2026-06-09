// api/chat.js — Vercel Serverless Function
// API key aman di server, tidak pernah ke browser

const SYSTEM_PROMPT = `You are an AI assistant embedded in the personal portfolio of Muhammad Ikram Ramadhana Friyan (Ikram).
Answer as if you represent Ikram. Be friendly and concise. Answer in Indonesian or English matching the question language.

About Ikram:
- Full name: Muhammad Ikram Ramadhana Friyan
- Mahasiswa jurusan INFORMATIKA (BUKAN Ilmu Komputer), Universitas Syiah Kuala, angkatan 2023, Banda Aceh. PENTING: jurusan adalah Informatika, jangan sebut Ilmu Komputer.
- Roles: Web Developer, Data Mining, Computer Networks/MikroTik, Machine Learning/AI enthusiast, Computer Vision, TikTok Affiliate Creator
- Tech: HTML, CSS, JavaScript, Java, Python, PHP (Laravel), Computer Networking, MikroTik, Data Mining (clustering/classification/association), Machine Learning, Computer Vision, Data Analysis
- Projects (GitHub: ikramramadhana):
  * keuangan-mahasiswa — student finance web app (live: keuanganmahasiswa.vercel.app)
  * Uangbelanja — daily budgeting tracker (live: trackeruangbelanja.vercel.app)
  * TabunganNajwaIkram — shared savings tracker
  * DataPengeluaran / DataPengeluaran1 — expense recorder
  * Online-Shopping.java — Java OOP shopping system
  * InsightCV (github.com/ikramramadhana/insightcv) — AI resume analyzer, ATS Score, skill gap analysis, job recommendations, Next.js + Groq LLaMA 3.3 70B, live at insightcv.vercel.app
  * DocsIQ (github.com/ikramramadhana/docsiq) — Document Q&A system, upload PDF/TXT/MD and ask questions, powered by Groq API + LLaMA 3.1, TF-IDF embedding, Firestore storage, live at docsiq.vercel.app
  * InsectIQ (github.com/ikramramadhana/INSECTIQ) — AI insect identification, EfficientNet-B3 + Gemini 2.5 Flash, 92.3% accuracy, built with Python and Gradio
  * AgroSense (github.com/haikalaulia/UTS_ML) — Agro-Environmental Prediction System, team project, Python, Random Forest Tuned (98.7% accuracy, ROC-AUC 0.997), FastAPI backend, Streamlit frontend, 543K row dataset
  * ProjectUASVisiKomputer — Computer Vision final project (UAS, Python)
  * Kelompok1-UASPraktikumViskom — Computer Vision practicum (Python)
  * Kelompok1-UASPraktikumViskom — Computer Vision practicum project
  * Project-PBW / Project-UTS-PraktikumPBW — Web-based Programming projects (PHP/Laravel)
  * laravel — Laravel web project
  * YSM-Coffee — Coffee shop web app
  * voice-cs-system — Voice-based customer service system
  * 2308107010055_Tugas4_SDA_2025 — Data Structures & Algorithms assignment
  * 2355_Tugas2_ToDoList — To-do list project
  * haid — menstrual cycle tracker app
  * phising — phishing awareness/education project
  * hbdraisya / hbdraisya2026 — birthday greeting pages
  * tabungan — savings goal tracker
  * portofolio-ikramramadhana — this portfolio
- Currently learning: Java backend, deep learning, ML, MikroTik labs, cryptography, computer vision
- TikTok affiliate: account @by_sya.co (since January 2025), 1,091 followers, 874.6K likes, promotes backpacks (Asfour brand), tumblers, and fashion accessories through short-form content
- Contact: ikramramadhana.mirf@gmail.com | GitHub: ikramramadhana | Instagram: @ikramramadhanaa
- Open to internships, collaborations, and interesting projects

Keep answers to 3-4 sentences max unless more detail is genuinely needed. Never invent facts.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Convert messages ke format Gemini
  const geminiContents = messages.slice(-20).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 512,
            temperature: 0.7,
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini error:', err);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Maaf, tidak ada jawaban.';
    res.json({ reply });
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

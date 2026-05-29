# Portfolio Ikram Ramadhana v2

Portfolio personal dengan AI chat (Gemini — **gratis**), skill network map, dan semua 21 repo GitHub.

## Struktur

```
portfolio/
├── api/
│   └── chat.js        ← Vercel serverless function (proxy Gemini)
├── public/
│   ├── index.html     ← Frontend utama
│   ├── ikram.jpg
│   ├── keuangan-dashboard.png
│   ├── uangbelanja.png
│   └── affiliate.jpeg
├── vercel.json        ← Routing config
├── package.json
├── .env.example
└── .gitignore
```

## Cara deploy ke Vercel (gratis + custom domain)

### 1. Dapatkan Gemini API Key (GRATIS)
- Buka https://aistudio.google.com/app/apikey
- Login dengan akun Google → klik **Create API Key**
- Copy key-nya (format: `AIzaSy_xxx...`)

### 2. Push ke GitHub
```bash
git init
git add .
git commit -m "init portfolio"
git remote add origin https://github.com/ikramramadhana/portofolio-ikramramadhana.git
git push -u origin main
```

### 3. Deploy di Vercel
1. Buka https://vercel.com → Login dengan GitHub
2. Klik **Add New Project** → pilih repo portfolio
3. Klik **Deploy** (biarkan settings default)
4. Setelah deploy, buka tab **Settings → Environment Variables**
5. Tambah variable:
   - Name: `GEMINI_API_KEY`
   - Value: `AIzaSy_xxxxxxxxxxxxx` (key dari step 1)
6. Klik **Save** → pergi ke tab **Deployments** → klik **Redeploy**

Selesai! Website live dengan AI chat Gemini yang gratis.

## Coba lokal (opsional)

Butuh Node.js 18+:

```bash
npm install -g vercel
cp .env.example .env.local
# Edit .env.local, isi GEMINI_API_KEY
vercel dev
# Buka http://localhost:3000
```

## Model Gemini yang dipakai

`gemini-2.0-flash` — model paling cepat dan gratis di Google AI Studio.
- Free tier: 15 requests/menit, 1500 requests/hari
- Lebih dari cukup untuk portfolio personal

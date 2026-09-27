# 🧠 AI Meeting Summarizer

An AI-powered tool that transforms messy meeting notes into structured insights — summaries, action items, key decisions, and sentiment analysis.

## 🔗 Live Demo
**[Try it live →](https://ai-meeting-summarizer.vercel.app)**

## ✨ Features
- 📋 **Smart Summary** — 3-4 sentence overview of the meeting
- ✅ **Action Items** — Extracted with owners when mentioned
- 💡 **Key Decisions** — All important decisions highlighted
- 🎯 **Sentiment Analysis** — Overall tone of the meeting
- ⚠️ **Risks & Concerns** — Flagged for follow-up
- 🌍 **Multi-language** — Works with Arabic and English notes

## 🛠️ Tech Stack
- **Framework:** Next.js 14
- **AI:** Google Gemini 1.5 Flash API
- **Styling:** Custom CSS
- **Deployment:** Vercel

## 🎯 How It Works
1. Paste your meeting notes, transcript, or summary
2. Click "Analyze Meeting"
3. Gemini AI extracts structured insights
4. Get a clean, actionable report

## 🚀 How to Run Locally
```bash
# Clone the repo
git clone https://github.com/yasin-aldasuqi/ai-meeting-summarizer.git
cd ai-meeting-summarizer

# Install dependencies
npm install

# Add your Gemini API key
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_key_here" > .env.local

# Run dev server
npm run dev

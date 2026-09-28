'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!input.trim()) {
      setError('Please paste your meeting notes first.');
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setError('API key is not configured. Please contact the site owner.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `You are an expert meeting analyst. Analyze the following meeting notes and provide a structured summary.

Return your response in this exact format:

## 📋 Summary
[3-4 sentence summary of the meeting]

## ✅ Action Items
- [action item 1 with owner if mentioned]
- [action item 2 with owner if mentioned]
- [action item 3 with owner if mentioned]

## 💡 Key Decisions
- [key decision 1]
- [key decision 2]

## 🎯 Sentiment
[Overall tone: Positive / Neutral / Negative - with brief explanation]

## ⚠️ Risks & Concerns
- [any risks or concerns mentioned]

Meeting Notes:
${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (err) {
      setError('Error analyzing meeting: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const loadExample = () => {
    setInput(`Meeting: Q4 Product Roadmap Planning
Date: October 15, 2026
Attendees: Sarah (PM), Ahmed (Engineering Lead), Fatima (Design), Omar (Marketing)

Sarah opened by reviewing Q3 results. Product usage grew 23% but churn increased slightly. Ahmed mentioned the backend team is at capacity and we need two more developers to hit Q4 goals. Fatima presented the new design system - everyone loved it. Omar flagged that the marketing budget was cut by 15%, so we need to be careful with launch campaigns.

Key concerns: hiring delays could push the AI feature launch to Q1. Sarah will talk to HR about expediting the hiring process. Fatima will finish the design system documentation by end of week. Ahmed needs to prioritize the authentication refactor over the analytics dashboard.

Overall the team is optimistic but stressed about resources. Next meeting: October 22.`);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🧠 AI Meeting Summarizer</h1>
          <p className="subtitle">
            Extract insights, action items, and sentiment from your meeting notes
          </p>
        </header>

        <div className="input-section">
          <div className="input-header">
            <label htmlFor="meeting-input">Paste your meeting notes:</label>
            <button className="btn-link" onClick={loadExample}>
              Load Example
            </button>
          </div>
          <textarea
            id="meeting-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your meeting transcript, notes, or summary here..."
            rows={10}
          />
        </div>

        <div className="actions">
          <button
            className="btn-primary"
            onClick={analyze}
            disabled={loading || !input.trim()}
          >
            {loading ? '🔄 Analyzing...' : '✨ Analyze Meeting'}
          </button>
          <button className="btn-secondary" onClick={clearAll} disabled={loading}>
            Clear
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result">
            <h2>📊 Analysis Result</h2>
            <div className="result-content">
              {result.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return <h3 key={i}>{line.replace('## ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i}>{line.replace('- ', '')}</li>;
                }
                if (line.trim()) {
                  return <p key={i}>{line}</p>;
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

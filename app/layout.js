import './globals.css';

export const metadata = {
  title: 'AI Meeting Summarizer',
  description: 'Extract insights, action items, and sentiment from meeting notes using Google Gemini AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

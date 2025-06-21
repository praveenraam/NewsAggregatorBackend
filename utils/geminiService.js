const axios = require("axios");

// POST to AI for summarizing and sentiment analysis
exports.summarizeAndAnalyze = async (content) => {
  const prompt = `
Please summarize the following news content in 3–5 bullet points.
Also, analyze the sentiment (Positive, Neutral, or Negative).

News Content:
${content}

Respond in this exact JSON format:
{
  "summary": ["point 1", "point 2", ...],
  "sentiment": "Positive"
}
`;

  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, body);
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Try parsing the JSON from Gemini's response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Gemini HTTP error:", error.response?.data || error.message);
    throw new Error("Failed to fetch summary from Gemini");
  }
};

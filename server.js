import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Chatbot endpoint
app.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful FAQ assistant for the website imdadullahbootstrap.vercel.app. Only answer questions about Imdadullah, his services, technologies, or portfolio."
          },
          { role: "user", content: userMessage }
        ],
        temperature: 0.3
      })
    });

    const data = await apiResponse.json();
    res.json({ answer: data.choices?.[0]?.message?.content || "Sorry, I couldn’t find an answer." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Static files setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Health check for Render
app.get("/healthz", (req, res) => res.sendStatus(204));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

require("dotenv").config(); // Wajib ada di baris pertama!
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint utama (bisa untuk homepage atau API kamu)
app.get("/", (req, res) => {
  res.send("NaufalAI server berjalan.");
});

// Endpoint status - mengecek koneksi ke OpenRouter
app.get("/status", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      res.status(200).json({ status: "online" });
    } else {
      res.status(response.status).json({ status: "offline" });
    }
  } catch (error) {
    res.status(500).json({ status: "offline", error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
const Idea = require("../models/Idea");
const axios = require("axios");

exports.createIdea = async (req, res) => {
  try {
    const { title, description } = req.body;

    const prompt = `
You are a startup analyst.

Return ONLY JSON:
{
  "problem": "...",
  "customer": "...",
  "market": "...",
  "competitors": ["...", "...", "..."],
  "tech_stack": ["...", "..."],
  "risk_level": "Low/Medium/High",
  "profitability_score": 0-100,
  "justification": "..."
}

Idea:
Title: ${title}
Description: ${description}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );

    //  Extract text from Gemini response
    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        error: "Invalid JSON from Gemini",
        raw: text,
      });
    }

    const analysis = JSON.parse(jsonMatch[0]);

    const idea = new Idea({ title, description, analysis });
    await idea.save();

    res.status(201).json(idea);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// ALL IDEAS
exports.getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

//  SINGLE IDEA
exports.getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ error: "Idea not found" });
    }

    res.json(idea);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);

    if (!idea) {
      return res.status(404).json({ error: "Idea not found" });
    }

    res.json({ message: "Idea deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
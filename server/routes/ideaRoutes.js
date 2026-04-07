const express = require("express");
const router = express.Router();
const {
  createIdea,
  getIdeas,
  getIdeaById,
  deleteIdea
} = require("../controllers/ideaController");

router.post("/", createIdea);
router.get("/", getIdeas);
router.get("/:id", getIdeaById);
router.delete("/:id", deleteIdea);

module.exports = router;

// 69d49c14033b8fd3518c62bc
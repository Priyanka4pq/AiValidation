const express = require("express");
const router = express.Router();
const {
  createIdea,
  getIdeas,
  getIdeaById
} = require("../controllers/ideaController");

router.post("/", createIdea);
router.get("/", getIdeas);
router.get("/:id", getIdeaById);

module.exports = router;
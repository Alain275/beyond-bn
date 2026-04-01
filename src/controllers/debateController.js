const { Debate } = require("../models");

async function createDebate(req, res) {
  try {
    const { motion, category, status, date, rounds, points, maxTeamSize, judges } = req.body;
    
    if (!motion || !category || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const debate = await Debate.create({
      motion,
      category,
      status: status || "Upcoming",
      date,
      rounds: rounds || 4,
      points: points || 300,
      maxTeamSize: maxTeamSize || 3,
      judges: judges || "",
    });

    res.status(201).json(debate);
  } catch (error) {
    console.error("Error creating debate:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getAllDebates(req, res) {
  try {
    const debates = await Debate.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(debates);
  } catch (error) {
    console.error("Error fetching debates:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function patchDebate(req, res) {
  try {
    const { id } = req.params;
    const { motion, category, status, date, rounds, points, maxTeamSize, judges } = req.body;

    const debate = await Debate.findByPk(id);
    if (!debate) {
      return res.status(404).json({ message: "Debate not found" });
    }

    if (motion !== undefined) debate.motion = motion;
    if (category !== undefined) debate.category = category;
    if (status !== undefined) debate.status = status;
    if (date !== undefined) debate.date = date;
    if (rounds !== undefined) debate.rounds = rounds;
    if (points !== undefined) debate.points = points;
    if (maxTeamSize !== undefined) debate.maxTeamSize = maxTeamSize;
    if (judges !== undefined) debate.judges = judges;

    await debate.save();
    res.status(200).json(debate);
  } catch (error) {
    console.error("Error updating debate:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function deleteDebate(req, res) {
  try {
    const { id } = req.params;
    const debate = await Debate.findByPk(id);
    
    if (!debate) {
      return res.status(404).json({ message: "Debate not found" });
    }

    await debate.destroy();
    res.status(200).json({ message: "Debate deleted successfully" });
  } catch (error) {
    console.error("Error deleting debate:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createDebate,
  getAllDebates,
  patchDebate,
  deleteDebate,
};

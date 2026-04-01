const { Activity } = require("../models");

async function createActivity(req, res) {
  try {
    const { title, description, image, status } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const activity = await Activity.create({
      title,
      description,
      image: image || "",
      status: status || "active",
      participants: 0,
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getAllActivities(req, res) {
  try {
    const activities = await Activity.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function patchActivity(req, res) {
  try {
    const { id } = req.params;
    const { title, description, image, status } = req.body;

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (title !== undefined) activity.title = title;
    if (description !== undefined) activity.description = description;
    if (image !== undefined) activity.image = image;
    if (status !== undefined) activity.status = status;

    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function deleteActivity(req, res) {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.destroy();
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  patchActivity,
  deleteActivity,
};

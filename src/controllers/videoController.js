const { Video } = require("../models");

async function createVideo(req, res) {
  try {
    const { title, description, url, category, duration, status, thumbnail } = req.body;

    if (!title || !description || !url || !category || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const video = await Video.create({
      title,
      description,
      url,
      category,
      duration,
      status: status || "draft",
      thumbnail: thumbnail || "",
    });

    res.status(201).json(video);
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getAllVideos(req, res) {
  try {
    const videos = await Video.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function patchVideo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, url, category, duration, status, thumbnail } = req.body;

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (title !== undefined) video.title = title;
    if (description !== undefined) video.description = description;
    if (url !== undefined) video.url = url;
    if (category !== undefined) video.category = category;
    if (duration !== undefined) video.duration = duration;
    if (status !== undefined) video.status = status;
    if (thumbnail !== undefined) video.thumbnail = thumbnail;

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function deleteVideo(req, res) {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.destroy();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createVideo,
  getAllVideos,
  patchVideo,
  deleteVideo,
};

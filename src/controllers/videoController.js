const { Video } = require("../models");
const { Op } = require("sequelize");

async function createVideo(req, res) {
  try {
    const { title, description, url, category, duration, status, thumbnail } = req.body;

    // Enhanced validation
    if (!title || !description || !url || !category || !duration) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["title", "description", "url", "category", "duration"]
      });
    }

    // Validate URL format
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return res.status(400).json({ message: "Invalid URL format" });
    }

    // Validate status if provided
    if (status && !["published", "draft"].includes(status)) {
      return res.status(400).json({ message: "Status must be either 'published' or 'draft'" });
    }

    const video = await Video.create({
      title: title.trim(),
      description: description.trim(),
      url: url.trim(),
      category: category.trim(),
      duration: duration.trim(),
      status: status || "draft",
      thumbnail: thumbnail ? thumbnail.trim() : "",
    });

    res.status(201).json({
      message: "Video created successfully",
      video
    });
  } catch (error) {
    console.error("Error creating video:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getAllVideos(req, res) {
  try {
    const { status, category, search } = req.query;
    const whereClause = {};

    // Filter by status
    if (status && ["published", "draft"].includes(status)) {
      whereClause.status = status;
    }

    // Filter by category
    if (category) {
      whereClause.category = category;
    }

    // Search in title and description
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const videos = await Video.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Videos retrieved successfully",
      count: videos.length,
      videos
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getVideoById(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findByPk(id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      message: "Video retrieved successfully",
      video
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function patchVideo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, url, category, duration, status, thumbnail } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Validate URL format if provided
    if (url) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(url)) {
        return res.status(400).json({ message: "Invalid URL format" });
      }
    }

    // Validate status if provided
    if (status && !["published", "draft"].includes(status)) {
      return res.status(400).json({ message: "Status must be either 'published' or 'draft'" });
    }

    // Update fields
    if (title !== undefined) video.title = title.trim();
    if (description !== undefined) video.description = description.trim();
    if (url !== undefined) video.url = url.trim();
    if (category !== undefined) video.category = category.trim();
    if (duration !== undefined) video.duration = duration.trim();
    if (status !== undefined) video.status = status;
    if (thumbnail !== undefined) video.thumbnail = thumbnail ? thumbnail.trim() : "";

    await video.save();

    res.status(200).json({
      message: "Video updated successfully",
      video
    });
  } catch (error) {
    console.error("Error updating video:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function deleteVideo(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

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
  getVideoById,
  patchVideo,
  deleteVideo,
};

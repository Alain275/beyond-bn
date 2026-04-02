const { Article } = require("../models");
const path = require("path");
const fs = require("fs");

async function createArticle(req, res) {
  try {
    const { title, category, author, status, content, image } = req.body;
    
    // Enhanced validation
    if (!title || !category || !author || !content) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["title", "category", "author", "content"]
      });
    }

    // Validate status if provided
    if (status && !["published", "draft"].includes(status)) {
      return res.status(400).json({ message: "Status must be either 'published' or 'draft'" });
    }

    const article = await Article.create({
      title: title.trim(),
      category: category.trim(),
      author: author.trim(),
      status: status || "draft",
      content: content.trim(),
      image: image ? image.trim() : "",
    });

    res.status(201).json({
      message: "Article created successfully",
      article
    });
  } catch (error) {
    console.error("Error creating article:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getAllArticles(req, res) {
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

    // Search in title, author, and content
    if (search) {
      const { Op } = require("sequelize");
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const articles = await Article.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Articles retrieved successfully",
      count: articles.length,
      articles
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getArticleById(req, res) {
  try {
    const { id } = req.params;
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ message: "Invalid article ID format" });
    }

    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "Article retrieved successfully",
      article
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function patchArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, category, author, status, content, image } = req.body;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ message: "Invalid article ID format" });
    }

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Validate status if provided
    if (status && !["published", "draft"].includes(status)) {
      return res.status(400).json({ message: "Status must be either 'published' or 'draft'" });
    }

    // Update fields
    if (title !== undefined) article.title = title.trim();
    if (category !== undefined) article.category = category.trim();
    if (author !== undefined) article.author = author.trim();
    if (status !== undefined) article.status = status;
    if (content !== undefined) article.content = content.trim();
    if (image !== undefined) article.image = image ? image.trim() : "";

    await article.save();

    res.status(200).json({
      message: "Article updated successfully",
      article
    });
  } catch (error) {
    console.error("Error updating article:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ message: "Invalid article ID format" });
    }

    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.destroy();
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      // Delete the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ 
        message: "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed" 
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      // Delete the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ 
        message: "File size too large. Maximum size is 5MB" 
      });
    }

    // Generate the URL for the uploaded image
    const imageUrl = `/uploads/articles/${req.file.filename}`;

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl,
      fileName: req.file.filename,
      fileSize: `${(req.file.size / 1024).toFixed(2)} KB`,
      mimeType: req.file.mimetype
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    // Clean up file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  patchArticle,
  deleteArticle,
  uploadImage,
};

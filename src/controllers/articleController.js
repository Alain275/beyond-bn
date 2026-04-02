const { Article } = require("../models");

async function createArticle(req, res) {
  try {
    const { title, category, author, status, content, image } = req.body;
    
    // Basic validation
    if (!title || !category || !author || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const article = await Article.create({
      title,
      category,
      author,
      status: status || "draft",
      content,
      image: image || "",
    });

    res.status(201).json(article);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getAllArticles(req, res) {
  try {
    const articles = await Article.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

function parseArticleId(rawId) {
  const id = Number.parseInt(rawId, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function uploadArticleImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const imageUrl = `/uploads/articles/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error uploading article image:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getArticleById(req, res) {
  try {
    const id = parseArticleId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Article ID must be a positive integer" });
    }

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function patchArticle(req, res) {
  try {
    const id = parseArticleId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Article ID must be a positive integer" });
    }

    const { title, category, author, status, content, image } = req.body;

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (title !== undefined) article.title = title;
    if (category !== undefined) article.category = category;
    if (author !== undefined) article.author = author;
    if (status !== undefined) article.status = status;
    if (content !== undefined) article.content = content;
    if (image !== undefined) article.image = image;

    await article.save();

    res.status(200).json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function deleteArticle(req, res) {
  try {
    const id = parseArticleId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Article ID must be a positive integer" });
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

module.exports = {
  createArticle,
  getAllArticles,
  uploadArticleImage,
  getArticleById,
  patchArticle,
  deleteArticle,
};

const { PDF } = require("../models");
const { Op } = require("sequelize");

async function createPDF(req, res) {
  try {
    const { title, description, category, fileName, fileSize, filePath, status } = req.body;

    // Enhanced validation
    if (!title || !description || !category || !fileName || !fileSize) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["title", "description", "category", "fileName", "fileSize"]
      });
    }

    // Validate status if provided
    if (status && !["published", "draft"].includes(status)) {
      return res.status(400).json({ message: "Status must be either 'published' or 'draft'" });
    }

    // Validate file extension
    if (!fileName.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const pdf = await PDF.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      fileName: fileName.trim(),
      fileSize: fileSize.trim(),
      filePath: filePath ? filePath.trim() : "",
      status: status || "draft",
    });

    res.status(201).json({
      message: "PDF created successfully",
      pdf
    });
  } catch (error) {
    console.error("Error creating PDF:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getAllPDFs(req, res) {
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

    const pdfs = await PDF.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "PDFs retrieved successfully",
      count: pdfs.length,
      pdfs
    });
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function getPDFById(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid PDF ID" });
    }

    const pdf = await PDF.findByPk(id);
    
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.status(200).json({
      message: "PDF retrieved successfully",
      pdf
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function patchPDF(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, fileName, fileSize, filePath, status } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid PDF ID" });
    }

    const pdf = await PDF.findByPk(id);
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Validate file extension if fileName is provided
    if (fileName && !fileName.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    // Validate status if provided
    if (status && !["published", "draft"].includes(status)) {
      return res.status(400).json({ message: "Status must be either 'published' or 'draft'" });
    }

    // Update fields
    if (title !== undefined) pdf.title = title.trim();
    if (description !== undefined) pdf.description = description.trim();
    if (category !== undefined) pdf.category = category.trim();
    if (fileName !== undefined) pdf.fileName = fileName.trim();
    if (fileSize !== undefined) pdf.fileSize = fileSize.trim();
    if (filePath !== undefined) pdf.filePath = filePath ? filePath.trim() : "";
    if (status !== undefined) pdf.status = status;

    await pdf.save();

    res.status(200).json({
      message: "PDF updated successfully",
      pdf
    });
  } catch (error) {
    console.error("Error updating PDF:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function deletePDF(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid PDF ID" });
    }

    const pdf = await PDF.findByPk(id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    await pdf.destroy();
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function downloadPDF(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid PDF ID" });
    }

    const pdf = await PDF.findByPk(id);
    
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // In a real implementation, you would serve the actual file
    // For now, return the file information
    res.status(200).json({
      message: "PDF download information",
      pdf: {
        id: pdf.id,
        title: pdf.title,
        fileName: pdf.fileName,
        fileSize: pdf.fileSize,
        filePath: pdf.filePath,
        downloadUrl: `/api/pdfs/${id}/download` // This would be the actual download endpoint
      }
    });
  } catch (error) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createPDF,
  getAllPDFs,
  getPDFById,
  patchPDF,
  deletePDF,
  downloadPDF,
};
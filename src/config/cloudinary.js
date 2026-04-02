const { v2: cloudinary } = require("cloudinary");

const cloudinaryUrl = process.env.CLOUDINARY_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudinaryUrl) {
  cloudinary.config({
    cloudinary_url: cloudinaryUrl,
  });
} else if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

function isCloudinaryConfigured() {
  return Boolean(cloudinaryUrl || (cloudName && apiKey && apiSecret));
}

function getCloudinaryConfigStatus() {
  const missing = [];

  if (!cloudinaryUrl && !cloudName) missing.push("CLOUDINARY_CLOUD_NAME (or CLOUDINARY_URL)");
  if (!cloudinaryUrl && !apiKey) missing.push("CLOUDINARY_API_KEY (or CLOUDINARY_URL)");
  if (!cloudinaryUrl && !apiSecret) missing.push("CLOUDINARY_API_SECRET (or CLOUDINARY_URL)");

  return {
    configured: missing.length === 0,
    missing,
  };
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
  getCloudinaryConfigStatus,
};
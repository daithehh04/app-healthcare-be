const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME || 'daxftrleb',
     api_key: process.env.CLOUDINARY_API_KEY || '759369867626566',
     api_secret: process.env.CLOUDINARY_API_SECRET || 'roRh59w1bi4wNDot3xTlgS-4jvg'
});

module.exports = cloudinary;
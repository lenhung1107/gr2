const express = require('express');
const router = express.Router();
const multer = require('multer');
const TestOrderController = require('../controller/TestOrderController');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'healthcare_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], 
  },
});

const upload = multer({ storage });

router.post('/create', TestOrderController.createTestOrder);
router.get('/getAll',TestOrderController.getAllTestOrder );
router.patch('/updateStatus/:id', TestOrderController.confirmTestOrder);
router.post('/uploadResult/:id', upload.single('resultFile'), TestOrderController.uploadFile);

module.exports = router;

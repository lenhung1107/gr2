const express = require('express');
const router = express.Router();
const multer = require('multer');
const TestOrderController = require('../controller/TestOrderController');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Tạo storage multer để upload trực tiếp lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'healthcare_uploads', // tên thư mục lưu trữ trên Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // cho phép định dạng
  },
});

const upload = multer({ storage });
// Định nghĩa route
router.post('/create', TestOrderController.createTestOrder);
router.get('/getAll',TestOrderController.getAllTestOrder );
router.patch('/updateStatus/:id', TestOrderController.confirmTestOrder);
router.post('/uploadResult/:id', upload.single('resultFile'), TestOrderController.uploadFile);
// API lấy chi tiết một chuyên khoa theo ID
module.exports = router;

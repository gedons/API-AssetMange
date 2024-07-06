// server/routes/assetRoutes.js

const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const { getAssets, getAsset, addAsset, updateAsset, deleteAsset } = require('../controllers/assetController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({ storage });

router.get('/', authMiddleware, getAssets);
router.get('/:id', authMiddleware, getAsset);
router.post('/', authMiddleware, upload.single('image'), addAsset);
router.put('/:id', authMiddleware, upload.single('image'), updateAsset);
router.delete('/:id', authMiddleware, deleteAsset);

module.exports = router;

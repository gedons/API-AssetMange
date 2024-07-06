// server/controllers/assetController.js

const Asset = require('../models/asset');
const { cloudinary } = require('../config/cloudinary');
const { addLog } = require('./logController');

// Get all assets
const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single asset by ID
const getAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new asset
const addAsset = async (req, res) => {
  const { serialNumber, model, purchaseDate, warranty, location } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newAsset = new Asset({
      serialNumber,
      model,
      purchaseDate,
      warranty,
      location,
      imageUrl: result.secure_url,
    });
    await newAsset.save();
    
    // Log the action
    await addLog(req.user.id, 'Added new asset', `Asset ID: ${newAsset._id}`);

    res.json(newAsset);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update asset
const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const { serialNumber, model, purchaseDate, warranty, location, quantity, inStock } = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      asset.imageUrl = result.secure_url;
    }

    asset.serialNumber = serialNumber || asset.serialNumber;
    asset.model = model || asset.model;
    asset.purchaseDate = purchaseDate || asset.purchaseDate;
    asset.warranty = warranty || asset.warranty;
    asset.location = location || asset.location;
    asset.quantity = quantity || asset.quantity;
    asset.inStock = inStock !== undefined ? inStock : asset.inStock;

    await asset.save();
    
    // Log the action
    await addLog(req.user.id, 'Updated asset', `Asset ID: ${asset._id}`);

    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete asset
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    await cloudinary.uploader.destroy(asset.imageUrl);
    await Asset.deleteOne({ _id: req.params.id });  

    res.json({ message: 'Asset removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAssets,
  getAsset,
  addAsset,
  updateAsset,
  deleteAsset,
};

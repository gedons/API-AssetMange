// server/models/asset.js

const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  warranty: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,  
  },
  inStock: {
    type: Boolean,
    default: true,  
  },
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;

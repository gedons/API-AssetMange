// server/controllers/requestController.js

const Request = require('../models/request');
const Asset = require('../models/asset');

// Get all requests
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user', 'name email').populate('asset', 'serialNumber model');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single request by ID
const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('user', 'name email').populate('asset', 'serialNumber model');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new request
const addRequest = async (req, res) => {
  const { assetId } = req.body;

  try {
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const newRequest = new Request({
      user: req.user.id,
      asset: assetId,
    });

    await newRequest.save();
    res.json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update request status
const updateRequest = async (req, res) => {
  const { status } = req.body;

  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = status || request.status;

    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    await Request.deleteOne({ _id: req.params.id });  

    res.json({ message: 'Request removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRequests,
  getRequest,
  addRequest,
  updateRequest,
  deleteRequest,
};

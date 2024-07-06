// server/controllers/logController.js

const Log = require('../models/log');

// Get all logs
const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate('user', 'name email');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new log
const addLog = async (user, action, details) => {
  const newLog = new Log({
    user,
    action,
    details,
  });
  await newLog.save();
};

module.exports = {
  getLogs,
  addLog,
};

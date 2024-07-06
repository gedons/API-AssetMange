// server/routes/logRoutes.js

const express = require('express');
const { getLogs } = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getLogs);

module.exports = router;

// server/routes/requestRoutes.js

const express = require('express');
const { getRequests, getRequest, addRequest, updateRequest, deleteRequest } = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getRequests);
router.get('/:id', authMiddleware, getRequest);
router.post('/', authMiddleware, addRequest);
router.put('/:id', authMiddleware, updateRequest);
router.delete('/:id', authMiddleware, deleteRequest);

module.exports = router;

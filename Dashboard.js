const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');

router.get('/', dashboardController);

module.exports = router;
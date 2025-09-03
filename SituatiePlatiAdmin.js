const express = require('express');
const router = express.Router();
const situatiePlatiController = require('../controllers/SituatiePlatiAdminController');

router.get('/', situatiePlatiController);

module.exports = router;
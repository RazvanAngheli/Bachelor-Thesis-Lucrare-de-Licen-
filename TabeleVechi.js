const express = require('express');
const router = express.Router();
const controller = require('../controllers/TabeleVechiController');

router.get('/istoric', controller.getTabelIntretinere);

module.exports = router;
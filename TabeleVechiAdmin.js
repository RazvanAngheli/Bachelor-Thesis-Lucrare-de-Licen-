const express = require('express');
const router = express.Router();
const controller = require('../controllers/TabeleVechiController');

// Ruta care returnează datele de întreținere pentru o lună și un an selectat
router.get('/istoric', controller.getTabelIntretinere);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/IntretinereController');

router.get('/:id_locatar', controller.getUltimaIntretinere);

module.exports = router;
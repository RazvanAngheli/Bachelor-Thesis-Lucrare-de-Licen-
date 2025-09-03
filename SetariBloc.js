const express = require('express');
const router = express.Router();
const controller = require('../controllers/SetariBlocController');

router.get('/', controller.getSetari);
router.put('/', controller.updateSetari);

module.exports = router;
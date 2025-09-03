// bloc_backend/routes/PlatiManual.js
const express = require('express');
const router = express.Router();
const { getLocatari, platiManualController } = require('../controllers/PlatiManualController');

router.get('/locatari', getLocatari);        // <--- pentru dropdown
router.post('/', platiManualController);     // <--- pentru trimiterea plății

module.exports = router;
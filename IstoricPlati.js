// ✅ BACKEND - routes/IstoricPlati.js
const express = require('express');
const router = express.Router();
const istoricPlatiController = require('../controllers/IstoricPlatiController');

router.get('/', istoricPlatiController);

module.exports = router;



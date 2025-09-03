// routes/ScrieAnunt.js
const express = require('express');
const router = express.Router();
const scrieAnuntController = require('../controllers/ScrieAnuntController');

router.post('/', scrieAnuntController);

module.exports = router;
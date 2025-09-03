// routes/GenereazaIntretinere.js

const express = require('express');
const router = express.Router();
const { genereazaIntretinere } = require('../controllers/GenereazaIntretinereController');

router.post('/', genereazaIntretinere);

module.exports = router;
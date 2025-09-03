const express = require('express');
const router = express.Router();
const resetareParola = require('../controllers/ResetareParolaController');

router.post('/', resetareParola);

module.exports = router;
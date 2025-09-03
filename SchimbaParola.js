const express = require('express');
const router = express.Router();
const { schimbaParola } = require('../controllers/SchimbaParolaController');

router.put('/', schimbaParola);

module.exports = router;
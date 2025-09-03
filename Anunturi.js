const express = require('express');
const router = express.Router();
const AnunturiController = require('../controllers/AnunturiController');

router.get('/:id_locatar', AnunturiController.getAnunturiLocatar);
router.post('/citire', AnunturiController.marcheazaAnuntCitit);

module.exports = router;
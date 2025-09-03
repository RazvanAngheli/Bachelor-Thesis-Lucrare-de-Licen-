const express = require('express');
const router = express.Router();
const controller = require('../controllers/GestionareLocatariController');

router.get('/', controller.getTotLocatarii);
router.put('/:id', controller.actualizeazaLocatar);

module.exports = router;
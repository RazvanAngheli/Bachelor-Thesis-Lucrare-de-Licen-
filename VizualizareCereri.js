const express = require('express');
const router = express.Router();
const {
  obtineToateCererile,
  marcheazaRezolvat
} = require('../controllers/VizualizareCereriController');

router.get('/', obtineToateCererile);
router.put('/:id_cerere', marcheazaRezolvat);

module.exports = router;
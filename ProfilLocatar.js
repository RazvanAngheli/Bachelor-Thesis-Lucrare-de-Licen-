const express = require('express');
const router = express.Router();
const { obtineProfilLocatar } = require('../controllers/ProfilLocatarController');

// Ruta: GET /profil-locatar/:id_utilizator
router.get('/:id_utilizator', obtineProfilLocatar);

module.exports = router;
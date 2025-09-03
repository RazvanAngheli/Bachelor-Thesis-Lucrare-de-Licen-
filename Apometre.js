const express = require('express');
const router = express.Router();
const { adaugaIndexApometre } = require('../controllers/ApometreController');

// POST /api/apometre — trimite indexuri pentru luna curentă
router.post('/', adaugaIndexApometre);

module.exports = router;
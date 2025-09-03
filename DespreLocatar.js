// bloc_backend/routes/DespreBloc.js
const express = require('express');
const router = express.Router();
const { obtineSetariBloc } = require('../controllers/DespreLocatarController');

router.get('/', obtineSetariBloc);

module.exports = router;
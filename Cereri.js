const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { salveazaCerere } = require('../controllers/CereriController');

// Configurare upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

// ✅ Ruta POST /cereri – delegă către controller
router.post('/', upload.single('fisier'), salveazaCerere);

module.exports = router;
// uploadConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Creează folderul dacă nu există
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath); // aici se salvează fișierele
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const numeUnic = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, numeUnic);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
// utils/notificare.js
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function trimiteEmail(destinatar, subiect, mesajHtml) {
  const msg = {
    to: destinatar,
    from: 'bloc@app.com', // Schimbă cu o adresă verificată dacă ți-o cere
    subject: subiect,
    html: mesajHtml,
  };

  try {
    await sgMail.send(msg);
    console.log('Email trimis cu succes către', destinatar);
  } catch (error) {
    console.error('Eroare la trimiterea emailului:', error.response?.body || error.message);
  }
}

module.exports = { trimiteEmail };
// bloc_backend/utils/genereazaHashParola.js
const bcrypt = require('bcrypt');

// AICI modifici parola pe care vrei să o hashuiești:
const parolaClara = 'admin1';

async function genereazaHash() {
  try {
    const hash = await bcrypt.hash(parolaClara, 10);
    console.log(`Hash-ul pentru parola "${parolaClara}":\n${hash}`);
  } catch (err) {
    console.error('Eroare la generarea hash-ului:', err);
  }
}

genereazaHash();
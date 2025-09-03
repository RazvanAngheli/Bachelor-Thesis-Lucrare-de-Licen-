const bcrypt = require('bcrypt');

async function hashPassword(parola) {
    const saltRounds = 10;
    return await bcrypt.hash(parola, saltRounds);
}

async function verificaParola(parolaIntrodusa, hashDinBD) {
    return await bcrypt.compare(parolaIntrodusa, hashDinBD);
}

module.exports = { hashPassword, verificaParola };
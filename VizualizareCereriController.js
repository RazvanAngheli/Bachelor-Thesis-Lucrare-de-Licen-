const express = require('express');
const db = require('../db/conexiune');

const obtineToateCererile = async (req, res) => {
  try {
    const { rows } = await db.query(`
  SELECT 
    c.*, 
    l.nr_apartament, 
    u.nume 
  FROM Cereri_RA c
  JOIN Locatari_RA l ON c.id_locatar = l.id_locatar
  JOIN Utilizatori_RA u ON l.id_utilizator = u.id_utilizator
  ORDER BY c.data_trimitere DESC
`);
    res.json(rows);
  } catch (err) {
    console.error('Eroare la preluarea cererilor:', err);
    res.status(500).json({ mesaj: 'Eroare la preluarea cererilor' });
  }
};

const marcheazaRezolvat = async (req, res) => {
  const { id_cerere } = req.params;
  try {
    await db.query('UPDATE Cereri_RA SET status = $1 WHERE id_cerere = $2', ['Rezolvat', id_cerere]);
    res.status(200).json({ mesaj: 'Status actualizat' });
  } catch (err) {
    console.error('Eroare la actualizarea cererii:', err);
    res.status(500).json({ mesaj: 'Eroare la actualizare' });
  }
};

module.exports = {
  obtineToateCererile,
  marcheazaRezolvat
};
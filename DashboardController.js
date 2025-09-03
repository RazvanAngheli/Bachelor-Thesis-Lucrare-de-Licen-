const db = require('../db/conexiune');

const DashboardController = async (req, res) => {
  try {
    const totalIntretinereResult = await db.query(`
      SELECT SUM(total) AS total_intretinere FROM Intretineri_RA
    `);

    const totalFondReparatiiResult = await db.query(`
      SELECT SUM(i.fond_reparatii) AS total_fond
      FROM Intretineri_RA i
      JOIN Plati_RA p ON i.id_intretinere = p.id_intretinere
      WHERE i.id_locatar = p.id_locatar
    `);

    const totalPlatiResult = await db.query(`
      SELECT SUM(suma_platita) AS total_plati FROM Plati_RA
    `);

    res.json({
      totalIntretinere: parseFloat(totalIntretinereResult.rows[0].total_intretinere) || 0,
      totalFondReparatii: parseFloat(totalFondReparatiiResult.rows[0].total_fond) || 0,
      totalPlati: parseFloat(totalPlatiResult.rows[0].total_plati) || 0,
    });
  } catch (error) {
    console.error('Eroare la dashboard:', error);
    res.status(500).json({ error: 'Eroare server' });
  }
};

module.exports = DashboardController;
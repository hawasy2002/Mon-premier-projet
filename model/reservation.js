const db = require("../config/database");

class Reservation {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM reservations");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM reservations WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ utilisateur_id, destination_id, date, statut }) {
    const [result] = await db.query(
              "INSERT INTO reservations (utilisateur_id, destination_id, date, statut) VALUES (?, ?, ?, ?)",
      [utilisateur_id, destination_id, date, statut]
    );
    return result.insertId;
  }

  static async update(id, { utilisateur_id, destination_id, date, statut }) {
    const [result] = await db.query(
      "UPDATE reservations SET utilisateur_id = ?, destination_id = ?, date = ?, statut = ? WHERE id = ?",
      [utilisateur_id, destination_id, date, statut, id]
    );
    return result.affectedRows > 0;
  }
  static async delete(id) {
    const [result] = await db.query("DELETE FROM reservations WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  static async getByUser(utilisateur_id) {
    const [rows] = await db.query("SELECT * FROM reservations WHERE utilisateur_id = ?", [utilisateur_id]);
    return rows;
      }
}

module.exports = Reservation;

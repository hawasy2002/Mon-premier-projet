const db = require("../config/database");

class Destination {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM destinations");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM destinations WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ nom, description, image, localisation, prix }) {
        const [result] = await db.query(
      "INSERT INTO destinations (nom, description, image, localisation, prix) VALUES (?, ?, ?, ?, ?)",
      [nom, description, image, localisation, prix]
    );
    return result.insertId;
  }

  static async update(id, { nom, description, image, localisation, prix }) {
    const [result] = await db.query(
      "UPDATE destinations SET nom = ?, description = ?, image = ?, localisation = ?, prix = ? WHERE id = ?",
      [nom, description, image, localisation, prix, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM destinations WHERE id = ?", [id]);
        return result.affectedRows > 0;
  }
}

module.exports = Destination;

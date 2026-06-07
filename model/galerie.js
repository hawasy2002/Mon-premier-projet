const db = require("../config/database");

class Galerie {
  static async create({ destination_id, image_url, titre, description }) {
    const [result] = await db.query(
      "INSERT INTO galerie (destination_id, image_url, titre, description) VALUES (?, ?, ?, ?)",
      [destination_id, image_url, titre, description]
    );
    return result.insertId;
  }

  static async getByDestination(destination_id) {
    const [rows] = await db.query(
      "SELECT * FROM galerie WHERE destination_id = ? ORDER BY id DESC",
      [destination_id]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM galerie WHERE id = ?", [id]);
    return rows[0];
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM galerie WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  static async update(id, { titre, description }) {
    const [result] = await db.query(
      "UPDATE galerie SET titre = ?, description = ? WHERE id = ?",
      [titre, description, id]
          );
    return result.affectedRows > 0;
  }
}

module.exports = { Galerie };

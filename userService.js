const db = require("../config/database");
const { emitNotificationToUser } = require("../utils/socket");

exports.createNotification = async (userId, { message, targetUrl, type }) => {
  try {
    const [result] = await db.query(
      "INSERT INTO notifications (id_user, content, target_url, type, status) VALUES (?, ?, ?, ?, 'non-lue')",
      [userId, message, targetUrl, type]
    );

    // Envoyer via socket si l'utilisateur est connecté
    emitNotificationToUser(userId, {
      message,
      targetUrl,
      type,
      recipientContext: { userId }
    });
    return result.insertId;
  } catch (err) {
    console.error("Erreur lors de la création d'une notification:", err);
    return null;
  }
};

exports.getUnreadNotifications = async (userId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE id_user = ? AND status = 'non-lue' ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  } catch (err) {
    console.error("Erreur lors de la récupération des notifications non lues:", err);
    return [];
  }
};
exports.getAllNotifications = async (userId) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE id_user = ? ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  } catch (err) {
    console.error("Erreur lors de la récupération des notifications:", err);
    return [];
  }
};

exports.markAsRead = async (notificationId) => {
  try {
    const [result] = await db.query(
      "UPDATE notifications SET status = 'lue' WHERE id_notif = ?",
      [notificationId]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Erreur lors du marquage de la notification comme lue:", err);
    return false;
  }
};

exports.markAllAsRead = async (userId) => {
  try {
    const [result] = await db.query(
      "UPDATE notifications SET status = 'lue' WHERE id_user = ? AND status = 'non-lue'",
      [userId]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Erreur lors du marquage de toutes les notifications comme lues:", err);
    return false;
  }
};

exports.deleteNotification = async (notificationId) => {
  try {
    const [result] = await db.query(
      "DELETE FROM notifications WHERE id_notif = ?",
      [notificationId]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error("Erreur lors de la suppression d'une notification:", err);
    return false;
  }
};

exports.broadcastNotification = (message, { targetUrl, type, recipientRole }) => {
  const { emitNotification } = require("../utils/socket");
  emitNotification({
    message,
    targetUrl,
    type,
    recipientRole
  });
};

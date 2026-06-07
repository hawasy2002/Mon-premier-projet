const jwt = require('jsonwebtoken');

exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error('Token invalide:', err.message);
    return null;
  }
};

exports.decodeToken = (token) => {
  return jwt.decode(token);
  };exports.generateRefreshToken = (payload) => {  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export default {
  bcryptRounds: 10,
  secretKey: process.env.SECRET_KEY,
  accessExpire: process.env.JWT_ACCESS_EXPIRE,
  refreshExpire: process.env.JWT_REFRESH_EXPIRE,
};

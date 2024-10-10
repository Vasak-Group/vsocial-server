export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 8,
});

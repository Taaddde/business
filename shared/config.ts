export const config = {
  port: {
    api: process.env.POST || 3500,
  },
  mongodb: {
    database_name: 'microservices-challenge',
    business: process.env.MONGODB_URI_BUSINESS || "mongodb://localhost:27017/microservices-challenge",
    api: process.env.MONGODB_URI_API || "mongodb://localhost:27017/microservices-challenge",
  },
  seed: {
    users: process.env.SEED_USERS || 20
  },
  jwt: {
    key: process.env.JWT_KEY || "im_batman",
    expiresIn: process.env.JWT_EXPIRE || "1h",
  },
};

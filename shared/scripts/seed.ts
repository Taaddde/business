import "../load-env-vars";

import { config } from "../config";
import { MongoClient } from 'mongodb';
import userSeed from "./user.seed";

async function boostrap() {
  const { users } = config.seed;

  const client = await connect();
  await userSeed(Number(users), client);
}

boostrap();


async function connect() {
  const client = new MongoClient(config.mongodb.api);
  await client.connect();
  return client.db(config.mongodb.database_name);
}
import { faker } from "@faker-js/faker";
import { User } from "shared/schemas/user.schema";

export default async function getDocuments(count = 10, client) {
  await client.collection('users').deleteMany({});
  const users: User[] = [];

  if (isNaN(count) || count < 1) count = 10;
  for (let index = 0; index < count; index++) {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    users.push(user);
  }
  await client.collection('users').insertMany(users);
  console.log("[SEED] - User seeded");
}
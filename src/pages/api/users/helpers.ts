import { Db, MongoClient } from "mongodb";
import url from "url";

import { ChallengeContext, User } from "../../../bases";

export type UserMongoData = User & ChallengeContext & {
  updatedAt: string;
}
  
let cachedDb: Db = null;

export async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);
  console.log('dbName', dbName)
  const db = client.db(dbName);

  cachedDb = db;

  return db;
}
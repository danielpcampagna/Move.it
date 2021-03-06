import { NowRequest, NowResponse } from '@vercel/node';

import { UserContext } from '../../../bases';
import { connectToDatabase, UserMongoData } from './helpers';

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === 'POST') {

  } else if (req.method === 'GET') {
    const db = await connectToDatabase(process.env.MONGODB_URI)
    const collection = db.collection<UserMongoData>('users')
    const userMongoData: UserMongoData[] = await collection.find().toArray()

    return res.status(200).json(userMongoData.map((document: UserMongoData) => {
      const {
        name,
        email,
        image,
        level,
        challengesCompleted,
        currentExperience,
        updatedAt
      } = document;

      const result: UserContext = {
        user: {
          email,
          image,
          name
        },
        challengeContext: {
          challengesCompleted,
          currentExperience,
          level,
        },
        updatedAt,
      };
      return result;
    }));
  }
}
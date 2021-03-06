import { NowRequest, NowResponse } from '@vercel/node';

import { UserContext } from '../../../bases';
import { connectToDatabase, UserMongoData } from './helpers';

export default async (req: NowRequest, res: NowResponse) => {
  const {
    query: { id },
  } = req;
  
  if (req.method === 'POST') {
    // Process a POST request
    const {
      body: { user, challengeContext }
    } = req;

    const { name, email, image } = user;
    const { challengesCompleted, currentExperience, level } = challengeContext;
    const userMongoData: UserMongoData = {
      email,
      name,
      level,
      image,
      challengesCompleted,
      currentExperience,
      updatedAt: String(Date.now())
    }
  
    const filter = {
      id
    }
  
    const db = await connectToDatabase(process.env.MONGODB_URI)
    const collection = db.collection('users')
    await collection.findOneAndUpdate(
      filter, {
        $set: userMongoData
      }, {
        upsert: true,
      }
    );
    
    return res.status(201).json({ ok: true });

  } else if (req.method === 'GET') {
    const db = await connectToDatabase(process.env.MONGODB_URI)
    const collection = db.collection<UserMongoData>('users')
    const userMongoData: UserMongoData[] = await collection.find({ name: String(id) }).toArray()

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
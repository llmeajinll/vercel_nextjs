import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';

type ResponseData = {
  message: string;
};

export async function POST(req: Request) {

  // const { date } = await req.json();

  const {date}  = await req.json()
  console.log('[postTodoList route.ts]',date.date, typeof date)

  const client = await connectDB;
  const db = client.db('todo').collection('list');

  console.log(db)
  // const test = await collections.find().toArray();



  const todo = await db
    .aggregate([
      {
        $match: {
          created_at: {$regex: date.date}
        }
      },
      {
        $lookup: {
          from: 'tag',
          localField: 'tag',
          foreignField: '_id',
          as: 'tag',
        },
      },
    ])
    .toArray();

  console.log('get todo: ', todo);
  // console.log('api test : ', test);
  if (!todo) {
    return NextResponse.json({ todo: 'no' });
  } else {
    const response = NextResponse.json({todo});
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }

}


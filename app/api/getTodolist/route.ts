import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';

type ResponseData = {
  message: string;
};

export async function GET() {
  const client = await connectDB;
  const collections = client.db('todo').collection('list');
  // const test = await collections.find().toArray();

  const todo = await collections
    .aggregate([
      {
        $lookup: {
          from: 'tag',
          localField: 'tag',
          foreignField: 'tag',
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

export async function POST() {
  return NextResponse.json({ message: 'post route' });
}

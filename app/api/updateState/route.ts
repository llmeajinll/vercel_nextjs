// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';
import { ObjectId } from 'mongodb';

type ResponseData = {
  message: string;
};

type DatabaseSend = {
  id: number;
  state: boolean;
};

export async function POST(req: Request) {
  const { id, state } = await req.json();
  // console.log(`id: ${id}, state ${state}`, typeof id);

  const client = await connectDB;
  const db = client.db('todo').collection('list');
  db.updateOne({ _id: new ObjectId(id) }, { $set: { state } });

  return NextResponse.json({ data: 'ok' });
}

// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';
import dayjs from 'dayjs';
import {ObjectId} from "mongodb";

export async function POST(req: NextRequest) {
  const { content, tag } = await req.json();
  console.log(`content: ${content}, tag: ${tag}`);

  const date = dayjs().format('YYYY-MM-DD hh:mm:ss');

  const client = await connectDB;
  const db = client.db('todo').collection('list');

  const addTodo = await db.insertOne({
    content,
    created_at: date,
    updated_at: date,
    tag: new ObjectId(tag),
    state: false,
  });

  if (addTodo.acknowledged) {
    console.log(addTodo.acknowledged);
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } else {
    console.log(addTodo.acknowledged);
    return NextResponse.json({ message: 'error' }, { status: 404 });
  }
}

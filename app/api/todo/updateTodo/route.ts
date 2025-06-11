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

export async function PATCH(req: Request) {
    const {id, content} = await req.json();
    // const { id, state } = await req.json();
    console.log(`id: ${id}, content ${content}`);

    // const client = await connectDB;
    // const db = client.db('todo').collection('list');
    // db.updateOne({ _id: new ObjectId(id) }, { $set: { state } });
    //
    return NextResponse.json({ data: 'ok' });
}
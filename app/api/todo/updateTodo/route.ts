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

    const client = await connectDB;
    const db = client.db('todo').collection('list');
    const result = db.updateOne({ _id: new ObjectId(id) }, { $set: { content } });


    console.log(result)

    // @ts-ignore
    const {matchedCount, modifiedCount} = result;

    if(matchedCount === 1 && modifiedCount === 1){
        return NextResponse.json({ content }, { status: 200 });
    }
    else{
        NextResponse.json({ content: 'error' }, { status: 404 })
    }


}
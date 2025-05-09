import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';
import dayjs from "dayjs";

type ResponseData = {
    message: string;
};

export async function POST(req: NextRequest) {

    const { tag, color } = await req.json();
    console.log(`content: ${tag}, tag: ${color}`);

    const client = await connectDB;
    const tagColl = client.db('todo').collection('tag');



    const addTag = await tagColl.insertOne({
        tag,
        color
    });

    if (addTag.acknowledged) {
        console.log(`server result : ${addTag.acknowledged}`);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } else {
        console.log(`server result : ${addTag.acknowledged}`);
        return NextResponse.json({ message: 'error' }, { status: 404 });
    }

}

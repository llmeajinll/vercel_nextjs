import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';

type ResponseData = {
    message: string;
};

export async function GET() {
    const client = await connectDB;
    const db = client.db('todo').collection('tag');
    const tag = await db.find().toArray();

    // const todo = await db
    //     .aggregate([
    //         {
    //             $lookup: {
    //                 from: 'tag',
    //                 localField: 'tag',
    //                 foreignField: 'tag',
    //                 as: 'tag',
    //             },
    //         },
    //     ])
    //     .toArray();

    console.log('get tag: ', tag);
    // console.log('api test : ', test);
    if (!tag) {
        return NextResponse.json({ tag: 'no' });
    } else {
        const response = NextResponse.json({tag});
        response.headers.set('Access-Control-Allow-Origin', '*');
        return response;
    }
}

export async function POST() {
    return NextResponse.json({ message: 'post route' });
}

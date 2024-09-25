// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';

type ResponseData = {
  message: string;
};

export async function GET() {
  const client = await connectDB;
  const collections = client.db('todo').collection('list');
  const test = await collections.find().toArray();
  // console.log('api test : ', test);
  if (!test) {
    return NextResponse.json({ test: 'no' });
  } else {
    return NextResponse.json({ test });
  }
}

export async function POST() {
  return NextResponse.json({ message: 'post route' });
}

// export default function route(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method === 'POST') {
//     res.status(200).json({
//       message: 'post handlerTest',
//     });
//   } else if (req.method === 'GET') {
//     res.status(200).json({
//       message: 'get  handlerTest',
//     });
//   }
// }

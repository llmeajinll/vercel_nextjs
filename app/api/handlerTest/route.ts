// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/database';

type ResponseData = {
  message: string;
};

export async function GET() {
  const client = await connectDB;
  const collections = client.db('product').collection('test01');
  const test = await collections.find().toArray();
  console.log('api test : ', test);
  return NextResponse.json({ test });
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

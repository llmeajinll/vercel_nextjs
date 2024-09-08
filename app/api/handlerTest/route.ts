// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  message: string;
};

export async function GET() {
  return NextResponse.json({ message: 'get route' });
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

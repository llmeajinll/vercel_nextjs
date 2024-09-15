import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';

export async function POST() {
  // const url = `https://www.naver.com/`;
  // const url = `https://scholar.google.co.kr/scholar?hl=ko&as_sdt=0%2C5&q=jjtest&btnG=`;
  // await axios
  //   .get(url)
  //   .then((res) => {
  //     const { data } = res.data;
  //     // console.log('api crawling : ', res.data);
  //     const $ = cheerio.load(data);
  //     console.log($);
  //     // const element = $(
  //     //   '#gs_top > #gs_bdy > #gs_bdy_ccl > #gs_res_ccl > #gs_res_ccl_mid'
  //     // );
  //     // console.log(element);
  //     return NextResponse.json({ message: 'post message' });
  //   })
  //   .catch((err) => {
  //     console.log('err');
  //     return NextResponse.json({ message: 'error' });
  //   });
  //   const $ = cheerio.load(data);
}

// export async function GET() {
//   // const url = `https://www.naver.com/`;
//   const url = `https://scholar.google.co.kr/scholar?hl=ko&as_sdt=0%2C5&q=jjtest&btnG=`;

//   await axios
//     .get(url)
//     .then((res) => {
//       const test = res.data;
//       // console.log(test, typeof test);
//       // console.log('api crawling : ', res.data);

//       const $ = load(test);
//       const element = $(
//         '#gs_top > #gs_bdy > #gs_bdy_ccl > #gs_res_ccl > #gs_res_ccl_mid'
//       );

//       console.log(element);

//       return NextResponse.json({ message: 'get crawling' });
//     })
//     .catch((err) => {
//       console.log(err);
//       return NextResponse.json({ message: 'error' });
//     });

//   //   const $ = cheerio.load(data);
//   return NextResponse.json({ message: 'outside' });
// }

// #gs_top > #gs_bdy > #gs_bdy_ccl > #gs_res_ccl > #gs_res_ccl_mid;

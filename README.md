This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 작업 규칙

에이전트와 개발자는 수정 전에 [공통 작업 규칙](AGENTS.md)을 확인합니다. 포트폴리오 작업에는 [포트폴리오 세부 규칙](src/portfolio/AGENTS.md)과 [공통 UI 규격](src/portfolio/ui/README.md)도 적용합니다. 에이전트별로 다른 규칙을 만들지 않습니다.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3001/portfolio](http://localhost:3001/portfolio) with your browser to see the portfolio.

포트폴리오 라우트는 `app/(router)/portfolio/`, 콘텐츠는 `src/portfolio/data.ts`, 화면과 공통 UI는 `src/portfolio/components/`와 `src/portfolio/ui/`에서 관리합니다. 파일별 역할과 변경 기준은 [공통 작업 규칙](AGENTS.md)을 따릅니다.

포트폴리오는 기존 Pretendard 기반 UI를 사용합니다. 폰트·크기·색상·간격은 공통 컴포넌트와 [UI 규격](src/portfolio/ui/README.md)을 재사용합니다.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



&nbsp;

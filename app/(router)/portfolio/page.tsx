import type { Metadata } from 'next';
import Portfolio from '@/src/portfolio/Portfolio';

export const metadata: Metadata = {
  title: '김혜진 포트폴리오',
  description: '사용자도, 팀도 막히지 않게 만드는 프론트엔드 개발자 김혜진의 포트폴리오',
};

export default function Page() {
  return <Portfolio />;
}

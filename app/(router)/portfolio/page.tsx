import type { Metadata } from 'next';
import Portfolio from '@/src/portfolio/Portfolio';

export const metadata: Metadata = {
  title: '김혜진 포트폴리오',
  description: '문제의 원인을 측정과 근거로 확인하고, 서비스에 맞는 해결 방법을 골라 적용하는 프론트엔드 개발자 김혜진의 포트폴리오',
};

export default function Page() {
  return <Portfolio />;
}

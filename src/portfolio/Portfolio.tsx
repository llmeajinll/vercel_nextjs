'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PortfolioHome } from './components/PortfolioHome';
import { ProjectDetail } from './components/ProjectDetail';
import { PROJECTS } from './data';
import { usePendingSectionScroll } from './navigation';
import { PortfolioShell } from './ui/PortfolioShell';

// 경로와 페이지 상태만 관리한다. 화면 스타일은 기존 규격의 공통 컴포넌트에서 정의한다.
export default function Portfolio({ slug }: { slug?: string }) {
  const router = useRouter();
  const [section, setSection] = useState('');
  usePendingSectionScroll(slug);

  useEffect(() => {
    if (slug || !location.hash.startsWith('#/')) return;
    const old = location.hash.slice(2);
    router.replace(PROJECTS.some((p) => p.slug === old) ? '/portfolio/' + old : '/portfolio');
  }, [slug, router]);

  const idx = slug ? PROJECTS.findIndex((p) => p.slug === slug) : -1;
  return (
    <PortfolioShell section={section}>
      {idx >= 0 ? <ProjectDetail idx={idx} onSection={setSection} /> : <PortfolioHome />}
    </PortfolioShell>
  );
}

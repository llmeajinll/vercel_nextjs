import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Portfolio from '@/src/portfolio/Portfolio';
import { PROJECTS } from '@/src/portfolio/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.name} · 김혜진 포트폴리오`, description: p.tagline };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!PROJECTS.some((p) => p.slug === params.slug)) notFound();
  return <Portfolio slug={params.slug} />;
}

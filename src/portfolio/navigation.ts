import { useEffect, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

let pendingSection: string | null = null;
export function scrollToSection(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  const head = document.querySelector('.pf > header')?.getBoundingClientRect().height ?? 56;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - head - 8, behavior: smooth && !reduce ? 'smooth' : 'auto' });
}
export function useGoSection() {
  const router = useRouter();
  return (id: string) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (window.location.pathname === '/portfolio') { scrollToSection(id, true); return; }
    pendingSection = id;
    router.push('/portfolio', { scroll: false });
  };
}

export function usePendingSectionScroll(slug?: string) {
  useEffect(() => {
    if (slug || !pendingSection) return;
    const id = pendingSection;
    pendingSection = null;
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id, false)));
  }, [slug]);
}

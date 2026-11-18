import React, { useEffect, useId, useRef, useState } from 'react';
import { Project } from '../data';
import { BLUE, label, ui, ul } from '../ui/tokens';

export type Toc = NonNullable<Project['toc']>;

// 목차 목록 — 데스크톱 사이드와 모바일 패널이 같이 쓴다. 하위 항목이 활성이면 상위도 강조한다.
function TocList({ toc, active, go }: { toc: Toc; active: string; go: (id: string) => void }) {
  const link = (id: string, text: string, on: boolean, child?: boolean): React.ReactNode => (
    <a
      href={'#' + id}
      aria-current={on ? 'location' : undefined}
      onClick={(e) => { e.preventDefault(); go(id); }}
      className="pf-toc-link"
      style={{ display: 'block', padding: child ? '5px 0 5px 26px' : '7px 0 7px 12px', borderLeft: `2px solid ${on && !child ? BLUE : 'transparent'}`, fontSize: child ? 13 : 14, lineHeight: 1.45, fontWeight: on ? 600 : 400, color: on ? BLUE : child ? '#86868B' : '#6E6E73' }}
    >
      {text}
    </a>
  );
  return (
    <ol style={{ ...ul, borderLeft: '1px solid #E8E8ED' }}>
      {toc.map((t) => {
        const childOn = !!t.children?.some((c) => c.id === active);
        return (
          <li key={t.id}>
            {link(t.id, t.label, t.id === active || childOn)}
            {t.children && (
              <ol style={{ ...ul }}>
                {t.children.map((c, i) => (
                  <li key={c.id}>
                    {/* 보조 구현은 주요 기능 개발과 구분해 작은 제목 아래에 둔다 */}
                    {c.sub && !t.children![i - 1]?.sub && <span style={{ ...ui, display: 'block', padding: '8px 0 2px 26px', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', color: '#86868B' }}>보조 구현</span>}
                    {link(c.id, c.label, c.id === active, true)}
                  </li>
                ))}
              </ol>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// 노션식 목차: 평소에는 화면 오른쪽 끝에 항목 수만큼 짧은 가로줄만 보이고(현재 위치는 파란 줄),
// 마우스를 올리거나 Tab으로 들어오면 300px 목차 패널이 본문 위에 펼쳐진다. 본문 폭은 차지하지 않는다.
export function TocRail({ toc, active, go }: { toc: Toc; active: string; go: (id: string) => void }) {
  const bars = toc.flatMap((t) => [
    { id: t.id, child: false, on: t.id === active || !!t.children?.some((c) => c.id === active) },
    ...(t.children ?? []).map((c) => ({ id: c.id, child: true, sub: !!c.sub, on: c.id === active })),
  ]);
  return (
    <nav aria-label="페이지 목차" className="pf-rail" style={{ position: 'fixed', right: 12, top: 'calc(var(--pf-head, 56px) + 96px)', zIndex: 20, padding: '8px 4px 8px 28px' }}>
      <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
        {bars.map((b) => <span key={b.id} style={{ display: 'block', width: b.child ? ('sub' in b && b.sub ? 6 : 10) : 18, height: 2, borderRadius: 2, background: b.on ? BLUE : '#C7C7CC' }} />)}
      </div>
      <div className="pf-rail-panel" style={{ position: 'absolute', top: -8, right: 0, width: 300, maxHeight: 'calc(100vh - var(--pf-head, 56px) - 140px)', overflowY: 'auto', boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid #E8E8ED', borderRadius: 14, boxShadow: '0 12px 32px rgba(0,0,0,0.10)', padding: '14px 16px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ ...label, fontSize: 12, paddingLeft: 14 }}>목차</span>
        <TocList toc={toc} active={active} go={go} />
      </div>
    </nav>
  );
}

// 모바일·좁은 화면: 오른쪽 아래 '목차' 버튼을 누르면 패널이 열린다. Esc·바깥 누르기·항목 선택으로 닫힘
export function TocMobile({ toc, active, go }: { toc: Toc; active: string; go: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const current = toc.flatMap((t) => [t, ...(t.children ?? [])]).find((t) => t.id === active)?.label;
  useEffect(() => {
    if (!open) return;
    box.current?.querySelector<HTMLAnchorElement>('a[aria-current], a')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    const onDown = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, [open]);
  return (
    <div ref={box} className="pf-toc-mobile" style={{ position: 'fixed', right: 16, bottom: 'calc(16px + env(safe-area-inset-bottom))', zIndex: 20 }}>
      {open && (
        <nav id={panelId} aria-label="페이지 목차" style={{ position: 'absolute', right: 0, bottom: 52, width: 'min(280px, calc(100vw - 32px))', maxHeight: '60vh', overflowY: 'auto', background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: 18, padding: '14px 16px 14px 8px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}>
          <TocList toc={toc} active={active} go={(id) => { setOpen(false); go(id); }} />
        </nav>
      )}
      <button ref={btn} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}
        style={{ ...ui, display: 'flex', alignItems: 'center', gap: 6, maxWidth: 'calc(100vw - 32px)', height: 44, padding: '0 18px', border: '1px solid #0071E3', borderRadius: 980, background: '#FFFFFF', color: BLUE, fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        목차{current && <span style={{ fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>· {current}</span>}
      </button>
    </div>
  );
}

import Image from 'next/image';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { BgFigure, Flow, Shot } from '../data';
import { Zoomable } from '../ui/Images';
import { Heading, Label, TitleBar } from '../ui/PortfolioUI';
import { ui } from '../ui/tokens';

const pad2 = (n: number) => String(n).padStart(2, '0');

// 캡처 화면을 설명과 함께 가로로 넘겨 보는 갤러리 (스크롤 스냅 + 이전/다음 버튼)
export function Gallery({ shots, label: aria, title, dark, counter }: { shots: Shot[]; label: string; title?: string; dark?: boolean; counter?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ prev: false, next: true });
  // 지금 보이는 화면 번호(여러 장이 보이면 범위)
  const [seen, setSeen] = useState({ from: 1, to: 1 });
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ prev: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    const box = el.getBoundingClientRect();
    const vis = Array.from(el.children).map((c, i) => { const r = c.getBoundingClientRect(); return r.left >= box.left - 4 && r.right <= box.right + 4 ? i + 1 : 0; }).filter(Boolean);
    if (vis.length) setSeen({ from: vis[0], to: vis[vis.length - 1] });
  };
  useEffect(() => { update(); }, []);
  const move = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' });
  };
  const btn = (on: boolean): CSSProperties => ({ font: 'inherit', fontSize: 16, width: 40, height: 40, background: 'rgba(232,232,237,0.8)', color: '#1D1D1F', border: 'none', borderRadius: 99, cursor: on ? 'pointer' : 'default', opacity: on ? 1 : 0.35 });
  return (
    <div style={{ minWidth: 0, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        {title ? <Label>{title}</Label> : <span />}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {counter && (
            <span aria-live="polite" style={{ ...ui, fontSize: 13, color: '#6E6E73', marginRight: 6, fontVariantNumeric: 'tabular-nums' }}>
              <span className="pf-sr">{aria} </span>{seen.from === seen.to ? seen.from : `${seen.from}–${seen.to}`} / {shots.length}
            </span>
          )}
          <button type="button" aria-label={counter ? `${aria} 이전 화면 보기` : '이전 화면'} disabled={!edge.prev} onClick={() => move(-1)} className={edge.prev ? 'pf-arrow' : undefined} style={btn(edge.prev)}>←</button>
          <button type="button" aria-label={counter ? `${aria} 다음 화면 보기` : '다음 화면'} disabled={!edge.next} onClick={() => move(1)} className={edge.next ? 'pf-arrow' : undefined} style={btn(edge.next)}>→</button>
        </div>
      </div>
      <div
        ref={ref}
        onScroll={update}
        role="region"
        aria-label={aria}
        tabIndex={0}
        style={{ display: 'flex', gap: 24, overflowX: 'auto', scrollSnapType: 'x proximity', paddingBottom: 16, scrollbarWidth: 'thin', scrollbarColor: '#C7C7CC transparent' }}
      >
        {shots.map((s) => {
          const w = s.phone ? 230 : 'min(560px, 84vw)';
          return (
            <figure key={s.src} style={{ flex: '0 0 auto', width: w, margin: 0, scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Zoomable z={{ src: s.src, alt: `${s.title} 화면`, title: s.title, w: s.w ?? (s.phone ? 780 : 1440), h: s.h ?? (s.phone ? 1688 : 732), fit: true }}>
                <div style={{ position: 'relative', aspectRatio: s.phone ? '780 / 1688' : '1440 / 732', border: '1px solid #D2D2D7', borderRadius: s.phone ? 28 : 18, overflow: 'hidden', background: dark ? '#1D1D1F' : '#fff' }}>
                  <Image src={s.src} alt={`${s.title} 화면`} fill sizes={s.phone ? '230px' : '(max-width: 640px) 84vw, 560px'} style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </Zoomable>
              <figcaption style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</span>
                {s.desc && <span style={{ fontSize: 14, lineHeight: 1.65, color: '#424245', textWrap: 'pretty' }}>{s.desc}</span>}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

// 상세용: 단계 요약 → 단계별 화면 → 모바일 대기열 화면
export function FlowDetail({ flow, ink, id, lead }: { flow: Flow; ink: string; id?: string; lead?: string }) {
  return (
    <div id={id} className="pf-flow" style={{ paddingTop: 72 }}>
      <TitleBar spaced>
        <Heading>주요 기능 플로우</Heading>
      </TitleBar>
      {lead && <p style={{ margin: '4px 0 0', fontSize: 17, lineHeight: 1.7, color: '#424245', maxWidth: 760, textWrap: 'pretty' }}>{lead}</p>}
      <div className="pf-flow-grid" style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '32px 24px' }}>
        {flow.steps.map((s, i) => (
          <React.Fragment key={s.title}>
          <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <Zoomable
              z={{ src: s.shot, alt: `${s.title} 화면. ${s.desc}`, title: `${pad2(i + 1)} ${s.title}`, w: 1440, h: 900, fit: true }}
              fallback={
                <a href={s.shot} target="_blank" aria-label={`${s.title} 화면 크게 보기`} style={{ display: 'block', border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#1D1D1F' }}>
                  <Image src={s.shot} alt={`${s.title} 화면`} width={1440} height={900} sizes="(max-width: 640px) 100vw, 280px" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </a>
              }
            >
              <div style={{ border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#1D1D1F' }}>
                <Image src={s.shot} alt={`${s.title} 화면. ${s.desc}`} width={1440} height={900} sizes="(max-width: 640px) 100vw, 280px" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </Zoomable>
            <figcaption style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}><span style={{ ...ui, fontSize: 13, color: ink, marginRight: 8 }}>{pad2(i + 1)}</span>{s.title}</span>
              <span style={{ fontSize: 14, lineHeight: 1.65, color: '#424245', textWrap: 'pretty' }}>{s.desc}</span>
            </figcaption>
          </figure>
          {i === flow.branch.after - 1 && (
            <div style={{ gridColumn: '1 / -1', background: '#F5F5F7', borderRadius: 24, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{flow.branch.title}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 12 }}>
                <div style={{ background: '#FFFFFF', borderRadius: 18, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: ink }}>5초 안에 끝나면</span>
                  <span style={{ fontSize: 15, lineHeight: 1.65, color: '#1D1D1F' }}>{flow.branch.fast}</span>
                </div>
                <div style={{ background: '#FFFFFF', borderRadius: 18, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#6E6E73' }}>5초를 넘기면</span>
                  <span style={{ fontSize: 15, lineHeight: 1.65, color: '#1D1D1F' }}>{flow.branch.slow}</span>
                </div>
              </div>
            </div>
          )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ paddingTop: 48 }}>
        <p style={{ margin: '0 0 20px', fontSize: 16, lineHeight: 1.75, maxWidth: 760, textWrap: 'pretty' }}>{flow.phonesLead}</p>
        <Gallery
          label="모바일 대기열 화면"
          dark
          counter
          shots={flow.phones.map((ph) => ({ src: ph.shot, title: ph.cap, phone: true }))}
        />
      </div>
    </div>
  );
}

// ---- 데모: 상품 카드 색 선택 (수정 전 / 수정 후 비교) ----
export function BgFigureView({ fig }: { fig: BgFigure }) {
  const tones = [
    { bg: 'rgba(0,113,227,0.1)', fg: '#0071E3' },
    { bg: '#0071E3', fg: '#FFFFFF' },
    { bg: '#1D1D1F', fg: '#FFFFFF' },
  ];
  const total = fig.groups.reduce((n, g) => n + g.steps.length, 0);
  let no = 0;
  return (
    <figure style={{ margin: '8px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
        <div style={{ minWidth: 620, display: 'grid', gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`, gap: 8 }}>
          {fig.groups.map((g) => (
            <div key={g.label} style={{ gridColumn: `span ${g.steps.length}`, background: tones[g.tone].bg, color: tones[g.tone].fg, borderRadius: 12, padding: '10px 8px', textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{g.label}</div>
          ))}
          {fig.groups.flatMap((g) => g.steps.map((st) => {
            no += 1;
            const hot = !!st.hot;
            return (
              <div key={st.title} style={{ background: hot ? '#0071E3' : '#F5F5F7', color: hot ? '#FFFFFF' : '#1D1D1F', borderRadius: 18, padding: '16px 14px 20px', display: 'flex', flexDirection: 'column', gap: 18, minHeight: 112 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: hot ? '#FFFFFF' : '#0071E3' }}>{pad2(no)}{no < total ? ' →' : ''}</span>
                <span style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{st.title}</span>
              </div>
            );
          }))}
        </div>
      </div>
      <figcaption style={{ fontSize: 14, lineHeight: 1.65, color: '#6E6E73', textWrap: 'pretty' }}>{fig.caption}</figcaption>
    </figure>
  );
}

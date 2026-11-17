'use client';

import React, { CSSProperties, createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FW, PROJECTS, OTHERS, DN_PROJECTS, dnStack, dnMetrics, dnLearned, TECH_USAGE, Item, Block, Case, Flow, Shot, BgFigure, ItemImg, Project,
} from '@/src/portfolio/data';

const ACCENT = '#0071E3';
// SF Pro는 애플 전용이라 웹에서 못 쓴다 — 가장 비슷한 Pretendard 하나로 통일
const FONT = '"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo",system-ui,sans-serif';
const BLUE = '#0071E3';
const CODE_FONT = 'ui-monospace,"SF Mono",SFMono-Regular,Menlo,Consolas,monospace';
const ui: CSSProperties = { fontFamily: FONT };
const wrap: CSSProperties = { maxWidth: 1160, margin: '0 auto' };
const label: CSSProperties = { ...ui, fontSize: 14, fontWeight: 600, letterSpacing: '0.01em', color: '#6E6E73' };
const sideLabel: CSSProperties = { ...label, flex: '0 0 200px', paddingTop: 4 };
const row: CSSProperties = { display: 'flex', gap: 40, flexWrap: 'wrap', padding: '40px 0', borderBottom: '1px solid #D2D2D7' };
const chip: CSSProperties = { ...ui, fontSize: 13, padding: '5px 12px', background: '#FFFFFF', border: '1px solid #D2D2D7', borderRadius: 980, color: '#1D1D1F' };
const dash: CSSProperties = { display: 'grid', gridTemplateColumns: '14px minmax(0,1fr)', gap: 8 };
const ul: CSSProperties = { margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' };
const h2Bar = (_c = '#1D1D1F'): CSSProperties => ({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 14, gap: 16, flexWrap: 'wrap' });
const h2: CSSProperties = { margin: 0, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.19, letterSpacing: '-0.025em', fontWeight: 600 };
const fwBadge = (k: keyof typeof FW): CSSProperties => ({ ...ui, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 980, background: '#FFFFFF', border: '1px solid #D2D2D7', color: FW[k].ink });

const HL: CSSProperties = { fontWeight: 600, boxShadow: 'inset 0 -0.42em 0 rgba(0,113,227,0.14)' };

// `code`, **bold** 마크업 렌더링. strong 미지정 시 bold는 평문으로 표시
function Rich({ text, strong, codeBg = '#E8E8ED', codeSize = '0.86em' }: { text: string; strong?: CSSProperties; codeBg?: string; codeSize?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((t, i) => {
        if (t.startsWith('**')) {
          const inner = t.slice(2, -2).replace(/`/g, '');
          return strong ? <strong key={i} style={strong}>{inner}</strong> : inner;
        }
        if (t.startsWith('`'))
          return <code key={i} style={{ fontFamily: CODE_FONT, fontSize: codeSize, background: codeBg, padding: '1px 6px', borderRadius: 6 }}>{t.slice(1, -1)}</code>;
        return t;
      })}
    </>
  );
}

// 이미지 확대: Detail이 ZoomCtx를 넘긴 페이지(목차가 있는 상세)에서만 그림을 버튼으로 감싼다.
// fit: 화면 안에 맞춰 보여줌(캡처 화면) / 없으면 원본 폭 이상으로 키우고 스크롤(다이어그램)
type Zoom = { src: string; alt: string; title: string; w: number; h: number; fit?: boolean };
const ZoomCtx = createContext<((z: Zoom, opener: HTMLElement) => void) | null>(null);
function Zoomable({ z, children, fallback, style }: { z: Zoom; children: React.ReactNode; fallback?: React.ReactNode; style?: CSSProperties }) {
  const open = useContext(ZoomCtx);
  if (!open) return <>{fallback ?? children}</>;
  return (
    <button type="button" aria-haspopup="dialog" aria-label={`${z.title} 크게 보기`} onClick={(e) => open(z, e.currentTarget)} style={{ display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', font: 'inherit', textAlign: 'inherit', cursor: 'zoom-in', ...style }}>
      {children}
    </button>
  );
}
const zoomOf = (img: ItemImg): Zoom => ({ src: img.src, alt: img.alt, title: img.caption || img.alt, w: img.w, h: img.h, fit: true });

// 첫 화면의 구간(projects·experience·other)으로 이동한다. 주소에는 #을 남기지 않고 /portfolio만 보인다.
// 상세 페이지에서 누르면 /portfolio로 이동한 뒤, 첫 화면이 그려지면 그 구간으로 스크롤한다(pendingSection).
let pendingSection: string | null = null;
function scrollToSection(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  const head = document.querySelector('.pf > header')?.getBoundingClientRect().height ?? 56;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - head - 8, behavior: smooth && !reduce ? 'smooth' : 'auto' });
}
function useGoSection() {
  const router = useRouter();
  return (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === '/portfolio') { scrollToSection(id, true); return; }
    pendingSection = id;
    router.push('/portfolio', { scroll: false });
  };
}

const itemText = (it: Item) => (typeof it === 'string' ? it : it.t);
const itemSubs = (it: Item) => (typeof it === 'string' ? [] : it.sub || []);

// 웹 화면과 모바일 화면을 나란히 — 모바일은 웹과 같은 높이가 되도록 아래쪽을 잘라 보여준다.
function ImgDuo({ wide, tall }: { wide: ItemImg; tall: ItemImg }) {
  const frame: CSSProperties = { border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#1D1D1F' };
  const cap: CSSProperties = { fontSize: 13, lineHeight: 1.6, color: '#6E6E73', textWrap: 'pretty' };
  return (
    <figure style={{ margin: 0, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) clamp(110px, 28%, 200px)', gridTemplateRows: 'auto auto', columnGap: 20, rowGap: 8, alignItems: 'stretch' }}>
      <Zoomable z={zoomOf(wide)}>
        <div style={frame}>
          <Image src={wide.src} alt={wide.alt} width={wide.w} height={wide.h} sizes="(max-width: 640px) 70vw, 480px" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </Zoomable>
      <Zoomable z={zoomOf(tall)} style={{ height: '100%' }}>
        <div style={{ ...frame, position: 'relative', minHeight: 0, height: '100%' }}>
          <Image src={tall.src} alt={tall.alt} fill sizes="200px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </div>
      </Zoomable>
      {(wide.caption || tall.caption) && (
        <figcaption style={{ ...cap, gridColumn: '1 / -1' }}>{[wide.caption, tall.caption].filter(Boolean).join(' ')}</figcaption>
      )}
    </figure>
  );
}

// 목록 항목 아래에 붙는 화면 캡처 + 설명
function ItemFigure({ img }: { img: ItemImg }) {
  return (
    <figure style={{ margin: '10px 0 6px', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
      <Zoomable z={zoomOf(img)}>
        <div style={{ border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#1D1D1F' }}>
          <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes="420px" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </Zoomable>
      {img.caption && <figcaption style={{ fontSize: 13, lineHeight: 1.65, color: '#6E6E73', textWrap: 'pretty' }}>{img.caption}</figcaption>}
    </figure>
  );
}

function Dashes({ items, strong, size = 15, color = '#424245', gap = 8 }: { items: Item[]; strong?: CSSProperties; size?: number; color?: string; gap?: number }) {
  return (
    <ul style={{ ...ul, gap }}>
      {items.map((it, i) => (
        <li key={i} style={{ ...dash, fontSize: size, lineHeight: 1.7, color }}>
          <span style={{ color: '#86868B' }}>–</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <span><Rich text={itemText(it)} strong={strong} /></span>
            {typeof it !== 'string' && it.img && <ItemFigure img={it.img} />}
            {itemSubs(it).map((s, j) => (
              <span key={j} style={{ paddingLeft: 14, borderLeft: '1px solid #D2D2D7', fontSize: size - 1, color: '#424245' }}>
                <Rich text={s} strong={strong} />
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

function CaseBlock({ b }: { b: Block }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {b.label && <span style={{ ...ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>{b.label}</span>}
      {b.p && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: '#1D1D1F', textWrap: 'pretty' }}><Rich text={b.p} strong={HL} /></p>}
      {b.items && b.items.length > 0 && <Dashes items={b.items} strong={{ fontWeight: 600, color: '#1D1D1F' }} size={16} color="#1D1D1F" gap={10} />}
      {b.imgs && b.imgs.length === 2 && (
        <ImgDuo wide={b.imgs[0]} tall={b.imgs[1]} />
      )}
      {b.imgs && b.imgs.length > 0 && b.imgs.length !== 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
          {b.imgs.map((img) => (
            <figure key={img.src} style={{ margin: 0, flex: img.h > img.w ? '0 0 200px' : '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Zoomable z={zoomOf(img)}>
                <div style={{ border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#1D1D1F' }}>
                  <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes={img.h > img.w ? '200px' : '(max-width: 640px) 100vw, 480px'} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </Zoomable>
              {img.caption && <figcaption style={{ fontSize: 13, lineHeight: 1.6, color: '#6E6E73', textWrap: 'pretty' }}>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {b.table && (
        <div style={{ overflowX: 'auto', borderTop: '1px solid #1D1D1F' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.6 }}>
            <thead>
              <tr>{b.table[0].map((h) => <th key={h} style={{ ...ui, textAlign: 'left', padding: '10px 16px 10px 0', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', color: '#6E6E73', borderBottom: '1px solid #D2D2D7', whiteSpace: 'nowrap' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.table.slice(1).map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: '12px 16px 12px 0', borderBottom: '1px solid #D2D2D7', verticalAlign: 'top', whiteSpace: 'pre-line' }}><Rich text={c} codeSize="0.9em" /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {b.note && (
        <div style={{ padding: '14px 18px', background: '#F5F5F7', fontSize: 14, lineHeight: 1.7, color: '#424245', borderRadius: 14 }}>
          <Rich text={b.note} codeBg="#E8E8ED" codeSize="0.9em" />
        </div>
      )}
    </div>
  );
}

const pad2 = (n: number) => String(n).padStart(2, '0');

// 홈 목록용: 플로우 전체를 작은 화면 순서대로 한 줄에 보여줌
function FlowStrip({ flow }: { flow: Flow }) {
  return (
    <div style={{ marginTop: 12 }}>
      <span style={{ ...label, fontSize: 12 }}>주요 기능 플로우</span>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, overflowX: 'auto', padding: '10px 0 6px', scrollbarWidth: 'thin', scrollbarColor: '#C7C7CC transparent' }}>
        {flow.steps.map((s, i) => (
          <React.Fragment key={s.title}>
            {i > 0 && <span style={{ ...ui, flex: '0 0 auto', alignSelf: 'center', fontSize: 12, color: '#86868B' }}>→</span>}
            <div style={{ flex: '0 0 124px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ border: '1px solid #D2D2D7', borderRadius: 10, overflow: 'hidden', background: '#1D1D1F' }}>
                <Image src={s.shot} alt={`${s.title} 화면`} width={1440} height={900} sizes="124px" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <span style={{ ...ui, fontSize: 12, color: '#424245' }}>{pad2(i + 1)} {s.title}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// 캡처 화면을 설명과 함께 가로로 넘겨 보는 갤러리 (스크롤 스냅 + 이전/다음 버튼)
function Gallery({ shots, label: aria, title, dark, counter }: { shots: Shot[]; label: string; title?: string; dark?: boolean; counter?: boolean }) {
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
        {title ? <span style={label}>{title}</span> : <span />}
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
function FlowDetail({ flow, ink, id, lead }: { flow: Flow; ink: string; id?: string; lead?: string }) {
  return (
    <div id={id} className="pf-flow" style={{ paddingTop: 72 }}>
      <div style={{ ...h2Bar(), marginBottom: 8 }}>
        <h2 style={h2}>주요 기능 플로우</h2>
      </div>
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
const CARD_COLORS = [
  { name: '실버', hex: '#E3E4E6', key: 'silver' },
  { name: '블러쉬', hex: '#E9B8BC', key: 'blush' },
  { name: '시트러스', hex: '#D6EE2B', key: 'citrus' },
  { name: '인디고', hex: '#3E4380', key: 'indigo' },
];
const cardSrcs = (k: string) => [1, 2, 3].map((n) => `/image/nova/card/${k}-${n}.png`);

function DemoSlider({ srcs, alt, resetKey, onMount }: { srcs: string[]; alt: string; resetKey: number; onMount: (id: string) => void }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [active, setActive] = useState(0);
  useEffect(() => { onMount(id); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { ref.current?.scrollTo({ left: 0, behavior: 'smooth' }); }, [resetKey]);
  const goTo = (i: number) => {
    const el = ref.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };
  // 마우스는 스와이프가 없어서 끌어서 넘길 수 있게 한다 (터치·트랙패드는 기본 스크롤 사용)
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.style.scrollSnapType = 'none';
    el.style.cursor = 'grabbing';
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el && drag.current) el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const onUp = () => {
    const el = ref.current;
    if (!el || !drag.current) return;
    drag.current = null;
    el.style.cursor = 'grab';
    const i = Math.round(el.scrollLeft / el.clientWidth);
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
    setTimeout(() => { el.style.scrollSnapType = 'x mandatory'; }, 350);
  };
  const arrow = (side: 'left' | 'right', on: boolean): CSSProperties => ({ position: 'absolute', top: '50%', [side]: 10, transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: 99, border: 'none', background: 'rgba(245,245,247,0.85)', color: '#1D1D1F', fontSize: 16, cursor: on ? 'pointer' : 'default', opacity: on ? 1 : 0.35 });
  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={ref}
        className="pf-noscroll"
        onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', aspectRatio: '1 / 1', background: '#1D1D1F', cursor: 'grab', userSelect: 'none', touchAction: 'pan-x pan-y' }}
      >
        {srcs.map((src, i) => (
          <div key={src} style={{ position: 'relative', flex: '0 0 100%', scrollSnapAlign: 'start' }}>
            <Image src={src} alt={`${alt} 사진 ${i + 1}/${srcs.length}`} fill sizes="320px" draggable={false} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
        ))}
      </div>
      <button type="button" aria-label="이전 사진" disabled={active <= 0} onClick={() => goTo(active - 1)} style={arrow('left', active > 0)}>‹</button>
      <button type="button" aria-label="다음 사진" disabled={active >= srcs.length - 1} onClick={() => goTo(active + 1)} style={arrow('right', active < srcs.length - 1)}>›</button>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 4, display: 'flex', justifyContent: 'center' }}>
        {srcs.map((s, i) => (
          <button key={s} type="button" aria-label={`${i + 1}번째 사진`} onClick={() => goTo(i)} style={{ width: 22, height: 22, border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: i === active ? '#F5F5F7' : 'rgba(245,245,247,0.35)' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductCardDemo() {
  const [mode, setMode] = useState<'before' | 'after'>('before');
  const [color, setColor] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [remounts, setRemounts] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const seen = useRef(new Set<string>());
  const c = CARD_COLORS[color];
  const pick = (i: number) => {
    if (i === color) return;
    setColor(i); setClicks((n) => n + 1); setResetKey((n) => n + 1);
  };
  // 슬라이더 인스턴스가 새로 만들어질 때마다 useId가 달라진다 — 처음 한 번을 뺀 개수를 센다
  const onMount = (id: string) => {
    if (seen.current.has(id)) return;
    seen.current.add(id);
    setRemounts(seen.current.size - 1);
  };
  const switchMode = (m: 'before' | 'after') => {
    if (m === mode) return;
    seen.current = new Set(); setRemounts(0); setClicks(0); setMode(m);
  };
  const seg = (on: boolean): CSSProperties => ({ font: 'inherit', fontSize: 14, fontWeight: 600, padding: '9px 16px', borderRadius: 980, border: 'none', cursor: 'pointer', background: on ? '#1D1D1F' : 'transparent', color: on ? '#fff' : '#1D1D1F' });
  return (
    <div style={{ background: '#F5F5F7', borderRadius: 28, padding: 28, display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' }}>
      <div style={{ position: 'relative', flex: '0 0 auto', width: 'min(320px, 100%)', borderRadius: 20, overflow: 'hidden', background: '#1D1D1F', color: '#F5F5F7' }}>
        <span style={{ ...ui, position: 'absolute', top: 10, left: 10, zIndex: 1, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 980, background: mode === 'before' ? '#F5F5F7' : BLUE, color: mode === 'before' ? '#1D1D1F' : '#FFFFFF' }}>{mode === 'before' ? '수정 전 · key로 재생성' : '수정 후 · activeIndex만 초기화'}</span>
        <DemoSlider key={mode === 'before' ? c.key : 'fixed'} srcs={cardSrcs(c.key)} alt={`맥북 프로 14 ${c.name}`} resetKey={resetKey} onMount={onMount} />
        <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 17, fontWeight: 600 }}>맥북 프로 14 <span style={{ fontWeight: 400, color: '#A1A1A6' }}>· {c.name}</span></div>
          <div role="radiogroup" aria-label="색상" style={{ display: 'flex', gap: 10 }}>
            {CARD_COLORS.map((x, i) => (
              <button key={x.key} type="button" role="radio" aria-checked={i === color} aria-label={x.name} onClick={() => pick(i)}
                style={{ width: 32, height: 32, borderRadius: 99, background: x.hex, border: 'none', cursor: 'pointer', boxShadow: i === color ? '0 0 0 2px #1D1D1F, 0 0 0 4px #F5F5F7' : '0 0 0 1px rgba(255,255,255,0.25)' }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', gap: 4, padding: 4, borderRadius: 980, background: '#E8E8ED' }} role="group" aria-label="비교할 버전">
          <button type="button" aria-pressed={mode === 'before'} onClick={() => switchMode('before')} style={seg(mode === 'before')}>수정 전</button>
          <button type="button" aria-pressed={mode === 'after'} onClick={() => switchMode('after')} style={seg(mode === 'after')}>수정 후</button>
        </div>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          <div><div style={{ fontSize: 13, color: '#6E6E73' }}>색상 변경 횟수</div><div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em' }}>{clicks}</div></div>
          <div><div style={{ fontSize: 13, color: '#6E6E73' }}>슬라이더 재생성 횟수</div><div aria-live="polite" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', color: remounts > 0 ? '#0071E3' : '#1D1D1F' }}>{remounts}</div></div>
        </div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#424245', textWrap: 'pretty' }}>
          <strong style={{ color: '#1D1D1F' }}>{mode === 'before' ? '수정 전: ' : '수정 후: '}</strong>
          {mode === 'before'
            ? <>슬라이더의 <code style={{ fontFamily: CODE_FONT, fontSize: '0.9em', background: '#E8E8ED', padding: '1px 6px', borderRadius: 6 }}>key</code>에 사진 목록을 연결한 방식입니다. 색상이 바뀔 때마다 슬라이더를 제거하고 다시 생성합니다.</>
            : <>슬라이더는 그대로 두고 사진과 현재 위치만 바꿉니다. 색상을 바꿔도 슬라이더를 다시 생성하지 않습니다.</>}
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#6E6E73', textWrap: 'pretty' }}>사진을 옆으로 넘긴 뒤 색상을 바꿔 보세요. 두 버전 모두 첫 장으로 돌아가지만, 수정 전에는 색상을 바꿀 때마다 재생성 횟수가 1씩 늘고 수정 후에는 0으로 유지됩니다. 실제 앱의 카드를 단순화한 데모로, 실제 앱은 Swiper를 사용하며 여기서는 같은 구조를 CSS 스크롤 스냅으로 재현했습니다.</p>
      </div>
    </div>
  );
}

// 기획 배경용: 처리 단계를 '누가 응답하는지' 구간별로 묶어 보여줌
function BgFigureView({ fig }: { fig: BgFigure }) {
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


type Toc = NonNullable<Project['toc']>;

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
                    {/* 보조 구현은 대표 사례와 구분해 작은 제목 아래에 둔다 */}
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
function TocRail({ toc, active, go }: { toc: Toc; active: string; go: (id: string) => void }) {
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
function TocMobile({ toc, active, go }: { toc: Toc; active: string; go: (id: string) => void }) {
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

function Detail({ idx, onSection }: { idx: number; onSection: (s: string) => void }) {
  const p = PROJECTS[idx];
  // 지금 화면 위쪽에 걸린 구간(핵심 구현·트러블슈팅)을 헤더에 알린다.
  useEffect(() => {
    if (p.toc) return () => onSection(''); // 목차가 있으면 아래 목차 활성 항목을 헤더에 쓴다
    const spots: [string, string][] = [['sec-core', '핵심 구현'], ['sec-trouble', '트러블슈팅']];
    const onScroll = () => {
      let current = '';
      for (const [id, label] of spots) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom > 120) current = label;
      }
      onSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); onSection(''); };
  }, [idx, onSection, p.toc]);
  // 페이지 안 목차 (목차가 있는 상세만): 고정 헤더 높이를 재서 앵커 이동·활성 판정 기준으로 쓴다
  const goSection = useGoSection();
  const toc = p.toc;
  const [headH, setHeadH] = useState(56);
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!toc) return;
    const header = document.querySelector<HTMLElement>('.pf > header');
    if (!header) return;
    const measure = () => setHeadH(Math.round(header.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, [toc]);
  useEffect(() => {
    if (!toc) return;
    const onScroll = () => {
      const line = headH + 40;
      const top = (id: string) => document.getElementById(id)?.getBoundingClientRect();
      let cur = toc[0].id;
      let parent = toc[0];
      for (const t of toc) { const r = top(t.id); if (r && r.top <= line) { cur = t.id; parent = t; } }
      for (const c of parent.children ?? []) { const r = top(c.id); if (r && r.top <= line && r.bottom > line) cur = c.id; }
      // 페이지 끝에서는 마지막 섹션이 기준선까지 올라오지 못한다 — 끝에 닿으면 마지막 항목을 표시
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = toc[toc.length - 1].id;
      setActive(cur);
      onSection(cur === toc[0].id ? '' : (toc.find((t) => t.id === cur || t.children?.some((c) => c.id === cur))?.label ?? ''));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [toc, headH, onSection]);
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headH - 24, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#' + id);
    // 키보드 사용자가 이동한 곳에서 이어 읽도록 포커스도 옮긴다
    el.setAttribute('tabindex', '-1');
    el.style.outline = 'none'; // 섹션 전체에 포커스 테두리가 생기지 않게
    el.focus({ preventScroll: true });
    setActive(id);
  };
  const fw = FW[p.fw];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const sections: [string, Case[]][] = [['핵심 구현', p.core]];
  if (p.trouble.length) sections.push(['트러블슈팅', p.trouble]);
  const pad = (n: number) => String(n).padStart(2, '0');
  // 시스템 구성도·데이터 모델: 클릭하면 모달로 크게 본다 (Home 모달과 같은 방식)
  const diagrams = [
    p.archImg && { src: p.archImg, title: '시스템 구성', alt: `${p.name} 시스템 구성도`, w: 1100, h: 800 },
    p.erdImg && { src: p.erdImg, title: '데이터 모델', alt: `${p.name} 데이터 모델 ERD`, w: 1100, h: 810 },
  ].filter((d): d is Zoom => !!d);
  const [zoom, setZoom] = useState<Zoom | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openZoom = (z: Zoom, el: HTMLElement) => { opener.current = el; setZoom(z); };
  // 열려 있는 동안: Esc로 닫기, 뒤 화면 스크롤 잠금. 닫으면 눌렀던 그림 버튼으로 포커스를 돌려준다
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(null);
      // Tab이 모달 밖으로 나가지 않게 처음·끝에서 돌린다
      if (e.key === 'Tab' && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [tabindex="0"]'));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const btn = opener.current;
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; btn?.focus(); };
  }, [zoom]);
  // 왼쪽 라벨 + 오른쪽 Block 목록 (기획·디자인·배포와 운영)
  const blockRow = (title: string, blocks?: Block[], id?: string) => blocks && (
    <div id={toc ? id : undefined} style={row}>
      <div style={sideLabel}>{title}</div>
      <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0, maxWidth: 760 }}>
        {blocks.map((b, j) => <CaseBlock key={j} b={b} />)}
      </div>
    </div>
  );

  const body = (
    <>
      <Link href="/portfolio" onClick={goSection('projects')} className="pf-link" style={{ display: 'inline-flex', gap: 8, fontSize: 17, padding: '6px 0' }}>‹ 전체 프로젝트</Link>
      <div id={toc ? 'sec-intro' : undefined} style={{ padding: '40px 0 56px', borderBottom: '1px solid #D2D2D7' }}>
        <div style={{ ...ui, display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, flexWrap: 'wrap' }}>
          <span style={{ color: BLUE }}>{p.no}</span>
          <span style={fwBadge(p.fw)}>{fw.label}</span>
          <span style={{ color: '#6E6E73' }}>{p.kind}</span>
        </div>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(44px,7vw,96px)', lineHeight: 1.02, letterSpacing: '-0.045em', fontWeight: 600 }}>{p.name}</h1>
        <div style={{ marginTop: 12, fontSize: 20, color: '#424245' }}>{p.kr}</div>
        <p style={{ margin: '28px 0 0', fontSize: 19, lineHeight: 1.7, maxWidth: '56ch', textWrap: 'pretty' }}>{p.tagline}</p>
        {p.focus && (
          <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px solid #D2D2D7', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 820 }}>
            <span style={{ ...label, fontSize: 13 }}>핵심 과제</span>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, fontWeight: 600, letterSpacing: '-0.01em', textWrap: 'pretty' }}>{p.focus.lead}</p>
            <Dashes items={p.focus.items} strong={{ color: '#1D1D1F', fontWeight: 600 }} size={16} gap={10} />
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', borderBottom: '1px solid #D2D2D7' }}>
        {p.meta.map(([k, v]) => (
          <div key={k} style={{ padding: '20px 20px 22px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...label, fontSize: 12 }}>{k}</span>
            <span style={{ fontSize: 15, lineHeight: 1.55 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', padding: '20px 0', borderBottom: '1px solid #D2D2D7', fontSize: 15 }}>
        {p.links.map(([l, url]) => <a key={url} href={url} target="_blank" className="pf-pill" style={{ display: 'inline-flex', gap: 6, padding: '9px 18px', border: '1px solid #0071E3', borderRadius: 980 }}>{l} ↗</a>)}
      </div>

      {p.shots && (
        <div id={toc ? 'sec-shots' : undefined} style={{ ...row, flexDirection: 'column', flexWrap: 'nowrap', gap: 24 }}>
          {Array.from(new Set(p.shots.map((x) => x.group ?? ''))).map((g) => (
            <Gallery key={g} title={g} label={`${p.name} ${g} 화면`} shots={p.shots!.filter((x) => (x.group ?? '') === g)} />
          ))}
        </div>
      )}

      {p.background && (
        <div id={toc ? 'sec-background' : undefined} style={row}>
          <div style={sideLabel}>기획 배경</div>
          <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, maxWidth: 720 }}>
            {p.background.map((t, i) => (
              <React.Fragment key={i}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, textWrap: 'pretty' }}><Rich text={t} strong={HL} /></p>
                {p.bgFigure && p.bgFigure.after === i + 1 && <BgFigureView fig={p.bgFigure} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {p.scope && (
        <div style={row}>
          <div style={sideLabel}>{toc ? '역할과 담당 업무' : '역할 구분'}</div>
          <div style={{ flex: '1 1 480px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px 40px', minWidth: 0 }}>
            {p.scope.map((g, i) => (
              <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: i ? BLUE : '#1D1D1F' }}>{g.label}</span>
                {g.note && <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6E6E73', textWrap: 'pretty' }}>{g.note}</span>}
                <Dashes items={g.items} />
                {i === p.scope!.length - 1 && p.duties.map((d) => (
                  <div key={d.group} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                    <span style={{ ...label, fontSize: 12 }}>{d.group}</span>
                    <Dashes items={d.items} strong={{ color: '#1D1D1F', fontWeight: 600 }} size={14} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {p.timeline && (
        <div style={row}>
          <div style={sideLabel}>진행 과정</div>
          <ol style={{ ...ul, flex: '1 1 480px', minWidth: 0, maxWidth: 760 }}>
            {p.timeline.map((t, i) => (
              <li key={t.when} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 24px', padding: '16px 0', borderTop: i ? '1px solid #D2D2D7' : undefined }}>
                <span style={{ ...ui, flex: '0 0 140px', fontSize: 13, lineHeight: 1.75, color: BLUE }}>{t.when}</span>
                <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{t.title}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: '#424245', textWrap: 'pretty' }}>{t.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {blockRow('기획', p.planning, 'sec-planning')}
      {blockRow('디자인', p.design)}

      {p.flow && <FlowDetail flow={p.flow} ink={BLUE} id={toc ? 'sec-flow' : undefined} lead={p.leads?.flow} />}

      <div id={toc ? 'sec-stack' : undefined} style={row}>
        <div style={sideLabel}>기술 스택</div>
        {p.stackGroups ? (
          <dl style={{ flex: '1 1 480px', margin: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {p.stackGroups.map((g) => (
              <div key={g.label} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 16px' }}>
                <dt style={{ ...label, flex: '0 0 120px', fontSize: 13 }}>{g.label}</dt>
                <dd style={{ margin: 0, flex: '1 1 240px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {g.items.map((x) => <span key={x} style={{ ...chip, fontSize: 12, padding: '6px 10px', color: undefined }}>{x}</span>)}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div style={{ flex: '1 1 480px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.stack.map((s) => <span key={s} style={{ ...chip, fontSize: 12, padding: '6px 10px', color: undefined }}>{s}</span>)}
          </div>
        )}
      </div>

      {!p.scope && <div style={row}>
        <div style={sideLabel}>담당 업무</div>
        <div style={{ flex: '1 1 480px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px 40px' }}>
          {p.duties.map((g) => (
            <div key={g.group} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{g.group}</span>
              <Dashes items={g.items} strong={{ color: '#1D1D1F', fontWeight: 600 }} />
            </div>
          ))}
        </div>
      </div>}

      {diagrams.length > 0 && (
        <div id={toc ? 'sec-arch' : undefined} style={{ ...row, flexDirection: 'column', flexWrap: 'nowrap', gap: 16 }}>
          {/* 둘이면 좌우로, 좁은 화면이나 하나뿐이면 전체 폭으로 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: 24, alignItems: 'start' }}>
            {diagrams.map((d) => (
              <div key={d.src} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
                <span style={label}>{d.title}</span>
                <button type="button" aria-haspopup="dialog" aria-label={`${d.title} 그림 크게 보기`} onClick={(e) => openZoom(d, e.currentTarget)} style={{ display: 'block', width: '100%', padding: 0, border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#fff', cursor: 'zoom-in' }}>
                  <Image src={d.src} alt={d.alt} width={d.w} height={d.h} unoptimized style={{ width: '100%', height: 'auto', display: 'block' }} />
                </button>
              </div>
            ))}
          </div>
          <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>클릭하면 크게 볼 수 있습니다.</span>
        </div>
      )}

      {zoom && (
        <div onClick={() => setZoom(null)} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="zoom-title" onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 28, width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '16px 16px 12px 28px' }}>
              <span id="zoom-title" style={label}>{zoom.title}</span>
              <button type="button" aria-label="닫기" autoFocus onClick={() => setZoom(null)} className="pf-arrow" style={{ flex: '0 0 auto', width: 40, height: 40, borderRadius: 99, border: 'none', background: 'rgba(232,232,237,0.8)', color: '#1D1D1F', fontSize: 20, lineHeight: 1, cursor: 'pointer' }}>×</button>
            </div>
            {/* 모달 폭에 맞춰 키우되 원본 폭 아래로는 줄이지 않는다 — 넘치면 여기서 스크롤 */}
            <div tabIndex={0} aria-label={`${zoom.title} 그림`} style={{ flex: '1 1 auto', minHeight: 0, overflow: 'auto', padding: '0 28px 28px', scrollbarWidth: 'thin', scrollbarColor: '#C7C7CC transparent' }}>
              {zoom.fit
                ? <Image src={zoom.src} alt={zoom.alt} width={zoom.w} height={zoom.h} sizes="100vw" style={{ display: 'block', margin: '0 auto', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: 'calc(100dvh - 150px)' }} />
                : <Image src={zoom.src} alt={zoom.alt} width={zoom.w} height={zoom.h} unoptimized style={{ width: '100%', minWidth: zoom.w, height: 'auto', display: 'block' }} />}
            </div>
          </div>
        </div>
      )}

      {!p.archImg && p.arch && (
        <div style={row}>
          <div style={sideLabel}>시스템 구성</div>
          <pre style={{ fontFamily: CODE_FONT, flex: '1 1 480px', margin: 0, padding: 24, background: '#1D1D1F', color: '#F5F5F7', borderRadius: 18, fontSize: 13, lineHeight: 1.7, overflowX: 'auto' }}>{p.arch}</pre>
        </div>
      )}

      {sections.map(([title, cases]) => (
        <div key={title} id={title === '트러블슈팅' ? 'sec-trouble' : 'sec-core'} style={{ paddingTop: 72 }}>
          <div style={{ ...h2Bar(), marginBottom: 8 }}>
            <h2 style={h2}>{title}</h2>
            <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>{pad(cases.length)}</span>
          </div>
          {(title === '트러블슈팅' ? p.leads?.trouble : p.leads?.core) && (
            <p style={{ margin: '4px 0 12px', fontSize: 17, lineHeight: 1.7, color: '#424245', maxWidth: 760, textWrap: 'pretty' }}>{title === '트러블슈팅' ? p.leads?.trouble : p.leads?.core}</p>
          )}
          {cases.map((c, i) => {
            const hasSub = cases.some((x) => x.sub);
            return (
              <React.Fragment key={c.title}>
                {c.sub && !cases[i - 1]?.sub && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 40px', padding: '44px 0 4px' }}>
                    <span style={{ ...sideLabel, color: '#1D1D1F' }}>보조 구현</span>
                    <span style={{ flex: '1 1 480px', fontSize: 15, lineHeight: 1.7, color: '#6E6E73' }}>대표 사례를 뒷받침하는 기반 작업입니다.</span>
                  </div>
                )}
                <div id={c.id} style={{ ...row, padding: c.sub ? '28px 0' : '36px 0' }}>
                  <div style={{ flex: '0 0 200px' }}>
                    <span style={{ ...ui, fontSize: c.sub ? 20 : 28, fontWeight: 500, color: c.sub ? '#86868B' : BLUE }}>{pad(i + 1)}</span>
                  </div>
                  <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0, maxWidth: 760 }}>
                    {hasSub && !c.sub && <span style={{ ...ui, margin: '0 0 -14px', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: BLUE }}>대표 사례</span>}
                    <h3 style={{ margin: 0, fontSize: c.sub ? 19 : 22, lineHeight: 1.4, letterSpacing: '-0.02em', fontWeight: 600, textWrap: 'balance' }}><Rich text={c.title} codeSize="0.82em" /></h3>
                    {c.tags && c.tags.length > 0 && (
                      <ul role="list" style={{ listStyle: 'none', margin: '-8px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {c.tags.map((t) => <li key={t} style={{ ...chip, fontSize: 12, padding: '6px 10px', color: undefined }}>{t}</li>)}
                      </ul>
                    )}
                    {c.demo === 'productCard' && <ProductCardDemo />}
                    {c.blocks.map((b, j) => <CaseBlock key={j} b={b} />)}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ))}

      {blockRow('배포와 운영', p.ops, 'sec-ops')}

      <div id={toc ? 'sec-verify' : undefined} style={{ ...row, padding: '72px 0 40px' }}>
        <div style={sideLabel}>{p.verifyTitle}</div>
        <div style={{ flex: '1 1 480px', minWidth: 0, maxWidth: 760 }}>
          {p.verifyGroups ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {p.leads?.verify && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#424245', textWrap: 'pretty' }}>{p.leads.verify}</p>}
              {p.verifyGroups.map((g) => {
                const tone = g.sub ? { size: 14, color: '#6E6E73' } : { size: 15, color: '#424245' };
                return (
                  <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 12, ...(g.sub ? { paddingTop: 28, borderTop: '1px solid #E8E8ED' } : {}) }}>
                    <span style={{ fontSize: g.sub ? 14 : 15, fontWeight: 600, color: g.sub ? '#6E6E73' : '#1D1D1F' }}>{g.sub ? `보조 · ${g.label}` : g.label}</span>
                    {g.metrics && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '16px 28px', margin: '4px 0 8px' }}>
                        {g.metrics.map((m) => (
                          <div key={m.k} style={{ borderTop: '1px solid #D2D2D7', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <span style={{ ...ui, fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{m.v}</span>
                            <span style={{ fontSize: 13, lineHeight: 1.55, color: '#6E6E73', textWrap: 'pretty' }}>{m.k}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {g.scenarios && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                        <span style={{ ...label, fontSize: 12 }}>대표 시나리오</span>
                        <Dashes items={g.scenarios} strong={{ color: '#1D1D1F', fontWeight: 600 }} size={15} color="#1D1D1F" gap={8} />
                      </div>
                    )}
                    {g.lead && <p style={{ margin: 0, fontSize: tone.size, lineHeight: 1.7, color: tone.color, textWrap: 'pretty' }}>{g.lead}</p>}
                    <Dashes items={g.items} strong={{ color: g.sub ? '#424245' : '#1D1D1F', fontWeight: 600 }} size={tone.size} color={tone.color} gap={10} />
                    {g.extra && (g.extraLabel ? (
                      <details style={{ marginTop: 8 }}>
                        <summary className="pf-summary">{g.extraLabel}</summary>
                        <div style={{ marginTop: 16 }}><CaseBlock b={g.extra} /></div>
                      </details>
                    ) : <div style={{ marginTop: 16 }}><CaseBlock b={g.extra} /></div>)}
                  </div>
                );
              })}
            </div>
          ) : (() => {
            const cut = p.verifyExtra ? (p.verifyExtraAfter ?? p.verify.length) : p.verify.length;
            const strong = { color: '#1D1D1F', fontWeight: 600 } as const;
            return (
              <>
                <Dashes items={p.verify.slice(0, cut)} strong={strong} gap={10} />
                {p.verifyExtra && <div style={{ margin: '28px 0' }}><CaseBlock b={p.verifyExtra} /></div>}
                {cut < p.verify.length && <Dashes items={p.verify.slice(cut)} strong={strong} gap={10} />}
              </>
            );
          })()}
        </div>
      </div>

      <Link href={'/portfolio/' + next.slug} className="pf-next" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '40px 0', borderBottom: '1px solid #D2D2D7' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>다음 프로젝트 · {next.no}</span>
          <span style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.035em' }}>{next.name}</span>
        </div>
        <span style={{ fontSize: 32 }}>→</span>
      </Link>
    </>
  );

  return (
    <ZoomCtx.Provider value={toc ? openZoom : null}>
      <article className={toc ? 'pf-ux' : undefined} style={{ ...wrap, padding: '56px 32px 96px', ...(toc ? { ['--pf-head' as string]: `${headH}px` } : {}) }}>
        {/* 키보드로는 목차를 먼저 만나도록 본문보다 앞에 둔다(화면에서는 오른쪽 끝에 고정) */}
        {toc && <TocRail toc={toc} active={active} go={go} />}
        {body}
        {toc && <TocMobile toc={toc} active={active} go={go} />}
      </article>
    </ZoomCtx.Provider>
  );
}

function Home() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sel = OTHERS.find((o) => o.id === openId);
  // 모달이 열려 있는 동안: Esc로 닫기, 뒤 화면 스크롤 잠금
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenId(null); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [openId]);
  const contactRow: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid #D2D2D7', fontSize: 14 };
  const vue = FW.vue;

  return (
    <>
      <section style={{ ...wrap, padding: '96px 32px 112px', textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '0.01em' }}>김혜진 · Frontend Developer</div>
        <h1 style={{ margin: '16px auto 0', fontSize: 'clamp(38px,6vw,72px)', lineHeight: 1.1, letterSpacing: '-0.035em', fontWeight: 600, maxWidth: '16ch', textWrap: 'balance' }}>사용자도, 팀도 막히지 않게 만드는 프론트엔드 개발자입니다.</h1>
        <div style={{ margin: '48px auto 0', maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 18, fontSize: 19, lineHeight: 1.7, color: '#424245', textWrap: 'pretty' }}>
          <p style={{ margin: 0 }}>사용자가 막히는 지점을 출시 전에 찾아내고, 실제 서비스 현장에서 문제를 해결해 왔습니다. 디엔소프트에서 3일간 754명이 참여한 박람회 이벤트의 현장 장애 대응을 맡았고, 100개 이상의 초등학교가 사용한 관리자 시스템을 일정 안에 오픈했습니다.</p>
          <p style={{ margin: 0 }}>다른 파트의 일정이 늦어져도 팀이 기다리지 않도록 공통 스타일과 MSW 목 API를 먼저 준비하고, 성능 문제는 측정을 통해 병목을 찾아 개선합니다. NEXT GACHA 홈에서는 하이드레이션 이후 순차적으로 실행되던 데이터 요청이 LCP 병목임을 확인하고 이를 서버 렌더링 단계로 옮겨, 모바일 실측 LCP를 3.28s에서 1.78s로 줄였습니다(Lighthouse 3회 측정 중앙값).</p>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: '12px 28px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:khj000217@gmail.com" className="pf-btn">이메일 보내기</a>
          <a href="https://github.com/llmeajinll" target="_blank" className="pf-link" style={{ fontSize: 17 }}>GitHub ›</a>
          <a href="https://velog.io/@llmeajinll/posts" target="_blank" className="pf-link" style={{ fontSize: 17 }}>Velog ›</a>
        </div>
      </section>

      <section id="projects" style={{ ...wrap, padding: '48px 32px 112px' }}>
        <div style={{ ...h2Bar(), marginBottom: 24 }}>
          <h2 style={h2}>Projects</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {PROJECTS.map((p) => {
            const fw = FW[p.fw];
            return (
              <Link key={p.slug} href={'/portfolio/' + p.slug} className="pf-row" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '48px 48px 40px', borderRadius: 28, background: '#F5F5F7', color: '#1D1D1F' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={fwBadge(p.fw)}>{fw.label}</span>
                  {p.ongoing && <span style={{ ...ui, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 980, background: '#0071E3', color: '#fff' }}>진행 중</span>}
                  <span style={{ fontSize: 14, color: '#6E6E73' }}>{p.period} · {p.roleShort}</span>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(34px,4.4vw,56px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{p.name}</div>
                  <div style={{ marginTop: 8, fontSize: 19, fontWeight: 600, color: '#6E6E73' }}>{p.kr}</div>
                </div>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#424245', maxWidth: '62ch', textWrap: 'pretty' }}>{p.tagline}</p>
                {p.highlights && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 760 }}>
                    <span style={{ ...label, fontSize: 13 }}>주요 기술 과제</span>
                    <Dashes items={p.highlights} strong={{ color: '#1D1D1F', fontWeight: 600 }} gap={6} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.stackShort.map((s) => <span key={s} style={chip}>{s}</span>)}
                </div>
                {p.flow && <FlowStrip flow={p.flow} />}
                <span className="pf-link" style={{ fontSize: 17 }}>자세히 보기 ›</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="experience" style={{ background: '#000000', color: '#F5F5F7' }}>
        <div style={{ ...wrap, padding: '112px 32px' }}>
          <div style={h2Bar('#F5F5F7')}>
            <h2 style={h2}>Experience</h2>
            <span style={{ ...ui, fontSize: 12, color: '#86868B' }}>2023.09.04 ~ 2024.03.31 · 약 7개월</span>
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', padding: '40px 0 48px', borderBottom: '1px solid #424245' }}>
            <div style={{ flex: '1 1 360px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.1 }}>디엔소프트</span>
                <span style={fwBadge('vue')}>{vue.label}</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 16, color: '#86868B' }}>Frontend 개발자 (계약직) · Frontend 개발 · 초기 레이아웃 디자인</div>
              <p style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.7, maxWidth: '52ch', textWrap: 'pretty' }}>실서비스 4건을 개발했습니다. 전시회 현장 이벤트에서는 3일간 754명이 참여했고, 관리자 시스템은 100개 이상의 초등학교에서 사용되었습니다.</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 24 }}>
                {dnStack.map((s) => <span key={s} style={{ ...ui, fontSize: 13, padding: '5px 12px', border: '1px solid #424245', borderRadius: 980, color: '#D2D2D7' }}>{s}</span>)}
              </div>
            </div>
            <div style={{ flex: '1 1 380px', display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 12, alignSelf: 'start' }}>
              {dnMetrics.map((m) => (
                <div key={m.k} style={{ background: '#1D1D1F', borderRadius: 20, padding: '24px 24px 26px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 'clamp(26px,2.8vw,36px)', fontWeight: 600, letterSpacing: '-0.03em', color: vue.inkDark }}>{m.v}</span>
                  <span style={{ fontSize: 13, color: '#86868B', lineHeight: 1.5 }}>{m.k}</span>
                </div>
              ))}
            </div>
          </div>
          {DN_PROJECTS.map((d) => (
            <div key={d.no} style={{ display: 'flex', gap: 40, flexWrap: 'wrap', padding: '40px 0', borderBottom: '1px solid #424245' }}>
              <div style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ ...ui, fontSize: 12, color: vue.inkDark }}>{d.no}</span>
                <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{d.name}</span>
                <span style={{ ...ui, fontSize: 12, color: '#86868B' }}>{d.period}</span>
                <span style={{ ...ui, fontSize: 12, color: '#86868B' }}>{d.team}</span>
              </div>
              <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#D2D2D7', textWrap: 'pretty' }}>{d.desc}</p>
                {d.blocks.map((b) => (
                  <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{b.label}</span>
                    <ul style={{ ...ul, gap: 8 }}>
                      {b.items.map((it, i) => (
                        <li key={i} style={{ ...dash, fontSize: 15, lineHeight: 1.7, color: '#D2D2D7' }}>
                          <span style={{ color: '#6E6E73' }}>–</span>
                          <span><Rich text={itemText(it)} strong={{ color: '#F5F5F7', fontWeight: 600 }} codeBg="#1D1D1F" /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', padding: '40px 0 0' }}>
            <div style={{ flex: '0 0 260px', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>실무에서 배운 점</div>
            <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {dnLearned.map((l) => (
                <div key={l.t} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{l.t}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: '#D2D2D7' }}>{l.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="other" style={{ ...wrap, padding: '112px 32px' }}>
        <div style={h2Bar()}>
          <h2 style={h2}>Other Projects</h2>
          <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>03</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {OTHERS.map((o) => {
            const fw = FW[o.fw];
            return (
              <div key={o.id} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '32px 28px 28px', borderRadius: 28, background: '#F5F5F7' }}>
                <div style={{ ...ui, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 12, color: '#6E6E73' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={fwBadge(o.fw)}>{fw.label}</span>{o.kind}</span>
                  <span>{o.period}</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{o.name}</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#424245', textWrap: 'pretty' }}>{o.tagline}</p>
                {o.award && <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}>{o.award}</div>}
                <div style={{ ...ui, fontSize: 12, lineHeight: 1.6, color: '#424245' }}>{o.role} · {o.team}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {o.stack.map((s) => <span key={s} style={chip}>{s}</span>)}
                </div>
                <div style={{ ...ui, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    {o.links.map(([l, url]) => <a key={url} href={url} target="_blank" className="pf-link">{l} ↗</a>)}
                  </div>
                  <button type="button" aria-haspopup="dialog" onClick={() => setOpenId(o.id)} className="pf-pill" style={{ font: 'inherit', border: '1px solid #0071E3', borderRadius: 980, padding: '7px 16px', cursor: 'pointer' }}>
                    자세히
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {sel && (
        <div onClick={() => setOpenId(null)} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div role="dialog" aria-modal="true" aria-labelledby="other-title" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', background: '#fff', borderRadius: 28, width: 'min(760px, 100%)', maxHeight: '88vh', overflowY: 'auto', padding: '44px 40px 36px', scrollbarWidth: 'thin', scrollbarColor: '#C7C7CC transparent' }}>
            <button type="button" aria-label="닫기" autoFocus onClick={() => setOpenId(null)} className="pf-arrow" style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 99, border: 'none', background: 'rgba(232,232,237,0.8)', color: '#1D1D1F', fontSize: 20, lineHeight: 1, cursor: 'pointer' }}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 13, color: '#6E6E73', paddingRight: 48 }}>
              <span style={fwBadge(sel.fw)}>{FW[sel.fw].label}</span>{sel.kind}<span>· {sel.period}</span>
            </div>
            <h3 id="other-title" style={{ margin: '14px 0 0', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{sel.name}</h3>
            <p style={{ margin: '12px 0 0', fontSize: 17, lineHeight: 1.65, color: '#424245', textWrap: 'pretty' }}>{sel.tagline}</p>
            {sel.award && <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: ACCENT }}>{sel.award}</div>}
            <div style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, color: '#6E6E73' }}>{sel.role} · {sel.team}<br />{sel.scale}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
              {sel.stack.map((s) => <span key={s} style={chip}>{s}</span>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 28, paddingTop: 28, borderTop: '1px solid #D2D2D7' }}>
              {sel.blocks.map((b) => (
                <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{b.label}</span>
                  <ul style={{ ...ul, gap: 12 }}>
                    {b.items.map((it, i) => (
                      <li key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15, lineHeight: 1.7, color: '#424245' }}>
                        <span><Rich text={itemText(it)} strong={{ color: '#1D1D1F', fontWeight: 600 }} /></span>
                        {itemSubs(it).map((x, j) => (
                          <span key={j} style={{ paddingLeft: 14, borderLeft: '1px solid #D2D2D7', color: '#6E6E73' }}><Rich text={x} strong={{ color: '#1D1D1F', fontWeight: 600 }} /></span>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 28, fontSize: 15 }}>
              {sel.links.map(([l, url]) => <a key={url} href={url} target="_blank" className="pf-link">{l} ↗</a>)}
            </div>
          </div>
        </div>
      )}

      <section id="about" style={{ ...wrap, padding: '0 32px 96px' }}>
        <div style={{ borderTop: '1px solid #D2D2D7', paddingTop: 32, marginBottom: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={label}>기술과 사용처</span>
          <dl style={{ margin: 0 }}>
            {TECH_USAGE.map(([t, d]) => (
              <div key={t} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 40px', padding: '14px 0', borderBottom: '1px solid #E8E8ED' }}>
                <dt style={{ flex: '0 0 200px', fontSize: 16, fontWeight: 600 }}>{t}</dt>
                <dd style={{ margin: 0, flex: '1 1 320px', minWidth: 0, fontSize: 16, lineHeight: 1.6, color: '#424245' }}>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 40, borderTop: '1px solid #D2D2D7', paddingTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={label}>협업 · AI 도구</span>
            <span style={{ fontSize: 17, lineHeight: 1.7 }}>GitHub · Figma · Notion<br />Slack · Jira<br />Claude Code · Chrome MCP · Figma MCP<br />CodeRabbit · OpenWiki</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={label}>학력</span>
            <span style={{ fontSize: 17, lineHeight: 1.5 }}>한국공학대학교</span>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6E6E73' }}>컴퓨터공학부 소프트웨어공학과<br />2019.03 ~ 2024.02</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={label}>자격증</span>
            <span style={{ fontSize: 17, lineHeight: 1.5 }}>정보처리기사</span>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6E6E73' }}>한국산업인력공단 · 2024.12.11</span>
          </div>
        </div>
      </section>
    </>
  );
}

// 경로 라우팅: /portfolio 첫 화면, /portfolio/<slug> 프로젝트 상세. 서버가 내려주는 HTML에 상세 내용이 담긴다
export default function Portfolio({ slug }: { slug?: string }) {
  const router = useRouter();
  const goSection = useGoSection();
  const [section, setSection] = useState('');

  // 상세 페이지에서 '전체 프로젝트'·헤더 메뉴로 넘어왔으면, 첫 화면이 그려진 뒤 그 구간으로 스크롤한다
  useEffect(() => {
    if (slug || !pendingSection) return;
    const id = pendingSection;
    pendingSection = null;
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id, false)));
  }, [slug]);

  // 예전 해시 주소(/portfolio#/nova)로 들어오면 새 주소로 넘긴다. #projects 같은 일반 앵커는 건드리지 않는다
  useEffect(() => {
    if (slug || !location.hash.startsWith('#/')) return;
    const old = location.hash.slice(2);
    router.replace(PROJECTS.some((p) => p.slug === old) ? '/portfolio/' + old : '/portfolio');
  }, [slug, router]);

  const idx = slug ? PROJECTS.findIndex((p) => p.slug === slug) : -1;

  return (
    <div className="pf" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF', color: '#1D1D1F', fontFamily: FONT, WebkitFontSmoothing: 'antialiased', wordBreak: 'keep-all' }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      <style>{`
        .pf a{color:inherit;text-decoration:none}
        .pf a:hover{text-decoration:underline}
        .pf header a:hover{text-decoration:none;opacity:.65}
        .pf ::selection{background:#0071E3;color:#fff}
        .pf .pf-row{transition:background .25s ease}
        .pf .pf-row:hover{background:#EDEDF0;text-decoration:none}
        .pf .pf-link{color:#0071E3}
        .pf .pf-btn{display:inline-block;background:#0071E3;color:#fff;padding:11px 21px;border-radius:980px;font-size:17px;line-height:1.2}
        .pf .pf-btn:hover{background:#0071E3;color:#fff;text-decoration:none}
        .pf .pf-pill{color:#0071E3;background:transparent}
        .pf .pf-pill:hover{background:#0071E3;color:#fff;text-decoration:none}
        .pf .pf-arrow:hover{background:#D2D2D7!important}
        .pf .pf-noscroll::-webkit-scrollbar{display:none}
        .pf ::-webkit-scrollbar{height:6px;width:6px}
        .pf ::-webkit-scrollbar-track{background:transparent}
        .pf ::-webkit-scrollbar-thumb{background:#C7C7CC;border-radius:99px}
        .pf .pf-next:hover{color:${ACCENT};text-decoration:none}
        .pf section[id]{scroll-margin-top:56px}
        .pf .pf-rail{display:none}
        @media (hover:hover) and (min-width:1200px){.pf .pf-rail{display:block}.pf .pf-toc-mobile{display:none}}
        .pf .pf-rail-panel{opacity:0;transform:translateX(6px);pointer-events:none;transition:opacity .15s ease,transform .15s ease}
        .pf .pf-rail:hover .pf-rail-panel,.pf .pf-rail:focus-within .pf-rail-panel{opacity:1;transform:none;pointer-events:auto}
        @media (prefers-reduced-motion:reduce){.pf .pf-rail-panel{transition:none}}
        .pf .pf-flow{container-type:inline-size}
        @container (min-width:720px){.pf .pf-flow-grid{grid-template-columns:repeat(5,minmax(0,1fr))!important}}
        .pf .pf-toc-link{overflow-wrap:anywhere}
        .pf .pf-ux [id]{scroll-margin-top:calc(var(--pf-head,56px) + 24px)}
        .pf .pf-ux :focus-visible{outline:2px solid #0071E3;outline-offset:3px;border-radius:6px}
        .pf .pf-toc-link:hover{color:#0071E3!important;text-decoration:none}
        .pf .pf-summary{cursor:pointer;color:#0071E3;font-size:15px;padding:6px 0}
        .pf .pf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
      `}</style>

      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(255,255,255,0.8)', backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ ...wrap, padding: '0 32px', minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0 }}>
            <Link href="/portfolio" style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em', padding: '12px 0' }}>김혜진</Link>
            {section && (
              <>
                <span aria-hidden="true" style={{ color: '#86868B' }}>·</span>
                <span aria-live="polite" style={{ fontSize: 15, color: '#6E6E73' }}>{section}</span>
              </>
            )}
          </div>
          <nav style={{ display: 'flex', gap: 28, fontSize: 13, flexWrap: 'wrap', color: 'rgba(0,0,0,0.8)' }}>
            <Link href="/portfolio" onClick={goSection('projects')} style={{ padding: '14px 0' }}>Projects</Link>
            <Link href="/portfolio" onClick={goSection('experience')} style={{ padding: '14px 0' }}>Experience</Link>
            <Link href="/portfolio" onClick={goSection('other')} style={{ padding: '14px 0' }}>Other</Link>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: '14px 0' }}>Contact</a>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {idx >= 0 ? <Detail idx={idx} onSection={setSection} /> : <Home />}
      </main>

      <footer id="contact" style={{ background: '#F5F5F7' }}>
        <div style={{ ...wrap, padding: '80px 32px 40px', display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: '22ch' }}>막히는 곳을 먼저 찾고, 끝까지 고치는 프론트엔드 개발자입니다.</div>
          <div style={{ display: 'flex', gap: '8px 28px', flexWrap: 'wrap', fontSize: 17 }}>
            <a href="mailto:khj000217@gmail.com" className="pf-link">khj000217@gmail.com</a>
            <span>010.9982.6381</span>
            <a href="https://github.com/llmeajinll" target="_blank" className="pf-link">GitHub ›</a>
            <a href="https://velog.io/@llmeajinll/posts" target="_blank" className="pf-link">Velog ›</a>
          </div>
          <div style={{ fontSize: 12, color: '#6E6E73' }}>© 2026 김혜진</div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { CSSProperties, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import {
  FW, PROJECTS, OTHERS, DN_PROJECTS, dnStack, dnMetrics, dnLearned, Item, Block, Case, Flow, Shot, BgFigure, ItemImg,
} from '@/src/portfolio/data';

const ACCENT = '#0071E3';
// SF Pro는 애플 전용이라 웹에서 못 쓴다 — 가장 비슷한 Pretendard 하나로 통일
const FONT = '"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo",system-ui,sans-serif';
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

const itemText = (it: Item) => (typeof it === 'string' ? it : it.t);
const itemSubs = (it: Item) => (typeof it === 'string' ? [] : it.sub || []);

// 목록 항목 아래에 붙는 화면 캡처 + 설명
function ItemFigure({ img }: { img: ItemImg }) {
  return (
    <figure style={{ margin: '10px 0 6px', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
      <div style={{ border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#1D1D1F' }}>
        <Image src={img.src} alt={img.alt} width={img.w} height={img.h} sizes="420px" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
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
      {b.table && (
        <div style={{ overflowX: 'auto', borderTop: '1px solid #1D1D1F' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.6 }}>
            <thead>
              <tr>{b.table[0].map((h) => <th key={h} style={{ ...ui, textAlign: 'left', padding: '10px 16px 10px 0', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', color: '#6E6E73', borderBottom: '1px solid #D2D2D7', whiteSpace: 'nowrap' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.table.slice(1).map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: '12px 16px 12px 0', borderBottom: '1px solid #D2D2D7', verticalAlign: 'top' }}><Rich text={c} codeSize="0.9em" /></td>)}</tr>
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
function Gallery({ shots, label: aria, dark }: { shots: Shot[]; label: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ prev: false, next: true });
  const update = () => {
    const el = ref.current;
    if (el) setEdge({ prev: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
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
        <span />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" aria-label="이전 화면" disabled={!edge.prev} onClick={() => move(-1)} className={edge.prev ? 'pf-arrow' : undefined} style={btn(edge.prev)}>←</button>
          <button type="button" aria-label="다음 화면" disabled={!edge.next} onClick={() => move(1)} className={edge.next ? 'pf-arrow' : undefined} style={btn(edge.next)}>→</button>
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
              <div style={{ position: 'relative', aspectRatio: s.phone ? '780 / 1688' : '1440 / 732', border: '1px solid #D2D2D7', borderRadius: s.phone ? 28 : 18, overflow: 'hidden', background: dark ? '#1D1D1F' : '#fff' }}>
                <Image src={s.src} alt={`${s.title} 화면`} fill sizes={s.phone ? '230px' : '(max-width: 640px) 84vw, 560px'} style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
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
function FlowDetail({ flow, ink }: { flow: Flow; ink: string }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ ...h2Bar(), marginBottom: 8 }}>
        <h2 style={h2}>주요 기능 플로우</h2>
      </div>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '32px 24px' }}>
        {flow.steps.map((s, i) => (
          <React.Fragment key={s.title}>
          <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <a href={s.shot} target="_blank" aria-label={`${s.title} 화면 크게 보기`} style={{ display: 'block', border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#1D1D1F' }}>
              <Image src={s.shot} alt={`${s.title} 화면`} width={1440} height={900} sizes="(max-width: 640px) 100vw, 280px" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </a>
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

function DemoSlider({ srcs, resetKey, onMount }: { srcs: string[]; resetKey: number; onMount: (id: string) => void }) {
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
        {srcs.map((src) => (
          <div key={src} style={{ position: 'relative', flex: '0 0 100%', scrollSnapAlign: 'start' }}>
            <Image src={src} alt="" fill sizes="320px" draggable={false} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
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
      <div style={{ flex: '0 0 auto', width: 'min(320px, 100%)', borderRadius: 20, overflow: 'hidden', background: '#1D1D1F', color: '#F5F5F7' }}>
        <DemoSlider key={mode === 'before' ? c.key : 'fixed'} srcs={cardSrcs(c.key)} resetKey={resetKey} onMount={onMount} />
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
          <div><div style={{ fontSize: 13, color: '#6E6E73' }}>색을 누른 횟수</div><div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em' }}>{clicks}</div></div>
          <div><div style={{ fontSize: 13, color: '#6E6E73' }}>슬라이더를 새로 만든 횟수</div><div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', color: remounts > 0 ? '#0071E3' : '#1D1D1F' }}>{remounts}</div></div>
        </div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#424245', textWrap: 'pretty' }}>
          {mode === 'before'
            ? <>슬라이더에 <code style={{ fontFamily: CODE_FONT, fontSize: '0.9em', background: '#E8E8ED', padding: '1px 6px', borderRadius: 6 }}>key</code>를 사진 목록으로 걸어 둔 방식입니다. 색이 바뀔 때마다 슬라이더를 지우고 새로 만듭니다.</>
            : <>슬라이더는 그대로 두고 사진과 현재 번호만 바꿉니다. 색을 눌러도 새로 만드는 일이 없습니다.</>}
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#6E6E73', textWrap: 'pretty' }}>사진을 옆으로 넘긴 뒤 색을 눌러 보세요. 두 버전 모두 첫 장으로 돌아가지만, 만드는 횟수가 다릅니다. 실제 앱의 카드를 단순화한 데모이고, 실제로는 Swiper를 쓰며 여기서는 같은 구조를 CSS 스크롤 스냅으로 흉내 냈습니다.</p>
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

function Detail({ idx, go, goHome, onSection }: { idx: number; go: (r: string) => void; goHome: (e: React.MouseEvent) => void; onSection: (s: string) => void }) {
  const p = PROJECTS[idx];
  // 지금 화면 위쪽에 걸린 구간(핵심 구현·트러블슈팅)을 헤더에 알린다.
  useEffect(() => {
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
  }, [idx, onSection]);
  const fw = FW[p.fw];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const sections: [string, Case[]][] = [['핵심 구현', p.core]];
  if (p.trouble.length) sections.push(['트러블슈팅', p.trouble]);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <article style={{ ...wrap, padding: '56px 32px 96px' }}>
      <a href="#/" onClick={goHome} className="pf-link" style={{ display: 'inline-flex', gap: 8, fontSize: 17, padding: '6px 0' }}>‹ 전체 프로젝트</a>
      <div style={{ padding: '40px 0 56px', borderBottom: '1px solid #D2D2D7' }}>
        <div style={{ ...ui, display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, flexWrap: 'wrap' }}>
          <span style={{ color: fw.ink }}>{p.no}</span>
          <span style={fwBadge(p.fw)}>{fw.label}</span>
          <span style={{ color: '#6E6E73' }}>{p.kind}</span>
        </div>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(44px,7vw,96px)', lineHeight: 1.02, letterSpacing: '-0.045em', fontWeight: 600 }}>{p.name}</h1>
        <div style={{ marginTop: 12, fontSize: 20, color: '#424245' }}>{p.kr}</div>
        <p style={{ margin: '28px 0 0', fontSize: 19, lineHeight: 1.7, maxWidth: '56ch', textWrap: 'pretty' }}>{p.tagline}</p>
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
        <div style={{ ...row, flexDirection: 'column', flexWrap: 'nowrap', gap: 0 }}>
          <Gallery label={`${p.name} 화면`} shots={p.shots} />
        </div>
      )}

      {p.background && (
        <div style={row}>
          <div style={sideLabel}>기획 배경</div>
          <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
            {p.background.map((t, i) => (
              <React.Fragment key={i}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, textWrap: 'pretty' }}><Rich text={t} strong={HL} /></p>
                {p.bgFigure && p.bgFigure.after === i + 1 && <BgFigureView fig={p.bgFigure} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {p.flow && <FlowDetail flow={p.flow} ink={fw.ink} />}

      <div style={row}>
        <div style={sideLabel}>기술 스택</div>
        <div style={{ flex: '1 1 480px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {p.stack.map((s) => <span key={s} style={{ ...chip, fontSize: 12, padding: '6px 10px', color: undefined }}>{s}</span>)}
        </div>
      </div>

      <div style={row}>
        <div style={sideLabel}>담당 업무</div>
        <div style={{ flex: '1 1 480px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px 40px' }}>
          {p.duties.map((g) => (
            <div key={g.group} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{g.group}</span>
              <Dashes items={g.items} strong={{ color: '#1D1D1F', fontWeight: 600 }} />
            </div>
          ))}
        </div>
      </div>

      {p.archImg && (
        <div style={{ ...row, flexDirection: 'column', flexWrap: 'nowrap', gap: 16 }}>
          <span style={label}>시스템 구성</span>
          <a href={p.archImg} target="_blank" style={{ display: 'block', border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: '#fff' }}>
            <Image src={p.archImg} alt={`${p.name} 시스템 구성도`} width={1640} height={1020} unoptimized style={{ width: '100%', height: 'auto', display: 'block' }} />
          </a>
          <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>클릭하면 원본 크기로 열립니다.</span>
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
          {cases.map((c, i) => (
            <div key={c.title} style={{ ...row, padding: '36px 0' }}>
              <div style={{ flex: '0 0 200px' }}>
                <span style={{ ...ui, fontSize: 28, fontWeight: 500, color: fw.ink }}>{pad(i + 1)}</span>
              </div>
              <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0, maxWidth: 760 }}>
                <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.4, letterSpacing: '-0.02em', fontWeight: 600, textWrap: 'balance' }}><Rich text={c.title} codeSize="0.82em" /></h3>
                {c.demo === 'productCard' && <ProductCardDemo />}
                {c.blocks.map((b, j) => <CaseBlock key={j} b={b} />)}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ ...row, padding: '72px 0 40px' }}>
        <div style={sideLabel}>{p.verifyTitle}</div>
        <div style={{ flex: '1 1 480px', maxWidth: 760 }}>
          {(() => {
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

      <a href={'#/' + next.slug} onClick={(e) => { e.preventDefault(); go(next.slug); }} className="pf-next" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '40px 0', borderBottom: '1px solid #D2D2D7' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>다음 프로젝트 · {next.no}</span>
          <span style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.035em' }}>{next.name}</span>
        </div>
        <span style={{ fontSize: 32 }}>→</span>
      </a>
    </article>
  );
}

function Home({ go }: { go: (r: string) => void }) {
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
          <p style={{ margin: 0 }}>사용자가 막히는 곳을 출시 전에 찾고, 실제 사용자 앞에서 문제를 해결해 왔습니다. 디엔소프트에서 3일간 754명이 참여한 박람회 이벤트의 현장 장애 대응을 맡았고, 100개 이상의 초등학교가 사용한 관리자 시스템을 일정 안에 오픈했습니다.</p>
          <p style={{ margin: 0 }}>다른 파트가 늦어져도 팀이 기다리지 않도록 공통 스타일과 MSW 목 API를 먼저 준비하고, 성능은 측정으로 병목을 찾아 고칩니다. NEXT GACHA 홈을 서버 렌더링으로 바꿔 모바일 실측 LCP를 3.28s에서 1.78s로 줄였습니다.</p>
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
              <a key={p.slug} href={'#/' + p.slug} onClick={(e) => { e.preventDefault(); go(p.slug); }} className="pf-row" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '48px 48px 40px', borderRadius: 28, background: '#F5F5F7', color: '#1D1D1F' }}>
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
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.stackShort.map((s) => <span key={s} style={chip}>{s}</span>)}
                </div>
                {p.flow && <FlowStrip flow={p.flow} />}
                <span className="pf-link" style={{ fontSize: 17 }}>자세히 보기 ›</span>
              </a>
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
              <div style={{ marginTop: 10, fontSize: 16, color: '#86868B' }}>프론트엔드 개발자 (계약직) · 프론트엔드 개발 · 초기 레이아웃 디자인</div>
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
            <div style={{ flex: '0 0 260px', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>실무에서 얻은 것</div>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 40, borderTop: '1px solid #D2D2D7', paddingTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={label}>주요 기술</span>
            <span style={{ fontSize: 17, lineHeight: 1.7 }}>React · Next.js · Vue.js<br />TypeScript · JavaScript<br />TanStack Query<br />Vanilla Extract · Tailwind CSS · SCSS<br />Storybook · Vitest · Playwright · Jest · MSW</span>
          </div>
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

export default function Portfolio() {
  const [route, setRoute] = useState('');
  const [section, setSection] = useState('');

  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace(/^#\/?/, ''));
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // 해시 라우팅: #/ 홈, #/<slug> 프로젝트 상세
  const go = (r: string, anchor?: string) => {
    if (location.hash.replace(/^#\/?/, '') !== r) location.hash = '/' + r;
    setRoute(r);
    requestAnimationFrame(() => {
      const el = anchor && document.getElementById(anchor);
      const y = el ? el.getBoundingClientRect().top + window.scrollY - 64 : 0;
      window.scrollTo({ top: y, behavior: anchor ? 'smooth' : 'auto' });
    });
  };
  const nav = (anchor: string) => (e: React.MouseEvent) => { e.preventDefault(); go('', anchor); };
  const goHome = (e: React.MouseEvent) => { e.preventDefault(); go(''); };
  const idx = PROJECTS.findIndex((p) => p.slug === route);

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
      `}</style>

      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(255,255,255,0.8)', backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ ...wrap, padding: '0 32px', minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0 }}>
            <a href="#/" onClick={goHome} style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em', padding: '12px 0' }}>김혜진</a>
            {section && (
              <>
                <span aria-hidden="true" style={{ color: '#86868B' }}>·</span>
                <span aria-live="polite" style={{ fontSize: 15, color: '#6E6E73' }}>{section}</span>
              </>
            )}
          </div>
          <nav style={{ display: 'flex', gap: 28, fontSize: 13, flexWrap: 'wrap', color: 'rgba(0,0,0,0.8)' }}>
            <a href="#/" onClick={nav('projects')} style={{ padding: '14px 0' }}>Projects</a>
            <a href="#/" onClick={nav('experience')} style={{ padding: '14px 0' }}>Experience</a>
            <a href="#/" onClick={nav('other')} style={{ padding: '14px 0' }}>Other</a>
            <a href="#/" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: '14px 0' }}>Contact</a>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {idx >= 0 ? <Detail idx={idx} go={go} goHome={goHome} onSection={setSection} /> : <Home go={go} />}
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

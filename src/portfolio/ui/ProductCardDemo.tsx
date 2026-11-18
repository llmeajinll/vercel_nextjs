import Image from 'next/image';
import React, { CSSProperties, useEffect, useId, useRef, useState } from 'react';
import { BLUE, CODE_FONT, ui } from '../ui/tokens';

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

export function ProductCardDemo() {
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

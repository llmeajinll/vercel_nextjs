import Image from 'next/image';
import React, { type CSSProperties, createContext, useContext } from 'react';
import type { ItemImg } from '../data';

export type Zoom = { src: string; alt: string; title: string; w: number; h: number; fit?: boolean };
export const ZoomCtx = createContext<((z: Zoom, opener: HTMLElement) => void) | null>(null);
export function Zoomable({ z, children, fallback, style }: { z: Zoom; children: React.ReactNode; fallback?: React.ReactNode; style?: CSSProperties }) {
  const open = useContext(ZoomCtx);
  if (!open) return <>{fallback ?? children}</>;
  return (
    <button type="button" aria-haspopup="dialog" aria-label={`${z.title} 크게 보기`} onClick={(e) => open(z, e.currentTarget)} style={{ display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', font: 'inherit', textAlign: 'inherit', cursor: 'zoom-in', ...style }}>
      {children}
    </button>
  );
}
export const zoomOf = (img: ItemImg): Zoom => ({ src: img.src, alt: img.alt, title: img.title || img.caption || img.alt, w: img.w, h: img.h, fit: img.kind !== 'diagram' });


// 웹 화면과 모바일 화면을 나란히 — 모바일은 웹과 같은 높이가 되도록 아래쪽을 잘라 보여준다.
export function ImgDuo({ wide, tall }: { wide: ItemImg; tall: ItemImg }) {
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
export function ItemFigure({ img }: { img: ItemImg }) {
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

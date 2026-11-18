import type { CSSProperties } from 'react';

// 기존 Portfolio.tsx의 공통 스타일을 그대로 옮긴 기준값.
export const ACCENT = '#0071E3';
// SF Pro는 애플 전용이라 웹에서 못 쓴다 — 가장 비슷한 Pretendard 하나로 통일
export const FONT = '"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo",system-ui,sans-serif';
export const BLUE = '#0071E3';
export const CODE_FONT = 'ui-monospace,"SF Mono",SFMono-Regular,Menlo,Consolas,monospace';
// 기존 소제목의 브라우저 실측 규격. CSS와 React가 같은 값을 참조한다.
export const typography = {
  label: { fontSize: 14, fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.01em' },
  metadata: { fontSize: 12 },
  subtitle: { fontSize: 20 },
} as const;

export const ui: CSSProperties = { fontFamily: FONT };
export const wrap: CSSProperties = { maxWidth: 1160, margin: '0 auto' };
export const label: CSSProperties = { ...ui, ...typography.label, color: '#6E6E73' };
export const sideLabel: CSSProperties = { ...label, flex: '0 0 200px', paddingTop: 4 };
export const row: CSSProperties = { display: 'flex', gap: 40, flexWrap: 'wrap', padding: '40px 0', borderBottom: '1px solid #D2D2D7' };
export const dash: CSSProperties = { display: 'grid', gridTemplateColumns: '14px minmax(0,1fr)', gap: 8 };
export const ul: CSSProperties = { margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' };

export const HL: CSSProperties = { fontWeight: 600, boxShadow: 'inset 0 -0.42em 0 rgba(0,113,227,0.14)' };


export const themeVariables = {
  '--pf-label-size': `${typography.label.fontSize}px`,
  '--pf-label-weight': typography.label.fontWeight,
  '--pf-label-line-height': typography.label.lineHeight,
  '--pf-label-tracking': typography.label.letterSpacing,
  '--pf-metadata-size': `${typography.metadata.fontSize}px`,
  '--pf-subtitle-size': `${typography.subtitle.fontSize}px`,
  '--pf-accent': BLUE,
  '--pf-text': '#1D1D1F',
  '--pf-secondary': '#424245',
  '--pf-muted': '#6E6E73',
  '--pf-border': '#D2D2D7',
  '--pf-surface': '#FFFFFF',
} as CSSProperties;

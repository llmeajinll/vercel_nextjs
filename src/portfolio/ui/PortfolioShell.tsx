import Link from 'next/link';
import React from 'react';
import { scrollToSection, useGoSection } from '../navigation';
import styles from '../Portfolio.module.css';
import { ACCENT, FONT, themeVariables } from '../ui/tokens';

export function PortfolioShell({ section, children }: { section: string; children: React.ReactNode }) {
  const goSection = useGoSection();
  return (
    <div className={`pf ${styles.shell}`} style={{ ...themeVariables, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF', color: '#1D1D1F', fontFamily: FONT, WebkitFontSmoothing: 'antialiased', wordBreak: 'keep-all' }}>
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
        .pf section[id],.pf footer[id]{scroll-margin-top:calc(var(--pf-header-height) + 16px)}
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
        <div className={styles.headerInner}>
          <div className={styles.headerIdentity}>
            <Link href="/portfolio" style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em', padding: '12px 0' }}>김혜진</Link>
            {section && (
              <>
                <span className={styles.headerSection} aria-hidden="true" style={{ color: '#86868B' }}>·</span>
                <span className={styles.headerSection} aria-live="polite" style={{ fontSize: 15, color: '#6E6E73' }}>{section}</span>
              </>
            )}
          </div>
          <nav className={styles.headerNav} aria-label="주요 메뉴">
            <Link href="/portfolio#projects" onClick={goSection('projects')}>Projects</Link>
            <Link href="/portfolio#experience" onClick={goSection('experience')}>Experience</Link>
            <Link href="/portfolio#other" onClick={goSection('other')}>Other</Link>
            <a href="#contact" onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); scrollToSection('contact', true); }}>Contact</a>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer id="contact" style={{ background: '#F5F5F7' }}>
        <div className={styles.footerInner}>
          <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: '22ch' }}>문제의 원인을 측정과 근거로 확인하고, 서비스에 맞는 해결 방법을 골라 적용하는 프론트엔드 개발자입니다.</div>
          <div style={{ display: 'flex', gap: '8px 28px', flexWrap: 'wrap', fontSize: 17 }}>
            <a href="mailto:khj000217@gmail.com" className="pf-link">khj000217@gmail.com</a>
            <a href="tel:01099826381">010.9982.6381</a>
            <a href="https://github.com/llmeajinll" target="_blank" rel="noopener noreferrer" className="pf-link">GitHub ›</a>
            <a href="https://velog.io/@llmeajinll/posts" target="_blank" rel="noopener noreferrer" className="pf-link">Velog ›</a>
          </div>
          <div style={{ fontSize: 12, color: '#6E6E73' }}>© 2026 김혜진</div>
        </div>
      </footer>
    </div>
  );
}

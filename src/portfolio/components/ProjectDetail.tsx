import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Block, Case, FW, PROJECTS } from '../data';
import { useGoSection } from '../navigation';
import styles from '../Portfolio.module.css';
import { CaseBlock, Dashes, Rich } from '../ui/Content';
import { ZoomCtx, type Zoom } from '../ui/Images';
import { Chip, EvidenceNote, Heading, Label, ProjectFacts, SectionRow, Text, TitleBar } from '../ui/PortfolioUI';
import { ProductCardDemo } from '../ui/ProductCardDemo';
import { BgFigureView, FlowDetail, Gallery } from '../ui/ProjectScreens';
import { TocMobile, TocRail } from '../ui/TableOfContents';
import { BLUE, CODE_FONT, label, row, sideLabel, ui, ul, wrap } from '../ui/tokens';
import { ProjectIntro } from './ProjectIntro';
import { ProjectContext } from './ProjectContext';

export function ProjectDetail({ idx, onSection }: { idx: number; onSection: (s: string) => void }) {
  const p = PROJECTS[idx];
  // 지금 화면 위쪽에 걸린 구간(주요 개발 내용·트러블슈팅)을 헤더에 알린다.
  useEffect(() => {
    if (p.toc) return () => onSection(''); // 목차가 있으면 아래 목차 활성 항목을 헤더에 쓴다
    const spots: [string, string][] = [['sec-core', '주요 개발 내용'], ['sec-trouble', '트러블슈팅']];
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
  const sections: [string, Case[]][] = [['주요 개발 내용', p.core]];
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
    <SectionRow id={toc ? id : undefined}>
      <Label variant="side" as="div">{title}</Label>
      <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0, maxWidth: 760 }}>
        {blocks.map((b, j) => <CaseBlock key={j} b={b} />)}
      </div>
    </SectionRow>
  );

  const body = (
    <>
      <Link href="/portfolio#projects" onClick={goSection('projects')} className="pf-link" style={{ display: 'inline-flex', gap: 8, fontSize: 17, padding: '6px 0' }}>‹ 전체 프로젝트</Link>
      <ProjectIntro project={p} />
      <ProjectContext project={p} />
      {!p.requirements && <ProjectFacts meta={p.meta} links={p.links} />}

      {p.shots && (
        <SectionRow id={toc ? 'sec-shots' : undefined} variant="stack">
          {Array.from(new Set(p.shots.map((x) => x.group ?? ''))).map((g) => (
            <Gallery key={g} title={g} label={`${p.name} ${g} 화면`} shots={p.shots!.filter((x) => (x.group ?? '') === g)} />
          ))}
        </SectionRow>
      )}

      {!p.requirements && p.background && (
        <SectionRow id={toc ? 'sec-background' : undefined}>
          <Label variant="side" as="div">기획 배경</Label>
          <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, maxWidth: 720 }}>
            {p.background.map((t, i) => (
              <React.Fragment key={i}>
                <Text><Rich text={t} emphasis="highlight" /></Text>
                {p.bgFigure && p.bgFigure.after === i + 1 && <BgFigureView fig={p.bgFigure} />}
              </React.Fragment>
            ))}

          </div>
        </SectionRow>
      )}

      {p.scope && (
        <SectionRow>
          <Label variant="side" as="div">{toc ? '역할과 담당 업무' : '역할 구분'}</Label>
          <div style={{ flex: '1 1 480px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px 40px', minWidth: 0 }}>
            {p.scope.map((g, i) => (
              <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: i ? BLUE : '#1D1D1F' }}>{g.label}</span>
                {g.note && <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6E6E73', textWrap: 'pretty' }}>{g.note}</span>}
                <Dashes items={g.items} />
                {i === p.scope!.length - 1 && p.duties.map((d) => (
                  <div key={d.group} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                    <span style={{ ...label, fontSize: 12 }}>{d.group}</span>
                    <Dashes items={d.items} variant="compact" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </SectionRow>
      )}

      {p.timeline && (
        <SectionRow>
          <Label variant="side" as="div">진행 과정</Label>
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
        </SectionRow>
      )}

      {blockRow('기획', p.planning, 'sec-planning')}
      {blockRow('디자인', p.design)}

      {p.flow && <FlowDetail flow={p.flow} ink={BLUE} id={toc ? 'sec-flow' : undefined} lead={p.leads?.flow} />}

      <SectionRow id={toc ? 'sec-stack' : undefined}>
        <Label variant="side" as="div">기술 스택</Label>
        {p.stackGroups ? (
          <dl style={{ flex: '1 1 480px', margin: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {p.stackGroups.map((g) => (
              <div key={g.label} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 16px' }}>
                <dt style={{ ...label, flex: '0 0 120px', fontSize: 13 }}>{g.label}</dt>
                <dd style={{ margin: 0, flex: '1 1 240px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {g.items.map((x) => <Chip key={x} compact>{x}</Chip>)}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div style={{ flex: '1 1 480px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.stack.map((s) => <Chip key={s} compact>{s}</Chip>)}
          </div>
        )}
      </SectionRow>

      {!p.scope && <SectionRow>
        <Label variant="side" as="div">담당 업무</Label>
        <div style={{ flex: '1 1 480px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px 40px' }}>
          {p.duties.map((g) => (
            <div key={g.group} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{g.group}</span>
              <Dashes items={g.items} variant="body" />
            </div>
          ))}
        </div>
      </SectionRow>}

      {diagrams.length > 0 && (
        <div id={toc ? 'sec-arch' : undefined} style={{ ...row, flexDirection: 'column', flexWrap: 'nowrap', gap: 16 }}>
          {/* 둘이면 좌우로, 좁은 화면이나 하나뿐이면 전체 폭으로 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: 24, alignItems: 'start' }}>
            {diagrams.map((d) => (
              <div key={d.src} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
                <Label>{d.title}</Label>
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
        <SectionRow>
          <Label variant="side" as="div">시스템 구성</Label>
          <pre style={{ fontFamily: CODE_FONT, flex: '1 1 480px', margin: 0, padding: 24, background: '#1D1D1F', color: '#F5F5F7', borderRadius: 18, fontSize: 13, lineHeight: 1.7, overflowX: 'auto' }}>{p.arch}</pre>
        </SectionRow>
      )}

      {sections.map(([title, cases]) => (
        <div key={title} id={title === '트러블슈팅' ? 'sec-trouble' : 'sec-core'} style={{ paddingTop: 72 }}>
          <TitleBar spaced>
            <Heading>{title}</Heading>
            <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>{pad(cases.length)}</span>
          </TitleBar>
          {(title === '트러블슈팅' ? p.leads?.trouble : p.leads?.core) && (
            <p style={{ margin: '4px 0 12px', fontSize: 17, lineHeight: 1.7, color: '#424245', maxWidth: 760, textWrap: 'pretty' }}>{title === '트러블슈팅' ? p.leads?.trouble : p.leads?.core}</p>
          )}
          {cases.map((c, i) => {
            return (
              <React.Fragment key={c.title}>
                {c.sub && !cases[i - 1]?.sub && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 40px', padding: '44px 0 4px' }}>
                    <span style={{ ...sideLabel, color: '#1D1D1F' }}>보조 구현</span>
                    <span style={{ flex: '1 1 480px', fontSize: 15, lineHeight: 1.7, color: '#6E6E73' }}>API 통신과 코드 구조를 관리하기 위한 공통 개발 작업입니다.</span>
                  </div>
                )}
                <SectionRow id={c.id} variant={c.sub ? "supporting" : "case"}>
                  <div style={{ flex: '0 0 200px' }}>
                    <span style={{ ...ui, fontSize: c.sub ? 20 : 28, fontWeight: 500, color: c.sub ? '#86868B' : BLUE }}>{pad(i + 1)}</span>
                  </div>
                  <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0, maxWidth: 760 }}>
                    <Heading variant={c.sub ? "supporting" : "case"}><Rich text={c.title} codeSize="title" /></Heading>
                    {c.tags && c.tags.length > 0 && (
                      <ul role="list" style={{ listStyle: 'none', margin: '-8px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {c.tags.map((t) => <Chip key={t} as="li" compact>{t}</Chip>)}
                      </ul>
                    )}
                    {c.demo === 'productCard' && <ProductCardDemo />}
                    {c.blocks.map((b, j) => <CaseBlock key={j} b={b} />)}
                  </div>
                </SectionRow>
              </React.Fragment>
            );
          })}
        </div>
      ))}

      {blockRow('배포와 운영', p.ops, 'sec-ops')}

      <SectionRow id={toc ? 'sec-verify' : undefined} variant="verify">
        <Label variant="side" as="div">{p.verifyTitle}</Label>
        <div style={{ flex: '1 1 480px', minWidth: 0, maxWidth: 760 }}>
          {p.requirements && <EvidenceNote placement="verification">{p.evidenceNote}</EvidenceNote>}
          {p.verifyGroups ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {p.leads?.verify && <Text secondary>{p.leads.verify}</Text>}
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
                        <Dashes items={g.scenarios} variant="scenario" />
                      </div>
                    )}
                    {g.lead && <p style={{ margin: 0, fontSize: tone.size, lineHeight: 1.7, color: tone.color, textWrap: 'pretty' }}>{g.lead}</p>}
                    <Dashes items={g.items} variant={g.sub ? "supporting" : "verification"} />
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
            return (
              <>
                <Dashes items={p.verify.slice(0, cut)} variant="verification" />
                {p.verifyExtra && <div style={{ margin: '28px 0' }}><CaseBlock b={p.verifyExtra} /></div>}
                {cut < p.verify.length && <Dashes items={p.verify.slice(cut)} variant="verification" />}
              </>
            );
          })()}
        </div>
      </SectionRow>

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
      <article className={`${styles.detail} ${toc ? 'pf-ux' : ''}`} style={{ ...wrap, ...(toc ? { ['--pf-head' as string]: `${headH}px` } : {}) }}>
        {/* 키보드로는 목차를 먼저 만나도록 본문보다 앞에 둔다(화면에서는 오른쪽 끝에 고정) */}
        {toc && <TocRail toc={toc} active={active} go={go} />}
        {body}
        {toc && <TocMobile toc={toc} active={active} go={go} />}
      </article>
    </ZoomCtx.Provider>
  );
}

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { DN_PROJECTS, dnLearned, dnMetrics, dnStack, FW, OTHERS, PROJECTS, TECH_USAGE } from '../data';
import { useGoSection } from '../navigation';
import styles from '../Portfolio.module.css';
import { Dashes, itemSubs, itemText, Rich } from '../ui/Content';
import { Chip, FrameworkBadge, Heading, Label, PillButton, TitleBar } from '../ui/PortfolioUI';
import { ACCENT, ui, ul } from '../ui/tokens';

export function PortfolioHome() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sel = OTHERS.find((o) => o.id === openId);
  const goSection = useGoSection();
  const otherDialog = useRef<HTMLDivElement>(null);
  const otherOpener = useRef<HTMLButtonElement | null>(null);
  // 모달 안에서 키보드 탐색을 유지하고, 닫으면 열었던 버튼으로 돌아간다.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
      if (e.key !== 'Tab' || !otherDialog.current) return;
      const controls = Array.from(otherDialog.current.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]'));
      const first = controls[0], last = controls[controls.length - 1];
      if (!first) return;
      if (!otherDialog.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const opener = otherOpener.current;
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; opener?.focus({ preventScroll: true }); };
  }, [openId]);
  const vue = FW.vue;

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.identity}>김혜진 · Frontend Developer</p>
        <h1>문제의 원인을 측정과 근거로 확인하고, 서비스에 맞는 해결 방법을 골라 적용하는 프론트엔드 개발자입니다.</h1>
        <p className={styles.intro}>사용자가 겪는 문제를 찾아 해결하고,<br className={styles.desktopBreak} /> 공통 스타일과 목 API를 먼저 준비해 팀이 함께 나아가도록 돕습니다.</p>
        <div className={styles.evidence}>
          <Link href="/portfolio#experience" onClick={goSection('experience')}>
            <span>실무 경험</span>
            <strong>실서비스 4건 개발·운영</strong>
          </Link>
          <Link href="/portfolio/nextgacha#ng-perf">
            <span>성능 개선 · 2026.10 측정</span>
            <strong>모바일 LCP 3.28s → 1.78s</strong>
          </Link>
        </div>
        <div className={styles.heroActions}>
          <a href="mailto:khj000217@gmail.com" className="pf-btn">이메일 보내기</a>
          <a href="https://github.com/llmeajinll" target="_blank" rel="noopener noreferrer" className="pf-link">GitHub ›</a>
          <a href="https://velog.io/@llmeajinll/posts" target="_blank" rel="noopener noreferrer" className="pf-link">Velog ›</a>
        </div>
      </section>

      <section id="projects" className={styles.projects} aria-labelledby="projects-title">
        <Heading id="projects-title">Projects</Heading>
        <div className={styles.projectList}>
          {PROJECTS.map((p) => (
            <Link key={p.slug} href={'/portfolio/' + p.slug} className={`pf-row ${styles.projectCard}`} aria-labelledby={`${p.slug}-title`}>
              <div className={styles.projectMeta}>
                <FrameworkBadge framework={p.fw} />
                {p.ongoing && <span className={styles.ongoing}>진행 중</span>}
                <span>{p.period}</span>
              </div>
              <h3 id={`${p.slug}-title`}>{p.name}</h3>
              <p className={styles.projectDescription}>{p.preview.description}</p>
              <p className={styles.projectRole}><span>담당</span>{p.preview.role}</p>
              <div className={styles.projectCase}>
                <h4>{p.preview.title}</h4>
                <p>{p.preview.body}</p>
                {p.preview.note && <p className={styles.caseNote}>{p.preview.note}</p>}
              </div>
              <div className={styles.projectBottom}>
                <div className={styles.chips}>
                  {p.stackShort.slice(0, 3).map((s) => <Chip key={s}>{s}</Chip>)}
                </div>
                <span className="pf-link">자세히 보기 ›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="experience" className={styles.experience} aria-labelledby="experience-title">
        <div className={styles.experienceInner}>
          <div className={styles.experienceHeading}>
            <Heading id="experience-title">Experience</Heading>
            <span>2023.09.04 ~ 2024.03.31 · 약 7개월</span>
          </div>
          <div className={styles.company}>
            <div>
              <div className={styles.companyName}>
                <h3>디엔소프트</h3>
                <FrameworkBadge framework={'vue'} />
              </div>
              <p className={styles.companyRole}>Frontend 개발자 · 초기 레이아웃 디자인<br />현장실습 2023.09 ~ 2023.12 → 계약직 전환 2024.01 ~ 2024.03</p>
              <p className={styles.companyIntro}>교사용 LMS, 사내 관리자 페이지, 전시회 응원 메시지 이벤트와 퀴즈 이벤트까지 실서비스 4건을 개발했습니다.</p>
              <div className={styles.chips}>
                {dnStack.map((s) => <span key={s} className={styles.darkChip}>{s}</span>)}
              </div>
            </div>
            <dl className={styles.metrics}>
              {dnMetrics.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.experienceProjects}>
            {DN_PROJECTS.map((d) => (
              <details key={d.no} className={styles.experienceProject}>
                <summary>
                  <span className={styles.experienceOverview}>
                    <span className={styles.experienceProjectHeading}>
                      <span className={styles.experienceProjectName}>{d.name}</span>
                      <span className={styles.experiencePeriod}>{d.period}</span>
                    </span>
                    <span className={styles.experienceSummary}>{d.summary}</span>
                  </span>
                  <span className={styles.disclosureIcon} aria-hidden="true" />
                </summary>
                <div className={styles.experienceBody}>
                  <p className={styles.experienceTeam}>팀 구성 · {d.team}</p>
                  <p>{d.desc}</p>
                  {d.blocks.map((b) => (
                    <div key={b.label}>
                      <h4>{b.label}</h4>
                      <Dashes items={b.items} variant="experience" />
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <details className={styles.experienceProject}>
            <summary>
              <span className={styles.experienceProjectName}>실무에서 배운 점</span>
              <span className={styles.disclosureIcon} aria-hidden="true" />
            </summary>
            <div className={styles.experienceBody}>
              {dnLearned.map((l) => (
                <div key={l.t}>
                  <h4>{l.t}</h4>
                  <p>{l.d}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section id="other" className={styles.other}>
        <TitleBar>
          <Heading>Other Projects</Heading>
          <span style={{ ...ui, fontSize: 12, color: '#6E6E73' }}>03</span>
        </TitleBar>
        <div className={styles.otherGrid}>
          {OTHERS.map((o) => {
            const fw = FW[o.fw];
            return (
              <div key={o.id} className={styles.otherCard}>
                <div style={{ ...ui, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 12, color: '#6E6E73' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FrameworkBadge framework={o.fw} />{o.kind}</span>
                  <span>{o.period}</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{o.name}</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#424245', textWrap: 'pretty' }}>{o.tagline}</p>
                {o.award && <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}>{o.award}</div>}
                <div style={{ ...ui, fontSize: 12, lineHeight: 1.6, color: '#424245' }}>{o.role} · {o.team}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {o.stack.map((s) => <Chip key={s}>{s}</Chip>)}
                </div>
                <div style={{ ...ui, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    {o.links.map(([l, url]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="pf-link">{l} ↗</a>)}
                  </div>
                  <PillButton aria-haspopup="dialog" aria-label={`${o.name} 자세히 보기`} onClick={(e) => { otherOpener.current = e.currentTarget; setOpenId(o.id); }}>
                    자세히
                  </PillButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {sel && (
        <div onClick={() => setOpenId(null)} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div ref={otherDialog} className={styles.otherDialog} role="dialog" aria-modal="true" aria-labelledby="other-title" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', background: '#fff', borderRadius: 28, width: 'min(760px, 100%)', maxHeight: '88vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#C7C7CC transparent' }}>
            <button type="button" aria-label="닫기" autoFocus onClick={() => setOpenId(null)} className="pf-arrow" style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 99, border: 'none', background: 'rgba(232,232,237,0.8)', color: '#1D1D1F', fontSize: 20, lineHeight: 1, cursor: 'pointer' }}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 13, color: '#6E6E73', paddingRight: 48 }}>
              <FrameworkBadge framework={sel.fw} />{sel.kind}<span>· {sel.period}</span>
            </div>
            <h3 id="other-title" style={{ margin: '14px 0 0', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{sel.name}</h3>
            <p style={{ margin: '12px 0 0', fontSize: 17, lineHeight: 1.65, color: '#424245', textWrap: 'pretty' }}>{sel.tagline}</p>
            {sel.award && <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: ACCENT }}>{sel.award}</div>}
            <div style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, color: '#6E6E73' }}>{sel.role} · {sel.team}<br />{sel.scale}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
              {sel.stack.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 28, paddingTop: 28, borderTop: '1px solid #D2D2D7' }}>
              {sel.blocks.map((b) => (
                <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{b.label}</span>
                  <ul style={{ ...ul, gap: 12 }}>
                    {b.items.map((it, i) => (
                      <li key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15, lineHeight: 1.7, color: '#424245' }}>
                        <span><Rich text={itemText(it)} emphasis="bold" /></span>
                        {itemSubs(it).map((x, j) => (
                          <span key={j} style={{ paddingLeft: 14, borderLeft: '1px solid #D2D2D7', color: '#6E6E73' }}><Rich text={x} emphasis="bold" /></span>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 28, fontSize: 15 }}>
              {sel.links.map(([l, url]) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="pf-link">{l} ↗</a>)}
            </div>
          </div>
        </div>
      )}

      <section id="about" className={styles.about}>
        <div style={{ borderTop: '1px solid #D2D2D7', paddingTop: 32, marginBottom: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Label>기술과 사용처</Label>
          <dl style={{ margin: 0 }}>
            {TECH_USAGE.map(([t, d]) => (
              <div key={t} className={styles.techRow}>
                <dt style={{ fontSize: 16, fontWeight: 600 }}>{t}</dt>
                <dd style={{ margin: 0, minWidth: 0, fontSize: 16, lineHeight: 1.6, color: '#424245' }}>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 40, borderTop: '1px solid #D2D2D7', paddingTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label>협업 · AI 도구</Label>
            <span style={{ fontSize: 17, lineHeight: 1.7 }}>GitHub · Figma · Notion<br />Slack · Jira<br />Claude Code · Chrome MCP · Figma MCP<br />CodeRabbit · OpenWiki</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label>학력</Label>
            <span style={{ fontSize: 17, lineHeight: 1.5 }}>한국공학대학교</span>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6E6E73' }}>컴퓨터공학부 소프트웨어공학과<br />2019.03 ~ 2024.02</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Label>자격증</Label>
            <span style={{ fontSize: 17, lineHeight: 1.5 }}>정보처리기사</span>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6E6E73' }}>한국산업인력공단 · 2024.12.11</span>
          </div>
        </div>
      </section>
    </>
  );
}

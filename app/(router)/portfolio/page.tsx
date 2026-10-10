'use client';

import React, { CSSProperties, useEffect, useState } from 'react';
import {
  FW, PROJECTS, OTHERS, DN_PROJECTS, dnStack, dnMetrics, dnLearned, Item, Block, Case,
} from '@/src/portfolio/data';

const ACCENT = '#D9481F';
const mono: CSSProperties = { fontFamily: "'JetBrains Mono',monospace" };
const wrap: CSSProperties = { maxWidth: 1160, margin: '0 auto' };
const label: CSSProperties = { ...mono, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6862' };
const sideLabel: CSSProperties = { ...label, flex: '0 0 200px', paddingTop: 4 };
const row: CSSProperties = { display: 'flex', gap: 40, flexWrap: 'wrap', padding: '40px 0', borderBottom: '1px solid #D9D5CC' };
const chip: CSSProperties = { ...mono, fontSize: 11, padding: '4px 8px', background: '#E6E2D9', borderRadius: 4, color: '#3A3935' };
const dash: CSSProperties = { display: 'grid', gridTemplateColumns: '14px minmax(0,1fr)', gap: 8 };
const ul: CSSProperties = { margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' };
const h2Bar = (c = '#17171A'): CSSProperties => ({ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${c}`, paddingBottom: 14, gap: 16, flexWrap: 'wrap' });
const h2: CSSProperties = { margin: 0, fontSize: 28, letterSpacing: '-0.02em', fontWeight: 700 };
const fwBadge = (k: keyof typeof FW): CSSProperties => ({ ...mono, fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 99, background: FW[k].fill, color: FW[k].on });

const HL: CSSProperties = { fontWeight: 700, boxShadow: 'inset 0 -0.42em 0 #F2D3C4' };

// `code`, **bold** 마크업 렌더링. strong 미지정 시 bold는 평문으로 표시
function Rich({ text, strong, codeBg = '#E6E2D9', codeSize = '0.86em' }: { text: string; strong?: CSSProperties; codeBg?: string; codeSize?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((t, i) => {
        if (t.startsWith('**')) {
          const inner = t.slice(2, -2).replace(/`/g, '');
          return strong ? <strong key={i} style={strong}>{inner}</strong> : inner;
        }
        if (t.startsWith('`'))
          return <code key={i} style={{ ...mono, fontSize: codeSize, background: codeBg, padding: '1px 5px', borderRadius: 3 }}>{t.slice(1, -1)}</code>;
        return t;
      })}
    </>
  );
}

const itemText = (it: Item) => (typeof it === 'string' ? it : it.t);
const itemSubs = (it: Item) => (typeof it === 'string' ? [] : it.sub || []);

function Dashes({ items, strong, size = 15, color = '#3A3935', gap = 8 }: { items: Item[]; strong?: CSSProperties; size?: number; color?: string; gap?: number }) {
  return (
    <ul style={{ ...ul, gap }}>
      {items.map((it, i) => (
        <li key={i} style={{ ...dash, fontSize: size, lineHeight: 1.7, color }}>
          <span style={{ color: '#A8A49B' }}>–</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <span><Rich text={itemText(it)} strong={strong} /></span>
            {itemSubs(it).map((s, j) => (
              <span key={j} style={{ paddingLeft: 14, borderLeft: '1px solid #D9D5CC', fontSize: size - 1, color: '#4A4944' }}>
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
      {b.label && <span style={{ ...mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>{b.label}</span>}
      {b.p && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: '#2A2A2E', textWrap: 'pretty' }}><Rich text={b.p} strong={HL} /></p>}
      {b.items && b.items.length > 0 && <Dashes items={b.items} strong={{ fontWeight: 700, color: '#17171A' }} size={16} color="#2A2A2E" gap={10} />}
      {b.table && (
        <div style={{ overflowX: 'auto', borderTop: '1px solid #17171A' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.6 }}>
            <thead>
              <tr>{b.table[0].map((h) => <th key={h} style={{ ...mono, textAlign: 'left', padding: '10px 16px 10px 0', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', color: '#6B6862', borderBottom: '1px solid #D9D5CC', whiteSpace: 'nowrap' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.table.slice(1).map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: '12px 16px 12px 0', borderBottom: '1px solid #D9D5CC', verticalAlign: 'top' }}><Rich text={c} codeSize="0.9em" /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {b.note && (
        <div style={{ padding: '14px 18px', background: '#ECE9E2', fontSize: 14, lineHeight: 1.7, color: '#3A3935', borderRadius: 4 }}>
          <Rich text={b.note} codeBg="#DEDAD0" codeSize="0.9em" />
        </div>
      )}
    </div>
  );
}

function Detail({ idx, go, goHome }: { idx: number; go: (r: string) => void; goHome: (e: React.MouseEvent) => void }) {
  const p = PROJECTS[idx];
  const fw = FW[p.fw];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const sections: [string, Case[]][] = [['핵심 구현', p.core]];
  if (p.trouble.length) sections.push(['트러블슈팅', p.trouble]);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <article style={{ ...wrap, padding: '56px 32px 96px' }}>
      <a href="#/" onClick={goHome} style={{ ...mono, display: 'inline-flex', gap: 8, fontSize: 12, color: '#6B6862', padding: '6px 0' }}>← 전체 프로젝트</a>
      <div style={{ marginTop: 32, height: 6, borderRadius: 3, background: fw.fill }} />
      <div style={{ padding: '40px 0', borderBottom: '2px solid #17171A' }}>
        <div style={{ ...mono, display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, flexWrap: 'wrap' }}>
          <span style={{ color: fw.ink }}>{p.no}</span>
          <span style={fwBadge(p.fw)}>{fw.label}</span>
          <span style={{ color: '#6B6862' }}>{p.kind}</span>
        </div>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(44px,7vw,96px)', lineHeight: 1.02, letterSpacing: '-0.045em', fontWeight: 800 }}>{p.name}</h1>
        <div style={{ marginTop: 12, fontSize: 20, color: '#3A3935' }}>{p.kr}</div>
        <p style={{ margin: '28px 0 0', fontSize: 19, lineHeight: 1.7, maxWidth: '56ch', textWrap: 'pretty' }}>{p.tagline}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', borderBottom: '1px solid #D9D5CC' }}>
        {p.meta.map(([k, v]) => (
          <div key={k} style={{ padding: '20px 20px 22px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ ...label, fontSize: 11 }}>{k}</span>
            <span style={{ fontSize: 15, lineHeight: 1.55 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ ...mono, display: 'flex', gap: 16, flexWrap: 'wrap', padding: '20px 0', borderBottom: '1px solid #D9D5CC', fontSize: 13 }}>
        {p.links.map(([l, url]) => <a key={url} href={url} target="_blank" className="pf-pill" style={{ display: 'inline-flex', gap: 6, padding: '8px 14px', border: '1px solid #17171A', borderRadius: 99 }}>{l} ↗</a>)}
      </div>

      <div style={row}>
        <div style={sideLabel}>기술 스택</div>
        <div style={{ flex: '1 1 480px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {p.stack.map((s) => <span key={s} style={{ ...chip, fontSize: 12, padding: '6px 10px', color: undefined }}>{s}</span>)}
        </div>
      </div>

      {p.background && (
        <div style={row}>
          <div style={sideLabel}>기획 배경</div>
          <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
            {p.background.map((t, i) => <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.75, textWrap: 'pretty' }}><Rich text={t} strong={HL} /></p>)}
          </div>
        </div>
      )}

      <div style={row}>
        <div style={sideLabel}>담당 업무</div>
        <div style={{ flex: '1 1 480px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px 40px' }}>
          {p.duties.map((g) => (
            <div key={g.group} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{g.group}</span>
              <Dashes items={g.items} strong={{ color: '#17171A', fontWeight: 700 }} />
            </div>
          ))}
        </div>
      </div>

      {p.arch && (
        <div style={row}>
          <div style={sideLabel}>시스템 구성</div>
          <pre style={{ ...mono, flex: '1 1 480px', margin: 0, padding: 24, background: '#17171A', color: '#F3F1EC', borderRadius: 6, fontSize: 13, lineHeight: 1.7, overflowX: 'auto' }}>{p.arch}</pre>
        </div>
      )}

      {sections.map(([title, cases]) => (
        <div key={title} style={{ paddingTop: 72 }}>
          <div style={{ ...h2Bar(), marginBottom: 8 }}>
            <h2 style={h2}>{title}</h2>
            <span style={{ ...mono, fontSize: 12, color: '#6B6862' }}>{pad(cases.length)}</span>
          </div>
          {cases.map((c, i) => (
            <div key={c.title} style={{ ...row, padding: '36px 0' }}>
              <div style={{ flex: '0 0 200px' }}>
                <span style={{ ...mono, fontSize: 28, fontWeight: 500, color: fw.ink }}>{pad(i + 1)}</span>
              </div>
              <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0, maxWidth: 760 }}>
                <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.4, letterSpacing: '-0.02em', fontWeight: 700, textWrap: 'balance' }}><Rich text={c.title} codeSize="0.82em" /></h3>
                {c.blocks.map((b, j) => <CaseBlock key={j} b={b} />)}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ ...row, padding: '72px 0 40px' }}>
        <div style={sideLabel}>{p.verifyTitle}</div>
        <div style={{ flex: '1 1 480px', maxWidth: 760 }}>
          <Dashes items={p.verify} strong={{ color: '#17171A', fontWeight: 700 }} gap={10} />
        </div>
      </div>

      <a href={'#/' + next.slug} onClick={(e) => { e.preventDefault(); go(next.slug); }} className="pf-next" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '40px 0', borderBottom: '2px solid #17171A' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ ...mono, fontSize: 12, color: '#6B6862' }}>다음 프로젝트 · {next.no}</span>
          <span style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.035em' }}>{next.name}</span>
        </div>
        <span style={{ fontSize: 32 }}>→</span>
      </a>
    </article>
  );
}

function Home({ go }: { go: (r: string) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const contactRow: CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid #D9D5CC', fontSize: 14 };
  const vue = FW.vue;

  return (
    <>
      <section style={{ ...wrap, padding: '96px 32px 72px' }}>
        <div style={{ ...label, letterSpacing: '0.08em', marginBottom: 28 }}>Portfolio · 2026</div>
        <h1 style={{ margin: 0, fontSize: 'clamp(40px,6.4vw,84px)', lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 800, maxWidth: '15ch', textWrap: 'balance' }}>사용자도, 팀도 막히지 않게 만드는 프론트엔드 개발자입니다.</h1>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginTop: 56, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 460px', maxWidth: 620, display: 'flex', flexDirection: 'column', gap: 16, fontSize: 17, lineHeight: 1.75, color: '#3A3935', textWrap: 'pretty' }}>
            <p style={{ margin: 0 }}>사용자가 막히는 곳을 출시 전에 찾고, 실제 사용자 앞에서 문제를 해결해 왔습니다. 디엔소프트에서 3일간 754명이 참여한 박람회 이벤트의 현장 장애 대응을 맡았고, 100개 이상의 초등학교가 사용한 관리자 시스템을 일정 안에 오픈했습니다.</p>
            <p style={{ margin: 0 }}>다른 파트가 늦어져도 팀이 기다리지 않도록 공통 스타일과 MSW 목 API를 먼저 준비하고, 성능은 측정으로 병목을 찾아 고칩니다. NEXT GACHA 홈을 서버 렌더링으로 바꿔 모바일 실측 LCP를 3.28s에서 1.78s로 줄였습니다.</p>
          </div>
          <div style={{ flex: '0 1 300px', display: 'flex', flexDirection: 'column', borderTop: '1px solid #17171A' }}>
            <div style={contactRow}><span style={{ ...mono, fontSize: 12, color: '#6B6862' }}>Email</span><a href="mailto:khj000217@gmail.com">khj000217@gmail.com</a></div>
            <div style={contactRow}><span style={{ ...mono, fontSize: 12, color: '#6B6862' }}>GitHub</span><a href="https://github.com/llmeajinll" target="_blank">github.com/llmeajinll</a></div>
            <div style={contactRow}><span style={{ ...mono, fontSize: 12, color: '#6B6862' }}>Velog</span><a href="https://velog.io/@llmeajinll/posts" target="_blank">velog.io/@llmeajinll</a></div>
          </div>
        </div>
      </section>

      <section id="projects" style={{ ...wrap, padding: '48px 32px 96px' }}>
        <div style={h2Bar()}>
          <h2 style={h2}>Projects</h2>
          <span style={{ ...mono, fontSize: 12, color: '#6B6862' }}>03 selected</span>
        </div>
        {PROJECTS.map((p) => {
          const fw = FW[p.fw];
          return (
            <a key={p.slug} href={'#/' + p.slug} onClick={(e) => { e.preventDefault(); go(p.slug); }} className="pf-row" style={{ display: 'grid', gridTemplateColumns: '64px minmax(0,1fr) auto', gap: 24, alignItems: 'start', padding: '36px 0', borderBottom: '1px solid #D9D5CC', color: '#17171A' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
                <span style={{ width: 28, height: 4, borderRadius: 2, background: fw.fill }} />
                <span style={{ ...mono, fontSize: 14, color: fw.ink }}>{p.no}</span>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'clamp(28px,3.4vw,44px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1 }}>{p.name}</span>
                  <span style={{ fontSize: 15, color: '#6B6862' }}>{p.kr}</span>
                  <span style={fwBadge(p.fw)}>{fw.label}</span>
                  {p.ongoing && <span style={{ ...mono, fontSize: 11, padding: '3px 8px', border: '1px solid #17171A', borderRadius: 99 }}>진행 중</span>}
                </div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#3A3935', maxWidth: '62ch', textWrap: 'pretty' }}>{p.tagline}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                  {p.stackShort.map((s) => <span key={s} style={chip}>{s}</span>)}
                </div>
              </div>
              <div style={{ ...mono, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, fontSize: 12, color: '#6B6862', textAlign: 'right', paddingTop: 8 }}>
                <span>{p.period}</span>
                <span style={{ color: '#17171A' }}>{p.roleShort}</span>
                <span style={{ fontSize: 20, marginTop: 8, color: '#17171A' }}>→</span>
              </div>
            </a>
          );
        })}
      </section>

      <section id="experience" style={{ background: '#17171A', color: '#F3F1EC' }}>
        <div style={{ ...wrap, padding: '96px 32px' }}>
          <div style={h2Bar('#F3F1EC')}>
            <h2 style={h2}>Experience</h2>
            <span style={{ ...mono, fontSize: 12, color: '#A8A49B' }}>2023.09.04 ~ 2024.03.31 · 약 7개월</span>
          </div>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', padding: '40px 0 48px', borderBottom: '1px solid #3A3935' }}>
            <div style={{ flex: '1 1 360px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1 }}>디엔소프트</span>
                <span style={fwBadge('vue')}>{vue.label}</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 16, color: '#A8A49B' }}>프론트엔드 개발자 (계약직) · 프론트엔드 개발 · 초기 레이아웃 디자인</div>
              <p style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.7, maxWidth: '52ch', textWrap: 'pretty' }}>실서비스 4건을 개발했습니다. 전시회 현장 이벤트에서는 3일간 754명이 참여했고, 관리자 시스템은 100개 이상의 초등학교에서 사용되었습니다.</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 24 }}>
                {dnStack.map((s) => <span key={s} style={{ ...mono, fontSize: 11, padding: '4px 8px', border: '1px solid #4A4944', borderRadius: 4, color: '#D9D5CC' }}>{s}</span>)}
              </div>
            </div>
            <div style={{ flex: '1 1 380px', display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 1, background: '#3A3935', alignSelf: 'start' }}>
              {dnMetrics.map((m) => (
                <div key={m.k} style={{ background: '#17171A', padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 'clamp(26px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', color: vue.inkDark }}>{m.v}</span>
                  <span style={{ fontSize: 13, color: '#A8A49B', lineHeight: 1.5 }}>{m.k}</span>
                </div>
              ))}
            </div>
          </div>
          {DN_PROJECTS.map((d) => (
            <div key={d.no} style={{ display: 'flex', gap: 40, flexWrap: 'wrap', padding: '40px 0', borderBottom: '1px solid #3A3935' }}>
              <div style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ ...mono, fontSize: 12, color: vue.inkDark }}>{d.no}</span>
                <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{d.name}</span>
                <span style={{ ...mono, fontSize: 12, color: '#A8A49B' }}>{d.period}</span>
                <span style={{ ...mono, fontSize: 12, color: '#A8A49B' }}>{d.team}</span>
              </div>
              <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#D9D5CC', textWrap: 'pretty' }}>{d.desc}</p>
                {d.blocks.map((b) => (
                  <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{b.label}</span>
                    <ul style={{ ...ul, gap: 8 }}>
                      {b.items.map((it, i) => (
                        <li key={i} style={{ ...dash, fontSize: 15, lineHeight: 1.7, color: '#D9D5CC' }}>
                          <span style={{ color: '#6B6862' }}>–</span>
                          <span><Rich text={itemText(it)} strong={{ color: '#F3F1EC', fontWeight: 700 }} codeBg="#2A2A2E" /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', padding: '40px 0 0' }}>
            <div style={{ flex: '0 0 260px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>실무에서 얻은 것</div>
            <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {dnLearned.map((l) => (
                <div key={l.t} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{l.t}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.7, color: '#D9D5CC' }}>{l.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="other" style={{ ...wrap, padding: '96px 32px' }}>
        <div style={h2Bar()}>
          <h2 style={h2}>Other Projects</h2>
          <span style={{ ...mono, fontSize: 12, color: '#6B6862' }}>03</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', borderLeft: '1px solid #D9D5CC' }}>
          {OTHERS.map((o) => {
            const fw = FW[o.fw];
            const isOpen = !!open[o.id];
            return (
              <div key={o.id} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '28px 24px 32px', borderRight: '1px solid #D9D5CC', borderBottom: '1px solid #D9D5CC', borderTop: `4px solid ${fw.fill}` }}>
                <div style={{ ...mono, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 12, color: '#6B6862' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={fwBadge(o.fw)}>{fw.label}</span>{o.kind}</span>
                  <span>{o.period}</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{o.name}</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#3A3935', textWrap: 'pretty' }}>{o.tagline}</p>
                {o.award && <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}>{o.award}</div>}
                <div style={{ ...mono, fontSize: 12, lineHeight: 1.6, color: '#3A3935' }}>{o.role} · {o.team}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {o.stack.map((s) => <span key={s} style={chip}>{s}</span>)}
                </div>
                {isOpen && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 12, borderTop: '1px solid #D9D5CC' }}>
                    <div style={{ ...mono, fontSize: 12, color: '#6B6862' }}>{o.scale}</div>
                    {o.blocks.map((b) => (
                      <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{b.label}</span>
                        <ul style={{ ...ul, gap: 10 }}>
                          {b.items.map((it, i) => (
                            <li key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, lineHeight: 1.65, color: '#3A3935' }}>
                              <span><Rich text={itemText(it)} strong={{ color: '#17171A', fontWeight: 700 }} /></span>
                              {itemSubs(it).map((s, j) => (
                                <span key={j} style={{ paddingLeft: 12, borderLeft: '1px solid #D9D5CC', color: '#6B6862' }}><Rich text={s} strong={{ color: '#17171A', fontWeight: 700 }} /></span>
                              ))}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ ...mono, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 8, fontSize: 12 }}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    {o.links.map(([l, url]) => <a key={url} href={url} target="_blank" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{l} ↗</a>)}
                  </div>
                  <button onClick={() => setOpen((s) => ({ ...s, [o.id]: !s[o.id] }))} className="pf-pill" style={{ font: 'inherit', background: 'none', border: '1px solid #17171A', borderRadius: 99, padding: '6px 12px', cursor: 'pointer' }}>
                    {isOpen ? '접기' : '자세히'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about" style={{ ...wrap, padding: '0 32px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 40, borderTop: '2px solid #17171A', paddingTop: 32 }}>
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
            <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B6862' }}>컴퓨터공학부 소프트웨어공학과<br />2019.03 ~ 2024.02</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={label}>자격증</span>
            <span style={{ fontSize: 17, lineHeight: 1.5 }}>정보처리기사</span>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: '#6B6862' }}>한국산업인력공단 · 2024.12.11</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Portfolio() {
  const [route, setRoute] = useState('');

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
    <div className="pf" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F3F1EC', color: '#17171A', fontFamily: '"Pretendard Variable",Pretendard,system-ui,sans-serif', WebkitFontSmoothing: 'antialiased', wordBreak: 'keep-all' }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" />
      <style>{`
        .pf a{color:inherit;text-decoration:none}
        .pf a:hover{color:${ACCENT}}
        .pf ::selection{background:#17171A;color:#F3F1EC}
        .pf .pf-row:hover{background:#ECE9E2;color:#17171A}
        .pf .pf-pill{color:#17171A}
        .pf .pf-pill:hover{background:#17171A;color:#F3F1EC}
        .pf .pf-next:hover{color:${ACCENT}}
      `}</style>

      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(243,241,236,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #D9D5CC' }}>
        <div style={{ ...wrap, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <a href="#/" onClick={goHome} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>
            <span>김혜진</span>
            <span style={{ ...mono, fontSize: 12, fontWeight: 400, color: '#6B6862' }}>Frontend Developer</span>
          </a>
          <nav style={{ ...mono, display: 'flex', gap: 24, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', flexWrap: 'wrap' }}>
            <a href="#/" onClick={nav('projects')} style={{ padding: '6px 0' }}>Projects</a>
            <a href="#/" onClick={nav('experience')} style={{ padding: '6px 0' }}>Experience</a>
            <a href="#/" onClick={nav('other')} style={{ padding: '6px 0' }}>Other</a>
            <a href="#/" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: '6px 0' }}>Contact</a>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {idx >= 0 ? <Detail idx={idx} go={go} goHome={goHome} /> : <Home go={go} />}
      </main>

      <footer id="contact" style={{ borderTop: '1px solid #D9D5CC' }}>
        <div style={{ ...wrap, padding: '72px 32px 48px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.2, maxWidth: '22ch' }}>막히는 곳을 먼저 찾고, 끝까지 고치는 프론트엔드 개발자입니다.</div>
          <div style={{ ...mono, display: 'flex', gap: 32, flexWrap: 'wrap', fontSize: 13 }}>
            <a href="mailto:khj000217@gmail.com" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>khj000217@gmail.com</a>
            <span>010.9982.6381</span>
            <a href="https://github.com/llmeajinll" target="_blank" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>GitHub ↗</a>
            <a href="https://velog.io/@llmeajinll/posts" target="_blank" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>Velog ↗</a>
          </div>
          <div style={{ ...mono, fontSize: 11, color: '#6B6862' }}>© 2026 김혜진</div>
        </div>
      </footer>
    </div>
  );
}

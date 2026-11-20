import Image from 'next/image';
import { type CSSProperties } from 'react';
import type { Block, DecisionItem, DescriptionItem, Item } from '../data';
import { ImgDuo, ItemFigure, Zoomable, zoomOf } from './Images';
import { Label, Text } from './PortfolioUI';
import { BgFigureView } from './ProjectScreens';
import { CODE_FONT, dash, HL, ui, ul } from './tokens';
import styles from './PortfolioUI.module.css';

// `code`, **bold** 마크업 렌더링. strong 미지정 시 bold는 평문으로 표시
export type Emphasis = 'none' | 'bold' | 'highlight' | 'muted' | 'inverse';
export function Rich({ text, emphasis = 'none', codeTone = 'subtle', codeSize = 'default' }: { text: string; emphasis?: Emphasis; codeTone?: 'subtle' | 'dark'; codeSize?: 'default' | 'table' | 'title' }) {
  const strong: CSSProperties | undefined = {
    none: undefined,
    bold: { fontWeight: 600, color: '#1D1D1F' },
    highlight: HL,
    muted: { fontWeight: 600, color: '#424245' },
    inverse: { fontWeight: 600, color: '#F5F5F7' },
  }[emphasis];
  const codeBg = codeTone === 'dark' ? '#1D1D1F' : '#E8E8ED';
  const codeFontSize = { default: '0.86em', table: '0.9em', title: '0.82em' }[codeSize];
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((t, i) => {
        if (t.startsWith('**')) {
          const inner = t.slice(2, -2).replace(/`/g, '');
          return strong ? <strong key={i} style={strong}>{inner}</strong> : inner;
        }
        if (t.startsWith('`'))
          return <code key={i} style={{ fontFamily: CODE_FONT, fontSize: codeFontSize, background: codeBg, padding: '1px 6px', borderRadius: 6 }}>{t.slice(1, -1)}</code>;
        return t;
      })}
    </>
  );
}

export const itemText = (it: Item) => (typeof it === 'string' ? it : it.t);
export const itemSubs = (it: Item) => (typeof it === 'string' ? [] : it.sub || []);

/** 제목을 먼저 훑고 상세 설명을 읽을 수 있는 목록. 기존 텍스트 규격을 조합한다. */
export function DescriptionList({ items, numbered = false }: { items: DescriptionItem[]; numbered?: boolean }) {
  if (numbered) return <ol className={styles.descriptionNumbered}>
    {items.map((item, i) => <li key={item.title} className={styles.descriptionNumberedRow}>
      <span className={styles.descriptionNumber} aria-hidden="true"><Label variant="small">{String(i + 1).padStart(2, '0')}</Label></span>
      <Text variant="summary">{item.title}</Text>
      <div className={styles.descriptionNumberedBody}><Text secondary><Rich text={item.body} emphasis="bold" /></Text></div>
    </li>)}
  </ol>;
  return (
    <dl className={styles.descriptionList}>
      {items.map((item) => (
        <div key={item.title} className={styles.descriptionRow}>
          <dt className={styles.descriptionTitle}><Text variant="summary">{item.title}</Text></dt>
          <dd className={styles.descriptionBody}><Text secondary measure="reading"><Rich text={item.body} emphasis="bold" /></Text></dd>
        </div>
      ))}
    </dl>
  );
}

/** 사례 안의 판단 카드: 한 문장 제목 아래 문단(body) 또는 상황·판단·근거 라벨 행을 읽는다. */
export function DecisionList({ items }: { items: DecisionItem[] }) {
  return <ol className={styles.decisions}>
    {items.map((item) => <li key={item.title} className={styles.decision}>
      <Text variant="summary">{item.title}</Text>
      {'body' in item
        ? item.body.map((paragraph) => <Text key={paragraph}><Rich text={paragraph} emphasis="bold" /></Text>)
        : <dl className={styles.decisionParts}>
          {([['상황', item.situation], ['판단', item.decision], ['근거', item.reason]] as const).map(([label, text]) => (
            <div key={label} className={styles.decisionPart}>
              <dt><Label variant="block">{label}</Label></dt>
              <dd><Text><Rich text={text} emphasis="bold" /></Text></dd>
            </div>
          ))}
        </dl>}
    </li>)}
  </ol>;
}

// 기존 목록의 용도별 규격. 화면에서 크기나 색상을 따로 지정하지 않는다.
export type ListVariant = 'default' | 'body' | 'compact' | 'content' | 'intro' | 'conditions' | 'scenario' | 'verification' | 'supporting' | 'experience';
const listVariants: Record<ListVariant, { size: number; color: string; gap: number; emphasis: Emphasis; codeTone?: 'dark' }> = {
  default: { size: 15, color: '#424245', gap: 8, emphasis: 'none' },
  body: { size: 15, color: '#424245', gap: 8, emphasis: 'bold' },
  compact: { size: 14, color: '#424245', gap: 8, emphasis: 'bold' },
  content: { size: 16, color: '#1D1D1F', gap: 10, emphasis: 'bold' },
  intro: { size: 16, color: '#424245', gap: 10, emphasis: 'bold' },
  conditions: { size: 16, color: '#424245', gap: 8, emphasis: 'bold' },
  scenario: { size: 15, color: '#1D1D1F', gap: 8, emphasis: 'bold' },
  verification: { size: 15, color: '#424245', gap: 10, emphasis: 'bold' },
  supporting: { size: 14, color: '#6E6E73', gap: 10, emphasis: 'muted' },
  experience: { size: 15, color: '#D2D2D7', gap: 10, emphasis: 'inverse', codeTone: 'dark' },
};
export function Dashes({ items, variant = 'default' }: { items: Item[]; variant?: ListVariant }) {
  const { size, color, gap, emphasis, codeTone } = listVariants[variant];
  return (
    <ul style={{ ...ul, gap }}>
      {items.map((it, i) => (
        <li key={i} style={{ ...dash, fontSize: size, lineHeight: 1.7, color }}>
          <span style={{ color: '#86868B' }}>–</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <span><Rich text={itemText(it)} emphasis={emphasis} codeTone={codeTone} /></span>
            {typeof it !== 'string' && it.img && <ItemFigure img={it.img} />}
            {itemSubs(it).map((s, j) => (
              <span key={j} style={{ paddingLeft: 14, borderLeft: '1px solid #D2D2D7', fontSize: size - 1, color: '#424245' }}>
                <Rich text={s} emphasis={emphasis} />
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CaseBlock({ b }: { b: Block }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {b.label && <Label variant="block">{b.label}</Label>}
      {b.p && <Text><Rich text={b.p} emphasis="highlight" /></Text>}
      {b.decisions && <DecisionList items={b.decisions} />}
      {b.items && b.items.length > 0 && <Dashes items={b.items} variant="content" />}
      {b.imgs && b.imgs.length === 2 && (
        <ImgDuo wide={b.imgs[0]} tall={b.imgs[1]} />
      )}
      {b.lifecycle && <BgFigureView fig={b.lifecycle} variant="lifecycle" />}
      {b.imgs && b.imgs.length > 0 && b.imgs.length !== 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
          {b.imgs.map((img) => (
            <figure key={img.src} style={{ margin: 0, flex: img.h > img.w ? '0 0 200px' : '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Zoomable z={zoomOf(img)}>
                <div style={{ border: '1px solid #D2D2D7', borderRadius: 18, overflow: 'hidden', background: img.kind === 'diagram' ? '#FFFFFF' : '#1D1D1F' }}>
                  <Image src={img.src} alt={img.alt} width={img.w} height={img.h} unoptimized={img.kind === 'diagram'} sizes={img.h > img.w ? '200px' : '(max-width: 640px) 100vw, 480px'} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </Zoomable>
              {img.caption && <figcaption style={{ fontSize: 13, lineHeight: 1.6, color: '#6E6E73', textWrap: 'pretty' }}>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {b.table && (
        <div style={{ overflowX: 'auto', borderTop: '1px solid #1D1D1F' }}>
          {/* 모바일 상세의 overflow-wrap:anywhere가 칸을 좁혀 단어 중간에서 끊지 않게, 표 안은 단어 단위로 줄바꿈하고 넘치면 표만 가로 스크롤한다. */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.6, overflowWrap: 'normal' }}>
            <thead>
              <tr>{b.table[0].map((h) => <th key={h} style={{ ...ui, textAlign: 'left', padding: '10px 16px 10px 0', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', color: '#6E6E73', borderBottom: '1px solid #D2D2D7', whiteSpace: 'nowrap' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.table.slice(1).map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: '12px 16px 12px 0', borderBottom: '1px solid #D2D2D7', verticalAlign: 'top', whiteSpace: 'pre-line' }}><Rich text={c} codeSize="table" /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {b.note && (
        <div style={{ padding: '14px 18px', background: '#F5F5F7', fontSize: 14, lineHeight: 1.7, color: '#424245', borderRadius: 14 }}>
          <Rich text={b.note} codeTone="subtle" codeSize="table" />
        </div>
      )}
    </div>
  );
}

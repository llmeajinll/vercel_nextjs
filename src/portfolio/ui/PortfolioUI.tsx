import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { FW, type FwKey, type Project } from '../data';
import styles from './PortfolioUI.module.css';

type Children = { children: ReactNode };

// 화면에서 style/className을 덮어쓰지 않고, 기존 용도에 맞는 variant를 선택한다.
export function Heading({ children, variant = 'section', id }: Children & { variant?: 'page' | 'section' | 'case' | 'supporting'; id?: string }) {
  const Tag = variant === 'page' ? 'h1' : variant === 'section' ? 'h2' : 'h3';
  return <Tag id={id} className={`${styles.heading} ${styles[variant]}`}>{children}</Tag>;
}

export function Label({ children, variant = 'default', as: Tag = 'span', id }: Children & { variant?: 'default' | 'small' | 'side' | 'block'; as?: 'span' | 'div' | 'h2'; id?: string }) {
  const variants = { default: '', small: styles.labelSmall, side: styles.labelSide, block: styles.labelBlock };
  return <Tag id={id} className={`${styles.label} ${variants[variant]}`}>{children}</Tag>;
}

export function Text({ children, variant = 'body', secondary, measure = 'full' }: Children & { variant?: 'body' | 'lead' | 'summary' | 'intro' | 'note'; secondary?: boolean; measure?: 'full' | 'reading' }) {
  return <p className={`${styles.text} ${styles[variant]} ${secondary ? styles.secondary : ''} ${measure === 'reading' ? styles.reading : ''}`}>{children}</p>;
}

export function ProjectSubtitle({ children, accent = false }: Children & { accent?: boolean }) {
  return <div className={`${styles.subtitle} ${accent ? styles.subtitleAccent : ''}`}>{children}</div>;
}

export function TitleBar({ children, spaced = false }: Children & { spaced?: boolean }) {
  return <div className={`${styles.titleBar} ${spaced ? styles.titleBarSpaced : ''}`}>{children}</div>;
}

export function SectionRow({ children, id, variant = 'default' }: Children & { id?: string; variant?: 'default' | 'case' | 'supporting' | 'verify' | 'stack' }) {
  const variants = { default: '', case: styles.rowCase, supporting: styles.rowSupporting, verify: styles.rowVerify, stack: styles.rowStack };
  return <div id={id} className={`${styles.row} ${variants[variant]}`}>{children}</div>;
}

export function Chip({ children, compact = false, as: Tag = 'span' }: Children & { compact?: boolean; as?: 'span' | 'li' }) {
  return <Tag className={`${styles.chip} ${compact ? styles.compact : ''}`}>{children}</Tag>;
}

export function FrameworkBadge({ framework }: { framework: FwKey }) {
  return <span className={styles.badge} style={{ color: FW[framework].ink }}>{FW[framework].label}</span>;
}

export function PillLink({ children, href }: Children & { href: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`pf-pill ${styles.pill}`}>{children} ↗</a>;
}

export function PillButton({ children, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className' | 'type'>) {
  return <button {...props} type="button" className={`pf-pill ${styles.pill} ${styles.pillButton}`}>{children}</button>;
}

export function ProjectFacts({ meta, links, inset = false }: Pick<Project, 'meta' | 'links'> & { inset?: boolean }) {
  const content = <>
    <div className={styles.facts}>
      {meta.map(([key, value]) => <div key={key} className={styles.fact}>
        <Label variant="small">{key}</Label>
        <span className={styles.factValue}>{value}</span>
      </div>)}
    </div>
    <div className={styles.links}>{links.map(([label, href]) => <PillLink key={href} href={href}>{label}</PillLink>)}</div>
  </>;
  return inset ? <div className={styles.insetInfo}>{content}</div> : content;
}

export function EvidenceNote({ children, placement = 'intro' }: Children & { placement?: 'intro' | 'verification' }) {
  return <p className={`${styles.evidence} ${placement === 'verification' ? styles.evidenceVerification : ''}`}><strong>검증 범위</strong>{children}</p>;
}

export function IntroFrame({ children, id, endsWithInfo = false }: Children & { id?: string; endsWithInfo?: boolean }) {
  return <div id={id} className={`${styles.frame} ${endsWithInfo ? styles.frameWithInfo : ''}`}>{children}</div>;
}

export function ProjectIdentity({ no, fw, kind }: Pick<Project, 'no' | 'fw' | 'kind'>) {
  return <div className={styles.identity}><span className={styles.identityNumber}>{no}</span><FrameworkBadge framework={fw} /><span className={styles.identityKind}>{kind}</span></div>;
}

export function IntroGroup({ children, focus = false, measure = 'full' }: Children & { focus?: boolean; measure?: 'full' | 'reading' }) {
  return <div className={focus ? `${styles.focus} ${measure === 'reading' ? styles.focusReading : ''}` : styles.introGroup}>{children}</div>;
}

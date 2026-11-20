import type { Project } from '../data';
import { CaseBlock, Dashes } from '../ui/Content';
import { EvidenceNote, Label, MetricGrid, SectionRow, Text } from '../ui/PortfolioUI';
import styles from './ProjectVerification.module.css';

/** 검증 범위 → 지표 → 대표 시나리오 → 상세 근거 → 협업 도구 순서로 읽는다. */
export function ProjectVerification({ project: p }: { project: Project }) {
  return <SectionRow id="sec-verify" variant="verify">
    <Label variant="side" as="div">{p.verifyTitle}</Label>
    <div className={styles.content}>
      <EvidenceNote placement="callout">{p.evidenceNote}</EvidenceNote>
      {p.verifyGroups?.map((group) => <div key={group.label} className={`${styles.group} ${group.sub ? styles.secondary : ''}`}>
        {group.metrics ? <>
          {p.leads?.verify && <Text variant="summary">{p.leads.verify}</Text>}
          <MetricGrid items={group.metrics} />
        </> : <Label>{group.sub ? `보조 · ${group.label}` : group.label}</Label>}
        {group.scenarios && <div className={styles.scenarios}>
          <Label variant="block">대표 시나리오</Label>
          <Dashes items={group.scenarios} variant="scenario" />
        </div>}
        {group.lead && <Text secondary>{group.lead}</Text>}
        {group.metrics && <Label variant="block">테스트 도구별 역할</Label>}
        <Dashes items={group.items} variant={group.sub ? 'supporting' : 'verification'} />
        {group.extra && (group.extraLabel ? <details open className={styles.details}>
          <summary className="pf-summary">{group.extraLabel}</summary>
          <div className={styles.detailsContent}><CaseBlock b={group.extra} /></div>
        </details> : <CaseBlock b={group.extra} />)}
      </div>)}
    </div>
  </SectionRow>;
}

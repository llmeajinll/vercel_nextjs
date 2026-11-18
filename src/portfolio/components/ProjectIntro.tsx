import type { Project } from '../data';
import { Dashes } from '../ui/Content';
import { EvidenceNote, Heading, IntroFrame, IntroGroup, Label, ProjectFacts, ProjectIdentity, ProjectSubtitle, Text } from '../ui/PortfolioUI';

/** 소개 순서만 조합한다. 색·글꼴·간격은 공통 UI에서 정한다. */
export function ProjectIntro({ project: p }: { project: Project }) {
  const measure = p.requirements ? 'full' : 'reading';
  return (
    <IntroFrame id={p.toc ? 'sec-intro' : undefined} endsWithInfo={Boolean(p.requirements)}>
      <ProjectIdentity no={p.no} fw={p.fw} kind={p.kind} />
      <Heading variant="page">{p.name}</Heading>
      <ProjectSubtitle accent={p.slug === 'nova'}>{p.kr}</ProjectSubtitle>
      <Text variant="intro" measure={measure}>{p.tagline}</Text>
      {p.requirements
        ? <ProjectFacts meta={p.meta} links={p.links} inset />
        : <EvidenceNote>{p.evidenceNote}</EvidenceNote>}
      {!p.requirements && p.focus && <IntroGroup focus measure={measure}>
        <Label as="h2">핵심 과제</Label>
        <Text variant="summary">{p.focus.lead}</Text>
        <Dashes items={p.focus.items} variant="intro" />
      </IntroGroup>}
    </IntroFrame>
  );
}

import type { Project } from '../data';
import { DescriptionList } from '../ui/Content';
import { Heading, IntroFrame, IntroGroup, Label, ProjectFacts, ProjectIdentity, ProjectSubtitle, Text } from '../ui/PortfolioUI';

/** 소개 순서만 조합한다. 색·글꼴·간격은 공통 UI에서 정한다. */
export function ProjectIntro({ project: p }: { project: Project }) {
  const measure = p.requirements ? 'full' : 'reading';
  return (
    <IntroFrame id={p.toc ? 'sec-intro' : undefined} endsWithInfo={Boolean(p.requirements)}>
      <ProjectIdentity no={p.no} fw={p.fw} kind={p.kind} />
      <Heading variant="page">{p.name}</Heading>
      <ProjectSubtitle accent>{p.kr}</ProjectSubtitle>
      <Text variant="intro" measure={measure}>{p.tagline}</Text>
      {/* 검증 범위는 헤더가 아니라 검증 영역 맨 위에 둔다 */}
      {p.requirements && <ProjectFacts meta={p.meta} links={p.links} inset />}
      {!p.requirements && p.focus && <IntroGroup focus measure={measure}>
        <Label as="h2">핵심 과제</Label>
        <Text variant="summary">{p.focus.lead}</Text>
        <DescriptionList items={p.focus.items} />
      </IntroGroup>}
    </IntroFrame>
  );
}

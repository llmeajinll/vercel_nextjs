import type { Project } from '../data';
import { Dashes, Rich } from '../ui/Content';
import { BgFigureView } from '../ui/ProjectScreens';
import { Label, SectionRow, Text } from '../ui/PortfolioUI';

/** 과제 조건 → 팀의 처리 구조 → 담당 프론트엔드 과제. 같은 맥락을 한 번만 설명한다. */
export function ProjectContext({ project: p }: { project: Project }) {
  if (!p.requirements) return null;
  return (
    <SectionRow id="sec-background" variant="stack">
      <Label as="h2">프로젝트 배경과 과제</Label>
      <Dashes items={p.requirements} variant="conditions" />
      {p.background?.map((paragraph) => <Text key={paragraph}><Rich text={paragraph} emphasis="highlight" /></Text>)}
      {p.bgFigure && <BgFigureView fig={p.bgFigure} />}
      {p.focus && <>
        <Text variant="summary">{p.focus.lead}</Text>
        <Dashes items={p.focus.items} variant="intro" />
      </>}
    </SectionRow>
  );
}

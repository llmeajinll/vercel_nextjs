import type { Project } from '../data';
import { DescriptionList, Rich } from '../ui/Content';
import { BgFigureView } from '../ui/ProjectScreens';
import { Label, NarrativeRow, SectionIntro, SectionRow, SummaryGrid, Text } from '../ui/PortfolioUI';

/** 과제 조건 → 팀의 처리 구조 → 담당 프론트엔드 과제. 같은 맥락을 한 번만 설명한다. */
export function ProjectContext({ project: p }: { project: Project }) {
  if (!p.requirements) return null;
  if (p.context) return <section id="sec-background">
    <SectionIntro title="프로젝트 배경과 과제" note="과제 → 팀의 해법 → 내가 맡은 것">
      <Text variant="lead" measure="reading">{p.context.lead}</Text>
    </SectionIntro>
    <NarrativeRow step="01" label="과제">
      <Text variant="summary">{p.context.taskTitle}</Text>
      <SummaryGrid items={p.requirements} />
    </NarrativeRow>
    <NarrativeRow step="02" label="팀의 해법">
      <Text variant="summary"><Rich text={`**${p.context.solutionTitle}**`} emphasis="highlight" /></Text>
      {p.background?.map((paragraph) => <Text key={paragraph}>{paragraph}</Text>)}
      {p.bgFigure && <BgFigureView fig={p.bgFigure} variant="registration" />}
    </NarrativeRow>
    {p.focus && <NarrativeRow step="03" label="내가 맡은 것">
      <Text variant="summary" measure="reading">{p.focus.lead}</Text>
      <DescriptionList items={p.focus.items} numbered />
    </NarrativeRow>}
  </section>;
  return (
    <SectionRow id="sec-background" variant="stack">
      <Label as="h2">프로젝트 배경과 과제</Label>
      <SummaryGrid items={p.requirements} />
      {p.background?.map((paragraph) => <Text key={paragraph}><Rich text={paragraph} emphasis="highlight" /></Text>)}
      {p.bgFigure && <BgFigureView fig={p.bgFigure} />}
      {p.focus && <>
        <Text variant="summary" measure="reading">{p.focus.lead}</Text>
        <DescriptionList items={p.focus.items} />
      </>}
    </SectionRow>
  );
}

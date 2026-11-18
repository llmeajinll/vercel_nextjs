# 기존 포트폴리오 UI 규격

기존 `Portfolio.tsx`의 컴포넌트와 공통 스타일을 추출했다. Pretendard, 색상, 여백, 반응형 레이아웃을 유지한다. 현재 작업에서 바꾼 소제목과 요약문만 기존 규격으로 정리했다.

## 텍스트

| 역할 | 컴포넌트 | 크기 | 굵기 | 행간 |
| --- | --- | --- | --- | --- |
| 프로젝트 제목 | `Heading variant="page"` | 44–96px | 600 | 1.02 |
| 주요 섹션 제목 | `Heading` | 32–48px | 600 | 1.19 |
| 개발 사례 제목 | `Heading variant="case"` | 22px | 600 | 1.4 |
| 보조 개발 사례 제목 | `Heading variant="supporting"` | 19px | 600 | 1.4 |
| 섹션 소제목 | `Label` | **14px** | **600** | **21px** |
| 메타정보 라벨 | `Label variant="small"` | 12px | 600 | 18px |
| 프로젝트 요약 | `ProjectSubtitle` | 20px | 기본 400, accent 600 | 1.5 |
| 소개 문장 | `Text variant="intro"` | 19px | 400 | 1.7 |
| 핵심 설명 | `Text variant="summary"` | 18px | 600 | 1.6 |
| 본문 | `Text` | 16px | 400 | 1.75 |

`Label`의 실제 규격은 `tokens.ts`의 `typography.label` 하나에서 정의한다. `PortfolioShell`이 CSS 변수로 전달하며, 기존 레이아웃용 라벨도 같은 값을 사용한다. 자간은 0.01em(14px에서 0.14px), 색상은 #6E6E73이다.

## 조합

```tsx
<SectionRow id="sec-background" variant="stack">
  <Label as="h2">프로젝트 배경과 과제</Label>
  <SummaryGrid items={requirements} />
</SectionRow>

<SectionRow>
  <Label as="div" variant="side">기획 배경</Label>
  <Text>프로젝트를 이해하는 데 필요한 설명</Text>
</SectionRow>
```

- `ProjectFacts`: 기간·역할·인원·기여도와 외부 링크. `inset`은 소개 문장 아래 배치할 때 사용한다.
- `ProjectContext`: 과제 조건·팀의 처리 구조·프론트엔드 담당 과제를 한 섹션으로 조합한다.
- `SummaryGrid`: 조건을 900px 이상에서 같은 너비의 3칸, 좁은 화면에서 세로로 표시한다. `Label` 14px·`Text summary` 18px·본문 16px를 재사용한다. 기존 회색 배경(#F5F5F7), 24px 안쪽 여백·모서리, 16px 칸 간격을 사용하며 수치와 가정·요구 조건 설명을 함께 보여준다.
- `DescriptionList`: 제목·설명을 분리한 목록이다. 제목은 기존 `Text summary` 18px/600/28.8px와 파란색(#0071E3), 설명은 `Text` 16px/28px를 사용한다. 900px 이상에서는 제목 200px·열 간격 40px로 정렬하고, 좁은 화면에서는 제목 아래에 설명을 둔다. 항목은 기존 1px 구분선과 위아래 24px 여백으로 나눈다. 데이터에서 제목과 본문을 나누되 설명은 생략하지 않는다.
- `SectionRow`, `TitleBar`: 기존 구분선과 섹션 간격을 재사용한다.
- `FrameworkBadge`, `Chip`, `PillLink`, `PillButton`: 기존 배지·칩·버튼 규격이다.
- `Dashes`: 기존 목록을 용도별로 고정한다. `conditions`·`intro`는 16px, 기본 목록은 15px, 보조 설명은 14px이다. 호출부에 임의의 글자 크기나 색상을 받지 않는다.
- `Rich`: 강조는 `bold`·`highlight`·`muted`·`inverse`, 코드 표시는 정해진 옵션만 사용한다.
- `Images`, `ProjectScreens`, `TableOfContents`, `ProductCardDemo`: 기존 이미지·캐러셀·목차·데모 구현을 옮겼다.

화면 조합부에서 `style`이나 `className`으로 공통 컴포넌트의 규격을 변경하지 않는다. 콘텐츠 수정과 UI 규격 변경은 별개로 검토한다.

## 확인 기준

데스크톱 1440px과 모바일 390px에서 프로젝트 배경과 과제·역할과 담당 업무·기술 스택·테스트 및 협업의 소제목의 `getComputedStyle`을 비교한다. `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `color`가 일치해야 한다. 공통 UI를 추출할 때는 홈·Nova·Ephyra·NEXT GACHA의 텍스트와 레이아웃, 목차, 확대 모달의 ESC·포커스 복귀도 확인한다.

# 공통 UI 구현 안내

디자인의 기준 문서는 [기본 규격](../../../.agents/rules/design-foundations.md)과 [컴포넌트·페이지 구조](../../../.agents/rules/design-components.md)다. **UI 수정 전에 두 문서를 모두 읽는다.** 이 문서는 구현 위치를 안내하며 별도의 크기·색상·간격 기준을 만들지 않는다.

## 구현 위치

| 파일·컴포넌트 | 역할 |
| --- | --- |
| `tokens.ts` | 공통 색상·서체·타이포그래피 값과 CSS 변수 전달 |
| `PortfolioUI.module.css` | 공통 UI의 시각 규격과 반응형 배치 |
| `PortfolioUI.tsx` | `Heading`, `Text`, `Label`, `ProjectSubtitle`, `Chip`, `FrameworkBadge`, `PillLink`, `PillButton` |
| `ProjectFacts`, `ProjectIdentity`, `IntroFrame` | 소개의 식별 줄·기간·역할·인원·기여도·외부 링크 |
| `SectionIntro`, `TitleBar`, `SectionRow`, `NarrativeRow` | 큰 섹션 제목·정보 행·단계별 설명 조합 |
| `SummaryGrid`, `MetricGrid`, `EvidenceNote` | 과제 조건·검증 지표·검증 범위 안내 |
| `Content.tsx` | `Rich`, `Dashes`, `DescriptionList`, `CaseBlock`과 표·노트 |
| `Images.tsx` | `Zoomable`, 이미지 쌍·본문 이미지, 확대 컨텍스트 |
| `ProjectScreens.tsx`, `ProjectScreens.module.css` | `Gallery`, `FlowDetail`, `GroupedFlow`, `BgFigureView` |
| `TableOfContents.tsx` | 데스크톱 선 목차·모바일 목차 |
| `ProductCardDemo.tsx` | 색상 변경 시 슬라이더 재생성을 비교하는 실제 동작 데모 |
| `PortfolioShell.tsx` | 공통 헤더·푸터·폰트·테마 변수 |

## 사용 원칙

- 화면 조합부에서 공통 컴포넌트의 `style`·`className`을 덮어쓰지 않는다. 역할에 맞는 정해진 옵션을 사용한다.
- 같은 역할의 요소가 이미 있으면 재사용한다. 변형을 추가하기 전 디자인 규칙에 해당 역할과 값이 있는지 확인한다.
- `DescriptionList`는 제목과 설명을 나누고, `numbered`는 순서 표시를 포함한다. 설명을 줄여서 레이아웃에 맞추지 않는다.
- `DecisionList`의 판단 카드는 `body` 문단형과 `situation`·`decision`·`reason` 구조형을 받는다. 구조형은 상황·판단·근거 라벨 행으로 표시하며, 카드 폭이 520px 미만이면 라벨을 본문 위에 둔다.
- `GroupedFlow`는 `flow.groups`가 있을 때 사용한다. 기존 이미지·설명·확대 기능과 모바일 캐러셀을 유지한다.
- 기술 스택은 프로젝트의 `stackGroups`를 이용해 분류별로 표시한다.
- `Rich`는 코드와 핵심 구절을 표시한다. 강조와 코드 스타일의 기준은 디자인 규칙에 따른다.
- 컴포넌트 데이터는 `../data.ts`, 화면 조합은 `../components/`에서 관리한다.

## 현재 구현과 새 기준의 차이

아래는 새 스타일을 승인하는 표가 아니라, 사용자 제공 디자인 규칙을 적용할 때 확인해야 하는 **기존 구현의 차이**다. 이번 규칙 문서 정리에서 런타임 UI를 일괄 변경하지 않았다.

| 확인할 곳 | 현재 구현에 남아 있는 차이 | 적용할 기준 |
| --- | --- | --- |
| `Text body` | 행간 1.75 | 기본 본문 행간 1.7 |
| `ProjectSubtitle` | `accent`가 없으면 회색·굵기 400 | 제목 아래 부제는 항상 파란색·20px·600 |
| `Text intro` 읽기 폭 | `56ch` 또는 전체 폭 선택 | 소개 문단 읽기 폭 640px |
| `Dashes` | 하위 목록의 세로선, 용도별로 다른 항목 간격 | 2단계는 `·`, 15px, `ink-2`; 기본 항목 간격 12px |
| `SummaryGrid`·일부 노트 | 일반 카드 24px·검증 범위 노트 16px 반경 | 일반 카드 18px·노트 14px |
| `ProjectIntro` | 일부 프로젝트에서 검증 범위를 소개 안에 표시 | 검증 범위는 하단 테스트·검증 영역 맨 위 |
| `ProjectDetail` | 일부 프로젝트에 미분류 스택·초반 화면 갤러리 경로 존재 | 분류별 스택과 정해진 상세 페이지 순서, 주요 화면의 h2 제목 |
| 다음 프로젝트 링크 | 반응형 값의 데스크톱 상한이 48px | `next-title` 데스크톱 기준 44px |

이 표가 전체 UI의 준수 여부를 보증하지는 않는다. 수정 대상의 코드를 읽고 디자인 규칙과 직접 대조한다. 요청 범위 안에서 공통 구현을 수정하고 영향을 받는 화면을 확인한다. 범위 밖의 미반영 항목을 고쳤다고 보고하지 않는다.

## 확인 방법

- 디자인 기준값은 `.agents/rules` 문서에서 확인한다. 이 파일에 별도 기준 표를 복제하지 않는다.
- 같은 역할의 요소를 브라우저의 `getComputedStyle`로 비교하고 글자 크기·굵기·행간·자간·색상을 기록한다.
- 라벨 영역과 본문 시작점은 요소의 실제 좌표를 확인한다. 큰 섹션 제목과 작은 행 라벨을 서로 비교하지 않는다.
- 공통 UI를 바꾸면 홈·Nova·Ephyra·NEXT GACHA를 데스크톱과 모바일에서 비교하고, 영향을 받는 목차·앵커·확대 모달의 ESC와 포커스 복귀·캐러셀·데모를 확인한다.

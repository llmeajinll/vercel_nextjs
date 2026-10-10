// "포폴 md/Portfolio.dc.html" 데이터 이식본
export type Item = string | { t: string; sub?: string[] };
export type Block = { label?: string; p?: string; items?: Item[]; table?: string[][]; note?: string };
export type Case = { title: string; blocks: Block[] };
export type FwKey = 'react' | 'vue' | 'next';
export type Project = {
  slug: string; fw: FwKey; no: string; name: string; kr: string; ongoing?: boolean; kind: string;
  tagline: string; period: string; roleShort: string; stackShort: string[];
  meta: [string, string][]; links: [string, string][]; stack: string[];
  background?: string[]; arch?: string;
  duties: { group: string; items: Item[] }[];
  core: Case[]; trouble: Case[]; verifyTitle: string; verify: Item[];
};
export type Other = {
  id: string; fw: FwKey; name: string; kind: string; period: string; award?: string; tagline: string;
  role: string; team: string; scale: string; stack: string[]; links: [string, string][];
  blocks: { label: string; items: Item[] }[];
};
export type DnProject = { no: string; name: string; period: string; team: string; desc: string; blocks: { label: string; items: Item[] }[] };

export const FW: Record<FwKey, { label: string; fill: string; on: string; ink: string; inkDark?: string }> = {
  react: { label: 'React', fill: '#0369A1', on: '#F0FBFF', ink: '#0369A1' },
  vue: { label: 'Vue', fill: '#42B883', on: '#0B2A1E', ink: '#1F7A55', inkDark: '#42B883' },
  next: { label: 'Next.js', fill: '#17171A', on: '#F3F1EC', ink: '#17171A' },
};

export const PROJECTS: Project[] = [
  {
    slug: 'nova', fw: 'react', no: '01', name: 'Nova', kr: '스마트폰 사전예약 플랫폼', ongoing: true, kind: '팀 프로젝트 · 진행 중',
    tagline: '오픈 직후 신청이 몰려도 사전예약을 유실 없이 접수하고, 외부 시스템 처리를 기다리지 않고 결과를 안내하는 스마트폰 사전예약 플랫폼',
    period: '2026.09 ~ 진행 중', roleShort: 'Frontend',
    stackShort: ['React 19', 'TypeScript', 'TanStack Query', 'MSW', 'FSD'],
    meta: [['기간', '2026.09.15 ~ 진행 중'], ['역할', 'Frontend (구매자 화면 전담)'], ['인원', 'FE 2'], ['기여 규모', 'FE 커밋 372개 중 214개 (merge 제외), 현재 src 코드 중 약 60% 작성 (git blame 기준)']],
    links: [['배포', 'https://fe-iota-peach.vercel.app/'], ['GitHub', 'https://github.com/Grandis-2/fe']],
    stack: ['React 19', 'TypeScript', 'Vite', 'TanStack Query v5', 'Zustand', 'Vanilla Extract', 'react-router v7', 'MSW 2', '토스페이먼츠 SDK', '카카오 OAuth', 'Storybook 10 + Vitest', 'ESLint', 'husky + commitlint', 'Vercel'],
    duties: [
      { group: '구매자 화면', items: ['메인, 사전예약 목록·상세, 상품 상세·옵션 선택, 사전예약 대기열, 결제(토스페이먼츠), 주문 결과, 마이페이지(장바구니·배송지·사전예약 내역)', '카카오 로그인·회원가입 온보딩, 세션 관리'] },
      { group: '프론트엔드 기반', items: ['FSD(Feature-Sliced Design) 레이어 구조 설계, ESLint로 레이어 의존 방향 강제', 'API 클라이언트(타임아웃·요청 취소·에러 변환), TanStack Query 캐시·재시도 정책', 'MSW 목 서버와 실패 재현 도구, 디자인 토큰·공용 UI 컴포넌트'] },
    ],
    core: [
      { title: '페이지를 옮겨도 끊기지 않는 사전예약 대기열', blocks: [
        { label: '문제', p: '대기열 모달을 사전예약 상세 페이지 안에 두면, 기다리는 동안 다른 상품을 둘러보러 나가는 순간 대기 상태가 사라집니다. 반대로 모달을 닫을 수 없게 막으면 사용자는 아무것도 못 하고 기다려야 합니다.' },
        { label: '해결', items: [
          '대기열 컴포넌트를 `RootLayout`에 하나만 두고, 줄을 서는 쪽은 `joinPreorderQueue()`만 호출하도록 분리했습니다. 토스트와 같은 구조라서, 페이지를 옮기면 모달은 작은 `QueuePill`로 바뀌어 화면에 남습니다.',
          { t: '내 차례가 왔을 때 사용자가 무엇을 보고 있었는지에 따라 이동 방식을 다르게 했습니다.', sub: ['모달이 열려 있을 때: 진행률 100%를 0.8초 보여준 뒤 이동합니다.', '모달을 닫아 두었을 때: `QueuePill`이 5초를 센 뒤 이동합니다. 보고 있던 화면이 갑자기 바뀌지 않게 하기 위해서입니다.'] },
          "내 앞이 10명 이하가 되면 '곧 내 차례'로 미리 알리고, 바뀐 문구는 `aria-live`로 스크린리더가 읽어 줍니다.",
          "예상 대기 시간은 초 단위가 아니라 구간으로 보여줍니다('곧 입장 / 약 1분 / 약 5분 / 오래 걸림'). \"0초\"가 보이면 사용자가 곧 입장하는 것으로 오해할 수 있기 때문입니다.",
          '호출하는 쪽이 매 렌더마다 새 콜백을 넘겨도 타이머가 리셋되지 않도록 React 19의 `useEffectEvent`로 감쌌습니다.',
        ], note: '[진행 중] 서버 대기열 API 연동: `Retry-After` 간격 폴링, 줄이 가득 찼을 때(`QUEUE_FULL`) 10초 뒤 다시 진입, 일시 장애 시 2초 뒤 재진입' },
      ] },
      { title: '실패 유형별로 나눈 네트워크 정책', blocks: [
        { label: '문제', p: '재시도 규칙이 없으면 로그인이 안 된 사용자의 401이나 잘못된 입력의 400 같은 "다시 보내도 결과가 같은 실패"까지 재시도합니다. 응답이 오지 않으면 로딩도 끝나지 않습니다.' },
        { label: '해결', items: [
          '**재시도 기준을 하나로 정했습니다.** 4xx는 재시도하지 않고, 5xx·타임아웃·네트워크 오류만 재시도합니다. 응답 자체를 못 받은 경우는 `status 0`인 `ApiRequestError`로 바꿔, 재시도 여부를 한 함수(`isRetryableError`)에서 판단합니다.',
          '**데이터 성격별로 캐시 정책 3가지를 만들었습니다.** 각 `useQuery`에 값을 직접 쓰지 않고 이 정책 중 하나를 골라 펼쳐 씁니다.',
        ], table: [['정책', '대상', 'staleTime', '재시도'], ['`catalog`', '상품 목록·검색·상세', '5분', '2회'], ['`account`', '프로필·배송지', '5분', '1회'], ['`live`', '장바구니·알림 개수', '0', '1회']] },
        { items: [
          '**변경 요청(mutation)은 자동 재시도하지 않습니다.** 같은 요청이 두 번 반영될 수 있기 때문입니다.',
          '**10초 타임아웃**을 두었고, 끝나지 않는 로딩 대신 "서버 응답이 늦어지고 있습니다"를 보여줍니다.',
          '**이전 요청을 취소합니다.** 모든 조회 훅이 `queryFn`의 `signal`을 넘겨서, 검색 조건이 바뀌면 이전 요청이 취소됩니다. 늦게 도착한 이전 응답이 새 화면을 덮어쓰지 않습니다.',
        ] },
      ] },
      { title: '`?mock=<상태코드>`로 모든 실패를 재현하는 목 서버', blocks: [
        { label: '문제', p: '백엔드 API가 준비되기 전에 화면을 개발해야 했습니다. 그런데 에러 화면은 서버가 실제로 실패해야 볼 수 있어서 검증되지 않은 채 남기 쉽습니다.' },
        { label: '해결', items: [
          'MSW 목 서버를 실제 서버와 같은 응답 형태(`success / data / error / traceId`)로 만들었습니다.',
          'URL에 `?mock=500`이나 `?mock=401`을 붙이면 모든 목 API가 그 상태 코드로 실패합니다. 브라우저에서 바로 에러·재시도·로그인 만료 화면을 확인할 수 있습니다.',
          '배포 환경에서도 `VITE_USE_MSW=true`이면 목 서버가 켜지게 해서, 백엔드 없이도 배포본으로 시연할 수 있게 했습니다.',
        ] },
      ] },
      { title: '규칙을 문서가 아니라 lint로 강제', blocks: [
        { label: '문제', p: '2인 FE 팀에서 FSD 레이어 규칙(`app → pages → widgets → features → entities → shared`)을 말로만 정하면, 급할 때 역방향 import가 생깁니다.' },
        { label: '해결', items: [
          '`eslint-plugin-import-x`의 `no-restricted-paths`로 레이어별 import 금지 구역을 설정했습니다. 규칙을 어기면 커밋 단계(husky + lint-staged)에서 막힙니다.',
          '**서버 응답 형태(DTO)가 UI까지 새지 않게 했습니다.** DTO 타입은 `entities/*/api`와 `entities/*/model`에서만 import할 수 있도록 lint로 막았습니다. API 응답이 바뀌어도 고칠 곳은 `entities/*/api` 한 곳입니다.',
          '**경계 문제는 의존성 주입으로 풀었습니다.** `shared`의 API 클라이언트는 `entities/auth`를 import할 수 없습니다. 그래서 인증 헤더와 401 처리 함수를 앱 부팅 시점에 주입받는 방식(`configureApiAuth`)으로 해결했습니다.',
        ] },
      ] },
    ],
    trouble: [
      { title: '"카카오 인증만 마친 사용자"를 회원으로 볼 것인가', blocks: [
        { label: '상황', p: '카카오 로그인 후 추가 정보를 입력해야 가입이 끝납니다. 처음에는 세션이 있으면 로그인 상태로 보고, 추가 정보를 입력하지 않았으면 `/signup`으로 강제로 되돌리는 방식이었습니다.' },
        { label: '문제', p: '가입 화면을 벗어나려는 사용자가 계속 `/signup`으로 튕겨 나갔습니다. 회원이 아닌데도 헤더에는 회원 메뉴가 보였습니다.' },
        { label: '변경', items: [
          '회원의 기준을 **"카카오 인증 + 추가 정보 입력 완료"**로 다시 정했습니다.',
          '카카오 인증만 마친 상태는 `isSignupPending`으로 따로 나눴습니다.',
          '이 상태에서 `/signup` 밖으로 나가면 가입 취소로 보고 세션을 지웁니다. 되돌리는 대신 놓아주는 쪽을 택했습니다.',
          '링크 이동, 주소창 이동, 새로고침(토큰 재발급으로 세션이 되살아나는 경우)을 `RootLayout` 한 곳에서 처리합니다.',
          '카카오 콜백 페이지가 세션을 넣고 이동하는 그 순간에 세션이 지워지지 않도록, 실행 시점의 `window.location`을 다시 읽고 콜백 경로는 예외로 두었습니다.',
        ] },
      ] },
      { title: '결제창을 닫았을 뿐인데 "결제 오류"가 뜨는 문제', blocks: [
        { label: '원인', p: '토스페이먼츠 `requestPayment`는 사용자가 결제창을 닫아도 `USER_CANCEL` 코드로 reject합니다. 이걸 일반 오류처럼 처리해서 "결제 요청 중 문제가 발생했습니다"가 표시됐습니다.' },
        { label: '해결', p: '결제 요청 함수에서 `USER_CANCEL`만 정상 흐름으로 처리하고, 나머지 오류는 그대로 던지도록 했습니다. 사용자의 의도적인 취소와 실제 오류를 구분했습니다.' },
      ] },
      { title: '화면 밖에 숨긴 주문 바가 헤더 클릭을 가로채는 문제', blocks: [
        { label: '원인', p: '데스크톱에서 하단 주문 바를 `translateY`로 화면 밖으로 밀어 숨겼습니다. 그런데 바를 감싸는 컨테이너의 레이아웃 박스는 원래 자리에 남아 있었고, 그 자리가 헤더와 겹쳐서 헤더 클릭을 막았습니다.' },
        { label: '해결', p: '컨테이너는 평소 `pointer-events: none`으로 두고, 주문 바가 실제로 보일 때만 `auto`로 되살렸습니다.' },
      ] },
    ],
    verifyTitle: '검증과 협업',
    verify: [
      '**Storybook + Vitest**: 컴포넌트 스토리의 `play` 함수를 실제 브라우저(Chromium)에서 실행하는 인터랙션 테스트 (팀 전체 54개)',
      '**CodeRabbit AI 코드 리뷰**: PR마다 리뷰를 받고, 지적 사항을 반영한 커밋 12건 (접근성, 위젯 경계, 세션 보안 등)',
      '**커밋 규칙**: commitlint + husky로 커밋 메시지 형식 강제. 커밋 본문에 변경 이유를 남김',
      '**AI 활용 · 규칙으로 남기기**: Claude Code가 프로젝트 규칙을 어긴 코드를 제안하면 고치는 데서 끝내지 않고, `CLAUDE.md`와 경로별 `.claude/rules/`(styling · data-layer · routing · jsx)에 "겪은 사례"로 남겨 같은 코드가 다시 나오지 않게 함',
      '**역할별 서브에이전트 7종**: 읽기 전용 리뷰어(`fsd-reviewer`, `auth-payment-guard`), 검증(`test-runner`, `ui-verifier`), 작업 보조(`api-spec-aligner`, `review-responder`, `pr-writer`). 어떤 에이전트도 커밋·푸시·PR 답글은 하지 않고 제안까지만 함',
      '**브라우저 검증 (Chrome MCP)**: AI의 "됐다"는 답변만 믿지 않고 실제 브라우저로 화면, 콘솔 에러, 네트워크 요청을 확인하고 모바일·데스크톱 폭을 바꿔 반응형까지 점검',
      '**OpenWiki · Figma MCP**: 기능별 흐름과 코드 위치를 정리한 위키를 자동 생성하고, Figma 디자인과 구현 화면을 서로 대조',
    ],
  },
  {
    slug: 'ephyra', fw: 'react', no: '02', name: 'Ephyra', kr: '에피라 · AI 통신 요금제 상담 · 가입 플랫폼', kind: 'LG유플러스 유레카 프론트엔드 개발자 과정 종합프로젝트',
    tagline: '데이터·통화·예산·OTT 이용 성향을 채팅으로 입력하면 AI가 요금제를 추천하고, 비교·가입·리워드까지 하나의 채팅 흐름으로 연결하는 서비스',
    period: '2026.08 ~ 2026.09 · 3주', roleShort: '조장 · PL · Frontend',
    stackShort: ['React 19', 'Supabase', 'OpenAI API', 'Playwright', 'Storybook'],
    meta: [['기간', '2026.08.14 ~ 2026.09.04 (3주)'], ['역할', '조장 · PL · Frontend · Design'], ['인원', 'FE 4인 (전원 FE, 일부 BE·LLM 겸임)'], ['기여 규모', '커밋 164개 (팀 전체 496개 중 2위), src 코드 중 약 28% 작성, PR 13건']],
    links: [['배포', 'https://comp-project-seven.vercel.app'], ['GitHub', 'https://github.com/UrecaCompProject/compProject']],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'TanStack Query', 'Zustand', 'Supabase (Auth · PostgreSQL · Edge Functions)', 'OpenAI API', 'Storybook', 'Playwright', 'MSW', 'Vercel'],
    duties: [
      { group: '기능', items: [
        '**상담 레포트**: 생성 데이터 구조 설계, 레포트 카드·상세 화면(추천·비교·변경 카드, 요약 카드)',
        '**회원가입**: 채팅 흐름 안에서 진행되는 회원가입, 로그인 모달, 비로그인 사용자 로그인 유도 정책',
        '**요금제 추천 입력 UI**: 드롭다운·숫자 입력을 칩 선택 방식으로 개편',
        '**리워드·게임**: 출석 룰렛, 반응속도 게임, 출석·배지·상품 교환 API 연동',
        '**마이페이지 사용량**: 최근 3개월 사용량 차트(Chart.js 기반 `LineChart`), 데이터·통화 사용량 섹션',
      ] },
      { group: '공통·품질', items: [
        '**공통 UI**: Button, Input, Card, Modal, Tab, LineChart와 Storybook 스토리',
        '**QA 리포트와 회귀 테스트**: 서비스 전체 QA를 진행하고 Playwright 회귀 테스트 3종 작성',
        '**팀 운영**: 조장·PL로 일정과 역할 조율, CodeRabbit AI 코드 리뷰 도입',
      ] },
    ],
    core: [
      { title: 'LLM에게 맡길 것과 맡기지 않을 것: 상담 레포트 구조 개편', blocks: [
        { label: '문제', p: '처음 상담 레포트는 대화 전체를 LLM에 넘기고, 요금제명·추천 사유·절감액까지 LLM이 대화 텍스트에서 다시 추론하게 하는 구조였습니다.', items: ['클라이언트가 이미 정확히 알고 있는 구조화된 값(추천 요금제, 월 절감액)을 LLM이 다시 추측하다 보니 틀릴 여지가 있었습니다.', '상담 중 요금제를 비교하거나 실제로 가입·변경한 기록은 레포트에 아예 반영되지 않았습니다.'] },
        { label: '판단', p: '**정확해야 하는 값은 코드가, 요약은 LLM이** 맡도록 역할을 나눴습니다.', table: [['섹션', '데이터 출처'], ['추천 (`recommendedPlans`)', '추천 요청마다의 라운드 배열. 채팅 메시지에 이미 있는 구조화 데이터'], ['비교 (`comparedPlan`)', '마지막 비교 결과'], ['변경 (`changedPlan`)', '실제 가입·변경된 요금제 + LLM이 생성한 "기존 대비 좋은 점"'], ['기타 (`otherNotes`)', 'LLM이 생성한 자유 서술 요약']] },
        { label: '구현', items: [
          '같은 조건 입력에서 나온 추천들을 한 라운드로 묶기 위해, 정보 입력 폼을 새로 제출할 때마다 `groupId`를 발급했습니다. 이후 퀵 리플라이로 다시 질문하면 직전 라운드의 `groupId`를 이어받습니다.',
          'LLM에 넘기던 Q&A에서 이미 구조화된 추천 조건(나이·데이터·예산·OTT)이 중복되던 부분을 제거했습니다.',
          '개편 전에 저장된 레포트는 기존 관계형 조인 결과로 자동 폴백되도록 해서, 데이터 마이그레이션 없이도 이전 레포트가 깨지지 않게 했습니다.',
        ] },
      ] },
      { title: 'QA 리포트와 Playwright 회귀 테스트', blocks: [
        { label: '배경', p: '마감 3일 전, 팀원 4명이 나눠 만든 기능이 하나의 채팅 화면에 합쳐지면서 기능 사이의 문제가 보이지 않는 상태였습니다.' },
        { label: '진행', items: [
          '목업이 아니라 **실제 Supabase와 실제 OpenAI Edge Function**을 대상으로, Chrome MCP로 AI가 실제 브라우저를 조작하게 해서 기능별 정상 흐름을 처음부터 끝까지 실행했습니다.',
          { t: '발견한 문제를 P0~P3로 분류해 QA 리포트로 정리했습니다(P0 2건, P1 2건, P2 3건, P3 2건).', sub: ['**P0**: "기타 상담" 모드가 어떤 질문에도 같은 고정 문구만 반환함 (LLM 미호출 + 키워드 라우터가 이전 모드 유지)', '**P0**: Error Boundary가 하나도 없어서, 지연 로드 청크 하나가 실패하면 화면 전체가 백지가 됨 (실제 재현)', '**P1**: README에 적힌 접근성 기능이 코드에 없음'] },
          { t: '재현한 시나리오를 Playwright 회귀 테스트 3종으로 남겼습니다. 테스트는 QA 전용 dev 서버를 스스로 띄운 뒤 헤드리스 Chromium에서 실행되어, 사람이나 AI가 매번 다시 확인하지 않아도 됩니다.', sub: ['게스트 스모크 테스트', '회원가입 → AI 추천 → 요금제 가입 골든 패스', '"기타 상담" 버그 재현: `test.fail`로 기록해 두고, 버그가 고쳐지면 통과로 전환되도록 함'] },
        ] },
      ] },
      { title: '비로그인 사용자 정책: 어디까지 열어 둘 것인가', blocks: [
        { label: '판단', p: 'AI 상담은 로그인 없이 체험할 수 있어야 첫 진입 장벽이 낮습니다. 하지만 OpenAI 호출에는 비용이 듭니다.' },
        { label: '구현', items: [
          '비로그인 상태로 AI 응답이 5회 쌓이면 로그인 모달을 한 번 자동으로 띄웁니다.',
          '그 이후에는 퀵 리플라이 등 어떤 버튼을 눌러도 실제 동작 대신 로그인 모달이 뜹니다.',
          '비회원이 레포트를 생성할 수 없도록, 일반 대화 경로에 빠져 있던 로그인 체크를 추가했습니다. 요금제 추천 경로에는 이미 체크가 있었습니다.',
          '채팅 밖(헤더)에서 회원가입을 누르면 채팅 홈으로 이동한 뒤 가입 흐름을 이어서 시작하도록 했습니다. 페이지 이동 대신 `useSignupIntentStore` 신호를 사용합니다.',
        ] },
      ] },
      { title: '추천 조건 입력을 칩 선택으로', blocks: [
        { label: '문제', p: '나이·우선순위는 드롭다운, 데이터·예산은 숫자 입력이었습니다. 사용자가 자기 데이터 사용량을 숫자로 정확히 모르는 경우가 많았습니다.' },
        { label: '구현', items: [
          '모든 입력을 칩 버튼으로 통일하고, "무관"과 "미확인" 선택지를 추가했습니다.',
          '"무관"을 고르면 실제 제출값에서는 필터 없음과 같게 처리하되, 채팅 요약에는 사용자가 고른 그대로 보이도록 했습니다.',
          '서버(Edge Function)가 "값 없음"과 "명시적으로 무관을 선택함"을 구분할 수 있도록 `skippedFields`를 추가했습니다. 그래서 사용자가 이미 "무관"이라고 답한 항목을 AI가 다시 묻지 않습니다.',
        ] },
      ] },
    ],
    trouble: [
      { title: '요금제를 바꿨는데 채팅에는 예전 요금제가 남는 문제', blocks: [
        { label: '원인', p: '같은 "현재 요금제" 데이터를 두 곳에서 읽고 있었습니다. 요금제 가입·변경 시 TanStack Query 캐시(`[\'plans\',\'current\']`)만 갱신했는데, 채팅은 별도의 Zustand 스토어(`useSubscriptionStore`)를 참조하고 있었습니다. 그래서 레포트와 비교 화면에 예전 요금제가 계속 "현재 요금제"로 표시됐습니다. QA에서 데이터 출처가 두 곳으로 나뉜 구조를 먼저 발견해 두었습니다.' },
        { label: '해결', p: '신청이 성공하면 Zustand 스토어도 함께 갱신하도록 수정했습니다.' },
        { label: '남은 과제', p: '근본적으로는 서버 데이터를 TanStack Query 한 곳에서만 읽어야 합니다. 마감 일정 때문에 두 곳을 동기화하는 선에서 멈췄습니다.' },
      ] },
      { title: '스크래치 게임 보상이 여러 번 지급되는 문제', blocks: [
        { label: '원인', p: '클리어 판정 후에도 `pointermove`·`pointerup` 이벤트 리스너가 남아 있어서, 판정 함수가 계속 실행되며 `onWin`(배지 지급)이 중복 호출됐습니다.' },
        { label: '해결', p: '`hasCleared` 플래그로 클리어 처리를 1회로 제한하고, 클리어 시 `pointermove` 리스너를 제거했습니다.' },
      ] },
      { title: 'Tailwind 색상 클래스가 적용되지 않는 문제', blocks: [
        { label: '원인', p: '마이페이지 사용량 바에서 항목별 색을 `text-${chooseColor(label)}`처럼 문자열을 조합해 만들었습니다. Tailwind는 빌드할 때 소스 코드에서 완성된 클래스명을 정적으로 찾아 CSS를 생성하기 때문에, 조합된 클래스는 CSS가 만들어지지 않아 색이 보이지 않았습니다.' },
        { label: '해결', p: '항목별로 완성된 클래스명(`text-reward-active`, `bg-reward-active` 등)을 `COLOR_CLASSES` 매핑 객체에 그대로 적어 두고, 라벨을 키로 선택하는 방식으로 바꿨습니다.' },
      ] },
    ],
    verifyTitle: '검증과 협업',
    verify: [
      '**Storybook**: 공통 UI 컴포넌트 카탈로그 (팀 전체 31개 스토리)',
      '**CodeRabbit AI 코드 리뷰**: 직접 도입하고 모든 브랜치를 검사하도록 설정',
      '**Playwright**: 실제 백엔드 대상 회귀 테스트 3종',
      '**AI 활용**: Chrome MCP로 AI가 실제 브라우저를 조작하게 해서 기능별 정상 흐름을 처음부터 끝까지 실행하며 QA를 진행하고, 찾은 문제의 재현 시나리오는 Playwright 테스트 코드로 고정',
    ],
  },
  {
    slug: 'nextgacha', fw: 'next', no: '03', name: 'NEXT GACHA', kr: '1인 5개 구매 제한 가챠 쇼핑몰', kind: '개인 프로젝트 · 1인 개발',
    tagline: '되팔이의 대량 구매를 막기 위해 같은 상품을 1인당 최대 5개까지만 살 수 있게 만든 온라인 가챠 쇼핑몰',
    period: '2025.09 ~ 2026.02 · 6개월', roleShort: '기획 · FE · BE · Design',
    stackShort: ['Next.js 16', 'TypeScript', 'TanStack Query', 'MongoDB', 'NextAuth'],
    meta: [['기간', '2025.09 ~ 2026.02 (약 6개월) + 2026.09 구조 리팩토링 · 2026.10 성능 개선'], ['역할', '기획 · Frontend · Backend · Design'], ['인원', '1인 개발'], ['규모', '커밋 129개, API Route 20여 개, 사용자 화면과 관리자 백오피스 포함']],
    links: [['배포', 'https://nextgacha.vercel.app'], ['GitHub', 'https://github.com/llmeajinll/Nextgacha']],
    stack: ['Next.js 16 (App Router)', 'TypeScript', 'TanStack Query', 'Jotai', 'Vanilla Extract', 'NextAuth (카카오 OAuth)', 'MongoDB Atlas', 'TossPayments', 'Vercel Blob', 'MUI X Charts', 'Jest + React Testing Library', 'Vercel'],
    background: ['정가 상품을 대량으로 사서 웃돈을 붙여 되파는 사람들 때문에, 정작 그 상품을 원하는 사람이 더 비싸게 사야 하는 문제가 있습니다.', '그래서 **같은 상품을 1인당 최대 5개**까지만 살 수 있게 했습니다. 기준은 전시용, 보관용, 예비용 2개, 선물용입니다. 배송이 끝나기 전까지는 주문한 수량도 이 한도에 포함되고, 배송이 완료되면 다시 5개까지 살 수 있습니다.'],
    arch: '브라우저 ─▶ proxy.ts (로그인·관리자 권한 검사, 방문 기록)\n              │\n              ▼\n         API Routes (BFF) ─▶ MongoDB Atlas\n              │        └──▶ TossPayments (결제 승인)\n              │        └──▶ Vercel Blob (상품 이미지 업로드 토큰)\n              ▼\n         NextAuth ◀──▶ Kakao OAuth',
    duties: [
      { group: 'Frontend', items: ['페이지별 렌더링 방식(Server/Client) 결정, 데이터 조회·캐싱 구조, 장바구니·결제·마이페이지'] },
      { group: 'Backend', items: ['Next.js API Route로 BFF 구성, MongoDB Atlas CRUD, 카카오 로그인(NextAuth), 토스페이먼츠 결제 승인'] },
      { group: '관리자', items: ['상품·재고 관리, 주문 상태 일괄 변경, 이벤트 할인, 통계, 오류 수집 페이지'] },
      { group: 'Design', items: ['UI/UX 디자인 (Figma)'] },
    ],
    core: [
      { title: '장바구니 수량 변경: 서버 캐시 재검증에서 클라이언트 캐시로', blocks: [
        { label: '처음 설계', p: '상태 관리 라이브러리 없이 App Router 캐싱만 쓰려고, 수량을 바꿀 때마다 서버 API를 호출하고 `revalidateTag`로 캐시를 무효화한 뒤 다시 조회했습니다.' },
        { label: '문제', items: ['수량 버튼을 누를 때마다 캐시 무효화 → 재조회가 반복되어, 서버 응답이 올 때까지 화면 숫자가 바뀌지 않았습니다.', '연속으로 클릭하면 각 요청이 이전 응답(stale state) 기준으로 나가서, 5개 한도를 넘는 요청이 생길 수 있었습니다.'] },
        { label: '판단', p: '장바구니처럼 자주 누르는 기능은 즉각적인 반응이 더 중요하다고 보고, 번들 크기가 늘어나는 것을 감수하고 TanStack Query로 바꿨습니다.' },
        { label: '구현 · features/cart/model/useCart.ts', items: [
          '**요청 전 검증**: 증가 버튼을 누르면 서버로 보내기 전에 `장바구니 수량 + 배송 중 수량 < min(5, 재고 + 배송 중 수량)`을 확인합니다. 한도를 넘으면 요청을 보내지 않고 이유(재고, 배송 중 수량, 최대 수량)를 안내합니다.',
          '**연속 클릭 방지**: 요청이 처리되는 동안(`isPending`)에는 추가 클릭을 무시합니다.',
          '**낙관적 업데이트**: `onMutate`에서 화면 숫자를 먼저 바꾸고, 실패하면 `onError`에서 이전 값으로 되돌립니다. `onSettled`에서 서버와 다시 맞춥니다.',
          '**삭제 확인**: 수량이 1일 때 감소 버튼을 누르면 삭제 여부를 먼저 묻습니다.',
        ] },
      ] },
      { title: 'FSD 구조로 리팩토링 (2026.09)', blocks: [
        { p: '6개월 동안 기능을 붙이면서 `components/atoms·molecules·templates`와 `app/hooks`에 코드가 섞여 있었습니다. 기능 하나를 고치려면 여러 폴더를 오가야 했습니다.', items: [
          '**FSD 레이어로 이전**: `shared → entities → features → widgets → views` 순서로 5단계에 걸쳐 옮기고, 레이어 규칙을 어긴 import(BuyBtn, HeartBtn, like)를 정리했습니다.',
          '**스타일 전환**: 파일 곳곳의 inline style을 Vanilla Extract `css.ts`로 8단계에 걸쳐 모두 옮겼습니다.',
          '**단계별 커밋**: 각 단계를 별도 커밋으로 나눠서, 문제가 생기면 그 단계만 되돌릴 수 있게 했습니다.',
        ] },
      ] },
      { title: 'proxy 기반 접근 제어', blocks: [
        { items: [
          '**`/api/protected/*`**: 로그인하지 않으면 401',
          '**관리자 API** (상품 등록·수정, 주문 상태 변경, 오류 조회 등): `ADMIN_EMAILS`에 등록된 계정이 아니면 403',
          '**관리자 페이지**: 메인 메뉴와 통계는 포트폴리오 시연용으로 공개하고, 나머지는 관리자만 접근하도록 리다이렉트',
          '**Q&A**: 수정·삭제 시 작성자 본인인지 소유권을 검증',
        ] },
      ] },
      { title: '운영을 고려한 관리자 백오피스', blocks: [
        { items: [
          '**주문 관리**: 주문 확인 → 배송 중 → 배송 완료 상태를 여러 건 한 번에 변경. 배송 완료 시 해당 상품을 다시 구매할 수 있도록 배송 중 수량(`keep`)을 줄임',
          '**통계**: 검색어, 카테고리, 상품 단위의 방문 기록을 proxy에서 수집해 MUI X Charts로 시각화',
          '**오류 수집**: 사용자가 보낸 오류 내용을 발생 URL과 함께 확인',
          '**이벤트**: 카테고리별 상품 할인율 적용·수정. 매월 이벤트 상태는 MongoDB Atlas Trigger로 초기화',
        ] },
      ] },
      { title: '홈 서버 렌더링 전환으로 Lighthouse 성능 개선 (2026.10)', blocks: [
        { label: '측정', p: 'Lighthouse 13.5.0(headless Chrome) 모바일·데스크톱 프리셋, 각 3회 측정의 중앙값. 수정 전후를 같은 설정으로 비교하고, 운영 배포 후 다시 쟀습니다.' },
        { label: '병목 진단', p: '운영 홈의 모바일 LCP 4.1s 중 3.17s는 이미지를 받는 시간이 아니라 **요청하기 전 대기 시간**(resource load delay)이었습니다. 다운로드 자체는 16ms였습니다.', items: [
          "홈이 `'use client'` 컴포넌트라, JS 로드·하이드레이션 후 `useEffect`에서 `/api/getProduct`를 인기 → 신규 → 예약 순서로 **직렬 3회** 호출했습니다(응답당 약 700ms). 상품 이미지는 그 뒤에야 요청됐습니다.",
          '상품 카드가 늦게 들어오면서 "더보기" 버튼이 밀려 CLS 0.13이 생겼습니다.',
        ] },
        { label: '수정', items: [
          '**홈을 서버 컴포넌트로 전환**: `HomePage`를 `async` 서버 컴포넌트로 바꾸고 세 섹션을 `Promise.all`로 동시에 조회했습니다. 서버 컴포넌트가 자기 `/api`를 fetch하면 세션 쿠키가 실리지 않아서, 조회 로직을 공용 서버 함수(`findProducts`)로 빼 API 라우트와 함께 쓰도록 했습니다.',
          '**배너 첫 장 우선 로딩**: 첫 슬라이드만 `priority`로 바꿔 HTML에 preload가 들어가게 하고, 나머지는 lazy로 뒀습니다.',
          '**폰트를 variable font 한 벌로**: Noto Sans KR을 400/500/700 세 벌 대신 굵기 조절형 한 벌로 바꿔 `@font-face` 376개 → 128개, 해당 CSS 73KB → 24KB로 줄였습니다.',
          '측정 중 `pnpm start` 스크립트에 존재하지 않는 옵션(`--webpack`)이 있어 로컬 서버가 뜨지 않던 버그도 찾아 고쳤습니다.',
        ] },
        { label: '결과 (운영 기준)', table: [['지표', '모바일 전 → 후', '데스크톱 전 → 후'], ['성능 점수', '73 → 80 (회차별 78~91)', '90 → 99'], ['LCP (실측)', '3.28s → 1.78s', '0.89s → 0.98s'], ['CLS', '0.13 → 0.001', '0.152 → 0.007']] },
        { label: '측정으로 되돌린 것', p: 'Lighthouse 제안을 따랐다가 오히려 나빠진 두 가지를 되돌렸습니다.', items: [
          '`experimental.inlineCss`: 폰트 CSS 231KB가 HTML에 들어가 HTML이 583KB가 되고, 모바일 LCP가 8s대로 나빠졌습니다.',
          'AVIF 이미지 포맷: 로컬 이미지 최적화기에서 인코딩이 끝나지 않아 Lighthouse가 타임아웃을 냈습니다.',
        ], note: '개선책을 하나씩 넣고 매번 재야, 어느 수정이 효과를 냈는지 가릴 수 있다는 것을 확인했습니다.' },
        { label: '배포 후 문제', p: '첫 배포 직후 hydration 에러(React #418)가 났습니다. 예약 태그의 월을 서버(UTC)는 "2025년 12월", 브라우저(KST)는 "2026년 01월"로 다르게 그렸기 때문입니다. `toKoreaTime`으로 양쪽을 KST 기준으로 맞춰 해결했습니다.' },
        { label: '남은 한계', items: [
          '페이지 폭이 1312px로 고정돼 있어 모바일에서 상품 이미지와 배너가 모두 첫 화면으로 계산됩니다. 모바일 점수를 올리는 가장 큰 레버는 반응형 레이아웃입니다.',
          '데스크톱 실측 LCP는 그대로입니다. 서버가 DB 조회를 마친 뒤 HTML을 보내므로, 늘어난 TTFB가 줄어든 대기 시간을 상쇄했습니다.',
        ] },
      ] },
    ],
    trouble: [],
    verifyTitle: '검증',
    verify: ['**Jest + React Testing Library**: 공통 버튼(클릭, disabled, 링크 렌더링)과 금액 포맷 유틸 테스트'],
  },
];

export const OTHERS: Other[] = [
  { id: 'nolmong', fw: 'next', name: '놀몽 NolMong', kind: '팀 프로젝트', period: '2026.07 ~ 2026.08', tagline: '일행이 같은 여행 계획을 동시에 편집하고, 동선을 지도로 확인하는 공동 여행 플랫폼', role: 'UI/UX 디자인 · Frontend · Backend', team: '3인 (전원 FE·BE 겸임)', scale: '2026.07.13 ~ 2026.08.06 (약 3.5주) · 현재 코드 중 약 45% 작성 (3인 중 1위, git blame 기준)',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Supabase', 'Ably', 'Kakao Maps API'],
    links: [['배포', 'https://nolmong.vercel.app/landing'], ['GitHub', 'https://github.com/NolMong/nolmong']],
    blocks: [
      { label: '담당', items: ['**UI/UX 디자인**: 서비스 전체 디자인. 랜딩, 메인, 여행 성향 테스트, 404 페이지', '**카카오 지도 연동**: 장소 검색 모달, 계획 상세 페이지 지도, 일정 핀 표시', '**여행 생성**: 장소·날짜·예산·인원을 입력하는 생성 모달과 달력, 여행 카드, 제목 수정', '**일정 탐색**: 여행 일수만큼 Day 필터를 자동 생성하고, 스크롤 위치에 따라 현재 Day가 바뀌도록 구현'] },
      { label: '트러블슈팅', items: [
        { t: '**지도가 사용자가 옮긴 위치에서 계속 원래 자리로 돌아가던 문제**', sub: ['원인: 지도 컴포넌트의 기본 props를 `cards = []`처럼 써서 렌더마다 새 배열이 만들어졌습니다. effect가 이를 "바뀐 값"으로 보고 매번 다시 실행되면서 `setCenter`가 위치를 되돌렸습니다.', '해결: 빈 배열을 모듈 상수로 고정했습니다. 사용자가 마지막으로 본 위치는 `sessionStorage`에 저장하고, 첫 렌더에서 lazy initializer로 한 번만 불러오게 했습니다.'] },
        { t: '**실시간 채널에서 `Channel detached` 오류**', sub: ['원인: React StrictMode는 개발 모드에서 mount → cleanup → mount를 두 번 실행합니다. Ably 채널은 이름별로 공유되는 인스턴스라서, cleanup에서 채널을 detach하면 바로 뒤에 이어지는 실제 마운트가 끊긴 채널을 쓰게 됐습니다.', '해결: cleanup에서는 구독만 해제하고 채널 연결은 유지했습니다.'] },
        '**배포 빌드 실패**: `useSearchParams`를 쓰는 페이지를 `Suspense`로 감싸지 않으면 Next.js 정적 렌더링 단계에서 빌드가 실패해서, 해당 부분을 `Suspense`로 분리했습니다.',
      ] },
    ] },
  { id: 'owl', fw: 'react', name: 'owl-forest', kind: '교내 동아리 프로젝트', period: '2022.09 ~ 2023.04', tagline: '동아리 회원들이 책을 서로 빌리고, 독후감과 별점 리뷰를 남길 수 있는 웹 서비스', role: 'Frontend 파트 PM · Frontend · Design', team: '프론트엔드 7인', scale: '프론트엔드 커밋 1위 (JS 파일 기준 138건) · 결과: 팀원 이탈 없이 프로젝트 완주',
    stack: ['React', 'JavaScript', 'Styled-Components', 'Figma', 'Notion', 'Slack'],
    links: [['GitHub', 'https://github.com/C-B-U/owl-forest']],
    blocks: [
      { label: '담당', items: ['**일정·업무 관리**: 프론트엔드 팀원 7명의 시험·과제 일정을 매주 받아 태스크를 조정. 입문자는 2인 1조, 경험자는 1인 1페이지로 숙련도에 따라 배분', '**스프린트 운영**: Notion으로 1주 스프린트를 운영하고, 작업 전·진행 중·완료·오류 상태를 보드로 관리. 다른 파트 팀장들과 주간 단위로 일정과 연동 이슈 조율', '**설계와 기술 리딩**: Atomic Design 도입. Atom은 팀원들이 나눠 개발하고, Molecules·Template·Page 구조는 직접 설계해 일관성 유지. 커밋 메시지·색상·함수 이름 규칙 수립', '**코드 리뷰와 멘토링**: GitHub PR 리뷰와 Zoom 세션을 병행해 팀원들의 막힌 부분 해결', '**개발**: 도서 검색 페이지, REST API 연동, 공통 base 컴포넌트 초기 세팅'] },
    ] },
  { id: 'adiary', fw: 'react', name: 'A-Diary', kind: '졸업 작품', period: '2022.09 ~ 2023.06', award: '졸업 작품 전시회 우수팀 선정 (관람객 투표 + 교수진 심사)', tagline: '일기를 쓰면 AI가 감정을 분석하고, 일기 내용을 바탕으로 그림을 생성해 주는 그림일기 서비스', role: 'Frontend 단독 · UI/UX 디자인', team: '4인 (FE 1 · BE 3)', scale: '약 10개월 · 커밋 146건 (팀 내 1위)',
    stack: ['React', 'JavaScript', 'Styled-Components', 'Chart.js', 'AWS S3'],
    links: [['GitHub', 'https://github.com/AI-Diary/A-Diary']],
    blocks: [
      { label: '담당', items: ['**그림 그리기**: Canvas API로 그림판 구현. 키워드 이미지를 캔버스에 렌더링한 뒤 드래그 앤 드롭으로 배치', '**AI 이미지 표시**: AI가 생성한 이미지(base64)를 디코딩해 미리보기로 렌더링, 최종 선택한 이미지만 S3에 저장', '**감정 통계**: Chart.js로 감정 분포와 요일별 작성 빈도 차트 구현', '**디자인**: 서비스 전체 UI/UX 디자인'] },
      { label: '설계 판단과 회고', items: ['**S3 업로드 시점**: 사용자가 원하는 그림이 나올 때까지 여러 번 재생성하는 경우가 많았습니다. 생성할 때마다 S3에 올리면 스토리지 사용량과 비용이 늘어나서, 미리보기는 base64로만 보여주고 **일기를 저장할 때 선택한 이미지 하나만** 업로드하도록 설계했습니다.', '**다시 한다면 (1) 전송 방식**: base64는 원본보다 용량이 약 33% 늘어납니다. Blob으로 원본 크기 그대로 전송하겠습니다.', '**다시 한다면 (2) 업로드 보안**: 일정 때문에 프론트엔드에서 S3로 직접 업로드했는데, 이 방식은 Access Key가 클라이언트에 노출될 수 있습니다. 백엔드가 발급한 Presigned URL로만 업로드하도록 바꾸겠습니다. 그러면 aws-sdk도 클라이언트 번들에서 빠집니다.'] },
    ] },
];

export const DN_PROJECTS: DnProject[] = [
  { no: '01', name: '교사용 LMS 리뉴얼', period: '2024.01 ~ 2024.03', team: 'BE 1 · FE 2 · Designer 1', desc: '학교 선생님이 학생의 학습 진행도, 문제 풀이 데이터, AI 학습 대화를 한 화면에서 확인하는 관리 사이트입니다. 반별 학생 조회, 단원별 진행 상황, AI 발음 평가 결과, AI 대화 재현 페이지, 레이아웃 초기 디자인을 담당했습니다.',
    blocks: [
      { label: '다른 파트를 기다리지 않는 개발', items: ['**디자인 지연 대응**: 디자이너가 다른 프로젝트를 병행하느라 바로 투입되기 어려웠습니다. 그래서 초기 UI를 직접 구성해 개발을 먼저 시작했습니다. 여백·색상·타이포그래피는 SCSS 유틸리티 클래스로 설계해서, 디자인이 확정된 뒤에는 클래스 조합만 바꿔 반영할 수 있게 했습니다.', '**백엔드 지연 대응**: 백엔드 API는 프로젝트 막바지에 완성될 예정이었습니다. Swagger로 공유받은 명세를 기반으로 MSW Mock API를 먼저 만들어, 실제 서버 없이도 기능 개발과 테스트를 진행했습니다.', '**결과**: 디자인과 백엔드 일정이 모두 지연됐지만 계획된 기간 안에 완료했습니다.'] },
      { label: 'Vue 2 → Vue 3 마이그레이션', items: ['Options API에 흩어져 있던 로직을 Composition API로 옮기고, Vuex의 `this.$store`는 `useStore()`로 바꿨습니다.', '재사용 가능한 컴포넌트를 구분하고, 추가 기능에 맞춰 파일 구조를 다시 설계했습니다.'] },
    ] },
  { no: '02', name: '사내 관리자 페이지', period: '2024.01 ~ 2024.03 (LMS와 병행)', team: 'BE 1 · FE 1', desc: '운영자가 학교, 계정, 정산, 안내 발송을 한 곳에서 처리하는 관리자 시스템입니다. 개발 시점 기준 100개 이상의 초등학교에서 사용되었습니다.',
    blocks: [
      { label: '담당', items: ['학생 계정 Excel 대량 등록', '학교·반 검색과 학교·담당 교사 정보 수정', '정산서 PDF 다운로드', 'Email·SMS 단체 발송과 미리보기'] },
      { label: '일정 관리', items: ['새 학기 수업이 시작되기 전인 3월 말까지 반드시 오픈해야 했습니다. 기획 변경과 API 수정 사항을 기획자·백엔드와 수시로 공유하며 우선순위가 높은 기능부터 개발했고, 완성된 기능은 바로 공유해 다른 파트가 이어서 작업할 수 있게 했습니다. **LMS 리뉴얼과 함께 두 프로젝트 모두 일정 안에 오픈했습니다.**'] },
    ] },
  { no: '03', name: '전시회 응원·퀴즈 이벤트 페이지', period: '2023.09 ~ 2023.10', team: 'BE 1 · FE 1 · Designer 1', desc: 'KSGE / SIEF 2023 박람회 부스 방문객이 휴대폰 본인 인증 후 참여하는 모바일 이벤트 페이지입니다. 응원 메시지 이벤트 프론트엔드를 단독으로 신규 구축하고, 퀴즈 이벤트 기존 코드 리팩토링과 초기 레이아웃 디자인을 담당했습니다.',
    blocks: [
      { label: '현장 장애 대응', items: ['박람회 3일 동안 장애 대응 담당자로 현장에 참여했습니다. 총 **754명**(1일차 193명 · 2일차 328명 · 3일차 233명)이 참여했습니다.', '1일차 초반에 인증번호 발송이 지연되자 서버 리소스 증설을 요청했습니다. 지연이 해소된 뒤에는 원래 사양으로 되돌려 불필요한 비용을 줄였습니다.', '그 결과 참여자가 가장 많았던 2일차에도 지연 없이 운영했습니다.'] },
      { label: '성능 개선', items: ['**스타일 구조 개선**: 반복되는 inline style을 SCSS로 옮기고, 컴포넌트 하나의 폴더에 섞여 있던 파일들을 Atomic Design 구조로 재구성했습니다.', '**폰트 경량화**: 회사 요구로 Noto Sans CJK(Regular·Medium·Bold)를 써야 했는데, 한중일 글자를 모두 담고 있어 용량이 커서 초기 렌더링이 느렸습니다. 온라인 변환기로 WOFF2 변환을 시도했지만 글자가 깨졌고, Python `fonttools`로 직접 변환해 용량을 줄였습니다. 그래도 용량이 커서, 글자는 기본 글꼴로 먼저 보이고 폰트는 나중에 적용되도록 설정했습니다.', '**이미지 경량화**: 이미지를 WebP로 바꿔 리소스 용량을 줄였습니다.'] },
    ] },
];

export const dnStack = ['Vue.js (2→3)', 'Vuex', 'JavaScript', 'SCSS', 'MSW', 'Chart.js'];
export const dnMetrics = [{ v: '754명', k: '전시회 이벤트 3일간 참여' }, { v: '100+', k: '관리자 시스템 사용 초등학교' }, { v: '2건 병행', k: 'LMS · 관리자 시스템 모두 일정 내 오픈' }, { v: '1주', k: 'Vue 첫 사용부터 실무 투입까지' }];
export const dnLearned = [
        { t: '처음 쓰는 프레임워크에 빠르게 적응', d: '입사 전까지 Vue.js를 써 본 적이 없었습니다. 일주일 동안 회사의 기존 Vue 프로젝트를 분석해 구조와 코드 컨벤션을 익혔고, 학습한 내용을 팀 앞에서 발표해 바로 실무에 투입되었습니다.' },
        { t: '병행 프로젝트 운영', d: '일정을 늦출 수 없는 프로젝트 두 개를 동시에 진행하며, 우선순위를 정하고 다른 파트와 조율하는 방법을 익혔습니다.' },
      ];

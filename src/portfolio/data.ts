// "포폴 md/Portfolio.dc.html" 데이터 이식본
export type ItemImg = { src: string; alt: string; w: number; h: number; title?: string; caption?: string; kind?: 'diagram' };
export type Item = string | { t: string; sub?: string[]; img?: ItemImg };
export type LifecycleFigure = {
  title: string;
  steps: { label: string; name: string; detail?: string }[];
  conditions: { label: string; detail: string }[];
};
export type Block = { label?: string; p?: string; decisions?: DecisionItem[]; items?: Item[]; imgs?: ItemImg[]; lifecycle?: LifecycleFigure; table?: string[][]; note?: string };
// sub: 주요 기능 개발을 뒷받침하는 보조 구현 (상세에서 한 단계 낮은 비중으로 그린다)
export type Case = { id?: string; title: string; tags?: string[]; sub?: boolean; blocks: Block[]; demo?: 'productCard' };
export type FwKey = 'react' | 'vue' | 'next';
export type Shot = { src: string; title: string; desc?: string; phone?: boolean; w?: number; h?: number; group?: string };
export type FlowStep ={ title: string; desc: string; shot: string };
export type BgFigure = { after: number; caption: string; groups: { label: string; tone: 0 | 1 | 2; steps: { title: string; hot?: boolean }[] }[] };
export type FlowBranch = { after: number; title: string; fast: string; slow: string };
export type Flow = { steps: FlowStep[]; groups?: { from: number; to: number; title: string }[]; branch: FlowBranch; phonesLead: string; phones: { shot: string; cap: string }[] };
export type SummaryItem = { label: string; value: string; description: string };
export type DescriptionItem = { title: string; body: string };
// 사례 안의 판단: 한 문장 제목 + 상황·판단·이유를 이어 읽는 문단들
// 문단형(body) 또는 상황·판단·근거를 나눠 라벨 행으로 보여주는 구조형.
export type DecisionItem = { title: string; body: string[] } | { title: string; situation: string; decision: string; reason: string };
export type Project = {
  slug: string; fw: FwKey; no: string; name: string; kr: string; ongoing?: boolean; kind: string;
  // 목록에서는 대표 사례 하나만 보여주고, 구현과 검증 근거는 상세에서 다룬다.
  preview: { description: string; role: string; title: string; body: string; note?: string };
  evidenceNote: string;
  // 과제 조건을 소개와 프론트엔드 핵심 과제 사이에 보여준다.
  requirements?: SummaryItem[];
  context?: { lead: string; taskTitle: string; solutionTitle: string };
  // 상세 첫머리: 이 프로젝트에서 다룬 문제 / 기획 배경 아래: 팀 시스템과 내 담당 범위 구분
  focus?: { lead: string; items: DescriptionItem[] }; scope?: { label: string; note?: string; items: string[] }[];
  // 검증 섹션을 주제별로 묶을 때 (있으면 verify 대신 사용)
  // metrics: 먼저 보여줄 핵심 지표, scenarios: 대표 시나리오, extraLabel: extra를 접어 두고 펼칠 때 쓰는 이름, sub: 보조 영역(작게)
  verifyGroups?: { label: string; lead?: string; metrics?: { v: string; k: string }[]; scenarios?: string[]; items: Item[]; extra?: Block; extraLabel?: string; sub?: boolean }[];
  // 상세 페이지 안 목차(있으면 데스크톱 사이드 목차 + 모바일 접는 목차), 섹션 요약 문장, 역할별 기술 스택
  toc?: { id: string; label: string; children?: { id: string; label: string; sub?: boolean }[] }[];
  leads?: { flow?: string; shots?: string; core?: string; trouble?: string; verify?: string };
  stackGroups?: { label: string; items: string[] }[];
  tagline: string; period: string; roleShort: string; stackShort: string[];
  meta: [string, string][]; links: [string, string][]; stack: string[];
  background?: string[]; bgFigure?: BgFigure;
  // 기획 배경 아래: 진행 과정 → 기획 → 디자인 / 트러블슈팅 아래: 배포와 운영
  timeline?: { when: string; title: string; desc: string }[]; planning?: Block[]; design?: Block[]; ops?: Block[];
  arch?: string; archImg?: string; erdImg?: string; shots?: Shot[]; flow?: Flow;
  duties: { group: string; items: Item[] }[];
  core: Case[]; trouble: Case[]; verifyTitle: string; verify: Item[]; verifyExtra?: Block; verifyExtraAfter?: number;
};
export type Other = {
  id: string; fw: FwKey; name: string; kind: string; period: string; award?: string; tagline: string;
  role: string; team: string; scale: string; stack: string[]; links: [string, string][];
  blocks: { label: string; items: Item[] }[];
};
export type DnProject = { no: string; name: string; period: string; team: string; summary: string; desc: string; blocks: { label: string; items: Item[] }[] };

export const FW: Record<FwKey, { label: string; fill: string; on: string; ink: string; inkDark?: string }> = {
  react: { label: 'React', fill: '#0071E3', on: '#F0FBFF', ink: '#0071E3' },
  vue: { label: 'Vue', fill: '#42B883', on: '#0B2A1E', ink: '#1F7A55', inkDark: '#42B883' },
  next: { label: 'Next.js', fill: '#17171A', on: '#F3F1EC', ink: '#17171A' },
};

export const PROJECTS: Project[] = [
  {
    slug: 'nova', fw: 'react', no: '01', name: 'Nova', kr: '휴대폰 사전예약 시스템', kind: 'LG유플러스 유레카 최종융합프로젝트',
    tagline: 'LG유플러스 유레카 최종융합프로젝트에서 휴대폰 사전예약 시스템을 주제로 선택해 개발했습니다.',
    requirements: [
      { label: '신청 규모', value: '10초 안에 5,000건', description: '오픈 직후 신청이 몰리는 상황을 가정했습니다.' },
      { label: '외부 예약 시스템', value: '평균 0.5초 · 실패율 5%', description: '외부 시스템의 응답 시간과 호출 실패율을 가정했습니다.' },
      { label: '처리 조건', value: '신청 유실·중복 예약 0건', description: '내부·외부 예약 기록도 100% 일치해야 했습니다.' },
    ],
    context: {
      lead: '오픈 직후 몰리는 신청을 받으면서, 느린 외부 예약 시스템 때문에 사용자가 기다리거나 헷갈리지 않게 하는 것이 과제였습니다.',
      taskTitle: '10초 안에 5,000건을 유실 없이 받아야 했습니다.',
      solutionTitle: '신청 접수와 외부 등록을 분리했습니다.',
    },
    preview: {
      description: '대기열부터 접수·결제까지 이어지는 스마트폰 사전예약 서비스입니다.',
      role: '구매자 화면 전담 · Frontend 2명 중 1명',
      title: '페이지를 이동해도 이어지는 대기열 안내',
      body: '서버에서 받은 순번과 상태를 화면에 표시합니다. 페이지 이동 중에도 조회와 안내를 이어가고, 새로고침 후에는 서버에 다시 요청해 화면을 복원합니다.',
    },
    evidenceNote: '10초 안에 5,000건의 신청과 유실·중복 0건은 과제의 요구 조건이며, 부하 테스트로 측정한 성과가 아닙니다. 프론트엔드 검증은 목 서버 기반 E2E 테스트로 진행했습니다.',
    toc: [
      { id: 'sec-intro', label: '프로젝트 소개' },
      { id: 'sec-background', label: '프로젝트 배경과 과제' },
      { id: 'sec-flow', label: '주요 기능' },
      { id: 'sec-core', label: '주요 개발 내용', children: [
        { id: 'core-queue', label: '대기열' },
        { id: 'core-status', label: '예약 상태 관리' },
        { id: 'core-retry', label: '재시도 정책' },
        { id: 'core-api-client', label: 'API 클라이언트', sub: true },
        { id: 'core-lint', label: 'FSD lint 규칙', sub: true },
      ] },
      { id: 'sec-trouble', label: '트러블슈팅', children: [
        { id: 'trouble-idempotency', label: '중복 접수 방지' },
        { id: 'trouble-slider', label: '슬라이더 재생성' },
        { id: 'trouble-logout', label: '로그아웃 후 정리' },
      ] },
      { id: 'sec-verify', label: '테스트 및 협업' },
    ],
    leads: {
      flow: '메인 화면부터 결제, 예약 내역 확인까지 사용자가 거치는 7단계입니다. 단계별 구현 방식은 아래 주요 개발 내용에서 다룹니다.',
      core: '대기열 조회와 안내, 예약 상태에 따른 화면 표시, 재시도 정책을 어떻게 설계했는지 설명합니다.\nAPI 클라이언트와 코드 구조 규칙도 함께 정리했습니다.',
      trouble: '응답 유실, 불필요한 컴포넌트 재생성, 사용자 간 데이터 혼선 문제를 원인부터 분석해 해결한 사례입니다.',
      verify: '실패 상황을 목 서버로 재현해, 고객 화면 E2E 테스트로 끝까지 확인했습니다.',
    },
    stackGroups: [
      { label: '화면 · 라우팅', items: ['React 19', 'TypeScript', 'Vite', 'react-router v7', 'Vanilla Extract'] },
      { label: '데이터 · 상태', items: ['TanStack Query v5', 'Axios', 'Zustand'] },
      { label: '외부 연동', items: ['토스페이먼츠 SDK', '카카오 OAuth', 'Amplitude'] },
      { label: '테스트 · 목 서버', items: ['MSW 2', 'Storybook 10 + Vitest', 'Playwright'] },
      { label: '품질 · 배포', items: ['ESLint', 'husky + commitlint', 'Vercel'] },
    ],
    focus: {
      lead: '저는 구매자 화면을 맡아, 사용자가 현재 처리 상태를 이해할 수 있도록 안내하고 중복 신청과 사용자 간 데이터 혼선을 막는 데 집중했습니다.',
      items: [
        { title: '대기열 조회와 안내', body: '서버가 관리하는 순번을 조회해 표시했습니다. 대기열 창을 닫거나 페이지를 이동해도 조회와 안내가 이어지고, 새로고침 후에는 서버 응답에 맞춰 대기열 화면을 복원하도록 했습니다.' },
        { title: '접수와 확정의 분리', body: '서버의 예약 단계(`displayStatus`)에 따라 "접수"와 "외부 등록 완료(확정)"를 서로 다른 화면 상태로 구분하고, 결제는 등록이 완료된 뒤에만 가능하도록 했습니다.' },
        { title: '실패 유형별 재시도', body: '오류를 4xx·5xx·타임아웃·네트워크 오류로 구분해 재시도 여부를 결정하고, 백오프·Jitter·`Retry-After`를 적용해 서버 장애 시 요청이 한꺼번에 몰리지 않도록 했습니다.' },
        { title: '중복 접수와 사용자 혼선 방지', body: '응답을 받지 못한 접수는 멱등키로 한 번만 재전송하고, 로그아웃 시 이전 사용자의 대기열 정보를 함께 삭제했습니다.' },
        { title: '실패 상황 검증', body: '목 서버로 장애 상황을 재현하고, Playwright로 고객 화면 E2E 테스트 60개를 작성했습니다. 운영자 시나리오 5개는 팀원과 공동 작성했습니다.' },
      ],
    },
    scope: [
      { label: '담당 영역: Frontend (구매자 화면 전담)', items: ['서버에서 받은 예약 상태를 화면에 반영', '접수와 예약 확정 단계의 UI 분리', '대기열 조회·화면 상태 관리와 사용자 안내', '네트워크 오류 처리와 재시도 UX', '멱등키 기반 중복 접수 방지', 'API 클라이언트 및 프론트엔드 테스트 환경 구축'] },
    ],
    period: '2026.09 ~ 2026.10 · 약 1.5개월', roleShort: 'Frontend',
    stackShort: ['React 19', 'TypeScript', 'TanStack Query', 'MSW', 'FSD'],
    meta: [['기간', '2026.09.15 ~ 2026.10.28 (약 1.5개월)'], ['역할', 'Frontend (구매자 화면 전담)'], ['인원', '7명 (Backend 5, Frontend 2)'], ['기여도', '현재 Frontend 코드의 약 60% (git blame 기준)']],
    links: [['배포 (목 서버로 동작)', 'https://fe-iota-peach.vercel.app'], ['GitHub', 'https://github.com/Nova-Grandis/fe']],
    stack: ['React 19', 'TypeScript', 'Vite', 'TanStack Query v5', 'Zustand', 'Axios', 'Vanilla Extract', 'react-router v7', 'MSW 2', '토스페이먼츠 SDK', '카카오 OAuth', 'Storybook 10 + Vitest', 'Playwright', 'Amplitude', 'ESLint', 'husky + commitlint', 'Vercel'],
    background: [
      '접수 결과는 사용자에게 먼저 안내하고, 외부 등록은 서버가 뒤에서 비동기로 처리합니다.',
    ],
    bgFigure: {
      after: 1,
      caption: '접수까지는 사용자에게 즉시 응답하고, 외부 서버 등록(확정)은 백그라운드에서 처리합니다. 결제는 등록이 끝난 뒤에 가능합니다.',
      groups: [
        { label: '즉시 응답 · 사용자가 보는 구간', tone: 0, steps: [{ title: '접속' }, { title: '대기열' }, { title: '접수' }] },
        { label: '외부 서버', tone: 1, steps: [{ title: '사전예약 등록', hot: true }] },
        { label: '이후 단계', tone: 2, steps: [{ title: '결제 가능' }, { title: '결제' }, { title: '배송' }] },
      ],
    },
    flow: {
      groups: [
        { from: 1, to: 4, title: '찾고, 줄 서기' },
        { from: 5, to: 7, title: '접수하고, 결제하기' },
      ],
      steps: [
        { title: '메인', desc: '진행 중인 사전예약을 배너로 보여줍니다.', shot: '/image/nova/flow-1-main.png' },
        { title: '사전예약 상세', desc: '일정과 모델을 확인하고 [사전예약 하러가기]로 시작합니다.', shot: '/image/nova/flow-2-preorder.png' },
        { title: '모델 선택', desc: '모델을 고릅니다. 이미 예약한 모델은 [구매 확정] 버튼으로 바뀝니다.', shot: '/image/nova/flow-3-model.png' },
        { title: '대기열', desc: '내 순서와 예상 대기 시간을 보여줍니다. 차례가 오면 예약 페이지로 이동합니다.', shot: '/image/nova/flow-4-queue.png' },
        { title: '입장과 접수', desc: '입장권 유효 시간 안에 옵션을 골라 접수합니다. 남은 시간은 상단에 계속 표시됩니다.', shot: '/image/nova/flow-5-product.png' },
        { title: '결제', desc: '결제 기한을 안내하고 토스 결제창을 엽니다.', shot: '/image/nova/flow-6-payment.png' },
        { title: '사전예약 내역', desc: '예약 순번과 구매 확정 마감 카운트다운을 보여줍니다.', shot: '/image/nova/flow-7-mypage.png' },
      ],
      branch: {
        after: 5,
        title: '접수 후 외부 서버 등록을 최대 5초간 기다립니다',
        fast: '5초 안에 등록이 끝나면 바로 결제 페이지로 이동합니다.',
        slow: '5초가 지나면 예약 접수 확인 화면으로 이동해 현재 처리 단계와 처리 이력을 보여줍니다.',
      },
      phonesLead: '대기열 창을 닫아도 서버에서 순번을 계속 조회하고, 상단 pill에 표시해 다른 페이지를 둘러보는 동안에도 확인할 수 있습니다.',
      phones: [
        { shot: '/image/nova/m-1-queue.png', cap: '줄 서기 · 대기열 창' },
        { shot: '/image/nova/m-2-pill.png', cap: '창을 닫고 둘러보기 · 내 번호 pill' },
        { shot: '/image/nova/m-3-admission.png', cap: '차례가 오면 · 입장권 타이머' },
        { shot: '/image/nova/m-4-submitting.png', cap: '접수 · 예약 처리 중' },
        { shot: '/image/nova/m-5-unstable.png', cap: '연결 불안정 · 안내 후 재확인' },
      ],
    },
    duties: [
      { group: '구매자 화면', items: ['메인, 사전예약 목록·상세, 상품 상세·옵션 선택, 사전예약 대기열, 결제(토스페이먼츠), 주문 결과, 마이페이지(장바구니·배송지·사전예약 내역)', '카카오 로그인·회원가입 온보딩, 세션 관리'] },
      { group: 'Frontend 기반', items: ['FSD 레이어 구조 설계, ESLint로 의존성 방향 강제', 'API 클라이언트, TanStack Query 캐시·재시도 정책', 'MSW 목 서버와 실패 재현 도구, 디자인 토큰·공용 UI 컴포넌트', 'Storybook·Vitest·Playwright 테스트 작성 (개인·팀별 수치는 테스트 및 협업 참고)'] },
    ],
    core: [
      { id: 'core-queue', title: '대기창을 닫고 다른 상품을 봐도 예약을 이어갈 수 있게', tags: ['사전예약 대기열', '조회 수명 분리', '입장권 기반 멱등키'], blocks: [
        { p: '사전예약이 열리면 사용자는 대기열에서 차례를 기다립니다. 순번은 서버가 관리하고, 화면은 서버가 정한 간격마다 순번을 조회해 보여 줍니다. 기다리는 동안 생기는 네 가지 상황에서 **사용자가 자리를 잃거나 예약이 두 건 생기지 않게** 했습니다.' },
        { imgs: [
          { src: '/image/nova/web-pill-center.png', alt: '웹 화면 상단의 순번 표시. 맥북 프로 14 사전예약, 내 번호 19번, 예상 대기 곧 입장', w: 1120, h: 432, caption: '대기열 창을 닫고 다른 페이지로 이동해도 상단에서 내 순번을 확인할 수 있습니다.' },
          { src: '/image/nova/m-pill-center.png', alt: '모바일 화면 상단에 내 번호 24번이 표시된 모습', w: 648, h: 648 },
        ] },
        { label: '판단과 근거', decisions: [
          {
            title: '다른 페이지를 둘러보는 동안에도 대기가 이어지게 했습니다.',
            situation: '서버는 250초 동안 순번 조회가 없으면 사용자가 대기를 그만둔 것으로 보고 대기열에서 뺍니다. 순번 조회를 상품 페이지가 맡으면, 사용자가 다른 상품을 보러 가는 순간 조회도 멈춥니다. 사용자는 아직 기다리는 중인데도 250초가 지나면 자리를 잃습니다.',
            decision: '순번 조회를 상품 페이지에서 떼어 내, 여러 페이지가 함께 쓰는 바깥 틀(`RootLayout`)에 두었습니다.',
            reason: '바깥 틀은 그 안에서 페이지를 옮기거나 대기창을 닫아도 사라지지 않습니다. 그래서 순번 조회가 끊기지 않고, 서버는 사용자가 아직 기다리고 있다고 판단합니다. 사용자도 화면 상단에서 자기 순번을 계속 확인할 수 있습니다.',
          },
          {
            title: '응답을 못 받아 다시 눌러도 예약은 하나만 생기게 했습니다.',
            situation: '예약 버튼을 눌렀는데 응답이 오지 않으면 사용자는 버튼을 다시 누릅니다. 응답만 못 받았을 뿐, 서버에서는 첫 신청이 이미 처리됐을 수 있습니다. 서버가 두 번째 신청을 새 신청으로 받으면 예약이 두 건 생깁니다.',
            decision: '신청마다 같은 신청인지 알아볼 수 있는 식별표(멱등키, `Idempotency-Key`)를 붙였습니다. 식별표는 차례가 온 사용자에게 서버가 발급하는 입장권으로 계산합니다(SHA-256).',
            reason: '같은 입장권으로 계산하면 언제나 같은 식별표가 나옵니다. 입장권은 새로고침해도 브라우저에 남아 있어, 새로고침한 뒤 다시 보내도 식별표가 같습니다. 서버는 이미 받은 식별표로 신청이 다시 오면 새 예약을 만들지 않고 처음 예약을 돌려줍니다. 끝내 응답을 받지 못했을 때의 처리는 트러블슈팅 01에서 다룹니다.',
          },
          {
            title: '순번 조회가 잠깐 실패해도 대기가 끝났다고 판단하지 않았습니다.',
            situation: '인터넷이 잠깐 끊기거나 서버에 일시적인 문제가 생기면 순번 조회가 실패합니다. 이때 화면이 대기 정보를 지우면, 서버에는 자리가 남아 있는데도 사용자는 자리를 잃은 줄 알고 대기를 그만둘 수 있습니다.',
            decision: '조회가 실패해도 마지막으로 받은 순번을 그대로 보여 주고, “다시 확인하고 있어요”라고 안내하며 다시 조회합니다. 연결이 오래 끊기면 자리가 남아 있다고 장담하지 않고, 대기열에서 빠졌을 수 있다고 안내합니다. 대기를 끝낼지는 서버의 응답으로만 정했습니다.',
            reason: '조회 실패는 응답을 받지 못했다는 뜻일 뿐, 대기열에서 빠졌다는 뜻이 아닙니다. 대기열에 남아 있는지는 서버만 압니다. 그래서 연결이 회복된 뒤 서버가 대기열에 없다고 알려 주면 다시 줄을 섭니다. 이때 순번이 뒤로 밀렸으면 이전 순번과 새 순번을 함께 보여 줘, 순번이 바뀐 이유를 알 수 있게 했습니다. 판매가 끝났다고 알려 주거나, 인증 오류처럼 다시 시도해도 해결되지 않는 오류가 나면 안내한 뒤 대기를 끝냅니다.',
          },
          {
            title: '새로고침 뒤에는 서버가 확인해 준 경우에만 “자리가 그대로”라고 안내했습니다.',
            situation: '새로고침하면 화면이 갖고 있던 순번은 사라지고, 브라우저에는 어떤 상품을 기다리고 있었는지만 남습니다. 이 정보만으로는 서버에 자리가 남아 있는지 알 수 없습니다. 그런데도 “자리가 그대로”라고 안내하면, 이미 대기열에서 빠진 사용자에게 사실과 다른 안내를 하게 됩니다.',
            decision: '남아 있는 상품 정보로 서버에 대기열 진입을 다시 요청합니다. 서버가 기존 자리를 찾아 돌려줬다고 응답한 경우(`rejoined: true`)에만 “전에 서 있던 자리 그대로예요”라고 안내합니다.',
            reason: '서버는 순번 조회가 끊긴 뒤에도 약 250초 동안 자리를 지켜 둡니다. 그 안에 진입을 다시 요청하면 기존 자리를 돌려주고, 돌려줬다는 사실을 응답에 함께 담습니다. 브라우저의 추측이 아니라 서버의 답을 보고 안내하므로, 자리를 잃은 사용자에게 “그대로”라고 잘못 안내하지 않습니다.',
          },
        ] },
        { label: '구현 흐름', imgs: [
          { src: '/image/nova/queue-implementation-flow.png', title: '대기열 구현 흐름도', alt: '보안 연결·기존 대기열·진행 중 예약 확인 후 진입 POST, 순번 조회 GET, 이동 예고, 멱등키 계산, 입장권 저장을 거쳐 상품 페이지로 이동하는 흐름도', w: 2320, h: 1520, kind: 'diagram', caption: '진입 전 확인부터 상품 페이지 이동까지의 흐름입니다. CLOSED 응답은 사유가 NOT_IN_QUEUE일 때만 다시 진입합니다. 그림을 누르면 원본 크기로 볼 수 있습니다.' },
        ] },
      ] },
      { id: 'core-status', title: '"접수"와 "확정"을 나눠, 외부 등록이 끝난 예약만 결제하게', tags: ['displayStatus 기반 화면', '접수와 확정 분리', '5초 분기', '등록 지연 안내'], blocks: [
        { p: '예약 버튼을 누르면 서버는 신청을 먼저 접수하고, 외부 예약 시스템 등록은 뒤에서 따로 처리합니다. 과제에서 외부 시스템은 평균 0.5초가 걸리고 5%는 실패한다고 가정했기 때문에, 접수와 등록 완료 사이에 시간 차가 생깁니다. 화면은 서버가 알려 주는 예약 단계(`displayStatus`)에 따라 지금 어느 단계인지 보여 주고, **등록이 끝나기 전에는 결제할 수 없게** 했습니다.' },
        { lifecycle: {
          title: '접수 후 화면 흐름',
          steps: [
            { label: 'RECEIVED · PROCESSING', name: '접수 완료 · 예약 처리 중', detail: '접수만 끝난 상태라 아직 결제할 수 없습니다.' },
            { label: 'PAYABLE', name: '구매 확정 대기', detail: '외부 등록이 끝나 결제할 수 있습니다. 24시간 카운트다운을 보여줍니다.' },
            { label: 'RESERVED', name: '예약 확정', detail: '결제까지 끝난 상태입니다.' },
          ],
          conditions: [
            { label: '5초 안에 등록', detail: '접수 직후 1초마다 확인하다가, 등록이 끝나면 바로 결제 화면으로 이동합니다.' },
            { label: '5초 초과', detail: '예약 접수 화면으로 이동해 3초마다 상태를 다시 확인합니다.' },
            { label: '60초 초과', detail: '"등록이 평소보다 오래 걸리고 있어요" 안내를 띄우고 확인 간격을 30초로 늘립니다.' },
            { label: '결제 기한 도달', detail: '서버 시간보다 1초 늦게 한 번 더 조회해, 만료 취소가 시작된 상태를 바로 반영합니다.' },
          ],
        } },
        { label: '판단과 근거', decisions: [
          {
            title: '외부 등록이 끝난 예약만 결제할 수 있게 했습니다.',
            situation: '접수됐다는 응답만 보고 결제 화면으로 보내면, 아직 외부에 등록되지 않은 예약도 결제할 수 있게 됩니다. 등록이 늦어지거나 끝내 되지 않으면, 사용자는 돈을 냈는데 예약이 확정되지 않은 상태가 됩니다.',
            decision: '화면의 문구와 버튼을 서버가 알려 주는 예약 단계에 맞췄습니다. 결제는 등록이 끝나 결제할 수 있는 단계(`PAYABLE`)가 된 뒤에만 열고, 그 전에는 “접수 완료 · 예약 처리 중”으로 표시합니다.',
            reason: '외부 등록이 끝났는지는 서버만 압니다. 화면이 접수 응답을 보고 짐작하지 않고 서버의 단계를 그대로 따르므로, 등록되지 않은 예약이 결제로 넘어가지 않습니다.',
          },
          {
            title: '등록이 늦어지면 기다리는 이유를 알려 주도록 했습니다.',
            situation: '외부 시스템이 느리면 등록이 오래 걸립니다. 처리 중 화면만 설명 없이 계속 보여 주면, 사용자는 예약이 제대로 됐는지 모른 채 기다려야 합니다.',
            decision: '기다린 시간에 따라 화면과 안내를 나눴습니다(위 접수 후 화면 흐름). 5초가 지나면 예약 접수 화면에서 현재 단계와 처리 이력을 보여 주고, 60초가 지나면 “등록이 평소보다 오래 걸리고 있어요”라고 안내합니다.',
            reason: '사용자는 기다리는 동안에도 지금 어느 단계인지 알 수 있습니다. 60초는 관리자 화면이 등록이 밀렸다고 보는 기준과 같아서, 사용자와 운영자가 같은 시점에 지연을 알게 됩니다. 안내한 뒤에도, 다른 탭에 있어도 상태 확인은 계속되므로 등록이 끝나면 화면이 저절로 바뀝니다.',
          },
          {
            title: '예약 접수 화면으로 넘어간 뒤에는 늦게 온 응답이 결제 화면으로 보내지 않게 했습니다.',
            situation: '접수 직후 5초 동안은 1초마다 등록 여부를 확인합니다. 5초가 지나 예약 접수 화면으로 넘어갔는데 그 전에 보낸 확인 요청의 응답이 늦게 도착하면, 접수 화면을 보던 사용자가 갑자기 결제 화면으로 이동합니다.',
            decision: '5초가 되면 아직 응답을 기다리는 확인 요청도 함께 끊었습니다.',
            reason: '끊은 요청의 응답은 화면에 반영되지 않습니다. 그래서 사용자가 예약 접수 화면을 보는 도중에, 늦게 온 응답 때문에 결제 화면으로 넘어가는 일이 없습니다.',
          },
          {
            title: '서버가 보장하지 않는 결과는 화면에서도 약속하지 않았습니다.',
            situation: '등록이 늦어질 때 “순서는 그대로예요” 같은 문구를 넣으면 사용자는 안심합니다. 하지만 서버에는 “등록 실패” 상태가 따로 없고, 끝내 등록되지 않은 예약은 운영자가 직접 확인해 처리합니다. 결과를 장담할 수 없는데 약속하면, 등록이 안 됐을 때 안내가 사실과 달라집니다.',
            decision: '지연 안내에는 늦어지고 있다는 사실과, 계속 안 되면 운영자가 확인해 처리한다는 점만 담았습니다. 결과는 지금 화면과 사전예약 내역에 표시된다고 함께 알려 줍니다.',
            reason: '화면은 서버가 보장하는 내용까지만 말합니다. 그래서 등록이 끝내 되지 않아도 앞서 한 안내가 사실과 어긋나지 않고, 사용자는 결과를 어디서 확인할지 압니다.',
          },
        ] },
      ] },
      { id: 'core-retry', title: '다시 보낼 실패만, 서버에 몰리지 않게 재시도하기', tags: ['isRetryableError', 'Exponential Backoff', 'Jitter', 'Retry-After'], blocks: [
        { p: '요청이 실패했을 때 다시 보낼지, 언제 보낼지를 정했습니다. 다시 보내도 결과가 같은 실패는 재시도하지 않고, 서버가 힘들 때 **모든 사용자가 한꺼번에 다시 요청하지 않게** 했습니다. 실패 유형은 API 클라이언트가 나누고, 다시 보낼 시점은 TanStack Query가 정합니다.' },
        { label: '판단과 근거', decisions: [
          {
            title: '다시 보내도 결과가 같은 오류는 재시도하지 않았습니다.',
            situation: '로그인하지 않았거나 입력값이 잘못된 경우처럼 요청 자체에 문제가 있으면, 몇 번을 다시 보내도 결과가 같습니다. 이런 요청까지 재시도하면 사용자는 같은 오류를 더 늦게 보고, 서버에는 쓸모없는 요청만 늘어납니다.',
            decision: '서버의 일시적인 문제, 응답 지연, 인터넷 끊김처럼 다시 보내면 성공할 수 있는 경우에만 재시도합니다. 이 판단은 한 함수(`isRetryableError`)에 모아, 화면마다 재시도 기준이 달라지지 않게 했습니다.',
            reason: '4xx 오류는 요청을 고치지 않으면 결과가 바뀌지 않지만, 5xx·타임아웃·네트워크 오류는 잠시 뒤 다시 보내면 성공할 수 있습니다. 그래서 상태 코드로 나눠 4xx는 재시도하지 않습니다. 서버가 일시 장애라고 표시한 401(`retryable: true`)만 예외로 5xx처럼 다룹니다.',
          },
          {
            title: '예약·결제처럼 데이터를 바꾸는 요청은 자동으로 다시 보내지 않았습니다.',
            situation: '조회 요청은 여러 번 보내도 결과가 바뀌지 않지만, 예약이나 결제처럼 서버의 데이터를 바꾸는 요청은 다릅니다. 첫 요청이 이미 처리됐는데 자동으로 다시 보내면, 같은 변경이 두 번 반영될 수 있습니다.',
            decision: '데이터를 바꾸는 요청은 자동 재시도를 껐습니다. 예외는 멱등키를 붙인 예약 접수 하나입니다. 응답 자체를 받지 못한 경우에만 같은 키로 한 번 다시 보냅니다.',
            reason: '멱등키를 붙이면 서버가 같은 신청임을 알아보고 처음 예약을 돌려주므로, 다시 보내도 예약이 두 건 생기지 않습니다. 멱등키가 없는 요청은 서버가 같은 요청인지 알 수 없어 자동으로 다시 보내지 않습니다. 자세한 처리는 트러블슈팅 01에서 다룹니다.',
          },
          {
            title: '서버가 힘들 때 재요청이 한꺼번에 몰리지 않게 했습니다.',
            situation: '서버에 장애가 나면 많은 사용자의 요청이 동시에 실패합니다. 이때 모두가 바로, 같은 간격으로 다시 요청하면 이미 부담이 큰 서버에 요청이 더 몰립니다.',
            decision: '실패가 이어질수록 다시 보내기까지 기다리는 시간을 2배씩 늘렸습니다(3초에서 시작하면 3초 → 6초 → 12초 → 24초 → 30초). 서버가 “몇 초 뒤에 다시 요청하라”고 알려 주면 그보다 일찍 보내지 않습니다. 사용자마다 기다리는 시간을 무작위로 최대 1.5배까지 늘려 요청 시점을 흩뜨렸습니다. 이 세 가지를 각각 Exponential Backoff, `Retry-After`, Jitter라고 부릅니다.',
            reason: '기다리는 시간이 실패할수록 길어지고 사용자마다 달라지므로, 다시 보내는 요청이 한순간에 몰리지 않고 나뉘어 도착합니다. 무작위 값은 기다리는 시간을 늘리는 쪽으로만 더해, 서버가 정한 간격보다 빨라지지 않습니다.',
          },
          {
            title: '기다리는 시간은 최대 30초로 제한했습니다.',
            situation: '기다리는 시간을 계속 2배씩 늘리면, 대기열 순번 조회도 몇 분씩 멈출 수 있습니다. 서버는 250초 동안 순번 조회가 없으면 사용자를 대기열에서 빼므로, 재시도를 기다리다가 자리를 잃게 됩니다.',
            decision: '다시 보내기까지 기다리는 시간이 30초를 넘지 않게 상한을 두었습니다.',
            reason: '무작위 값(최대 1.5배)과 응답을 기다리는 10초를 더해도 한 번에 약 55초입니다. 그래서 장애가 이어져도 250초 안에 순번 조회를 네 번 이상 다시 보낼 수 있고, 재시도 간격 때문에 250초 기준에 걸리지 않습니다.',
          },
          {
            title: '대기열 조회가 계속 실패하면 기다리는 시간도 함께 늘어나게 했습니다.',
            situation: '대기열 순번은 서버가 정한 간격마다 반복해서 조회합니다. 그런데 TanStack Query의 반복 조회(`refetchInterval`)는 주기마다 실패 횟수를 0으로 되돌립니다. 실패가 계속돼도 매번 첫 번째 실패로 계산돼, 기다리는 시간이 늘어나지 않고 같은 간격으로 요청이 계속 갑니다.',
            decision: '실패하면 다음 주기로 넘기지 않고, 그 조회 안에서 재시도를 이어 가며 실패 횟수를 계속 셌습니다. 그동안 화면에는 오류 대신 “다시 확인하고 있어요” 안내를 보여 줍니다.',
            reason: '실패 횟수가 쌓이므로 기다리는 시간도 위 규칙대로 늘어납니다. 그래서 반복 조회하는 대기열에서도 장애 때 요청이 몰리지 않습니다.',
          },
        ] },
        { label: '캐시 정책', p: '데이터마다 바뀌는 빈도가 달라서, 정책을 미리 정해 두고 각 조회(`useQuery`)가 맞는 정책을 골라 쓰게 했습니다. `staleTime`은 한 번 받은 데이터를 다시 요청하지 않고 그대로 쓰는 시간입니다. 대기열 순번처럼 반복 조회하는 데이터는 별도 정책(`polling`)으로, 서버가 정한 간격으로만 다시 조회합니다.', table: [['정책', '대상', 'staleTime', '재시도', '이유'], ['`catalog`', '상품 목록·검색·상세', '5분', '2회', '몇 분 사이에는 거의 바뀌지 않습니다'], ['`account`', '프로필·배송지', '5분', '1회', '내가 바꿀 때만 바뀌고, 저장 응답으로 바로 갱신합니다'], ['`live`', '장바구니·알림 개수', '0', '1회', '다른 화면이나 서버에서 바뀌므로 볼 때마다 새로 받습니다'], ['`peak`', '진행 중인 내 예약', '30초', '1회', '오픈 순간 여러 화면이 같은 조회를 나눠 써 요청을 줄입니다']] },
      ] },
      { id: 'core-api-client', title: '모든 API 호출을 한 곳에서 같은 형태로 처리하는 API 클라이언트', sub: true, blocks: [
        { p: '화면마다 서버 응답과 오류를 따로 처리하면, 같은 오류도 화면마다 다르게 보이거나 처리가 빠질 수 있습니다. 그래서 모든 API 호출이 지나가는 클라이언트 한 곳에서 응답과 오류를 정리했습니다.' },
        { label: '구현 조건', items: [
          '서버가 보낸 실패, 프록시 에러 페이지, 타임아웃, 네트워크 끊김, 요청 취소를 화면에서 같은 방식으로 처리할 수 있어야 합니다.',
          '로그인 정보(인증 헤더)를 붙이는 일과 로그인 만료(401) 처리는 한 곳에서 해야 합니다.',
          '사용자가 문의하면 서버 로그에서 해당 요청을 찾을 수 있어야 합니다.',
        ] },
        { label: '구현', p: '서버에서 어떤 상황이 발생해도 화면이 받는 결과는 **데이터 또는 하나의 에러**입니다. 상황별 처리 방식은 다음과 같습니다.', table: [
          ['서버 응답', '클라이언트의 처리', '화면이 받는 값'],
          ['`success: true` (정상 응답)', '응답 형식을 풀어 필요한 데이터만 꺼냅니다', '데이터'],
          ['`401` + `retryable: true` (일시 장애 표시)', '토큰 재발급 없이 2초 뒤 같은 요청을 한 번 더 보냅니다', '데이터 또는 에러'],
          ['`401` (로그인 만료)', '토큰을 재발급받고 같은 요청을 한 번만 다시 보냅니다', '성공하면 데이터, 다시 401이면 에러'],
          ['`success: false` + 에러 코드·메시지 (예: 잘못된 입력, 이미 접수됨)', '실패 내용을 하나의 에러로 변환합니다', '에러 (서버의 코드·메시지 그대로 전달)'],
          ['JSON이 아닌 본문 (프록시 에러 페이지 등)', '"서버 응답을 처리할 수 없음" 에러로 변환합니다', '에러 (`INVALID_RESPONSE`)'],
          ['응답 없음 (10초 초과, 연결 끊김)', '"응답 지연" 또는 "네트워크 확인" 에러로 변환합니다', '에러 (`TIMEOUT` / `NETWORK_ERROR`)'],
          ['요청 취소 (화면 이탈)', '실패가 아니므로 변환하지 않고 그대로 둡니다', '취소 (에러 화면이 나타나지 않음)'],
        ], note: '화면에서는 `ApiRequestError` 하나만 처리하면 됩니다. 실패 유형을 구분해야 할 때만 에러의 `code`를 확인합니다.' },
        { items: [
          '**한 곳에서 처리합니다.** 서버는 실패 응답도 같은 JSON 형식(`success / data / error / traceId`)으로 보냅니다. 그래서 axios가 4xx·5xx 응답을 바로 오류로 던지지 않게 하고(`validateStatus`), 응답 형식을 푸는 함수(`unwrap`) 한 곳에서 성공과 실패를 가립니다. 호출하는 쪽은 에러가 `ApiRequestError`인지만 확인하면 됩니다.',
          '**토큰 재발급이 반복되지 않게 했습니다.** 재발급 요청까지 401을 받으면 재발급을 다시 부르는 반복이 생길 수 있습니다. 그래서 재발급 요청에는 `skipAuthRefresh`를 붙여 재발급 처리를 건너뜁니다.',
          '**문의 코드로 서버 로그를 찾을 수 있게 했습니다.** 모든 요청에 요청 ID(`X-Request-Id`)를 붙여 보내고, 서버는 이 ID를 로그에 `traceId`로 이어서 남깁니다. 응답을 받지 못해도 보낸 ID가 에러에 남아, 에러 화면에서 "문의 코드"로 보여 줄 수 있습니다.',
          '**오래 걸리는 요청과 실시간 알림은 따로 다뤘습니다.** 기본 응답 대기 시간은 10초이고, 사진 업로드나 결제 승인처럼 오래 걸리는 요청만 `timeout`을 늘립니다. 실시간 알림(SSE)은 axios가 이어지는 응답을 읽지 못해 `fetch`로 연결하되, 연결 전 실패는 다른 요청과 같은 `ApiRequestError`로 던집니다.',
        ] },
      ] },
      { id: 'core-lint', title: '코드 구조 규칙을 문서가 아닌 lint로 강제하기', sub: true, blocks: [
        { label: '구현 조건', items: [
          '코드를 6개 층(`app → pages → widgets → features → entities → shared`)으로 나누고, 위층만 아래층을 가져다 쓰게 하는 구조(FSD)를 썼습니다.',
          '이 규칙을 문서로만 정해 두면, 급할 때 아래층이 위층을 가져다 쓰는 코드(역방향 import)가 섞여 들어옵니다. 그러면 한 곳을 고칠 때 영향을 받는 곳이 넓어지므로, 도구로 막아야 했습니다.',
        ] },
        { label: '구현', items: [
          '층마다 가져다 쓸 수 없는 영역을 lint 규칙(`eslint-plugin-import-x`의 `no-restricted-paths`)으로 정했습니다. 규칙을 어긴 코드는 커밋 단계(husky + lint-staged)에서 막힙니다.',
          '**서버 응답 형태(DTO)가 화면 코드까지 퍼지지 않게 했습니다.** DTO 타입은 `entities/*/api`와 `entities/*/model`에서만 가져다 쓸 수 있게 lint로 제한하고, 그 안에서 화면용 모델로 바꿉니다. 서버 응답이 바뀌어도 `entities/*/api` 한 곳만 고치면 됩니다.',
          '**층 규칙 때문에 막힌 연결은 주입으로 풀었습니다.** 가장 아래층(`shared`)의 API 클라이언트는 로그인 정보를 가진 `entities/auth`를 가져다 쓸 수 없습니다. 그래서 인증 헤더와 401 처리 함수를 앱이 시작할 때 넣어 주는 방식(`configureApiAuth`)으로 연결했습니다.',
        ] },
      ] },
    ],
    trouble: [
      { id: 'trouble-idempotency', title: '응답을 받지 못했을 때 접수가 중복되지 않도록 처리', tags: ['Idempotency-Key', '응답 유실 재요청', '예약 재조회'], blocks: [
        { label: '문제', p: '네트워크가 끊겨 접수 응답을 받지 못하면 접수 여부를 알 수 없습니다. 다시 누르면 예약이 두 번 생기거나, 이미 사용한 입장권으로 요청해 거절될 수 있습니다.' },
        { label: '원인', p: '접수는 서버 상태를 바꾸는 변경 요청이라 자동 재시도 대상이 아니었습니다. 응답이 오지 않으면 요청이 서버에 도착해 처리됐는지 화면에서는 알 수 없고, 같은 신청이라는 식별자 없이 다시 보내면 서버는 두 요청을 별개의 신청으로 처리할 수 있습니다.' },
        { label: '해결', items: [
          '입장권을 SHA-256으로 변환한 **멱등키**(`Idempotency-Key`)를 `sessionStorage`에 저장하고, 같은 키로만 접수합니다. 같은 키로 다시 요청하면 서버가 기존 예약을 반환합니다.',
          '그래서 응답 자체를 받지 못한 경우(`status 0`)에만 자동으로 **한 번** 재요청합니다. "변경 요청은 자동 재시도하지 않는다"는 원칙의 유일한 예외입니다.',
          '그래도 응답을 받지 못하면 진행 중인 예약을 다시 조회해, 이미 접수된 경우 버튼을 해당 예약으로 바꾸고 "다시 눌러도 예약은 하나만 접수돼요"라고 안내합니다. 입장권과 키는 삭제하지 않습니다.',
        ] },
        { label: '결과', p: 'Playwright E2E(`preorder-retry`)로 목 서버에서 상황을 재현해 확인했습니다. 같은 순간에 두 번 눌러도 예약은 하나만 생성되고, 서버가 일시적으로 실패한 뒤 다시 눌러도 같은 멱등키로 한 번만 접수됩니다. 응답을 받지 못하고 다시 보내도 처음 예약번호가 그대로 반환되며, 접수 응답이 끊기면 같은 키로 한 번 자동 재요청하고 예약은 하나만 생성됩니다.' },
      ] },
      { id: 'trouble-slider', title: '색상을 바꿀 때마다 슬라이더가 다시 생성되던 상품 카드', tags: ['React key', 'activeIndex', '재생성 80회 → 0회'], demo: 'productCard', blocks: [
        { label: '문제', p: '상품 카드에서 색상을 선택하면 해당 색상의 사진이 첫 장부터 보여야 합니다. 처음에는 가장 간단한 방법으로 슬라이더의 `key`에 사진 목록을 연결해, 색상을 바꿀 때마다 슬라이더를 제거하고 다시 생성했습니다. 이후 `Slider`에 외부에서 현재 위치를 제어하는 `activeIndex`가 추가된 뒤에도 이 방식이 남아 있었고, 일부 클릭에서는 화면 반영이 한 프레임(60Hz 기준 약 17ms) 정도 늦어졌습니다.' },
        { label: '원인', p: '`key`가 바뀌면 React가 슬라이더를 새로 생성하기 때문에, 색상을 바꿀 때마다 Swiper 생성·이벤트 연결·레이아웃 계산·사진 렌더링이 반복됩니다. 같은 주소의 사진은 브라우저 캐시를 사용하므로, 낭비된 것은 다운로드가 아니라 슬라이더 생성 비용이었습니다.' },
        { label: '해결', p: '`key`를 제거하고, 카드가 현재 슬라이드 위치를 `activeIndex`로 관리하다가 색상을 바꾸면 `0`으로만 되돌립니다. 이를 위해 공용 `Slider`가 `activeIndex`와 `onActiveIndexChange`를 받도록 수정했습니다. 색상을 바꾸면 첫 장이 보이는 동작은 그대로 유지됩니다.' },
        { label: '결과', p: '수정 전 커밋과 현재 버전을 같은 조건(프로덕션 빌드, 목 서버, 카드 1개)에서 색상 버튼을 80번 눌러 비교했습니다. 화면 갱신까지 걸린 시간은 `requestAnimationFrame` 두 번으로, 슬라이더 재생성 횟수는 `MutationObserver`로 측정했습니다.', table: [
          ['지표', '수정 전', '수정 후'],
          ['슬라이더 재생성 (80회 클릭)', '80회', '0회'],
          ['화면 갱신 시간 상위 5% (p95)', '39~44ms', '30ms'],
          ['화면 갱신 시간 최댓값', '48~50ms', '31ms'],
          ['화면 갱신 시간 중앙값', '약 29ms', '약 29ms (같음)'],
        ], note: '중앙값은 같으므로 평균적인 반응 속도는 그대로이고, 간헐적으로 늦어지던 경우가 사라진 것입니다. 카드가 많은 목록이나 저사양 기기에서는 측정하지 않았습니다.' },
        { label: '함께 개선한 것: 이미지 로딩', p: '목록·랭킹 카드 사진에 `loading="lazy"`를 적용하고 변경된 목록만 미리 불러오도록 해, 홈 첫 방문 시 이미지 요청을 **186개에서 19~93개**로 줄였습니다. 홈 배너(LCP)는 `fetchPriority="high"`로 먼저 불러옵니다.' },
      ] },
      { id: 'trouble-logout', title: '로그아웃 후에도 이전 사용자의 대기열 정보가 남아 있던 문제', tags: ['onSessionCleared', 'sessionStorage 정리', '계정 전환'], blocks: [
        { label: '문제', p: '같은 브라우저에서 A가 대기열에 선 상태로 로그아웃하고 B가 로그인하면, B의 화면에 A의 대기열 pill이 그대로 남아 있었습니다. B가 그 입장권으로 접수하려 해도 "입장권이 유효하지 않다"는 안내만 받았습니다.' },
        { label: '원인', p: '로그아웃할 때 서버에서 받아 둔 데이터(쿼리 캐시)만 삭제하고, 대기열 정보(메모리와 `sessionStorage`에 저장)는 삭제하지 않았습니다. 그래서 로그아웃한 뒤에도 대기열 상태를 확인하는 요청이 계속 발생했습니다.' },
        { label: '해결', items: [
          '로그아웃되는 시점(`onSessionCleared`)에 쿼리 캐시와 대기열 정보(순번, 입장권)를 한곳에서 함께 삭제합니다. 대기열에 있었다면 "로그아웃되어 대기열을 닫았어요"라고 안내합니다.',
          '쿼리 캐시 키에는 사용자 구분이 없기 때문에, 로그아웃 없이 같은 브라우저에서 다른 계정으로 로그인하는 경우에도 이전 사용자의 캐시를 삭제합니다.',
        ] },
        { label: '결과', p: 'Playwright E2E(`preorder-windows`)로 확인했습니다. 대기열에 선 상태로 로그아웃하면 대기열·입장권 저장소가 비워져 다음 사용자에게 이어지지 않고, 다른 창에서 로그아웃해도 대기열이 닫히며 이를 안내합니다.' },
      ] },
    ],
    verifyTitle: '테스트 및 협업',
    verify: [],
    verifyGroups: [
      { label: '테스트', metrics: [
        { v: '65', k: 'Playwright E2E 테스트 · 고객 화면 60개 작성 / 운영자 5개 공동 작성 (총 12개 파일)' },
        { v: '87 / 190', k: 'Storybook 스토리 파일 · 본인 작성 / 팀 전체' },
        { v: '11 / 37', k: 'Vitest 단위 테스트 파일 · 본인 작성 / 팀 전체' },
      ], scenarios: [
        '새로고침 후 서버 응답에 따른 대기열 화면 복원·안내, 진입 요청이 503이면 창을 유지하며 재시도 (`queue-scenarios`)',
        '같은 순간에 두 번 눌러도 예약은 하나만 생성되고, 응답을 받지 못해 다시 보내도 처음 예약번호 반환 (`preorder-retry`)',
        '승인된 결제 주소를 다시 열어도 중복 결제되지 않고, 화면 금액 위조 차단 (`cart-payment`)',
        '다른 창에서 로그아웃하면 대기열이 닫히고, 대기열·입장권 저장소 초기화 (`preorder-windows`)',
      ], items: [
        '**Storybook · Vitest**: 컴포넌트의 상태별 화면(로딩·빈 상태·에러·장애)을 스토리의 `play` 함수로 실제 브라우저(Chromium)에서 확인하고, 결제·재시도와 관련된 순수 로직(결제 승인, 대기열 백오프, 페이지네이션 등)은 단위 테스트로 검증합니다.',
        '**Playwright E2E**: 대기열·접수·결제·여러 창·서버 오류 상황을 브라우저에서 처음부터 끝까지 검증합니다. 목 서버로 실행해 `.env.local` 설정과 무관하고, 토스 결제창은 가짜 SDK로 대체해 실행합니다.',
      ], extraLabel: 'E2E 시나리오 전체 보기 (고객 화면 11개 파일, 테스트 60개)', extra: { table: [
      ['파일', '테스트', '검증 내용'],
      ['`queue-scenarios`', '24', '대기열 진입(새로고침 후 화면 복원·기존 참여 안내, 진입 요청이 503이면 창 유지·재시도), 대기 중(pill 유지, 순번 조회 실패 안내), 입장권(시간 만료 시 바로 다시 대기열 진입), 접수, 여러 창, 접수 이후(외부 등록이 5초를 넘기면 처리 중 화면)'],
      ['`cart-payment`', '11', '장바구니 합계, 약관 미동의·빈 칸 검증, 결제창에 화면 금액 그대로 전달, 승인 성공, 승인된 주소를 다시 열어도 중복 결제되지 않음, 금액 위조 차단, 승인 서버 장애, 결제창을 닫은 경우'],
      ['`preorder-retry`', '5', '같은 순간에 두 번 눌러도 예약 1개, 일시 장애 후 같은 키로 한 번만 접수, 응답을 받지 못해 다시 보내도 처음 예약번호 반환'],
      ['`preorder`', '5', '비회원은 로그인 모달 표시, 대기열을 거쳐 접수 후 결제로 이동, 이미 예약한 모델은 "구매 확정하기"로 표시, 입장권이 있으면 대기열 없이 바로 입장'],
      ['`preorder-payment`', '3', '결제가 실패해도 예약 순번 유지, 결제 후 뒤로 가기, 구매 확정 기한이 지나면 취소 처리'],
      ['`preorder-windows`', '3', '탭을 복제해도 같은 예약으로 이어짐, 다른 창에서 로그아웃하면 대기열 종료, 로그아웃 시 대기열·입장권 저장소 초기화'],
      ['`server-error`', '3', '서버 오류가 나도 홈 화면은 유지되고, 상품 상세에서는 결제·장바구니 버튼을 표시하지 않음'],
      ['`login`, `review-write`', '2 + 2', '새로고침해도 로그인 유지, 배송 완료된 주문에만 리뷰 작성 버튼 표시'],
      ['`preorder-open`, `preorder-mobile`', '1 + 1', '오픈 시각에 새로고침 없이 버튼 활성화, 모바일 화면에서 하단 탭부터 결제 페이지까지'],
    ], note: '운영자 화면 시나리오 5개(`admin.spec.ts`)는 팀원과 공동으로 작성해 위 표에서 제외했습니다.' } },
      { label: '개발 도구와 협업 규칙', items: [
      { t: '**요청 모니터 (직접 만든 개발 도구)**: 백오프와 `Retry-After`가 의도대로 동작하는지 개발자 도구 없이 화면에서 바로 확인하기 위해 만들었습니다. 대기열·사전예약·결제·알림 요청과 실패 후 대기 시간을 60초 타임라인으로 보여주고, 대기 시간이 어떻게 계산됐는지 함께 표시합니다. 목 서버에서는 [장애 내기]로 모든 요청·대기열 조회·결제 승인을 503으로 실패시킬 수 있습니다. API 클라이언트의 요청 흐름에는 관여하지 않고 기록만 남깁니다.', img: { src: '/image/nova/request-monitor.png', alt: '요청 모니터 화면. 대기열 조회가 503으로 실패하며 대기 시간이 3.3초, 8.4초, 12.3초로 늘어나는 모습', w: 840, h: 1120, caption: '대기열 조회를 503으로 실패시킨 화면입니다. 연속 실패가 이어질수록 대기 시간이 늘어납니다(3.3초 → 8.4초 → 12.3초). 기본 3초에서 2배씩 늘리고, 최대 1.5배까지 무작위 값을 더합니다.' } },
        '**커밋 규칙**: commitlint + husky로 커밋 메시지 형식을 강제하고, 커밋 본문에 변경 이유를 기록',
      ] },
      { label: 'AI 도구: 규칙과 검증으로 잘못된 제안 방지', sub: true, lead: 'AI가 프로젝트 규칙에 맞지 않는 코드를 반복해서 제안하는 문제를 규칙 문서, 역할별 에이전트, 실제 브라우저 검증으로 해결했습니다. 규칙 문서는 팀 저장소에 커밋되어 있어 팀원도 같은 규칙을 참고하고 수정합니다.', items: [
        '**규칙 문서화**: Claude Code가 프로젝트 규칙에 어긋난 코드를 제안하면 수정에서 끝내지 않고, `CLAUDE.md`와 경로별 `.claude/rules/`(styling · data-layer · routing · jsx)에 규칙으로 추가해 같은 코드가 다시 나오지 않도록 함',
        '**역할별 서브에이전트 7종**: 읽기 전용 리뷰어(`fsd-reviewer`, `auth-payment-guard`), 검증(`test-runner`, `ui-verifier`), 작업 보조(`api-spec-aligner`, `review-responder`, `pr-writer`). 모든 에이전트는 커밋·푸시·PR 답글 없이 제안까지만 수행',
        '**브라우저 검증 (Chrome MCP)**: AI의 완료 보고만 믿지 않고 실제 브라우저에서 화면, 콘솔 에러, 네트워크 요청을 확인하고, 모바일·데스크톱 화면 폭을 바꿔 반응형까지 점검',
        '**CodeRabbit AI 코드 리뷰**: PR마다 리뷰를 받고, 지적 사항을 반영한 커밋 12건 (접근성, 위젯 경계, 세션 보안 등)',
        '**OpenWiki · Figma MCP**: 기능별 흐름과 코드 위치를 정리한 위키를 자동 생성하고, Figma 디자인과 구현 화면을 비교',
      ] },
    ],
  },
  {
    slug: 'ephyra', fw: 'react', no: '02', name: 'Ephyra', kr: '에피라 · AI 통신 요금제 상담 · 가입 플랫폼', kind: 'LG유플러스 유레카 프론트엔드 개발자 과정 종합프로젝트',
    tagline: '데이터·통화·예산·OTT 이용 성향을 채팅으로 입력하면 AI가 요금제를 추천하고, 비교·가입·리워드까지 하나의 채팅 흐름으로 연결하는 서비스',
    preview: {
      description: '채팅으로 요금제를 추천받고 비교·가입까지 진행하는 AI 상담 서비스입니다.',
      role: '조장·PL · 상담 리포트·공통 UI·QA 담당',
      title: '정확한 값은 코드가, 요약은 LLM이',
      body: '요금제 이름과 금액은 채팅에 이미 있는 데이터를 그대로 담고, LLM은 설명 문장만 쓰도록 상담 리포트를 개편했습니다.',
    },
    evidenceNote: 'QA와 회귀 테스트는 목 서버가 아닌 실제 Supabase와 OpenAI Edge Function에 연결해 진행했습니다. QA에서 찾은 문제 10건은 심각도(P0~P3)별로 나눠 QA 리포트에 기록했습니다.',
    toc: [
      { id: 'sec-intro', label: '프로젝트 소개' },
      { id: 'sec-stack', label: '기술 스택·담당 업무' },
      { id: 'sec-shots', label: '주요 화면' },
      { id: 'sec-core', label: '주요 개발 내용', children: [
        { id: 'ep-report', label: '상담 리포트 구조 개편' },
        { id: 'ep-qa', label: 'QA와 회귀 테스트' },
        { id: 'ep-guest', label: '비회원 이용 범위' },
        { id: 'ep-chips', label: '추천 조건 칩 입력' },
      ] },
      { id: 'sec-trouble', label: '트러블슈팅', children: [
        { id: 'ep-plan-sync', label: '현재 요금제 불일치' },
        { id: 'ep-reward', label: '스크래치 완료 중복 실행' },
        { id: 'ep-tailwind', label: 'Tailwind 클래스 누락' },
      ] },
      { id: 'sec-verify', label: '검증과 협업' },
    ],
    period: '2026.08 ~ 2026.09 · 3주', roleShort: '조장 · PL · Frontend',
    stackShort: ['React 19', 'Supabase', 'OpenAI API', 'Playwright', 'Storybook'],
    meta: [['기간', '2026.08.14 ~ 2026.09.04 (3주)'], ['역할', '조장 · PL · Frontend · Design'], ['인원', 'Frontend 4인 (일부 Backend·LLM 겸임)'], ['기여도', '커밋 164개 (팀 전체 496개 중 2위) · 현재 코드의 약 28% · PR 13건']],
    links: [['배포', 'https://comp-project-seven.vercel.app'], ['GitHub', 'https://github.com/UrecaCompProject/compProject']],
    leads: {
      shots: '팀 시연 영상(2026.09.03)에서 캡처한 실제 구현 화면으로, 상담 시작부터 추천·비교·상담 리포트, 출석 룰렛과 마이페이지 순서로 놓았습니다.',
      core: '제가 맡은 상담 리포트, QA와 회귀 테스트, 비회원 이용 범위, 추천 조건 입력에서 내린 판단과 그 이유를 설명합니다.',
      trouble: '같은 데이터를 두 곳에서 읽어 생긴 불일치, 남아 있던 이벤트 리스너 때문에 생긴 중복 실행, Tailwind가 찾지 못한 색상 클래스를 원인부터 정리했습니다.',
    },
    // 2026.09.03 시연 영상(실제 구현 화면)에서 캡처
    shots: [
      { src: '/image/ephyra/1-welcome.jpg', phone: true, w: 664, h: 1440, title: '상담 시작', desc: '로그인하지 않은 사용자의 첫 화면입니다. 질문 입력은 막혀 있고, 아래 선택지로 가입·추천·비교·기타 상담을 시작합니다.' },
      { src: '/image/ephyra/2-chips.jpg', phone: true, w: 664, h: 1440, title: '추천 조건 입력', desc: '나이·월 데이터 사용량·예산을 칩으로 고릅니다. 정확한 값을 몰라도 구간이나 “미확인”·“무관”을 고를 수 있습니다.' },
      { src: '/image/ephyra/3-recommend.jpg', phone: true, w: 664, h: 1440, title: 'AI 요금제 추천', desc: '예산 3만 원 안에는 조건에 맞는 요금제가 없다고 먼저 알리고, 조건을 채우는 가장 저렴한 요금제를 추천합니다. 아래 버튼으로 조건을 바꿔 다시 추천받습니다.' },
      { src: '/image/ephyra/4-compare.jpg', phone: true, w: 664, h: 1440, title: '요금제 비교', desc: '이용 중인 요금제와 고른 요금제를 나란히 놓고, “차이점만 모아보기”로 다른 항목만 보여 줍니다. 이 화면에서 바로 요금제를 변경할 수 있습니다.' },
      { src: '/image/ephyra/5-report.jpg', phone: true, w: 664, h: 1440, title: '상담 리포트', desc: '상담 요약과 바꾼 요금제의 장점 한 줄은 LLM이 쓰고, 요금제 이름과 추천 목록은 상담 중 받은 데이터를 그대로 보여 줍니다.' },
      { src: '/image/ephyra/6-report-rounds.jpg', phone: true, w: 664, h: 1440, title: '리포트 추천 기록', desc: '같은 입력 조건에서 이어 받은 추천을 한 묶음으로 보여 줍니다. 처음 조건 그대로, 데이터를 늘려서, 줄여서 받은 추천이 1·2·3 순서로 이어집니다.' },
      { src: '/image/ephyra/7-roulette.jpg', phone: true, w: 664, h: 1440, title: '출석 룰렛', desc: '룰렛을 돌려 배지 1~5개 중 하나를 받는 출석 보상 게임입니다. 모은 배지는 상품으로 교환할 수 있습니다.' },
      { src: '/image/ephyra/8-usage.jpg', phone: true, w: 664, h: 1440, title: '마이페이지 사용량', desc: '이번 달 데이터·통화·문자 사용량을 막대로, 평균 데이터 사용량을 3·6·12개월 그래프로 보여 줍니다.' },
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'TanStack Query', 'Zustand', 'Supabase (Auth · PostgreSQL · Edge Functions)', 'OpenAI API', 'Storybook', 'Playwright', 'MSW', 'Vercel'],
    stackGroups: [
      { label: '화면', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4'] },
      { label: '데이터 · 상태', items: ['TanStack Query', 'Zustand'] },
      { label: '백엔드 · AI', items: ['Supabase (Auth · PostgreSQL · Edge Functions)', 'OpenAI API'] },
      { label: '테스트 · 문서화', items: ['Playwright', 'Storybook', 'MSW'] },
      { label: '배포', items: ['Vercel'] },
    ],
    duties: [
      { group: '기능', items: [
        '**상담 리포트**: 생성 데이터 구조 설계, 리포트 카드·상세 화면(추천·비교·변경 카드, 요약 카드)',
        '**회원가입**: 채팅 흐름 안에서 진행되는 회원가입, 로그인 모달, 비로그인 사용자 로그인 유도 정책',
        '**요금제 추천 입력 UI**: 드롭다운·숫자 입력을 칩 선택 방식으로 개편',
        '**리워드·게임**: 출석 룰렛, 반응속도 게임, 출석·배지·상품 교환 API 연동',
        '**마이페이지 사용량**: 3·6·12개월 평균 데이터 사용량 차트(Chart.js 기반 `LineChart`), 데이터·통화·문자 사용량 섹션',
      ] },
      { group: '공통·품질', items: [
        '**공통 UI**: Button, Input, Card, Modal, Tab, LineChart와 Storybook 스토리',
        '**QA 리포트와 회귀 테스트**: 실제 백엔드에 연결해 기능별 정상 흐름을 점검하고, Playwright 회귀 테스트 파일 3개 작성',
        '**팀 운영**: 조장·PL로 일정과 역할 조율, CodeRabbit AI 코드 리뷰 도입',
      ] },
    ],
    core: [
      { id: 'ep-report', title: '상담 리포트의 요금제 정보를 LLM이 다시 추측하지 않게', blocks: [
        { p: '상담 리포트는 상담이 끝난 뒤 사용자가 다시 열어 보는 기록입니다. 어떤 조건으로 어떤 요금제를 추천받았는지, 무엇과 비교했고 어떤 요금제로 바꿨는지가 담깁니다. 이 기록이 실제 상담과 다르면 사용자는 틀린 기록을 보고 요금제를 고르게 됩니다. 그래서 **요금제 정보는 상담 중 받은 데이터를 그대로 담고, LLM에게는 설명 문장만 맡기도록** 리포트를 다시 설계했습니다.' },
        { label: '리포트 구성', table: [
          ['영역', '채우는 곳', '내용'],
          ['추천 (`recommendedPlans`)', '채팅 데이터', '“요금제 추천받기”를 요청할 때마다 받은 추천을 모두 담고, 같은 입력 조건에서 이어진 추천끼리 묶습니다'],
          ['비교 (`comparedPlan`)', '채팅 데이터', '상담 중 마지막으로 비교한 결과'],
          ['변경 (`changedPlan`)', '채팅 데이터 + LLM', '실제로 가입·변경한 요금제와, LLM이 쓴 기존 요금제 대비 좋은 점 한 줄'],
          ['기타 (`otherNotes`)', 'LLM', 'LLM이 대화를 읽고 쓴 요약 (리포트 제목·상담 요약·사용 유형 포함)'],
        ] },
        { label: '판단과 근거', decisions: [
          {
            title: '요금제 이름과 금액은 채팅에 이미 있는 데이터로 채웠습니다.',
            situation: '개편 전에는 대화 전체와 추천 결과를 LLM에 넘기고, 추천 요금제 이름·추천 이유·월 절감액까지 LLM이 다시 써 넣게 했습니다. 이 값들은 추천을 받을 때 이미 화면이 정확한 형태로 갖고 있던 데이터입니다. 틀린 값을 확인한 적은 없지만, LLM이 글을 읽고 옮겨 쓰는 구조에서는 이름이나 금액이 달라질 여지가 있었습니다.',
            decision: '추천·비교·변경 영역은 채팅 메시지에 저장된 구조화 데이터를 그대로 모아 채웠습니다. LLM에게는 상담 요약과, 바꾼 요금제가 기존보다 나은 점을 한 줄로 쓰는 일(`changedPlanAdvantage`)만 맡겼습니다.',
            reason: '요금제 이름과 금액은 추천을 받을 때의 데이터를 복사할 뿐 LLM을 거치지 않습니다. 그래서 LLM의 답이 매번 달라져도 리포트의 요금제 정보는 사용자가 상담 화면에서 본 것과 같습니다. LLM은 정답이 하나로 정해지지 않는 설명 문장만 씁니다.',
          },
          {
            title: '상담 중에 한 비교와 요금제 변경도 리포트에 남겼습니다.',
            situation: '개편 전 리포트에는 마지막으로 받은 추천만 들어갔습니다. 상담 중에 요금제를 비교하거나 실제로 가입·변경해도 리포트에는 남지 않았습니다. 사용자가 상담에서 내린 결정이 기록에서 빠진 것입니다.',
            decision: '리포트를 추천·비교·변경·기타 네 영역으로 나눴습니다(위 리포트 구성). 추천은 요청한 횟수만큼 모두 담고, 비교는 마지막 비교 결과를, 변경은 실제로 가입·변경한 요금제를 담습니다.',
            reason: '영역마다 상담 중에 실제로 일어난 일이 하나씩 대응합니다. 그래서 리포트만 열어도 어떤 추천을 받았고, 무엇과 비교했고, 결국 어떤 요금제로 바꿨는지 확인할 수 있습니다.',
          },
          {
            title: '같은 조건에서 이어서 받은 추천은 한 묶음으로 보여 주었습니다.',
            situation: '사용자는 추천을 받은 뒤 “데이터 용량을 줄여서 추천받기” 같은 버튼으로 조건을 조금 바꿔 다시 받기도 하고, 입력 폼을 새로 제출해 처음부터 다시 받기도 합니다. 추천을 받은 순서대로만 늘어놓으면, 어떤 추천이 어떤 조건에서 나왔는지 리포트에서 구분할 수 없습니다.',
            decision: '입력 폼을 새로 제출할 때마다 묶음 번호(`groupId`)를 새로 발급하고, 버튼으로 다시 추천받으면 직전 묶음 번호를 이어 쓰게 했습니다.',
            reason: '리포트는 묶음 번호가 같은 추천을 한곳에 모아, 사용자가 입력한 조건 아래에 1·2·3 순서로 보여 줍니다(주요 화면 ‘리포트 추천 기록’). 그래서 처음 조건으로 받은 추천과, 그 뒤 조건을 바꿔 받은 추천을 나눠 볼 수 있습니다.',
          },
        ], note: '개편 전에 저장된 리포트에는 추천 묶음 데이터가 없습니다. 이런 리포트는 예전 방식(관계형 조인 결과)으로 표시해, 저장된 데이터를 옮기는 작업(마이그레이션) 없이도 계속 열리게 했습니다.' },
      ] },
      { id: 'ep-qa', title: '합친 채팅 화면을 실제 백엔드에서 점검하고, 같은 점검을 테스트로 반복할 수 있게', blocks: [
        { label: '상황', p: '마감 3일 전, 팀원 4명이 나눠 만든 기능을 하나의 채팅 화면으로 합쳤습니다. 회원가입부터 요금제 추천·비교·가입, 리워드와 마이페이지까지 모두 이 화면 안에서 이어집니다. 합친 상태에서 기능마다 처음부터 끝까지 동작하는지 확인하지 않으면, 합치면서 생긴 문제를 모른 채 마감을 맞게 됩니다.' },
        { label: '진행', p: '실제 Supabase와 OpenAI Edge Function에 연결한 상태로 QA를 진행했습니다. 사용자가 겪는 흐름은 실제 AI 응답과 데이터 저장까지 거쳐야 그대로 재현되기 때문입니다. AI 코딩 도구(Claude Code)가 브라우저 자동화 도구(Playwright)로 앱을 띄워, 기능마다 정상 흐름을 처음부터 끝까지 실행했습니다. 이 과정에서 찾은 문제 10건은 심각도에 따라 네 단계(P0~P3)로 나눠 QA 리포트에 정리했습니다.' },
        { label: '회귀 테스트', p: 'QA에서 실행한 시나리오는 자동으로 다시 실행할 수 있는 테스트 파일 3개(Playwright 회귀 테스트)로 남겼습니다. 테스트를 실행하면 개발 중인 서버와 별도로 QA 전용 개발 서버를 띄우고, 화면 없이 동작하는 브라우저(헤드리스 Chromium)에서 같은 흐름을 다시 실행합니다. 그래서 코드를 고친 뒤에도 사람이나 AI가 같은 흐름을 하나씩 다시 눌러 확인하지 않아도 됩니다.' },
      ] },
      { id: 'ep-guest', title: '비회원도 AI 상담을 써 볼 수 있게 하되, OpenAI 호출 비용이 계속 쌓이지 않게', blocks: [
        { p: '비회원은 질문을 직접 입력할 수 없고, 화면 아래 선택지 버튼(회원 가입하기·요금제 추천받기·요금제 비교하기·기타 상담)으로 상담을 진행합니다(주요 화면 ‘상담 시작’). 요금제 추천과 비교 응답은 서버(Edge Function)가 OpenAI를 호출해 만들기 때문에, 응답을 받을 때마다 비용이 생깁니다.' },
        { label: '판단과 근거', decisions: [
          {
            title: '비회원은 AI 응답이 5개 쌓이면 로그인 창을 한 번 띄우도록 했습니다.',
            situation: '로그인 없이 AI 상담을 써 볼 수 있어야, 처음 온 사용자도 가입 전에 서비스가 어떻게 동작하는지 확인할 수 있습니다. 하지만 비회원이 제한 없이 상담을 이어 가면, 가입하지 않을 사용자의 OpenAI 호출 비용이 계속 쌓입니다.',
            decision: '비회원에게도 상담은 열어 두고, AI 응답이 5개 쌓이면 로그인 창을 한 번 자동으로 띄웁니다. 그 뒤에는 어떤 선택지 버튼을 눌러도 상담이 진행되지 않고 로그인 창이 다시 나타납니다.',
            reason: '응답 5개까지는 로그인 없이 추천이나 비교를 직접 받아 볼 수 있습니다. 그 뒤로는 버튼을 눌러도 서버에 요청을 보내기 전에 로그인 창이 먼저 열리므로, 비회원의 상담이 더 이어지지 않고 그만큼 OpenAI 호출도 생기지 않습니다.',
          },
          {
            title: '비회원에게는 상담 리포트 생성 버튼을 보여 주지 않았습니다.',
            situation: '상담 리포트는 회원 계정에 저장되는 기록입니다. 요금제를 추천받은 대화에서는 비회원에게 리포트 버튼을 보여 주지 않았지만, 추천 없이 대화만 한 경우에는 이 확인이 빠져 있었습니다. 비회원이 이 버튼을 누르면 OpenAI로 리포트 내용을 먼저 만든 뒤, 저장 단계에서 “로그인이 필요합니다” 오류로 실패하는 구조였습니다. 비용은 들고 리포트는 남지 않습니다.',
            decision: '추천 없이 대화한 경우에도 로그인 여부(`isLoggedIn`)를 확인해, 비회원에게는 리포트 생성 버튼을 보여 주지 않게 했습니다.',
            reason: '두 경로 모두 같은 기준으로 버튼을 보여 주므로, 비회원이 저장되지 않을 리포트를 만들려고 OpenAI를 호출하는 일이 없습니다.',
          },
          {
            title: '로그인 창에 회원가입 버튼을 항상 두었습니다.',
            situation: '응답 5개 뒤에 뜨는 로그인 창은 비회원에게 보여 주는 창입니다. 그런데 기존 로그인 창에는 로그인 버튼만 있어서, 계정이 없는 사용자는 창을 닫고 가입할 곳을 따로 찾아야 했습니다.',
            decision: '로그인 창에 회원가입 버튼을 항상 보여 줍니다. 채팅 화면에서 연 창이면 그 자리에서 채팅 안의 가입 흐름을 시작합니다. 화면 위쪽 메뉴(헤더)에서 연 창이면 가입을 시작하라는 신호(`useSignupIntentStore`)를 남기고, 채팅 화면이 이 신호를 받아 같은 가입 흐름을 엽니다.',
            reason: '어디서 로그인 창을 열었든 회원가입 버튼 한 번으로 같은 가입 흐름에 들어갑니다. 로그인을 요구받은 비회원이 가입할 곳을 따로 찾지 않아도 됩니다.',
          },
        ] },
      ] },
      { id: 'ep-chips', title: '정확한 사용량을 몰라도 추천 조건에 답할 수 있게', blocks: [
        { p: 'AI가 요금제를 추천하려면 나이, 월 데이터 사용량, 예산을 알아야 합니다. 처음에는 나이와 우선순위는 드롭다운으로 고르고, 데이터와 예산은 숫자를 직접 입력하게 했습니다. 숫자 입력은 자기 사용량과 예산을 정확한 숫자로 아는 사용자만 막힘없이 답할 수 있는 방식입니다.' },
        { label: '판단과 근거', decisions: [
          {
            title: '숫자 대신 구간을 고르게 하고, “무관”과 “미확인”도 답으로 받았습니다.',
            situation: '숫자를 직접 입력해야 하면, 데이터 사용량을 정확히 모르는 사용자는 입력을 멈추거나 어림한 숫자를 넣어야 합니다. 어림한 숫자를 넣으면 그 숫자가 그대로 추천 기준이 되어, 실제 사용량과 다른 조건으로 추천을 받게 됩니다.',
            decision: '모든 항목을 칩 버튼으로 바꾸고, 데이터와 예산은 “5GB ~ 15GB” 같은 구간으로 고르게 했습니다. 나이와 예산에는 “무관”, 데이터에는 “미확인”을 함께 두었습니다(주요 화면 ‘추천 조건 입력’).',
            reason: '정확한 숫자를 몰라도 가까운 구간을 고르면 되고, 전혀 모르면 “미확인”을 눌러 데이터 조건 없이 추천을 받을 수 있습니다. 칩은 서버에 구간의 대표값 하나를 보내지만, 상담 리포트에는 그 숫자가 아니라 사용자가 고른 구간 이름이 그대로 남습니다.',
          },
          {
            title: '“무관”을 고른 항목은 서버가 다시 묻지 않게 했습니다.',
            situation: '“무관”이나 “미확인”을 고르면 그 항목은 조건 없이 추천해야 하므로 값을 보내지 않습니다. 그런데 서버는 값이 없는 항목을 아직 묻지 않은 항목으로 보고, 다음 입력 폼에 같은 질문을 다시 넣습니다. 사용자는 이미 답한 질문을 다시 받게 됩니다.',
            decision: '폼이 값과 함께, 사용자가 “무관”·“미확인”을 고른 항목의 이름(`skippedFields`)을 보내게 했습니다. 서버(Edge Function)는 이 목록에 있는 항목을 다시 묻지 않습니다. 채팅에 남는 입력 요약에는 사용자가 고른 “무관”이 그대로 표시됩니다.',
            reason: '값이 없는 항목 가운데 아직 묻지 않은 항목과 사용자가 상관없다고 답한 항목을 서버가 구분할 수 있습니다. 그래서 그 항목에는 조건을 걸지 않으면서, 같은 질문을 반복하지 않습니다.',
          },
          {
            title: '위쪽 끝이 없는 구간도 조건에 맞는 요금제가 빠지지 않게 대표값을 정했습니다.',
            situation: '칩은 서버에 구간의 대표값 하나를 보내고, 서버는 이 값을 “데이터가 이 값 이상인 요금제”를 고르는 기준으로 씁니다. “70GB 이상”이나 “무제한”처럼 위쪽 끝이 없는 구간에 임의로 큰 수를 넣으면, 조건을 만족하는 요금제까지 추천에서 빠집니다.',
            decision: '위쪽 끝이 없는 구간은 그 구간의 최소 요구치를 대표값으로 썼습니다. “70GB 이상”은 70을, “무제한”은 서버가 요금제 정보의 “무제한”을 숫자로 바꿀 때 쓰는 값(1000)을 보냅니다.',
            reason: '대표값이 구간의 최소 요구치와 같으므로, 서버는 그 구간을 만족하는 요금제를 빼지 않고 추천 후보에 넣습니다.',
          },
        ] },
      ] },
    ],
    trouble: [
      { id: 'ep-plan-sync', title: '요금제를 바꿨는데 상담에는 이전 요금제가 “현재 요금제”로 남던 문제', blocks: [
        { label: '문제', p: '사용자가 채팅에서 요금제를 바꾼 뒤 요금제를 비교하거나 상담 리포트를 만들면, 바꾸기 전 요금제가 계속 “현재 요금제”로 나왔습니다. 비교는 이미 바꾼 요금제가 아니라 이전 요금제를 기준으로 이루어지고, 리포트에도 이전 요금제가 현재 요금제로 저장됩니다.' },
        { label: '원인', p: '같은 “현재 요금제” 데이터를 두 곳에 따로 두고 있었습니다. 요금제 가입·변경은 서버 데이터를 보관하는 TanStack Query 캐시(`[\'plans\',\'current\']`)만 새로 고쳤는데, 채팅은 별도의 Zustand 스토어(`useSubscriptionStore`)에 담긴 값을 읽었습니다. 이 스토어는 요금제를 바꿔도 다시 불러오지 않아 이전 값이 그대로 남았습니다.' },
        { label: '해결', p: '요금제 신청이 성공하면 Zustand 스토어도 현재 요금제를 다시 불러오게 했습니다.' },
        { label: '결과', p: '요금제를 바꾸면 채팅이 읽는 값도 함께 바뀌어, 비교와 리포트가 바뀐 요금제를 현재 요금제로 씁니다. 같은 날 팀원이 Zustand 스토어에서 현재 요금제를 없애고 채팅도 TanStack Query 캐시만 읽도록 바꿔, 현재 요금제를 읽는 곳이 한 곳으로 합쳐졌습니다.' },
      ] },
      { id: 'ep-reward', title: '스크래치 게임을 한 번 끝냈는데 완료 처리가 여러 번 실행되던 문제', blocks: [
        { label: '문제', p: '스크래치 카드를 다 긁으면 완료 처리(`onWin`)가 실행되고, 이 처리에 배지 적립을 연결할 예정이었습니다. 그런데 카드를 다 긁은 뒤에도 화면을 눌렀다 뗄 때마다 완료 처리가 다시 실행됐습니다. 이대로 연결하면 한 판에 배지가 여러 번 적립됩니다.' },
        { label: '원인', p: '완료 여부를 판정하는 함수(`checkCleared`)는 카드 위에서 움직이거나(`pointermove`) 손을 뗄 때(`pointerup`)마다 실행됩니다. 완료된 뒤에도 이 이벤트 리스너가 남아 있었고, 함수는 이미 끝난 판인지 확인하지 않았습니다. 카드는 이미 다 지워진 상태라, 실행될 때마다 다시 “완료”로 판정했습니다.' },
        { label: '해결', p: '완료 여부를 기억하는 값(`hasCleared`)을 두어 완료 처리가 한 번만 실행되게 하고, 완료되면 `pointermove` 리스너도 제거했습니다.' },
        { label: '결과', p: '한 판에 완료 처리는 한 번만 실행됩니다. 이 수정을 먼저 반영한 뒤 완료 처리를 배지 적립에 연결해, 한 판을 끝내면 배지 적립 요청도 한 번만 나갑니다.' },
      ] },
      { id: 'ep-tailwind', title: '문자열로 조합한 Tailwind 색상 클래스가 적용되지 않던 문제', blocks: [
        { label: '문제', p: '마이페이지 사용량 화면은 항목마다 다른 색으로 수치와 막대를 표시합니다. 그런데 통화 항목의 수치·막대와 문자 항목의 막대에 색이 나오지 않았습니다.' },
        { label: '원인', p: '색상 클래스를 `text-${chooseColor(label)}`처럼 실행 중에 문자열로 조합해 만들었습니다. Tailwind는 빌드할 때 소스 코드에 완성된 이름으로 적힌 클래스만 찾아 CSS를 만듭니다. 데이터 항목의 클래스는 다른 파일에 같은 이름이 적혀 있어 우연히 CSS가 있었지만, 통화 항목의 보라색(`text-[#955BE0]`)과 문자 막대(`bg-accent-primary`)는 어디에도 완성된 이름으로 적혀 있지 않았습니다.' },
        { label: '해결', p: '항목마다 완성된 클래스 이름을 객체(`COLOR_CLASSES`)에 적어 두고, 라벨로 꺼내 쓰게 했습니다.' },
        { label: '결과', p: '모든 색상 클래스가 소스 코드에 완성된 이름으로 적혀 있어, Tailwind가 항목별 CSS를 빠짐없이 만듭니다. 9월 3일 시연 화면(주요 화면 ‘마이페이지 사용량’)에서도 통화 항목의 수치와 막대가 보라색으로 표시됩니다.' },
      ] },
    ],
    verifyTitle: '검증과 협업',
    verify: [
      '**QA**: AI 코딩 도구(Claude Code)가 브라우저 자동화 도구(Playwright)로 앱을 띄워 기능별 정상 흐름을 처음부터 끝까지 실행 (주요 개발 내용 02)',
      '**Playwright**: QA에서 실행한 시나리오를 회귀 테스트 파일 3개로 직접 작성. 실행하면 QA 전용 개발 서버를 띄워 헤드리스 Chromium에서 확인',
      '**Storybook**: 공통 UI 컴포넌트 카탈로그 (팀 전체 스토리 파일 31개)',
      '**CodeRabbit AI 코드 리뷰**: 설정 파일을 직접 추가해 dev·main·feature·test 브랜치로 향하는 PR을 자동 리뷰',
    ],
  },
  {
    slug: 'nextgacha', fw: 'next', no: '03', name: 'NEXT GACHA', kr: '1인 5개 구매 제한 가챠 쇼핑몰', kind: '개인 프로젝트 · 1인 개발',
    tagline: '되팔이의 대량 구매를 막기 위해 같은 상품을 1인당 최대 5개까지만 살 수 있게 만든 온라인 가챠 쇼핑몰',
    preview: {
      description: '같은 상품을 1인당 최대 5개까지 구매할 수 있는 가챠 쇼핑몰입니다.',
      role: '1인 개발 · 기획·디자인·Frontend·Backend',
      title: '모바일 LCP 3.28s → 1.78s',
      body: '홈의 데이터 요청을 서버 렌더링 단계로 옮기고, 서로 독립적인 조회를 병렬로 처리했습니다.',
      note: '2026.10 측정 · 11월 재디자인 후 생긴 CLS 회귀는 2026.11.20에 수정했습니다.',
    },
    evidenceNote: '표에 적은 성능 수치는 운영 환경에서 Lighthouse 13.5.0을 3회 실행한 중앙값입니다. LCP 3.28s → 1.78s는 2026.10에 측정했습니다. 11월 재디자인 뒤 생긴 CLS 회귀는 2026.11.20에 수정을 배포한 뒤 다시 측정해, 모바일 0.000·데스크톱 0.003을 확인했습니다. 이때 모바일 실측 LCP는 실행마다 0.89s~2.44s로 차이가 커서, 10월 값과 비교하지 않았습니다.',
    toc: [
      { id: 'sec-intro', label: '프로젝트 소개' },
      { id: 'sec-background', label: '기획 배경' },
      { id: 'sec-planning', label: '기획·디자인' },
      { id: 'sec-stack', label: '기술 스택·담당 업무' },
      { id: 'sec-shots', label: '주요 화면' },
      { id: 'sec-arch', label: '시스템 구성' },
      { id: 'sec-core', label: '주요 개발 내용', children: [
        { id: 'ng-limit', label: '1인 5개 한도' },
        { id: 'ng-payment', label: '결제 처리' },
        { id: 'ng-order', label: '주문 상태 전환' },
        { id: 'ng-render', label: '렌더링과 데이터 구조' },
      ] },
      { id: 'sec-trouble', label: '트러블슈팅', children: [
        { id: 'ng-cart', label: '요청 제어' },
        { id: 'ng-perf', label: '렌더링과 성능' },
        { id: 'ng-auth', label: '접근 제어' },
      ] },
      { id: 'sec-ops', label: '배포와 운영' },
      { id: 'sec-verify', label: '검증' },
    ],
    period: '2025.08 ~ 2026.02 · 2026.11 ~ 진행 중', roleShort: '기획 · Frontend · Backend · Design',
    stackShort: ['Next.js 16', 'TypeScript', 'TanStack Query', 'MongoDB', 'NextAuth'],
    meta: [['기간', '2025.08 ~ 2026.02 + 2026.09 구조 리팩토링 · 2026.10 성능 개선 · 2026.11 ~ 결제·운영 보강 (진행 중)'], ['역할', '기획 · Frontend · Backend · Design'], ['인원', '1인 개발'], ['규모', 'API Route 56개, 사용자 화면과 관리자 백오피스 포함']],
    links: [['배포', 'https://nextgacha.vercel.app'], ['GitHub', 'https://github.com/llmeajinll/Nextgacha']],
    shots: [
      { group: '쇼핑몰', src: '/image/nextgacha/1-home.jpg', w: 1440, h: 732, title: '홈', desc: '사용 안내 배너 아래에 인기·신규·예약 상품을 보여줍니다. 서버 컴포넌트에서 배너와 세 섹션을 동시에 조회합니다.' },
      { group: '쇼핑몰', src: '/image/nextgacha/6-reservation.jpg', w: 1440, h: 732, title: '예약 판매', desc: '홈 하단의 예약 판매 목록입니다. 상품마다 예약 월을 태그로 표시합니다.' },
      { group: '쇼핑몰', src: '/image/nextgacha/2-product.jpg', w: 1440, h: 732, title: '상품 상세', desc: '가격·택배비·적립금, 옵션 선택, 구매·장바구니·찜 기능을 제공합니다. 하단 탭에서 상품 정보·Q&A·리뷰를 확인할 수 있습니다.' },
      { group: '쇼핑몰', src: '/image/nextgacha/3-options.jpg', w: 1440, h: 732, title: '옵션 선택', desc: '옵션별 남은 재고를 함께 보여주고, 선택한 옵션은 수량 카드로 추가됩니다.' },
      { group: '쇼핑몰', src: '/image/nextgacha/7-limit.jpg', w: 1440, h: 732, title: '5개 제한 안내', desc: '수량을 5개 넘게 올리면 안내 문구가 나타납니다. 장바구니·배송 중 수량과 재고를 함께 계산해, 같은 상품은 1인당 5개까지만 담을 수 있습니다.' },
      { group: '쇼핑몰', src: '/image/nextgacha/8-qna.jpg', w: 1440, h: 732, title: '상품 Q&A', desc: '비밀 문의는 내용을 숨기고, 작성자 이메일은 일부만 표시합니다.' },
      { group: '쇼핑몰', src: '/image/nextgacha/4-notice.jpg', w: 1440, h: 732, title: '공지', desc: '상단 고정 공지와 함께 공지·배송·예약·이벤트 분류별 목록을 보여줍니다.' },
      { group: '관리자', src: '/image/nextgacha/16-admin-dashboard.jpg', w: 1440, h: 732, title: '관리자 홈', desc: '오늘 들어온 주문, 배송 처리 대기 건, 오류 신고, 배송 기한을 넘긴 주문, 답변 기한을 넘긴 문의를 한눈에 확인하고 각 관리 메뉴로 이동할 수 있습니다.' },
      { group: '관리자', src: '/image/nextgacha/17-admin-product-add.jpg', w: 1440, h: 732, title: '상품 추가', desc: '기본 정보·가격·옵션을 입력하면 오른쪽에 쇼핑몰 상품 카드 미리보기가 표시됩니다. 할인율을 입력하면 판매가가 자동으로 계산됩니다.' },
      { group: '관리자', src: '/image/nextgacha/12-admin-products.jpg', w: 1440, h: 732, title: '상품 관리', desc: '등록된 상품의 가격, 할인율, 옵션 재고를 한 목록에서 확인합니다. 수정 버튼을 누르면 목록에서 바로 수정할 수 있습니다.' },
      { group: '관리자', src: '/image/nextgacha/15-admin-category.jpg', w: 1440, h: 732, title: '카테고리 관리', desc: '쇼핑몰 헤더의 카테고리 메뉴를 관리합니다. 대분류별로 항목을 추가·삭제하고, 드래그로 순서를 변경합니다.' },
      { group: '관리자', src: '/image/nextgacha/10-delivery.jpg', w: 1440, h: 732, title: '주문 관리', desc: '상품 확인중·배송중·배송 완료·환불·교환 탭으로 주문을 구분해 관리합니다. 택배사와 송장번호를 입력해 배송중으로 변경하거나, 사유를 적어 배송을 거절(환불)할 수 있으며, 여러 건을 한 번에 처리할 수도 있습니다.' },
      { group: '관리자', src: '/image/nextgacha/13-admin-event.jpg', w: 1440, h: 732, title: '이벤트 관리', desc: '여러 상품에 할인율을 한 번에 적용하거나 해제합니다. 카테고리를 바꿔 가며 선택해도 이미 선택한 상품은 유지됩니다.' },
      { group: '관리자', src: '/image/nextgacha/14-admin-banner.jpg', w: 1440, h: 732, title: '배너 관리', desc: '쇼핑몰 메인 상단의 롤링 배너를 관리합니다. 위·아래 버튼으로 노출 순서를 바꾸고, 오른쪽 패널에서 이미지·링크·게시 기간을 수정합니다.' },
      { group: '관리자', src: '/image/nextgacha/18-admin-notice.jpg', w: 1440, h: 732, title: '공지 관리', desc: '공지를 작성하고 게시 중·예약·임시 저장 상태로 나눠 관리합니다. 중요한 공지는 상단에 고정하고, 미리 작성한 공지는 예약한 시각에 게시됩니다.' },
      { group: '관리자', src: '/image/nextgacha/19-admin-user.jpg', w: 1440, h: 732, title: '사용자 관리', desc: '전체 회원 수, 이번 달 가입자, 주문 회원 수, 지급된 포인트 잔액을 확인하고, 회원별 주문 수·누적 결제 금액·포인트를 조회합니다.' },
      { group: '관리자', src: '/image/nextgacha/20-admin-qna.jpg', w: 1440, h: 732, title: '문의 답변', desc: '답변 대기 중인 문의를 대기 일수와 함께 보여줍니다. 문의를 선택하면 오른쪽에서 바로 답변할 수 있고, 등록한 답변은 상품 상세 Q&A에 바로 반영됩니다.' },
      { group: '관리자', src: '/image/nextgacha/21-admin-review.jpg', w: 1440, h: 732, title: '리뷰 모아보기', desc: '전체 평균 별점과 별점 분포를 확인하고, 상품별 리뷰를 별점이 낮은 순으로 모아 봅니다.' },
      { group: '관리자', src: '/image/nextgacha/22-admin-error.jpg', w: 1440, h: 732, title: '오류 신고 수집', desc: '사용자가 보낸 오류 제보와 결제 취소 실패 같은 시스템 에러를 한곳에 모아 접수·처리 완료·무시 상태로 관리합니다.' },
    ],
    stack: ['Next.js 16 (App Router)', 'TypeScript', 'TanStack Query', 'Jotai', 'Vanilla Extract', 'NextAuth (카카오 OAuth)', 'MongoDB Atlas', 'TossPayments', 'Vercel Blob', 'Node test runner', 'Storybook 10', 'GitHub Actions', 'Google Analytics 4', 'Vercel'],
    background: ['정가 상품을 대량으로 구매한 뒤 웃돈을 붙여 되파는 사람들 때문에, 정작 그 상품이 필요한 사람은 더 비싼 값을 치러야 하는 문제가 있습니다.', '그래서 **같은 상품은 1인당 최대 5개**까지만 구매할 수 있도록 했습니다. 전시용, 보관용, 예비용 2개, 선물용을 기준으로 정한 수량입니다. 배송이 완료되기 전까지는 주문한 수량도 한도에 포함되며, 배송이 완료되면 다시 5개까지 구매할 수 있습니다.'],
    timeline: [
      { when: '2025.08 ~ 10', title: '기획 · 디자인 · 첫 배포', desc: '1인 5개 한도를 정하고 Figma로 화면을 디자인한 뒤, Vercel에 첫 배포를 진행했습니다.' },
      { when: '2025.11 ~ 2026.02', title: '기능 개발', desc: '장바구니, 토스페이먼츠 결제, 리뷰, 관리자 상품·주문 관리 기능을 순서대로 개발했습니다.' },
      { when: '2026.09 ~ 10', title: '구조 개편 · 성능 개선', desc: 'FSD 구조로 전환하고, 보안 점검과 홈 서버 렌더링 전환을 진행했습니다.' },
      { when: '2026.11 ~ 진행 중', title: '결제 · 운영 보강', desc: '결제 실패 처리와 자동 환불 기능을 추가하고, 정책 문서와 장애 대응 절차를 정리했습니다.' },
    ],
    planning: [
      { p: '기능을 만들기 전에 규칙부터 정했습니다. 구매 한도, 결제, 환불, 배포, 장애 대응까지 **19개 영역, 90여 개의 정책**을 문서로 관리하고, 정책마다 결정 이유와 변경 이력을 기록합니다.' },
      { label: '정책 문서 예시 · 1인 5개 한도의 기준', table: [
        ['항목', '내용'],
        ['정책', '같은 상품은 장바구니와 배송 중 수량을 합쳐 5개까지 가질 수 있다. 배송이 끝나면 다시 살 수 있다.'],
        ['이유', '목적은 되팔이 방지다. 인기 상품은 배송이 끝나기 전에 품절되므로, 동시 보유 기준만으로도 사실상 "한 번 입고될 때 1인 5개"가 된다.'],
      ] },
      { label: '하지 않기로 한 것', items: [
        '**다른 계정을 이용한 중복 구매는 자동으로 차단하지 않았습니다.** 가족이 기기나 배송지를 함께 쓰는 경우 정상 사용자까지 차단될 수 있기 때문입니다. 대신 기기 ID·IP·배송지가 겹치는 주문을 관리자 화면에 표시하고, 운영자가 직접 판단합니다.',
        '**Sentry는 도입하지 않았습니다.** Next.js의 `onRequestError` 훅으로 에러를 직접 수집해 관리자 화면에서 확인합니다.',
      ] },
    ],
    design: [
      { p: 'Figma로 화면을 먼저 디자인한 뒤 구현했습니다. 가챠 기계에서 콘셉트를 가져와 픽셀 폰트를 사용하고, 아이콘도 직접 그렸습니다. 아래는 초기 시안입니다.', imgs: [
        { src: '/image/nextgacha/figma-main.jpg', alt: 'Figma로 그린 메인 화면 초기 시안. 캡슐 모양 버튼이 달린 배너 아래에 예약 판매 상품 카드가 배치된 모습', w: 1314, h: 1000, caption: '메인 화면. 배너를 넘기는 버튼을 가챠 캡슐과 레버 모양으로 디자인했습니다.' },
        { src: '/image/nextgacha/figma-detail.jpg', alt: 'Figma로 그린 상품 상세 화면 초기 시안. 상품 사진 옆에 가격 정보, 옵션 선택, 구매 버튼이 배치된 모습', w: 1314, h: 831, caption: '상품 상세. 선택한 옵션은 아래에 수량 카드로 추가됩니다.' },
        { src: '/image/nextgacha/figma-icons.png', alt: '직접 그린 픽셀 아이콘 모음. 하트, 공유, 휴지통, 포인트, 티켓, 편지, 물음표, 자물쇠, 알림 종 등.', w: 2250, h: 197, caption: '직접 그린 픽셀 아이콘.' },
      ] },
    ],
    ops: [
      { items: [
        '**환경 분리**: 운영 DB와 개발 DB를 분리했습니다. 개인정보가 없는 컬렉션만 매일 운영 DB에서 개발 DB로 복사합니다.',
        '**장애 알림**: 결제 취소 실패처럼 결제와 주문 데이터가 어긋날 수 있는 장애는 관리자 카카오톡으로 즉시 알립니다.',
        '**결제 차단 스위치**: 결제 장애가 발생하면 환경변수 하나로 결제 버튼과 승인 API를 함께 차단합니다.',
      ] },
      { label: '배포 실패에서 만든 규칙', p: '2026년 10월 운영 배포가 연동 오류로 실패했지만 이를 알아차리지 못해, 운영 환경이 26일 전 배포 상태로 남아 있었습니다. 이후 배포할 때마다 완료 여부를 확인하고, 문제가 생기면 원인을 찾기 전에 먼저 직전 배포로 되돌리는 것을 규칙으로 정했습니다.' },
    ],
    archImg: '/image/nextgacha-architecture.svg',
    erdImg: '/image/nextgacha-erd.svg',
    arch: '브라우저 ─▶ proxy.ts (로그인·관리자 권한 검사, 기기 ID 쿠키)\n              │\n              ▼\n         API Routes (BFF) ─▶ MongoDB Atlas\n              │        └──▶ TossPayments (결제 승인)\n              │        └──▶ Vercel Blob (상품 이미지 업로드 토큰)\n              ▼\n         NextAuth ◀──▶ Kakao OAuth',
    duties: [
      { group: '기획 · Design', items: ['구매·환불·예약 판매 정책 수립', 'Figma로 쇼핑몰과 관리자 화면 디자인'] },
      { group: 'Frontend', items: ['홈, 검색, 상품 상세, 장바구니, 결제, 마이페이지', '페이지별 Server/Client 렌더링 결정, TanStack Query 조회 구조, FSD 레이어 구성'] },
      { group: 'Backend', items: ['API Route 56개와 MongoDB 데이터 모델 설계, 카카오 로그인과 권한 검사', '토스 결제 검증, 트랜잭션 처리, 환불'] },
      { group: '관리자 · 운영', items: ['주문·상품·이벤트·배너·공지·회원·문의·리뷰·오류 관리 화면', 'Vercel 배포, 운영·개발 DB 분리, GitHub Actions CI'] },
    ],
    core: [
      { id: 'ng-limit', title: '1인 5개 한도: 누적 구매량이 아닌 "현재 보유 수량" 기준', blocks: [
        { p: '되팔이는 막되, 배송이 끝난 사람은 다시 구매할 수 있어야 합니다. 그래서 한도를 "지금까지 구매한 개수"가 아니라 **장바구니 수량 + 배송 중 수량**으로 정의했습니다. 결제하면 배송 중 수량(`keep`)에 더하고, 배송 완료나 환불 시 차감합니다. 세 경우 모두 같은 순수 함수로 계산합니다.' },
        { label: '한도를 네 단계에서 검사하는 이유', table: [
          ['검사 위치', '역할', '동시 요청'],
          ['화면', '한도를 넘으면 요청을 보내지 않고 즉시 안내', '막지 못함'],
          ['장바구니 API', '화면을 거치지 않은 요청을 미리 거절', '막지 못함'],
          ['결제 승인 전', '실제 결제 전에 거절', '막지 못함'],
          ['결제 트랜잭션', '최종 방어', '막음'],
        ], note: '마지막 검사는 트랜잭션 안에서 사용자 문서를 읽고 쓰기 때문에, 두 개의 탭에서 동시에 결제해도 한도를 넘을 수 없습니다.' },
      ] },
      { id: 'ng-payment', title: '결제: 승인 전에는 검증으로 막고, 승인 후 실패하면 결제를 취소', blocks: [
        { p: '토스 결제 승인은 외부 API 호출이라 DB 트랜잭션으로 묶을 수 없습니다. 승인 후 주문 저장에 실패하면 결제는 완료됐는데 주문은 없는 상태가 됩니다. 그래서 거절할 수 있는 조건은 모두 승인 전에 검사하고, 승인 후 발생한 실패는 결제 취소로 되돌립니다.' },
        { label: '처리 순서', items: [
          '**1. 승인 전 검증**: 재고를 확인하고, 금액·포인트·5개 한도를 DB 기준으로 다시 계산합니다. 클라이언트가 보낸 금액은 신뢰하지 않습니다.',
          '**2. 토스 승인**: 이 단계에서 실제 결제가 이루어집니다.',
          '**3. 단일 트랜잭션으로 처리**: 포인트 차감, 재고 차감, 주문 생성, 장바구니 비우기를 하나로 묶어, 하나라도 실패하면 모두 롤백합니다. 재고는 남은 수량이 충분할 때만 차감하기 때문에, 동시에 결제해도 음수가 되지 않습니다.',
          '**4. 실패 시 결제 취소**: 결제 취소까지 실패하면 기록을 남기고 관리자에게 알립니다.',
        ] },
      ] },
      { id: 'ng-order', title: '주문 상태 전환: 중복 요청은 한 번만 처리하고, 환불은 결제 취소부터', blocks: [
        { items: [
          '**현재 상태를 조건으로 상태를 변경합니다.** `배송중`인 주문만 `배송 완료`로 바꾸는 방식이라, 버튼을 두 번 눌러도 두 번째 요청은 아무것도 변경하지 않습니다. 따라서 적립금이 중복 지급되지 않습니다.',
          '**환불은 결제 취소부터 처리합니다.** 토스 결제 취소가 성공한 뒤에 재고·포인트·보유 수량을 복구합니다. 순서를 반대로 하면 주문은 환불 상태인데 실제 결제는 취소되지 않은 상태가 생길 수 있습니다.',
          '관리자 거절, 구매자 취소, 3영업일 안에 발송하지 못한 주문의 자동 환불이 모두 같은 함수를 사용합니다.',
        ] },
      ] },
      { id: 'ng-render', title: '렌더링과 데이터 구조: 조회는 서버에서, 사용자 조작은 클라이언트 캐시로', blocks: [
        { items: [
          '홈과 상품 상세는 서버 컴포넌트에서 DB를 직접 조회합니다. 홈은 배너와 세 섹션을 `Promise.all`로 동시에 조회합니다.',
          '조회 로직은 공용 서버 함수로 분리해 API Route와 서버 컴포넌트에서 함께 사용합니다. 서버 컴포넌트에서 자체 API를 fetch하면 세션 쿠키가 전달되지 않아 401 오류가 발생하기 때문입니다.',
          '장바구니처럼 자주 바뀌는 데이터는 TanStack Query로 조회하고, 수량 변경 후에는 해당 쿼리만 무효화합니다.',
          '상품 상세 탭은 Parallel Routes로, 리뷰 작성 모달은 Intercepting Routes로 구현해 탭과 모달이 각각 고유한 URL을 갖도록 했습니다.',
        ] },
      ] },
    ],
    trouble: [
      { id: 'ng-cart', title: '클라이언트 상태 관리와 요청 제어: 연속 클릭 시 5개 한도를 넘는 요청 발생', tags: ['TanStack Query', '중복 요청 제어', '캐시 기준 사전 검증', '서버 재검증'], blocks: [
        { label: '원인', p: '수량 버튼을 누르면 Server Action이 서버 API를 호출하고, `revalidateTag`로 장바구니 캐시를 무효화해 다시 조회하는 구조였습니다. 화면의 수량은 마지막으로 재조회한 결과였기 때문에, 응답이 오기 전에 다시 누르면 두 요청이 같은 이전 수량을 기준으로 한도 검사를 통과했습니다. 또한 화면에서는 요청이 진행 중인지 알 수 없었습니다.' },
        { label: '트레이드오프', table: [
          ['비교', 'revalidateTag 유지', 'TanStack Query'],
          ['진행 중인 요청 확인', '`useTransition` 등으로 직접 상태를 관리해야 함', 'mutation의 `isPending` 제공'],
          ['사전 검증에 쓸 수량', '서버가 다시 렌더링한 값. 응답 전에는 이전 값', '쿼리 캐시의 수량'],
          ['비용', '추가 라이브러리 없음', '번들 크기 증가'],
        ], note: '장바구니는 자주 사용하는 기능이라, 번들 크기 증가를 감수하고 TanStack Query로 전환했습니다.' },
        { label: '검증 계층', p: '클라이언트의 차단은 사용성을 위한 것이고, 데이터 정합성은 서버가 책임지도록 검증 계층을 나눴습니다.', table: [
          ['계층', '역할', '동시 요청'],
          ['버튼', '처리 중인 요청이 있으면(`isPending`) 클릭을 무시', '상태가 다음 렌더링에 반영되므로, 같은 렌더링 안의 연속 클릭은 막지 못함'],
          ['화면 사전 검증', '쿼리 캐시의 수량으로 `장바구니 + 배송 중 < min(5, 재고 + 배송 중)`을 확인하고, 초과하면 요청 없이 사유를 안내', '막지 못함'],
          ['장바구니 API', 'DB의 재고·장바구니·배송 중 수량으로 다시 검사해 400으로 거절', '검사와 쓰기 사이의 경쟁 상태는 막지 못함'],
          ['결제 트랜잭션', '트랜잭션 안에서 사용자 문서를 읽고 써서 한도를 다시 검사', '막음. 쓰기 충돌 시 트랜잭션 재실행'],
        ] },
        { label: '검증', p: '한도 계산은 순수 함수 단위 테스트로 확인했습니다. 결제 트랜잭션은 테스트 전용 MongoDB에서 실제로 실행해, 재고가 부족하면 앞 단계(포인트 차감, 보유 수량 추가)까지 롤백되는지 확인했습니다. 동시 요청을 실제로 발생시키는 테스트는 아직 작성하지 않았습니다.' },
        { label: '한계', items: [
          '`isPending`은 잠금 장치가 아니라 상태 값입니다. 같은 렌더링 안에서 두 번 눌린 클릭은 모두 통과할 수 있으며, 이 경우는 서버 검사에서 걸러집니다. `useRef`를 이용한 동기 잠금은 적용하지 않았습니다.',
          '장바구니 API의 검사는 원자적이지 않습니다. 동시에 도착한 두 요청이 모두 통과하면 장바구니에 한도를 넘는 수량이 담길 수 있으며, 이 주문은 결제 단계에서 거절됩니다.',
          '화면의 수량은 응답 후 재조회 결과로 갱신됩니다. 낙관적 업데이트는 적용하지 않았습니다.',
        ] },
      ] },
      { id: 'ng-perf', title: '렌더링 전략과 성능 최적화: 홈 LCP 병목과 재디자인 후 CLS 회귀', tags: ['Server Components', 'LCP 병목 분석', '데이터 페칭 병렬화', 'CLS 회귀 분석'], blocks: [
        { label: '원인', p: '운영 홈의 모바일 LCP 4.1s를 단계별로 분석해 보니, 3.17s가 이미지 다운로드(16ms)가 아니라 **요청이 시작되기 전 대기 시간**(resource load delay)이었습니다.', items: [
          '홈이 클라이언트 컴포넌트였기 때문에, 상품 데이터 요청이 JS 로드와 하이드레이션이 끝난 뒤에야 시작됐습니다.',
          '`useEffect`에서 인기 → 신규 → 예약 순서로 API를 **3회 순차 호출**했습니다(응답당 약 700ms). 세 요청은 서로의 결과에 의존하지 않았습니다.',
          '브라우저는 응답을 받아 렌더링한 뒤에야 상품 이미지 주소를 알 수 있었습니다.',
        ] },
        { label: '수정', items: [
          '**데이터 요청을 서버 렌더링 단계로 옮겼습니다.** 홈을 `async` 서버 컴포넌트로 바꿔, 하이드레이션을 기다리지 않고 상품 목록과 이미지 주소를 HTML에 담아 전달합니다.',
          '**독립적인 조회는 `Promise.all`로 병렬 처리했습니다.** 대기 시간이 세 조회 시간의 합에서 가장 느린 조회 하나의 시간으로 줄어듭니다.',
          '서버 컴포넌트에서 자체 API Route를 fetch하면 세션 쿠키가 전달되지 않습니다. 그래서 조회 로직을 서버 함수(`findProducts`)로 분리해 API Route와 함께 사용하도록 했습니다.',
          '배너 첫 이미지에 `priority`를 적용하고, 폰트를 variable font 하나로 바꿔 `@font-face`를 376개에서 128개로 줄였습니다.',
        ] },
        { label: '검증 (2026.10, 운영, Lighthouse 13.5.0 3회 중앙값)', p: '수정 사항을 하나씩 적용하며 매번 다시 측정했습니다. Lighthouse가 제안한 CSS 인라인은 HTML이 583KB로 커져 모바일 LCP가 8s대로 오히려 나빠졌고, AVIF는 로컬 이미지 최적화 과정에서 인코딩이 끝나지 않아 두 가지 모두 되돌렸습니다.', table: [['지표', '모바일 전 → 후', '데스크톱 전 → 후'], ['성능 점수', '73 → 80', '90 → 99'], ['LCP (실측)', '3.28s → 1.78s', '0.89s → 0.98s'], ['CLS', '0.13 → 0.001', '0.152 → 0.007']], note: '데스크톱 실측 LCP는 줄지 않았습니다. 서버가 DB 조회를 마친 뒤 HTML을 보내기 때문에, 늘어난 TTFB가 줄어든 대기 시간을 상쇄했습니다.' },
        { label: '재디자인 후 CLS 회귀 (2026.11)', p: '11월에 홈을 다시 디자인한 뒤 같은 방법으로 측정하니 성능 점수가 모바일 80 → 54점, 데스크톱 99 → 71점으로 떨어졌습니다. 모바일 실측 LCP는 1.78s → 1.87s로 거의 같았지만, 화면이 그려지는 동안 요소가 밀려난 정도(CLS)가 모바일 0.001 → 0.261, 데스크톱 0.007 → 1.012로 커졌습니다. 두 값 모두 구글이 “나쁨”으로 분류하는 기준(0.25 초과)을 넘었습니다.' },
        { label: '회귀 원인', p: '재디자인하면서 본문 아래에 푸터를 추가했습니다. 루트 레이아웃은 준비가 늦은 부분을 나중에 이어 보내는 경계(`Suspense`)로 페이지 본문만 감쌌고, 이 경계에는 본문 대신 먼저 보여 줄 화면(fallback)이 없었습니다. 푸터는 이 경계 밖의 공통 틀(`SiteFrame`)에서 그렸습니다. 그래서 서버는 푸터가 든 첫 HTML을 먼저 보내고, 본문은 준비되는 대로 뒤이어 보냈습니다. 늦게 도착한 본문이 자리를 차지하면서 먼저 그려져 있던 푸터를 아래로 밀어냈습니다. 10월에는 본문 아래에 다른 요소가 없어 문제가 드러나지 않았습니다.', items: [
          '수정 전 운영 HTML에서 푸터가 본문보다 먼저 전달되는 것을 확인했습니다.',
          '1350×940 데스크톱 브라우저에 레이아웃 이동 기록(layout-shift observer)을 붙이자, 푸터 한 요소가 0.223만큼 밀린 기록이 남았습니다. Lighthouse의 layout-shifts 항목에서도 모바일에서 밀리는 요소는 푸터였습니다.',
          '수정 직전 데스크톱 Lighthouse(1회)는 점수 61, CLS 1.003이었고, 가장 큰 이동을 최상위 컨테이너로 표시했습니다.',
        ] },
        { label: '회귀 수정', p: '`Suspense` 경계를 공통 틀(`SiteFrame`) 안으로 옮겨, 본문과 푸터를 같은 경계로 감쌌습니다. 이제 푸터는 본문과 함께 도착하므로, 먼저 그려졌다가 본문에 밀려날 일이 없습니다. 2026.11.20 운영 환경에 배포했습니다.' },
        { label: '회귀 검증 (2026.11.20, 운영, Lighthouse 13.5.0 3회 중앙값)', table: [
          ['지표', '모바일 회귀 → 수정 후', '데스크톱 회귀 → 수정 후'],
          ['성능 점수', '54 → 80', '71 → 98'],
          ['CLS', '0.261 → 0.000', '1.012 → 0.003'],
        ], note: '데스크톱에서 최상위 컨테이너 전체가 밀리던 현상도 이 수정 뒤 사라졌습니다. 이 현상이 푸터와 별개로 어떻게 생겼는지는 조사하지 않았습니다. 수정 후 실측 LCP 중앙값은 모바일 1.92s, 데스크톱 0.98s입니다. 모바일 실측 LCP는 실행마다 2.44s·1.92s·0.89s로 차이가 커서, 10월 측정값(1.78s)과 비교해 좋아졌는지 판단하지 않았습니다.' },
      ] },
      { id: 'ng-auth', title: '인증·인가와 접근 제어: 한 번도 실행되지 않던 로그인 검사', tags: ['proxy.ts', 'matcher', '인증·인가 분리', '요청 기반 검증'], blocks: [
        { label: '문제', p: '`/api/protected/*`에 로그인 검사가 있었는데도 비로그인 요청이 통과했고, 관리자 페이지(`/manager`)는 인증 없이 접근할 수 있었습니다. 구조 개편 중 접근 제어를 점검하다가 발견했습니다.' },
        { label: '원인', p: 'proxy의 **실행 대상**(`matcher`)과 함수 내부의 **경로 분기 순서**가 서로 맞지 않았습니다.', items: [
          '**분기 순서**: `/api`로 시작하는 경로를 통과시키는 early return이 `/api/protected` 검사보다 앞에 있었습니다. `/api/protected`는 `/api`의 하위 경로이기 때문에, 검사에 도달하기 전에 항상 반환됐습니다.',
          '**실행 대상**: `matcher`에 `/manager`가 없었습니다. `matcher`에 없는 경로에서는 proxy 함수 자체가 호출되지 않으므로, 함수 안에 어떤 검사를 넣어도 적용되지 않습니다.',
          '`/mypage`는 `matcher`에는 포함돼 있었지만, 비로그인 상태를 처리하는 분기가 없었습니다.',
        ] },
        { label: '수정', items: [
          '구체적인 경로(`/api/protected`, 관리자 API 목록)를 먼저 검사하고, 포괄적인 `/api` 통과 처리는 그 뒤로 옮겼습니다.',
          '**인증과 인가를 분리했습니다.** 로그인하지 않았으면 401, 로그인했지만 관리자(`ADMIN_EMAILS`)가 아니면 403을 반환하고, 페이지 요청은 리다이렉트합니다.',
          '`/manager`와 관리자 API를 `matcher`에 추가했습니다.',
        ] },
        { label: '검증', p: '코드를 다시 읽는 데서 그치지 않고, 비로그인 상태로 개발 서버에 curl 요청을 보내 실제 응답 코드를 확인했습니다.', table: [
          ['요청', '응답'],
          ['`/api/protected/postCart`', '401'],
          ['`/api/postEditProduct` (관리자 API)', '403'],
          ['`/manager`', '307 리다이렉트'],
          ['`/` (공개 페이지)', '200'],
        ] },
        { label: '방어 계층과 한계', items: [
          '`/api/protected/*`의 라우트 18개는 모두 라우트 내부에서도 세션을 다시 확인합니다. proxy에서 누락되더라도 라우트에서 한 번 더 막는 이중 구조입니다.',
          '관리자 API 20개는 대부분 proxy의 경로 목록과 `matcher`에만 의존합니다. 둘 중 한 곳에서 누락되면 보호되지 않기 때문에, 새 관리자 API는 양쪽 모두에 등록하는 것을 프로젝트 규칙으로 정했습니다. 라우트 내부의 관리자 검증은 아직 추가하지 못했습니다.',
        ] },
      ] },
    ],
    verifyTitle: '검증',
    verify: [
      '**단위 테스트**: 금액·포인트·한도 계산을 포함한 순수 함수를 Node 내장 테스트 러너로 검사. 테스트 파일 12개, 테스트 43개 모두 통과 (2026.11.20 기준)',
      '**DB 테스트**: 테스트 전용 MongoDB에서 결제 트랜잭션 롤백과 환불 중복 호출 거절을 확인',
      '**보안 점검**: 문의 수정·삭제 시 작성자 본인 확인을 추가하고, 요청 값이 Mongo 연산자로 해석되지 않도록 타입 검증',
      '**CI**: push와 PR마다 lint, 타입 검사, 테스트 실행',
    ],
  },
];

export const OTHERS: Other[] = [
  { id: 'nolmong', fw: 'next', name: '놀몽 NolMong', kind: '팀 프로젝트', period: '2026.07 ~ 2026.08', tagline: '일행이 같은 여행 계획을 동시에 편집하고, 동선을 지도로 확인하는 공동 여행 플랫폼', role: 'UI/UX 디자인 · Frontend · Backend', team: '3인 (전원 Frontend·Backend 겸임)', scale: '2026.07.13 ~ 2026.08.06 (약 3.5주) · 현재 코드 중 약 45% 작성 (3인 중 1위, git blame 기준)',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Supabase', 'Ably', 'Kakao Maps API'],
    links: [['배포', 'https://nolmong.vercel.app/landing'], ['GitHub', 'https://github.com/NolMong/nolmong']],
    blocks: [
      { label: '담당', items: ['**UI/UX 디자인**: 서비스 전체 디자인. 랜딩, 메인, 여행 성향 테스트, 404 페이지', '**카카오 지도 연동**: 장소 검색 모달, 계획 상세 페이지 지도, 일정 핀 표시', '**여행 생성**: 장소·날짜·예산·인원을 입력하는 생성 모달과 달력, 여행 카드, 제목 수정', '**일정 탐색**: 여행 일수만큼 Day 필터를 자동 생성하고, 스크롤 위치에 따라 현재 Day가 바뀌도록 구현'] },
      { label: '트러블슈팅', items: [
        { t: '**사용자가 옮긴 지도 위치가 계속 원래 자리로 돌아가던 문제**', sub: ['원인: 지도 컴포넌트의 기본 props를 `cards = []`처럼 지정해 렌더링마다 새 배열이 만들어졌습니다. effect가 이를 변경된 값으로 인식해 매번 다시 실행되면서 `setCenter`가 위치를 되돌렸습니다.', '해결: 빈 배열을 모듈 상수로 고정했습니다. 사용자가 마지막으로 본 위치는 `sessionStorage`에 저장하고, 첫 렌더링 시 lazy initializer로 한 번만 불러오도록 했습니다.'] },
        { t: '**실시간 채널에서 `Channel detached` 오류**', sub: ['원인: React StrictMode는 개발 모드에서 mount → cleanup → mount 순서로 실행됩니다. Ably 채널은 이름별로 공유되는 인스턴스라서, cleanup에서 채널을 detach하면 바로 이어지는 실제 마운트가 끊긴 채널을 사용하게 됐습니다.', '해결: cleanup에서는 구독만 해제하고 채널 연결은 유지했습니다.'] },
        '**배포 빌드 실패**: `useSearchParams`를 사용하는 페이지를 `Suspense`로 감싸지 않으면 Next.js 정적 렌더링 단계에서 빌드가 실패해, 해당 부분을 `Suspense`로 분리했습니다.',
      ] },
    ] },
  { id: 'owl', fw: 'react', name: 'owl-forest', kind: '교내 동아리 프로젝트', period: '2022.09 ~ 2023.04', tagline: '동아리 회원들이 책을 서로 빌리고, 독후감과 별점 리뷰를 남길 수 있는 웹 서비스', role: 'Frontend 파트 PM · Frontend · Design', team: 'Frontend 6인', scale: 'Frontend 커밋 1위 (JS 파일 기준 138건) · 결과: 팀원 이탈 없이 프로젝트 완주',
    stack: ['React', 'JavaScript', 'Styled-Components', 'Figma', 'Notion', 'Slack'],
    links: [['GitHub', 'https://github.com/C-B-U/owl-forest']],
    blocks: [
      { label: '담당', items: ['**일정·업무 관리**: 프론트엔드 팀원 7명의 시험·과제 일정을 매주 받아 태스크를 조정. 입문자는 2인 1조, 경험자는 1인 1페이지로 숙련도에 따라 배분', '**스프린트 운영**: Notion으로 1주 스프린트를 운영하고, 작업 전·진행 중·완료·오류 상태를 보드로 관리. 다른 파트 팀장들과 주간 단위로 일정과 연동 이슈 조율', '**설계와 기술 리딩**: Atomic Design 도입. Atom은 팀원들이 나눠 개발하고, Molecules·Template·Page 구조는 직접 설계해 일관성 유지. 커밋 메시지·색상·함수 이름 규칙 수립', '**코드 리뷰와 멘토링**: GitHub PR 리뷰와 Zoom 세션을 병행하며 팀원들이 막힌 부분을 함께 해결', '**개발**: 도서 검색 페이지, REST API 연동, 공통 base 컴포넌트 초기 세팅'] },
    ] },
  { id: 'adiary', fw: 'react', name: 'A-Diary', kind: '졸업 작품', period: '2022.09 ~ 2023.06', award: '졸업 작품 전시회 우수팀 선정 (관람객 투표 + 교수진 심사)', tagline: '일기를 쓰면 AI가 감정을 분석하고, 일기 내용을 바탕으로 그림을 생성해 주는 그림일기 서비스', role: 'Frontend 단독 · UI/UX 디자인', team: '4인 (Frontend 1 · Backend 3)', scale: '약 10개월 · 커밋 146건 (팀 내 1위)',
    stack: ['React', 'JavaScript', 'Styled-Components', 'Chart.js', 'AWS S3'],
    links: [['GitHub', 'https://github.com/AI-Diary/A-Diary']],
    blocks: [
      { label: '담당', items: ['**그림 그리기**: Canvas API로 그림판 구현. 키워드 이미지를 캔버스에 렌더링한 뒤 드래그 앤 드롭으로 배치', '**AI 이미지 표시**: AI가 생성한 이미지(base64)를 디코딩해 미리보기로 렌더링, 최종 선택한 이미지만 S3에 저장', '**감정 통계**: Chart.js로 감정 분포와 요일별 작성 빈도 차트 구현', '**디자인**: 서비스 전체 UI/UX 디자인'] },
      { label: '설계 판단과 회고', items: ['**S3 업로드 시점**: 사용자가 원하는 그림이 나올 때까지 여러 번 재생성하는 경우가 많았습니다. 생성할 때마다 S3에 올리면 스토리지 사용량과 비용이 늘어나서, 미리보기는 base64로만 보여주고 **일기를 저장할 때 선택한 이미지 하나만** 업로드하도록 설계했습니다.', '**다시 한다면 (1) 전송 방식**: base64는 원본보다 용량이 약 33% 커집니다. Blob으로 원본 크기 그대로 전송하겠습니다.', '**다시 한다면 (2) 업로드 보안**: 일정 때문에 프론트엔드에서 S3로 직접 업로드했는데, 이 방식은 Access Key가 클라이언트에 노출될 수 있습니다. 백엔드가 발급한 Presigned URL로만 업로드하도록 바꾸겠습니다. 그러면 aws-sdk도 클라이언트 번들에서 빠집니다.'] },
    ] },
];

export const DN_PROJECTS: DnProject[] = [
  { no: '01', name: '교사용 LMS 리뉴얼', period: '2024.01 ~ 2024.03', team: 'Backend 1 · Frontend 2 · Designer 1', summary: '공통 스타일과 MSW 목 API를 먼저 준비해, 다른 파트의 일정 지연에도 기간 내 개발을 완료했습니다.', desc: '학교 선생님이 학생의 학습 진행도, 문제 풀이 데이터, AI 학습 대화를 한 화면에서 확인하는 관리 사이트입니다. 반별 학생 조회, 단원별 진행 상황, AI 발음 평가 결과, AI 대화 재현 페이지, 레이아웃 초기 디자인을 담당했습니다.',
    blocks: [
      { label: '다른 파트를 기다리지 않는 개발', items: ['**디자인 지연 대응**: 디자이너가 다른 프로젝트를 병행하느라 바로 투입되기 어려웠습니다. 그래서 초기 UI를 직접 구성해 개발을 먼저 시작했습니다. 여백·색상·타이포그래피는 SCSS 유틸리티 클래스로 설계해서, 디자인이 확정된 뒤에는 클래스 조합만 바꿔 반영할 수 있게 했습니다.', '**백엔드 지연 대응**: 백엔드 API는 프로젝트 막바지에 완성될 예정이었습니다. Swagger로 공유받은 명세를 기반으로 MSW Mock API를 먼저 만들어, 실제 서버 없이도 기능 개발과 테스트를 진행했습니다.', '**결과**: 디자인과 백엔드 일정이 모두 지연됐지만 계획된 기간 안에 프로젝트를 완료했습니다.'] },
      { label: 'Vue 2 → Vue 3 마이그레이션', items: ['Options API에 흩어져 있던 로직을 Composition API로 옮기고, Vuex의 `this.$store`는 `useStore()`로 바꿨습니다.', '재사용 가능한 컴포넌트를 구분하고, 추가 기능에 맞춰 파일 구조를 다시 설계했습니다.'] },
    ] },
  { no: '02', name: '사내 관리자 페이지', period: '2024.01 ~ 2024.03 (LMS와 병행)', team: 'Backend 1 · Frontend 1', summary: '계정 대량 등록·정산·안내 발송 화면을 맡아, LMS와 병행하면서 3월 말 기한 안에 오픈했습니다.', desc: '운영자가 학교, 계정, 정산, 안내 발송을 한 곳에서 처리하는 관리자 시스템입니다. 개발 시점 기준 100개 이상의 초등학교에서 사용되었습니다.',
    blocks: [
      { label: '담당', items: ['**학교 검색**: 학교명·최근 등록·계약 만료순 정렬과 페이지네이션, 상세 모달에서 등록 학년·반 조회 및 정보 수정', '**학교 추가**: 구글폼 신청 내역과 연동해 가입 승인된 학교를 조회하고, 담당 교사 연락처와 이용 기간 설정', '**학생 등록**: Excel 일괄 등록과 개별 등록, 등록 결과와 학생 계정 PDF 다운로드. 처리가 오래 걸리는 구간에는 로딩 화면을 보여 주고, 실패하면 재등록 방법을 안내', '**명세서 생성**: 학급별 이용 인원에 따라 청구 금액이 달라, 학급 단위 명세서 PDF 생성과 미리보기·다운로드', '**문자·이메일 발송**: 발송 전 미리보기, 학교·학급 단위 일괄 발송'] },
      { label: '일정 관리', items: ['새 학기 수업이 시작되기 전인 3월 말까지 반드시 오픈해야 했습니다. 기획 변경과 API 수정 사항을 기획자·백엔드와 수시로 공유하며 우선순위가 높은 기능부터 개발했고, 완성된 기능은 바로 공유해 다른 파트가 이어서 작업할 수 있게 했습니다. **LMS 리뉴얼과 함께 두 프로젝트 모두 일정 안에 오픈했습니다.**'] },
    ] },
  { no: '03', name: '전시회 이벤트 페이지 2종 (응원 메시지 · 퀴즈)', period: '2023.09 ~ 2023.10 (현장실습 기간)', team: 'Backend 1 · Frontend 1 · Designer 1', summary: '모바일 이벤트 화면 개발과 현장 장애 대응을 맡고, 인증번호 발송 지연에 대응했습니다.', desc: 'KSGE / SIEF 2023 박람회 부스 방문객이 휴대폰 본인 인증 후 참여하는 모바일 이벤트 페이지입니다. 응원 메시지 이벤트 프론트엔드를 단독으로 신규 구축하고, 퀴즈 이벤트 기존 코드 리팩토링과 초기 레이아웃 디자인을 담당했습니다.',
    blocks: [
      { label: '현장 장애 대응', items: ['박람회 3일 동안 장애 대응 담당자로 현장에 참여했습니다. 총 **754명**(1일차 193명 · 2일차 328명 · 3일차 233명)이 참여했습니다.', '1일차 초반에 인증번호 발송이 지연되자 서버 리소스 증설을 요청했습니다. 지연이 해소된 뒤에는 원래 사양으로 되돌려 불필요한 비용을 줄였습니다.', '그 결과 참여자가 가장 많았던 2일차에도 지연 없이 운영했습니다.'] },
      { label: '성능 개선', items: ['**스타일 구조 개선**: 반복되는 inline style을 SCSS로 옮기고, 컴포넌트 하나의 폴더에 섞여 있던 파일들을 Atomic Design 구조로 재구성했습니다.', '**폰트 경량화**: 회사 요구로 Noto Sans CJK(Regular·Medium·Bold)를 써야 했는데, 한중일 글자를 모두 담고 있어 용량이 커서 초기 렌더링이 느렸습니다. 온라인 변환기로 WOFF2 변환을 시도했지만 글자가 깨졌고, Python `fonttools`로 직접 변환해 용량을 줄였습니다. 그래도 용량이 커서, 글자는 기본 글꼴로 먼저 보이고 폰트는 나중에 적용되도록 설정했습니다.', '**이미지 경량화**: 이미지를 WebP로 바꿔 리소스 용량을 줄였습니다.'] },
    ] },
];

export const dnStack = ['Vue.js (2→3)', 'Vuex', 'JavaScript', 'SCSS', 'MSW', 'Chart.js'];
export const dnMetrics = [{ v: '754명', k: '전시회 이벤트 3일간 참여' }, { v: '100+', k: '관리자 시스템 사용 초등학교' }, { v: '2건 병행', k: 'LMS · 관리자 시스템 모두 일정 내 오픈' }, { v: '1주', k: 'Vue 첫 사용부터 실무 투입까지' }];
export const dnLearned = [
        { t: '처음 쓰는 프레임워크에 빠르게 적응', d: '현장실습을 시작할 때까지 Vue.js를 써 본 적이 없었습니다. 일주일 동안 회사의 기존 Vue 프로젝트에서 여러 화면이 함께 쓰는 기능과 상태를 어떻게 관리하는지 분석했습니다. 공통 컴포넌트가 각 화면에서 어떻게 쓰이는지 비교하고, API 요청에 인증 정보가 담기는 과정을 Axios 인터셉터 코드에서 확인했습니다. 외부 라이브러리를 모듈로 구성한 방식과 Vuex에서 전역으로 관리하는 상태까지 정리해 팀 앞에서 발표했고, 바로 실무에 투입되었습니다.' },
        { t: '병행 프로젝트 운영', d: '일정을 늦출 수 없는 프로젝트 두 개를 동시에 진행하며, 우선순위를 정하고 다른 파트와 조율하는 방법을 익혔습니다.' },
      ];

// 첫 화면 "기술과 사용처": 기술 이름만 나열하지 않고 어디에 어떻게 썼는지 연결한다
export const TECH_USAGE: [string, string][] = [
  ['React · TypeScript', 'Nova, Ephyra 화면 전반 개발'],
  ['Next.js (App Router)', 'NEXT GACHA 홈의 서버 컴포넌트 전환, Parallel Routes·Intercepting Routes 활용'],
  ['TanStack Query', 'Nova의 실패 유형별 재시도·백오프 정책, NEXT GACHA 장바구니 중복 요청 제어'],
  ['MSW', 'Nova 목 서버 구축과 실패 상황 재현, 디엔소프트 Swagger 기반 Mock API'],
  ['Playwright', 'Nova 고객 화면 E2E 60개 작성·운영자 5개 공동 작성, Ephyra 회귀 테스트 파일 3개'],
  ['Storybook · Vitest', 'Nova 컴포넌트 상태별 스토리(로딩·빈 상태·에러)와 단위 테스트'],
  ['Vue.js', '디엔소프트 실서비스 4건, Vue 2 → 3 마이그레이션'],
  ['스타일', 'Vanilla Extract, Tailwind CSS, SCSS'],
];

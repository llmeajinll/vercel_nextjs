// "포폴 md/Portfolio.dc.html" 데이터 이식본
export type ItemImg = { src: string; alt: string; w: number; h: number; caption?: string };
export type Item = string | { t: string; sub?: string[]; img?: ItemImg };
export type Block = { label?: string; p?: string; items?: Item[]; imgs?: ItemImg[]; table?: string[][]; note?: string };
// sub: 주요 기능 개발을 뒷받침하는 보조 구현 (상세에서 한 단계 낮은 비중으로 그린다)
export type Case = { id?: string; title: string; tags?: string[]; sub?: boolean; blocks: Block[]; demo?: 'productCard' };
export type FwKey = 'react' | 'vue' | 'next';
export type Shot = { src: string; title: string; desc?: string; phone?: boolean; w?: number; h?: number; group?: string };
export type FlowStep ={ title: string; desc: string; shot: string };
export type BgFigure = { after: number; caption: string; groups: { label: string; tone: 0 | 1 | 2; steps: { title: string; hot?: boolean }[] }[] };
export type FlowBranch = { after: number; title: string; fast: string; slow: string };
export type Flow = { steps: FlowStep[]; branch: FlowBranch; phonesLead: string; phones: { shot: string; cap: string }[] };
export type SummaryItem = { label: string; value: string; description: string };
export type DescriptionItem = { title: string; body: string };
export type Project = {
  slug: string; fw: FwKey; no: string; name: string; kr: string; ongoing?: boolean; kind: string;
  // 목록에서는 대표 사례 하나만 보여주고, 구현과 검증 근거는 상세에서 다룬다.
  preview: { description: string; role: string; title: string; body: string; note?: string };
  evidenceNote: string;
  // 과제 조건을 소개와 프론트엔드 핵심 과제 사이에 보여준다.
  requirements?: SummaryItem[];
  // 상세 첫머리: 이 프로젝트에서 다룬 문제 / 기획 배경 아래: 팀 시스템과 내 담당 범위 구분
  focus?: { lead: string; items: DescriptionItem[] }; scope?: { label: string; note?: string; items: string[] }[];
  // 검증 섹션을 주제별로 묶을 때 (있으면 verify 대신 사용)
  // metrics: 먼저 보여줄 핵심 지표, scenarios: 대표 시나리오, extraLabel: extra를 접어 두고 펼칠 때 쓰는 이름, sub: 보조 영역(작게)
  verifyGroups?: { label: string; lead?: string; metrics?: { v: string; k: string }[]; scenarios?: string[]; items: Item[]; extra?: Block; extraLabel?: string; sub?: boolean }[];
  // 상세 페이지 안 목차(있으면 데스크톱 사이드 목차 + 모바일 접는 목차), 섹션 요약 문장, 역할별 기술 스택
  toc?: { id: string; label: string; children?: { id: string; label: string; sub?: boolean }[] }[];
  leads?: { flow?: string; core?: string; trouble?: string; verify?: string };
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
      core: '대기열 조회와 안내, 예약 상태에 따른 화면 표시, 재시도 정책을 어떻게 설계했는지 설명합니다. API 클라이언트와 코드 의존성 규칙도 함께 정리했습니다.',
      trouble: '응답 유실, 불필요한 컴포넌트 재생성, 사용자 간 데이터 혼선 문제를 원인부터 분석해 해결한 사례입니다.',
      verify: '핵심 지표와 대표 시나리오를 먼저 정리하고, 전체 목록은 펼쳐서 볼 수 있도록 구성했습니다.',
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
        { title: '실패 상황 검증', body: '목 서버로 장애 상황을 재현하고, Playwright로 고객 화면 E2E 테스트 60개를 직접 작성했습니다. 운영자 시나리오 5개는 팀원과 공동 작성했습니다.' },
      ],
    },
    scope: [
      { label: '담당 영역: Frontend (구매자 화면 전담)', items: ['서버에서 받은 예약 상태를 화면에 반영', '접수와 예약 확정 단계의 UI 분리', '대기열 조회·화면 상태 관리와 사용자 안내', '네트워크 오류 처리와 재시도 UX', '멱등키 기반 중복 접수 방지', 'API 클라이언트 및 프론트엔드 테스트 환경 구축'] },
    ],
    period: '2026.09 ~ 2026.10 · 약 1.5개월', roleShort: 'Frontend',
    stackShort: ['React 19', 'TypeScript', 'TanStack Query', 'MSW', 'FSD'],
    meta: [['기간', '2026.09.15 ~ 2026.10.28 (약 1.5개월)'], ['역할', 'Frontend (구매자 화면 전담)'], ['인원', '7명 (Backend 5, Frontend 2)'], ['기여도', 'Frontend 60%']],
    links: [['배포', 'https://www.grandis-nova.link'], ['GitHub', 'https://github.com/Grandis-2/fe']],
    stack: ['React 19', 'TypeScript', 'Vite', 'TanStack Query v5', 'Zustand', 'Axios', 'Vanilla Extract', 'react-router v7', 'MSW 2', '토스페이먼츠 SDK', '카카오 OAuth', 'Storybook 10 + Vitest', 'Playwright', 'Amplitude', 'ESLint', 'husky + commitlint', 'Vercel'],
    background: [
      '팀은 외부 예약 시스템의 응답을 기다리지 않고 접수 결과를 안내하기 위해, **신청 접수와 외부 등록을 분리**했습니다. 접수 결과는 먼저 안내하고, 외부 등록은 서버에서 비동기로 처리하는 구조입니다.',
    ],
    bgFigure: {
      after: 1,
      caption: '접수까지는 사용자에게 즉시 응답하고, 외부 서버 등록(확정)은 백그라운드에서 처리합니다. 결제는 등록이 끝난 뒤에 가능합니다.',
      groups: [
        { label: '즉시 응답', tone: 0, steps: [{ title: '접속' }, { title: '대기열' }, { title: '접수' }] },
        { label: '외부 서버', tone: 1, steps: [{ title: '사전예약 등록', hot: true }] },
        { label: '이후 단계', tone: 2, steps: [{ title: '결제 가능' }, { title: '결제' }, { title: '배송' }] },
      ],
    },
    flow: {
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
      { id: 'core-queue', title: '사전예약 대기열: 페이지 이동 중에도 이어지는 순번 조회와 안내', tags: ['RootLayout 전역 배치', 'QueuePill', '새로고침 후 재조회', 'useEffectEvent'], blocks: [
        { imgs: [
          { src: '/image/nova/web-pill-center.png', alt: '웹 화면. 사전예약 목록 상단 가운데에 내 번호가 표시된 pill이 떠 있는 모습', w: 1120, h: 432, caption: '대기열 창을 닫고 다른 페이지로 이동해도 상단에 pill이 계속 표시됩니다.' },
          { src: '/image/nova/m-pill-center.png', alt: '모바일 화면. 사전예약 목록 상단 가운데에 내 번호가 표시된 pill이 떠 있는 모습', w: 648, h: 648 },
        ] },
        { label: '구현 조건', items: [
          '대기열 창을 닫아도 상단 pill에서 내 대기 순번을 확인할 수 있어야 합니다.',
          'pill이 떠 있는 상태로 다른 페이지로 이동해 다른 상품을 둘러볼 수 있어야 합니다.',
          '대기열 창의 안내 문구는 현재 서버 상태에 따라 달라져야 합니다.',
        ] },
        { label: '판단', p: '대기 순서와 참여 여부는 서버가 관리합니다. 프론트엔드에서는 페이지를 이동해도 조회와 안내가 끊기지 않도록 대기열 창을 **앱 최상단(`RootLayout`) 한 곳에만** 배치했습니다. 개별 페이지 안에 두면 페이지 이동 시 대기열 컴포넌트가 해제되기 때문입니다.' },
        { label: '구현', p: '대기열에 진입하는 화면에서는 `joinPreorderQueue()`만 호출하고, `RootLayout`에 배치한 컴포넌트가 서버 요청과 화면 표시를 담당합니다. 대기열 창만 닫으면 순번 조회는 계속되며, 다른 페이지로 이동해도 `QueuePill`에서 서버가 보내준 순번과 상태를 확인할 수 있습니다.', items: [
          '**새로고침 후 화면 복원**: `sessionStorage`에 저장한 상품 정보로 대기열 진입을 다시 요청하고, 서버가 응답한 순번과 상태를 화면에 반영합니다. 서버가 기존 대기열 참여를 유지하고 있다고 응답한 경우(`rejoined: true`)에만 기존 자리로 돌아왔다는 안내를 표시합니다.',
          '**pill 문구**: 확인 전에는 "내 번호 확인 중", 대기 중에는 "내 번호 23번", 차례가 가까워지면 "곧 내 차례예요 · 내 번호 23번", 차례가 오면 "내 차례예요 · 곧 예약 페이지로 이동해요"와 남은 시간을 보여줍니다.',
          '**차례가 와도 화면이 갑자기 전환되지 않도록 했습니다.** 사용자가 흐름을 놓치지 않도록 여유 시간을 두었습니다. 창이 열려 있으면 진행률 100%를 0.8초간 보여준 뒤 이동하고, 창이 닫혀 있으면 상단 pill에서 5초를 센 뒤 전환합니다.',
        ] },
        { label: '대기열 창 상태별 안내 문구', table: [
          ['서버 상태', '대기열 창 안내 문구'],
          ['순번이 줄어드는 중\n`status: "WAITING"` · `position: 23` · `totalWaiting`\n헤더 `Retry-After: 3`', '"조금만 기다려주세요, 차례가 오면 예약 페이지로 이동합니다."'],
          ['내 차례 도착', '"내 차례예요, 곧 예약 페이지로 이동합니다."'],
          ['순번 조회 일시 실패', '"연결이 불안정해 다시 확인하고 있어요." (순번은 마지막 값 유지)'],
          ['인터넷 연결 끊김', '"인터넷 연결이 끊겼어요. 연결되면 자동으로 이어서 확인해요."'],
          ['연결이 오래 끊겨 대기열에서 빠졌을 가능성', '"연결이 오래 끊겨 줄에서 빠졌을 수 있어요. 연결되면 바로 다시 확인할게요."'],
          ['연결이 끊긴 사이 대기열에서 빠져 재진입', '"연결이 끊긴 사이 줄에서 빠져 다시 줄을 섰어요 (40번 → 52번)."'],
          ['새로고침 후 서버가 기존 대기열 참여를 확인\n`rejoined: true`', '"전에 서 있던 자리 그대로예요. 순번을 잃지 않았어요."'],
        ] },
        { items: [
          '**대기열 진입에 실패하면 다시 시도합니다.** 대기열이 가득 차면(`QUEUE_FULL`) 10초 뒤, 일시적인 장애면 2초 뒤 다시 진입합니다.',
          '**예상 대기 시간은 초 단위가 아니라 구간으로 보여줍니다.** "곧 입장 / 약 1분 / 약 5분 / 오래 걸림"으로 표시합니다. "0초"가 보이면 사용자가 곧 입장한다고 오해할 수 있기 때문입니다.',
          '**타이머가 초기화되지 않도록 했습니다.** 호출하는 쪽에서 렌더링마다 새 함수를 넘겨도 카운트다운이 처음부터 다시 시작되지 않도록 React 19의 `useEffectEvent`를 사용했습니다.',
        ] },
      ] },
      { id: 'core-status', title: '"접수"와 "확정"을 화면에서 구분해 보여주기', tags: ['displayStatus 기반 화면', '접수와 확정 분리', '5초 분기', '등록 지연 안내'], blocks: [
        { label: '구현 조건', items: [
          '외부 등록이 끝나기 전에는 결제할 수 없어야 합니다.',
          '등록이 늦어지더라도 사용자가 아무 안내 없이 기다리게 해서는 안 됩니다.',
        ] },
        { label: '구현', p: '서버의 예약 단계(`displayStatus`)를 기준으로 문구와 버튼을 결정했습니다. 결제가 필요한 단계만 노란색으로 강조하고, 그 전 단계에서는 결제할 수 없게 했습니다.', table: [
          ['단계', '화면 표시 문구', '의미'],
          ['`RECEIVED` · `PROCESSING`', '접수 완료 · 예약 처리 중', '접수만 완료되어 아직 결제할 수 없음. "잠시 뒤 구매 확정 가능"'],
          ['`PAYABLE`', '구매 확정 대기', '외부 등록이 끝나 결제 가능. 24시간 카운트다운 표시'],
          ['`PAYMENT_IN_PROGRESS`', '결제 진행 중', '결제창을 열었다 닫으면 다시 결제해야 함'],
          ['`PAYMENT_EXPIRED`', '결제 기한 지남', '기한이 지나 취소 처리 시작'],
          ['`RESERVED`', '예약 확정', '결제까지 완료'],
          ['`CANCELING` · `CANCELED`', '취소 처리 중 · 취소 완료', '결제한 예약은 환불이 끝나야 취소 완료'],
        ] },
        { items: [
          '**접수 직후 5초 동안 결과를 기다린 뒤 다음 화면을 정합니다.** 1초마다 외부 등록 완료 여부를 확인하고, 5초 안에 끝나면 바로 결제 화면으로 보냅니다. 늦어지면 예약 접수 화면으로 이동해 계속 기다립니다. 5초가 지나면 진행 중인 조회도 중단해, 늦게 도착한 응답 때문에 사용자가 결제 화면으로 넘어가는 일이 없도록 했습니다.',
        ], imgs: [
          { src: '/image/nova/m-4-submitting.png', alt: '모바일 상품 상세 화면. 하단 버튼에 "예약 처리 중… (최대 5초)"가 표시된 모습', w: 780, h: 1688, caption: '접수 직후 "예약 처리 중… (최대 5초)"가 표시됩니다. 5초 안에 외부 등록이 끝나면 결제 화면으로, 넘어가면 예약 접수 화면으로 이동합니다.' },
        ] },
        { items: [
          '**등록이 계속 지연되는 경우에도 안내합니다.** 처리 중에는 3초마다 상태를 다시 확인하고, 접수 후 60초가 지나면 "등록이 평소보다 오래 걸리고 있어요. 계속 안 되면 운영자가 확인해 처리해요"를 띄운 뒤 확인 간격을 30초로 늘립니다. 조회는 멈추지 않기 때문에, 이후 등록이 끝나면 화면이 자동으로 바뀝니다. 60초는 관리자 대조에서 "등록 지연"으로 분류하는 기준과 같아서, 사용자와 운영자가 같은 시점에 지연을 확인합니다.',
          '**서버가 보장하지 않는 내용은 화면에서도 약속하지 않습니다.** 서버에는 "등록 실패" 상태가 없고, 끝내 등록되지 않으면 운영자가 처리합니다. 그래서 지연 안내에 "순서는 그대로"처럼 결과를 보장하는 표현을 쓰지 않았습니다.',
          '**다른 탭에 있어도 상태를 계속 확인합니다.** 제한 시간은 탭을 벗어나 있어도 흐르기 때문에 조회도 함께 유지했습니다. 그래서 돌아왔을 때 이미 끝난 등록이 "처리 중"으로 남아 있지 않습니다.',
          '**결제 기한이 되는 순간 상태를 한 번 더 확인합니다.** 서버 시간보다 1초 늦게 조회해, 만료 취소가 시작된 상태를 화면에 바로 반영합니다.',
        ] },
      ] },
      { id: 'core-retry', title: '실패 유형별로 나눈 재시도와 백오프 정책', tags: ['isRetryableError', 'Exponential Backoff', 'Jitter', 'Retry-After'], blocks: [
        { label: '구현 조건', items: [
          '다시 보내도 결과가 같은 실패(로그인하지 않은 상태의 401, 잘못된 입력으로 인한 400 등)는 재시도하지 않아야 합니다.',
          '서버 부하가 큰 상황에서 모든 사용자가 곧바로 재요청해 상황을 더 악화시키지 않아야 합니다.',
        ] },
        { label: '역할 구분', items: [
          '**API 클라이언트(Axios)는 실패 유형을 분류합니다.** 응답을 데이터 또는 하나의 에러 타입(`ApiRequestError`)으로 정규화하고, 401 토큰 재발급, `Retry-After` 읽기, 요청 취소 판별까지 한 곳에서 처리합니다.',
          '**TanStack Query는 재요청 시점을 결정합니다.** 재시도 여부(`isRetryableError`)와 횟수, 캐시 유지 시간, 이전 요청 취소를 데이터 성격별 정책으로 관리합니다.',
        ] },
        { label: '구현', items: [
          '**재시도 기준을 하나로 통일했습니다.** 4xx는 재시도하지 않고, 5xx·타임아웃·네트워크 오류만 재시도합니다. 재시도 여부는 하나의 함수(`isRetryableError`)에서 판단합니다.',
          '**데이터 성격에 따라 캐시 정책 3가지를 만들었습니다.** 각 `useQuery`에 값을 직접 쓰지 않고, 이 중 하나를 골라 적용합니다.',
        ], table: [['정책', '대상', 'staleTime', '재시도'], ['`catalog`', '상품 목록·검색·상세', '5분', '2회'], ['`account`', '프로필·배송지', '5분', '1회'], ['`live`', '장바구니·알림 개수', '0', '1회']] },
        { items: [
          '**변경 요청(mutation)은 자동으로 재시도하지 않습니다.** 같은 요청이 두 번 반영될 수 있기 때문입니다.',
          '**401은 두 가지로 구분했습니다.** 서버가 `retryable: true`를 붙인 401은 일시적인 장애로 보고 토큰 재발급 없이 2초 뒤 한 번 재요청하고, 로그인이 만료된 401은 토큰을 재발급한 뒤 같은 요청을 한 번만 다시 보냅니다. 그래도 401이면 에러로 처리합니다.',
          '**요청 취소는 실패로 처리하지 않습니다.** 화면을 벗어나 취소된 요청은 에러로 바꾸지 않아, 네트워크 오류 안내나 에러 화면이 나타나지 않습니다.',
          '**이전 요청을 취소합니다.** 모든 조회 훅이 `queryFn`의 `signal`을 전달해, 검색 조건이 바뀌면 이전 요청이 취소됩니다. 늦게 도착한 이전 응답이 새 화면을 덮어쓰지 않습니다.',
        ] },
        { label: 'Exponential Backoff · Jitter · Retry-After', items: [
          '**실패가 이어지면 재요청 간격을 점점 늘립니다.** 실패한 요청을 바로 다시 보내면 이미 부하가 큰 서버에 요청이 더 몰립니다. 그래서 기본 간격에서 시작해 실패할 때마다 2배씩 늘립니다(예: 기본 3초 간격이면 3초 → 6초 → 12초 → 24초 → 30초). 최대 30초까지 늘어납니다.',
          '**서버가 재요청 간격을 알려 주면 그보다 일찍 보내지 않습니다.** 응답 헤더의 `Retry-After`("몇 초 뒤에 다시 요청하라")는 API 클라이언트가 읽어서 전달하고(실패 시에는 에러의 `retryAfter`, 순번 조회는 `requestWithHeaders`), 호출하는 쪽이 그 값을 사용합니다. 대기열 순번은 서버가 알려 준 `Retry-After` 간격으로 조회하고(그보다 자주 조회하지 않습니다), 요청이 실패한 뒤에는 그 값을 대기 시간의 최솟값으로 사용합니다. 서버가 간격을 알려 주지 않으면(타임아웃, 연결 끊김) 위의 백오프 방식으로 간격을 늘립니다. 사용자들이 같은 시점에 한꺼번에 재요청하지 않도록 대기 시간에 최대 1.5배까지 무작위 값을 더하는데, 늘리는 방향으로만 적용해 서버가 정한 값보다 짧아지는 일은 없습니다.',
          '**최대 간격을 30초로 정한 이유가 있습니다.** 타임아웃 10초를 더해도 한 번에 약 55초이므로, 250초 동안 대기열을 적어도 4번은 다시 조회합니다. 간격이 너무 길면 내 차례를 놓칠 수 있습니다.',
          '**폴링은 한 번의 조회 안에서 재시도합니다.** 주기마다 실패 횟수가 0으로 초기화되면 연속 실패를 셀 수 없기 때문에, 실패하면 해당 조회 안에서 계속 재시도하며 간격을 늘립니다. 그동안 화면에는 에러 대신 "다시 확인하고 있어요" 안내만 보여줍니다.',
        ], imgs: [
          { src: '/image/nova/m-5-unstable.png', alt: '모바일 대기열 창. "연결이 불안정해 다시 확인하고 있어요" 안내와 함께 대기 순서 40번이 그대로 표시된 모습', w: 780, h: 1688, caption: '순번 조회에 실패하는 동안에는 에러 대신 안내 문구를 띄우고, 마지막으로 받은 순번을 그대로 보여줍니다.' },
        ] },
      ] },
      { id: 'core-api-client', title: '모든 API 호출을 한 곳에서 같은 형태로 처리하는 API 클라이언트', sub: true, blocks: [
        { label: '구현 조건', items: [
          '서버가 반환한 실패, 프록시 에러 페이지, 타임아웃, 네트워크 끊김, 요청 취소를 화면에서 같은 방식으로 처리할 수 있어야 합니다.',
          '인증 헤더와 401 처리는 한 곳에서 해야 합니다.',
          '사용자가 문의하면 서버 로그에서 해당 요청을 찾을 수 있어야 합니다.',
        ] },
        { label: '구현', p: '서버에서 어떤 상황이 발생해도 화면이 받는 결과는 **데이터 또는 하나의 에러**입니다. 상황별 처리 방식은 다음과 같습니다.', table: [
          ['response 값', 'client.ts 처리', '화면에 전달되는 값'],
          ['`success: true` (정상 응답)', '응답 래퍼를 풀어 필요한 데이터만 꺼냅니다', '데이터'],
          ['`401` + `retryable: true` (일시 장애 표시)', '토큰 재발급 없이 2초 뒤 같은 요청을 한 번 더 보냅니다', '데이터 또는 에러'],
          ['`401` (로그인 만료)', '토큰을 재발급받고 같은 요청을 한 번만 다시 보냅니다', '성공하면 데이터, 다시 401이면 에러'],
          ['`success: false` + 에러 코드·메시지 (예: 잘못된 입력, 이미 접수됨)', '실패 내용을 하나의 에러로 변환합니다', '에러 (서버의 코드·메시지 그대로 전달)'],
          ['JSON이 아닌 본문 (프록시 에러 페이지 등)', '"서버 응답을 처리할 수 없음" 에러로 변환합니다', '에러 (`INVALID_RESPONSE`)'],
          ['응답 없음 (10초 초과, 연결 끊김)', '"응답 지연" 또는 "네트워크 확인" 에러로 변환합니다', '에러 (`TIMEOUT` / `NETWORK_ERROR`)'],
          ['요청 취소 (화면 이탈)', '실패가 아니므로 변환하지 않고 그대로 둡니다', '취소 (에러 화면이 나타나지 않음)'],
        ], note: '화면에서는 `ApiRequestError` 하나만 처리하면 됩니다. 실패 유형을 구분해야 할 때만 에러의 `code`를 확인합니다.' },
        { items: [
          '**한 곳에서 처리합니다.** 서버가 실패 응답도 JSON 래퍼(`success / data / error / traceId`)로 보내기 때문에, `validateStatus`를 열어 두고 `unwrap` 한 곳에서 래퍼를 풉니다. 호출하는 쪽은 `instanceof ApiRequestError` 하나로 분기합니다. 토큰 재발급 요청 자체는 `skipAuthRefresh`로 재발급이 반복 호출되지 않게 했습니다.',
          '**문의 코드로 서버 로그를 찾을 수 있게 했습니다.** 모든 요청에 `X-Request-Id`를 담아 보내고, 서버는 이를 `traceId`로 이어서 기록합니다. 응답이 없어도 보낸 ID가 에러에 남아, 에러 화면에서 "문의 코드"로 보여줄 수 있습니다.',
          '**기본 규칙에 예외를 두었습니다.** 기본 타임아웃은 10초이며, 사진 업로드나 결제 승인처럼 오래 걸리는 요청만 `timeout`을 늘립니다. 실시간 알림(SSE)은 `axios`가 스트림을 읽지 못해 `fetch`로 연결하되, 연결 전 실패는 같은 `ApiRequestError`로 던집니다.',
        ] },
      ] },
      { id: 'core-lint', title: '규칙을 문서가 아닌 lint로 강제하기', sub: true, blocks: [
        { label: '구현 조건', items: [
          'FSD 레이어 규칙(`app → pages → widgets → features → entities → shared`)을 말로만 정하지 않고, 급한 상황에서도 역방향 import가 생기지 않도록 도구로 강제해야 합니다.',
        ] },
        { label: '구현', items: [
          '`eslint-plugin-import-x`의 `no-restricted-paths`로 레이어별 import 금지 영역을 설정했습니다. 규칙을 어기면 커밋 단계(husky + lint-staged)에서 막힙니다.',
          '**서버 응답 형태(DTO)가 UI까지 퍼지지 않도록 했습니다.** DTO 타입은 `entities/*/api`와 `entities/*/model`에서만 import할 수 있도록 lint로 제한했습니다. API 응답이 바뀌어도 `entities/*/api` 한 곳만 수정하면 됩니다.',
          '**레이어 경계 문제는 의존성 주입으로 해결했습니다.** `shared`의 API 클라이언트는 `entities/auth`를 import할 수 없습니다. 그래서 인증 헤더와 401 처리 함수를 앱 초기화 시점에 주입받는 방식(`configureApiAuth`)으로 해결했습니다.',
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
        { v: '65', k: 'Playwright E2E 테스트 (12개 파일) 직접 작성 · 운영자 시나리오 5개는 팀원과 공동 작성' },
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
      role: '조장·PL · 상담 레포트·공통 UI·QA 담당',
      title: '정확한 값은 코드가, 요약은 LLM이',
      body: '요금제명과 절감액은 구조화된 데이터에서 가져오고, LLM은 서술 요약을 맡도록 상담 레포트를 개편했습니다.',
    },
    evidenceNote: '마감 전 QA에서 P0 2건을 발견하고, 실제 백엔드 대상 Playwright 회귀 테스트 3종을 작성했습니다. 발견한 문제와 해결·검증 상태는 사례별로 구분해 기록했습니다.',
    toc: [
      { id: 'sec-intro', label: '프로젝트 소개' },
      { id: 'sec-stack', label: '기술 스택·담당 업무' },
      { id: 'sec-core', label: '주요 개발 내용', children: [
        { id: 'ep-report', label: '상담 레포트 구조 개편' },
        { id: 'ep-qa', label: 'QA와 회귀 테스트' },
        { id: 'ep-guest', label: '비로그인 사용자 정책' },
        { id: 'ep-chips', label: '칩 선택 입력 UI' },
      ] },
      { id: 'sec-trouble', label: '트러블슈팅', children: [
        { id: 'ep-plan-sync', label: '요금제 데이터 불일치' },
        { id: 'ep-reward', label: '보상 중복 지급' },
        { id: 'ep-tailwind', label: 'Tailwind 클래스 누락' },
      ] },
      { id: 'sec-verify', label: '검증과 협업' },
    ],
    period: '2026.08 ~ 2026.09 · 3주', roleShort: '조장 · PL · Frontend',
    stackShort: ['React 19', 'Supabase', 'OpenAI API', 'Playwright', 'Storybook'],
    meta: [['기간', '2026.08.14 ~ 2026.09.04 (3주)'], ['역할', '조장 · PL · Frontend · Design'], ['인원', 'Frontend 4인 (일부 Backend·LLM 겸임)'], ['기여도', '커밋 164개 (팀 전체 496개 중 2위) · 현재 코드의 약 28% · PR 13건']],
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
      { id: 'ep-report', title: 'LLM에게 맡길 것과 맡기지 않을 것: 상담 레포트 구조 개편', blocks: [
        { label: '문제', p: '처음에는 대화 전체를 LLM에 전달하고, 요금제명·추천 사유·절감액까지 LLM이 대화 내용에서 다시 추론하는 구조였습니다.', items: ['클라이언트가 이미 정확히 알고 있는 구조화된 값(추천 요금제, 월 절감액)을 LLM이 다시 추론하다 보니 틀릴 가능성이 있었습니다.', '상담 중 요금제를 비교하거나 실제로 가입·변경한 기록은 레포트에 아예 반영되지 않았습니다.'] },
        { label: '판단', p: '**정확해야 하는 값은 코드가, 요약은 LLM이** 담당하도록 역할을 나눴습니다.', table: [['섹션', '데이터 출처'], ['추천 (`recommendedPlans`)', '추천 요청별 라운드 배열. 채팅 메시지에 이미 있는 구조화 데이터'], ['비교 (`comparedPlan`)', '마지막 비교 결과'], ['변경 (`changedPlan`)', '실제 가입·변경된 요금제 + LLM이 생성한 "기존 대비 좋은 점"'], ['기타 (`otherNotes`)', 'LLM이 생성한 자유 서술 요약']] },
        { label: '구현', items: [
          '같은 조건으로 받은 추천을 한 라운드로 묶기 위해, 정보 입력 폼을 새로 제출할 때마다 `groupId`를 발급했습니다. 이후 퀵 리플라이로 다시 질문하면 직전 라운드의 `groupId`를 그대로 사용합니다.',
          'LLM에 전달하던 Q&A에서 이미 구조화된 추천 조건(나이·데이터·예산·OTT)과 중복되는 부분을 제거했습니다.',
          '개편 전에 저장된 레포트는 기존 관계형 조인 결과로 자동 대체되도록 해, 데이터 마이그레이션 없이도 이전 레포트가 정상적으로 표시되게 했습니다.',
        ] },
      ] },
      { id: 'ep-qa', title: 'QA 리포트와 Playwright 회귀 테스트', blocks: [
        { label: '배경', p: '마감 3일 전, 팀원 4명이 나눠 개발한 기능이 하나의 채팅 화면으로 합쳐지면서 기능 간 문제를 파악하기 어려운 상태였습니다.' },
        { label: '진행', items: [
          '목업이 아닌 **실제 Supabase와 OpenAI Edge Function**을 대상으로, Chrome MCP를 통해 AI가 실제 브라우저를 조작하게 하여 기능별 정상 흐름을 처음부터 끝까지 실행했습니다.',
          { t: '발견한 문제를 P0~P3로 분류해 QA 리포트로 정리했습니다(P0 2건, P1 2건, P2 3건, P3 2건).', sub: ['**P0**: "기타 상담" 모드가 어떤 질문에도 같은 고정 문구만 반환함 (LLM 미호출 + 키워드 라우터가 이전 모드 유지)', '**P0**: Error Boundary가 하나도 없어, 지연 로드 청크 하나만 실패해도 화면 전체가 빈 화면이 됨 (실제 재현)', '**P1**: README에 적힌 접근성 기능이 코드에 없음'] },
          { t: '재현한 시나리오는 Playwright 회귀 테스트 3종으로 남겼습니다. 테스트가 QA 전용 dev 서버를 직접 띄운 뒤 헤드리스 Chromium에서 실행되므로, 사람이나 AI가 매번 다시 확인할 필요가 없습니다.', sub: ['게스트 스모크 테스트', '회원가입 → AI 추천 → 요금제 가입 골든 패스', '"기타 상담" 버그 재현: `test.fail`로 기록해 두고, 버그가 수정되면 통과로 바뀌도록 설정'] },
        ] },
      ] },
      { id: 'ep-guest', title: '비로그인 사용자 정책: 어디까지 허용할 것인가', blocks: [
        { label: '판단', p: 'AI 상담을 로그인 없이 체험할 수 있어야 첫 진입 장벽이 낮아집니다. 하지만 OpenAI 호출에는 비용이 발생합니다.' },
        { label: '구현', items: [
          '비로그인 상태에서 AI 응답이 5회 쌓이면 로그인 모달을 한 번 자동으로 띄웁니다.',
          '이후에는 퀵 리플라이 등 어떤 버튼을 눌러도 실제 동작 대신 로그인 모달이 나타납니다.',
          '비회원이 레포트를 생성할 수 없도록, 일반 대화 경로에 빠져 있던 로그인 체크를 추가했습니다. 요금제 추천 경로에는 이미 체크가 있었습니다.',
          '채팅 화면 밖(헤더)에서 회원가입을 누르면 채팅 홈으로 이동한 뒤 가입 흐름이 이어지도록 했습니다. 페이지 이동 대신 `useSignupIntentStore` 신호를 사용합니다.',
        ] },
      ] },
      { id: 'ep-chips', title: '추천 조건 입력 방식을 칩 선택으로 개편', blocks: [
        { label: '문제', p: '나이·우선순위는 드롭다운, 데이터·예산은 숫자 입력 방식이었습니다. 하지만 자신의 데이터 사용량을 정확한 숫자로 모르는 사용자가 많았습니다.' },
        { label: '구현', items: [
          '모든 입력을 칩 버튼으로 통일하고, "무관"과 "미확인" 선택지를 추가했습니다.',
          '"무관"을 선택하면 실제 제출값에서는 필터가 없는 것으로 처리하되, 채팅 요약에는 사용자가 선택한 그대로 표시되도록 했습니다.',
          '서버(Edge Function)가 "값 없음"과 "명시적으로 무관을 선택함"을 구분할 수 있도록 `skippedFields`를 추가했습니다. 그래서 사용자가 이미 "무관"이라고 답한 항목을 AI가 다시 묻지 않습니다.',
        ] },
      ] },
    ],
    trouble: [
      { id: 'ep-plan-sync', title: '요금제를 변경했는데 채팅에는 이전 요금제가 남아 있던 문제', blocks: [
        { label: '원인', p: '같은 "현재 요금제" 데이터를 두 곳에서 읽고 있었습니다. 요금제 가입·변경 시 TanStack Query 캐시(`[\'plans\',\'current\']`)만 갱신했는데, 채팅은 별도의 Zustand 스토어(`useSubscriptionStore`)를 참조하고 있었습니다. 그래서 레포트와 비교 화면에 이전 요금제가 계속 "현재 요금제"로 표시됐습니다. 데이터 출처가 두 곳으로 나뉜 구조는 QA 과정에서 미리 발견해 둔 문제였습니다.' },
        { label: '해결', p: '신청이 성공하면 Zustand 스토어도 함께 갱신하도록 수정했습니다.' },
        { label: '남은 과제', p: '근본적으로는 서버 데이터를 TanStack Query 한 곳에서만 읽어야 합니다. 마감 일정 때문에 두 곳을 동기화하는 수준에서 마무리했습니다.' },
      ] },
      { id: 'ep-reward', title: '스크래치 게임 보상이 중복 지급되던 문제', blocks: [
        { label: '원인', p: '클리어 판정 후에도 `pointermove`·`pointerup` 이벤트 리스너가 남아 있어서, 판정 함수가 계속 실행되며 `onWin`(배지 지급)이 중복 호출됐습니다.' },
        { label: '해결', p: '`hasCleared` 플래그로 클리어 처리를 1회로 제한하고, 클리어 시 `pointermove` 리스너를 제거했습니다.' },
      ] },
      { id: 'ep-tailwind', title: 'Tailwind 색상 클래스가 적용되지 않던 문제', blocks: [
        { label: '원인', p: '마이페이지 사용량 바에서 항목별 색상 클래스를 `text-${chooseColor(label)}`처럼 문자열을 조합해 만들었습니다. Tailwind는 빌드 시 소스 코드에서 완성된 클래스명을 정적으로 찾아 CSS를 생성하기 때문에, 조합한 클래스는 CSS가 생성되지 않아 색상이 적용되지 않았습니다.' },
        { label: '해결', p: '항목별로 완성된 클래스명(`text-reward-active`, `bg-reward-active` 등)을 `COLOR_CLASSES` 매핑 객체에 적어 두고, 라벨을 키로 사용해 선택하는 방식으로 변경했습니다.' },
      ] },
    ],
    verifyTitle: '검증과 협업',
    verify: [
      '**Storybook**: 공통 UI 컴포넌트 카탈로그 (팀 전체 31개 스토리)',
      '**CodeRabbit AI 코드 리뷰**: 직접 도입하고 모든 브랜치를 검사하도록 설정',
      '**Playwright**: 실제 백엔드 대상 회귀 테스트 3종',
      '**AI 활용**: Chrome MCP로 AI가 실제 브라우저를 조작하게 해 기능별 정상 흐름을 처음부터 끝까지 실행하며 QA를 진행하고, 발견한 문제의 재현 시나리오는 Playwright 테스트 코드로 남김',
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
      note: '2026.10 측정 · 이후 재디자인에서 발생한 CLS 회귀는 상세에 기록했습니다.',
    },
    evidenceNote: 'LCP 3.28s → 1.78s는 2026.10 운영 환경에서 Lighthouse를 3회 실행한 중앙값입니다. 11월 재디자인 이후 CLS 회귀는 미해결 상태이며, 아래 트러블슈팅에 별도로 기록했습니다.',
    toc: [
      { id: 'sec-intro', label: '프로젝트 소개' },
      { id: 'sec-shots', label: '주요 화면' },
      { id: 'sec-background', label: '기획 배경' },
      { id: 'sec-planning', label: '기획·디자인' },
      { id: 'sec-stack', label: '기술 스택·담당 업무' },
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
    period: '2025.09 ~ 2026.02 · 6개월', roleShort: '기획 · Frontend · Backend · Design',
    stackShort: ['Next.js 16', 'TypeScript', 'TanStack Query', 'MongoDB', 'NextAuth'],
    meta: [['기간', '2025.09 ~ 2026.02 (약 6개월) + 2026.09 구조 리팩토링 · 2026.10 성능 개선 · 2026.11 결제·운영 보강'], ['역할', '기획 · Frontend · Backend · Design'], ['인원', '1인 개발'], ['규모', 'API Route 56개, 사용자 화면과 관리자 백오피스 포함']],
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
      { when: '2026.11', title: '결제 · 운영 보강', desc: '결제 실패 처리와 자동 환불 기능을 추가하고, 정책 문서와 장애 대응 절차를 정리했습니다.' },
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
        { label: '재디자인 후 회귀 (2026.11, 미해결)', p: '11월에 홈을 다시 디자인한 뒤 같은 방법으로 측정하니 모바일 80 → 54점, 데스크톱 99 → 71점으로 떨어졌습니다. 실측 LCP는 1.78s → 1.87s로 거의 같았지만, CLS가 모바일 0.001 → 0.261, 데스크톱 0.007 → 1.012로 커졌습니다.', items: [
          '**원인**: 재디자인 과정에서 레이아웃에 푸터를 추가했는데, 본문은 fallback이 없는 `Suspense` 경계 안에 있습니다. 그래서 푸터가 포함된 셸이 먼저 렌더링되고, 본문이 스트리밍으로 들어오면서 푸터를 아래로 밀어냅니다.',
          '**확인**: Lighthouse의 layout-shifts 항목에서 모바일에서 밀리는 요소가 푸터임을 확인했고, 운영 HTML에서도 푸터가 본문보다 먼저 전달되는 것을 확인했습니다. 10월에는 본문 아래에 다른 요소가 없어 문제가 드러나지 않았습니다.',
          '**상태**: 아직 해결하지 못했습니다. 본문 영역의 높이를 미리 확보하는 fallback을 두거나, 푸터를 본문과 같은 경계 안으로 옮기면 해결될 것으로 보고 있습니다. 데스크톱에서 컨테이너 전체가 밀리는 원인은 아직 확인하지 못했습니다.',
        ] },
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
      '**단위 테스트**: 금액·포인트·한도 계산 같은 순수 함수를 Node 내장 테스트 러너로 검사',
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
  { id: 'owl', fw: 'react', name: 'owl-forest', kind: '교내 동아리 프로젝트', period: '2022.09 ~ 2023.04', tagline: '동아리 회원들이 책을 서로 빌리고, 독후감과 별점 리뷰를 남길 수 있는 웹 서비스', role: 'Frontend 파트 PM · Frontend · Design', team: 'Frontend 7인', scale: 'Frontend 커밋 1위 (JS 파일 기준 138건) · 결과: 팀원 이탈 없이 프로젝트 완주',
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
      { label: '담당', items: ['학생 계정 Excel 대량 등록', '학교·반 검색과 학교·담당 교사 정보 수정', '정산서 PDF 다운로드', 'Email·SMS 단체 발송과 미리보기'] },
      { label: '일정 관리', items: ['새 학기 수업이 시작되기 전인 3월 말까지 반드시 오픈해야 했습니다. 기획 변경과 API 수정 사항을 기획자·백엔드와 수시로 공유하며 우선순위가 높은 기능부터 개발했고, 완성된 기능은 바로 공유해 다른 파트가 이어서 작업할 수 있게 했습니다. **LMS 리뉴얼과 함께 두 프로젝트 모두 일정 안에 오픈했습니다.**'] },
    ] },
  { no: '03', name: '전시회 응원·퀴즈 이벤트 페이지', period: '2023.09 ~ 2023.10', team: 'Backend 1 · Frontend 1 · Designer 1', summary: '모바일 이벤트 화면 개발과 현장 장애 대응을 맡고, 인증번호 발송 지연에 대응했습니다.', desc: 'KSGE / SIEF 2023 박람회 부스 방문객이 휴대폰 본인 인증 후 참여하는 모바일 이벤트 페이지입니다. 응원 메시지 이벤트 프론트엔드를 단독으로 신규 구축하고, 퀴즈 이벤트 기존 코드 리팩토링과 초기 레이아웃 디자인을 담당했습니다.',
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

// 첫 화면 "기술과 사용처": 기술 이름만 나열하지 않고 어디에 어떻게 썼는지 연결한다
export const TECH_USAGE: [string, string][] = [
  ['React · TypeScript', 'Nova, Ephyra 화면 전반 개발'],
  ['Next.js (App Router)', 'NEXT GACHA 홈의 서버 컴포넌트 전환, Parallel Routes·Intercepting Routes 활용'],
  ['TanStack Query', 'Nova의 실패 유형별 재시도·백오프 정책, NEXT GACHA 장바구니 중복 요청 제어'],
  ['MSW', 'Nova 목 서버 구축과 실패 상황 재현, 디엔소프트 Swagger 기반 Mock API'],
  ['Playwright', 'Nova 고객 화면 E2E 60개 직접 작성·운영자 5개 공동 작성, Ephyra 회귀 테스트 3종'],
  ['Storybook · Vitest', 'Nova 컴포넌트 상태별 스토리(로딩·빈 상태·에러)와 단위 테스트'],
  ['Vue.js', '디엔소프트 실서비스 4건, Vue 2 → 3 마이그레이션'],
  ['스타일', 'Vanilla Extract, Tailwind CSS, SCSS'],
];

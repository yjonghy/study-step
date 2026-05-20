export default function GitHubActions() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">GitHub Actions & CI/CD</p>
            <p className="text-gray060 body-sm mt-[16px]">
                CI(Continuous Integration)는 코드 변경마다 자동으로 빌드·테스트를 실행해 문제를 조기에 발견하는 것이고,
                CD(Continuous Delivery/Deployment)는 검증된 코드를 자동으로 배포 환경까지 전달하는 것이다.
                GitHub Actions는 이를 YAML 파일로 선언적으로 구성한다.
            </p>

            {/* 기본 개념 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">핵심 개념</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["Workflow", ".github/workflows/*.yml 파일 하나. 이벤트에 반응해 실행되는 자동화 프로세스"],
                        ["Event", "workflow를 트리거하는 신호 (push, pull_request, schedule, workflow_dispatch 등)"],
                        ["Job", "독립적으로 병렬 실행되는 작업 단위. 각각 별도 러너에서 실행"],
                        ["Step", "Job 안의 순차 실행 단계. 셸 커맨드 또는 Action 하나"],
                        ["Action", "재사용 가능한 스텝 패키지 (actions/checkout, actions/setup-node 등)"],
                        ["Runner", "Job을 실행하는 서버 (GitHub 호스팅: ubuntu-latest, windows-latest, macos-latest)"],
                    ].map(([term, desc]) => (
                        <div key={term} className="bg-gray010 rounded-[6px] px-[10px] py-[7px]">
                            <p className="body-xs text-blue030 font-bold font-mono">{term}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 기본 workflow */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 CI Workflow (Next.js 예시)</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: 코드 체크아웃
        uses: actions/checkout@v4

      - name: Node.js 설정
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'          # node_modules 캐시

      - name: 의존성 설치
        run: npm ci             # package-lock.json 기준 설치

      - name: 타입 체크
        run: npx tsc --noEmit

      - name: 린트
        run: npm run lint

      - name: 테스트
        run: npm test -- --ci

      - name: 빌드
        run: npm run build`}</p>
                </div>
            </div>

            {/* CD — Vercel 배포 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CD — Vercel 자동 배포 연동</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Vercel 배포
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`}</p>
                    </div>
                    <div className="bg-blue010 rounded-[8px] p-[10px]">
                        <p className="body-xs text-blue030">Vercel은 GitHub 연동 시 PR마다 Preview URL을 자동 생성한다 — Actions 없이도 기본 배포는 가능. Actions는 타입 체크·테스트 같은 추가 검증에 주로 쓴다.</p>
                    </div>
                </div>
            </div>

            {/* 환경변수 & Secrets */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Secrets & 환경변수</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`# Settings → Secrets and variables → Actions 에서 등록

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: test
      DATABASE_URL: \${{ secrets.DATABASE_URL }}  # 암호화된 시크릿
    steps:
      - run: npm test`}</p>
                </div>
            </div>

            {/* 병렬·매트릭스 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">병렬 실행 & Matrix Strategy</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`jobs:
  # 두 Job은 병렬로 실행됨
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]  # 3개 Node 버전에서 동시 테스트
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci && npm test

  # deploy는 lint와 test 모두 성공해야 실행
  deploy:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - run: echo "배포 시작"`}</p>
                </div>
            </div>

            {/* 캐시 최적화 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">캐시로 속도 올리기</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`- name: npm 캐시
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-

# Next.js .next/cache 캐시
- name: Next.js 빌드 캐시
  uses: actions/cache@v4
  with:
    path: .next/cache
    key: \${{ runner.os }}-nextjs-\${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
    restore-keys: |
      \${{ runner.os }}-nextjs-`}</p>
                </div>
            </div>
        </article>
    )
}

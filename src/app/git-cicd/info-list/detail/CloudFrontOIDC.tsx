export default function CloudFrontOIDC() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">AWS S3/CloudFront & OIDC 배포</p>
            <p className="text-gray060 body-sm mt-[16px]">
                프론트엔드 정적 파일을 <strong>S3에 업로드하고 CloudFront로 배포</strong>하는 방식은 서버 없이 글로벌 CDN을 활용할 수 있는 표준 패턴이다.
                GitHub Actions OIDC를 사용하면 <strong>AWS 액세스 키 없이</strong> 단기 임시 자격증명으로 안전하게 배포할 수 있다.
            </p>

            {/* 전체 배포 흐름 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">전체 배포 흐름</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["1. Git push", "develop / main 브랜치에 push"],
                        ["2. GitHub Actions 트리거", "워크플로 실행 시작"],
                        ["3. OIDC 인증", "GitHub → AWS STS에서 임시 자격증명 발급"],
                        ["4. 빌드", "Node.js 설치 → npm/yarn build → dist/ 생성"],
                        ["5. S3 sync", "aws s3 sync dist/ s3://bucket-name --delete"],
                        ["6. CloudFront 캐시 무효화", "aws cloudfront create-invalidation --paths '/*'"],
                        ["7. Slack 알림", "배포 결과 + 커밋 정보 전송"],
                    ].map(([step, desc], i) => (
                        <div key={i} className="flex items-start gap-[8px] px-[10px] py-[6px] bg-gray010 rounded-[6px]">
                            <p className="body-xs font-mono text-blue040 min-w-[120px] flex-shrink-0">{step}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* OIDC란 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">OIDC 인증 — 액세스 키 없는 배포</p>
                <p className="text-gray060 body-sm">
                    기존 방식은 AWS 액세스 키를 GitHub Secrets에 저장해 배포했다. 키가 유출되면 보안 사고로 이어진다.
                    <strong>OIDC(OpenID Connect)</strong>는 GitHub Actions가 AWS에 &ldquo;나는 이 레포의 이 워크플로다&rdquo;를 증명하면 AWS가 단기 임시 자격증명을 발급한다.
                    키를 저장하지 않으므로 유출 위험이 없다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">기존 방식 (액세스 키)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# GitHub Secrets에 키 저장 → 유출 위험
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ap-northeast-2`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">OIDC 방식 (임시 자격증명)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# AWS_ROLE_ARN만 저장 — 키 없음
- name: Configure AWS credentials (OIDC)
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
    aws-region: ap-northeast-2

# → GitHub Actions가 OIDC 토큰 발급
# → AWS STS가 검증 후 15분짜리 임시 자격증명 반환
# → 워크플로 완료 시 자동 만료`}</p>
                    </div>
                </div>
            </div>

            {/* AWS IAM 설정 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">AWS IAM 설정 (OIDC Provider + Role)</p>
                <p className="text-gray060 body-sm">AWS 콘솔에서 한 번만 설정하면 이후 모든 배포에 재사용된다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">1. OIDC Provider 등록</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# IAM > Identity providers > Add provider
Provider URL: https://token.actions.githubusercontent.com
Audience:     sts.amazonaws.com`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">2. IAM Role Trust Policy (어떤 레포에서 assume 가능한지)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`{
  "Effect": "Allow",
  "Principal": {
    "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
  },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringLike": {
      // 특정 레포의 main 브랜치에서만 assume 가능
      "token.actions.githubusercontent.com:sub": "repo:yjonghy/my-repo:ref:refs/heads/main"
    }
  }
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">3. Role에 필요한 권한만 부여 (최소 권한 원칙)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`{
  "Effect": "Allow",
  "Action": [
    "s3:PutObject",
    "s3:DeleteObject",
    "s3:ListBucket",
    "cloudfront:CreateInvalidation"
  ],
  "Resource": [
    "arn:aws:s3:::my-bucket/*",
    "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
  ]
}`}</p>
                    </div>
                </div>
            </div>

            {/* 전체 워크플로 예시 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">전체 GitHub Actions 워크플로</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`name: Deploy to Production

on:
  push:
    branches: [main]

permissions:
  id-token: write  # OIDC 토큰 발급 필수
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "yarn"

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build
        run: yarn build:prod
        env:
          VITE_API_BASE_URL: \${{ secrets.VITE_API_BASE_URL }}
          VITE_PUBLIC_API_KEY: \${{ secrets.VITE_PUBLIC_API_KEY }}

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          aws-region: ap-northeast-2

      - name: Upload to S3
        run: |
          aws s3 sync dist/ s3://\${{ secrets.S3_BUCKET }} \\
            --delete \\
            --cache-control "max-age=31536000,immutable" \\
            --exclude "index.html"

          # index.html은 캐시 무효화 대상이므로 별도 처리
          aws s3 cp dist/index.html s3://\${{ secrets.S3_BUCKET }}/index.html \\
            --cache-control "no-cache,no-store,must-revalidate"

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \\
            --distribution-id \${{ secrets.CF_DISTRIBUTION_ID }} \\
            --paths "/*"

      - name: Slack notification
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ 배포 완료: \${{ github.ref_name }} — \${{ github.sha }}"
            }
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}`}</p>
                </div>
            </div>

            {/* S3 캐시 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">S3 캐시 전략</p>
                <p className="text-gray060 body-sm">파일 종류별로 다른 캐시 헤더를 설정해야 배포 후 사용자에게 최신 버전이 보인다.</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["파일", "Cache-Control", "이유"],
                        ["index.html", "no-cache, no-store", "배포마다 최신 버전 필요"],
                        ["JS/CSS (해시명)", "max-age=31536000, immutable", "내용 변경 시 파일명도 바뀜"],
                        ["이미지 (정적)", "max-age=86400", "하루 캐시 후 재검증"],
                        ["폰트", "max-age=31536000, immutable", "거의 변경 없음"],
                    ].map(([a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs font-mono ${i === 0 ? "text-gray080 font-bold" : "text-blue040"}`}>{a}</p>
                            <p className={`body-xs font-mono ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* OIDC vs 액세스 키 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">OIDC vs 액세스 키 비교</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "OIDC", "액세스 키"],
                        ["키 저장", "불필요", "GitHub Secrets 저장"],
                        ["유효 기간", "15분 자동 만료", "수동 로테이션 필요"],
                        ["유출 위험", "없음", "Secrets 유출 시 위험"],
                        ["권한 범위", "Trust Policy로 레포·브랜치 제한", "키 소유자 전체 권한"],
                        ["권장 여부", "✅ 권장", "❌ 레거시 방식"],
                    ].map(([a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-green060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">핵심 포인트</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• permissions: id-token: write 가 워크플로에 없으면 OIDC 토큰 발급 불가</p>
                    <p className="body-xs text-blue030">• index.html은 no-cache, JS/CSS 해시 파일은 immutable — 캐시 전략을 파일 유형별로 분리</p>
                    <p className="body-xs text-blue030">• CloudFront 캐시 무효화는 요금 발생 (월 1,000건 무료) — 전체(/*) vs 특정 경로 선택</p>
                    <p className="body-xs text-blue030">• S3 --delete 옵션으로 구 파일 자동 정리 — 없으면 구버전 파일이 버킷에 누적</p>
                    <p className="body-xs text-blue030">• Trust Policy의 sub 조건으로 레포·브랜치를 제한해 최소 권한 원칙 적용</p>
                </div>
            </div>
        </article>
    )
}

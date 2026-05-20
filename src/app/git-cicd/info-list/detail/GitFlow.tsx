export default function GitFlow() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Git 브랜치 전략</p>
            <p className="text-gray060 body-sm mt-[16px]">
                브랜치 전략은 팀이 코드를 어떻게 나누고 통합할지 결정하는 규칙이다.
                대표적인 세 가지 전략 — Git Flow, GitHub Flow, Trunk-Based — 의 구조와 적합한 상황을 정리한다.
            </p>

            {/* Git Flow */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Git Flow</p>
                <p className="text-gray060 body-sm">long-lived 브랜치를 여러 개 유지한다. 정기 릴리즈 사이클이 있는 제품에 적합하다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">브랜치 구조</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`main        ← 항상 production 상태
develop     ← 다음 릴리즈 통합 브랜치
feature/*   ← 기능 개발 (develop에서 분기, develop으로 PR)
release/*   ← 릴리즈 준비 (버전 bump, 마이너 버그픽스)
hotfix/*    ← main의 긴급 수정 (main & develop 양쪽에 머지)`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">기능 개발 흐름</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`git checkout develop
git checkout -b feature/login

# ... 개발 ...

git checkout develop
git merge --no-ff feature/login  # 머지 커밋 남기기
git branch -d feature/login`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Hotfix 흐름</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`git checkout main
git checkout -b hotfix/auth-crash

# ... 수정 ...

git checkout main
git merge --no-ff hotfix/auth-crash
git tag v1.2.1

git checkout develop
git merge --no-ff hotfix/auth-crash  # develop에도 반영
git branch -d hotfix/auth-crash`}</p>
                    </div>
                </div>
                <div className="mt-[4px] flex gap-[8px]">
                    <div className="flex-1 bg-green005 rounded-[6px] p-[8px]">
                        <p className="body-xs text-green060 font-bold mb-[2px]">적합</p>
                        <p className="body-xs text-gray060">버전 관리가 필요한 라이브러리, 앱스토어 출시 앱</p>
                    </div>
                    <div className="flex-1 bg-red005 rounded-[6px] p-[8px]">
                        <p className="body-xs text-red050 font-bold mb-[2px]">비적합</p>
                        <p className="body-xs text-gray060">지속적 배포(CD) 환경, 소규모·스타트업 팀</p>
                    </div>
                </div>
            </div>

            {/* GitHub Flow */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">GitHub Flow</p>
                <p className="text-gray060 body-sm">단순하다. main 하나만 long-lived 브랜치로 유지하고, 기능 브랜치를 PR로 합친다. 웹 서비스 같은 지속 배포 환경에 적합하다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`main                 ← 항상 배포 가능 상태
feature/my-feature   ← main에서 분기, PR → main → 즉시 배포

# 흐름
1. git checkout -b feature/dark-mode
2. 개발 & 커밋
3. GitHub에서 PR 오픈 → 코드 리뷰
4. main에 Squash Merge
5. CI/CD 파이프라인이 자동 배포`}</p>
                </div>
            </div>

            {/* Trunk-Based */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Trunk-Based Development</p>
                <p className="text-gray060 body-sm">모든 개발자가 하루에 한 번 이상 main(trunk)에 직접 푸시하거나 아주 짧은(1~2일) 수명의 브랜치만 사용한다. Feature Flag와 함께 쓴다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# Feature Flag 예시 — 미완성 기능을 main에 머지하되 숨김
if (featureFlags.newDashboard) {
  return <NewDashboard />;
}
return <OldDashboard />;

# 완성 후 플래그 제거 → 코드 정리`}</p>
                    </div>
                    <div className="bg-blue010 rounded-[8px] p-[10px]">
                        <p className="body-xs text-blue030">구글·메타 등 대형 테크 기업이 선호. 지속적 통합(CI)과 테스트 자동화가 필수 전제 조건이다.</p>
                    </div>
                </div>
            </div>

            {/* 커밋 컨벤션 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Conventional Commits</p>
                <p className="text-gray060 body-sm">커밋 메시지를 구조화해서 CHANGELOG 자동 생성, 시맨틱 버저닝 자동화 등에 활용한다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`<type>(<scope>): <description>

feat(auth): 소셜 로그인 구현
fix(cart): 수량 0 이하 주문 방지
docs(readme): 환경변수 설정 가이드 추가
refactor(api): fetch 유틸 함수 분리
test(checkout): 결제 플로우 통합 테스트 추가
chore(deps): react 18.3으로 업그레이드

# BREAKING CHANGE — 주요 버전 변경
feat!: 인증 API 응답 구조 변경
# 또는
feat(auth): 인증 방식 변경

BREAKING CHANGE: JWT 페이로드 구조가 변경됨. 클라이언트 업데이트 필요.`}</p>
                </div>
            </div>

            {/* 전략 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">전략 비교</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "Git Flow", "GitHub Flow", "Trunk-Based"],
                        ["복잡도", "높음", "낮음", "낮음"],
                        ["배포 주기", "릴리즈 단위", "기능 완성 즉시", "수 시간~1일"],
                        ["브랜치 수명", "장기", "1기능~수일", "1일 이내"],
                        ["Feature Flag", "불필요", "선택", "필수"],
                        ["적합 규모", "중대형, 라이브러리", "소~중형 웹서비스", "대형, DevOps 성숙"],
                    ].map(([a, b, c, d], i) => (
                        <div key={i} className={`grid grid-cols-4 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{c}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

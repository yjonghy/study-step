export default function ParallelRoutes() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Parallel Routes & Intercepting Routes</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <strong>Parallel Routes</strong>는 같은 URL에서 여러 페이지 슬롯을 동시에 렌더링하는 패턴이고,
                <strong> Intercepting Routes</strong>는 현재 레이아웃을 유지하면서 다른 경로의 콘텐츠를 모달처럼 오버레이하는 패턴이다.
                둘 다 복잡한 UI를 선언적으로 구성할 수 있게 한다.
            </p>

            {/* Parallel Routes */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Parallel Routes — @슬롯</p>
                <p className="text-gray060 body-sm">폴더명 앞에 <span className="font-mono text-gray080">@</span>를 붙이면 슬롯이 된다. 부모 <span className="font-mono text-gray080">layout.tsx</span>에서 props로 받아 동시에 렌더링한다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">폴더 구조</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`app/
  dashboard/
    layout.tsx          ← 두 슬롯을 동시에 렌더링
    page.tsx
    @analytics/
      page.tsx          ← 분석 패널
    @team/
      page.tsx          ← 팀원 목록`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">layout.tsx</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-3">
      <main className="col-span-2">{children}</main>
      <aside>
        {analytics}  {/* /dashboard/@analytics/page.tsx */}
        {team}       {/* /dashboard/@team/page.tsx */}
      </aside>
    </div>
  );
}`}</p>
                    </div>
                </div>
                <div className="bg-blue010 rounded-[8px] p-[10px] mt-[4px]">
                    <p className="body-xs text-blue030">각 슬롯은 독립적으로 로딩·에러를 처리할 수 있다 — 슬롯별로 <span className="font-mono">loading.tsx</span>, <span className="font-mono">error.tsx</span> 배치 가능.</p>
                </div>
            </div>

            {/* 조건부 렌더링 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Parallel Routes — 조건부 렌더링</p>
                <p className="text-gray060 body-sm">인증 상태나 역할에 따라 다른 슬롯을 보여주는 패턴에 적합하다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// app/layout.tsx
import { getSession } from '@/lib/auth';

export default async function Layout({ user, guest }: {
  user: React.ReactNode
  guest: React.ReactNode
}) {
  const session = await getSession();
  return session ? user : guest;
}

// app/@user/page.tsx  → 로그인한 사용자 대시보드
// app/@guest/page.tsx → 비로그인 랜딩 페이지`}</p>
                </div>
            </div>

            {/* Intercepting Routes */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Intercepting Routes — 모달 패턴</p>
                <p className="text-gray060 body-sm">같은 앱 내에서 이동 시 현재 레이아웃을 유지하면서 대상 경로를 가로채어 표시한다. 새로고침하거나 직접 URL로 접근하면 실제 페이지가 열린다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">폴더 컨벤션</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`(.)  → 같은 레벨 경로 가로채기
(..) → 한 단계 위 경로 가로채기
(..)(..) → 두 단계 위
(...) → 루트(app)에서 가로채기`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Instagram 스타일 사진 모달 구조</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`app/
  feed/
    page.tsx                    ← 피드 목록
    @modal/
      (.)photos/[id]/
        page.tsx                ← 모달로 보여줄 사진 (가로채기)
      default.tsx               ← 모달 없을 때 null 반환
    layout.tsx                  ← modal 슬롯 포함
  photos/
    [id]/
      page.tsx                  ← 직접 접근 시 풀페이지`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">layout.tsx — 모달 슬롯 설치</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`export default function FeedLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}  {/* 피드 위에 모달이 오버레이 */}
    </>
  );
}

// @modal/(.)photos/[id]/page.tsx
export default function PhotoModal({ params }) {
  return (
    <dialog open>
      <img src={getPhotoUrl(params.id)} />
    </dialog>
  );
}`}</p>
                    </div>
                </div>
                <div className="bg-blue010 rounded-[8px] p-[10px] mt-[4px]">
                    <p className="body-xs text-blue030">피드에서 사진 클릭 → 모달 (URL: /feed, 모달 내용: /photos/1) / 새로고침 → 풀페이지 /photos/1 — URL이 공유 가능하면서 UX도 유지</p>
                </div>
            </div>

            {/* default.tsx */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">default.tsx — 슬롯 폴백</p>
                <p className="text-gray060 body-sm">슬롯에 매칭되는 페이지가 없을 때 렌더링되는 파일. Parallel/Intercepting Routes를 쓸 때 필수적으로 배치해야 404를 방지할 수 있다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// app/feed/@modal/default.tsx
export default function DefaultModal() {
  return null; // 모달이 열리지 않은 상태 — 아무것도 렌더링하지 않음
}`}</p>
                </div>
            </div>

            {/* 언제 쓸까 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">언제 써야 할까</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["Parallel Routes", "대시보드처럼 독립된 섹션 여러 개를 한 URL에서 동시 렌더링"],
                        ["Parallel Routes", "로그인 여부에 따른 레이아웃 분기"],
                        ["Intercepting Routes", "목록에서 아이템 클릭 시 모달 (Instagram, Figma, Linear 스타일)"],
                        ["Intercepting Routes", "로그인 모달 — /login 경로지만 현재 페이지 위에 오버레이"],
                    ].map(([type, desc], i) => (
                        <div key={i} className="flex gap-[8px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <span className={`body-xs font-bold shrink-0 px-[6px] rounded-full ${type === "Parallel Routes" ? "bg-blue005 text-blue030" : "bg-purple005 text-purple040"}`}>{type}</span>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

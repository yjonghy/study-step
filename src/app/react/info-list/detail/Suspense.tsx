export default function Suspense() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Suspense & Concurrent Mode</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Suspense는 컴포넌트가 렌더링되기 전에 무언가를 &ldquo;기다리는&rdquo; 동안 폴백 UI를 선언적으로 표시하는 메커니즘이다.<br />
                React 18의 Concurrent Mode와 함께 데이터 페칭, 코드 스플리팅 등 비동기 경험을 크게 개선한다.
            </p>

            {/* 기본 사용 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 — 코드 스플리팅 (React.lazy)</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import { Suspense, lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>차트 로딩 중...</div>}>
      <HeavyChart />  {/* 번들이 로드될 때까지 fallback 표시 */}
    </Suspense>
  );
}`}</p>
                </div>
            </div>

            {/* Concurrent Mode */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Concurrent Mode (React 18+)</p>
                <p className="text-gray060 body-sm">React 18부터 기본 활성화. 렌더링을 잘게 쪼개고 우선순위에 따라 중단·재개가 가능해진다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">useTransition — 낮은 우선순위 표시</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`import { useTransition, useState } from 'react';

function SearchPage() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    // 입력(긴급) → 즉시 반영
    // 검색 결과(낮은 우선순위) → startTransition으로 래핑
    startTransition(() => setQuery(e.target.value));
  };

  return (
    <>
      <input onChange={handleChange} />
      {isPending ? <Spinner /> : <Results query={query} />}
    </>
  );
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">useDeferredValue — 값 지연</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const deferredQuery = useDeferredValue(query);
// deferredQuery는 query보다 늦게 업데이트
// 빠른 타이핑 중에도 UI가 버벅이지 않음`}</p>
                    </div>
                </div>
            </div>

            {/* Suspense + 데이터 페칭 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Suspense + 서버 컴포넌트 (Next.js App Router)</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// app/dashboard/page.tsx
import { Suspense } from 'react';
import UserInfo from './UserInfo';     // 빠른 데이터
import Analytics from './Analytics';  // 느린 데이터

export default function Page() {
  return (
    <div>
      <Suspense fallback={<UserSkeleton />}>
        <UserInfo />
      </Suspense>
      {/* Analytics가 느려도 UserInfo는 먼저 표시 */}
      <Suspense fallback={<ChartSkeleton />}>
        <Analytics />
      </Suspense>
    </div>
  );
}`}</p>
                </div>
                <p className="body-xs text-gray040 mt-[4px]">각 Suspense 경계를 독립적으로 설정하면 준비된 UI부터 순차적으로 표시 (Streaming SSR).</p>
            </div>

            {/* Error Boundary와 조합 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Error Boundary와 조합</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<LoadingUI />}>
    <AsyncComponent />
  </Suspense>
</ErrorBoundary>
// 로딩 중 → LoadingUI
// 데이터 로드 성공 → AsyncComponent
// 오류 발생 → ErrorUI`}</p>
                </div>
            </div>
        </article>
    )
}

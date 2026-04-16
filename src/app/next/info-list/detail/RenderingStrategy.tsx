export default function RenderingStrategy() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">SSR / SSG / ISR</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Next.js의 핵심 강점은 렌더링 전략을 페이지/컴포넌트 단위로 선택할 수 있다는 것이다.<br />
                같은 앱 안에서도 페이지마다 다른 전략을 혼용할 수 있다.
            </p>

            {/* 4가지 렌더링 전략 */}
            <div className="mt-[28px] flex flex-col gap-[10px]">

                {/* CSR */}
                <div className="bg-gray010 rounded-[12px] p-[16px]">
                    <div className="flex items-center gap-[8px] mb-[8px]">
                        <span className="bg-gray040 text-white body-xs px-[8px] py-[2px] rounded-[4px] font-bold">CSR</span>
                        <span className="body-sm text-gray080 font-bold">Client Side Rendering</span>
                    </div>
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`브라우저에서 JS를 실행해 렌더링. 'use client' 컴포넌트의 기본 동작.
초기 HTML은 빈 shell → JS 번들 로드 → 렌더링 → 데이터 fetch

장점: 풍부한 인터랙션, 빠른 페이지 전환
단점: 초기 로딩 느림, SEO 불리 (크롤러가 빈 HTML을 보게 됨)`}
                    </p>
                </div>

                {/* SSR */}
                <div className="bg-blue005 border border-blue020 rounded-[12px] p-[16px]">
                    <div className="flex items-center gap-[8px] mb-[8px]">
                        <span className="bg-blue030 text-white body-xs px-[8px] py-[2px] rounded-[4px] font-bold">SSR</span>
                        <span className="body-sm text-gray080 font-bold">Server Side Rendering</span>
                    </div>
                    <p className="body-xs text-gray060 whitespace-pre-line mb-[8px]">
                        {`요청마다 서버에서 HTML을 생성해 전달. 항상 최신 데이터.

장점: SEO 유리, 항상 최신 데이터
단점: 요청마다 서버 연산 → 느릴 수 있음, TTFB(첫 바이트) 증가`}
                    </p>
                    <div className="bg-white rounded-[8px] p-[10px]">
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// App Router — 서버 컴포넌트에서 fetch 사용
// cache: 'no-store' = 매 요청마다 새로 fetch (SSR)
async function Page() {
    const data = await fetch('/api/data', { cache: 'no-store' })
    return <div>{data}</div>
}

// Pages Router
export async function getServerSideProps() {
    const data = await fetchData()
    return { props: { data } }
}`}
                        </p>
                    </div>
                </div>

                {/* SSG */}
                <div className="bg-green005 border border-green020 rounded-[12px] p-[16px]">
                    <div className="flex items-center gap-[8px] mb-[8px]">
                        <span className="bg-green050 text-white body-xs px-[8px] py-[2px] rounded-[4px] font-bold">SSG</span>
                        <span className="body-sm text-gray080 font-bold">Static Site Generation</span>
                    </div>
                    <p className="body-xs text-gray060 whitespace-pre-line mb-[8px]">
                        {`빌드 타임에 HTML을 미리 생성. CDN에서 즉시 서빙.

장점: 가장 빠름, 서버 부하 없음, CDN 캐싱 최적
단점: 빌드 시점에 데이터가 고정됨. 자주 바뀌는 데이터에 부적합`}
                    </p>
                    <div className="bg-white rounded-[8px] p-[10px]">
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// App Router — force-cache (기본값)
async function Page() {
    const data = await fetch('/api/data', { cache: 'force-cache' })
    return <div>{data}</div>
}

// 동적 경로 SSG
export async function generateStaticParams() {
    return [{ id: '1' }, { id: '2' }]
}`}
                        </p>
                    </div>
                </div>

                {/* ISR */}
                <div className="bg-yellow005 border border-yellow020 rounded-[12px] p-[16px]">
                    <div className="flex items-center gap-[8px] mb-[8px]">
                        <span className="bg-yellow050 text-white body-xs px-[8px] py-[2px] rounded-[4px] font-bold">ISR</span>
                        <span className="body-sm text-gray080 font-bold">Incremental Static Regeneration</span>
                    </div>
                    <p className="body-xs text-gray060 whitespace-pre-line mb-[8px]">
                        {`SSG처럼 빌드하되 일정 시간마다 백그라운드에서 재생성. SSG + SSR의 절충안.

장점: 정적 파일의 성능 + 주기적 데이터 갱신
단점: 캐시 무효화 타이밍 제어가 제한적 (On-demand ISR로 보완)`}
                    </p>
                    <div className="bg-white rounded-[8px] p-[10px]">
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// App Router — revalidate 옵션
async function Page() {
    const data = await fetch('/api/data', {
        next: { revalidate: 60 }  // 60초마다 재검증
    })
    return <div>{data}</div>
}

// On-demand ISR — 특정 이벤트(CMS 저장 등)에 즉시 갱신
import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[id]')`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 선택 기준 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">어떤 전략을 쓸까?</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { strategy: "SSG",  when: "블로그, 마케팅 페이지, 문서 — 자주 안 바뀌는 콘텐츠" },
                        { strategy: "ISR",  when: "쇼핑몰 상품 목록, 뉴스 — 주기적 갱신이 필요한 콘텐츠" },
                        { strategy: "SSR",  when: "대시보드, 마이페이지 — 요청마다 최신 데이터가 필요한 경우" },
                        { strategy: "CSR",  when: "지도, 에디터 — 인터랙션이 풍부하고 SEO 불필요한 경우" },
                    ].map(({ strategy, when }) => (
                        <div key={strategy} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[40px]">{strategy}</span>
                            <span className="body-xs text-gray060">{when}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}

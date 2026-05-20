"use client"
import { useState, useRef, useEffect } from "react"

/* ── 이미지 Lazy Loading 데모 ── */
function LazyDemo() {
    const [mode, setMode] = useState<"eager" | "lazy">("eager")
    const [loaded, setLoaded] = useState<number[]>([])
    const [renderMs, setRenderMs] = useState<number | null>(null)

    const items = Array.from({ length: 20 }, (_, i) => i)

    const run = (m: "eager" | "lazy") => {
        setLoaded([])
        setRenderMs(null)
        setMode(m)
        const t0 = performance.now()
        if (m === "eager") {
            // 즉시 전부 로드 시뮬레이션
            setTimeout(() => {
                setLoaded(items.map(i => i))
                setRenderMs(Math.round(performance.now() - t0))
            }, 800)
        } else {
            // IntersectionObserver 방식 — 순차 로드 시뮬레이션
            items.forEach((i) => {
                setTimeout(() => {
                    setLoaded(prev => [...prev, i])
                    if (i === items.length - 1) setRenderMs(Math.round(performance.now() - t0))
                }, i * 30)
            })
        }
    }

    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[8px]">
                <button onClick={() => run("eager")}
                    className={`body-xs px-[12px] py-[6px] rounded-[6px] cursor-pointer transition-colors ${mode === "eager" ? "bg-red050 text-white" : "bg-gray010 hover:bg-gray020 text-gray060"}`}>
                    ❌ Eager Load (전체 즉시)
                </button>
                <button onClick={() => run("lazy")}
                    className={`body-xs px-[12px] py-[6px] rounded-[6px] cursor-pointer transition-colors ${mode === "lazy" ? "bg-green060 text-white" : "bg-gray010 hover:bg-gray020 text-gray060"}`}>
                    ✅ Lazy Load (뷰포트 기준)
                </button>
            </div>
            <div className="grid grid-cols-5 mobile:grid-cols-3 gap-[6px]">
                {items.map(i => (
                    <div key={i} className={`h-[48px] rounded-[6px] flex items-center justify-center body-xs transition-all duration-300
                        ${loaded.includes(i) ? "bg-blue010 text-blue030 font-bold" : "bg-gray010 text-gray040"}`}>
                        {loaded.includes(i) ? `img ${i + 1}` : "…"}
                    </div>
                ))}
            </div>
            {renderMs !== null && (
                <p className="body-xs text-gray050">
                    로드 완료까지: <strong className={mode === "lazy" ? "text-green060" : "text-red050"}>{renderMs}ms</strong>
                    {mode === "lazy" && " — 첫 화면은 훨씬 빠름"}
                </p>
            )}
            <div className="bg-gray010 rounded-[8px] p-[10px]">
                <p className="body-xs text-gray060 whitespace-pre-line">{mode === "eager"
                    ? `// Eager: 페이지 로드 시 20개 이미지 즉시 요청\n<img src="photo.jpg" />`
                    : `// Lazy: 뷰포트 진입 시만 로드 — LCP·초기 로드 개선\n<img src="photo.jpg" loading="lazy" />\n// 또는 IntersectionObserver로 직접 제어`
                }</p>
            </div>
        </div>
    )
}

/* ── 리렌더링 비교 데모 ── */
function RerenderDemo() {
    const [count, setCount] = useState(0)
    const [withMemo, setWithMemo] = useState(true)
    const naiveLog  = useRef<number[]>([])
    const memoLog   = useRef<number[]>([])
    const [naiveCount, setNaiveCount]  = useState(0)
    const [memoCount, setMemoCount]    = useState(0)

    const tick = () => {
        const n = count + 1
        setCount(n)
        // naive: 항상 리렌더
        naiveLog.current.push(n)
        setNaiveCount(naiveLog.current.length)
        // memo: props 바뀔 때만 (짝수만 리렌더 시뮬레이션)
        if (n % 2 === 0) {
            memoLog.current.push(n)
            setMemoCount(memoLog.current.length)
        }
    }

    const reset = () => {
        setCount(0)
        naiveLog.current = []
        memoLog.current  = []
        setNaiveCount(0)
        setMemoCount(0)
    }

    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[8px]">
                <button onClick={tick}
                    className="body-xs px-[12px] py-[6px] rounded-[6px] bg-blue030 text-white cursor-pointer hover:bg-blue040 transition-colors">
                    부모 상태 업데이트 ({count}회)
                </button>
                <button onClick={reset}
                    className="body-xs px-[12px] py-[6px] rounded-[6px] bg-gray010 text-gray060 cursor-pointer hover:bg-gray020 transition-colors">
                    초기화
                </button>
            </div>
            <div className="grid grid-cols-2 gap-[8px]">
                <div className="bg-red005 rounded-[8px] p-[12px]">
                    <p className="body-sm text-red050 font-bold mb-[4px]">❌ React.memo 없음</p>
                    <p className="heading-xl text-red050">{naiveCount}회</p>
                    <p className="body-xs text-gray050 mt-[2px]">리렌더링</p>
                    <p className="body-xs text-gray040 mt-[6px] whitespace-pre-line">{`// props 안 바뀌어도 항상 실행\nfunction Child({ value }) {\n  return <div>{value}</div>\n}`}</p>
                </div>
                <div className="bg-green005 rounded-[8px] p-[12px]">
                    <p className="body-sm text-green060 font-bold mb-[4px]">✅ React.memo 적용</p>
                    <p className="heading-xl text-green060">{memoCount}회</p>
                    <p className="body-xs text-gray050 mt-[2px]">리렌더링 (props 변경 시만)</p>
                    <p className="body-xs text-gray040 mt-[6px] whitespace-pre-line">{`// props 같으면 스킵\nconst Child = memo(({ value }) => {\n  return <div>{value}</div>\n})`}</p>
                </div>
            </div>
            <p className="body-xs text-gray040">시뮬레이션: memo 컴포넌트는 짝수 업데이트에서만 리렌더 (props 변경 조건)</p>
        </div>
    )
}

/* ── Bundle 크기 시각화 ── */
const BUNDLES = [
    { name: "moment.js", size: 67.9, optimized: 2.9,  tip: "→ dayjs (2.9KB)로 대체" },
    { name: "lodash (전체)", size: 72, optimized: 4,   tip: "→ lodash-es + tree shaking 또는 직접 구현" },
    { name: "axios",      size: 13.4, optimized: 2.1,  tip: "→ ky (2.1KB) 또는 fetch로 대체" },
    { name: "chart.js",  size: 60.5, optimized: 12.3,  tip: "→ recharts 또는 d3 partial import" },
]

function BundleDemo() {
    const max = Math.max(...BUNDLES.map(b => b.size))
    return (
        <div className="flex flex-col gap-[8px]">
            {BUNDLES.map(b => (
                <div key={b.name} className="flex flex-col gap-[4px]">
                    <div className="flex items-center justify-between">
                        <p className="body-xs text-gray080 font-bold">{b.name}</p>
                        <p className="body-xs text-gray040">{b.size} KB → <span className="text-green060 font-bold">{b.optimized} KB</span></p>
                    </div>
                    <div className="relative h-[10px] bg-gray010 rounded-full overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-red010 rounded-full" style={{ width: `${(b.size / max) * 100}%` }} />
                        <div className="absolute inset-y-0 left-0 bg-green050 rounded-full transition-all duration-500" style={{ width: `${(b.optimized / max) * 100}%` }} />
                    </div>
                    <p className="body-xs text-gray040">{b.tip}</p>
                </div>
            ))}
        </div>
    )
}

/* ── CWV 지표 설명 ── */
const METRICS = [
    { name: "LCP",  full: "Largest Contentful Paint", good: "≤ 2.5s",  bad: "> 4s",   color: "text-blue030",   desc: "가장 큰 콘텐츠(이미지·텍스트 블록)가 화면에 그려지는 시간. 체감 로딩 속도." },
    { name: "CLS",  full: "Cumulative Layout Shift",  good: "≤ 0.1",   bad: "> 0.25", color: "text-purple040", desc: "예기치 않은 레이아웃 이동 합계. 이미지에 width/height 지정, 폰트 fallback 최소화로 개선." },
    { name: "INP",  full: "Interaction to Next Paint", good: "≤ 200ms", bad: "> 500ms", color: "text-green060",  desc: "사용자 입력(클릭·키보드)부터 다음 화면 업데이트까지. 긴 태스크 분리, useTransition으로 개선." },
    { name: "TTFB", full: "Time to First Byte",        good: "≤ 800ms", bad: "> 1.8s", color: "text-yellow060", desc: "서버가 첫 바이트를 보내는 시간. CDN, 서버 캐싱, SSR 최적화가 핵심." },
]

/* ── 메인 페이지 ── */
const TABS = ["이미지 로딩", "리렌더링", "번들 크기", "Core Web Vitals"] as const
type Tab = typeof TABS[number]

export default function PerfComparePage() {
    const [tab, setTab] = useState<Tab>("이미지 로딩")

    return (
        <main className="flex flex-col gap-[20px] mt-[20px]">
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[28px] py-[24px] border-l-[4px] border-red050">
                <div className="flex items-center gap-[8px] mb-[8px]">
                    <span className="body-xs font-bold px-[7px] py-[2px] rounded-full bg-red005 text-red050">Demo</span>
                    <span className="body-xs text-gray040">Performance</span>
                </div>
                <p className="heading-xl text-gray080">웹 성능 최적화 비교</p>
                <p className="body-sm text-gray050 mt-[6px]">이미지 로딩 전략, 리렌더링 최적화, 번들 크기 분석, Core Web Vitals를 인터랙티브하게 비교합니다.</p>
            </div>

            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[20px]">
                {/* 탭 */}
                <div className="flex gap-[4px] bg-gray010 rounded-[8px] p-[4px] flex-wrap">
                    {TABS.map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`body-xs px-[12px] py-[6px] rounded-[6px] cursor-pointer transition-colors duration-100 whitespace-nowrap
                                ${tab === t ? "bg-white text-gray080 shadow-shadow15 font-bold" : "text-gray050 hover:text-gray080"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* 탭 콘텐츠 */}
                {tab === "이미지 로딩" && (
                    <div className="flex flex-col gap-[8px]">
                        <p className="body-sm text-gray080 font-bold">Eager vs Lazy Loading</p>
                        <p className="body-xs text-gray050">버튼을 클릭해 두 방식의 로딩 차이를 체험해보세요. Lazy는 초기 요청 수를 줄여 LCP를 개선합니다.</p>
                        <LazyDemo />
                    </div>
                )}

                {tab === "리렌더링" && (
                    <div className="flex flex-col gap-[8px]">
                        <p className="body-sm text-gray080 font-bold">React.memo 유무 리렌더링 횟수 비교</p>
                        <p className="body-xs text-gray050">부모 상태를 업데이트하면 memo 없는 자식은 항상 리렌더, memo 적용 자식은 props 변경 시만 리렌더합니다.</p>
                        <RerenderDemo />
                    </div>
                )}

                {tab === "번들 크기" && (
                    <div className="flex flex-col gap-[8px]">
                        <p className="body-sm text-gray080 font-bold">라이브러리 번들 크기 (gzip) 비교</p>
                        <p className="body-xs text-gray050">빨간 막대 = 현재 번들, 초록 막대 = 대안 적용 후. 번들 크기는 초기 JS 파싱 시간에 직접 영향을 줍니다.</p>
                        <BundleDemo />
                    </div>
                )}

                {tab === "Core Web Vitals" && (
                    <div className="flex flex-col gap-[8px]">
                        <p className="body-sm text-gray080 font-bold">Google이 정의한 핵심 사용자 경험 지표</p>
                        <p className="body-xs text-gray050">Lighthouse, PageSpeed Insights, Chrome DevTools Performance 탭에서 측정 가능.</p>
                        <div className="flex flex-col gap-[8px]">
                            {METRICS.map(m => (
                                <div key={m.name} className="bg-gray010 rounded-[8px] p-[12px]">
                                    <div className="flex items-center gap-[8px] mb-[4px]">
                                        <span className={`heading-md font-mono ${m.color}`}>{m.name}</span>
                                        <span className="body-xs text-gray040">{m.full}</span>
                                        <span className="ml-auto body-xs bg-green005 text-green060 px-[6px] py-[1px] rounded-full">Good {m.good}</span>
                                        <span className="body-xs bg-red005 text-red050 px-[6px] py-[1px] rounded-full">Poor {m.bad}</span>
                                    </div>
                                    <p className="body-xs text-gray060">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray010 rounded-[8px] p-[12px]">
                            <p className="body-sm text-gray080 font-bold mb-[4px]">측정 방법</p>
                            <p className="body-xs text-gray060 whitespace-pre-line">{`// 브라우저에서 직접 측정
import { onLCP, onCLS, onINP } from 'web-vitals';

onLCP(({ value }) => console.log('LCP:', value));
onCLS(({ value }) => console.log('CLS:', value));
onINP(({ value }) => console.log('INP:', value));

// Next.js App Router — layout.tsx에서 자동 전송
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    analytics.send({ name: metric.name, value: metric.value });
  }
}`}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* 빠른 체크리스트 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[10px]">
                <p className="heading-md text-gray080">성능 최적화 빠른 체크리스트</p>
                <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[6px]">
                    {[
                        ["이미지", "WebP/AVIF 포맷, loading='lazy', width/height 명시"],
                        ["폰트", "font-display: swap, next/font로 FOUT 최소화"],
                        ["JS", "코드 스플리팅, Tree Shaking, 무거운 라이브러리 대체"],
                        ["렌더링", "React.memo, useMemo, useCallback 적재적소"],
                        ["네트워크", "CDN, HTTP/2, 리소스 Preload/Prefetch"],
                        ["서버", "SSR/SSG 적절히 선택, ISR로 정적+동적 균형"],
                        ["캐싱", "Cache-Control 헤더, 빌드 해시로 캐시 버스팅"],
                        ["측정", "Lighthouse CI, web-vitals 패키지로 실측 모니터링"],
                    ].map(([area, tip]) => (
                        <div key={area} className="flex gap-[6px] bg-gray010 rounded-[6px] px-[10px] py-[7px]">
                            <span className="body-xs text-green060 shrink-0">✓</span>
                            <div>
                                <p className="body-xs text-gray080 font-bold">{area}</p>
                                <p className="body-xs text-gray050 mt-[1px]">{tip}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

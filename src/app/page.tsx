"use client"
import { useRouter } from "next/navigation"

const portfolioCategory = {
    title: "포트폴리오",
    href: "/portfolio",
    desc: "참여 프로젝트의 개요 · 기술 스택 · 선택 이유",
    count: 3,
    tag: "Portfolio",
    tagColor: "text-blue040",
    tagBg: "bg-blue005",
    accentColor: "border-blue040",
}

const studyCategories = [
    {
        title: "HTML / CSS",
        href: "/html-css",
        desc: "마크업 구조, 레이아웃, 선택자, 박스 모델",
        count: 6,
        tag: "Markup",
        tagColor: "text-yellow060",
        tagBg: "bg-yellow005",
        accentColor: "border-yellow040",
    },
    {
        title: "JavaScript / TypeScript",
        href: "/javascript",
        desc: "엔진 동작, 이벤트 루프, 클로저, 프로토타입, Promise, 스코프, Proxy, WeakMap, 타입 시스템",
        count: 15,
        tag: "Language",
        tagColor: "text-yellow060",
        tagBg: "bg-yellow005",
        accentColor: "border-yellow050",
    },
    {
        title: "React",
        href: "/react",
        desc: "가상 DOM, 렌더링 원리, Hooks, 메모이제이션, Error Boundary, Suspense, React 19 신기능",
        count: 9,
        tag: "Framework",
        tagColor: "text-blue030",
        tagBg: "bg-blue005",
        accentColor: "border-blue030",
    },
    {
        title: "Next.js",
        href: "/next",
        desc: "App Router, SSR / SSG / ISR, 서버 컴포넌트, Route Handler, Parallel Routes, Middleware",
        count: 8,
        tag: "Framework",
        tagColor: "text-gray080",
        tagBg: "bg-gray015",
        accentColor: "border-gray080",
    },
    {
        title: "상태관리",
        href: "/state-management",
        desc: "TanStack Query, Zustand, Recoil, Redux",
        count: 3,
        tag: "State",
        tagColor: "text-hourblue",
        tagBg: "bg-blue005",
        accentColor: "border-hourblue",
    },
    {
        title: "Computer Science",
        href: "/computer-science",
        desc: "HTTP 버전, OSI 7계층, TCP, 브라우저 저장소, HTTPS, CORS, DNS, 캐싱 & CDN",
        count: 8,
        tag: "CS",
        tagColor: "text-green060",
        tagBg: "bg-green005",
        accentColor: "border-green050",
    },
    {
        title: "성능 최적화",
        href: "/performance",
        desc: "Core Web Vitals, 렌더링 최적화, 크리티컬 렌더링 패스, SEO, 이미지 최적화",
        count: 7,
        tag: "Performance",
        tagColor: "text-red050",
        tagBg: "bg-red005",
        accentColor: "border-red050",
    },
    {
        title: "실시간 통신",
        href: "/real-time",
        desc: "WebSocket, Web Worker, SSE, MediaStream & VAD",
        count: 4,
        tag: "Real-time",
        tagColor: "text-purple040",
        tagBg: "bg-purple005",
        accentColor: "border-purple040",
    },
    {
        title: "보안",
        href: "/security",
        desc: "CORS, XSS & CSRF, CSP, 인증 전략 (Session / JWT / OAuth)",
        count: 4,
        tag: "Security",
        tagColor: "text-gray060",
        tagBg: "bg-gray015",
        accentColor: "border-gray040",
    },
    {
        title: "브라우저",
        href: "/browser",
        desc: "IntersectionObserver, requestAnimationFrame, URL → 렌더링 전체 흐름",
        count: 3,
        tag: "Browser",
        tagColor: "text-green060",
        tagBg: "bg-green005",
        accentColor: "border-green040",
    },
    {
        title: "회고록",
        href: "/story",
        desc: "Tailwind CSS, Recoil 사용 후기 및 기술 메모",
        count: 2,
        tag: "Story",
        tagColor: "text-gray050",
        tagBg: "bg-gray015",
        accentColor: "border-gray040",
    },
    {
        title: "사무실 자리 배치도",
        href: "/seat-layout",
        desc: "자리와 출입구를 드래그로 옮기고 이름을 편집하는 인터랙티브 도구",
        count: 1,
        tag: "Tool",
        tagColor: "text-blue040",
        tagBg: "bg-blue005",
        accentColor: "border-blue040",
    },
    {
        title: "가상 스크롤",
        href: "/virtual-scroll",
        desc: "10,000개 항목을 DOM 노드 수십 개로 렌더링 — Virtual Scroll 동작 원리 + 라이브 데모",
        count: 1,
        tag: "Demo",
        tagColor: "text-purple040",
        tagBg: "bg-purple005",
        accentColor: "border-purple040",
    },
    {
        title: "접근성 (a11y)",
        href: "/accessibility",
        desc: "ARIA 속성, 시맨틱 HTML, 키보드 내비게이션, 포커스 트랩 — 면접 단골 주제",
        count: 2,
        tag: "a11y",
        tagColor: "text-green060",
        tagBg: "bg-green005",
        accentColor: "border-green050",
    },
    {
        title: "Git & CI/CD",
        href: "/git-cicd",
        desc: "Git Flow / GitHub Flow / Trunk-Based, Conventional Commits, GitHub Actions",
        count: 2,
        tag: "DevOps",
        tagColor: "text-gray060",
        tagBg: "bg-gray015",
        accentColor: "border-gray050",
    },
    {
        title: "Canvas 드로잉",
        href: "/canvas-draw",
        desc: "HTML5 Canvas API — 펜·직선·사각형·원 도구, 색상·크기 선택, PNG 저장",
        count: 1,
        tag: "Demo",
        tagColor: "text-purple040",
        tagBg: "bg-purple005",
        accentColor: "border-purple040",
    },
    {
        title: "성능 최적화 비교",
        href: "/perf-compare",
        desc: "Lazy Loading, React.memo 리렌더링, 번들 크기, Core Web Vitals 인터랙티브 비교",
        count: 1,
        tag: "Demo",
        tagColor: "text-red050",
        tagBg: "bg-red005",
        accentColor: "border-red050",
    },
]

function SectionLabel({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-[10px] mb-[14px]">
            <p className="body-xs font-bold text-gray035 tracking-wider uppercase">{label}</p>
            <div className="flex-1 h-[1px] bg-gray020" />
        </div>
    )
}

export default function Home() {
    const router = useRouter()

    return (
        <main className="flex flex-col mt-[20px] gap-[32px]">

            {/* 포트폴리오 */}
            <section>
                <SectionLabel label="Portfolio" />
                <div
                    onClick={() => router.push(portfolioCategory.href)}
                    className={`cursor-pointer bg-white rounded-[14px] px-[28px] py-[24px]
                                border-l-[4px] ${portfolioCategory.accentColor}
                                shadow-shadow15
                                hover:shadow-shadow16_15 hover:-translate-y-[2px]
                                ease-out duration-[150ms] transition-all
                                flex items-center justify-between gap-[24px] mobile:flex-col mobile:items-start mobile:gap-[14px]`}
                >
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex items-center gap-[8px]">
                            <span className={`body-xs font-bold px-[8px] py-[2px] rounded-full ${portfolioCategory.tagBg} ${portfolioCategory.tagColor}`}>
                                {portfolioCategory.tag}
                            </span>
                            <span className="body-xs text-gray040">{portfolioCategory.count}개 프로젝트</span>
                        </div>
                        <p className="heading-lg text-gray080">{portfolioCategory.title}</p>
                        <p className="body-sm text-gray050 leading-relaxed">{portfolioCategory.desc}</p>
                    </div>
                    <span className="body-sm text-gray030 flex-shrink-0">›</span>
                </div>
            </section>

            {/* 스터디내용 */}
            <section>
                <SectionLabel label="Study" />
                <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[12px]">
                    {studyCategories.map((cat) => (
                        <div
                            key={cat.href}
                            onClick={() => router.push(cat.href)}
                            className={`cursor-pointer bg-white rounded-[14px] px-[24px] py-[20px]
                                        border-l-[4px] ${cat.accentColor}
                                        shadow-shadow15
                                        hover:shadow-shadow16_15 hover:-translate-y-[2px]
                                        ease-out duration-[150ms] transition-all
                                        flex flex-col gap-[10px]`}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`body-xs font-bold px-[7px] py-[2px] rounded-full ${cat.tagBg} ${cat.tagColor}`}>
                                    {cat.tag}
                                </span>
                                <span className="body-xs text-gray035">{cat.count}개 항목</span>
                            </div>
                            <p className="heading-md text-gray080">{cat.title}</p>
                            <p className="body-sm text-gray050 leading-relaxed">{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    )
}

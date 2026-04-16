"use client"
import { useRouter } from "next/navigation"

const categories = [
    {
        title: "HTML / CSS",
        href: "/html-css",
        desc: "마크업 구조, 레이아웃, 선택자, 박스 모델",
        count: 6,
        tag: "Markup",
        borderColor: "border-yellow040",
        tagColor: "text-yellow060",
        dotColor: "bg-yellow040",
    },
    {
        title: "JavaScript / TypeScript",
        href: "/javascript",
        desc: "엔진 동작, 이벤트 루프, this, 배열 메서드, 제너레이터, 타입 시스템",
        count: 9,
        tag: "Language",
        borderColor: "border-yellow050",
        tagColor: "text-yellow060",
        dotColor: "bg-yellow050",
    },
    {
        title: "React",
        href: "/react",
        desc: "가상 DOM, 렌더링 원리, Hooks, 메모이제이션, Context API",
        count: 5,
        tag: "Framework",
        borderColor: "border-blue030",
        tagColor: "text-blue030",
        dotColor: "bg-blue030",
    },
    {
        title: "Next.js",
        href: "/next",
        desc: "App Router, SSR / SSG / ISR, 서버 컴포넌트, 메타데이터",
        count: 5,
        tag: "Framework",
        borderColor: "border-gray080",
        tagColor: "text-gray080",
        dotColor: "bg-gray080",
    },
    {
        title: "상태관리",
        href: "/state-management",
        desc: "TanStack Query, Zustand, Recoil, Redux",
        count: 3,
        tag: "State",
        borderColor: "border-hourblue",
        tagColor: "text-hourblue",
        dotColor: "bg-hourblue",
    },
    {
        title: "Computer Science",
        href: "/computer-science",
        desc: "HTTP 버전, OSI 7계층, TCP, 브라우저 저장소, HTTPS, CORS",
        count: 6,
        tag: "CS",
        borderColor: "border-green050",
        tagColor: "text-green050",
        dotColor: "bg-green050",
    },
    {
        title: "성능 최적화",
        href: "/performance",
        desc: "Core Web Vitals, 렌더링 최적화, SEO, 이미지 최적화",
        count: 5,
        tag: "Performance",
        borderColor: "border-red050",
        tagColor: "text-red050",
        dotColor: "bg-red050",
    },
    {
        title: "회고록",
        href: "/story",
        desc: "Tailwind CSS, Recoil 사용 후기 및 기술 메모",
        count: 2,
        tag: "Story",
        borderColor: "border-gray040",
        tagColor: "text-gray050",
        dotColor: "bg-gray040",
    },
]

export default function Home() {
    const router = useRouter()

    return (
        <main className="flex flex-col mt-[20px]">
            <div className="flex flex-col gap-[4px]">
                <p className="heading-xl text-gray080">학습 노트</p>
                <p className="body-sm text-gray040">프론트엔드 개발자로서 공부하고 정리한 내용들</p>
            </div>

            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[12px] mt-[24px]">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(cat.href)}
                        className={`cursor-pointer bg-white rounded-[12px] px-[24px] py-[20px]
                                    border-l-[4px] ${cat.borderColor}
                                    hover:shadow-shadow15 ease-out duration-[150ms]
                                    flex flex-col gap-[8px]`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`body-xs font-bold ${cat.tagColor}`}>{cat.tag}</span>
                            {cat.count > 0 ? (
                                <span className="body-xs text-gray040">{cat.count}개 항목</span>
                            ) : (
                                <span className="body-xs text-gray030">준비 중</span>
                            )}
                        </div>
                        <p className="heading-md text-gray080">{cat.title}</p>
                        <p className="body-sm text-gray060 leading-relaxed">{cat.desc}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}

import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "유종현 — Frontend Engineer",
    description: "실시간 AI 면접, 비동기 Agent, 글로벌 플랫폼과 레거시 전환을 설계해 온 프론트엔드 엔지니어 유종현의 포트폴리오",
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return children
}

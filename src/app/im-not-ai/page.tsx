import { notFound } from "next/navigation"
import ImNotAiLab from "./ImNotAiLab"

export const metadata = {
    title: "AI 티 제거기 — Local Lab",
    description: "한국어 AI 문체의 대표 패턴을 로컬에서 진단하고 보수적으로 다듬는 실험실",
}

export default function ImNotAiPage() {
    if (process.env.NODE_ENV === "production") notFound()
    return <ImNotAiLab />
}

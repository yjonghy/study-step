"use client"
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const studyItems = [
    { label: "HTML / CSS",          path: "/html-css",          tag: "Markup" },
    { label: "JavaScript / TS",     path: "/javascript",        tag: "Language" },
    { label: "React",               path: "/react",             tag: "Framework" },
    { label: "Next.js",             path: "/next",              tag: "Framework" },
    { label: "상태관리",             path: "/state-management",  tag: "State" },
    { label: "Computer Science",    path: "/computer-science",  tag: "CS" },
    { label: "성능 최적화",          path: "/performance",       tag: "Performance" },
    { label: "회고록",               path: "/story",             tag: "Story" },
]

const LENS_SIZE = 160
const ZOOM = 3
const IMG_DISPLAY_SIZE = 320

type MagnifierState = {
    show: boolean
    clientX: number
    clientY: number
    imgX: number
    imgY: number
}

export default function NavigationHeader() {
    const pathName = usePathname()
    const router = useRouter()
    const [imgOpen, setImgOpen] = useState(false)
    const [studyOpen, setStudyOpen] = useState(true)
    const [magnifier, setMagnifier] = useState<MagnifierState>({
        show: false, clientX: 0, clientY: 0, imgX: 0, imgY: 0,
    })

    const isActive = (path: string) => pathName.startsWith(path)
    const isStudyActive = studyItems.some(({ path }) => pathName.startsWith(path))

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMagnifier({
            show: true,
            clientX: e.clientX,
            clientY: e.clientY,
            imgX: e.clientX - rect.left,
            imgY: e.clientY - rect.top,
        })
    }

    const bgX = -(magnifier.imgX * ZOOM - LENS_SIZE / 2)
    const bgY = -(magnifier.imgY * ZOOM - LENS_SIZE / 2)

    return (
        <>
            {/* Image lightbox */}
            {imgOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray090/60"
                    onClick={() => { setImgOpen(false); setMagnifier((s) => ({ ...s, show: false })) }}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src="/IMG_4286.png"
                            className="max-w-[320px] max-h-[320px] w-[80vw] h-[80vw] rounded-full object-cover shadow-shadow16_15 cursor-crosshair"
                            alt="profile"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setMagnifier((s) => ({ ...s, show: false }))}
                        />
                        {magnifier.show && (
                            <div
                                style={{
                                    position: "fixed",
                                    left: magnifier.clientX + 20,
                                    top: magnifier.clientY - LENS_SIZE / 2,
                                    width: LENS_SIZE,
                                    height: LENS_SIZE,
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                                    backgroundImage: "url(/IMG_4286.png)",
                                    backgroundSize: `${IMG_DISPLAY_SIZE * ZOOM}px ${IMG_DISPLAY_SIZE * ZOOM}px`,
                                    backgroundPosition: `${bgX}px ${bgY}px`,
                                    backgroundRepeat: "no-repeat",
                                    pointerEvents: "none",
                                    zIndex: 100,
                                }}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Mobile header */}
            <header className="hidden mobile:block bg-white/70 rounded-[8px] sticky top-[20px] shadow-shadow15 px-[16px] py-[12px]">
                <div className="flex items-center gap-[8px]">
                    <p className="heading-sm text-gray080">유종현</p>
                    <p className="body-xs text-gray040">웹 프론트엔드 엔지니어 · 경력 6년</p>
                </div>
            </header>

            {/* Desktop sidebar */}
            <header className="mobile:hidden block py-[32px] rounded-[12px] px-[24px] bg-white/70 min-w-[260px] max-w-[260px] h-fit sticky top-[48px] shadow-shadow15">
                {/* Profile */}
                <div className="flex items-center gap-[12px]">
                    <img
                        src="/IMG_4286.png"
                        className="w-[44px] h-[44px] min-w-[44px] rounded-full object-cover cursor-zoom-in hover:opacity-80 transition-opacity duration-150"
                        alt="profile"
                        onClick={() => setImgOpen(true)}
                    />
                    <div>
                        <p className="heading-md text-gray080">유종현</p>
                        <p className="body-xs text-gray050 mt-[2px]">웹 프론트엔드 엔지니어</p>
                        <p className="body-xs text-gray040">경력 6년</p>
                    </div>
                </div>

                {/* Contact */}
                <div className="mt-[12px] flex flex-col gap-[3px]">
                    <p className="body-xs text-gray040">whdgus9269@gmail.com</p>
                    <a
                        className="body-xs text-blue030 underline w-fit"
                        href="https://github.com/yjonghy/study-step"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </div>

                <div className="my-[18px] h-[1px] bg-gray020 w-full" />

                {/* Category nav */}
                <p className="body-xs text-gray035 font-bold mb-[8px] tracking-wider uppercase">카테고리</p>
                <div className="flex flex-col gap-[2px]">

                    {/* 포트폴리오 */}
                    <button
                        onClick={() => router.push("/portfolio")}
                        className={`w-full flex items-center justify-between px-[10px] py-[7px] rounded-[8px]
                                    text-left ease-out duration-[100ms] cursor-pointer
                                    ${isActive("/portfolio") ? "bg-gray090" : "hover:bg-gray015"}`}
                    >
                        <span className={`body-sm ${isActive("/portfolio") ? "text-white font-bold" : "text-gray060"}`}>
                            포트폴리오
                        </span>
                        <span className={`body-xs ${isActive("/portfolio") ? "text-gray030" : "text-gray035"}`}>
                            Portfolio
                        </span>
                    </button>

                    {/* 스터디내용 토글 */}
                    <button
                        onClick={() => setStudyOpen((v) => !v)}
                        className={`w-full flex items-center justify-between px-[10px] py-[7px] rounded-[8px]
                                    text-left ease-out duration-[100ms] cursor-pointer
                                    ${isStudyActive && !studyOpen ? "bg-gray090" : "hover:bg-gray015"}`}
                    >
                        <span className={`body-sm ${isStudyActive && !studyOpen ? "text-white font-bold" : "text-gray060"}`}>
                            스터디내용
                        </span>
                        <span className={`body-xs text-gray035 transition-transform duration-150 ${studyOpen ? "rotate-180" : ""}`}>
                            ▾
                        </span>
                    </button>

                    {/* 스터디 서브 메뉴 */}
                    {studyOpen && (
                        <div className="flex flex-col gap-[2px] mt-[2px] pl-[6px]">
                            <div className="border-l-[2px] border-gray020 pl-[8px] flex flex-col gap-[2px]">
                                {studyItems.map(({ label, path, tag }) => (
                                    <button
                                        key={path}
                                        onClick={() => router.push(path)}
                                        className={`w-full flex items-center justify-between px-[10px] py-[7px] rounded-[8px]
                                                    text-left ease-out duration-[100ms] cursor-pointer
                                                    ${isActive(path) ? "bg-blue040" : "hover:bg-gray015"}`}
                                    >
                                        <span className={`body-sm ${isActive(path) ? "text-white font-bold" : "text-gray060"}`}>
                                            {label}
                                        </span>
                                        <span className={`body-xs ${isActive(path) ? "text-blue010" : "text-gray035"}`}>
                                            {tag}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}

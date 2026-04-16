import React from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
    { label: "HTML / CSS",          path: "/html-css",          tag: "Markup" },
    { label: "JavaScript / TS",     path: "/javascript",        tag: "Language" },
    { label: "React",               path: "/react",             tag: "Framework" },
    { label: "Next.js",             path: "/next",              tag: "Framework" },
    { label: "상태관리",             path: "/state-management",  tag: "State" },
    { label: "Computer Science",    path: "/computer-science",  tag: "CS" },
    { label: "성능 최적화",          path: "/performance",       tag: "Performance" },
    { label: "회고록",               path: "/story",             tag: "Story" },
]

export default function NavigationHeader() {
    const pathName = usePathname()
    const router = useRouter()

    const isActive = (path: string) => pathName.startsWith(path)

    return (
        <>
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
                        src="/profile_v2.jpeg"
                        className="w-[44px] h-[44px] min-w-[44px] rounded-full object-cover"
                        alt="profile"
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
                    {navItems.map(({ label, path, tag }) => (
                        <button
                            key={path}
                            onClick={() => router.push(path)}
                            className={`w-full flex items-center justify-between px-[10px] py-[7px] rounded-[8px]
                                        text-left ease-out duration-[100ms] cursor-pointer
                                        ${isActive(path) ? "bg-gray090" : "hover:bg-gray015"}`}
                        >
                            <span className={`body-sm ${isActive(path) ? "text-white font-bold" : "text-gray060"}`}>
                                {label}
                            </span>
                            <span className={`body-xs ${isActive(path) ? "text-gray030" : "text-gray035"}`}>
                                {tag}
                            </span>
                        </button>
                    ))}
                </div>
            </header>
        </>
    )
}

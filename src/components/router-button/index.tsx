import React from "react";
import { useRouter, usePathname } from 'next/navigation';
import Button from "@src/components/common/button";
import {
    GhostPrimaryButton,
    PrimaryButton,
    SmallBtnStyle
} from "@src/types/ButtonType";

const navItems = [
    { label: "HTML/CSS",          path: "/html-css" },
    { label: "JS/TS",             path: "/javascript" },
    { label: "React",             path: "/react" },
    { label: "Next.js",           path: "/next" },
    { label: "상태관리",           path: "/state-management" },
    { label: "Computer Science",  path: "/computer-science" },
    { label: "성능 최적화",        path: "/performance" },
    { label: "회고록",             path: "/story" },
]

export default function RouterButton() {
    const router = useRouter()
    const pathName = usePathname()

    const isActive = (path: string) => pathName.startsWith(path)

    return (
        <nav className="flex gap-[6px] bg-white/70 w-full px-[12px] py-[8px] rounded-[8px] flex-wrap mb-[8px]">
            {navItems.map(({ label, path }) => (
                <Button
                    key={path}
                    onClick={() => router.push(path)}
                    btnStyle={`${isActive(path) ? PrimaryButton : GhostPrimaryButton} ${SmallBtnStyle} px-[14px]`}
                    text={{ value: label, style: `heading-sm ${isActive(path) ? "text-white" : "text-gray080"}` }}
                />
            ))}
        </nav>
    )
}

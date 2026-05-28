"use client"
import { useState } from "react"

type Sprite = { src: string; label: string }

export default function SpriteGallery({ main, sprites }: { main: string; sprites: Sprite[] }) {
    const [lightbox, setLightbox] = useState<Sprite | null>(null)

    return (
        <>
            <div className="flex flex-col items-center gap-[12px]">
                <div
                    className="bg-gray010 rounded-[12px] p-[16px] border border-gray020 cursor-zoom-in hover:border-blue030 ease-out duration-[100ms]"
                    onClick={() => setLightbox({ src: main, label: "기본" })}
                >
                    <img src={main} alt="기본" className="w-[100px] h-[100px]" />
                </div>
                {sprites.length > 0 && (
                    <div className="flex gap-[8px]">
                        {sprites.map((s) => (
                            <div
                                key={s.label}
                                className="flex flex-col items-center gap-[2px] cursor-zoom-in"
                                onClick={() => setLightbox(s)}
                            >
                                <div className="rounded-[8px] p-[4px] hover:bg-blue005 border border-transparent hover:border-blue020 ease-out duration-[100ms]">
                                    <img src={s.src} alt={s.label} className="w-[44px] h-[44px]" />
                                </div>
                                <p className="body-xs text-gray040">{s.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray090/70"
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="bg-white rounded-[16px] p-[32px] flex flex-col items-center gap-[12px] shadow-shadow16_15"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={lightbox.src} alt={lightbox.label} className="w-[200px] h-[200px] object-contain" style={{ imageRendering: "pixelated" }} />
                        <p className="body-sm text-gray060">{lightbox.label}</p>
                        <button
                            onClick={() => setLightbox(null)}
                            className="body-xs text-gray040 hover:text-gray080 ease-out duration-[100ms]"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

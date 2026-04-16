export default function NextImageFont() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">next/image & next/font</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Next.js가 제공하는 빌트인 최적화 컴포넌트. 별도 설정 없이 성능 개선 효과를 얻을 수 있다.
            </p>

            {/* next/image */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">next/image — 이미지 최적화</p>
                <p className="text-gray060 body-sm">
                    일반 <code>{`<img>`}</code> 태그 대비 자동으로 여러 최적화를 적용한다.
                </p>

                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "포맷 변환",      desc: "WebP, AVIF 등 브라우저가 지원하는 최적 포맷으로 자동 변환" },
                        { label: "크기 최적화",    desc: "디바이스 해상도에 맞는 크기로 리사이징 (srcset 자동 생성)" },
                        { label: "lazy loading",   desc: "뷰포트에 진입할 때 로드. 기본값으로 적용됨" },
                        { label: "CLS 방지",       desc: "width/height로 placeholder 공간 확보 → 레이아웃 시프트 방지" },
                        { label: "priority",       desc: "LCP 대상 이미지에 priority 설정 → preload 적용" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[100px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import Image from 'next/image'

// 로컬 이미지 — width/height 자동 추론
import profileImg from '/public/profile.jpg'
<Image src={profileImg} alt="프로필" />

// 외부 이미지 — width, height 필수
<Image
    src="https://example.com/photo.jpg"
    alt="사진"
    width={800}
    height={600}
    priority           // LCP 이미지에 적용
/>

// fill 모드 — 부모 요소를 가득 채움 (position: relative 필요)
<div style={{ position: 'relative', height: '300px' }}>
    <Image src={src} alt="..." fill style={{ objectFit: 'cover' }} />
</div>

// next.config.js — 외부 도메인 허용 필요
images: {
    remotePatterns: [{ hostname: 'example.com' }]
}`}
                    </p>
                </div>
            </div>

            {/* next/font */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">next/font — 폰트 최적화</p>
                <p className="text-gray060 body-sm">
                    폰트를 빌드 타임에 다운로드해 self-hosting 한다. 외부 폰트 서버에 대한 요청이 없어 성능과 개인정보 보호에 유리하다.
                </p>

                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "자동 self-hosting", desc: "Google Fonts를 빌드 시 다운로드 → 별도 네트워크 요청 없음" },
                        { label: "CLS 없음",          desc: "CSS size-adjust로 폰트 교체 시 레이아웃 시프트 방지" },
                        { label: "subset",            desc: "사용하는 문자셋만 로드해 파일 크기 최소화" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[130px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import { Inter, Noto_Sans_KR } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const notoSansKR = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['400', '700'],
})

// layout.tsx — className으로 적용
export default function RootLayout({ children }) {
    return (
        <html className={inter.variable}>
            <body className={notoSansKR.className}>
                {children}
            </body>
        </html>
    )
}

// 로컬 폰트
import localFont from 'next/font/local'
const myFont = localFont({ src: './fonts/MyFont.woff2' })`}
                    </p>
                </div>
            </div>

            {/* Core Web Vitals 연결 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Core Web Vitals 연결</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { metric: "LCP",  tool: "next/image priority",    desc: "히어로 이미지 preload → LCP 개선" },
                        { metric: "CLS",  tool: "next/image width/height", desc: "레이아웃 시프트 방지 → CLS 개선" },
                        { metric: "CLS",  tool: "next/font",               desc: "폰트 교체 시 레이아웃 시프트 없음" },
                        { metric: "FCP",  tool: "SSR / SSG",               desc: "서버에서 완성된 HTML → 빠른 첫 렌더링" },
                    ].map(({ metric, tool, desc }) => (
                        <div key={`${metric}-${tool}`} className="flex items-center gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-green060 font-bold min-w-[40px]">{metric}</span>
                            <code className="body-xs text-hourblue min-w-[160px]">{tool}</code>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}

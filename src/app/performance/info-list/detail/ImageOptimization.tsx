export default function ImageOptimization() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">이미지 최적화</p>
            <p className="text-gray060 body-sm mt-[16px]">
                이미지는 대부분의 웹페이지에서 가장 큰 리소스다. LCP와 직결되며, 최적화 효과가 가장 크다.
            </p>

            {/* 포맷 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">포맷 선택 — WebP / AVIF</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { format: "JPEG",    size: "기준",    use: "사진, 복잡한 이미지",            support: "모든 브라우저" },
                        { format: "WebP",    size: "~30% 감소", use: "JPEG 대체. 손실/무손실 모두 지원", support: "IE 제외 모두" },
                        { format: "AVIF",    size: "~50% 감소", use: "최신 포맷. 화질 대비 최소 용량", support: "Chrome, Firefox, Safari 16+" },
                        { format: "SVG",     size: "벡터",    use: "아이콘, 로고. 확대해도 선명",     support: "모두" },
                        { format: "WebP/AVIF + 폴백", size: "",   use: "<picture> 태그로 지원 여부에 따라 분기",  support: "" },
                    ].map(({ format, size, use, support }) => (
                        <div key={format} className="flex items-start gap-[8px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[100px]">{format}</span>
                            <span className="body-xs text-green060 min-w-[80px]">{size}</span>
                            <span className="body-xs text-gray060 flex-1">{use}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-[4px] bg-gray010 rounded-[8px] p-[10px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`<!-- picture 태그로 포맷 폴백 -->
<picture>
    <source srcset="image.avif" type="image/avif" />
    <source srcset="image.webp" type="image/webp" />
    <img src="image.jpg" alt="..." width="800" height="600" />
</picture>`}
                    </p>
                </div>
            </div>

            {/* 반응형 이미지 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">반응형 이미지 — srcset & sizes</p>
                <p className="text-gray060 body-sm">디바이스 해상도와 뷰포트에 맞는 크기의 이미지를 로드한다.</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`<!-- srcset: 여러 해상도 이미지 제공 -->
<img
    src="image-800.jpg"
    srcset="
        image-400.jpg 400w,
        image-800.jpg 800w,
        image-1200.jpg 1200w
    "
    sizes="
        (max-width: 600px) 100vw,
        (max-width: 1200px) 50vw,
        800px
    "
    alt="..."
/>
<!-- sizes: 뷰포트별 이미지가 차지할 너비 힌트 →
     브라우저가 가장 적합한 srcset 항목을 선택 -->`}
                    </p>
                </div>
            </div>

            {/* Lazy loading */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Lazy Loading & Preload</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">loading="lazy" — 뷰포트 진입 시 로드</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`<!-- 뷰포트 아래 이미지는 나중에 로드 -->
<img src="below-fold.jpg" loading="lazy" alt="..." />

// Next.js Image는 기본적으로 lazy loading 적용
<Image src="..." alt="..." width={800} height={600} />`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">fetchpriority="high" — LCP 이미지 우선 로드</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`<!-- 히어로 이미지는 빠르게 로드해야 LCP 개선 -->
<img src="hero.jpg" fetchpriority="high" alt="..." />

// Next.js
<Image src="hero.jpg" alt="..." priority />  // preload + fetchpriority`}
                        </p>
                    </div>
                    <div className="bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[2px]">주의 — LCP 이미지에 lazy 금지</p>
                        <p className="body-xs text-gray060">
                            첫 화면에 보이는 이미지(히어로, 배너)에 loading="lazy"를 쓰면 LCP가 크게 나빠진다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 이미지 사전 요청 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">사전 요청 (Preload) 전략</p>
                <p className="text-gray060 body-sm">
                    이미지 로딩 지연 구간을 예측해 사전에 fetch하면 사용자가 체감하는 로딩 시간이 줄어든다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// 케러셀 — 다음 슬라이드 이미지 미리 로드
useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length
    const img = new Image()
    img.src = images[nextIndex].url  // 백그라운드에서 미리 fetch
}, [currentIndex])

// 호버 시 상세 이미지 사전 로드
const prefetchImage = (url: string) => {
    const img = new Image()
    img.src = url
}
<Card onMouseEnter={() => prefetchImage(detail.imageUrl)} />`}
                    </p>
                </div>
            </div>

            {/* CDN */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CDN & 캐싱</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "CDN 사용",          desc: "사용자와 물리적으로 가까운 엣지 서버에서 서빙 → TTFB, LCP 개선" },
                        { label: "Cache-Control",     desc: "이미지는 긴 캐시 TTL 설정. content hash로 버전 관리 (image.abc123.jpg)" },
                        { label: "이미지 CDN",         desc: "Cloudinary, Imgix 등 — URL 파라미터로 리사이징/포맷 변환" },
                        { label: "next/image",        desc: "자동으로 최적화 + CDN 캐싱 (_next/image 경로로 서빙)" },
                    ].map(({ label, desc }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[120px]">{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}

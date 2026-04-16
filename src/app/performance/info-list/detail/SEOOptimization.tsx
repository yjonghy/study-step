export default function SEOOptimization() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">SEO 최적화</p>
            <p className="text-gray060 body-sm mt-[16px]">
                검색 엔진 최적화(SEO)는 기술적 구조, 콘텐츠 품질, 성능 지표가 모두 연결된다.<br />
                프론트엔드 엔지니어 관점에서 직접 제어할 수 있는 기술 SEO를 중심으로 정리한다.
            </p>

            {/* 렌더링 전략 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">렌더링 전략 — 크롤러가 보는 HTML</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { type: "SSR / SSG", desc: "서버에서 완성된 HTML 제공 → 크롤러가 JS 실행 없이 콘텐츠 즉시 인식. SEO에 가장 유리.", ok: true },
                        { type: "CSR (SPA)", desc: "초기 HTML이 거의 비어있음 → 크롤러가 JS를 실행해야 콘텐츠 보임. 구글은 처리하지만 지연 발생.", ok: false },
                        { type: "Dynamic Rendering", desc: "크롤러에게는 SSR, 사용자에게는 CSR 제공. 복잡하고 캐시 전략 필요.", ok: null },
                    ].map((item) => (
                        <div key={item.type} className={`rounded-[8px] p-[10px] border ${item.ok === true ? 'bg-green005 border-green020' : item.ok === false ? 'bg-red005 border-red020' : 'bg-yellow005 border-yellow020'}`}>
                            <p className={`body-xs font-bold ${item.ok === true ? 'text-green060' : item.ok === false ? 'text-red050' : 'text-yellow060'}`}>{item.type}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 메타데이터 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">메타데이터 — title / description / OG</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// Next.js App Router — metadata export
export const metadata = {
  title: '상품 상세 | 브랜드명',   // 55자 이하 권장
  description: '상품 설명...',    // 155자 이하 권장
  openGraph: {
    title: '공유 시 표시 제목',
    description: '공유 시 표시 설명',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};`}</p>
                </div>
            </div>

            {/* Canonical / Sitemap / robots */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기술 SEO 필수 요소</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Canonical URL — 중복 콘텐츠 방지</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<!-- 쿼리 파라미터가 다른 같은 페이지에서 정규 URL 명시 -->
<link rel="canonical" href="https://example.com/product/123" />
// Next.js: metadata.alternates.canonical`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Sitemap — 크롤링 우선순위 안내</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// app/sitemap.ts (Next.js)
export default function sitemap() {
  return [
    { url: 'https://example.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://example.com/products', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">구조화 데이터 (JSON-LD) — 리치 스니펫</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "상품명",
  "image": "https://example.com/photo.jpg",
  "description": "상품 설명",
  "offers": {
    "@type": "Offer",
    "price": "29000",
    "priceCurrency": "KRW"
  }
}
</script>`}</p>
                    </div>
                </div>
            </div>

            {/* Core Web Vitals와 SEO */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Core Web Vitals → 구글 랭킹 신호</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        "LCP (Largest Contentful Paint) ≤ 2.5s — 히어로 이미지에 fetchpriority='high' 적용",
                        "FID / INP (Interaction to Next Paint) ≤ 200ms — 긴 JS 태스크 분리, Web Worker 활용",
                        "CLS (Cumulative Layout Shift) ≤ 0.1 — 이미지에 width/height 명시, 폰트 font-display: swap",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[8px]">
                            <div className="w-[4px] h-[4px] rounded-full bg-blue030 flex-shrink-0 mt-[7px]" />
                            <p className="body-xs text-gray060">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

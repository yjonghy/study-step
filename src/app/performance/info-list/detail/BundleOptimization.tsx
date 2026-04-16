export default function BundleOptimization() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">번들 최적화</p>
            <p className="text-gray060 body-sm mt-[16px]">
                JS 번들 크기를 줄이면 파싱·실행 시간이 단축되어 FCP, LCP, INP가 모두 개선된다.<br />
                특히 모바일 환경에서 CPU 성능이 낮을수록 JS 파싱 비용이 크다.
            </p>

            {/* Tree Shaking */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Tree Shaking — 사용하지 않는 코드 제거</p>
                <p className="text-gray060 body-sm">
                    ES Module(import/export)의 정적 분석을 통해 번들러가 사용되지 않는 코드를 제거한다.
                </p>
                <div className="mt-[6px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">Tree Shaking 안 됨</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 라이브러리 전체를 import
import _ from 'lodash'
import * as icons from '@heroicons/react'

// CommonJS (require) 방식
const { debounce } = require('lodash')`}
                        </p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">Tree Shaking 됨</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// Named export로 필요한 것만
import { debounce } from 'lodash-es'
import { HomeIcon } from '@heroicons/react/24/outline'

// 라이브러리가 ESM + sideEffects: false
// 설정이어야 tree shaking 가능`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 동적 import */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">동적 import — 필요할 때만 로드</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// 버튼 클릭 시 무거운 라이브러리 로드
async function handleExport() {
    // 초기 번들에 포함 안 됨 → 클릭 시 다운로드
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    doc.save('export.pdf')
}

// 조건부 라이브러리 — 특정 환경에서만 필요
if (process.env.NODE_ENV === 'development') {
    const { whyDidYouRender } = await import('@welldone-software/why-did-you-render')
    whyDidYouRender(React)
}`}
                    </p>
                </div>
            </div>

            {/* 번들 분석 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">번들 분석 — 어디서 크기가 나오는지 파악</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">@next/bundle-analyzer</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})

// 실행
ANALYZE=true npm run build
// → 번들 구성 시각화 페이지 자동 오픈`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">번들 분석에서 찾아야 할 것</p>
                        <div className="flex flex-col gap-[3px] mt-[4px]">
                            {[
                                "중복 패키지 — 같은 라이브러리가 여러 버전으로 포함되는 경우",
                                "큰 라이브러리 — moment.js → date-fns/dayjs로 교체 검토",
                                "전체 import — lodash 전체가 포함된 경우 lodash-es + named import로 변경",
                                "사용 안 하는 locale — date 라이브러리 locale이 전부 포함된 경우",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-[6px]">
                                    <span className="text-blue030 body-xs mt-[1px]">•</span>
                                    <span className="body-xs text-gray060">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 청크 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">청크 전략 — 캐시 효율 극대화</p>
                <p className="text-gray060 body-sm">
                    자주 바뀌는 코드와 거의 안 바뀌는 코드를 분리하면 캐시 히트율이 올라간다.
                </p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { chunk: "vendor chunk",     desc: "node_modules — 거의 안 바뀜 → 캐시 TTL 길게 설정", change: "배포마다 변경 안 됨" },
                        { chunk: "common chunk",     desc: "여러 페이지에서 공통으로 사용하는 코드",              change: "가끔 변경" },
                        { chunk: "page chunk",       desc: "각 페이지별 고유 코드 (Next.js 자동 처리)",           change: "자주 변경" },
                        { chunk: "runtime chunk",    desc: "webpack 런타임 — 매우 작음. inline으로 처리 가능",    change: "매번 변경 가능" },
                    ].map(({ chunk, desc, change }) => (
                        <div key={chunk} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[120px]">{chunk}</span>
                            <span className="body-xs text-gray060 flex-1">{desc}</span>
                            <span className="body-xs text-gray040">{change}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 기타 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기타 최적화</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "Minification",    desc: "공백/주석 제거, 변수명 축소. Next.js/Vite 기본 적용" },
                        { label: "Compression",     desc: "gzip / Brotli 압축. 서버 설정 또는 CDN. Brotli가 gzip 대비 ~20% 더 작음" },
                        { label: "Preconnect",      desc: "<link rel='preconnect'> 로 외부 도메인 DNS + TCP 연결 미리 수립" },
                        { label: "Module/Nomodule", desc: "모던 브라우저에겐 ES module 번들, 구형에겐 폴리필 포함 번들 분기 서빙" },
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

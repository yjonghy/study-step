export default function AppRouter() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">App Router vs Pages Router</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Next.js 13부터 App Router가 도입됐다. 기존 Pages Router와 공존하며 점진적 마이그레이션이 가능하다.
            </p>

            {/* 구조 비교 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">파일 구조 비교</p>
                <div className="flex gap-[8px] mt-[6px]">
                    <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">Pages Router (기존)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`pages/
├── index.tsx         → /
├── about.tsx         → /about
├── blog/
│   └── [id].tsx      → /blog/:id
└── _app.tsx          → 공통 레이아웃
    _document.tsx     → HTML 문서 구조`}
                        </p>
                    </div>
                    <div className="flex-1 bg-blue005 border border-blue020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-blue040 font-bold mb-[6px]">App Router (Next 13+)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`app/
├── page.tsx          → /
├── layout.tsx        → 공통 레이아웃
├── about/
│   └── page.tsx      → /about
└── blog/
    └── [id]/
        ├── page.tsx  → /blog/:id
        └── loading.tsx`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 특수 파일 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">App Router 특수 파일</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { file: "layout.tsx",       desc: "중첩 레이아웃. 리렌더링 없이 유지됨. 상태 보존 가능" },
                        { file: "page.tsx",         desc: "라우트의 실제 UI. 이 파일이 있어야 URL로 접근 가능" },
                        { file: "loading.tsx",      desc: "페이지 로딩 중 Suspense 폴백. 자동으로 Suspense로 감쌈" },
                        { file: "error.tsx",        desc: "에러 바운더리. 'use client' 필수" },
                        { file: "not-found.tsx",    desc: "notFound() 호출 또는 404 시 렌더링" },
                        { file: "template.tsx",     desc: "layout과 유사하지만 매 내비게이션마다 새 인스턴스 생성" },
                    ].map(({ file, desc }) => (
                        <div key={file} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <code className="body-xs text-blue040 font-bold min-w-[140px]">{file}</code>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 라우팅 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">라우팅 패턴</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { pattern: "[id]",          example: "/blog/123",            desc: "동적 세그먼트" },
                        { pattern: "[...slug]",     example: "/docs/a/b/c",          desc: "Catch-all 세그먼트" },
                        { pattern: "[[...slug]]",   example: "/docs 또는 /docs/a/b", desc: "Optional Catch-all" },
                        { pattern: "(group)",       example: "URL에 포함 안 됨",      desc: "Route Group — 레이아웃 묶기용" },
                        { pattern: "@modal",        example: "병렬 렌더링",           desc: "Parallel Routes — 슬롯" },
                    ].map(({ pattern, example, desc }) => (
                        <div key={pattern} className="flex items-center gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <code className="body-xs text-hourblue font-bold min-w-[120px]">{pattern}</code>
                            <span className="body-xs text-gray050 min-w-[140px]">{example}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 핵심 차이 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">핵심 차이점 요약</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { key: "기본 컴포넌트",  pages: "클라이언트 컴포넌트",     app: "서버 컴포넌트" },
                        { key: "데이터 페칭",   pages: "getServerSideProps 등", app: "async/await 직접 사용" },
                        { key: "레이아웃",      pages: "_app.tsx 하나",         app: "중첩 layout.tsx" },
                        { key: "스트리밍",      pages: "미지원",                app: "Suspense 기반 지원" },
                    ].map(({ key, pages, app }) => (
                        <div key={key} className="flex items-center bg-gray010 rounded-[8px] overflow-hidden">
                            <span className="body-xs text-gray080 font-bold px-[10px] py-[7px] min-w-[100px] bg-gray020">{key}</span>
                            <span className="body-xs text-gray050 px-[10px] py-[7px] flex-1">{pages}</span>
                            <span className="body-xs text-blue040 px-[10px] py-[7px] flex-1">{app}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}

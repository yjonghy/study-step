export default function SemanticHtml() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">시멘틱 HTML & 접근성</p>
            <p className="text-gray060 body-sm mt-[16px]">
                시멘틱 태그는 콘텐츠의 의미를 구조적으로 표현한다.<br />
                SEO, 스크린 리더, 개발자 가독성 모두에 영향을 준다.
            </p>

            {/* 시멘틱 태그 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주요 시멘틱 태그</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        { tag: "<header>",    desc: "페이지 또는 섹션의 머리글. 로고, 내비게이션, 제목 포함" },
                        { tag: "<nav>",       desc: "주요 탐색 링크 모음. 페이지 내 주요 메뉴에만 사용" },
                        { tag: "<main>",      desc: "페이지의 주요 콘텐츠. 문서당 하나만 사용" },
                        { tag: "<article>",   desc: "독립적으로 완결된 콘텐츠 (블로그 포스트, 뉴스 기사, 댓글)" },
                        { tag: "<section>",   desc: "주제별로 묶인 콘텐츠 그룹. 제목(h1~h6) 포함 권장" },
                        { tag: "<aside>",     desc: "주 콘텐츠와 관련성 낮은 보조 콘텐츠 (사이드바, 광고, 관련 글)" },
                        { tag: "<footer>",    desc: "페이지 또는 섹션의 바닥글. 저작권, 연락처, 링크" },
                        { tag: "<figure>",    desc: "이미지, 차트 등 독립적인 콘텐츠. <figcaption>으로 캡션 추가" },
                        { tag: "<time>",      desc: "날짜·시간 표현. datetime 속성으로 기계가 읽을 수 있는 형식 제공" },
                        { tag: "<address>",   desc: "연락처 정보. 이메일, 전화, 실제 주소" },
                    ].map(({ tag, desc }) => (
                        <div key={tag} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold font-mono min-w-[100px]">{tag}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-[4px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">비시멘틱 (피해야 할 패턴)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">
  <div class="article">...</div>
</div>`}</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[10px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">시멘틱 (권장)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>`}</p>
                    </div>
                </div>
            </div>

            {/* 접근성 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">웹 접근성 (ARIA)</p>
                <p className="text-gray060 body-sm">
                    ARIA(Accessible Rich Internet Applications)는 시멘틱 HTML로 표현하기 어려운 동적 UI의 접근성을 보완한다.
                </p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        { attr: "role",            ex: 'role="button" role="dialog"',              desc: "요소의 역할 명시. 네이티브 태그 의미 없는 div에 활용" },
                        { attr: "aria-label",      ex: 'aria-label="닫기"',                        desc: "텍스트가 없는 버튼·아이콘에 스크린 리더용 레이블 제공" },
                        { attr: "aria-labelledby", ex: 'aria-labelledby="modal-title"',            desc: "다른 요소의 텍스트를 레이블로 참조" },
                        { attr: "aria-hidden",     ex: 'aria-hidden="true"',                       desc: "스크린 리더에서 해당 요소 제외 (장식용 아이콘)" },
                        { attr: "aria-expanded",   ex: 'aria-expanded="false"',                    desc: "아코디언·드롭다운의 열림/닫힘 상태 전달" },
                        { attr: "aria-live",       ex: 'aria-live="polite"',                       desc: "동적으로 변하는 콘텐츠를 스크린 리더에 알림 (토스트 등)" },
                    ].map(({ attr, ex, desc }) => (
                        <div key={attr} className="flex items-start gap-[8px] bg-gray010 px-[12px] py-[7px] rounded-[8px]">
                            <span className="body-xs text-blue040 font-bold min-w-[120px]">{attr}</span>
                            <div>
                                <p className="body-xs text-gray040 font-mono mb-[1px]">{ex}</p>
                                <p className="body-xs text-gray060">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 이미지, 폼 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">이미지 & 폼 접근성</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        'img에 항상 alt 속성 제공. 장식용 이미지는 alt="" (빈 문자열로 스킵)',
                        'label을 input과 연결 (htmlFor/for 또는 암묵적 포함). placeholder는 대체 불가',
                        'button 타입 명시: type="button" | "submit" | "reset"',
                        'tabindex: 0은 탭 순서 포함, -1은 탭 제외 (JS로만 포커스). 양수 tabindex는 피할 것',
                        'focus-visible CSS로 마우스 vs 키보드 포커스 스타일 분리',
                        '색상 대비: 일반 텍스트 4.5:1 이상, 큰 텍스트 3:1 이상 (WCAG AA 기준)',
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEO */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">시멘틱 HTML과 SEO</p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "h1~h6 계층 구조: 페이지당 h1 하나. 검색엔진이 콘텐츠 계층을 파악",
                        "<title>: 검색 결과에 표시되는 페이지 제목 (60자 이내 권장)",
                        "<meta description>: 검색 결과 설명 (160자 이내). 직접 순위에는 영향 없음",
                        "Open Graph / Twitter Card: SNS 공유 시 미리보기",
                        "구조화 데이터 (JSON-LD): 리치 스니펫 표시 (별점, 가격, 이벤트 등)",
                    ].map((t, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{t}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}

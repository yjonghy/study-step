export default function ARIA() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">ARIA & 시맨틱 HTML</p>
            <p className="text-gray060 body-sm mt-[16px]">
                접근성(a11y)은 장애가 있는 사용자도 웹 콘텐츠를 동등하게 사용할 수 있도록 하는 것이다.
                시맨틱 HTML을 우선 사용하고, 의미를 전달하기 어려운 경우에만 ARIA 속성을 보완적으로 추가한다.
            </p>

            {/* 시맨틱 HTML 우선 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">시맨틱 HTML — 첫 번째 선택</p>
                <p className="text-gray060 body-sm">스크린 리더는 HTML 요소의 암묵적 role을 자동으로 인식한다. ARIA보다 시맨틱 태그가 항상 우선이다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">나쁜 예 vs 좋은 예</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<!-- 나쁜 예: div 남용 -->
<div class="nav">...</div>
<div class="header">...</div>
<div onclick="submit()">제출</div>

<!-- 좋은 예: 시맨틱 태그 -->
<nav>...</nav>
<header>...</header>
<button type="submit">제출</button>

<!-- 시맨틱 태그의 암묵적 role -->
<a href>       → role="link"
<button>       → role="button"
<input>        → role="textbox"
<img alt="..."> → role="img"
<ul>           → role="list"
<table>        → role="table"`}</p>
                    </div>
                </div>
            </div>

            {/* ARIA 속성 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">ARIA 핵심 속성</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["role", "요소의 역할 지정", '<div role="dialog">'],
                        ["aria-label", "보이지 않는 레이블", '<button aria-label="닫기">X</button>'],
                        ["aria-labelledby", "다른 요소 ID를 레이블로 참조", '<section aria-labelledby="title-id">'],
                        ["aria-describedby", "추가 설명 연결", '<input aria-describedby="hint-id">'],
                        ["aria-hidden", "스크린 리더에서 숨김", '<span aria-hidden="true">★</span>'],
                        ["aria-expanded", "펼침/접힘 상태", '<button aria-expanded="false">메뉴</button>'],
                        ["aria-live", "동적 콘텐츠 변화 알림", '<div aria-live="polite">'],
                        ["aria-disabled", "비활성 상태 전달", '<button aria-disabled="true">'],
                    ].map(([attr, desc, example]) => (
                        <div key={attr} className="bg-gray010 rounded-[6px] px-[10px] py-[7px]">
                            <div className="flex gap-[8px] items-baseline">
                                <p className="body-xs font-mono text-blue030 font-bold shrink-0 w-[130px]">{attr}</p>
                                <p className="body-xs text-gray050">{desc}</p>
                            </div>
                            <p className="body-xs font-mono text-gray060 mt-[2px] pl-[138px]">{example}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 실전 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실전 패턴 — 접근 가능한 모달</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">삭제 확인</h2>
  <p id="modal-desc">이 항목을 삭제하면 복구할 수 없습니다.</p>

  <button onClick={confirm}>삭제</button>
  <button onClick={close}>취소</button>
</div>

// React — 모달 열릴 때 포커스 트랩 + 닫힐 때 트리거 버튼으로 복귀
useEffect(() => {
  if (isOpen) {
    firstFocusableEl.current?.focus();
  } else {
    triggerButton.current?.focus();
  }
}, [isOpen]);`}</p>
                </div>
            </div>

            {/* 실전 패턴 아이콘 버튼 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실전 패턴 — 아이콘 버튼 & 로딩 상태</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">아이콘만 있는 버튼</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<!-- 텍스트 없는 아이콘 버튼에는 반드시 aria-label -->
<button aria-label="검색">
  <SearchIcon aria-hidden="true" />  {/* 아이콘 자체는 숨김 */}
</button>`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">로딩·비활성 상태</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`<button
  aria-busy={isLoading}
  aria-disabled={isLoading}
  disabled={isLoading}
>
  {isLoading ? '저장 중...' : '저장'}
</button>

{/* 동적 알림 — 스크린 리더에 변화 알림 */}
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>`}</p>
                    </div>
                </div>
            </div>

            {/* aria-live */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">aria-live 리전 — 동적 콘텐츠 알림</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["off (기본)", "알림 없음"],
                        ["polite", "현재 읽던 내용 완료 후 알림 — 일반 알림에 적합"],
                        ["assertive", "즉시 인터럽트 알림 — 오류 메시지 등 긴급 상황에만"],
                    ].map(([val, desc]) => (
                        <div key={val} className="flex gap-[8px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <p className="body-xs font-mono text-blue030 w-[120px] shrink-0">{val}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* WCAG 기준 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">WCAG 핵심 원칙 (4P)</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["인식 가능 (Perceivable)", "이미지 alt, 색상 외 수단으로 정보 전달, 자막"],
                        ["운용 가능 (Operable)", "키보드만으로 모든 기능 사용 가능, 충분한 시간"],
                        ["이해 가능 (Understandable)", "예측 가능한 동작, 명확한 오류 메시지"],
                        ["견고 (Robust)", "다양한 보조 기술(스크린 리더 등)과 호환"],
                    ].map(([principle, desc]) => (
                        <div key={principle} className="bg-gray010 rounded-[6px] px-[10px] py-[7px]">
                            <p className="body-xs text-gray080 font-bold">{principle}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

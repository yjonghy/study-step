"use client"
import { useState, useRef, useCallback } from "react";

const TOTAL = 10_000;
const COLS = 2;
const CARD_H = 248;
const GAP = 12;
const ROW_H = CARD_H + GAP;
const CONTAINER_H = 560;
const BUFFER = 3;
const TOTAL_ROWS = Math.ceil(TOTAL / COLS);

const CATEGORIES = ["거실", "침실", "주방", "욕실", "서재", "현관", "다이닝"] as const;
const STYLES = ["북유럽", "모던", "내추럴", "빈티지", "미니멀", "클래식", "인더스트리얼"] as const;
const TOPICS = ["인테리어", "가구 배치", "조명 연출", "수납 아이디어", "컬러 코디", "소품 스타일링", "리모델링"] as const;

const items = Array.from({ length: TOTAL }, (_, i) => ({
    id: i + 1,
    title: `${STYLES[i % STYLES.length]} ${CATEGORIES[i % CATEGORIES.length]} ${TOPICS[i % TOPICS.length]}`,
    category: CATEGORIES[i % CATEGORIES.length],
    likes: Math.floor(((i * 37 + 113) % 9800) + 12),
    views: Math.floor(((i * 91 + 241) % 49000) + 100),
    user: `user_${(i % 200) + 1}`,
    imageId: (i % 500) + 1,
}));

function HeartIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    )
}

function EyeIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
    )
}

export default function VirtualScrollPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [domCount, setDomCount] = useState(0);

    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    const visibleStartRow = Math.max(0, Math.floor(scrollTop / ROW_H) - BUFFER);
    const visibleEndRow = Math.min(TOTAL_ROWS, Math.ceil((scrollTop + CONTAINER_H) / ROW_H) + BUFFER);
    const visibleItems = items.slice(visibleStartRow * COLS, visibleEndRow * COLS);

    if (domCount !== visibleItems.length) setDomCount(visibleItems.length);

    return (
        <main className="flex flex-col gap-[24px] mt-[20px]">

            {/* 헤더 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[28px] py-[24px] border-l-[4px] border-blue030">
                <div className="flex items-center gap-[8px] mb-[8px]">
                    <span className="body-xs font-bold px-[7px] py-[2px] rounded-full bg-blue005 text-blue030">Demo</span>
                    <span className="body-xs text-gray040">Virtual Scroll</span>
                </div>
                <p className="heading-xl text-gray080">가상 스크롤 (Virtual Scroll)</p>
                <p className="body-sm text-gray050 mt-[8px] leading-relaxed">
                    전체 {TOTAL.toLocaleString()}개 콘텐츠 카드 중 현재 DOM에는 <strong className="text-blue030">{domCount}개</strong>만 렌더링됩니다.
                    스크롤해도 DOM 노드 수가 일정하게 유지되어 대용량 피드를 버벅임 없이 표시할 수 있습니다.
                </p>
            </div>

            {/* 원리 설명 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[12px]">
                <p className="heading-md text-gray080">동작 원리</p>
                <div className="grid grid-cols-3 mobile:grid-cols-1 gap-[10px]">
                    {[
                        { step: "1", title: "총 높이 확보", desc: "전체 row 수 × row 높이만큼 내부 div 높이를 지정해 스크롤바가 실제처럼 보이게 한다." },
                        { step: "2", title: "가시 범위 계산", desc: "scrollTop과 컨테이너 높이로 보여야 할 row 인덱스를 계산하고, 버퍼를 더해 깜빡임을 방지한다." },
                        { step: "3", title: "위치 보정", desc: "렌더링되는 카드들을 translateY 또는 paddingTop으로 올바른 위치에 배치한다." },
                    ].map(({ step, title, desc }) => (
                        <div key={step} className="bg-gray010 rounded-[8px] p-[12px]">
                            <div className="flex items-center gap-[6px] mb-[6px]">
                                <span className="w-[20px] h-[20px] rounded-full bg-blue030 text-white body-xs flex items-center justify-center font-bold">{step}</span>
                                <p className="body-sm text-gray080 font-bold">{title}</p>
                            </div>
                            <p className="body-xs text-gray050 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 핵심 코드 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[10px]">
                <p className="heading-md text-gray080">핵심 코드 (2-column 그리드)</p>
                <div className="bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line font-mono text-[11px] leading-[1.7]">{`const COLS = 2;
const CARD_H = 248;     // 카드 높이 (px)
const ROW_H = 260;      // 카드 높이 + 갭
const TOTAL_ROWS = Math.ceil(TOTAL / COLS);

const visibleStartRow = Math.max(0, Math.floor(scrollTop / ROW_H) - BUFFER);
const visibleEndRow   = Math.min(TOTAL_ROWS, Math.ceil((scrollTop + CONTAINER_H) / ROW_H) + BUFFER);
const visibleItems    = items.slice(visibleStartRow * COLS, visibleEndRow * COLS);

<div style={{ height: CONTAINER_H, overflowY: 'auto' }} onScroll={onScroll}>
  <div style={{ height: TOTAL_ROWS * ROW_H, position: 'relative' }}>
    <div style={{ position: 'absolute', top: visibleStartRow * ROW_H, width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {visibleItems.map(item => <Card key={item.id} {...item} />)}
      </div>
    </div>
  </div>
</div>`}</p>
                </div>
            </div>

            {/* 라이브 데모 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[12px]">
                <div className="flex items-center justify-between flex-wrap gap-[8px]">
                    <p className="heading-md text-gray080">라이브 데모 — 콘텐츠 피드</p>
                    <div className="flex gap-[16px]">
                        <div className="flex flex-col items-end">
                            <p className="body-xs text-gray040">전체 카드</p>
                            <p className="body-sm text-gray080 font-bold">{TOTAL.toLocaleString()}개</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="body-xs text-gray040">현재 DOM</p>
                            <p className="body-sm text-blue030 font-bold">{domCount}개</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="body-xs text-gray040">절감율</p>
                            <p className="body-sm text-green060 font-bold">{((1 - domCount / TOTAL) * 100).toFixed(1)}%</p>
                        </div>
                    </div>
                </div>

                {/* 가상 스크롤 컨테이너 */}
                <div
                    ref={containerRef}
                    onScroll={onScroll}
                    className="border border-gray020 rounded-[10px] overflow-auto bg-gray005"
                    style={{ height: CONTAINER_H }}
                >
                    <div style={{ height: TOTAL_ROWS * ROW_H, position: "relative" }}>
                        <div style={{ position: "absolute", top: visibleStartRow * ROW_H, width: "100%", padding: "0 2px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: GAP }}>
                                {visibleItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-[10px] overflow-hidden border border-gray015 hover:shadow-shadow15 ease-out duration-[120ms] cursor-pointer"
                                        style={{ height: CARD_H }}
                                    >
                                        {/* 이미지 */}
                                        <div className="relative overflow-hidden" style={{ height: 156 }}>
                                            <img
                                                src={`https://picsum.photos/seed/${item.imageId}/400/312`}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <span className="absolute top-[8px] left-[8px] body-xs font-bold px-[7px] py-[2px] rounded-full bg-white/85 text-gray070">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* 텍스트 */}
                                        <div className="px-[10px] py-[8px] flex flex-col gap-[6px]">
                                            <p className="body-xs text-gray080 font-bold leading-[1.4] line-clamp-2">{item.title}</p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <p className="body-xs text-gray040">{item.user}</p>
                                                <div className="flex items-center gap-[8px]">
                                                    <span className="flex items-center gap-[3px] body-xs text-gray040">
                                                        <HeartIcon />{item.likes.toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center gap-[3px] body-xs text-gray040">
                                                        <EyeIcon />{item.views.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="body-xs text-gray035">
                    스크롤 위치: {Math.round(scrollTop)}px · 렌더링 row: #{visibleStartRow + 1} ~ #{visibleEndRow} · DOM 카드: {domCount}개
                </p>
            </div>

            {/* 언제 써야 하나 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[10px]">
                <p className="heading-md text-gray080">언제 써야 할까?</p>
                <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[10px]">
                    <div className="bg-green005 rounded-[8px] p-[12px]">
                        <p className="body-sm text-green060 font-bold mb-[6px]">사용 권장</p>
                        <ul className="flex flex-col gap-[4px]">
                            {["1,000개 이상 콘텐츠 피드", "무한 스크롤 갤러리", "실시간 로그 뷰어", "데이터 그리드 (Excel 유사)"].map(t => (
                                <li key={t} className="body-xs text-gray060 flex gap-[4px]"><span>•</span>{t}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red005 rounded-[8px] p-[12px]">
                        <p className="body-sm text-red050 font-bold mb-[6px]">주의 / 대안 검토</p>
                        <ul className="flex flex-col gap-[4px]">
                            {["행 높이가 가변적인 경우 (dynamic height 필요)", "인쇄·PDF 출력이 필요한 경우", "100개 미만 소량 데이터", "SEO가 중요한 콘텐츠 목록"].map(t => (
                                <li key={t} className="body-xs text-gray060 flex gap-[4px]"><span>•</span>{t}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="bg-gray010 rounded-[8px] p-[10px] mt-[2px]">
                    <p className="body-xs text-gray050">라이브러리: <span className="text-blue030 font-mono">@tanstack/react-virtual</span>, <span className="text-blue030 font-mono">react-window</span>, <span className="text-blue030 font-mono">react-virtuoso</span> — 동적 높이, 그리드, 무한 스크롤 지원</p>
                </div>
            </div>

        </main>
    );
}

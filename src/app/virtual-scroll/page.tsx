"use client"
import { useState, useRef, useCallback } from "react";

const TOTAL = 10_000;
const ROW_H = 52;
const CONTAINER_H = 480;
const BUFFER = 5;

const STATUSES = ["활성", "대기", "완료", "오류"] as const;
const STATUS_COLOR: Record<string, string> = {
    "활성": "bg-green005 text-green060",
    "대기": "bg-yellow005 text-yellow060",
    "완료": "bg-blue005 text-blue030",
    "오류": "bg-red005 text-red050",
};

const items = Array.from({ length: TOTAL }, (_, i) => ({
    id: i + 1,
    name: `사용자 ${(i + 1).toString().padStart(5, "0")}`,
    email: `user${i + 1}@example.com`,
    status: STATUSES[i % 4],
}));

export default function VirtualScrollPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [renderCount, setRenderCount] = useState(0);

    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    const visibleStart = Math.max(0, Math.floor(scrollTop / ROW_H) - BUFFER);
    const visibleEnd = Math.min(TOTAL, Math.ceil((scrollTop + CONTAINER_H) / ROW_H) + BUFFER);
    const visibleItems = items.slice(visibleStart, visibleEnd);

    if (renderCount !== visibleItems.length) setRenderCount(visibleItems.length);

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
                    전체 {TOTAL.toLocaleString()}개 항목 중 현재 DOM에는 <strong className="text-blue030">{renderCount}개</strong>만 렌더링됩니다.
                    스크롤해도 DOM 노드 수가 일정하게 유지되어 대용량 리스트를 버벅임 없이 표시할 수 있습니다.
                </p>
            </div>

            {/* 원리 설명 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[12px]">
                <p className="heading-md text-gray080">동작 원리</p>
                <div className="grid grid-cols-3 mobile:grid-cols-1 gap-[10px]">
                    {[
                        { step: "1", title: "총 높이 확보", desc: "전체 아이템 수 × 행 높이만큼 내부 div 높이를 지정해 스크롤바가 실제처럼 보이게 한다." },
                        { step: "2", title: "가시 범위 계산", desc: "scrollTop과 컨테이너 높이로 보여야 할 인덱스 범위를 계산하고, 버퍼를 더해 깜빡임을 방지한다." },
                        { step: "3", title: "위치 보정", desc: "렌더링되는 행들을 translateY 또는 paddingTop으로 올바른 위치에 배치한다." },
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

            {/* 코드 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[10px]">
                <p className="heading-md text-gray080">핵심 코드</p>
                <div className="bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const ROW_H = 52;        // 행 높이 (px)
const CONTAINER_H = 480; // 컨테이너 높이 (px)
const BUFFER = 5;         // 위아래 여분 렌더링 수

// scrollTop이 바뀔 때마다 재계산
const visibleStart = Math.max(0, Math.floor(scrollTop / ROW_H) - BUFFER);
const visibleEnd   = Math.min(total, Math.ceil((scrollTop + CONTAINER_H) / ROW_H) + BUFFER);

// 컨테이너
<div style={{ height: CONTAINER_H, overflow: 'auto' }} onScroll={onScroll}>
  {/* 전체 높이 확보용 빈 공간 */}
  <div style={{ height: total * ROW_H, position: 'relative' }}>
    {/* 실제 렌더링 구간만 absolute 배치 */}
    <div style={{ position: 'absolute', top: visibleStart * ROW_H, width: '100%' }}>
      {items.slice(visibleStart, visibleEnd).map(item => (
        <Row key={item.id} item={item} height={ROW_H} />
      ))}
    </div>
  </div>
</div>`}</p>
                </div>
            </div>

            {/* 실제 데모 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                    <p className="heading-md text-gray080">라이브 데모</p>
                    <div className="flex gap-[16px]">
                        <div className="flex flex-col items-end">
                            <p className="body-xs text-gray040">전체 아이템</p>
                            <p className="body-sm text-gray080 font-bold">{TOTAL.toLocaleString()}개</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="body-xs text-gray040">현재 DOM</p>
                            <p className="body-sm text-blue030 font-bold">{renderCount}개</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="body-xs text-gray040">절감율</p>
                            <p className="body-sm text-green060 font-bold">{((1 - renderCount / TOTAL) * 100).toFixed(1)}%</p>
                        </div>
                    </div>
                </div>

                {/* 테이블 헤더 */}
                <div className="flex items-center gap-[12px] px-[12px] py-[8px] bg-gray015 rounded-[6px]">
                    <p className="body-xs text-gray050 font-bold w-[60px]">ID</p>
                    <p className="body-xs text-gray050 font-bold flex-1">이름</p>
                    <p className="body-xs text-gray050 font-bold flex-1 mobile:hidden">이메일</p>
                    <p className="body-xs text-gray050 font-bold w-[60px] text-right">상태</p>
                </div>

                {/* 가상 스크롤 컨테이너 */}
                <div
                    ref={containerRef}
                    onScroll={onScroll}
                    className="border border-gray020 rounded-[8px] overflow-auto"
                    style={{ height: CONTAINER_H }}
                >
                    <div style={{ height: TOTAL * ROW_H, position: "relative" }}>
                        <div style={{ position: "absolute", top: visibleStart * ROW_H, width: "100%" }}>
                            {visibleItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-[12px] px-[12px] border-b border-gray015 hover:bg-blue005 transition-colors duration-75"
                                    style={{ height: ROW_H }}
                                >
                                    <p className="body-xs text-gray040 w-[60px] font-mono">{item.id}</p>
                                    <p className="body-sm text-gray080 flex-1">{item.name}</p>
                                    <p className="body-xs text-gray040 flex-1 mobile:hidden">{item.email}</p>
                                    <span className={`body-xs px-[6px] py-[2px] rounded-full font-bold w-[60px] text-center ${STATUS_COLOR[item.status]}`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="body-xs text-gray035">스크롤 위치: {Math.round(scrollTop)}px · 렌더링 범위: #{visibleStart + 1} ~ #{visibleEnd}</p>
            </div>

            {/* 비교: 언제 써야 하나 */}
            <div className="bg-white/70 rounded-[12px] shadow-shadow15 px-[24px] py-[20px] flex flex-col gap-[10px]">
                <p className="heading-md text-gray080">언제 써야 할까?</p>
                <div className="grid grid-cols-2 mobile:grid-cols-1 gap-[10px]">
                    <div className="bg-green005 rounded-[8px] p-[12px]">
                        <p className="body-sm text-green060 font-bold mb-[6px]">사용 권장</p>
                        <ul className="flex flex-col gap-[4px]">
                            {["1,000개 이상 리스트", "무한 스크롤 피드", "실시간 로그 뷰어", "데이터 그리드 (Excel 유사)"].map(t => (
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

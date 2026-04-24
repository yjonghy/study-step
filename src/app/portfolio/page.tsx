"use client"
import React, { useState } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

type NodeType = "external" | "server" | "client" | "storage" | "output" | "mobile" | "monitoring" | "infra"

type FlowNode = {
    label: string
    note?: string
    type: NodeType
}

type FlowStep = {
    nodes: FlowNode[]
    arrowLabel?: string
}

type LayerType = "external" | "server" | "client" | "monitoring" | "mobile" | "infra"

type LayerItem = { name: string; note?: string }

type Layer = {
    name: string
    type: LayerType
    items: LayerItem[]
    arrowLabel?: string
}

type TechReason = { tech: string; reason: string }

type ProcessEvent = {
    text: string
    techs?: string[]
}

type ProcessStep = {
    label: string
    events: ProcessEvent[]
}

type SubProject = {
    name: string
    description: string
    stack: string[]
    processFlow?: ProcessStep[]
    flow?: FlowStep[]
    layers: Layer[]
    techReasons: TechReason[]
}

type Project = {
    company: string
    period: string
    domain: string
    role: string
    accentColor: string
    tagBg: string
    tagText: string
    subProjects?: SubProject[]
    sharedInfra?: LayerItem[]
    flow?: FlowStep[]
    layers?: Layer[]
    techReasons?: TechReason[]
}

// ─── Style maps ──────────────────────────────────────────────────────────────

const nodeStyles: Record<NodeType, string> = {
    external:   "bg-yellow010 border border-yellow020 text-yellow060",
    server:     "bg-blue010 border border-blue020 text-blue040",
    client:     "bg-green010 border border-green020 text-green060",
    storage:    "bg-gray020 border border-gray025 text-gray070",
    output:     "bg-gray020 border border-gray025 text-gray070",
    mobile:     "bg-gray020 border border-gray025 text-gray070",
    monitoring: "bg-red010 border border-red020 text-red050",
    infra:      "bg-purple010 border border-purple020 text-purple040",
}

const layerStyles: Record<LayerType, { bg: string; border: string; label: string; badge: string }> = {
    external:   { bg: "bg-yellow005", border: "border-yellow020", label: "text-yellow060", badge: "bg-yellow010 text-yellow060" },
    server:     { bg: "bg-blue005",   border: "border-blue020",   label: "text-blue040",   badge: "bg-blue010 text-blue040"   },
    client:     { bg: "bg-green005",  border: "border-green020",  label: "text-green060",  badge: "bg-green010 text-green060"  },
    monitoring: { bg: "bg-red005",    border: "border-red020",    label: "text-red050",    badge: "bg-red010 text-red050"      },
    mobile:     { bg: "bg-gray015",   border: "border-gray025",   label: "text-gray060",   badge: "bg-gray020 text-gray070"   },
    infra:      { bg: "bg-purple005", border: "border-purple020", label: "text-purple040", badge: "bg-purple010 text-purple040" },
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects: Project[] = [
    {
        company: "인딥에이아이",
        period: "2025.01 — 현재",
        domain: "B2B AI 인터뷰 · 평가 프로덕트",
        role: "프론트엔드 구조 설계 및 핵심 기능 개발 주도",
        accentColor: "border-blue040",
        tagBg: "bg-blue005",
        tagText: "text-blue040",
        sharedInfra: [
            { name: "AWS S3", note: "파일·음성 스토리지" },
            { name: "CloudFront", note: "CDN 배포" },
            { name: "Lambda", note: "서버리스 PDF·알림" },
            { name: "Route 53", note: "DNS 관리" },
            { name: "API Gateway", note: "Lambda 라우팅" },
            { name: "EC2", note: "NestJS 서버 호스팅" },
        ],
        subProjects: [
            {
                name: "면접 솔루션",
                description: "지원자 음성 인터뷰와 면접관 점수 입력을 실시간으로 처리하는 B2B 면접 운영 플랫폼. 음성 데이터는 STT 변환 후 AI 스크립트·근거로 생성되고, 점수는 Socket으로 관리자에게 실시간 전파.",
                stack: ["React", "Next.js", "NestJS", "Socket.io", "Web Worker", "VAD", "Azure STT SDK", "Redis", "MongoDB", "TanStack Query", "Zustand", "Framer Motion", "TypeScript"],
                processFlow: [
                    {
                        label: "면접 시작",
                        events: [
                            { text: "Socket.io로 N명 면접관에게 시작 신호 전파", techs: ["Socket.io"] },
                            { text: "음성 녹음 시작 — Web Worker가 S3에 지속 업로드, 실패 시 재시도", techs: ["Web Worker", "S3"] },
                            { text: "Azure STT 스트리밍 시작 — 대화 로그 실시간 표시", techs: ["Azure STT SDK", "VAD"] },
                        ],
                    },
                    {
                        label: "면접 진행",
                        events: [
                            { text: "VAD로 발화 구간 감지 후 Azure STT에 구간 단위 전송", techs: ["VAD", "Azure STT SDK"] },
                            { text: "변환된 텍스트를 대화 로그 형태로 화면에 실시간 표시", techs: ["React"] },
                        ],
                    },
                    {
                        label: "면접관 점수 기입",
                        events: [
                            { text: "평가역량별 점수 입력 후 저장", techs: ["MongoDB"] },
                            { text: "Socket.io 전파 — 관리자가 점수 평균·진척도 실시간 확인", techs: ["Socket.io"] },
                        ],
                    },
                    {
                        label: "면접 종료",
                        events: [
                            { text: "Socket.io로 N명 면접관에게 종료 신호 전파", techs: ["Socket.io"] },
                            { text: "AI API: 면접 전체 요약 스크립트 생성", techs: ["AI API"] },
                            { text: "AI API: 평가역량별 근거·이유 생성 — 면접관 평가 보조", techs: ["AI API"] },
                            { text: "최종 음성 데이터·스크립트 저장", techs: ["MongoDB", "S3"] },
                        ],
                    },
                ],
                layers: [
                    {
                        name: "External",
                        type: "external",
                        items: [{ name: "Azure STT SDK", note: "한국어 스트리밍 인식" }, { name: "AI Model API", note: "스크립트·근거 생성" }],
                        arrowLabel: "REST API",
                    },
                    {
                        name: "Server",
                        type: "server",
                        items: [{ name: "NestJS" }, { name: "Socket.io", note: "실시간 동기화" }, { name: "Redis", note: "세션 캐시" }, { name: "MongoDB", note: "면접 데이터 저장" }],
                        arrowLabel: "REST / WS",
                    },
                    {
                        name: "Client",
                        type: "client",
                        items: [
                            { name: "Next.js (App Router)" }, { name: "React" }, { name: "TanStack Query" },
                            { name: "Zustand" }, { name: "Web Worker" }, { name: "VAD" },
                            { name: "Framer Motion" }, { name: "Tailwind CSS" }, { name: "TypeScript" },
                        ],
                    },
                ],
                techReasons: [
                    { tech: "Socket.io", reason: "면접 시작·종료 이벤트와 점수 데이터를 관리자 대시보드에 실시간 전파. 재연결 로직이 내장되어 있어 네트워크 불안정 상황을 자연스럽게 처리했습니다." },
                    { tech: "Web Worker", reason: "음성 처리 중 통신 실패 시 메인 스레드를 차단하지 않고 재시도·임시저장 처리. 인터뷰 UX 흐름이 끊기지 않는 것이 핵심 요구사항이었습니다." },
                    { tech: "VAD", reason: "발화 시작·종료를 정밀하게 감지하여 Azure STT 요청을 구간 단위로 분리. 무음 구간까지 전송하는 낭비를 줄이고 인식 정확도를 높였습니다." },
                    { tech: "Azure STT SDK", reason: "한국어 인식 정확도와 스트리밍 방식 연동 안정성을 비교 검토 후 선택. 변환된 텍스트를 AI API에 전달하여 스크립트·근거를 생성했습니다." },
                    { tech: "Zustand", reason: "인터뷰 세션 상태처럼 여러 컴포넌트에 걸친 클라이언트 상태를 가볍게 관리. TanStack Query와 역할을 명확히 나눠 코드 가독성을 높였습니다." },
                ],
            },
            {
                name: "결과레포트 어드민",
                description: "면접 음성·점수 데이터를 기반으로 AI 피드백을 자동 생성하고, Next.js로 구성한 PDF 레포트 화면을 Svelte 어드민에서 검토·다운로드하는 내부 관리 시스템.",
                stack: ["Svelte", "SvelteKit", "Next.js", "NestJS", "TanStack Query", "TypeScript", "MongoDB"],
                flow: [
                    {
                        nodes: [{ label: "면접 완료 데이터", note: "음성·점수", type: "storage" }],
                    },
                    {
                        nodes: [{ label: "AI Feedback API", note: "피드백 생성", type: "external" }],
                        arrowLabel: "생성 요청",
                    },
                    {
                        nodes: [{ label: "NestJS API", note: "피드백 저장·조회", type: "server" }],
                        arrowLabel: "저장",
                    },
                    {
                        nodes: [{ label: "Next.js 레포트 화면", note: "PDF용 레이아웃", type: "client" }],
                        arrowLabel: "데이터 주입",
                    },
                    {
                        nodes: [{ label: "Svelte 어드민", note: "레포트 검토 · 다운로드", type: "client" }],
                        arrowLabel: "iframe 확인 · 저장",
                    },
                ],
                layers: [
                    {
                        name: "External",
                        type: "external",
                        items: [{ name: "AI Model API", note: "피드백 생성" }],
                        arrowLabel: "REST API",
                    },
                    {
                        name: "Server",
                        type: "server",
                        items: [{ name: "NestJS" }, { name: "MongoDB", note: "피드백·레포트 저장" }],
                        arrowLabel: "데이터 제공",
                    },
                    {
                        name: "Client — 레포트",
                        type: "client",
                        items: [{ name: "Next.js (App Router)" }, { name: "React" }, { name: "Tailwind CSS" }, { name: "TypeScript" }],
                        arrowLabel: "레포트 URL 전달",
                    },
                    {
                        name: "Client — 어드민",
                        type: "monitoring",
                        items: [{ name: "SvelteKit" }, { name: "Svelte" }, { name: "TanStack Query" }, { name: "TypeScript" }],
                    },
                ],
                techReasons: [
                    { tech: "Next.js (레포트 화면)", reason: "피드백 데이터를 서버에서 주입해 인쇄·다운로드에 최적화된 레이아웃을 렌더링. 브라우저 Print API와 CSS @media print를 활용해 별도 변환 없이 PDF를 생성했습니다." },
                    { tech: "Svelte (어드민)", reason: "어드민 특성상 무거운 런타임이 불필요. 컴파일 타임 반응성으로 Next.js 레포트 화면을 iframe으로 불러와 검토·다운로드 흐름을 빠르게 구성했습니다." },
                    { tech: "MongoDB", reason: "면접마다 구조가 다른 피드백 데이터를 유연하게 저장. 스키마리스 특성이 AI 응답 포맷 변경에 유연하게 대응했습니다." },
                ],
            },
            {
                name: "면접솔루션 제작 어드민",
                description: "면접 솔루션을 간편하게 세팅하기 위한 어드민 프로젝트. 엑셀 형태의 지원자·계정·면접 목록 데이터를 업로드하면 DB에 저장되며, 솔루션의 다양한 옵션을 UI에서 설정 가능.",
                stack: ["React", "shadcn/ui", "Radix UI", "NestJS", "MongoDB", "xlsx", "TanStack Query", "Zustand", "Tailwind CSS", "TypeScript"],
                flow: [
                    {
                        nodes: [{ label: "Excel / CSV 업로드", note: "지원자·계정·면접 목록", type: "external" }],
                    },
                    {
                        nodes: [{ label: "xlsx 파서", note: "데이터 파싱·검증", type: "client" }],
                        arrowLabel: "클라이언트 파싱",
                    },
                    {
                        nodes: [{ label: "NestJS API", note: "배치 저장", type: "server" }],
                        arrowLabel: "API 요청",
                    },
                    {
                        nodes: [{ label: "MongoDB", note: "지원자·계정·설정 저장", type: "storage" }],
                        arrowLabel: "DB 저장",
                    },
                    {
                        nodes: [{ label: "React 어드민 UI", note: "옵션 설정 대시보드", type: "client" }],
                        arrowLabel: "설정 반영",
                    },
                ],
                layers: [
                    {
                        name: "Server",
                        type: "server",
                        items: [{ name: "NestJS" }, { name: "MongoDB", note: "지원자·계정·설정" }],
                        arrowLabel: "REST API",
                    },
                    {
                        name: "Client",
                        type: "client",
                        items: [
                            { name: "React" }, { name: "shadcn/ui" }, { name: "Radix UI", note: "접근성 컴포넌트" },
                            { name: "TanStack Query" }, { name: "Zustand" },
                            { name: "xlsx", note: "엑셀 파싱" }, { name: "Tailwind CSS" }, { name: "TypeScript" },
                        ],
                    },
                ],
                techReasons: [
                    { tech: "shadcn/ui + Radix UI", reason: "어드민 UI 특성상 폼·테이블·다이얼로그 컴포넌트가 반복됩니다. 직접 조작 가능한 컴포넌트 소스와 접근성 보장 프리미티브를 조합해 빠르게 일관된 UI를 구성했습니다." },
                    { tech: "xlsx (SheetJS)", reason: "브라우저에서 엑셀 파일을 바로 파싱하여 서버 부담 없이 대용량 지원자 데이터를 검증 후 업로드. 업로드 전 미리보기·오류 표시가 가능해 운영 실수를 줄였습니다." },
                    { tech: "MongoDB", reason: "면접 설정 스키마가 프로젝트마다 다르고 초기 스펙이 자주 변경됩니다. 스키마리스 구조가 빠른 이터레이션에 유리했습니다." },
                    { tech: "TanStack Query", reason: "어드민 폼의 서버 상태(목록·검색·페이지네이션)와 클라이언트 상태를 분리. 캐싱·낙관적 업데이트로 UX를 개선했습니다." },
                ],
            },
        ],
    },
    {
        company: "먼치팩토리",
        period: "2023.01 — 2024.07",
        domain: "장소 대여 플랫폼 (미국 타겟) · PHP → Next.js 마이그레이션",
        role: "프론트엔드 초기 구조 설계 및 서비스 개선 주도",
        accentColor: "border-blue040",
        tagBg: "bg-blue005",
        tagText: "text-blue040",
        subProjects: [
            {
                name: "미국 타겟 플랫폼",
                description: "미국 시장을 겨냥한 장소 대여 플랫폼. SEO 최적화와 다국어 지원을 초기 구조부터 반영하여 설계.",
                stack: ["Next.js", "React", "TanStack Query", "Recoil", "next-intl", "Tailwind CSS", "Sentry", "TypeScript"],
                flow: [
                    {
                        nodes: [{ label: "사용자 요청", type: "client" }],
                    },
                    {
                        nodes: [
                            { label: "Next.js SSR", note: "서버 렌더링", type: "server" },
                            { label: "i18n Routing", note: "locale 분기", type: "server" },
                        ],
                        arrowLabel: "서버 처리",
                    },
                    {
                        nodes: [
                            { label: "SEO 메타데이터", note: "og / robots", type: "output" },
                            { label: "TanStack Query", note: "API 페칭", type: "client" },
                        ],
                        arrowLabel: "병렬 처리",
                    },
                    {
                        nodes: [{ label: "React UI", note: "Skeleton → 콘텐츠", type: "client" }],
                        arrowLabel: "렌더링",
                    },
                    {
                        nodes: [{ label: "Sentry", note: "에러 추적", type: "monitoring" }],
                        arrowLabel: "운영 모니터링",
                    },
                ],
                layers: [
                    {
                        name: "Server",
                        type: "server",
                        items: [{ name: "Next.js SSR / SSG" }, { name: "i18n (next-intl)", note: "다국어 라우팅" }, { name: "SEO Metadata API" }],
                        arrowLabel: "서버 → 클라이언트",
                    },
                    {
                        name: "Client",
                        type: "client",
                        items: [{ name: "React" }, { name: "TanStack Query" }, { name: "Recoil" }, { name: "Tailwind CSS" }],
                        arrowLabel: "에러 이벤트",
                    },
                    {
                        name: "Monitoring",
                        type: "monitoring",
                        items: [{ name: "Sentry", note: "에러 · 성능 추적" }],
                    },
                ],
                techReasons: [
                    { tech: "Next.js", reason: "미국 시장 SEO가 핵심이었습니다. SSR/SSG 메타데이터 제어와 i18n 라우팅 구조가 검색 엔진 최적화와 글로벌 확장 모두에 유리했습니다." },
                    { tech: "i18n (next-intl)", reason: "초기 구조부터 글로벌 확장을 고려해 설계. App Router와 통합이 자연스럽고 locale 기반 URL 구조가 SEO에도 유리했습니다." },
                    { tech: "Sentry", reason: "운영 환경 에러를 실시간 추적하고 스택 트레이스·사용자 컨텍스트를 함께 파악. 원인 분석 속도가 크게 향상됐습니다." },
                ],
            },
            {
                name: "PHP → Next.js 마이그레이션",
                description: "PHP 기반 레거시 서비스를 Next.js로 점진적 전환. 페이지 단위로 교체하며 서비스 중단 없이 마이그레이션 완료.",
                stack: ["PHP", "Next.js", "React", "TypeScript", "Tailwind CSS"],
                flow: [
                    {
                        nodes: [{ label: "PHP 레거시", note: "서버 렌더링", type: "external" }],
                    },
                    {
                        nodes: [{ label: "구조 분석", note: "라우팅 · 데이터 흐름", type: "output" }],
                        arrowLabel: "분석",
                    },
                    {
                        nodes: [{ label: "Next.js 설계", note: "App Router 구조", type: "server" }],
                        arrowLabel: "설계",
                    },
                    {
                        nodes: [{ label: "점진적 전환", note: "페이지 단위 교체", type: "client" }],
                        arrowLabel: "마이그레이션",
                    },
                    {
                        nodes: [{ label: "배포 · 검증", note: "SEO · 성능 확인", type: "monitoring" }],
                        arrowLabel: "배포",
                    },
                ],
                layers: [
                    {
                        name: "Legacy",
                        type: "external",
                        items: [{ name: "PHP", note: "서버 사이드 렌더링" }],
                        arrowLabel: "점진적 전환",
                    },
                    {
                        name: "New",
                        type: "client",
                        items: [{ name: "Next.js (App Router)" }, { name: "React" }, { name: "TypeScript" }, { name: "Tailwind CSS" }],
                    },
                ],
                techReasons: [
                    { tech: "Next.js", reason: "PHP의 서버 렌더링 방식을 유지하면서 컴포넌트 기반 구조로 전환 가능. SSR/SSG 선택 적용으로 기존 SEO 구조를 손상 없이 이어받았습니다." },
                    { tech: "점진적 마이그레이션", reason: "전체를 한 번에 전환하면 QA 비용과 리스크가 높아집니다. PHP와 Next.js를 병행 운영하며 페이지 단위로 검증 후 교체하는 방식으로 서비스 중단 없이 완료했습니다." },
                ],
            },
        ],
    },
    {
        company: "클래시컴퍼니",
        period: "2019.09 — 2023.01",
        domain: "간판 중개 플랫폼",
        role: "레거시 프론트엔드 구조 개선 · React 전환 · WebView 앱 개발 참여",
        accentColor: "border-blue040",
        tagBg: "bg-blue005",
        tagText: "text-blue040",
        subProjects: [
            {
                name: "React SPA 전환",
                description: "Vanilla JS 레거시 코드를 React 컴포넌트 아키텍처로 전환. 실시간 채팅, 전역 상태 관리, CSS 모듈화까지 구조를 재설계했습니다.",
                stack: ["React", "Redux", "React Router", "styled-components", "WebSocket"],
                flow: [
                    {
                        nodes: [{ label: "웹 브라우저", type: "client" }],
                    },
                    {
                        nodes: [
                            { label: "React SPA", note: "컴포넌트 아키텍처", type: "client" },
                            { label: "Redux Store", note: "전역 상태", type: "client" },
                        ],
                        arrowLabel: "상태 동기화",
                    },
                    {
                        nodes: [{ label: "REST API", note: "비즈니스 로직", type: "server" }],
                        arrowLabel: "API 요청",
                    },
                    {
                        nodes: [{ label: "WebSocket", note: "실시간 채팅", type: "server" }],
                        arrowLabel: "실시간",
                    },
                ],
                layers: [
                    {
                        name: "Client",
                        type: "client",
                        items: [{ name: "React SPA" }, { name: "Redux" }, { name: "React Router" }, { name: "styled-components" }],
                        arrowLabel: "REST / WebSocket",
                    },
                    {
                        name: "Server",
                        type: "server",
                        items: [{ name: "REST API Server" }, { name: "WebSocket Server", note: "실시간 채팅" }],
                    },
                ],
                techReasons: [
                    { tech: "React", reason: "Vanilla JS 레거시 코드의 기능 단위 분리가 어렵고 유지보수 비용이 높았습니다. 컴포넌트 아키텍처로 전환하여 관심사 분리와 상태-UI 연결 로직을 예측 가능하게 관리했습니다." },
                    { tech: "Redux", reason: "실시간 채팅처럼 여러 컴포넌트가 공유하는 상태를 단일 스토어로 관리. 채팅방 전환 시 데이터 유실 문제를 전역 상태 구조로 해결했습니다." },
                    { tech: "styled-components", reason: "전역 CSS 오염 문제를 해결하기 위해 도입. 컴포넌트 스코프 스타일로 충돌을 방지하고 props 기반 동적 스타일링으로 코드 응집도를 높였습니다." },
                ],
            },
            {
                name: "앱 개발",
                description: "초기에는 Android · iOS 네이티브 앱을 직접 개발했고, 이후 WebView 방식으로 전환하며 양방향 브릿지 구조를 설계했습니다. 네이티브와 웹 양쪽을 경험하며 앱-웹 통신 구조 전반을 다뤘습니다.",
                stack: ["Android", "iOS", "Java", "Swift", "WebView", "JavaScript", "React"],
                flow: [
                    {
                        nodes: [
                            { label: "Android", type: "mobile" },
                            { label: "iOS", type: "mobile" },
                        ],
                    },
                    {
                        nodes: [{ label: "Native 화면", note: "Java · Swift", type: "mobile" }],
                        arrowLabel: "네이티브",
                    },
                    {
                        nodes: [{ label: "WebView", note: "앱 내 웹 렌더링", type: "mobile" }],
                        arrowLabel: "→ WebView 전환",
                    },
                    {
                        nodes: [{ label: "Bridge", note: "양방향 통신", type: "mobile" }],
                        arrowLabel: "브릿지",
                    },
                    {
                        nodes: [{ label: "React SPA", note: "웹 화면", type: "client" }],
                        arrowLabel: "렌더링",
                    },
                ],
                layers: [
                    {
                        name: "Native App",
                        type: "mobile",
                        items: [{ name: "Android (Java)" }, { name: "iOS (Swift)" }],
                        arrowLabel: "WebView 전환",
                    },
                    {
                        name: "Hybrid",
                        type: "mobile",
                        items: [{ name: "WebView" }, { name: "WebView Bridge", note: "앱-웹 양방향 통신" }],
                        arrowLabel: "렌더링",
                    },
                    {
                        name: "Web",
                        type: "client",
                        items: [{ name: "React SPA" }, { name: "JavaScript" }],
                    },
                ],
                techReasons: [
                    { tech: "Native → WebView 전환", reason: "초기에는 Android · iOS를 각각 네이티브로 개발했으나, 웹 기반 기능이 늘어나면서 WebView로 전환. 코드베이스를 단일화하고 배포 주기를 단축했습니다." },
                    { tech: "WebView Bridge", reason: "카메라·위치 등 네이티브 기능을 웹에서 호출하고 웹 이벤트를 앱에 전달하는 양방향 구조 설계. 네이티브-웹 간 UX 단절을 최소화했습니다." },
                ],
            },
        ],
    },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FlowNodeBox({ label, note, type }: FlowNode) {
    return (
        <div className={`rounded-[8px] px-[10px] py-[7px] text-center min-w-[76px] ${nodeStyles[type]}`}>
            <p className="body-xs font-bold whitespace-nowrap">{label}</p>
            {note && <p className="body-xs opacity-60 mt-[1px] whitespace-nowrap">{note}</p>}
        </div>
    )
}

function FlowDiagram({ steps }: { steps: FlowStep[] }) {
    return (
        <div>
            <p className="body-xs font-bold text-gray040 mb-[12px] tracking-widest uppercase">데이터 흐름</p>
            <div className="overflow-x-auto pb-[4px]">
                <div className="flex items-center gap-[0px] w-max">
                    {steps.map((step, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col gap-[4px] items-center">
                                {step.nodes.map((node, j) => (
                                    <FlowNodeBox key={j} {...node} />
                                ))}
                            </div>

                            {i < steps.length - 1 && (
                                <div className="flex flex-col items-center gap-[2px] px-[6px] flex-shrink-0">
                                    {step.arrowLabel && (
                                        <span className="body-xs text-gray030 whitespace-nowrap">{step.arrowLabel}</span>
                                    )}
                                    <div className="flex items-center gap-[1px]">
                                        <div className="h-[1px] w-[16px] bg-gray025" />
                                        <span className="text-gray030 text-[9px] leading-none">▶</span>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

function LayerStack({ layers }: { layers: Layer[] }) {
    return (
        <div>
            <p className="body-xs font-bold text-gray040 mb-[12px] tracking-widest uppercase">레이어별 스택</p>
            <div className="flex flex-col">
                {layers.map((layer, i) => {
                    const s = layerStyles[layer.type]
                    return (
                        <React.Fragment key={layer.name}>
                            <div className={`rounded-[10px] border ${s.border} ${s.bg} px-[14px] py-[10px]`}>
                                <p className={`body-xs font-bold mb-[7px] ${s.label}`}>{layer.name}</p>
                                <div className="flex flex-wrap gap-[4px]">
                                    {layer.items.map((item) => (
                                        item.note ? (
                                            <div key={item.name} className={`body-xs px-[8px] py-[4px] rounded-[8px] font-medium ${s.badge}`}>
                                                <p className="leading-tight">{item.name}</p>
                                                <p className="opacity-60 font-normal leading-tight">{item.note}</p>
                                            </div>
                                        ) : (
                                            <div key={item.name} className={`body-xs px-[8px] py-[4px] rounded-[8px] font-medium flex items-center ${s.badge}`}>
                                                {item.name}
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            {i < layers.length - 1 && (
                                <div className="flex flex-col items-start pl-[22px] py-[1px]">
                                    <div className="w-[1px] h-[8px] bg-gray025" />
                                    {layer.arrowLabel && (
                                        <span className="body-xs text-gray030 ml-[4px] leading-none">{layer.arrowLabel}</span>
                                    )}
                                    <div className="w-[1px] h-[6px] bg-gray025" />
                                    <span className="text-gray030 text-[9px] leading-none">▼</span>
                                </div>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

function InterviewProcessFlow({ steps, layers }: { steps: ProcessStep[]; layers: Layer[] }) {
    const techTypeMap: Record<string, LayerType> = {}
    layers.forEach((layer) => {
        layer.items.forEach((item) => {
            techTypeMap[item.name] = layer.type
        })
    })

    const techBadge = (tech: string): string => {
        const type = techTypeMap[tech]
        return type ? layerStyles[type].badge : "bg-gray020 text-gray060"
    }

    return (
        <div>
            <p className="body-xs font-bold text-gray040 mb-[16px] tracking-widest uppercase">면접 플로우</p>
            <div className="flex flex-col">
                {steps.map((step, i) => (
                    <div key={step.label} className="flex gap-[14px]">
                        {/* 타임라인 */}
                        <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-[10px] h-[10px] rounded-full border-[2px] border-blue040 bg-white flex-shrink-0 mt-[3px]" />
                            {i < steps.length - 1 && (
                                <div className="w-[1px] flex-1 bg-gray025 my-[5px]" />
                            )}
                        </div>

                        {/* 단계명 + 이벤트 */}
                        <div className={`flex flex-col gap-[10px] ${i < steps.length - 1 ? "pb-[20px]" : ""}`}>
                            <span className="body-sm font-bold text-gray080 leading-none mt-[2px]">{step.label}</span>
                            {step.events.length > 0 && (
                                <div className="flex flex-col gap-[8px]">
                                    {step.events.map((ev, j) => (
                                        <div key={j} className="flex flex-col gap-[4px]">
                                            <div className="flex items-start gap-[6px]">
                                                <span className="body-xs text-gray030 mt-[1px] flex-shrink-0 select-none">·</span>
                                                <span className="body-xs text-gray060 leading-relaxed">{ev.text}</span>
                                            </div>
                                            {ev.techs && ev.techs.length > 0 && (
                                                <div className="flex gap-[4px] flex-wrap pl-[12px]">
                                                    {ev.techs.map((t) => (
                                                        <span key={t} className={`body-xs px-[6px] py-[1px] rounded-full font-medium whitespace-nowrap ${techBadge(t)}`}>{t}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SubProjectDetail({ sub, tagText }: { sub: SubProject; tagText: string }) {
    return (
        <div className="flex flex-col gap-[20px]">
            {/* Description */}
            <p className="body-sm text-gray060 leading-relaxed">{sub.description}</p>

            {/* Stack pills */}
            <div>
                <p className="body-xs font-bold text-gray040 mb-[8px] tracking-widest uppercase">사용 기술</p>
                <div className="flex flex-wrap gap-[6px]">
                    {sub.stack.map((s) => (
                        <span key={s} className="body-xs px-[8px] py-[3px] rounded-full bg-gray015 text-gray060 font-medium">{s}</span>
                    ))}
                </div>
            </div>

            {/* Flow + Layer */}
            <div className="flex gap-[16px] mobile:flex-col">
                <div className="flex-1 bg-gray010 rounded-[12px] p-[16px] min-w-0">
                    {sub.processFlow
                        ? <InterviewProcessFlow steps={sub.processFlow} layers={sub.layers} />
                        : sub.flow && <FlowDiagram steps={sub.flow} />
                    }
                </div>
                <div className="bg-gray010 rounded-[12px] p-[16px] w-[240px] mobile:w-full flex-shrink-0">
                    <LayerStack layers={sub.layers} />
                </div>
            </div>

            {/* Tech reasons */}
            <div>
                <p className="heading-sm text-gray080 mb-[12px]">기술 선택 이유</p>
                <div className="flex flex-col gap-[8px]">
                    {sub.techReasons.map((r) => (
                        <div key={r.tech} className="bg-gray010 rounded-[10px] px-[16px] py-[12px]">
                            <p className={`body-xs font-bold mb-[4px] ${tagText}`}>{r.tech}</p>
                            <p className="body-sm text-gray060 leading-relaxed">{r.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function SharedInfraSection({ items }: { items: LayerItem[] }) {
    const s = layerStyles["infra"]
    return (
        <div className={`rounded-[12px] border ${s.border} ${s.bg} px-[16px] py-[14px]`}>
            <p className={`body-xs font-bold mb-[8px] tracking-widest uppercase ${s.label}`}>공통 인프라 — AWS</p>
            <div className="flex flex-wrap gap-[6px]">
                {items.map((item) => (
                    <span key={item.name} className={`body-xs px-[8px] py-[2px] rounded-full font-medium ${s.badge}`}>
                        {item.name}{item.note ? ` · ${item.note}` : ""}
                    </span>
                ))}
            </div>
        </div>
    )
}

function ProjectCard({ project }: { project: Project }) {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const hasSubProjects = !!project.subProjects?.length

    return (
        <div className={`bg-white rounded-[16px] border-l-[4px] ${project.accentColor} shadow-shadow15 overflow-hidden`}>
            {/* Header */}
            <button
                className="w-full text-left px-[28px] py-[24px] flex items-start justify-between gap-[16px]"
                onClick={() => setOpen((v) => !v)}
            >
                <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center gap-[10px] flex-wrap">
                        <span className="heading-lg text-gray080">{project.company}</span>
                        <span className={`body-xs font-bold px-[8px] py-[2px] rounded-full ${project.tagBg} ${project.tagText}`}>
                            {project.period}
                        </span>
                        {hasSubProjects && (
                            <span className="body-xs text-gray040">프로젝트 {project.subProjects!.length}개</span>
                        )}
                    </div>
                    <p className="body-sm text-gray060">{project.domain}</p>
                    <p className="body-xs text-gray040">{project.role}</p>
                </div>
                <span className={`body-lg text-gray040 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    ▾
                </span>
            </button>

            {/* Detail */}
            {open && (
                <div className="border-t border-gray020 px-[28px] pt-[24px] pb-[28px] flex flex-col gap-[24px]">
                    {hasSubProjects ? (
                        <>
                            {/* Sub-project tabs */}
                            <div className="flex gap-[0px] border-b border-gray020 overflow-x-auto">
                                {project.subProjects!.map((sub, i) => (
                                    <button
                                        key={sub.name}
                                        onClick={() => setActiveTab(i)}
                                        className={`px-[16px] py-[10px] body-sm font-bold whitespace-nowrap border-b-[2px] transition-colors duration-150 flex-shrink-0
                                            ${activeTab === i
                                                ? `${project.tagText} border-current`
                                                : "text-gray040 border-transparent hover:text-gray060"
                                            }`}
                                    >
                                        {sub.name}
                                    </button>
                                ))}
                            </div>

                            {/* Active sub-project */}
                            <SubProjectDetail
                                sub={project.subProjects![activeTab]}
                                tagText={project.tagText}
                            />

                            {/* Shared infra */}
                            {project.sharedInfra && (
                                <SharedInfraSection items={project.sharedInfra} />
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex gap-[16px] mobile:flex-col">
                                <div className="flex-1 bg-gray010 rounded-[12px] p-[16px] min-w-0">
                                    <FlowDiagram steps={project.flow!} />
                                </div>
                                <div className="bg-gray010 rounded-[12px] p-[16px] w-[220px] mobile:w-full flex-shrink-0">
                                    <LayerStack layers={project.layers!} />
                                </div>
                            </div>

                            <div>
                                <p className="heading-sm text-gray080 mb-[12px]">기술 선택 이유</p>
                                <div className="flex flex-col gap-[8px]">
                                    {project.techReasons!.map((r) => (
                                        <div key={r.tech} className="bg-gray010 rounded-[10px] px-[16px] py-[12px]">
                                            <p className={`body-xs font-bold mb-[4px] ${project.tagText}`}>{r.tech}</p>
                                            <p className="body-sm text-gray060 leading-relaxed">{r.reason}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
    return (
        <main className="flex flex-col mt-[20px]">
            <div className="flex flex-col gap-[4px]">
                <p className="heading-xl text-gray080">프로젝트 포트폴리오</p>
                <p className="body-sm text-gray040">데이터 흐름 · 레이어별 스택 · 기술 선택 이유</p>
            </div>

            <div className="flex flex-col gap-[16px] mt-[24px]">
                {projects.map((project) => (
                    <ProjectCard key={project.company} project={project} />
                ))}
            </div>
        </main>
    )
}

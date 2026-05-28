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

type Metric = {
    label: string
    value: string
    note?: string
}

type Troubleshooting = {
    problem: string
    solution: string
    techs?: string[]
}

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
    metrics?: Metric[]
    troubleshooting?: Troubleshooting[]
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
                stack: ["React", "Next.js", "NestJS", "Socket.io", "Web Worker", "VAD", "Azure STT SDK", "Redis", "MongoDB", "TanStack Query", "Zustand", "Framer Motion", "TypeScript", "Datadog RUM", "AWS S3/CloudFront"],
                metrics: [
                    { label: "소켓 재연결 복구", value: "< 2초", note: "connectionGeneration + Room Registry" },
                    { label: "음성 업로드 재시도 성공률", value: "99%+", note: "Web Worker 오프라인 큐" },
                    { label: "기관 추가 시 컴포넌트 수정", value: "0건", note: "DomainConfig 설정 파일만 추가" },
                    { label: "무음 구간 STT 전송 제거", value: "VAD 적용", note: "인식 정확도 및 API 비용 개선" },
                ],
                troubleshooting: [
                    {
                        problem: "소켓 재연결 후 이전 룸 구독이 유실되어 점수 실시간 전파가 끊기는 문제",
                        solution: "Room Registry 패턴으로 구독 정보를 클라이언트에 보관. 재연결 시 자동으로 룸에 재진입하고, connectionGeneration 값으로 stale ack를 필터링하여 중복 처리 방지.",
                        techs: ["Socket.io", "Zustand"],
                    },
                    {
                        problem: "음성 업로드 중 네트워크 단절 시 메인 스레드가 블로킹되어 면접 UI가 멈추는 현상",
                        solution: "Web Worker 내부에 재시도 큐를 두어 업로드 로직을 메인 스레드에서 완전히 분리. 실패 청크를 임시 저장 후 순서대로 재전송하며 UI 흐름을 보장.",
                        techs: ["Web Worker", "AWS S3"],
                    },
                    {
                        problem: "무음 구간까지 Azure STT에 전송되어 인식 오류 및 불필요한 API 호출 발생",
                        solution: "VAD(Voice Activity Detection)로 발화 시작·종료 구간을 감지하여 실제 발화 구간만 STT에 전달. 무음 전송을 제거해 인식 정확도를 높이고 과금을 줄임.",
                        techs: ["VAD", "Azure STT SDK"],
                    },
                    {
                        problem: "멀티테넌트 환경에서 기관별 UI 분기가 컴포넌트 곳곳에 흩어져 추가·수정 시 누락 발생",
                        solution: "DomainConfig 패턴 도입 — hostname 기반으로 기관 설정을 런타임에 로드하고, 모든 분기 로직을 단일 설정 파일에서 관리. 기관 추가 시 컴포넌트 수정 없이 설정만 추가.",
                        techs: ["Next.js"],
                    },
                    {
                        problem: "다중 화자 인터뷰에서 STT 텍스트가 발화자 구분 없이 합쳐져, 면접 레포트에서 질문·답변 분리가 불가능하고 AI 근거 생성 품질이 저하되는 문제",
                        solution: "Azure Speech SDK의 Speaker Diarization 기능을 활성화하여 발화 구간마다 화자 ID를 부여. LLM 서버로 전달하는 인터뷰 데이터에 화자 레이블을 포함해 질문자·답변자를 구조적으로 분리하고 AI 평가 근거 품질을 개선.",
                        techs: ["Azure STT SDK", "AI API"],
                    },
                ],
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
                    {
                        name: "Monitoring & Infra",
                        type: "monitoring",
                        items: [
                            { name: "Datadog RUM", note: "실서비스 에러·성능 추적" },
                            { name: "AWS S3 + CloudFront", note: "정적 배포 · CDN" },
                            { name: "GitHub Actions OIDC", note: "액세스 키 없는 배포" },
                        ],
                    },
                ],
                techReasons: [
                    { tech: "Socket.io & 재연결 상태머신", reason: "idle → bootstrapping → ready → reconnecting 5단계 상태머신으로 소켓 생명주기를 관리. connectionGeneration으로 stale ack를 차단하고, Room Registry로 재연결 시 룸 자동 복구를 구현해 점수 전파 무결성을 보장했습니다." },
                    { tech: "Web Worker", reason: "음성 업로드 실패·재시도 로직을 메인 스레드 밖으로 완전히 분리. 네트워크 단절 시에도 UI가 멈추지 않고 면접이 지속되는 것이 핵심 요구사항이었습니다." },
                    { tech: "VAD", reason: "발화 구간만 선별적으로 Azure STT에 전달해 인식 정확도를 높이고 불필요한 API 요청을 제거. 무음 구간 전송 시 발생하던 오인식 문제를 근본적으로 해결했습니다." },
                    { tech: "Azure STT SDK", reason: "한국어 스트리밍 인식 정확도와 SDK 안정성을 비교 검토 후 선택. 변환된 텍스트를 AI API에 전달해 면접 스크립트와 평가 근거를 자동 생성하는 파이프라인에 연결했습니다." },
                    { tech: "멀티테넌트 아키텍처", reason: "단일 빌드물이 hostname 기반으로 기관별 평가 UI·로직을 런타임에 자동 선택. DomainConfig 패턴으로 분기를 한 곳에서 관리해 기관 추가 시 설정 파일만 추가하면 됩니다." },
                    { tech: "Datadog RUM", reason: "면접 중 오류 발생 시 사용자 세션·스택 트레이스·성능 지표를 즉시 파악. 재현이 어려운 실서비스 버그의 원인 분석 시간을 크게 단축했습니다." },
                    { tech: "AWS S3/CloudFront & OIDC 배포", reason: "GitHub Actions OIDC로 장기 액세스 키 없이 임시 자격증명만으로 배포 자동화. index.html은 no-cache, 해시 파일은 immutable로 캐시 전략을 분리해 배포 즉시 반영을 보장했습니다." },
                ],
            },
            {
                name: "AI 도구 연동 · 개발 자동화",
                description: "Figma MCP(Model Context Protocol) 연동으로 디자인 컨텍스트를 LLM에 직결해 컴포넌트 구조를 자동 제안하고, AI 기반 테스트 자동화 파이프라인을 도입하여 반복 QA 공수를 줄인 개발 생산성 개선 작업.",
                stack: ["Figma", "MCP", "Claude API", "Playwright", "GitHub Actions", "TypeScript"],
                metrics: [
                    { label: "디자인 → 코드 구조 제안", value: "자동화", note: "Figma MCP로 LLM에 컨텍스트 직접 전달" },
                    { label: "반복 UI 회귀 테스트", value: "자동화", note: "AI 시나리오 생성 + Playwright 실행" },
                    { label: "디자인-개발 피드백 루프", value: "단축", note: "컴포넌트 명칭·구조 공유 비용 감소" },
                ],
                flow: [
                    { nodes: [{ label: "Figma 디자인", note: "컴포넌트·토큰", type: "external" }] },
                    { nodes: [{ label: "MCP 서버", note: "디자인 컨텍스트 추출", type: "server" }], arrowLabel: "컨텍스트" },
                    { nodes: [{ label: "LLM (Claude)", note: "컴포넌트 구조 제안", type: "external" }], arrowLabel: "프롬프트" },
                    { nodes: [{ label: "개발자 검토 · 적용", note: "코드 생성", type: "client" }], arrowLabel: "제안 반영" },
                ],
                layers: [
                    {
                        name: "External",
                        type: "external",
                        items: [{ name: "Figma", note: "디자인 소스" }, { name: "Claude API", note: "LLM 추론" }],
                        arrowLabel: "MCP 통신",
                    },
                    {
                        name: "Server",
                        type: "server",
                        items: [{ name: "MCP Server", note: "Figma 컨텍스트 브릿지" }, { name: "GitHub Actions", note: "테스트 자동화 CI" }],
                        arrowLabel: "파이프라인",
                    },
                    {
                        name: "Client",
                        type: "client",
                        items: [{ name: "Playwright", note: "E2E 자동 생성·실행" }, { name: "TypeScript" }],
                    },
                ],
                techReasons: [
                    { tech: "Figma MCP", reason: "Model Context Protocol을 통해 Figma 디자인 컨텍스트를 LLM에 직접 연결. 컴포넌트 명칭·구조·토큰 정보를 프롬프트에 포함시켜 구현 제안의 정확도를 높이고 디자인-개발 간 커뮤니케이션 비용을 줄였습니다." },
                    { tech: "AI 기반 테스트 자동화", reason: "반복적인 UI 회귀 시나리오를 LLM으로 생성하고 Playwright로 실행. GitHub Actions CI에 통합해 PR마다 자동 검증이 돌도록 구성하여 QA 공수를 줄이고 릴리즈 안정성을 높였습니다." },
                ],
            },
            {
                name: "결과레포트 어드민",
                description: "면접 음성·점수 데이터를 기반으로 AI 피드백을 자동 생성하고, Next.js로 구성한 PDF 레포트 화면을 Svelte 어드민에서 검토·다운로드하는 내부 관리 시스템.",
                stack: ["Svelte", "SvelteKit", "Next.js", "NestJS", "TanStack Query", "TypeScript", "MongoDB"],
                metrics: [
                    { label: "외부 PDF 변환 서비스 의존", value: "0건", note: "브라우저 Print API 직접 활용" },
                    { label: "어드민 런타임 번들", value: "경량", note: "Svelte 컴파일 타임 반응성 — React 대비 런타임 없음" },
                    { label: "AI 응답 포맷 변경 대응", value: "즉시", note: "스키마리스 MongoDB + 조건부 렌더링" },
                ],
                troubleshooting: [
                    {
                        problem: "Svelte 어드민에서 Next.js 레포트 iframe의 인쇄를 트리거하면 CSS @media print가 적용되지 않는 문제",
                        solution: "postMessage로 레포트 화면에 인쇄 신호를 전달하고, 레포트 화면 자체에서 window.print()를 호출하도록 구조 변경. iframe 부모에서 직접 제어하는 방식을 버리고 메시지 기반 인터페이스로 전환.",
                        techs: ["Next.js", "Svelte"],
                    },
                    {
                        problem: "AI 피드백 응답 포맷이 변경될 때마다 레포트 레이아웃이 깨지고 에러가 발생",
                        solution: "MongoDB 스키마리스 특성을 활용해 피드백 구조 변경을 DB 레벨에서 흡수. 프론트 렌더링은 필드 존재 여부를 체크하는 조건부 렌더링으로 방어하여 부분 데이터에도 안전하게 표시.",
                        techs: ["MongoDB", "React"],
                    },
                ],
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
                    { tech: "Next.js (레포트 화면)", reason: "AI 피드백 데이터를 서버에서 주입해 인쇄·다운로드 최적화 레이아웃을 렌더링. 브라우저 Print API와 CSS @media print를 직접 활용해 외부 PDF 변환 서비스 없이 고품질 출력을 구현했습니다." },
                    { tech: "Svelte (어드민)", reason: "어드민 특성상 무거운 런타임이 불필요. 컴파일 타임 반응성으로 번들을 가볍게 유지하면서 Next.js 레포트 화면을 iframe으로 불러와 검토·다운로드 흐름을 빠르게 구성했습니다." },
                    { tech: "MongoDB", reason: "면접마다 구조가 다른 AI 피드백 데이터를 유연하게 저장. AI 응답 포맷이 바뀌어도 스키마 마이그레이션 없이 즉시 대응할 수 있어 빠른 이터레이션에 적합했습니다." },
                ],
            },
            {
                name: "면접솔루션 제작 어드민",
                description: "면접 솔루션을 간편하게 세팅하기 위한 어드민 프로젝트. 엑셀 형태의 지원자·계정·면접 목록 데이터를 업로드하면 DB에 저장되며, 솔루션의 다양한 옵션을 UI에서 설정 가능.",
                stack: ["React", "shadcn/ui", "Radix UI", "NestJS", "MongoDB", "xlsx", "TanStack Query", "Zustand", "Tailwind CSS", "TypeScript"],
                metrics: [
                    { label: "지원자 100명 엑셀 파싱", value: "< 1초", note: "SheetJS 클라이언트 파싱" },
                    { label: "업로드 전 오류 사전 검증", value: "클라이언트 처리", note: "API 오류 요청 사전 차단" },
                    { label: "기관별 엑셀 컬럼 구조 대응", value: "설정 UI", note: "컬럼 매핑 직접 설정 가능" },
                ],
                troubleshooting: [
                    {
                        problem: "지원자 수백 명 분량의 엑셀 파일 업로드 시 파싱 중 UI가 잠시 블로킹되는 현상",
                        solution: "SheetJS의 비동기 파싱 API로 전환하고 파싱을 청크 단위로 분할 처리. 대용량 파일에서도 UI 반응성을 유지하면서 미리보기 테이블을 점진적으로 렌더링.",
                        techs: ["xlsx"],
                    },
                    {
                        problem: "기관마다 엑셀 컬럼 이름·순서가 달라 업로드 후 데이터 매핑 오류가 반복 발생",
                        solution: "컬럼 매핑 설정 UI를 어드민에 추가. 업로드 전 미리보기 단계에서 컬럼을 직접 매핑하고 오류를 표시해 운영 실수를 사전 차단.",
                        techs: ["React", "shadcn/ui"],
                    },
                ],
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
                    { tech: "shadcn/ui + Radix UI", reason: "어드민에서 반복되는 폼·테이블·다이얼로그를 접근성 보장 프리미티브 위에 조립. 컴포넌트 소스를 직접 소유해 커스텀 요구사항에 즉시 대응하면서 일관된 UI를 유지했습니다." },
                    { tech: "xlsx (SheetJS)", reason: "브라우저에서 엑셀을 직접 파싱해 서버 부담 없이 대용량 지원자 데이터를 검증 후 업로드. 업로드 전 미리보기·오류 표시로 잘못된 데이터가 DB에 들어가는 것을 사전 차단했습니다." },
                    { tech: "MongoDB", reason: "면접 설정 스키마가 기관·프로젝트마다 다르고 초기 스펙 변경이 잦습니다. 스키마리스 구조로 마이그레이션 비용 없이 빠른 이터레이션을 유지했습니다." },
                    { tech: "TanStack Query", reason: "목록·검색·페이지네이션 같은 서버 상태와 폼 입력 같은 클라이언트 상태를 명확히 분리. 캐싱·낙관적 업데이트로 어드민 UX를 개선했습니다." },
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
                metrics: [
                    { label: "다국어 라우팅 구조", value: "초기 설계 반영", note: "글로벌 확장 대비 i18n 구조 선 구축" },
                    { label: "SEO 메타데이터", value: "페이지별 동적 생성", note: "SSR generateMetadata + hreflang" },
                    { label: "장소 목록·상세 렌더링", value: "SSG + ISR", note: "빌드 캐시 + revalidate로 SEO·성능 동시 확보" },
                    { label: "에러 감지 및 CS 대응", value: "Sentry 실시간 추적", note: "스택 트레이스 + 사용자 컨텍스트" },
                ],
                troubleshooting: [
                    {
                        problem: "SSR + i18n 조합에서 서버 렌더링 결과와 클라이언트 hydration이 불일치하여 콘솔 경고 및 레이아웃 깜빡임 발생",
                        solution: "locale을 서버 컴포넌트 단에서 명시적으로 주입하고, 클라이언트 컴포넌트는 context를 통해 locale을 참조하도록 경계를 분리. 서버·클라이언트 간 locale 값이 항상 일치하도록 구조를 정비.",
                        techs: ["Next.js", "next-intl"],
                    },
                    {
                        problem: "다국어 페이지에서 SEO hreflang 태그가 누락되어 검색 엔진이 언어별 URL을 별개 페이지로 인식",
                        solution: "generateMetadata에서 지원 locale 전체를 순회하며 alternates.languages 필드에 hreflang URL을 자동 주입. 언어 추가 시 설정 배열만 업데이트하면 모든 페이지에 자동 반영.",
                        techs: ["Next.js"],
                    },
                ],
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
                        items: [{ name: "Next.js SSR / SSG / ISR", note: "페이지별 전략 분리" }, { name: "i18n (next-intl)", note: "다국어 라우팅" }, { name: "SEO Metadata API" }],
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
                    { tech: "Next.js (SSR / SSG / ISR / CSR)", reason: "미국 시장 SEO가 핵심이었습니다. 장소 목록·상세는 SSG + ISR로 빌드 캐시를 활용하면서 최신성을 유지하고, 실시간 예약 가용성은 SSR로 항상 최신 상태를 보장했습니다. 검색·필터 등 사용자 상태 의존 인터랙션은 CSR로 명시적으로 분리해 불필요한 서버 렌더링 비용을 제거했습니다." },
                    { tech: "i18n (next-intl)", reason: "초기 구조부터 글로벌 확장을 고려해 설계. App Router와 통합이 자연스럽고 locale 기반 URL 구조가 hreflang SEO에도 유리했습니다." },
                    { tech: "Sentry", reason: "운영 환경 에러를 실시간 추적하고 스택 트레이스·사용자 컨텍스트를 함께 파악. 재현이 어려운 프로덕션 버그의 원인 분석 속도를 크게 높였습니다." },
                ],
            },
            {
                name: "PHP → Next.js 마이그레이션",
                description: "PHP 기반 레거시 서비스를 Next.js로 점진적 전환. 페이지 단위로 교체하며 서비스 중단 없이 마이그레이션 완료.",
                stack: ["PHP", "Next.js", "React", "TypeScript", "Tailwind CSS"],
                metrics: [
                    { label: "서비스 다운타임", value: "0", note: "점진적 페이지 단위 전환" },
                    { label: "전환 방식", value: "병행 운영 → 순차 교체", note: "PHP와 Next.js 동시 운영 후 검증 완료 페이지부터 전환" },
                ],
                troubleshooting: [
                    {
                        problem: "PHP 라우팅 구조(쿼리 파라미터 기반)와 Next.js App Router(파일 기반) 구조가 달라 URL이 변경되면 기존 SEO 지수 손실 우려",
                        solution: "PHP URL → Next.js URL 매핑 테이블을 작성하고 redirects 설정으로 301 리다이렉트 처리. 검색 엔진 크롤링이 새 URL을 인식하도록 hreflang·canonical 태그를 병행 적용.",
                        techs: ["Next.js"],
                    },
                    {
                        problem: "PHP 서버에서 처리하던 데이터 가공 로직을 클라이언트로 이전 시 화면 깜빡임 발생",
                        solution: "Next.js Server Component로 데이터를 서버에서 가공 후 주입하는 방식으로 전환. PHP와 동일한 SSR 방식을 유지해 TTFB와 SEO를 손상 없이 이어받음.",
                        techs: ["Next.js", "React"],
                    },
                ],
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
                    { tech: "Next.js (SSR / SSG / ISR)", reason: "PHP의 서버 렌더링 방식을 유지하면서 컴포넌트 기반 구조로 전환 가능. 정적 콘텐츠는 SSG, 자주 바뀌는 데이터는 ISR, 실시간 데이터는 SSR로 페이지별 전략을 명시적으로 분리해 기존 SEO 구조를 손상 없이 이어받으면서 성능과 개발 생산성을 함께 높였습니다." },
                    { tech: "점진적 마이그레이션", reason: "전체를 한 번에 전환하면 QA 비용과 서비스 리스크가 높아집니다. PHP와 Next.js를 병행 운영하며 페이지 단위로 검증 후 교체하는 방식으로 다운타임 없이 완료했습니다." },
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
                metrics: [
                    { label: "전역 CSS 충돌", value: "0건", note: "styled-components 컴포넌트 스코프 격리" },
                    { label: "채팅방 전환 시 메시지 유실", value: "0건", note: "Redux 전역 채팅 상태 캐싱" },
                ],
                troubleshooting: [
                    {
                        problem: "채팅방을 전환할 때마다 이전 채팅방 메시지가 사라지고 다시 진입 시 API를 재호출하는 비효율 발생",
                        solution: "Redux 스토어에 채팅방 ID를 키로 메시지 리스트를 캐싱. 이미 로드한 방은 스토어에서 즉시 표시하고, WebSocket 신규 메시지만 append하여 재요청 없이 연속성을 보장.",
                        techs: ["Redux", "WebSocket"],
                    },
                    {
                        problem: "Vanilla JS 시절 전역 CSS 파일이 서로 덮어쓰며 스타일이 예측 불가능하게 충돌",
                        solution: "styled-components로 컴포넌트 단위 스코프 스타일 적용. props 기반 동적 스타일링으로 조건부 클래스 관리도 단일 파일에서 처리해 스타일 충돌을 구조적으로 제거.",
                        techs: ["styled-components", "React"],
                    },
                ],
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
                    { tech: "React", reason: "Vanilla JS 레거시의 기능 단위 분리가 어렵고 유지보수 비용이 높았습니다. 컴포넌트 아키텍처로 전환해 관심사를 분리하고 상태-UI 연결 로직을 예측 가능하게 만들었습니다." },
                    { tech: "Redux", reason: "실시간 채팅처럼 여러 컴포넌트가 공유하는 상태를 단일 스토어로 관리. 채팅방별 메시지 캐싱으로 전환 시 데이터 유실과 불필요한 API 재호출 문제를 해결했습니다." },
                    { tech: "styled-components", reason: "전역 CSS 충돌 문제를 컴포넌트 스코프 스타일로 구조적으로 제거. props 기반 동적 스타일링으로 조건부 클래스 관리도 단일 파일에서 처리해 코드 응집도를 높였습니다." },
                ],
            },
            {
                name: "앱 개발",
                description: "초기에는 Android · iOS 네이티브 앱을 직접 개발했고, 이후 WebView 방식으로 전환하며 양방향 브릿지 구조를 설계했습니다. 네이티브와 웹 양쪽을 경험하며 앱-웹 통신 구조 전반을 다뤘습니다.",
                stack: ["Android", "iOS", "Java", "Swift", "WebView", "JavaScript", "React"],
                metrics: [
                    { label: "코드베이스 통합", value: "Android + iOS 단일화", note: "WebView 전환 후 웹 코드 1벌로 양 플랫폼 대응" },
                    { label: "앱 배포 주기", value: "단축", note: "웹 업데이트는 스토어 심사 없이 즉시 반영" },
                ],
                troubleshooting: [
                    {
                        problem: "WebView 내 웹에서 카메라·위치 등 디바이스 기능을 호출할 수 없어 핵심 기능 구현이 막힘",
                        solution: "네이티브 브릿지를 설계해 웹에서 postMessage로 권한 요청·기능 호출을 네이티브에 위임. 네이티브는 결과를 다시 웹으로 콜백하는 양방향 통신 인터페이스를 구축.",
                        techs: ["WebView", "JavaScript"],
                    },
                    {
                        problem: "Android와 iOS 브릿지 API 인터페이스가 달라 웹 코드에 플랫폼 분기가 중복 삽입됨",
                        solution: "웹 레이어에 추상화 어댑터를 두어 Android/iOS 차이를 단일 인터페이스로 감쌈. 웹 코드는 플랫폼을 몰라도 되고 어댑터만 플랫폼을 감지하도록 책임을 분리.",
                        techs: ["JavaScript", "React"],
                    },
                ],
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
                    { tech: "Native → WebView 전환", reason: "초기에는 Android · iOS를 각각 네이티브로 개발했으나, 웹 기반 기능이 늘어나면서 WebView로 전환. 코드베이스를 단일화하고 배포 주기를 단축해 유지보수 비용을 줄였습니다." },
                    { tech: "WebView Bridge", reason: "카메라·위치 등 네이티브 기능을 웹에서 호출하고 웹 이벤트를 앱에 전달하는 양방향 구조 설계. 추상화 어댑터로 Android/iOS 차이를 감싸 웹 코드가 플랫폼을 모르도록 책임을 분리했습니다." },
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
                        <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-[10px] h-[10px] rounded-full border-[2px] border-blue040 bg-white flex-shrink-0 mt-[3px]" />
                            {i < steps.length - 1 && (
                                <div className="w-[1px] flex-1 bg-gray025 my-[5px]" />
                            )}
                        </div>

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

function MetricsSection({ metrics }: { metrics: Metric[] }) {
    return (
        <div>
            <p className="body-xs font-bold text-gray040 mb-[10px] tracking-widest uppercase">성과 · 지표</p>
            <div className="grid grid-cols-2 gap-[8px] mobile:grid-cols-1">
                {metrics.map((m) => (
                    <div key={m.label} className="bg-blue005 border border-blue015 rounded-[10px] px-[14px] py-[10px]">
                        <p className="body-xs text-blue040 font-bold leading-tight">{m.value}</p>
                        <p className="body-xs text-gray080 font-medium mt-[2px] leading-tight">{m.label}</p>
                        {m.note && <p className="body-xs text-gray040 mt-[2px] leading-tight">{m.note}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}

function TroubleshootingSection({ items }: { items: Troubleshooting[] }) {
    return (
        <div>
            <p className="heading-sm text-gray080 mb-[12px]">트러블슈팅</p>
            <div className="flex flex-col gap-[10px]">
                {items.map((item, i) => (
                    <div key={i} className="bg-gray010 border border-gray020 rounded-[10px] px-[16px] py-[14px] flex flex-col gap-[8px]">
                        <div className="flex items-start gap-[8px]">
                            <span className="body-xs font-bold text-red050 bg-red010 px-[6px] py-[2px] rounded-[6px] flex-shrink-0 mt-[1px]">문제</span>
                            <p className="body-sm text-gray070 leading-relaxed">{item.problem}</p>
                        </div>
                        <div className="flex items-start gap-[8px]">
                            <span className="body-xs font-bold text-green060 bg-green010 px-[6px] py-[2px] rounded-[6px] flex-shrink-0 mt-[1px]">해결</span>
                            <p className="body-sm text-gray060 leading-relaxed">{item.solution}</p>
                        </div>
                        {item.techs && item.techs.length > 0 && (
                            <div className="flex gap-[4px] flex-wrap pl-[0px]">
                                {item.techs.map((t) => (
                                    <span key={t} className={`body-xs px-[7px] py-[2px] rounded-full font-medium bg-gray020 text-gray060`}>{t}</span>
                                ))}
                            </div>
                        )}
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

            {/* Metrics */}
            {sub.metrics && sub.metrics.length > 0 && (
                <MetricsSection metrics={sub.metrics} />
            )}

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

            {/* Troubleshooting */}
            {sub.troubleshooting && sub.troubleshooting.length > 0 && (
                <TroubleshootingSection items={sub.troubleshooting} />
            )}

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

// ─── Profile card ─────────────────────────────────────────────────────────────

const coreSkills = [
    "React", "Next.js", "TypeScript", "TanStack Query", "Zustand",
    "Tailwind CSS", "Socket.io", "Web Worker", "AWS", "Datadog",
]

function ProfileCard() {
    return (
        <div className="bg-white rounded-[16px] shadow-shadow15 px-[28px] py-[24px] flex flex-col gap-[16px]">
            <div className="flex items-start justify-between gap-[12px] flex-wrap">
                <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[10px] flex-wrap">
                        <span className="heading-xl text-gray080">프론트엔드 개발자</span>
                        <span className="body-xs font-bold px-[8px] py-[2px] rounded-full bg-blue005 text-blue040">
                            6년+ · 2019.09 — 현재
                        </span>
                    </div>
                    <p className="body-sm text-gray060">
                        실시간 데이터 처리, 멀티테넌트 아키텍처, 레거시 마이그레이션까지 폭넓게 경험한 프론트엔드 개발자입니다.
                        기술 선택의 이유를 항상 문서화하고, 구조 설계부터 운영 모니터링까지 제품 전반에 관여합니다.
                    </p>
                </div>
            </div>

            <div>
                <p className="body-xs font-bold text-gray040 mb-[8px] tracking-widest uppercase">핵심 기술</p>
                <div className="flex flex-wrap gap-[6px]">
                    {coreSkills.map((s) => (
                        <span key={s} className="body-xs px-[8px] py-[3px] rounded-full bg-gray015 text-gray060 font-medium">{s}</span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-[10px] mobile:grid-cols-1">
                <div className="bg-gray010 rounded-[10px] px-[14px] py-[10px]">
                    <p className="body-xs font-bold text-blue040">B2B SaaS</p>
                    <p className="body-xs text-gray060 mt-[2px]">AI 인터뷰 · 평가 플랫폼</p>
                </div>
                <div className="bg-gray010 rounded-[10px] px-[14px] py-[10px]">
                    <p className="body-xs font-bold text-blue040">글로벌 플랫폼</p>
                    <p className="body-xs text-gray060 mt-[2px]">미국 타겟 · 다국어 SEO</p>
                </div>
                <div className="bg-gray010 rounded-[10px] px-[14px] py-[10px]">
                    <p className="body-xs font-bold text-blue040">마이그레이션</p>
                    <p className="body-xs text-gray060 mt-[2px]">Vanilla JS·PHP → React·Next.js</p>
                </div>
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
    return (
        <main className="flex flex-col mt-[20px]">
            <div className="flex flex-col gap-[4px]">
                <p className="heading-xl text-gray080">프로젝트 포트폴리오</p>
                <p className="body-sm text-gray040">데이터 흐름 · 레이어별 스택 · 기술 선택 이유 · 트러블슈팅</p>
            </div>

            <div className="flex flex-col gap-[16px] mt-[24px]">
                <ProfileCard />
                {projects.map((project) => (
                    <ProjectCard key={project.company} project={project} />
                ))}
            </div>
        </main>
    )
}

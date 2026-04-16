export default function Monitoring() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">모니터링 — Datadog RUM & Sentry</p>
            <p className="text-gray060 body-sm mt-[16px]">
                성능을 측정하고 오류를 추적하는 것은 개발만큼 중요하다.<br />
                실 사용자 데이터(Field Data) 기반으로 문제를 조기에 발견하고 대응할 수 있다.
            </p>

            {/* 모니터링 전략 개요 */}
            <div className="mt-[24px] flex gap-[8px]">
                <div className="flex-1 bg-blue005 border border-blue020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-blue040 font-bold mb-[4px]">성능 모니터링 (RUM)</p>
                    <p className="body-xs text-gray060">
                        실사용자의 Core Web Vitals, 페이지 로드 시간, 리소스 로딩 등을 수집.<br />
                        어떤 페이지/디바이스/네트워크에서 느린지 파악.
                    </p>
                    <p className="body-xs text-gray040 mt-[4px]">도구: Datadog RUM, Clarity, web-vitals</p>
                </div>
                <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">오류 추적 (Error Tracking)</p>
                    <p className="body-xs text-gray060">
                        런타임 에러, 미처리 Promise rejection, 콘솔 에러를 실시간 수집.<br />
                        스택 트레이스, 영향받은 사용자 수, 재현 경로 제공.
                    </p>
                    <p className="body-xs text-gray040 mt-[4px]">도구: Sentry, Datadog RUM (Error Tracking 포함)</p>
                </div>
            </div>

            {/* Datadog RUM */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Datadog RUM</p>
                <p className="text-gray060 body-sm">
                    Real User Monitoring. 실사용자의 성능 지표와 세션을 수집해 대시보드로 분석한다.
                </p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">초기화</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: 'YOUR_APP_ID',
    clientToken: 'YOUR_CLIENT_TOKEN',
    site: 'datadoghq.com',
    service: 'my-web-app',
    env: process.env.NODE_ENV,
    version: '1.0.0',
    sessionSampleRate: 100,         // 100% 세션 수집
    sessionReplaySampleRate: 20,    // 20%만 세션 리플레이 녹화
    trackUserInteractions: true,    // 클릭, 인풋 추적
    trackResources: true,           // 리소스 로딩 추적
    trackLongTasks: true,           // Long Task (>50ms) 추적
    defaultPrivacyLevel: 'mask-user-input',  // 개인정보 마스킹
})

// 사용자 정보 연결 — 로그인 후
datadogRum.setUser({
    id: user.id,
    name: user.name,
    email: user.email,
})`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">커스텀 액션 & 에러</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 커스텀 액션 — 비즈니스 이벤트 추적
datadogRum.addAction('checkout_start', {
    cartTotal: cart.total,
    itemCount: cart.items.length,
})

// 커스텀 에러 수집
try {
    await submitOrder()
} catch (err) {
    datadogRum.addError(err, {
        orderId: order.id,
        userId: user.id,
    })
}

// 커스텀 타이밍 — 특정 구간 성능 측정
datadogRum.addTiming('filter_applied')  // 현재 시점 마킹`}
                        </p>
                    </div>
                </div>
                <div className="mt-[4px] flex flex-col gap-[3px]">
                    {[
                        "세션 리플레이: 사용자가 실제로 어떤 동작을 했는지 영상처럼 재현",
                        "Core Web Vitals 대시보드: LCP/CLS/INP를 페이지별, 디바이스별로 집계",
                        "퍼널 분석: 특정 흐름(결제 등)에서 어디서 이탈하는지 파악",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sentry */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Sentry — 에러 추적</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">Next.js 설정</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,       // 10% 트랜잭션 추적
    replaysOnErrorSampleRate: 1, // 에러 발생 시 100% 리플레이

    // 소스맵 업로드 → 난독화된 스택 트레이스를 원본 코드로 변환
    // next.config.js의 withSentryConfig로 자동 처리
})`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[6px]">수동 에러 캡처 & 컨텍스트</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`// 예상치 못한 에러 수동 캡처
Sentry.captureException(error, {
    extra: { orderId, userId },
    tags: { page: 'checkout' },
})

// 사용자 컨텍스트 연결
Sentry.setUser({ id: user.id, email: user.email })

// 이슈 트래킹을 위한 빵가루(breadcrumb) 수동 추가
Sentry.addBreadcrumb({
    category: 'ui.click',
    message: '결제 버튼 클릭',
    level: 'info',
})`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Clarity */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Microsoft Clarity — UX 분석</p>
                <p className="text-gray060 body-sm">
                    무료 UX 분석 도구. 히트맵과 세션 리플레이로 사용자 행동 패턴 파악에 특화.
                </p>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                    {[
                        "히트맵: 어디를 많이 클릭하는지, 어디까지 스크롤하는지 시각화",
                        "세션 리플레이: 사용자 화면을 그대로 녹화 (무료, 제한 없음)",
                        "분노 클릭(Rage Click), 죽은 클릭(Dead Click) 자동 감지",
                        "Datadog/GA와 연동해 성능 이슈와 UX 문제를 함께 분석",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[6px]">
                            <span className="text-blue030 body-xs mt-[1px]">•</span>
                            <span className="body-xs text-gray060">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

        </article>
    )
}

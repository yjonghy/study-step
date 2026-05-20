export default function CachingCDN() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">브라우저 캐싱 전략 & CDN</p>
            <p className="text-gray060 body-sm mt-[16px]">
                캐싱은 이전에 가져온 리소스를 저장해두고 재사용함으로써 불필요한 네트워크 요청을 줄이는 메커니즘이다.
                CDN(Content Delivery Network)은 전 세계 엣지 서버에 콘텐츠를 분산 배포해 지연 시간을 줄인다.
            </p>

            {/* HTTP 캐시 헤더 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Cache-Control 헤더</p>
                <p className="text-gray060 body-sm">응답 헤더로 브라우저와 중간 프록시(CDN)에게 캐시 동작을 지시한다.</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["max-age=N", "N초 동안 캐시 유효 (브라우저 + 프록시)"],
                        ["s-maxage=N", "CDN 등 공유 캐시에만 적용되는 max-age"],
                        ["no-cache", "매 요청마다 서버에 유효성 확인 (조건부 요청)"],
                        ["no-store", "캐시 자체를 금지 — 민감한 데이터에 사용"],
                        ["private", "브라우저만 캐시 (CDN 캐시 금지)"],
                        ["public", "브라우저 + CDN 모두 캐시 가능"],
                        ["immutable", "캐시 기간 내 재검증 안 함 — 해시 파일에 적합"],
                        ["stale-while-revalidate=N", "만료 후 N초는 낡은 캐시 반환하면서 백그라운드 갱신"],
                    ].map(([directive, desc]) => (
                        <div key={directive} className="flex gap-[8px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <p className="body-xs font-mono text-blue030 shrink-0 w-[180px]">{directive}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 캐시 전략 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">리소스별 캐시 전략</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[6px]">정적 에셋 (JS·CSS·이미지) — 장기 캐시 + 캐시 버스팅</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# 빌드 시 파일명에 해시 포함
# main.abc123.js, style.def456.css

Cache-Control: public, max-age=31536000, immutable
# 1년 캐시, 내용이 바뀌면 URL이 달라지므로 immutable OK`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[6px]">HTML 문서 — 짧은 캐시 또는 항상 재검증</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`Cache-Control: no-cache
# 매번 서버에 확인하되, 변경 없으면 304 Not Modified로 빠르게 응답`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[6px]">API 응답 — 데이터 성격에 따라 분기</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# 자주 바뀌는 데이터
Cache-Control: no-store

# 수 초 이내 최신 데이터면 충분한 경우
Cache-Control: public, max-age=5, stale-while-revalidate=60

# 사용자별 응답
Cache-Control: private, max-age=60`}</p>
                    </div>
                </div>
            </div>

            {/* ETag & 조건부 요청 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">ETag & 조건부 요청</p>
                <p className="text-gray060 body-sm">서버는 리소스의 버전 식별자(ETag)를 응답 헤더에 담아 보낸다. 캐시가 만료되면 브라우저가 이 값을 포함해 재검증을 요청한다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`# 1. 최초 응답
HTTP/1.1 200 OK
ETag: "v1-abc123"
Cache-Control: no-cache
Content-Type: application/json
{ ... }

# 2. 캐시 만료 후 재요청 (브라우저가 ETag 전송)
GET /api/data
If-None-Match: "v1-abc123"

# 3a. 변경 없음 → 304 (본문 없음, 빠른 응답)
HTTP/1.1 304 Not Modified

# 3b. 변경됨 → 200 + 새 ETag + 새 본문
HTTP/1.1 200 OK
ETag: "v2-def456"
{ ... 새 데이터 }`}</p>
                </div>
            </div>

            {/* CDN */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CDN (Content Delivery Network)</p>
                <p className="text-gray060 body-sm">CDN은 전 세계 엣지 PoP(Point of Presence)에 콘텐츠를 복제해두고, 사용자와 가장 가까운 서버에서 응답한다. 지연시간을 줄이고 오리진 서버 부하를 낮춘다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">CDN 동작 흐름</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`사용자 → CDN 엣지 서버 (캐시 HIT) → 즉시 응답
사용자 → CDN 엣지 서버 (캐시 MISS) → 오리진 서버 → 응답 후 엣지에 캐시

# CDN이 캐시하는 헤더 예시
Cache-Control: public, s-maxage=86400
# s-maxage: CDN의 캐시 유효기간 (브라우저는 max-age 사용)`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">캐시 무효화 (Purge)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`# Cloudflare 예시 — API로 특정 URL 퍼지
curl -X POST "https://api.cloudflare.com/client/v4/zones/{id}/purge_cache" \\
  -H "Authorization: Bearer {token}" \\
  -d '{"files":["https://example.com/static/main.js"]}'

# Next.js App Router — revalidatePath / revalidateTag
import { revalidatePath } from 'next/cache';
revalidatePath('/blog');          // 경로 무효화
revalidateTag('blog-posts');      // 태그 단위 무효화`}</p>
                    </div>
                </div>
            </div>

            {/* 한눈에 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">캐시 계층 한눈에 비교</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["계층", "위치", "범위", "전형적 TTL"],
                        ["브라우저 캐시", "클라이언트", "개인", "초~년"],
                        ["Service Worker 캐시", "클라이언트", "개인·오프라인", "코드로 제어"],
                        ["CDN 엣지 캐시", "네트워크 엣지", "공유", "분~일"],
                        ["리버스 프록시 (Nginx)", "서버 앞단", "공유", "초~분"],
                        ["앱 서버 메모리", "서버 프로세스", "인스턴스", "분~시간"],
                        ["Redis / 외부 캐시", "별도 서버", "공유", "초~일"],
                    ].map(([a, b, c, d], i) => (
                        <div key={i} className={`grid grid-cols-4 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray080"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{c}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

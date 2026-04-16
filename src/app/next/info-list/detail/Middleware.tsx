export default function Middleware() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Next.js Middleware</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Middleware는 요청이 완료되기 전에 실행되는 코드다.<br />
                Edge Runtime에서 동작하여 인증 확인, 리다이렉트, 요청/응답 헤더 수정 등을 서버 응답 전에 처리한다.
            </p>

            {/* 동작 위치 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">요청 처리 흐름에서의 위치</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                    {["클라이언트 요청", "Middleware 실행", "캐시 확인", "Route Handler / Page 렌더링", "응답"].map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-[6px]">
                            <div className={`rounded-[8px] px-[10px] py-[7px] ${i === 1 ? 'bg-blue005 border border-blue030' : 'bg-gray010 border border-gray020'}`}>
                                <p className={`body-xs text-center ${i === 1 ? 'text-blue040 font-bold' : 'text-gray060'}`}>{step}</p>
                            </div>
                            {i < arr.length - 1 && <div className="w-[8px] h-[1px] bg-gray040" />}
                        </div>
                    ))}
                </div>
                <p className="body-xs text-gray040 mt-[4px]">Edge Runtime — V8 기반, Node.js API 일부 제한 (fs, crypto 등). 글로벌 CDN 엣지에서 실행되어 지연 최소화.</p>
            </div>

            {/* 기본 구조 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 구조</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// middleware.ts (프로젝트 루트)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 요청 처리 로직
  return NextResponse.next(); // 다음으로 진행
}

// 적용할 경로 패턴 설정
export const config = {
  matcher: [
    '/dashboard/:path*',   // /dashboard 하위 모든 경로
    '/api/private/:path*', // private API만
    '/((?!_next|favicon).*)' // 정적 파일 제외
  ],
};`}</p>
                </div>
            </div>

            {/* 주요 활용 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주요 활용 패턴</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">1. 인증 / 권한 체크</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // 로그인 페이지로 리다이렉트 (원래 URL 보존)
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">2. 요청 헤더 수정 / A/B 테스트</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 응답 헤더 추가
  response.headers.set('X-Custom-Header', 'value');

  // A/B 테스트 — 사용자 버킷 할당
  const bucket = Math.random() > 0.5 ? 'a' : 'b';
  response.cookies.set('ab-bucket', bucket);

  return response;
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">3. 다국어 (i18n) 라우팅</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`export function middleware(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value
    ?? request.headers.get('Accept-Language')?.split(',')[0].slice(0, 2)
    ?? 'ko';

  // /products → /ko/products 로 rewrite
  const url = request.nextUrl.clone();
  url.pathname = \`/\${locale}\${request.nextUrl.pathname}\`;
  return NextResponse.rewrite(url);
}`}</p>
                    </div>
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주의사항</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        "무거운 연산 금지 — Edge Runtime의 CPU 제한 초과 시 타임아웃",
                        "DB 직접 쿼리 금지 — 네트워크 지연 + 연결 풀 문제. JWT 검증은 가능 (crypto subtle API)",
                        "matcher 없으면 모든 요청에 실행 — 정적 파일, 이미지 등 제외 필수",
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-[8px]">
                            <div className="w-[4px] h-[4px] rounded-full bg-red050 flex-shrink-0 mt-[7px]" />
                            <p className="body-xs text-gray060">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

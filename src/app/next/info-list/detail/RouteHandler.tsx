export default function RouteHandler() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Route Handler</p>
            <p className="text-gray060 body-sm mt-[16px]">
                App Router에서 <span className="font-mono text-gray080">app/api/.../route.ts</span> 파일로 API 엔드포인트를 만드는 방식이다.
                Pages Router의 <span className="font-mono text-gray080">pages/api</span>를 대체하며, Web 표준 <span className="font-mono text-gray080">Request / Response</span>를 사용해 더 직관적이다.
            </p>

            {/* 기본 구조 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 구조</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}

// 지원 메서드: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS`}</p>
                </div>
                <p className="body-xs text-gray040 mt-[4px]">같은 파일에 여러 HTTP 메서드를 export해서 처리한다.</p>
            </div>

            {/* 동적 라우트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">동적 세그먼트 & params</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.user.delete({ where: { id } });
  return new Response(null, { status: 204 });
}`}</p>
                </div>
            </div>

            {/* 쿼리스트링 & 헤더 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">쿼리스트링 · 헤더 · 쿠키</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // 쿼리스트링
  const page  = request.nextUrl.searchParams.get('page') ?? '1';
  const limit = request.nextUrl.searchParams.get('limit') ?? '20';

  // 헤더
  const auth = request.headers.get('Authorization');

  // 쿠키 (서버 사이드)
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  const data = await fetchData({ page: +page, limit: +limit });
  return NextResponse.json(data);
}`}</p>
                </div>
            </div>

            {/* 미들웨어 vs Route Handler */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">캐싱 동작</p>
                <p className="text-gray060 body-sm">Route Handler는 기본적으로 <strong>캐시되지 않는다</strong>. 정적 응답이 필요하면 명시적으로 설정해야 한다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">정적 캐시 (빌드 시 생성)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ version: '1.0' });
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Revalidate (ISR 방식)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`export const revalidate = 60; // 60초마다 재생성

export async function GET() {
  const data = await fetchFromCMS();
  return NextResponse.json(data);
}`}</p>
                    </div>
                </div>
            </div>

            {/* CORS 처리 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">CORS 헤더 설정</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  const data = await fetchData();
  return NextResponse.json(data, { headers: corsHeaders });
}`}</p>
                </div>
            </div>

            {/* Pages API vs Route Handler */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Pages Router API vs Route Handler 비교</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "pages/api (Pages Router)", "route.ts (App Router)"],
                        ["파일 위치", "pages/api/users.ts", "app/api/users/route.ts"],
                        ["요청 객체", "NextApiRequest", "Web API Request"],
                        ["응답 방식", "res.json() / res.send()", "NextResponse.json()"],
                        ["메서드 분기", "switch(req.method)", "export function GET/POST"],
                        ["Edge 런타임", "미지원", "export const runtime = 'edge'"],
                        ["스트리밍", "제한적", "ReadableStream 완전 지원"],
                    ].map(([label, a, b], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{label}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

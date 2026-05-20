export default function TanStackRouter() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">TanStack Router — 파일 기반 라우팅</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <span className="font-mono text-gray080">TanStack Router</span>는 타입 안전성과 파일 기반 라우팅을 중심으로 설계된 React 라우팅 라이브러리다.
                React Router와 달리 <strong>라우트 트리가 자동 생성</strong>되고, <strong>URL 파라미터·검색 파라미터까지 타입 추론</strong>이 가능하다.
            </p>

            {/* React Router vs TanStack Router */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React Router vs TanStack Router</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "React Router v6", "TanStack Router"],
                        ["라우트 정의", "코드(JSX)로 직접 작성", "파일 기반 자동 생성"],
                        ["타입 안전성", "부분적 (제한적)", "100% 타입 추론"],
                        ["Search Params", "문자열 직접 파싱", "Zod 등으로 검증·추론"],
                        ["Loader / Action", "별도 설정", "라우트 파일에 내장"],
                        ["DevTools", "별도 패키지", "내장 DevTools 제공"],
                        ["번들 크기", "~10KB", "~15KB"],
                        ["주요 사용 사례", "SPA, 대부분의 프로젝트", "타입 안전성이 중요한 어드민"],
                    ].map(([a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-blue040"}`}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 파일 기반 라우팅 구조 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">파일 기반 라우팅 구조</p>
                <p className="text-gray060 body-sm">
                    <span className="font-mono text-gray080">src/routes/</span> 하위에 파일을 추가하면 라우트가 자동 생성된다.
                    <span className="font-mono text-gray080">routeTree.gen.ts</span>는 자동 생성 파일이므로 직접 수정하지 않는다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">파일 → URL 매핑</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`src/routes/
├── __root.tsx          → / (루트 레이아웃)
├── index.tsx           → / (홈)
├── about.tsx           → /about
├── posts/
│   ├── index.tsx       → /posts
│   └── $postId.tsx     → /posts/:postId  (동적 세그먼트)
├── (auth)/             → 레이아웃 그룹 (URL에 미포함)
│   └── login.tsx       → /login
└── _authenticated/     → 레이아웃 라우트 (인증 보호)
    └── dashboard.tsx   → /dashboard`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">파일 명명 규칙</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`$param.tsx       → 동적 라우트 (/posts/:postId)
_layout.tsx      → 레이아웃 라우트 (URL에 미포함)
(group)/         → 레이아웃 그룹 (URL에 미포함)
index.tsx        → 부모 경로의 index
lazy.tsx         → 코드 스플리팅 적용 (자동)`}</p>
                    </div>
                </div>
            </div>

            {/* 타입 안전한 라우트 링크 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">타입 안전한 네비게이션</p>
                <p className="text-gray060 body-sm">
                    존재하지 않는 경로나 잘못된 파라미터를 사용하면 <strong>컴파일 타임에 에러</strong>가 발생한다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Link 컴포넌트</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`import { Link } from "@tanstack/react-router";

// ✅ 타입 안전 — 잘못된 to 경로는 컴파일 에러
<Link to="/posts/$postId" params={{ postId: "123" }}>
  게시글 보기
</Link>

// ✅ search params도 타입 추론
<Link
  to="/search"
  search={{ q: "react", page: 1 }}
>
  검색
</Link>`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">useNavigate / useParams</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`import { useNavigate, useParams } from "@tanstack/react-router";

function PostPage() {
  // postId 타입이 자동 추론됨 (string)
  const { postId } = useParams({ from: "/posts/$postId" });

  const navigate = useNavigate();

  const goBack = () => navigate({ to: "/posts" });

  return <div>Post ID: {postId}</div>;
}`}</p>
                    </div>
                </div>
            </div>

            {/* Search Params 검증 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Search Params 타입 검증 (Zod)</p>
                <p className="text-gray060 body-sm">
                    URL 검색 파라미터를 Zod 스키마로 검증·파싱할 수 있다.
                    잘못된 값이 들어오면 기본값으로 대체되어 런타임 에러를 방지한다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// routes/search.tsx
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().default(""),
  page: z.number().int().min(1).default(1),
  sort: z.enum(["latest", "popular"]).default("latest"),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
});

function SearchPage() {
  // 완전한 타입 추론 { q: string, page: number, sort: "latest" | "popular" }
  const { q, page, sort } = Route.useSearch();

  return <div>검색어: {q}, 페이지: {page}</div>;
}`}</p>
                </div>
            </div>

            {/* Loader */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Loader — 라우트별 데이터 로딩</p>
                <p className="text-gray060 body-sm">
                    각 라우트 파일에 <span className="font-mono text-gray080">loader</span> 함수를 정의하면 컴포넌트 렌더링 전 데이터를 prefetch한다.
                    TanStack Query와 함께 쓰면 캐싱·무효화까지 완전히 통합된다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">기본 Loader</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// routes/posts/$postId.tsx
export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    return { post };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData(); // 타입 추론됨
  return <div>{post.title}</div>;
}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">TanStack Query 통합</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`import { queryOptions } from "@tanstack/react-query";

const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(postQueryOptions(params.postId)),

  component: function PostPage() {
    const { postId } = Route.useParams();
    // 이미 로더에서 캐시됐으므로 suspense 없이 즉시 데이터 접근
    const { data } = useSuspenseQuery(postQueryOptions(postId));
    return <div>{data.title}</div>;
  },
});`}</p>
                    </div>
                </div>
            </div>

            {/* 인증 보호 라우트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">인증 보호 라우트 (_authenticated)</p>
                <p className="text-gray060 body-sm">
                    레이아웃 라우트로 인증 검사를 한 번만 작성하면 하위 라우트 전체에 적용된다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// routes/_authenticated/route.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});

// routes/_authenticated/dashboard.tsx
// → /dashboard 접근 시 _authenticated/route.tsx의 beforeLoad가 먼저 실행`}</p>
                </div>
            </div>

            {/* 핵심 정리 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">TanStack Router 선택 기준</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• 타입 안전성이 최우선: URL 파라미터·Search Params까지 타입 추론 → TanStack Router</p>
                    <p className="body-xs text-blue030">• 파일 기반 라우팅: 라우트 파일 추가만으로 자동 등록 → 대규모 어드민에 유리</p>
                    <p className="body-xs text-blue030">• routeTree.gen.ts는 자동 생성 파일 — pnpm dev 실행 시 자동 갱신, 직접 수정 금지</p>
                    <p className="body-xs text-blue030">• TanStack Query와 조합하면 Loader + Cache 완전 통합 — waterfall 없는 데이터 로딩</p>
                    <p className="body-xs text-blue030">• 일반 SPA·Next.js 프로젝트: React Router v6 또는 Next.js 내장 라우터로 충분</p>
                </div>
            </div>
        </article>
    )
}

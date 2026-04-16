export default function NextMetadata() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">메타데이터 & SEO</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Next.js App Router는 <code>metadata</code> 객체 또는 <code>generateMetadata</code> 함수로 SEO 메타데이터를 관리한다.<br />
                서버에서 HTML에 직접 삽입되므로 CSR보다 SEO에 유리하다.
            </p>

            {/* 정적 메타데이터 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">정적 메타데이터</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// app/blog/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '블로그',
    description: '개발 블로그입니다',
    openGraph: {
        title: '블로그',
        description: '개발 블로그입니다',
        images: ['/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
    },
}`}
                    </p>
                </div>
            </div>

            {/* 동적 메타데이터 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">동적 메타데이터 — generateMetadata</p>
                <p className="text-gray060 body-sm">동적 라우트에서 API 데이터를 기반으로 메타데이터를 생성할 때 사용한다.</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// app/blog/[id]/page.tsx
import { Metadata } from 'next'

export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const post = await fetchPost(params.id)

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            images: [post.thumbnail],
        },
    }
}`}
                    </p>
                </div>
            </div>

            {/* 메타데이터 상속 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">메타데이터 상속 & 템플릿</p>
                <p className="text-gray060 body-sm">
                    layout.tsx의 metadata가 기본값이 되고, 각 page.tsx에서 덮어쓸 수 있다.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`// app/layout.tsx — 기본 메타데이터
export const metadata: Metadata = {
    title: {
        template: '%s | 사이트명',  // %s 자리에 각 페이지 title이 들어감
        default: '사이트명',        // title 없는 페이지의 기본값
    },
}

// app/blog/page.tsx
export const metadata: Metadata = {
    title: '블로그',  // → "블로그 | 사이트명" 으로 렌더링됨
}`}
                    </p>
                </div>
            </div>

            {/* robots, sitemap */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">robots.txt & sitemap.xml 자동 생성</p>
                <div className="mt-[6px] flex flex-col gap-[6px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">app/robots.ts</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: 'https://example.com/sitemap.xml',
    }
}`}
                        </p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray080 font-bold mb-[4px]">app/sitemap.ts</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">
                            {`import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await fetchAllPosts()
    return posts.map(post => ({
        url: \`https://example.com/blog/\${post.id}\`,
        lastModified: post.updatedAt,
    }))
}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* 이전 Pages Router */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Pages Router — next/head</p>
                <p className="text-gray060 body-sm">Pages Router에서는 next/head 컴포넌트로 직접 head를 조작했다.</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`import Head from 'next/head'

export default function Page() {
    return (
        <>
            <Head>
                <title>페이지 제목</title>
                <meta name="description" content="설명" />
            </Head>
            <main>...</main>
        </>
    )
}`}
                    </p>
                </div>
            </div>

        </article>
    )
}

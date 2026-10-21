import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPortfolioProject, portfolioProjects } from "../../projects"
import styles from "./project.module.css"

type ProjectPageProps = { params: { slug: string } }

export function generateStaticParams() {
    return portfolioProjects.map(project => ({ slug: project.slug }))
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
    const project = getPortfolioProject(params.slug)
    if (!project) return {}
    return {
        title: `${project.title} — 유종현 포트폴리오`,
        description: project.summary,
    }
}

function ArrowIcon({ reverse = false }: { reverse?: boolean }) {
    return <svg className={reverse ? styles.reverse : undefined} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = getPortfolioProject(params.slug)
    if (!project) notFound()

    const projectIndex = portfolioProjects.findIndex(item => item.slug === project.slug)
    const previous = portfolioProjects[(projectIndex - 1 + portfolioProjects.length) % portfolioProjects.length]
    const next = portfolioProjects[(projectIndex + 1) % portfolioProjects.length]

    return <div className={styles.page}>
        <header className={styles.header}>
            <Link className={styles.wordmark} href="/portfolio" aria-label="유종현 포트폴리오 홈">YU<br />JONGHYEON</Link>
            <nav aria-label="프로젝트 상세 탐색">
                <Link href="/portfolio#work">주요 프로젝트</Link>
                <Link href="/portfolio#archive">전체 프로젝트</Link>
            </nav>
            <span>Project {String(projectIndex + 1).padStart(2, "0")} / {portfolioProjects.length}</span>
        </header>

        <main>
            <article>
                <section className={styles.hero} aria-labelledby="project-title">
                    <div className={styles.heroTitle}>
                        <Link href="/portfolio#archive" className={styles.backLink}><ArrowIcon reverse /> 전체 프로젝트</Link>
                        <h1 id="project-title">{project.title}</h1>
                    </div>
                    <dl className={styles.meta}>
                        <div><dt>회사·서비스</dt><dd>{project.company}</dd></div>
                        <div><dt>기간</dt><dd>{project.period}</dd></div>
                        <div><dt>영역</dt><dd>{project.domain}</dd></div>
                    </dl>
                    <p className={styles.summary}>{project.summary}</p>
                </section>

                <section className={styles.overview} aria-labelledby="overview-title">
                    <h2 id="overview-title">프로젝트 한눈에 보기</h2>
                    <dl>
                        <div><dt>무엇을 만들었나</dt><dd>{project.overview.product}</dd></div>
                        <div><dt>어떤 과제였나</dt><dd>{project.overview.challenge}</dd></div>
                        <div><dt>어떻게 기여했나</dt><dd>{project.overview.contribution}</dd></div>
                    </dl>
                </section>

                <section className={styles.flowSection} aria-labelledby="flow-title">
                    <div className={styles.sectionLabel} id="flow-title">프로젝트 흐름</div>
                    <div className={styles.flow} aria-label={`프로젝트 진행 순서: ${project.flow.join(" → ")}`}>
                        {project.flow.map((step, index) => <div key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span></div>)}
                    </div>
                </section>

                <section className={styles.role} aria-labelledby="role-title">
                    <h2 id="role-title">제가 맡은 역할</h2>
                    <p>{project.role}</p>
                </section>

                <section className={styles.usage} aria-labelledby="usage-title">
                    <div className={styles.usageIntro}>
                        <h2 id="usage-title">프로덕트 사용 흐름</h2>
                        <p>사용자가 프로덕트에 진입한 뒤 핵심 목적을 달성하기까지의 실제 흐름입니다.</p>
                    </div>
                    <ol>
                        {project.usageFlow.map((step, index) => <li key={step.title}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </li>)}
                    </ol>
                </section>

                <section className={styles.systemMap} aria-labelledby="system-map-title">
                    <div className={styles.systemMapIntro}>
                        <h2 id="system-map-title">구조와 책임 경계</h2>
                        <p>화면에서 시작한 사용 흐름이 상태와 업무 규칙을 거쳐 어떤 기술 기반으로 이어지는지 정리했습니다.</p>
                    </div>
                    <ol aria-label="프로젝트 구조: 사용자 접점에서 기술 기반까지">
                        <li>
                            <span>사용자·운영 접점</span>
                            <strong>{project.usageFlow.slice(0, 2).map(step => step.title).join(" · ")}</strong>
                            <p>{project.overview.product}</p>
                        </li>
                        <li>
                            <span>상태·업무 흐름</span>
                            <strong>{project.flow.join(" → ")}</strong>
                            <p>{project.overview.contribution}</p>
                        </li>
                        <li>
                            <span>기술·데이터 경계</span>
                            <strong>{project.stack.slice(0, 4).join(" · ")}</strong>
                            <p>{project.techDetails[0].purpose}</p>
                        </li>
                    </ol>
                </section>

                <div className={styles.story}>
                    <aside aria-label="프로젝트 기술 범위">
                        <h2>기술 범위</h2>
                        <ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
                    </aside>
                    <div className={styles.narrative}>
                        <section aria-labelledby="issues-title">
                            <h2 id="issues-title">해결해야 했던 문제</h2>
                            <ol>{project.issues.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
                        </section>
                        <section aria-labelledby="solutions-title">
                            <h2 id="solutions-title">설계와 구현</h2>
                            <ol>{project.solutions.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
                        </section>
                        <section className={styles.techDetails} aria-labelledby="tech-details-title">
                            <h2 id="tech-details-title">기술 선택과 역할</h2>
                            <dl>
                                {project.techDetails.map(item => <div key={item.name}>
                                    <dt>{item.name}</dt>
                                    <dd>{item.purpose}</dd>
                                </div>)}
                            </dl>
                        </section>
                        <section className={styles.outcomes} aria-labelledby="outcomes-title">
                            <h2 id="outcomes-title">만들어낸 결과</h2>
                            <ol>{project.outcomes.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
                        </section>
                    </div>
                </div>
            </article>

            <nav className={styles.projectNav} aria-label="이전 및 다음 프로젝트">
                <Link href={`/portfolio/projects/${previous.slug}`}><span><ArrowIcon reverse /> 이전 프로젝트</span><strong>{previous.title}</strong></Link>
                <Link href={`/portfolio/projects/${next.slug}`}><span>다음 프로젝트 <ArrowIcon /></span><strong>{next.title}</strong></Link>
            </nav>
        </main>

        <footer className={styles.footer}>
            <Link href="/portfolio">포트폴리오 홈으로 <ArrowIcon /></Link>
            <span>유종현 · Frontend Engineer</span>
        </footer>
    </div>
}

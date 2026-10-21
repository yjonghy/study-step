"use client"

import { KeyboardEvent, useEffect, useState } from "react"
import Link from "next/link"
import styles from "./portfolio.module.css"
import { featuredProjects, portfolioProjects } from "./projects"

function ArrowIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg> }

const careerDomains = [
    {
        title: "AI 면접 운영",
        description: "면접 진행·평가부터 녹음, AI 분석, 운영 Admin까지 사용자와 운영자의 전체 흐름을 연결했습니다.",
    },
    {
        title: "글로벌 장소 대여",
        description: "미국 사용자의 탐색·상세·예약을 만들고, 운영 중인 PHP 서비스를 Next.js로 점진 전환했습니다.",
    },
    {
        title: "웹·앱 서비스",
        description: "검색·지도·실시간 채팅부터 WebView 브릿지와 iOS·Android 사용자 흐름까지 개발했습니다.",
    },
]

export default function Portfolio() {
    const [active, setActive] = useState(0)
    const [scrolled, setScrolled] = useState(false)
    const current = featuredProjects[active]
    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 28)
        update(); window.addEventListener("scroll", update, { passive: true })
        return () => window.removeEventListener("scroll", update)
    }, [])

    const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const last = featuredProjects.length - 1
        const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (index === last ? 0 : index + 1)
            : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index === 0 ? last : index - 1)
            : event.key === "Home" ? 0 : event.key === "End" ? last : null
        if (next === null) return
        event.preventDefault()
        setActive(next)
        document.getElementById(`case-tab-${next}`)?.focus()
    }

    return <div className={styles.page}>
        <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
            <a className={styles.wordmark} href="#top" aria-label="유종현 포트폴리오 홈">YU<br />JONGHYEON</a>
            <nav aria-label="포트폴리오 탐색"><a href="#work">주요 프로젝트</a><a href="#archive">전체 경력</a><a href="#contact">연락처</a></nav>
            <span className={styles.availability}>Frontend Engineer · Seoul</span>
        </header>

        <main id="top">
            <section className={styles.hero} aria-labelledby="hero-title">
                <div className={styles.heroCopy}>
                    <h1 id="hero-title">복잡한 요구를<br /><span>작동하는 구조</span>로.</h1>
                    <p>약 7년간 실시간 AI 면접, 글로벌 플랫폼, 레거시 전환을 경험했습니다. 화면만 만드는 대신 데이터와 운영의 경계를 설계합니다.</p>
                    <a className={styles.primaryLink} href="#work">대표 작업 보기 <ArrowIcon /></a>
                </div>
                {/* <div className={styles.signal} aria-label="핵심 역량 시각화">
                    <div className={styles.signalRail}><span>PRODUCT</span><span>ARCHITECTURE</span><span>RELIABILITY</span></div>
                    <div className={styles.signalTrack}>{[18,34,58,78,46,88,62,96,70,42,84,55,92,68,38,76].map((height,i)=><i key={i} style={{"--h":`${height}%`,"--d":`${i*45}ms`} as React.CSSProperties}/>)}</div>
                    <div className={styles.signalStatement}><p>문제를 관측하고<br />실패를 복구하며<br />확장을 준비합니다.</p></div>
                </div> */}
                <div className={styles.heroFoot}><span>React · Next.js · TypeScript · NestJS</span><span>Scroll to explore ↓</span></div>
            </section>

            <section className={styles.careerOverview} aria-labelledby="career-overview-title">
                <div className={styles.careerOverviewIntro}>
                    <h2 id="career-overview-title">한눈에 보는 경력</h2>
                    <p>기능 구현에 머물지 않고, 비개발자의 업무를 제품 흐름으로 구체화해 프론트엔드와 서버까지 연결해 왔습니다.</p>
                </div>
                <div className={styles.careerDomains}>
                    {careerDomains.map((domain, index) => <article key={domain.title}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <h3>{domain.title}</h3>
                        <p>{domain.description}</p>
                    </article>)}
                </div>
            </section>

            <section className={styles.work} id="work" aria-labelledby="work-title">
                <div className={styles.sectionIntro}><h2 id="work-title">주요 프로젝트</h2><p>기술의 이름보다 어떤 경계를 설계했고, 실패를 어떻게 통제했는지 보여주는 네 가지 사례입니다.</p></div>
                <div className={styles.caseShell}>
                    <div className={styles.caseTabs} role="tablist" aria-label="대표 프로젝트 선택">
                        {featuredProjects.map((item,index)=><button key={item.slug} id={`case-tab-${index}`} role="tab" tabIndex={active===index?0:-1} aria-selected={active===index} aria-controls="case-panel" onClick={()=>setActive(index)} onKeyDown={(event)=>moveTab(event,index)}>{item.featureTitle?.replace("\n"," ") ?? item.title}</button>)}
                    </div>
                    <article className={styles.casePanel} id="case-panel" role="tabpanel" aria-labelledby={`case-tab-${active}`} key={current.slug}>
                        <div className={styles.caseHeadline}><div><h3>{(current.featureTitle ?? current.title).split("\n").map(line=><span key={line}>{line}</span>)}</h3></div><div className={styles.caseMeta}><span>{current.company}</span><span>{current.period}</span><span>{current.domain}</span></div></div>
                        <p className={styles.thesis}>{current.summary}</p>
                        <div className={styles.flow} aria-label="프로젝트 처리 흐름">{current.flow.map((step,index)=><div key={step}><b>{String(index+1).padStart(2,"0")}</b><span>{step}</span></div>)}</div>
                        <div className={styles.caseOverview}><div><span>프로덕트</span><p>{current.overview?.product ?? current.summary}</p></div><div><span>핵심 과제</span><p>{current.overview?.challenge ?? current.issues[0]}</p></div><div><span>기여</span><p>{current.overview?.contribution ?? current.role}</p></div></div>
                        <div className={styles.caseNarrative}><div><span>문제</span><p>{current.issues.slice(0, 2).join(" ")}</p></div><div><span>설계</span><p>{current.solutions.slice(0, 2).join(" ")}</p></div><div><span>결과</span><p>{current.outcomes.join(" ")}</p></div></div>
                        <div className={styles.caseProof}><div><span>검증된 결과</span>{current.proof?.map(item=><strong key={item}>{item}</strong>)}</div><div><span>기술 범위</span><p>{current.stack.join(" · ")}</p></div></div>
                        <Link className={styles.caseDetailLink} href={`/portfolio/projects/${current.slug}`}>프로젝트 상세 보기 <ArrowIcon /></Link>
                    </article>
                </div>
            </section>

            <section className={styles.archive} id="archive" aria-labelledby="archive-title">
                <div className={styles.archiveHeading}><h2 id="archive-title">3개 도메인에서 고른, 12개 주요 프로젝트.</h2><p>지금까지 수행한 업무 중 AI 면접 운영부터 글로벌 장소 대여와 웹·앱 경계까지, 제 역할과 기술적 판단이 잘 드러나는 사례를 선별했습니다.</p></div>
                <ol className={styles.projectList}>{portfolioProjects.map(project=><li key={project.slug}><Link href={`/portfolio/projects/${project.slug}`}><strong>{project.title}</strong><p>{project.listNote}</p><ArrowIcon /></Link></li>)}</ol>
            </section>
            <section className={`${styles.principles}`} aria-labelledby="principles-title"><h2 id="principles-title">제가 만드는 것은 화면보다 오래 남는<br /><span>판단기준</span>입니다.</h2><div><p><b>관측 가능하게</b>운영 데이터로 재현 조건을 찾습니다.</p><p><b>복구 가능하게</b>단절과 실패를 정상 흐름에 포함합니다.</p><p><b>확장 가능하게</b>공통 흐름과 도메인 정책을 분리합니다.</p></div></section>
        </main>
        <footer className={styles.footer} id="contact"><p>복잡한 문제를 함께 풀 팀을 찾고 있습니다.</p><a href="mailto:whdgus9269@gmail.com">whdgus9269@gmail.com <ArrowIcon /></a><div><span>유종현 · Frontend Engineer</span><span>Portfolio 2026</span></div></footer>
    </div>
}

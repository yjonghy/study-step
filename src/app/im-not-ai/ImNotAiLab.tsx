"use client"

import { useMemo, useState } from "react"
import styles from "./im-not-ai.module.css"

type Severity = "S1" | "S2" | "S3"
type Genre = "자동" | "칼럼" | "리포트" | "블로그" | "공적 문서"
type Finding = { id: string; severity: Severity; label: string; count: number; samples: string[] }
type Rule = { id: string; severity: Severity; label: string; regex: RegExp; replace?: (value: string) => string }

const SAMPLE = `결론적으로, AI 기술을 통해 업무 효율성을 향상시킬 수 있다. 또한 조직의 경쟁력 강화에 있어서 매우 중요한 역할을 가지고 있다. 첫째, 반복 업무를 자동화할 수 있다. 둘째, 데이터에 기반하여 더 나은 의사결정을 내릴 수 있다. 셋째, 사용자 경험을 혁신적으로 개선할 수 있다. 이를 통해 기업의 지속 가능한 성장으로 이어질 수 있다는 점은 주목할 만하다.`

const RULES: Rule[] = [
    { id: "D-1", severity: "S1", label: "결산형 관용구", regex: /결론적으로|요약하면|정리하자면/g, replace: () => "" },
    { id: "D-2", severity: "S1", label: "의미를 부풀리는 평가", regex: /시사하는 바가 크다|주목할 만하다|매우 중요하다/g, replace: (v) => v === "매우 중요하다" ? "중요하다" : "" },
    { id: "A-3", severity: "S1", label: "번역투 ‘~에 있어서’", regex: /에 있어서/g, replace: () => "에서" },
    { id: "A-7", severity: "S1", label: "have 직역 ‘가지고 있다’", regex: /가지고 있다/g, replace: () => "갖췄다" },
    { id: "A-8", severity: "S1", label: "이중 피동", regex: /되어진다|되어졌다|보여진다/g, replace: (v) => v.replace("되어진", "된").replace("보여진", "보인") },
    { id: "C-11", severity: "S1", label: "연결어미 뒤 쉼표", regex: /(?:고|며|지만|면서|아서|어서),/g, replace: (v) => v.slice(0, -1) },
    { id: "A-6", severity: "S2", label: "‘~에 기반하여’ 남용", regex: /에 기반하여|를 바탕으로/g, replace: () => "로" },
    { id: "A-9", severity: "S2", label: "‘~에 의해’ 피동", regex: /에 의해/g, replace: () => "가" },
    { id: "D-3", severity: "S2", label: "열거 도입구", regex: /크게 세 가지로 나눌 수 있다|다음과 같은/g, replace: () => "" },
    { id: "D-9", severity: "S2", label: "결산형 ‘이어진다’", regex: /으로 이어질 수 있다|로 이어질 수 있다/g, replace: () => "을 만든다" },
    { id: "I-3", severity: "S2", label: "‘~다는 것이다’ 종결", regex: /다는 것이다/g, replace: () => "다" },
    { id: "H-4", severity: "S2", label: "문두 접속사", regex: /(?:^|[.!?]\s+)(또한|따라서|즉|나아가)(?:,)?/gm, replace: (v) => v.replace(/(또한|따라서|즉|나아가),?/, "") },
    { id: "J-1", severity: "S3", label: "볼드 강조", regex: /\*\*[^*]+\*\*/g, replace: (v) => v.slice(2, -2) },
]

const severityRank: Record<Severity, number> = { S1: 3, S2: 2, S3: 1 }

function inspect(text: string, minimum: Severity) {
    return RULES.flatMap((rule) => {
        if (severityRank[rule.severity] < severityRank[minimum]) return []
        const matches = [...text.matchAll(new RegExp(rule.regex.source, rule.regex.flags))].map((match) => match[0])
        return matches.length ? [{ id: rule.id, severity: rule.severity, label: rule.label, count: matches.length, samples: [...new Set(matches)].slice(0, 3) }] : []
    })
}

function rewrite(text: string, minimum: Severity) {
    let next = text
    RULES.forEach((rule) => {
        if (!rule.replace || severityRank[rule.severity] < severityRank[minimum]) return
        next = next.replace(new RegExp(rule.regex.source, rule.regex.flags), rule.replace)
    })
    return next.replace(/다는 점은\s*[.]/g, "다.").replace(/^[\s,.]+/, "").replace(/\s+([,.!?])/g, "$1").replace(/[ \t]{2,}/g, " ").replace(/^\s+/gm, "").trim()
}

function diffRate(before: string, after: string) {
    if (!before.length) return 0
    const tokenize = (value: string) => value.match(/[가-힣A-Za-z0-9]+/g) ?? []
    const source = tokenize(before)
    const target = tokenize(after)
    const counts = new Map<string, number>()
    source.forEach((token) => counts.set(token, (counts.get(token) ?? 0) + 1))
    let preserved = 0
    target.forEach((token) => {
        const count = counts.get(token) ?? 0
        if (count > 0) { preserved += 1; counts.set(token, count - 1) }
    })
    return Math.min(100, Math.round(((Math.max(source.length, target.length) - preserved) / Math.max(source.length, target.length, 1)) * 100))
}

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg> }

export default function ImNotAiLab() {
    const [text, setText] = useState(SAMPLE)
    const [genre, setGenre] = useState<Genre>("자동")
    const [minimum, setMinimum] = useState<Severity>("S2")
    const [result, setResult] = useState("")
    const [copied, setCopied] = useState(false)
    const findings = useMemo(() => inspect(text, minimum), [text, minimum])
    const total = findings.reduce((sum, item) => sum + item.count, 0)
    const changeRate = result ? diffRate(text, result) : 0

    const run = () => { setResult(rewrite(text, minimum)); setCopied(false) }
    const copy = async () => { if (!result) return; await navigator.clipboard.writeText(result); setCopied(true) }

    return <main className={styles.page}>
        <header className={styles.header}>
            <a href="/im-not-ai" className={styles.brand}>I’M<br />NOT AI</a>
            <div className={styles.local}><i /> LOCAL ONLY</div>
            <a href="https://github.com/epoko77-ai/im-not-ai" target="_blank" rel="noreferrer">원본 프로젝트 ↗</a>
        </header>

        <section className={styles.intro}>
            <h1>글의 내용은 그대로.<br /><span>AI 티만 덜어냅니다.</span></h1>
            <p>번역투, 기계적인 병렬, 관용구를 찾아 근거와 함께 보여줍니다. 지금은 브라우저 안에서만 작동하는 로컬 규칙 데모입니다.</p>
        </section>

        <section className={styles.workspace} aria-label="한국어 AI 문체 진단 도구">
            <div className={styles.editor}>
                <div className={styles.editorHead}><h2>원문</h2><span>{text.length.toLocaleString()} / 10,000자</span></div>
                <textarea value={text} maxLength={10000} onChange={(event) => { setText(event.target.value); setResult("") }} aria-label="윤문할 한국어 원문" spellCheck="false" />
                <div className={styles.editorFoot}><button type="button" onClick={() => { setText(SAMPLE); setResult("") }}>예시 불러오기</button><button type="button" onClick={() => { setText(""); setResult("") }}>비우기</button></div>
            </div>

            <aside className={styles.controls}>
                <fieldset><legend>글의 장르</legend><div className={styles.optionGrid}>{(["자동","칼럼","리포트","블로그","공적 문서"] as Genre[]).map((item) => <label key={item}><input type="radio" name="genre" checked={genre === item} onChange={() => setGenre(item)} /><span>{item}</span></label>)}</div></fieldset>
                <fieldset><legend>탐지 범위</legend><div className={styles.severity}>{(["S1","S2","S3"] as Severity[]).map((item) => <label key={item}><input type="radio" name="severity" checked={minimum === item} onChange={() => { setMinimum(item); setResult("") }} /><span>{item === "S1" ? "결정적" : item === "S2" ? "강한 패턴까지" : "전체 패턴"}</span></label>)}</div></fieldset>
                <div className={styles.promise}><strong>이 브라우저에서만 처리</strong><p>본문은 서버로 보내거나 저장하지 않습니다.</p></div>
                <button className={styles.run} type="button" onClick={run} disabled={!text.trim()}>AI 티 진단하고 다듬기 <Arrow /></button>
            </aside>
        </section>

        <section className={styles.diagnosis} aria-live="polite">
            <div className={styles.score}><span>탐지된 패턴</span><strong>{total}</strong><p>{genre} 기준 · {minimum} 이상</p></div>
            <div className={styles.findings}>
                {findings.length ? findings.map((finding) => <article key={finding.id}><div><b>{finding.id}</b><span>{finding.severity}</span></div><h3>{finding.label}</h3><p>{finding.samples.map((sample) => `“${sample}”`).join(" · ")}</p><strong>{finding.count}회</strong></article>) : <div className={styles.empty}><strong>뚜렷한 패턴이 없습니다.</strong><p>현재 선택한 탐지 범위에서는 손댈 곳을 찾지 못했습니다.</p></div>}
            </div>
        </section>

        <section className={`${styles.result} ${result ? styles.hasResult : ""}`}>
            <div className={styles.resultHead}><div><h2>다듬은 문장</h2><p>{result ? `변경률 약 ${changeRate}% · ${changeRate > 30 ? "사람 검토 권장" : "보수적 수정 범위"}` : "진단을 실행하면 결과가 여기에 표시됩니다."}</p></div><button type="button" onClick={copy} disabled={!result}>{copied ? "복사했습니다" : "결과 복사"}</button></div>
            <div className={styles.resultBody}>{result || "원문의 사실·수치·고유명사는 보존하고, 탐지된 표현만 바꿉니다."}</div>
            <p className={styles.disclaimer}>이 로컬 데모는 대표 규칙의 결정적 치환만 구현합니다. AI 작성 여부를 판정하거나 완전한 원본 파이프라인을 대체하지 않습니다.</p>
        </section>
    </main>
}

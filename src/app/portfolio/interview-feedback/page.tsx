import type { Metadata } from 'next'
import styles from './report.module.css'

export const metadata: Metadata = {
    title: '검수자가 직접 고칠 수 있는 리포트 | 유종현',
    description: '타부서와의 대화에서 발견한 문제를 먼저 제안하고 개선한 면접 피드백 리포트 시스템 이야기.',
    robots: { index: false, follow: false },
}

function Workflow({ improved = false }: { improved?: boolean }) {
    const steps = improved
        ? [['리포트 선택', '웹에서 목록 조회'], ['미리보기 · 직접 수정', '검수자가 내용 반영'], ['최종 PDF 확인', '재산출 후 확인']]
        : [['면접 녹음 → STT 변환', '음성을 텍스트로 변환'], ['STT를 엑셀에 표시', '검수할 원문 준비'], ['STT 기반 AI 분석', '면접 피드백 레터 생성'], ['Python으로 PDF 생성', '분석부터 PDF까지 하나의 파이프라인'], ['결과물 PDF 검수', '피드백 내용과 출력물 확인'], ['문제가 있으면 STT 재검수', '엑셀의 STT와 PDF 결과를 오가며 확인'], ['개발자에게 재요청', '수정·재생성 요청 후 결과물 다시 검수']]
    return <figure className={`${styles.workflow} ${improved ? styles.improved : styles.original}`}>
        <figcaption>{improved ? '개선 후 · 웹 검수 흐름' : '개선 전 · 피드백 레터 전체 흐름'}<span>{improved ? '분석 결과를 웹으로 연결해 검수자가 직접 완료' : '엑셀과 PDF를 오가며 확인하고, 개발자에게 다시 요청'}</span></figcaption>
        <ol>{steps.map(([title, detail]) => <li key={title}><strong>{title}</strong><span>{detail}</span></li>)}</ol>
    </figure>
}

export default function InterviewFeedbackPage() {
    return <article className={styles.page}>
        <div className={styles.topbar}><a href="/portfolio/">유종현 <span>Frontend Engineer</span></a><span>직접 제안하고 만든 개선 경험</span></div>
        <div className={styles.article}>
            <header className={styles.hero}>
                <p className={styles.context}>면접 피드백 리포트 시스템</p>
                <h1>검수자가 직접 고칠 수 있게,<br />반복되는 요청을 줄였습니다.</h1>
                <p className={styles.intro}>타부서 팀원과의 대화에서 불편한 검수 과정을 알게 됐습니다.<br className={styles.desktopBreak} /> 먼저 개선을 건의하고 선개발한 뒤, 실제 업무에서 결과를 확인했습니다.</p>
                <div className={styles.outcome}><div><span>복수 리포트 수정·재산출 시간</span><p><span>약 1시간</span><b aria-label="에서">→</b><strong>약 5~10분</strong></p></div><p>100건 기준 운영 회고<br />처리 건수에 따라 소요 시간은 달라집니다.</p></div>
            </header>

            <section className={styles.section} aria-labelledby="discovery">
                <h2 id="discovery">대화에서 발견한 문제</h2>
                <p>기존에는 면접 녹음을 STT로 변환해 엑셀에 표시하고, STT를 토대로 AI가 면접 피드백 레터를 생성했습니다. <strong>Python 파이프라인이 분석부터 PDF 생성까지 담당</strong>했습니다.</p>
                <p>검수팀은 완성된 PDF를 확인했습니다. 내용에 문제가 있으면 엑셀에 표시된 STT를 검수하고 PDF 결과를 다시 대조한 뒤, 개발자에게 수정을 재요청했습니다. <strong>원문 확인은 엑셀, 결과 확인은 PDF, 수정·재생성은 개발자 요청</strong>으로 나뉜 흐름이 반복됐습니다.</p>
                <blockquote>내용을 가장 잘 아는 검수자가<br />직접 수정할 수 있으면 어떨까?</blockquote>
                <p>기존 프로세스를 알게 된 뒤 먼저 개선을 건의하고 선개발을 시작했습니다. 검수팀과 수정 항목, 기능 우선순위, 실제 작업 순서를 함께 정리했습니다.</p>
                <Workflow />
            </section>

            <section className={styles.section} aria-labelledby="implementation">
                <h2 id="implementation">검수부터 최종 확인까지 한 흐름으로</h2>
                <p>웹 검수 Admin에 <strong>리포트 목록, 출력 미리보기, 내용 수정</strong>을 연결했습니다. 검수자가 개발자에게 요청하지 않고 수정과 재산출을 완료하는 것이 목표였습니다.</p>
                <p>분석과 PDF 생성이 묶여 있던 기존 구조에서 책임을 나눴습니다. <strong>Python은 녹음 분석과 DB 저장</strong>을 맡고, <strong>웹은 분석 결과 조회·검수·수정과 출력 확인</strong>을 맡도록 설계했습니다. 분석 결과를 저장한 뒤 웹에서 검수하고 최종 PDF를 확인하는 흐름으로 간소화했습니다.</p>
                <Workflow improved />
                <figure className={styles.mockup}>
                    <div className={styles.mockupBar}><strong>리포트 검수 Admin</strong><span>설명용 재구성</span></div>
                    <div className={styles.mockupBody}>
                        <div className={styles.editor}><span className={styles.screenLabel}>내용 수정</span><h3>면접 피드백</h3><div className={styles.field}>선택한 방법의 이유와 결과를 함께 설명하면 경험이 더 명확하게 전달됩니다.</div><div className={styles.saved}>수정 내용 반영</div></div>
                        <div className={styles.preview}><span className={styles.screenLabel}>출력 미리보기</span><div className={styles.paper}><span>INTERVIEW FEEDBACK</span><h3>면접 피드백 리포트</h3><div className={styles.rule} /><p>선택한 방법의 이유와 결과를 함께 설명하면 경험이 더 명확하게 전달됩니다.</p></div></div>
                    </div>
                    <figcaption>실제 서비스 캡처가 아닌 흐름 설명용 그림입니다. 문구는 가상 예시이며 실제 고객·지원자 정보는 포함하지 않았습니다.</figcaption>
                </figure>
                <h3 className={styles.subheading}>제가 맡은 일</h3>
                <ul className={styles.roles}>
                    <li><strong>검수팀과 작업 흐름 설계</strong><p>어떤 내용을 고치는지, 무엇을 먼저 확인해야 하는지 조율했습니다.</p></li>
                    <li><strong>분석과 수정의 책임 분리</strong><p>Python은 녹음 분석과 DB 저장을, 웹은 결과 조회와 수정을 담당하도록 나눴습니다.</p></li>
                    <li><strong>웹 검수 Admin 개발</strong><p>목록, iframe 기반 출력 미리보기, 내용 수정 기능을 연결했습니다.</p></li>
                </ul>
            </section>

            <section className={styles.section} aria-labelledby="result">
                <h2 id="result">실제 수정 업무에서 확인한 변화</h2>
                <p>운영 회고상 전체 검수 대상의 약 <strong>10~20%에서 수정이 필요</strong>했습니다. 반복되던 개발자 요청과 PDF 재생성 흐름을 통합하면서 수정과 최종 확인에 걸리는 시간이 줄었습니다.</p>
                <div className={styles.comparison}><div><span>이전</span><strong>약 1시간</strong><p>엑셀 STT · PDF 대조 후 개발자 재요청<br />수정 · 재생성 대기 · 결과 확인</p></div><div><span>개선 후</span><strong>약 5~10분</strong><p>웹에서 검수자가 직접 수정<br />최종 PDF 생성 · 확인</p></div></div>
                <p className={styles.caption}>100건 기준 복수 리포트 수정 작업의 운영 회고입니다. 처리 건수에 따라 시간이 달라집니다. 동일 조건의 통제 실험 결과는 아닙니다.</p>
                <p>시간 단축과 함께 달라진 점은 <strong>검수자가 직접 업무를 끝낼 수 있게 됐다</strong>는 것입니다. 개발자에게 수정 요청을 전달하고 기다리던 과정을 줄였습니다.</p>
            </section>

            <section className={styles.reflection} aria-labelledby="reflection"><h2 id="reflection">이 경험에서 배운 것</h2><p>개선할 문제는 개발팀의 업무 목록 밖에도 있었습니다. 다른 팀의 이야기를 듣고, 직접 제안하고 만들어 보면서, 기능이 생겼는지보다 <strong>사용자가 실제로 일을 더 쉽게 끝내는지</strong>를 확인하는 것이 중요하다는 걸 배웠습니다.</p></section>
            <footer className={styles.footer}><strong>유종현</strong><span>인딥에이아이 · 면접 피드백 리포트 시스템</span><p>Svelte · Next.js · NestJS · MongoDB · S3 · CloudFront</p></footer>
        </div>
    </article>
}

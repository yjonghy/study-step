export default function AdapterPattern() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Adapter Pattern</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Adapter Pattern은 외부 API 응답이나 레거시 데이터 구조를 화면에서 쓰기 좋은 UI 모델로 변환하는 설계 방식이다.<br />
                서버 응답 형식이 바뀌어도 컴포넌트 수정 범위를 adapter 한 곳으로 좁힐 수 있어, B2B 어드민처럼 필드가 자주 바뀌는 화면에서 특히 유용하다.
            </p>

            <div className="mt-[28px] grid grid-cols-2 mobile:grid-cols-1 gap-[8px]">
                <div className="bg-red005 border border-red020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">직접 응답 사용</p>
                    <p className="body-xs text-gray060">컴포넌트 곳곳에서 optional chaining, 날짜 포맷, 상태값 변환이 반복되고 API 변경이 UI 전체로 전파된다.</p>
                </div>
                <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">Adapter 사용</p>
                    <p className="body-xs text-gray060">서버 모델과 UI 모델을 분리해 화면은 안정적인 타입만 바라보고, 변경 대응은 변환 함수에서 처리한다.</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">서버 응답과 UI 모델 분리</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`type InterviewResponse = {
  id: string;
  applicant_name: string;
  interview_status: "READY" | "IN_PROGRESS" | "DONE";
  score_avg?: number | null;
  started_at?: string | null;
};

type InterviewRow = {
  id: string;
  applicantName: string;
  statusLabel: string;
  scoreText: string;
  startedAtText: string;
};`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Adapter 함수</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const statusLabelMap = {
  READY: "대기",
  IN_PROGRESS: "진행 중",
  DONE: "완료",
} satisfies Record<InterviewResponse["interview_status"], string>;

function toInterviewRow(response: InterviewResponse): InterviewRow {
  return {
    id: response.id,
    applicantName: response.applicant_name,
    statusLabel: statusLabelMap[response.interview_status],
    scoreText: response.score_avg == null
      ? "-"
      : \`\${response.score_avg.toFixed(1)}점\`,
    startedAtText: response.started_at
      ? formatDate(response.started_at)
      : "시작 전",
  };
}`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">컴포넌트는 UI 모델만 사용</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function InterviewTable({ rows }: { rows: InterviewRow[] }) {
  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.applicantName}</td>
            <td>{row.statusLabel}</td>
            <td>{row.scoreText}</td>
            <td>{row.startedAtText}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 포인트</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• API 응답 타입은 서버 계약을 그대로 반영하고, UI 타입은 화면 요구사항 기준으로 따로 둔다.</p>
                    <p className="body-xs text-blue030">• 날짜, 금액, 상태 라벨, null fallback은 컴포넌트가 아니라 adapter에서 처리한다.</p>
                    <p className="body-xs text-blue030">• adapter는 테스트하기 쉬워서 API 변경 시 회귀 범위를 빠르게 확인할 수 있다.</p>
                </div>
            </div>
        </article>
    )
}

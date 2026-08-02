export default function BedrockRag() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">AWS Bedrock & RAG — 실무 적용 흐름</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <strong>Amazon Bedrock</strong>은 여러 파운데이션 모델을 API로 호출하고, 보안·권한·운영 환경을 AWS 안에서 관리할 수 있게 해주는 생성형 AI 플랫폼이다.
                <strong>RAG(Retrieval-Augmented Generation)</strong>는 모델이 모르는 사내 문서나 최신 데이터를 검색해서 프롬프트에 함께 넣고 답변 품질을 높이는 패턴이다.
            </p>

            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">왜 Bedrock + RAG를 같이 쓰는가?</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["일반 LLM 호출", "모델 학습 시점 이후 정보나 사내 전용 지식에 약함"],
                        ["Fine-tuning", "말투·형식 학습에는 좋지만, 자주 바뀌는 문서 지식 반영은 비용이 큼"],
                        ["RAG", "문서를 검색해 근거로 넣으므로 최신성·추적성·권한 제어를 함께 다루기 좋음"],
                        ["Bedrock", "모델 호출, Knowledge Bases, IAM, CloudWatch 등 AWS 운영 요소와 연결하기 쉬움"],
                    ].map(([label, desc], i) => (
                        <div key={i} className="flex items-start gap-[8px] px-[10px] py-[6px] bg-gray010 rounded-[6px]">
                            <p className={`body-xs font-bold min-w-[120px] flex-shrink-0 ${i >= 2 ? "text-blue040" : "text-gray050"}`}>{label}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">RAG 처리 흐름</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["1. 문서 수집", "PDF, HTML, Notion, DB, S3 파일 등 지식 원천을 정한다"],
                        ["2. Chunking", "문서를 검색하기 좋은 크기로 자르고 제목·URL·권한 같은 메타데이터를 붙인다"],
                        ["3. Embedding", "각 청크를 벡터로 변환해 OpenSearch Serverless, Pinecone, pgvector 등에 저장한다"],
                        ["4. Retrieval", "사용자 질문을 벡터화하고 관련 청크를 top-k로 검색한다"],
                        ["5. Generation", "검색된 근거를 프롬프트에 넣고 Bedrock 모델에 답변 생성을 요청한다"],
                        ["6. Evaluation", "근거 충실도, 환각률, 지연 시간, 비용을 로그로 남기고 개선한다"],
                    ].map(([step, desc]) => (
                        <div key={step} className="grid grid-cols-[120px_1fr] mobile:grid-cols-1 gap-[8px] px-[10px] py-[6px] bg-gray010 rounded-[6px]">
                            <p className="body-xs font-bold text-blue040">{step}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Bedrock 기반 구성 예시</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`사용자 질문
  ↓
Next.js Route Handler / API Server
  ↓
권한 확인: 사용자가 접근 가능한 문서 범위 계산
  ↓
Bedrock Embedding Model로 질문 벡터 생성
  ↓
Vector Store에서 관련 문서 검색
  ↓
검색 결과를 context로 정리
  ↓
Bedrock Chat / Text Model 호출
  ↓
답변 + 근거 문서 링크 반환`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">프롬프트 설계 포인트</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">근거 기반 답변 규칙</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`You are a support assistant.
Answer only from the provided context.
If the context is insufficient, say that you do not have enough information.
Include source titles for claims that depend on the context.

<context>
{retrieved_chunks}
</context>

Question: {user_question}`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">프론트엔드에서 다룰 응답 형태</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`type RagAnswer = {
  answer: string;
  confidence: "high" | "medium" | "low";
  sources: Array<{
    title: string;
    url?: string;
    snippet: string;
  }>;
  latencyMs: number;
};`}</p>
                    </div>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 체크리스트</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• Chunk 크기는 너무 작으면 맥락이 끊기고, 너무 크면 검색 정확도와 비용이 나빠진다</p>
                    <p className="body-xs text-blue030">• 문서별 권한 메타데이터를 벡터 저장소에도 넣어 검색 단계에서 필터링한다</p>
                    <p className="body-xs text-blue030">• 답변에는 source를 노출해 사용자가 근거 문서를 직접 확인할 수 있게 한다</p>
                    <p className="body-xs text-blue030">• CloudWatch 등으로 prompt token, completion token, latency, error rate를 추적한다</p>
                    <p className="body-xs text-blue030">• 모델이 모르면 모른다고 답하도록 프롬프트와 UI 상태를 함께 설계한다</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">면접에서 말하기 좋은 요약</p>
                <p className="text-gray060 body-sm">
                    Bedrock은 모델 운영을 AWS 환경 안에서 관리하기 위한 선택지이고, RAG는 모델 자체를 다시 학습시키지 않고도 사내 지식을 답변에 연결하는 아키텍처 패턴이다.
                    핵심은 문서를 잘게 나누어 검색 가능하게 만들고, 사용자 권한에 맞는 근거만 프롬프트에 넣은 뒤, 답변과 출처를 함께 보여주는 것이다.
                </p>
            </div>
        </article>
    )
}

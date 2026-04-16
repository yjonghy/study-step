export default function PromiseAsync() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Promise / async·await</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체다.<br />
                async/await는 Promise 위에서 동기 코드처럼 비동기를 작성할 수 있게 해주는 문법적 설탕이다.
            </p>

            {/* Promise 상태 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Promise 3가지 상태</p>
                <div className="mt-[8px] flex gap-[8px]">
                    {[
                        { label: "pending", desc: "비동기 처리 진행 중", color: "bg-yellow005 border-yellow020 text-yellow060" },
                        { label: "fulfilled", desc: "처리 성공 → .then()", color: "bg-green005 border-green020 text-green060" },
                        { label: "rejected", desc: "처리 실패 → .catch()", color: "bg-red005 border-red020 text-red050" },
                    ].map((s) => (
                        <div key={s.label} className={`flex-1 border rounded-[8px] p-[10px] ${s.color.split(' ').slice(0, 2).join(' ')}`}>
                            <p className={`body-xs font-bold ${s.color.split(' ')[2]}`}>{s.label}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{s.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="body-xs text-gray040 mt-[4px]">상태는 한 번 결정되면 불변 (settled). fulfilled/rejected를 합쳐 settled라 한다.</p>
            </div>

            {/* 마이크로태스크 큐 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">마이크로태스크 큐 — 이벤트 루프와의 관계</p>
                <p className="text-gray060 body-sm">Promise의 .then / .catch / .finally 콜백은 <strong>마이크로태스크 큐</strong>에 쌓인다. 마이크로태스크는 현재 태스크가 끝난 직후, 다음 매크로태스크(setTimeout 등) 전에 모두 처리된다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`console.log('1');

setTimeout(() => console.log('2 - 매크로태스크'), 0);

Promise.resolve().then(() => console.log('3 - 마이크로태스크'));

console.log('4');

// 출력 순서: 1 → 4 → 3 → 2`}</p>
                </div>
            </div>

            {/* async/await */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">async / await</p>
                <div className="mt-[8px] flex gap-[8px]">
                    <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-red050 font-bold mb-[4px]">Promise 체인 (콜백 지옥 개선 전)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));`}</p>
                    </div>
                    <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">async/await (가독성 향상)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`async function main() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (err) {
    console.error(err);
  }
}`}</p>
                    </div>
                </div>
            </div>

            {/* Promise 정적 메서드 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Promise 정적 메서드 비교</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { name: "Promise.all([...])", desc: "모두 fulfilled → 결과 배열 반환. 하나라도 reject면 즉시 reject. 병렬 실행 시 사용." },
                        { name: "Promise.allSettled([...])", desc: "모두 settled될 때까지 기다림. 각 결과를 { status, value/reason } 형태로 반환. 실패해도 나머지 결과 필요할 때." },
                        { name: "Promise.race([...])", desc: "가장 먼저 settled된 결과 하나만 반환 (타임아웃 구현에 활용)." },
                        { name: "Promise.any([...])", desc: "가장 먼저 fulfilled된 결과 반환. 모두 reject 시 AggregateError." },
                    ].map((m, i) => (
                        <div key={i} className="bg-gray010 rounded-[8px] p-[10px]">
                            <p className="body-xs text-gray080 font-bold">{m.name}</p>
                            <p className="body-xs text-gray060 mt-[2px]">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

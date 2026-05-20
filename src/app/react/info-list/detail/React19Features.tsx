"use client"
import { useState, useOptimistic, useTransition } from "react";

function OptimisticDemo() {
    const [messages, setMessages] = useState<string[]>(["안녕하세요!"]);
    const [optimisticMessages, addOptimistic] = useOptimistic(
        messages,
        (state, newMsg: string) => [...state, newMsg + " (전송 중...)"]
    );
    const [isPending, startTransition] = useTransition();

    const sendMessage = (msg: string) => {
        startTransition(async () => {
            addOptimistic(msg);
            await new Promise((r) => setTimeout(r, 1200));
            setMessages((prev) => [...prev, msg]);
        });
    };

    return (
        <div className="bg-gray010 rounded-[8px] p-[12px] flex flex-col gap-[8px]">
            <p className="body-xs text-gray040">메시지 목록</p>
            <div className="flex flex-col gap-[4px] min-h-[60px]">
                {optimisticMessages.map((m, i) => (
                    <p key={i} className={`body-xs px-[8px] py-[4px] rounded-[4px] ${m.includes("전송 중") ? "text-gray040 bg-gray015" : "text-gray080 bg-blue010"}`}>{m}</p>
                ))}
            </div>
            <button
                onClick={() => sendMessage("새 메시지 " + (messages.length + 1))}
                disabled={isPending}
                className="body-xs bg-blue030 text-white rounded-[6px] px-[10px] py-[5px] w-fit disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
                {isPending ? "전송 중..." : "메시지 보내기"}
            </button>
        </div>
    );
}

export default function React19Features() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">React 19 주요 신기능</p>
            <p className="text-gray060 body-sm mt-[16px]">
                React 19는 2024년 말 정식 출시됐으며, 폼 처리·낙관적 UI·컴파일러 최적화 등 개발 경험을 크게 바꾸는 기능들이 도입됐다.
            </p>

            {/* useActionState */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useActionState — 폼 비동기 액션 상태 관리</p>
                <p className="text-gray060 body-sm">이전의 <span className="text-gray080 font-mono">useFormState</span>를 대체. 비동기 액션의 pending·error·result를 한 번에 추적한다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import { useActionState } from 'react';

async function submitAction(prevState, formData) {
  const name = formData.get('name');
  if (!name) return { error: '이름을 입력하세요' };
  await saveToServer(name);
  return { success: true };
}

function MyForm() {
  const [state, formAction, isPending] = useActionState(submitAction, null);

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>
        {isPending ? '제출 중...' : '제출'}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}`}</p>
                </div>
                <p className="body-xs text-gray040 mt-[4px]">form의 <span className="font-mono">action</span> 속성에 함수를 직접 넘길 수 있는 것도 React 19의 변화.</p>
            </div>

            {/* useFormStatus */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useFormStatus — 부모 폼의 pending 상태 구독</p>
                <p className="text-gray060 body-sm">자식 컴포넌트에서 <span className="text-gray080 font-mono">react-dom</span>의 훅으로 부모 form의 제출 상태를 읽는다. props drilling 없이 버튼·입력 비활성화 가능.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? '처리 중...' : '저장'}
    </button>
  );
}

function Form() {
  return (
    <form action={serverAction}>
      <input name="email" />
      <SubmitButton />  {/* props 없이도 pending 인식 */}
    </form>
  );
}`}</p>
                </div>
            </div>

            {/* use() */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">use() — 렌더 중 Promise·Context 읽기</p>
                <p className="text-gray060 body-sm">훅 규칙(최상위 호출)에 얽매이지 않고 조건문·반복문 안에서도 사용 가능한 새 API.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Promise 읽기 (Suspense와 함께)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`import { use, Suspense } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // Promise가 resolve될 때까지 suspend
  return <p>{user.name}</p>;
}

// 호출부
<Suspense fallback={<Skeleton />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">Context 읽기 (조건문 안에서도 OK)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`import { use } from 'react';
import ThemeContext from './ThemeContext';

function Panel({ isAdmin }) {
  if (!isAdmin) return null;
  const theme = use(ThemeContext); // 조건문 안이어도 동작
  return <div style={{ background: theme.bg }}>관리자 패널</div>;
}`}</p>
                    </div>
                </div>
            </div>

            {/* useOptimistic */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useOptimistic — 낙관적 UI 업데이트</p>
                <p className="text-gray060 body-sm">서버 응답을 기다리지 않고 UI를 먼저 업데이트한 뒤, 완료 시 실제 값으로 교체한다. 실패하면 자동 롤백.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import { useOptimistic } from 'react';

function MessageList({ messages }) {
  const [optimisticMsgs, addOptimistic] = useOptimistic(
    messages,
    (state, newMsg) => [...state, { ...newMsg, sending: true }]
  );

  const send = async (text) => {
    addOptimistic({ text }); // 즉시 UI 반영
    await postMessage(text); // 서버 전송 (실패 시 롤백)
  };

  return optimisticMsgs.map(m =>
    <p style={{ opacity: m.sending ? 0.5 : 1 }}>{m.text}</p>
  );
}`}</p>
                </div>
                <p className="body-xs text-gray040 mt-[4px]">아래에서 직접 체험해보세요.</p>
                <OptimisticDemo />
            </div>

            {/* ref as prop */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">ref as prop — forwardRef 불필요</p>
                <p className="text-gray060 body-sm">React 19부터 함수 컴포넌트에서 <span className="text-gray080 font-mono">ref</span>를 일반 prop처럼 받을 수 있다. <span className="text-gray080 font-mono">forwardRef</span> 래퍼가 사라진다.</p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">이전 (React 18)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">이후 (React 19)</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
// 사용
<MyInput ref={inputRef} placeholder="입력" />`}</p>
                    </div>
                </div>
            </div>

            {/* React Compiler */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">React Compiler — 자동 메모이제이션</p>
                <p className="text-gray060 body-sm">빌드 타임에 컴포넌트·훅을 분석해 <span className="text-gray080 font-mono">useMemo</span> / <span className="text-gray080 font-mono">useCallback</span> / <span className="text-gray080 font-mono">React.memo</span>를 자동 삽입한다. 수동 최적화 코드를 줄일 수 있다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 개발자가 작성하는 코드 (메모이제이션 없음)
function ProductCard({ product, onAddToCart }) {
  const price = formatPrice(product.price);
  return (
    <div>
      <p>{product.name}</p>
      <p>{price}</p>
      <button onClick={() => onAddToCart(product.id)}>담기</button>
    </div>
  );
}

// 컴파일러가 변환한 결과 (개념적)
const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  const price = useMemo(() => formatPrice(product.price), [product.price]);
  const handleAdd = useCallback(() => onAddToCart(product.id), [onAddToCart, product.id]);
  return ( ... );
});`}</p>
                </div>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px]">
                    <p className="body-xs text-blue030">React Compiler는 React 19와 함께 beta 출시. Vite / Next.js 플러그인으로 적용 가능하며, 기존 코드는 수동 메모이제이션과 공존 가능하다.</p>
                </div>
            </div>

            {/* Document Metadata */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Document Metadata — 컴포넌트에서 직접 &lt;title&gt; · &lt;meta&gt;</p>
                <p className="text-gray060 body-sm">별도 라이브러리(react-helmet 등) 없이 컴포넌트 내에서 문서 메타를 선언하면 React가 <span className="text-gray080 font-mono">&lt;head&gt;</span>로 자동 호이스팅한다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.summary} />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
// React가 <title>/<meta>를 <head>로 올려줌 — react-helmet 불필요`}</p>
                </div>
            </div>

            {/* 요약 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">한눈에 정리</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["useActionState", "폼 액션의 pending · error · result 상태 통합 관리"],
                        ["useFormStatus", "자식에서 부모 form의 pending 구독 (react-dom)"],
                        ["use()", "Promise · Context를 조건문/반복문 안에서도 읽기"],
                        ["useOptimistic", "서버 응답 전 UI 선반영, 실패 시 자동 롤백"],
                        ["ref as prop", "forwardRef 없이 ref를 일반 prop으로 전달"],
                        ["React Compiler", "빌드 타임 자동 메모이제이션"],
                        ["Document Metadata", "<title>/<meta>를 컴포넌트에서 선언 → head 자동 호이스팅"],
                    ].map(([name, desc]) => (
                        <div key={name} className="flex gap-[8px] bg-gray010 rounded-[6px] px-[10px] py-[6px]">
                            <p className="body-xs text-blue030 font-mono shrink-0 w-[140px]">{name}</p>
                            <p className="body-xs text-gray060">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}

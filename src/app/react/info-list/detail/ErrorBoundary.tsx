export default function ErrorBoundary() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Error Boundary</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Error Boundary는 하위 컴포넌트 트리에서 발생한 JavaScript 오류를 포착하여<br />
                앱 전체가 크래시되는 대신 폴백 UI를 렌더링하는 React 컴포넌트다.
            </p>

            {/* 왜 필요한가 */}
            <div className="mt-[28px] flex gap-[8px]">
                <div className="flex-1 bg-red005 border border-red020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-red050 font-bold mb-[4px]">Error Boundary 없을 때</p>
                    <p className="body-xs text-gray060">렌더링 중 오류 발생 → 컴포넌트 트리 전체 언마운트 → 빈 화면 노출</p>
                </div>
                <div className="flex-1 bg-green005 border border-green020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">Error Boundary 있을 때</p>
                    <p className="body-xs text-gray060">오류를 경계에서 포착 → 해당 영역만 폴백 UI 표시 → 나머지 앱 정상 동작</p>
                </div>
            </div>

            {/* 클래스 컴포넌트 구현 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">구현 — 클래스 컴포넌트 필수</p>
                <p className="text-gray060 body-sm">Error Boundary는 반드시 클래스 컴포넌트로 구현해야 한다. (함수형 컴포넌트 불가)</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`class ErrorBoundary extends React.Component {
  state = { hasError: false };

  // 렌더링 단계에서 오류 포착 → state 업데이트
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // 오류 정보를 외부 로깅(Sentry 등)에 전송
  componentDidCatch(error, info) {
    logErrorToSentry(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <h2>문제가 발생했습니다.</h2>;
    }
    return this.props.children;
  }
}

// 사용
<ErrorBoundary>
  <UserProfile />  {/* 여기서 오류 나도 앱 전체는 안 죽음 */}
</ErrorBoundary>`}</p>
                </div>
            </div>

            {/* 포착 범위 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">포착 범위 — 주의사항</p>
                <div className="mt-[8px] flex flex-col gap-[6px]">
                    {[
                        { ok: true, text: "렌더링 중 발생한 오류" },
                        { ok: true, text: "생명주기 메서드에서 발생한 오류" },
                        { ok: true, text: "자식 컴포넌트 생성자에서 발생한 오류" },
                        { ok: false, text: "이벤트 핸들러 오류 (try/catch 직접 처리 필요)" },
                        { ok: false, text: "비동기 코드 오류 (setTimeout, Promise 등)" },
                        { ok: false, text: "서버 사이드 렌더링(SSR) 중 오류" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-[8px]">
                            <div className={`w-[16px] h-[16px] rounded-full flex items-center justify-center flex-shrink-0 ${item.ok ? 'bg-green005 border border-green020' : 'bg-red005 border border-red020'}`}>
                                <span className={`text-[9px] font-bold ${item.ok ? 'text-green060' : 'text-red050'}`}>{item.ok ? '✓' : '✗'}</span>
                            </div>
                            <p className="body-xs text-gray060">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* react-error-boundary */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 — react-error-boundary 라이브러리</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>오류: {error.message}</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={(error, info) => logToSentry(error)}
  onReset={() => { /* 상태 초기화 */ }}
>
  <RiskyComponent />
</ErrorBoundary>`}</p>
                </div>
            </div>
        </article>
    )
}

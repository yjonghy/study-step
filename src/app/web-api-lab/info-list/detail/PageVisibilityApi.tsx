export default function PageVisibilityApi() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Page Visibility API</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Page Visibility API는 현재 문서가 사용자에게 보이는 상태인지 확인하는 API다.<br />
                탭이 백그라운드로 이동했을 때 polling, 애니메이션, 미디어 처리 등을 줄여 불필요한 네트워크와 CPU 사용을 막을 수 있다.
            </p>

            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 API</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`document.visibilityState; // "visible" | "hidden"
document.hidden;          // boolean

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("탭이 백그라운드로 이동");
  } else {
    console.log("탭이 다시 활성화");
  }
});`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Polling 일시 중단</p>
                <p className="text-gray060 body-sm">
                    관리자 대시보드나 알림 목록처럼 주기적으로 데이터를 갱신하는 화면에서 탭이 보이지 않을 때 요청을 멈출 수 있다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function usePageVisible() {
  const [isVisible, setIsVisible] = useState(
    document.visibilityState === "visible"
  );

  useEffect(() => {
    const handleChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleChange);
    return () => document.removeEventListener("visibilitychange", handleChange);
  }, []);

  return isVisible;
}

function Dashboard() {
  const isVisible = usePageVisible();

  useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    refetchInterval: isVisible ? 5000 : false,
  });
}`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실시간 화면에서의 활용</p>
                <div className="mt-[8px] grid grid-cols-2 mobile:grid-cols-1 gap-[8px]">
                    <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-green060 font-bold mb-[4px]">활성 탭</p>
                        <p className="body-xs text-gray060">짧은 주기로 상태 갱신, 애니메이션 유지, 사용자 입력 즉시 반영.</p>
                    </div>
                    <div className="bg-gray010 border border-gray020 rounded-[8px] p-[12px]">
                        <p className="body-xs text-gray070 font-bold mb-[4px]">비활성 탭</p>
                        <p className="body-xs text-gray060">polling 중단 또는 간격 증가, rAF 기반 작업 중지, 복귀 시 한 번만 최신 데이터 refetch.</p>
                    </div>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">복귀 시 데이터 동기화</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`useEffect(() => {
  const handleVisible = () => {
    if (document.visibilityState === "visible") {
      queryClient.invalidateQueries({ queryKey: ["interview-status"] });
      socket.emit("room:sync");
    }
  };

  document.addEventListener("visibilitychange", handleVisible);
  return () => document.removeEventListener("visibilitychange", handleVisible);
}, [queryClient, socket]);`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 포인트</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• 숨겨진 탭에서는 브라우저가 timer를 throttle할 수 있으므로 정확한 주기 보장이 필요한 로직에는 의존하지 않는다.</p>
                    <p className="body-xs text-blue030">• 탭 복귀 시 staleTime과 관계없이 핵심 데이터는 명시적으로 refetch하는 편이 안전하다.</p>
                    <p className="body-xs text-blue030">• 사용자 입력 중인 폼은 자동 refetch가 값을 덮어쓰지 않도록 dirty 상태를 함께 확인한다.</p>
                </div>
            </div>
        </article>
    )
}

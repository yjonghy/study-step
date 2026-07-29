export default function CompoundComponent() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Compound Component</p>
            <p className="text-gray060 body-sm mt-[16px]">
                Compound Component는 여러 하위 컴포넌트를 조합해 하나의 UI를 구성하는 패턴이다.<br />
                Tabs, Select, Accordion처럼 내부 상태는 공유하지만 마크업 조합은 사용하는 쪽에서 유연하게 제어해야 하는 컴포넌트에 잘 맞는다.
            </p>

            <div className="mt-[28px] grid grid-cols-2 mobile:grid-cols-1 gap-[8px]">
                <div className="bg-gray010 border border-gray020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray070 font-bold mb-[4px]">일반 props 방식</p>
                    <p className="body-xs text-gray060">items, renderItem, placement 같은 props가 늘어나면서 사용처의 요구사항을 컴포넌트가 모두 알아야 한다.</p>
                </div>
                <div className="bg-green005 border border-green020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-green060 font-bold mb-[4px]">Compound 방식</p>
                    <p className="body-xs text-gray060">상태 공유는 컴포넌트 내부에서 처리하고, 배치는 JSX 조합으로 표현해 확장성이 좋아진다.</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">사용 예시</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`<Tabs defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">프로필</Tabs.Trigger>
    <Tabs.Trigger value="billing">결제</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Panel value="profile">프로필 설정 화면</Tabs.Panel>
  <Tabs.Panel value="billing">결제 설정 화면</Tabs.Panel>
</Tabs>`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Context로 상태 공유</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs 컴포넌트 안에서만 사용할 수 있습니다.");
  }
  return context;
}`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">구현 구조</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.Trigger = function Trigger({ value, children }) {
  const tabs = useTabsContext();
  const selected = tabs.value === value;

  return (
    <button
      aria-selected={selected}
      onClick={() => tabs.setValue(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ value, children }) {
  const tabs = useTabsContext();
  return tabs.value === value ? <div>{children}</div> : null;
};`}</p>
                </div>
            </div>

            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">실무 포인트</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• 하위 컴포넌트는 단독 사용 시 에러를 던져 잘못된 조합을 빠르게 발견하게 한다.</p>
                    <p className="body-xs text-blue030">• 접근성이 중요한 컴포넌트는 role, aria-selected, aria-controls, 키보드 이동까지 함께 설계한다.</p>
                    <p className="body-xs text-blue030">• 너무 작은 컴포넌트에 적용하면 오히려 복잡해지므로 Tabs, Select, Modal처럼 조합 요구가 큰 UI에 제한적으로 쓴다.</p>
                </div>
            </div>
        </article>
    )
}

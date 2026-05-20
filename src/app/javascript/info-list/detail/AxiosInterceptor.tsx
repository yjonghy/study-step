export default function AxiosInterceptor() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">Axios 인터셉터 패턴</p>
            <p className="text-gray060 body-sm mt-[16px]">
                <span className="font-mono text-gray080">axios.interceptors</span>는 모든 HTTP 요청·응답을 가로채 공통 로직을 한 곳에서 처리한다.
                JWT 자동 주입, 401 리다이렉트, 세션 갱신, 에러 핸들링 등 반복 코드를 제거하는 데 핵심적인 패턴이다.
            </p>

            {/* 기본 구조 */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">기본 구조</p>
                <p className="text-gray060 body-sm">요청 인터셉터와 응답 인터셉터 두 종류가 있다. 각각 성공/실패 핸들러를 가진다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 성공 핸들러: 요청 직전 실행
    return config;
  },
  (error) => {
    // 에러 핸들러: 요청 생성 자체가 실패한 경우
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    // 성공 핸들러: 2xx 응답
    return response;
  },
  (error) => {
    // 에러 핸들러: 2xx 외 응답
    return Promise.reject(error);
  }
);`}</p>
                </div>
            </div>

            {/* JWT 자동 주입 패턴 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">JWT 자동 주입</p>
                <p className="text-gray060 body-sm">
                    매 요청마다 <span className="font-mono text-gray080">localStorage</span>에서 토큰을 꺼내 헤더에 주입한다.
                    인터셉터가 없으면 모든 API 호출 함수에 헤더 코드가 중복된다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }

  // 공통 API 키 주입
  config.headers["x-api-key"] = import.meta.env.VITE_PUBLIC_API_KEY;

  return config;
});`}</p>
                </div>
            </div>

            {/* 401 처리 + 리다이렉트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">401 자동 리다이렉트</p>
                <p className="text-gray060 body-sm">
                    토큰 만료 시 서버는 401을 반환한다. 인터셉터에서 일괄 처리해 로그인 페이지로 보내면
                    각 API 호출처에서 개별 처리할 필요가 없다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`api.interceptors.response.use(
  (response) => response.data, // data unwrap
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      // 이미 로그인 페이지면 무한 루프 방지
      if (currentPath !== "/sign-in") {
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);`}</p>
                </div>
            </div>

            {/* 응답 데이터 unwrap */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">응답 데이터 unwrap</p>
                <p className="text-gray060 body-sm">
                    서버가 항상 <span className="font-mono text-gray080">{"{ data, status, message }"}</span> 구조로 응답한다면,
                    인터셉터에서 <span className="font-mono text-gray080">response.data</span>를 바로 반환해 호출처 코드를 간결하게 유지할 수 있다.
                </p>
                <div className="mt-[8px] flex flex-col gap-[8px]">
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">인터셉터 설정</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`api.interceptors.response.use(
  (response) => response.data, // { data, status } → data 바로 반환
  (error) => Promise.reject(error)
);`}</p>
                    </div>
                    <div className="bg-gray010 rounded-[8px] p-[12px]">
                        <p className="body-sm text-gray080 font-bold mb-[4px]">호출처 코드 비교</p>
                        <p className="body-xs text-gray060 whitespace-pre-line">{`// unwrap 없이: 매번 .data 접근 필요
const result = await api.get("/users");
const users = result.data.data; // 이중 접근

// unwrap 후: 바로 사용 가능
const users = await api.get("/users"); // { users: [...] } 바로 반환`}</p>
                    </div>
                </div>
            </div>

            {/* 세션 TTL 갱신 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">응답 헤더로 세션 TTL 갱신</p>
                <p className="text-gray060 body-sm">
                    서버가 응답 헤더에 세션 잔여 시간을 담아 보내면, 인터셉터에서 전역 상태에 반영한다.
                    매 요청마다 자동으로 세션 타이머가 갱신되는 UX를 구현할 수 있다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`api.interceptors.response.use((response) => {
  // 서버가 x-session-remaining-ttl 헤더로 잔여 시간 전달
  const ttl = response.headers["x-session-remaining-ttl"];

  if (ttl) {
    // Zustand 세션 스토어 갱신
    useSessionStore.getState().setRemainingTTL(Number(ttl));
  }

  return response.data;
});`}</p>
                </div>
            </div>

            {/* 토큰 갱신 (refresh token) */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">토큰 자동 갱신 (Refresh Token 패턴)</p>
                <p className="text-gray060 body-sm">
                    Access Token이 만료됐을 때 즉시 리다이렉트하지 않고, Refresh Token으로 새 토큰을 발급받아 원래 요청을 재시도할 수 있다.
                    단, 갱신 요청이 중복 실행되지 않도록 <strong>큐잉 처리</strong>가 필요하다.
                </p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        // 이미 갱신 중이면 큐에 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = \`Bearer \${token}\`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { accessToken } = await refreshApi.post("/auth/refresh");
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        processQueue(null, accessToken);
        original.headers.Authorization = \`Bearer \${accessToken}\`;
        return api(original); // 원래 요청 재시도
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);`}</p>
                </div>
            </div>

            {/* 인터셉터 vs 개별 처리 비교 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">인터셉터 패턴 vs 개별 처리 비교</p>
                <div className="mt-[8px] flex flex-col gap-[4px]">
                    {[
                        ["구분", "인터셉터 패턴", "개별 처리"],
                        ["JWT 주입", "한 곳에서 자동 처리", "각 함수마다 헤더 추가"],
                        ["401 처리", "전역 일괄 처리", "각 catch 블록에 중복"],
                        ["응답 파싱", "한 곳에서 unwrap", "response.data.data 반복"],
                        ["세션 갱신", "헤더 파싱 한 번에", "각 호출마다 구현 필요"],
                        ["유지보수", "수정 1곳", "N개 API 함수 수정"],
                    ].map(([a, b, c], i) => (
                        <div key={i} className={`grid grid-cols-3 gap-[4px] px-[10px] py-[6px] rounded-[6px] ${i === 0 ? "bg-gray020" : "bg-gray010"}`}>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{a}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-green060"}`}>{b}</p>
                            <p className={`body-xs ${i === 0 ? "text-gray080 font-bold" : "text-gray050"}`}>{c}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 주의사항 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">주의사항</p>
                <div className="mt-[8px] bg-blue010 rounded-[8px] p-[10px] flex flex-col gap-[4px]">
                    <p className="body-xs text-blue030">• 인터셉터를 제거하려면 interceptors.request.eject(id) 사용 — 테스트 환경에서 중요</p>
                    <p className="body-xs text-blue030">• Refresh Token 갱신 시 isRefreshing 플래그로 중복 호출 방지 필수</p>
                    <p className="body-xs text-blue030">• 인터셉터 내부에서 같은 인스턴스를 호출하면 무한 루프 — refresh용 별도 인스턴스 사용</p>
                    <p className="body-xs text-blue030">• response.data unwrap 시 TypeScript 반환 타입이 실제 데이터 타입으로 맞는지 확인</p>
                </div>
            </div>
        </article>
    )
}

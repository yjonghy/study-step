export default function Authentication() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">인증 전략 — Session vs JWT vs OAuth</p>
            <p className="text-gray060 body-sm mt-[16px]">
                웹 서비스의 인증은 상태를 어디에, 어떻게 저장하느냐에 따라 크게 Session 기반과 Token 기반으로 나뉜다.<br />
                각각의 동작 원리와 장단점을 이해하고 상황에 맞게 선택해야 한다.
            </p>

            {/* Session vs JWT */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Session vs JWT 비교</p>
                <div className="mt-[8px] overflow-x-auto">
                    <table className="w-full text-[11px] border-collapse">
                        <thead>
                            <tr>
                                {["구분", "Session", "JWT"].map((h) => (
                                    <th key={h} className="bg-gray010 border border-gray020 px-[10px] py-[8px] text-left text-gray060 font-bold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["상태 저장", "서버 (메모리/DB/Redis)", "클라이언트 (토큰 자체)"],
                                ["서버 확장성", "수평 확장 시 세션 공유 필요", "Stateless → 확장 용이"],
                                ["즉시 무효화", "가능 (세션 삭제)", "어려움 (토큰 만료까지 유효)"],
                                ["저장 위치", "HttpOnly Cookie (권장)", "HttpOnly Cookie 또는 Memory"],
                                ["크기", "작음 (ID만 전달)", "큼 (페이로드 포함)"],
                                ["적합한 사례", "전통적인 웹앱", "MSA, SPA, 모바일 API"],
                            ].map(([label, session, jwt]) => (
                                <tr key={label}>
                                    <td className="border border-gray020 px-[10px] py-[7px] text-gray060 font-bold bg-gray005">{label}</td>
                                    <td className="border border-gray020 px-[10px] py-[7px] text-gray060">{session}</td>
                                    <td className="border border-gray020 px-[10px] py-[7px] text-gray060">{jwt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* JWT 구조 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">JWT 구조</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// Header.Payload.Signature (Base64URL 인코딩, . 으로 구분)
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIiwiZXhwIjoxNjk5MDAwMDAwfQ.xxxx

// Header: 알고리즘 정보
{ "alg": "HS256", "typ": "JWT" }

// Payload: 클레임 (공개 정보만 저장, 암호화 안 됨)
{ "sub": "user123", "exp": 1699000000, "role": "admin" }

// Signature: Header + Payload를 비밀키로 서명 → 위조 방지
HMACSHA256(base64(header) + '.' + base64(payload), secretKey)`}</p>
                </div>
            </div>

            {/* Refresh Token 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">Access Token + Refresh Token 전략</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// Access Token: 짧은 만료 (15분~1시간), API 요청 시 사용
// Refresh Token: 긴 만료 (7일~30일), HttpOnly Cookie에 저장

// 흐름
1. 로그인 → 서버가 Access + Refresh Token 발급
2. Access Token 만료 시
3. /api/refresh 요청 (Refresh Token 자동 포함, HttpOnly)
4. 서버가 Refresh Token 검증 → 새 Access Token 발급
5. Refresh Token도 만료 → 재로그인 필요

// React에서 자동 갱신 (axios interceptor)
axios.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshAccessToken();
      return axios(error.config); // 원래 요청 재시도
    }
    return Promise.reject(error);
  }
);`}</p>
                </div>
            </div>

            {/* OAuth 2.0 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">OAuth 2.0 — 소셜 로그인 흐름 (Authorization Code)</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px]">
                    {[
                        "앱이 구글로 리다이렉트",
                        "사용자 구글 로그인 + 권한 동의",
                        "구글 → 앱에 code 반환",
                        "앱 서버에서 code로 Access Token 교환",
                        "구글 API로 사용자 정보 획득",
                        "앱 자체 세션/JWT 발급",
                    ].map((step, i, arr) => (
                        <div key={i} className="flex items-center gap-[4px]">
                            <div className="bg-blue005 border border-blue020 rounded-[8px] px-[8px] py-[6px]">
                                <p className="body-xs text-blue040 text-center">{step}</p>
                            </div>
                            {i < arr.length - 1 && <div className="w-[6px] h-[1px] bg-gray040" />}
                        </div>
                    ))}
                </div>
                <p className="body-xs text-gray040 mt-[6px]">code는 일회성 단기 토큰. 서버에서 교환하여 Access Token이 클라이언트에 노출되지 않도록 한다.</p>
            </div>
        </article>
    )
}

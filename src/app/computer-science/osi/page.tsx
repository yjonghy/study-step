export default function Osi() {
    return(
        <section>
            <article className="w-full h-full flex flex-col justify-center  mt-[40px] bg-white/70 p-[10px] rounded-[8px]">
                <p className="text-gray060 heading-xl">OSI 7계층</p>
                <p className="text-gray060 body-md mt-[20px]">OSI(Open System Interconnection) 7계층은 네트워크 통신을 7단계로 나눈 것을 의미합니다. 이를 통해 네트워크 통신이 어떻게 이루어지는지 쉽게 이해할 수 있습니다.</p>
                <p className="text-gray060 body-md mt-[20px]">각 계층은 서로 다른 역할을 수행하며, 각 계층은 상위 계층과 하위 계층과만 통신합니다.</p>
                <p className="text-gray060 body-md mt-[20px]">아래는 OSI 7계층의 각 계층과 역할에 대한 설명입니다.</p>
                <div className="mt-[20px]">
                    <p className="text-gray060 body-md">1. 물리 계층 (Physical Layer)</p>
                    <p className="text-gray060 body-md mt-[8px]">물리 계층은 데이터를 전송하기 위한 물리적 매체를 제공합니다. 케이블, 허브, 리피터 등이 물리 계층에 속합니다.</p>
                    <p className="text-gray060 body-md mt-[8px]">데이터를 전기적 신호로 변환하고, 전기적 신호를 데이터로 변환하는 역할을 수행합니다.</p>
                </div>
                <div className="mt-[20px]">
                    <p className="text-gray060 body-md">2. 데이터 링크 계층 (Data Link Layer)</p>
                    <p className="text-gray060 body-md mt-[8px]">데이터 링크 계층은 물리 계층을 통해 전송된 데이터를 관리하고, 오류를 검출 및 수정합니다.</p>
                    <p className="text-gray060 body-md mt-[8px]">MAC 주소를 통해 통신을 관리하며, 흐름 제어와 에러 제어를 수행합니다.</p>
                </div>
                <div className="mt-[20px]">
                    <p className="text-gray060 body-md">3. 네트워크 계층 (Network Layer)</p>
                    <p className="text-gray060 body-md mt-[8px]">네트워크 계층은 데이터를 목적지까지 안전하게 전달하기 위한 경로를 설정합니다.</p>
                    <p className="text-gray060 body-md mt-[8px]">라우팅, 흐름 제어, 세그멘테이션 등의 기능을 수행합니다.</p>
                </div>
                <div className="mt-[20px]">
                    <p className="text-gray060 body-md">4. 전송 계층 (Transport Layer)</p>
                    <p className="text-gray060 body-md mt-[8px]">전송 계층은 데이터의 신뢰성을 보장하며, 데이터의 전송을 제어합니다.</p>
                    <p className="text-gray060 body-md mt-[8px]">흐름 제어, 오류 제어, 복구 등의 기능을 수행합니다.</p>
                </div>
                <div className="mt-[20px]">
                    <p className="text-gray060 body-md">5. 세션 계층 (Session Layer)</p>
                    <p className="text-gray060 body-md mt-[8px]">세션 계층은 데이터 교환을 관리하며, 데이터의 전송을 제어합니다.</p>
                    <p className="text-gray060 body-md mt-[8px]">세션의 설정, 유지, 종료 등의 기능을 수행합니다.</p>
                </div>
                <div className="mt-[20px]">
                    <p className="text-gray060 body-md">6. 표현 계층 (Presentation Layer)</p>
                    <p className="text-gray060 body-md mt-[8px]">표현 계층은 데이터의 형식을 변환하고, 암호화 및 복호화를 수행합니다.</p>
                    <p className="text-gray060 body-md mt-[8px]">데이터의 압축, 암호화, 변환 등의 기능을 수행합니다.</p>
                </div>
                <div className="mt-[20px]">
                    <p className="text-gray060 body-md">7. 응용 계층 (Application Layer)</p>
                    <p className="text-gray060 body-md mt-[8px]">응용 계층은 사용자와 네트워크 간의 상호 작용을 지원합니다.</p>
                    <p className="text-gray060 body-md mt-[8px]">사용자 인터페이스, 이메일, 파일 전송 등의 기능을 수행합니다.</p>
                </div>
            </article>
            <article className="w-full h-full flex flex-col justify-center  mt-[40px] bg-white/70 p-[10px] rounded-[8px]">
                <p className="text-gray060 heading-xl">OSI 7계층 특징</p>
                <p className="text-gray060 body-md mt-[20px]">1. 각 계층은 서로 다른 역할을 수행하며, 각 계층은 상위 계층과 하위 계층과만 통신합니다.</p>
                <p className="text-gray060 body-md mt-[20px]">2. 각 계층은 서로 독립적이며, 각 계층의 변경은 다른 계층에 영향을 미치지 않습니다.</p>
                <p className="text-gray060 body-md mt-[20px]">3. 각 계층은 서로 다른 기술을 사용하며, 각 계층은 서로 다른 프로토콜을 사용합니다.</p>
                <p className="text-gray060 body-md mt-[20px]">4. 각 계층은 서로 다른 업체에 의해 개발되며, 각 계층은 서로 다른 표준을 따릅니다.</p>
            </article>
            <article className="w-full h-full flex flex-col justify-center  mt-[40px] bg-white/70 p-[10px] rounded-[8px]">
                <p className="text-gray060 heading-xl">OSI 7계층 장단점</p>
                <p className="text-gray060 body-md mt-[20px]">1. 장점</p>
                <p className="text-gray060 body-md mt-[8px]">- 각 계층이 독립적이므로, 각 계층의 변경이 다른 계층에 영향을 미치지 않습니다.</p>
                <p className="text-gray060 body-md mt-[8px]">- 각 계층이 서로 다른 기술을 사용하므로, 각 계층이 서로 다른 프로토콜을 사용할 수 있습니다.</p>
                <p className="text-gray060 body-md mt-[8px]">- 각 계층이 서로 다른 업체에 의해 개발되므로, 각 계층이 서로 다른 표준을 따를 수 있습니다.</p>
                <p className="text-gray060 body-md mt-[20px]">2. 단점</p>
                <p className="text-gray060 body-md mt-[8px]">- 각 계층이 독립적이므로, 각 계층의 변경이 다른 계층에 영향을 미치지 않습니다.</p>
                <p className="text-gray060 body-md mt-[8px]">- 각 계층이 서로 다른 기술을 사용하므로, 각 계층이 서로 다른 프로토콜을 사용할 수 있습니다.</p>
                <p className="text-gray060 body-md mt-[8px]">- 각 계층이 서로 다른 업체에 의해 개발되므로, 각 계층이 서로 다른 표준을 따를 수 있습니다.</p>
            </article>

            <article className="w-full h-full flex flex-col justify-center  mt-[40px] bg-white/70 p-[10px] rounded-[8px]">
                <p className="text-gray060 heading-xl">OSI 7계층 프로토콜</p>
                <p className="text-gray060 body-md mt-[20px]">1. 물리 계층 (Physical Layer)</p>
                <p className="text-gray060 body-md mt-[8px]">- 이더넷, Wi-Fi, 블루투스, USB 등</p>
                <p className="text-gray060 body-md mt-[20px]">2. 데이터 링크 계층 (Data Link Layer)</p>
                <p className="text-gray060 body-md mt-[8px]">- 이더넷, MAC 주소, 스위치 등</p>
                <p className="text-gray060 body-md mt-[20px]">3. 네트워크 계층 (Network Layer)</p>
                <p className="text-gray060 body-md mt-[8px]">- IP, 라우터, ICMP, ARP 등</p>
                <p className="text-gray060 body-md mt-[20px]">4. 전송 계층 (Transport Layer)</p>
                <p className="text-gray060 body-md mt-[8px]">- TCP, UDP, 포트 번호 등</p>
                <p className="text-gray060 body-md mt-[20px]">5. 세션 계층 (Session Layer)</p>
                <p className="text-gray060 body-md mt-[8px]">- API, RPC, NetBIOS 등</p>
                <p className="text-gray060 body-md mt-[20px]">6. 표현 계층 (Presentation Layer)</p>
                <p className="text-gray060 body-md mt-[8px]">- JPEG, GIF, MPEG, ASCII 등</p>
                <p className="text-gray060 body-md mt-[20px]">7. 응용 계층 (Application Layer)</p>
                <p className="text-gray060 body-md mt-[8px]">- HTTP, FTP, SMTP, POP3 등</p>
            </article>

            <article className="w-full h-full flex flex-col justify-center  mt-[40px] bg-white/70 p-[10px] rounded-[8px]">
                <p className="text-gray060 heading-xl">OSI 7계층 예시</p>
                <p className="text-gray060 body-md mt-[20px]">1. 웹 브라우저를 통해 구글에 접속하는 과정</p>
                <p className="text-gray060 body-md mt-[8px]">- 응용 계층 : 웹 브라우저</p>
                <p className="text-gray060 body-md mt-[8px]">- 표현 계층 : HTML, CSS, JavaScript</p>
                <p className="text-gray060 body-md mt-[8px]">- 세션 계층 : API</p>
                <p className="text-gray060 body-md mt-[8px]">- 전송 계층 : TCP</p>
                <p className="text-gray060 body-md mt-[8px]">- 네트워크 계층 : IP</p>
                <p className="text-gray060 body-md mt-[8px]">- 데이터 링크 계층 : MAC 주소</p>
                <p className="text-gray060 body-md mt-[8px]">- 물리 계층 : 이더넷</p>
            </article>

        </section>
    )
}
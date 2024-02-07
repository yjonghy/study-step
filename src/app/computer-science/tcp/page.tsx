"use client"
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {GhostPrimaryButton, MotionFast} from "@src/types/ButtonType";

export default function Tcp (){

    const router = useRouter()

    return(
        <article className="w-full h-full flex flex-col justify-center  mt-[40px] bg-white/70 p-[10px] rounded-[8px]">
            <h1 className="text-gray090 heading-xl">TCP</h1>

            <div className="mt-[12px] w-full text-gray090">
                <h2 className="body-lg">TCP란?</h2>
                <p className="body-sm mt-[4px]">
                    전송 제어 프로토콜, Transmission Control Protocol 의 준말로<br/>
                    <span
                        onClick={() => {
                            router.push("/osi")
                        }}
                        className="text-hourblue underline">인터넷 프로토콜 스위트(OSI 7계층에서 추가 서술)</span>
                    의 핵심 프로토콜 중 하나, IP와 함께 TCP/IP로 불림<br/>
                    Vint CERF, Bob Kahn (당시 DARPA 과학자)는 TCP를 1970년 대에 설계
                </p>
            </div>

            <div className="mt-[24px] w-full text-gray090">
                <h2 className="body-lg">통신 과정</h2>
                <div className="w-full flex flex-col  justify-center gap-[4px]">
                    <p className="body-sm self-center">연결과정</p>
                    <img src={"/tcp-3way.jpeg"} className="w-full object-cover"/>
                    <p className="body-sm mt-[8px]">
                        #1-SYN<br/>
                        클라이언트가 서버에게 SYN 메시지를 전송.이 메시지에 포함된 시퀀스 번호는 클라이언트가 임의로 설정한 값 A
                    </p>

                    <p className="body-sm mt-[4px]">
                        #2-SYN-ACK<br/>
                        서버가 클라이언트에게 SYN-ACK 메시지로 응답. 이 메시지에 포함된 시퀀스 번호는 서버가 임의로 설정한 값 B, 응답 번호는 (A + 1)
                    </p>

                    <p className="body-sm mt-[4px]">
                        #3-ACK<br/>
                        클라이언트가 서버에게 ACK 메시지 전송. 이 메시지에 포함된 응답 번호는 (B + 1)
                    </p>

                    <p className="body-xs mt-[4px]">
                        1.클라이언트가 서버에  SYN 전송 후 SYN_SENT 상태로 대기 <br/>
                        2.서버가 SYN 수신을 받으면 SYN-RECEIVED 상태로 변경후 SYN, ACK 전송<br/>
                        3.SYN, ACK 전송받은 클라이언트는 ESTABLISHED 상태로 변경, 서버에게 ACK 전송<br/>
                        4.ACK 전송받은 서버는 ESTABLISHED 상태<br/><br/>

                        CLOSED / 연결 수립 전 기본 상태<br/>
                        LISTEN / 포트 열린 상태, 연결 요청 대기<br/>
                        SYN-SENT / SYN 전송 요청 한 상태<br/>
                        SYN-RECEIVED / SYN 요청 받은 뒤 응답<br/>
                        ESTABLISHED / 연결 수립 완료, 데이터 교환가능<br/>
                    </p>
                </div>
                <div className="w-full flex flex-col justify-center gap-[4px] mt-[12px]">
                    <p className="body-sm self-center ">연결해제과정</p>
                    <img src={"/tcp-4way.png"} className="w-full object-cover"/>
                    <p className="body-sm mt-[8px]">
                        #1-FIN <br/>
                        요청을 닫을쪽(클라이언트라고 가정)은 FIN 메시지를 서버로 보내고 FIN_WAIT_1 상태로 변경. <br/>
                        FIN_WAIT_1 상태에 있는 동안 서버로부터 ACK 응답을 기다린다.
                    </p>
                    <p className="body-sm mt-[4px]">
                        #2-ACK<br/>
                        서버가 클라이언트로부터 FIN 메시지를 수신, <br/>
                        서버는 즉시 ACK 메시지를 클라이언트로 송신. <br/>
                        클라이언트는 ACK 수신 후 FIN_WAIT_2 으로 상태변경 <br/>
                        FIN_WAIT_2 상태에 있는 동안 클라이언트는 서버가 FIN 메시지를 보낼때까지 대기 <br/>

                        전송할 데이터가 남아있다면 이어서 계속 전송  <br/>
                        클라이언트 쪽에서도 아직 서버로부터 받지 못한 데이터가 있을 것을 대비해 일정 시간동안 세션을 남겨놓고 기다림 - TIME-WAIT
                    </p>
                    <p className="body-sm mt-[4px]">
                        #1-FIN <br/>
                        서버의 통신이 끝나면 연결을 닫을준비가 되었다는 FIN 메시지 전송 <br/>
                    </p>
                    <p className="body-sm mt-[4px]">
                        #2-ACK <br/>
                        클라이언트는 FIN 메시지 수신 후 ACK 몌시지 서버로 전송 <br/>
                        서버는 ACK 메시지 수신 후 연결 해제
                    </p>

                    <p className="body-xs mt-[4px]">
                        CLOSED / 연결 수립 전 기본 상태<br/>
                        ESTABLISHED / 연결 수립 완료, 데이터 교환가능<br/>
                        CLOSE-WAIT / 상대의 FIN 받은상태, 그에 대한 ACK 송신 후 애플리케이션 종료<br/>
                        LAST-ACK / 종료 후 자신의 FIN 송신, 상대의 ACK 기다림<br/>
                        FIN-WAIT-1 / FIN 송신 후 ACK, 혹은 FIN 수신 대기<br/>
                        FIN-WAIT-2 / FIN 송신 후 ACK 받은 상태에서 FIN 수신 대기<br/>
                        TIME-WAIT / 연결 종료가 완료된 상태, 새 연결과 겹치지 않게 일정 시간 대기 후 CLOSED 변경 <br/>
                    </p>
                </div>
            </div>




            <div className="mt-[24px] w-full text-gray090">
                <h2 className="body-lg">특징 ( TCP Segment 구조, Segment Header 에서 상세히 서술 )</h2>

                <div className={`mt-[4px] relative ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">1.신뢰성 있는 전송</p>
                    <div className="mt-[8px] ml-[8px] bg-white rounded-[8px] p-[10px] text-gray060 body-xs">
                        수신자가 메시지를 오류없이 받았다면 ACK<br/>
                        중간에 오류가 났다면 N(Negative 혹은 리셋)ACK 메시지를 송신자에게 전송 : 오류가 난 요청에 대해 재요청 가능<br/>
                    </div>
                </div>

                <div className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">2.순서제어</p>
                    <div className="mt-[8px] ml-[8px] bg-white rounded-[8px] p-[10px] text-gray060 body-xs">
                        세그먼트 헤더에 시퀀스넘버가 있기 때문에 수신자 측에서 시퀀스 넘버대로 데이터 청크를 이어붙인다
                    </div>
                </div>

                <div
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">3.에러제어</p>
                    <div className="mt-[8px] ml-[8px] bg-white rounded-[8px] p-[10px] text-gray060 body-xs">
                        세그먼트 헤더에 체크섬부분에서 에러디텍팅후에 에러 발견시 ACK 리셋으로 오류 사실 전송
                    </div>
                </div>

                <div
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">4.흐름제어</p>
                    <div className="mt-[8px] ml-[8px] bg-white rounded-[8px] p-[10px] text-gray060 body-xs">
                        1.stop and wait<br/>
                        매번 전송한 세그먼트에 대하여 확인응답을 받아야 다음 세그먼트를 전송하는 방법<br/>
                        구현이 단순하지만 전송지가 응답을 받을 때까지 다음 세그먼트를 전송할 수 없으므로 효율이 떨어짐<br/>
                        2.Sliding Window
                        수신 측의 버퍼(메모리)에 여유가 없으면 그 뒤에 도착한 데이터는 폐기 처분 {`->`} 자원낭비 <br/>
                        이런 데이터 전송 흐름을 제어해야 자원의 낭비가 없어짐<br/>
                        수신측에서 설정한 window size (TCP 수신 버퍼-메모리)와 송신측 window size는 맨처음 연결과정에서 수립(3way-handshake)<br/>
                        *버퍼크기는 또한 RTT(Round Trip Time, 세그먼트 왕복시간)를 고려하여 설정<br/>
                        이 값이 너무 크다면 네트워크 상태가 불안정 할수도 있으므로 window size 줄임, <br/>
                        통신하는 과정에서 동적으로 window size 조절<br/>
                        <img src={"/sliding_window.png"} className="mt-[8px] w-full object-cover"/>
                        송신측의 window size 가 3일경우, <br />
                        초기에 0,1,2 전송 후 응답으로(ACK) window size 1을 받을경우 0은 처리되었고 남은 공간이 1이므로 3전송 후 응답대기 <br/>
                        다 보낼때까지 위과정 반복
                    </div>
                </div>

                <div
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">5.혼잡제어</p>
                    <div className="mt-[8px] ml-[8px] bg-white rounded-[8px] p-[10px] text-gray060 body-xs">
                        데이터 흐름을 제어하는게 흐름제어 였다면, 네트워크상에서 혼잡을 피하기 위한것이 혼잡제어<br/>
                        1.혼잡제어 기법<br/>
                        -AIMD(Additive Increase/Multiplicative Decrease)
                        -느린 시작(Slow Start)
                        -혼잡 회피(Congestion Avoidance)
                        -빠른 재전송(Fast Retransmit)
                    </div>
                </div>

            </div>


            <div className="mt-[24px] w-full text-gray090">
                <h2 className="body-lg">TCP Segment 구조</h2>


            </div>


        </article>

    )
}


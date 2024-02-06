"use client"
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {GhostPrimaryButton, MotionFast} from "@src/types/ButtonType";

export default function Tcp (){

    const router = useRouter()
    const [feature1, setFeature1] = useState(false)
    const [feature2, setFeature2] = useState(false)
    const [feature3, setFeature3] = useState(false)
    const [feature4, setFeature4] = useState(false)
    const [feature5, setFeature5] = useState(false)
    const [feature6, setFeature6] = useState(false)

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
                <div className="w-full flex flex-col items-center justify-center gap-[4px] mt-[12px]">
                    <p className="body-sm">연결해제과정</p>
                    <img src={"/tcp-4way.png"} className="w-full object-cover"/>
                </div>
            </div>




            <div className="mt-[24px] w-full text-gray090">
                <h2 className="body-lg">특징</h2>

                <div
                    onClick={() => setFeature1(!feature1)}
                    className={`mt-[4px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">1.신뢰성 있는 전송</p>
                    {feature1 &&
                        <div className="absolute top-[calc(100%_+_10px)] left-0 bg-white rounded-[8px] p-[10px] z-[1]">
                            asdasd
                        </div>
                    }
                </div>

                <div
                    onClick={() => setFeature2(!feature2)}
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">2.순서제어</p>
                    {feature2 &&
                        <div className="absolute top-[calc(100%_+_10px)] left-0 bg-white rounded-[8px] p-[10px]">
                            asdasd
                        </div>
                    }
                </div>

                <div
                    onClick={() => setFeature1(!feature3)}
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">3.전이중</p>
                    {feature3 &&
                        <div className="absolute top-[calc(100%_+_10px)] left-0 bg-white rounded-[8px] p-[10px]">
                        </div>
                    }
                </div>

                <div
                    onClick={() => setFeature1(!feature4)}
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">4.에러제어</p>
                    {feature4 &&
                        <div className="absolute top-[calc(100%_+_10px)] left-0 bg-white rounded-[8px] p-[10px]">
                        </div>
                    }
                </div>

                <div
                    onClick={() => setFeature1(!feature1)}
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">5.흐름제어</p>
                    {feature5 &&
                        <div className="absolute top-[calc(100%_+_10px)] left-0 bg-white rounded-[8px] p-[10px]">
                        </div>
                    }
                </div>

                <div
                    onClick={() => setFeature6(!feature6)}
                    className={`mt-[8px] relative cursor-pointer ${MotionFast} ${GhostPrimaryButton} rounded-[8px] p-[10px]`}>
                    <p className="body-sm">6.혼잡제어</p>
                    {feature6 &&
                        <div className="absolute top-[calc(100%_+_10px)] left-0 bg-white rounded-[8px] p-[10px]">
                        </div>
                    }
                </div>

            </div>
            {/*1.tcp란*/}
            {/*2.tcp특징*/}
            {/*
              2.순서제어
                    3.전이중
                    4.에러제어
                    5.흐름제어
                    6.혼잡제어
            */}
            {/*3.tcp 구조*/}
            {/*4.3way handshake*/}
            {/*5.4way handshake*/}
        </article>

    )
}
// 특징
// 1. 연결 지향 프로토콜(Connection Oriented Protocol)
//
// 물리적으로 전용회선이 연결되어 있는 것처럼 가상의 연결통로를 설정하여 통신하는 방식으로 가상의 연결통로를 가상회선이라 한다.
//     가상회선방식 : 물리적으로 전용회선이 연결되어 있는 것처럼 논리적으로 동작하는 방식
// 논리적인 연결통로를 통해 데이터를 주고받음으로써 데이터의 전송순서를 보장해준다. 순서제어 라고도 한다.
//     스트림 기반의 전송방식을 사용한다. 데이터를 임의의 크기로 나누어 연속해서 전송하는 방식을 사용한다.
//
// 2. 신뢰할 수 있는 프로토콜(Reliable Protocol)
// 흐름제어
// 상대방이 받을 수 있을 만큼만 데이터를 효율적으로 전송하는 것
// 흐름제어를 위해 슬라이딩 윈도우(Sliding Window) 방식을 사용한다. 이는 상대방이 수신 가능한 크기(Window size) 내에서 데이터를 연속해서 전송하는 방식으로 매 세그먼트(Segment) 전송 시마다 수신확인응답(ACK)을 수신한 후 전송하게 되면 왕복시간(RTT : Round Trip Time)이 길 경우 단위 시간당 데이터 전송량이 매우 떨어지므로 효율적으로 전송하기 위해 상대방이 받을 수 있는 범위 내에서 연속적으로 전송한다.
//     오류제어
// 데이터의 오류나 누락없이 안전한 전송을 보장
// 오류 또는 누락 발생 시 재전송을 수행하여 이를 보정
// 혼잡제어
// 네트워크의 혼잡 정도에 따라 송신자가 데이터 전송량을 제어하는 것을 말한다.
//     혼잡정도에 대한 판단기준은 데이터의 손실 발생 유무로 판단한다. 전송한 데이터에 누락이 발생하면 네트워크가 혼잡한 상태로 판단하여 전송량을 조절한다.



//
// 전송 제어 프로토콜(Transmission Control Protocol, TCP, 문화어: 전송조종규약)은
// 인터넷 프로토콜 스위트(IP)의 핵심 프로토콜 중 하나로, IP와 함께 TCP/IP라는 명칭으로도 널리 불린다.
// TCP는 근거리 통신망이나 인트라넷, 인터넷에 연결된 컴퓨터에서 실행되는 프로그램 간에 일련의 옥텟을 안정적으로,
// 순서대로, 에러없이 교환할 수 있게 한다. TCP는 전송 계층에 위치한다. 네트워크의 정보 전달을 통제하는 프로토콜이자 인터넷을 이루는 핵심 프로토콜의 하나로서 국제 인터넷 표준화 기구(IETF)의 RFC 793에 기술되어 있다.
//
//     TCP는 웹 브라우저들이 월드 와이드 웹에서 서버에 연결할 때 사용되며, 이메일 전송이나 파일 전송에도 사용된다.
//
//     TCP의 안정성을 필요로 하지 않는 애플리케이션의 경우 일반적으로
//     TCP 대신 비접속형 사용자 데이터그램 프로토콜(User Datagram Protocol)을 사용한다. 이것은 전달 확인 및 순차 보장 기능이 없는 대신 오버헤드가 작고 지연시간이 짧다는 장점이 있다.
//

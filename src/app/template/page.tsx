"use client"
import React from "react"
import {MediumBtnStyle, MotionFast, PrimaryButton} from "@src/types/ButtonType";
export default function Template() {


    return (
        <section id="career_layout" className="w-full h-full flex flex-col">
            <article className="py-[40px] rounded-[8px] px-[30px] bg-white/70 shadow-shadow15">
                <p className="heading-xl text-gray080">About me</p>

                <p className="mt-[20px] heading-sm text-gray080">- 도전을 즐기며, 개발 중인 서비스를 심도 있게 생각하는 개발자입니다.</p>
                <p className="mt-[2px] heading-sm text-gray080">- 새로운 환경에 도전하는 걸 두려워하지 않고 서비스를 안정적으로 운영하기 위한 개발을 항상 고민합니다.</p>
                <p className="mt-[8px] body-sm text-gray080">
                    analytics firebase console 모니터링하며 서비스를 검토합니다
                    Next.js를 사용할 줄 모르는 상태에서 Next.js 접하는 환경을 마주하게 되어 도전을 즐기며 프로젝트를 마무리 하였습니다
                </p>

                <div className="w-full h-[1px] my-[20px] bg-gray080"></div>

                <p className="mt-[20px] heading-sm text-gray080">- 모르는 걸 숨기지 않으며 깊이 있게 탐구하는걸 좋아합니다.</p>
                <p className="mt-[2px] heading-sm text-gray080">- 사소한 부분이라도 커뮤니케이션을 중요시하게 생각하며 원활한 소통을 위해 끊임없이 노력합니다.</p>
                <p className="mt-[8px] body-sm text-gray080">
                    흔한 변수명과 함수명 등 기본적인 것뿐만 아니라, recoil key, storage key 또한 규칙이 있어야 한다고 생각합니다
                    단순히 개발에서 그치지 않고, 웹 생태계의 흐름을 파악하려 노력합니다
                </p>
            </article>

            <article className="mt-[20px] py-[40px] rounded-[8px] px-[30px] bg-white/70 shadow-shadow15">
                <p className="heading-xl text-gray080">Career</p>
                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">먼치팩토리</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2023/01 ~ 재직 중</p>
                </div>
                <p className="mt-[8px] body-sm text-gray080">아워플레이스 / 컨텐츠(유투브, 광고 등)촬영에 필요한 장소를 대여 할 수 있는 플랫폼</p>
                <p className="mt-[4px] body-sm text-gray080">웹 프론트엔드 개발팀</p>
                <div className="flex flex-col">

                    <p className="mt-[8px] heading-sm text-gray080">Stack</p>

                    <div className="mt-[2px] w-full flex flex-wrap gap-[4px]">
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-yellow070 ">
                            <p className="body-sm text-white">TypeScript</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-yellow070 ">
                            <p className="body-sm text-white">Next.js</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-yellow070 ">
                            <p className="body-sm text-white">Recoil</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-yellow070 ">
                            <p className="body-sm text-white">React Query</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-yellow070 ">
                            <p className="body-sm text-white">TailwindCSS</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-yellow070 ">
                            <p className="body-sm text-white">HTML</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-yellow070 ">
                            <p className="body-sm text-white">CSS</p>
                        </div>
                    </div>
                </div>

                <div className="w-fit mt-[20px] flex flex-col gap-[2px]">
                    <a className="body-sm text-blue030 underline" href="https://hourplace.co.kr/" target="_blank">아워플레이스-한국</a>
                    <a className="body-sm text-blue030 underline" href="https://hourplace.com/" target="_blank">아워플레이스-미국</a>
                </div>

                <div className="w-full h-[1px] my-[20px] bg-gray080"></div>


                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">클래시컴퍼니</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2019/09 ~ 2023/01</p>
                </div>
                <p className="mt-[8px] body-sm text-gray080">간판의품격 / 간판 제작을 원하는 자영업자들에게 원하는 견적을 토대로 업체를 매칭 시켜주는 플랫폼</p>
                <p className="mt-[4px] body-sm text-gray080">프론트엔드 개발 담당</p>
                <div className="flex flex-col">

                    <p className="mt-[8px] heading-sm text-gray080">Stack</p>

                    <div className="mt-[2px] w-full flex flex-wrap gap-[4px]">
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-green070 ">
                            <p className="body-sm text-white">JavaScript</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-green070 ">
                            <p className="body-sm text-white">React</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-green070 ">
                            <p className="body-sm text-white">styled-components</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-green070 ">
                            <p className="body-sm text-white">HTML</p>
                        </div>
                        <div className="py-[4px] px-[8px] flex justify-center items-center rounded-full bg-green070 ">
                            <p className="body-sm text-white">CSS</p>
                        </div>
                    </div>
                </div>

                <a className="mt-[20px] body-sm text-blue030 underline block" href="https://www.ganpoom.com/" target="_blank">간판의품격</a>

            </article>


            <article className="mt-[20px] py-[40px] rounded-[8px] px-[30px] bg-white/70 shadow-shadow15">
                <p className="heading-xl text-gray080">Project</p>


                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">미국 지역을 타깃으로 한 기존 웹서비스 신규 개발 및 유지보수</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2023.05 ~ 현재진행 중 </p>
                </div>

                <div className="mt-[12px] flex gap-[4px] items-center">
                    <p className="w-[14px] h-[14px] heading-xs text-white bg-green050 rounded-[4px] text-center">*</p>
                    <p className="heading-xs text-gray080">성과/결과 및 이슈</p>
                </div>

                <div className="mt-[8px] flex gap-[4px] ">
                    <p className="w-[14px] h-[14px] heading-xs text-white bg-green050 rounded-[4px] text-center invisible">*</p>
                    <div className="flex flex-col gap-[2px]">
                        <div className="flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 장소 리스트 페이지에서 많은 썸네일 이미지로 인해 로딩 이슈 발생</p>
                            </div>
                            <div className="w-fit p-[8px] flex flex-col body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">
                                <p>장소 데이터 업로드 과정에서 업로드 완료 시, display : none 으로 되어있는 img 태그 src에 웹 서비스 안에서 쓰는 이미지 크기를 사이즈별로 쿼리 요청하여 이미지 미리 생성</p>
                                <p>스켈레톤 ui, 로더 ui 부재 속에서 api 요청 과정(요청, 대기, 완료)을 qa, pm 등 비 개발자에게 설명하며, 도입 필요성 피력 후 도입</p>
                                <p>react-query isLoading 및 isSuccess 활용, jsx 조건부 렌더링을 사용하여 제작</p>
                                <p>img 브라우저에 렌더링 될 때도 loading 있음을 설명하고 onload 활용, boolean 설정하여 loader ui 도입</p>
                            </div>
                        </div>

                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 서비스 제공 지역이 미국으로, 타임존 이슈 발생</p>
                            </div>
                            <p className="w-fit p-[8px] body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">Intl api를 사용하여 브라우저에 저장된 timeZone과 en-us 를 지역값으로 가지는 option 객체로 받아온 데이터의 시간을 바꾼 뒤 string으로 변환하여 표시</p>
                        </div>

                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 모달창이 열린 상태에서 브라우저 뒤로가기 클릭할 때 페이지 상태 유지 후 모달창이 닫혀야 하지만 페이지가 뒤로 가는 이슈 발생</p>
                            </div>
                            <div className="w-fit p-[8px] flex flex-col body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">
                                <p>모달창 열때 기존 주소창에 해시(#)추가하여 페이지 이동은 없이 스택 추가</p>
                                <p>스켈레톤 ui, 로더 ui 부재 속에서 api 요청 과정(요청, 대기, 완료)을 qa, pm 등 비 개발자에게 설명하며, 도입 필요성 피력 후 도입</p>
                                <p>window.popstate 이벤트를 활용하여 뒤로가기 클릭 이벤트 체크 후 팝업창이 열려있으면 팝업창을 닫고 이벤트 종료 - 페이지 뒤로가기 이벤트 막기</p>
                                <p>window 이벤트 내부에선 이벤트가 등록된 시점에서의 state만 가져올 수 있는 이슈로 바뀐 state 값을 가져오지 못하여 전역변수 활용하여 해결 (그 외에 useRef 사용 가능)</p>
                            </div>
                        </div>



                        <div className="mt-[12px] flex items-center gap-[4px]">
                            <p className="heading-xs text-gray060">▶ Next.js 13버전에서 14버전으로 업그레이드 후 초기 진입 속도 1.5초 가량 단축</p>
                        </div>
                    </div>
                </div>



                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">아워플레이스 웹사이트 PHP {`->`} Next.js로 마이그레이션</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2023.01 ~ 현재진행 중 </p>
                </div>

                <div className="mt-[12px] flex gap-[4px] items-center">
                    <p className="w-[14px] h-[14px] heading-xs text-white bg-green050 rounded-[4px] text-center">*</p>
                    <p className="heading-xs text-gray080">성과/결과 및 이슈</p>
                </div>

                <div className="mt-[8px] flex gap-[4px] ">
                    <p className="w-[14px] h-[14px] heading-xs text-white bg-green050 rounded-[4px] text-center invisible">*</p>
                    <div className="flex flex-col gap-[2px]">

                        <div className="mt-[12px] flex items-center gap-[4px]">
                            <p className="heading-xs text-gray060">▶ 개발 전, 이미 작업 중인 프로젝트 및 마이그레이션 업무 특성 생각하여 커뮤니케이션에 비중을 둠</p>
                        </div>
                        <div className="mt-[12px] flex items-center gap-[4px]">
                            <p className="heading-xs text-gray060">▶ 미리 만들어져 있는 구조위에 빠르게 적응하여 코드 통일성 유지</p>
                        </div>
                        <div className="mt-[12px] flex items-center gap-[4px]">
                            <p className="heading-xs text-gray060">▶ 마이그레이션 진척도 90% 이상 달성</p>
                        </div>

                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 이미지 여러 장 첨부할 경우 첫 번째 사진만 업로드 되는 버그 발생</p>
                            </div>
                            <div className="w-fit p-[8px] flex flex-col body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">
                                <p>1. 업로드 할 이미지 url(aws) 발급 - 2. 실제 이미지 aws s3 업로드 - 3. 업로드 후 저장된 이미지 url 발급</p>
                                <br/>
                                <p>네트워크 분석 결과 1번의 과정에서 동일한  response 확인</p>
                                <p>1번의 과정은 단순 url 받는 과정으로 api 요청 캐시 되어 이전에 받았던 response 다시 내려오는 과정 확인</p>
                                <p>이미지 여러 장일 경우 index 값을 함께 파라미터로 보내고, query parameter로 사용하여 캐시 되지 않게 수정 후 버그 해결</p>
                            </div>
                        </div>


                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 카카오톡 내 브라우저, 삼성 브라우저 등 디버깅 설정이 어려운 환경에서 이슈 발생</p>
                            </div>
                            <p className="w-fit p-[8px] body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">sentry 도입 후 이슈 발생한 부분에 error throw 후 모니터링 하여 이슈 체크 후 해결</p>
                        </div>

                    </div>
                </div>


                <div className="w-full h-[1px] my-[20px] bg-gray080"></div>


                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">간판의품격 웹서비스 추가 기능 개발 및 유지보수</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">바닐라 js, jquery 로 이루어진 기존 웹페이지 react 마이그레이션</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2020.10 ~ 2023.01</p>
                </div>

                <div className="mt-[12px] flex gap-[4px] items-center">
                    <p className="w-[14px] h-[14px] heading-xs text-white bg-green050 rounded-[4px] text-center">*</p>
                    <p className="heading-xs text-gray080">성과/결과 및 이슈</p>
                </div>

                <div className="mt-[8px] flex gap-[4px] ">
                    <p className="w-[14px] h-[14px] heading-xs text-white bg-green050 rounded-[4px] text-center invisible">*</p>
                    <div className="flex flex-col gap-[2px]">



                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 간판 제작업체 전용 페이지에서 모든 페이지에 안 읽은 채팅 개수 및 받은 견적을 보여줘야 하는 ui</p>
                            </div>
                            <div className="w-fit p-[8px] flex flex-col body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">
                                <p>redux 도입 후 간판 제작업체 유저 데이터를 redux로 관리하도록 개발</p>
                            </div>
                        </div>


                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 마이그레이션 작업 중 css 중복 (클래스명 중복) 문제로 스타일 적용 어려움 발생</p>
                            </div>
                            <div className="w-fit p-[8px] flex flex-col body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">
                                <p>styled-component 도입 후 구조 제작</p>
                            </div>
                        </div>


                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 간판 제작을 위한 견적서 작성 프로세스를 페이지가 아닌 view change로 기획되어 브라우저 뒤로가기 클릭 시 페이지 이동이 아닌 이전 view를 보여줘야 하는 이슈</p>
                            </div>
                            <p className="w-fit p-[8px] body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">위에서 작성한 첫 번째 프로젝트 모달창 이슈 해결 방법과 동일하게 해결</p>
                        </div>

                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 당시 네이티브 앱이 웹을 보여주는 웹뷰만 있던 형식으로 웹에 심어져 있는 이벤트 트래킹 앱 웹뷰에서 발생한 건지, 웹에서 발생한 건지 분기 처리 이슈 발생</p>
                            </div>
                            <p className="w-fit p-[8px] body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">javascript webview bridge 활용하여 만들어놓은 bridge가 있을경우 네이티브 함수 호출하여 이벤트 트래킹</p>
                        </div>


                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 웹 사이트 seo 제대로 작동하지 않던 이슈 발생</p>
                            </div>
                            <div className="w-fit p-[8px] flex flex-col body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">
                                <p>초기엔 react helmet 도입하여 테스트 및 꾸준히 수정</p>
                                <p>아예 적용조차 되지 않는 이슈로 helmet 한계점 파악 후,</p>
                                <p>동적 meta 정보가 담긴 문서를 반환하는 api (node.js)제작하여</p>
                                <p>aws lambda 사용하여 seo 봇 접근 시 호출되게 배포 환경 수정 및 seo 적용 확인</p>
                            </div>
                        </div>


                        <div className="mt-[12px] flex flex-col gap-[4px]">
                            <div className="flex items-center gap-[4px]">
                                <p className="heading-xs text-gray060">▶ 하나의 프로젝트 내에서 <br/>
                                    1.웹 메인 서비스 <br/>
                                    2.간판 제작업체 전용 페이지 <br/>
                                    3.서비스 관리용 페이지(영업 및 기획) <br/>
                                    총 3개가 같은 도메인으로 일반 사용자는 2, 3번 페이지에 접근하면 안되는 이슈
                                </p>
                            </div>
                            <div className="w-fit p-[8px] flex flex-col body-xs text-white bg-blue070/50 rounded-[8px] shadow-shadow16_15">
                                <p>Route component 커스텀하여 login 안되어있을경우</p>
                                <p>login 후 user 타입이 고객일 경우를 체크하여 Redirect return 또는 그 반대일 경우</p>
                                <p>해당 page component return 하게끔 제작</p>
                            </div>
                        </div>


                    </div>
                </div>





            </article>
        </section>
    )
}
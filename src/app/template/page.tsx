"use client"
import React from "react"
export default function Template() {
    return (
        <section className="w-full h-full">
            <article className="py-[40px] rounded-[8px] px-[30px] bg-white/70 shadow-shadow15">
                <p className="heading-xl text-gray080">About me</p>

                <p className="mt-[20px] heading-sm text-gray080">- 도전을 즐기며, 개발 중인 서비스를 심도 있게 생각하는 개발자입니다.</p>
                <p className="mt-[2px] heading-sm text-gray080">- 새로운 환경에 도전하는 걸 두려워하지 않고 서비스를 안정적으로 운영하기 위한 개발을 항상 고민합니다.</p>
                <p className="mt-[8px] body-sm text-gray080">
                    analytics와 firebase console 모니터링하며 서비스를 검토하합니다
                    Next.js를 사용할줄 모르는 상태에서 Next.js 접하는 환경을 마주하게 되어 도전을 즐기며 프로젝트를 마무리 하였습니다
                </p>

                <div className="w-full h-[1px] my-[20px] bg-gray080"></div>

                <p className="mt-[20px] heading-sm text-gray080">- 모르는 걸 숨기지 않으며 깊이있게 탐구하는걸 좋아합니다.</p>
                <p className="mt-[2px] heading-sm text-gray080">- 사소한 부분이라도 커뮤니케이션을 중요시하게 생각하며 원활한 소통을 위해 끊임없이 노력합니다.</p>
                <p className="mt-[8px] body-sm text-gray080">
                    흔한 변수명과 함수명등 기본적인것뿐만 아니라, recoil key, storage key 또한 규칙이 있어야 한다고 생각합니다
                    단순히 개발에서 그치지 않고, 웹 생태계의 흐름을 파악하려 노력합니다
                </p>
            </article>

            <article className="mt-[20px] py-[40px] rounded-[8px] px-[30px] bg-white/70 shadow-shadow15">
                <p className="heading-xl text-gray080">Career</p>
                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">먼치팩토리</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2023/01 ~ 재직중</p>
                </div>
                <p className="mt-[8px] body-sm text-gray080">아워플레이스 / 컨텐츠(유투브, 광고 등)촬영에 필요한 장소를 대여 할 수 있는 플랫폼</p>
                <p className="mt-[4px] body-sm text-gray080">웹 프론트엔드 개발팀</p>
                <div className="w-fit mt-[4px] flex flex-col gap-[2px]">
                    <a className="body-sm text-blue030 underline" href="https://hourplace.co.kr/" target="_blank">아워플레이스-한국</a>
                    <a className="body-sm text-blue030 underline" href="https://hourplace.com/" target="_blank">아워플레이스-미국</a>
                </div>

                <div className="w-full h-[1px] my-[20px] bg-gray080"></div>


                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">클래시컴퍼니</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2019/09 ~ 2023/01</p>
                </div>
                <p className="mt-[8px] body-sm text-gray080">간판의품격 / 간판제작을 원하는 자영업자들에게 원하는 견적을 토대로 업체를 매칭시켜주는 플랫폼</p>
                <p className="mt-[4px] body-sm text-gray080">프론트엔드 개발담당</p>
                <a className="mt-[4px] body-sm text-blue030 underline" href="https://www.ganpoom.com/" target="_blank">간판의품격</a>

            </article>


            <article className="mt-[20px] py-[40px] rounded-[8px] px-[30px] bg-white/70 shadow-shadow15">
                <p className="heading-xl text-gray080">Project</p>

                <div className="mt-[20px] flex items-center gap-[4px]">
                    <p className="heading-sm text-gray080">미국 지역을 타깃으로 한 기존 웹서비스 신규 개발 및 유지보수</p>
                    <div className="mx-[4px] w-[2px] h-[8px] self-center bg-gray080"></div>
                    <p className="heading-sm text-gray080">2023.05 ~ 현재진행 중 </p>
                </div>
              

            </article>

        </section>
    )
}
export default function Browser() {
    return (
        <article className="w-full h-full flex flex-col justify-center  mt-[40px] bg-white/70 p-[10px] rounded-[8px]">
            <h1 className="text-gray090 heading-xl">Cookie</h1>
            <p className="body-sm mt-[8px]">
                서버와 클라이언트{`(이하 브라우저)`}가 지속적 데이터 교환을 하기위 만들어진 키밸류 형식의 데이터파일.<br />
                서버가 쿠키 데이터를 전송하면 클라이언트는 저장해놓았다가 동일한 서버에 재 요청시 쿠키 데이터 전송.<br />
                저장 위치가 클라이언트여서 데이터를 저장하기 위한 목적, 브라우저 저장소로 사용<br />
                브라우저 저장소로 사용하기엔 작은용량{`(4kb, 20개)`}과 클라이언트에서 쿠키를 생성할경우 모든 http요청마다 쿠키가 함께 전송되는 단점으로<br />
                데이터를 저장하려는 목적으론 HTML5부터 제공하는 Web Storage를 사용한다.
            </p>

            <h1 className="mt-[24px] text-gray090 heading-xl">Web Storage</h1>
            <p className="body-sm mt-[8px]">
                쿠키와 마찬가지로 키밸류 형식의 데이터를 클라이언트에 저장할 수 있는 저장소.<br />
                쿠키를 저장소로 활용하던 측면에서의 단점을 보완.<br />
                개수제한 없이 약 5MB까지 저장가능, http요청마다 데이터가 전송되지 않는다. <br />
                storage는 <span className="text-hourblue">localStorage</span>와 <span className="text-hourblue">sessionStorage</span> 두 종류가 있다.<br />
                두 저장소의 차이는 데이터의 유지와 범위에서 차이가 있다.<br />
                local은 브라우저를 종료해도 데이터를 영구적으로 보관, session은 브라우저, 탭이 종료될때 데이터가 삭제된다.<br />
                도메인만 같으면 local은 다른 브라우저에서도 데이터를 공유할 수 있지만,<br />
                session은 도메인이 같아도 브라우저가 다를때뿐 아니라, 탭이 달라도 데이터를 공유 할 수 없다.<br />
            </p>
        </article>
    )
}
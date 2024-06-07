"use client";
import {useEffect} from "react";

const parentStyle = "flex flex-col items-start p-[20px] pb-[40px] bg-white/70 mt-[20px] rounded-[12px]"

export default function RecoilStory() {

    let count = 0
    useEffect(() => {

    }, [])

    return (
        <article className={parentStyle}>
            <p>Recoil 작업 회고</p>
            <p className="w-full body-md text-gray080 break-all">
                <br/><br/>
                <p>Recoil의 장점</p>
                <br/>
                {/*<br/>*/}
                {/*<p>Recoil은 상태관리 라이브러리로, redux와 비슷한 역할을 한다. 하지만 redux와 다른점은 redux의 경우 action, reducer, store, dispatch 등을*/}
                {/*    사용해야 하지만 recoil은 atom, selector, useRecoilState, useRecoilValue 등을 사용한다.</p>*/}
                {/*<br/>*/}
                {/*<p>Recoil은 상태를 전역적으로 관리할 수 있으며, 상태를 전역적으로 사용할 수 있다. 이는 redux와 비슷하다. 하지만 redux의 경우 상태를 사용하기 위해*/}
                {/*    connect를 사용해야 하지만 recoil은 useRecoilState, useRecoilValue를 사용하여 상태를 사용할 수 있다.</p>*/}
                {/*<br/>*/}
                {/*<p>Recoil은 상태를 사용할 때, atom을 사용하여 상태를 생성하고, selector를 사용하여 atom의 상태를 조합하여 사용할 수 있다. 이는 redux의 combineReducers와*/}
                {/*    비슷하다.</p>*/}
                {/*<br/>*/}
                {/*<p>Recoil은 상태를 사용할 때, useRecoilState를 사용하여 atom의 상태를 변경할 수 있으며, useRecoilValue를 사용하여 atom의 상태를 조회할 수 있다.</p>*/}
                {/*<br/>*/}
                {/*<p>Recoil은 상태를 사용할 때, selector를 사용하여 atom의 상태를 조합하여 사용할 수 있다. 이는 redux의 reselect와 비슷하다.</p>*/}
                {/*<br/>*/}
                {/*<p>Recoil은 상태를 사용할 때, selector의 get, set을 사용하여 atom의 상태를 변경할 수 있다.</p>*/}
                {/*<br/>*/}
                {/*<p>Recoil은 상태를 사용할 때, selector의 get, set을 사용하여 atom의 상태를 변경할 수 있다.</p>*/}
                {/*<br/>*/}
            </p>
        </article>
    )
}
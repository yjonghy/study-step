"use client"
import {useEffect, useRef, useState} from "react";

const tileStyle = `w-[100px] h-[55px] relative text-hourblue text-center text-[20px] flex items-center justify-center
                        before:content-[""] before:absolute before:top-[-25px] before:left-0 before:w-0 before:h-0 before:border-l-[50px] before:border-l-transparent before:border-r-[50px] before:border-r-transparent before:border-b-[25px]
                        after:content-[""] after:absolute after:bottom-[-25px] after:left-0 after:w-0 after:h-0 after:border-l-[50px] after:border-l-transparent after:border-r-[50px] after:border-r-transparent after:border-t-[25px]`


const verticalArray = [
    ["A", "B", "C"],["A", "D", "H"],["A", "E", "J"],["B", "E", "I"],
    ["B", "F", "K"],["C", "F", "J"],["C", "G", "L"],["D", "E", "F"],
    ["D", "I", "N"],["E", "F", "G"],["E", "I", "M"],["E", "J", "O"],
    ["F", "J", "N"],["F", "K", "P"],["G", "K", "O"],["H", "M", "Q"],
    ["H", "I", "J"],["I", "N", "R"],["I", "J", "K"],["J", "K", "L"],
    ["J", "N", "Q"],["J", "O", "S"],["K", "O", "R"],["L", "P", "S"],
    ["M", "N", "O"],["N", "O", "P"],["Q", "R", "S"]
]

function Hexagon() {

    //game rule


    //초기화면 - 알파벳 보드판, 게임시작 레벨 설정 버튼
    //게임 시작 후 - 30초간 숫자 보드판 보여준 후 알파벳 보드판으로 체인지
    //알파벳 보드판 체인지 후 나오는 타킷넘버와 1분30초의 타이머 작동

    //정답 입력 방식에 대한 고민
    //채점에 대한
    //타깃넘버 range 및 나오는 시점 대한 고민
    const levelInputRef = useRef(null)
    const [level, setLevel] = useState(6)
    //1. 초기화면 -> start false 시에 알파벳 보드화면
    const [start, setStart] = useState(false)

    const [gameBoard, setGameBoard] = useState([])
    const [hiddenBoard, setHiddenBoard] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"])
    const [remainTime, setRemainTime] = useState(30)
    const [targetNumber, setTargetNumber] = useState({number : 0, state : false})

    const [answerArray, setAnswerArray] = useState([])
    const [myAnswer, setMyAnswer] = useState([])


    //난이도 설정 초기 1~6
    useEffect(() => {
        const copyArray = []
        for (let i = 0; i < 19; i++) {
            let randomValue =  Math.floor(Math.random() * (level));
            randomValue += 1
            copyArray.push(randomValue)
        }
        const max = (level * 3) - 1
        const min =  (level / 2 + 1)
        //( Math.random() * ( 최대값 - 최소값 )  ) + 최소값
        const targetNumber = Math.floor(Math.random() * (max - min) ) + min
        setTargetNumber({ number : targetNumber, state: false })
        setGameBoard(copyArray)
    }, [level])

    useEffect(() => {
        let id;
        if (start) {
            id = setInterval(() => {
                setRemainTime((count) => count - 1);
            }, 1000);
            if(remainTime === 0) {
                clearInterval(id);
                setStart(false)
                setTargetNumber({ number : targetNumber.number, state: true })
            }
        }
        return () => { clearInterval(id) };
    }, [start, remainTime]);


    const getPermutations = (arr, num) => {
        const results = [];
        // nP1 이며, 1이면 의미 없기때문에 바로 반환한다.
        if (num === 1) return arr.map(v => [v]);
        arr.forEach((fixed, index, origin) => {
            // 순열에서는 조합과 달리 순서만 바뀌면 중복이 아니기때문에 기준값을 제외한 나머지 배열을 넣어준다.
            const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
            // 나머지 배열을 기준으로 다시 순열을 구한다.
            // 기준값(fixed)이 있기 때문에 선택하려는 개수에서 - 1 을 해준다.
            const permutations = getPermutations(rest, num - 1);
            // 기준값(fixed)에 순열(permutations)을 붙인다.
            const attached = permutations.map(v => [fixed, ...v]);
            // 붙인 값을 결과 값에 넣어준다.
            results.push(...attached);
        });
        return results;
    }



    const renderingBoard = (board) => {
        return (<>
            <div className="flex mt-1">
                {board.slice(0, 3).map((value, index) => (
                    <div key={index} className={`${tileStyle} ${myAnswer.includes(value) ? "bg-yellow040 before:border-b-yellow040 after:border-t-yellow040" : "bg-white before:border-b-white after:border-t-white"}`} onClick={() => hiddenBoardClick(value)}>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
            <div className="flex mt-1">
                {board.slice(3, 7).map((value, index) => (
                    <div key={index} className={`${tileStyle} ${myAnswer.includes(value) ? "bg-yellow040 before:border-b-yellow040 after:border-t-yellow040" : "bg-white before:border-b-white after:border-t-white"}`} onClick={() => hiddenBoardClick(value)}>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
            <div className="flex mt-1">
                {board.slice(7, 12).map((value, index) => (
                    <div key={index} className={`${tileStyle} ${myAnswer.includes(value) ? "bg-yellow040 before:border-b-yellow040 after:border-t-yellow040" : "bg-white before:border-b-white after:border-t-white"}`} onClick={() => hiddenBoardClick(value)}>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
            <div className="flex mt-1">
                {board.slice(12, 16).map((value, index) => (
                    <div key={index} className={`${tileStyle} ${myAnswer.includes(value) ? "bg-yellow040 before:border-b-yellow040 after:border-t-yellow040" : "bg-white before:border-b-white after:border-t-white"}`} onClick={() => hiddenBoardClick(value)}>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
            <div className="flex mt-1">
                {board.slice(16, 19).map((value, index) => (
                    <div key={index} className={`${tileStyle} ${myAnswer.includes(value) ? "bg-yellow040 before:border-b-yellow040 after:border-t-yellow040" : "bg-white before:border-b-white after:border-t-white"}`} onClick={() => hiddenBoardClick(value)}>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
        </>)
    }

    const hiddenBoardClick = (value) => {
        if (start) return
        const copyArray = [...myAnswer]
        copyArray.push(value)
        setMyAnswer(copyArray)
    }


    useEffect(() => {
        if (myAnswer.length === 3) {
            // a b c
            // a e c
            //console.log(myAnswer)
            const copyArray = [...answerArray]
            //console.log(copyArray.filter([id] => JSON.stringify([id]) === JSON.stringify(myAnswer)))
            const verify = copyArray.filter(item => JSON.stringify(item) === JSON.stringify(myAnswer))
            if (verify.length === 0) {
                alert("유효 하지않는 답입니다")
                setMyAnswer([])
                return;
            }


            let sumNumber = 0;
            myAnswer.map((value) => {
                const hiddenIndex =  hiddenBoard.findIndex(item => item === value)
                sumNumber += gameBoard[hiddenIndex]
            })

            if (sumNumber === targetNumber.number) {
                alert("정답입니다! +1")
                //return;
            } else {
                alert("오답입니다! -1")
            }

            const message = sumNumber === targetNumber.number ? "정답입니다 +1" : "오답입니다 -1"


            setMyAnswer([])
        }
    }, [myAnswer])

    useEffect(() => {
        const caseArray = []
        verticalArray.map((value) => {
            getPermutations(value, 3).map((item) => {
                caseArray.push(item)
            })
        })
        setAnswerArray(caseArray)
    },[])

    return(
        <div className="w-full h-full flex-col flex items-center">
            <p className="text-gray090 text-[42px] text-center mt-3.5">현재 난이도 {level}</p>

            <div className="w-full flex flex-col items-center justify-center mt-10">
                <p>난이도 설정</p>
                <div className="w-[260px] flex flex-col gap-5 mt-3.5">
                    <input pattern={"[0-9]*"} ref={levelInputRef} type={"text"} inputMode={"numeric"} className="w-full inline-block"/>
                    <div
                        className="p-[10px] rounded-[12px] bg-yellow010 text-gray090 text-center cursor-pointer"
                        onClick={() => {
                            if (levelInputRef.current) {
                                if (levelInputRef.current.validity.valid && levelInputRef.current.value >= 6) setLevel(Number(levelInputRef.current.value))
                            }
                        }}>
                        변경
                    </div>
                </div>
            </div>


            <div className="text-gray090 text-[42px] text-center mt-5">time : {remainTime}</div>

            <div className="w-[800px] h-[800px] mt-10 bg-yellow010 flex flex-col justify-center items-center">

                { !start ?
                    <>{renderingBoard(hiddenBoard)}</>
                    :
                    <>{renderingBoard(gameBoard)}</>
                }


            </div>

            <div className="text-center text-gray090 mt-10 cursor-pointer" onClick={() => setStart(true)}>
                시작하기
            </div>

            {/*<div className="text-center text-gray090 mt-10 cursor-pointer" onClick={() => setResult(true)}>*/}
            {/*    결과보기*/}
            {/*</div>*/}



            <div className="w-[260px] bg-gray025 text-center text-gray090 flex flex-col justify-center items-center gap-5 mt-2.5">
                <p className="text-[20px]">target Number</p>
                {targetNumber.state && <p className="text-[32px]">{targetNumber.number}</p>}
            </div>



        </div>
    )
}

export default Hexagon

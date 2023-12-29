"use client"
import React, {useEffect, useState} from "react";
import {checkWinner} from "@src/app/omock/checkWinner";

const black = "●"
const white = "○"

const colStyle = "w-[50px] h-[50px] bg-[#ffc078] relative cursor-pointer text-[30px] text-center hover:bg-[#fd7e14] "

function Omock() {

    const [gameLine, setLine] = useState(15)
    const [seeResult, setSeeResult] = useState(false)
    const origin =
        [
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
        ]

    const [gameBoard, setGameBoard] = useState(origin)


    const [player, setPlayer] = useState(black)
    const putOnStone = (row, col) => {
        if (gameBoard[row][col] !== "") {
            alert("해당위치는 안됩니다")
            return
        }
        const copyBoard = [...gameBoard]
        copyBoard[row][col] = player
        setGameBoard(copyBoard)
        setPlayer(player === black ? white : black)
    }

    const settingStoneAndPlayer = () => {
        gameBoard.map((rowArr, rowIndex) => {
            rowArr.map((col, colIndex) => {
                const elem = window.document.getElementById(`grid_${rowIndex}_${colIndex}`)
                if (col === "") return
                col === black ?
                    elem.className = "w-[30px] h-[30px] absolute bg-black rounded-[50%] z-[7]"
                    :
                    elem.className = `w-[30px] h-[30px] absolute ${seeResult ? "bg-white" : "bg-black"} rounded-[50%] z-[7]`
            })
        })
    }


    useEffect(() => {
        settingStoneAndPlayer()
        if (checkWinner(gameBoard, gameLine) !== undefined) {
            console.log(checkWinner(gameBoard, gameLine))
            checkWinner(gameBoard, gameLine) === black ? alert("흑승") : alert("백승")
        }
    }, [gameBoard, player])

    useEffect(() => {
        settingStoneAndPlayer()
    }, [seeResult])


    const boardLayout = () => {
        const lineArray = Array(gameLine).fill("")
        return lineArray.map((row, rowIndex) => (
            <div key={rowIndex} className="flex ">
                {lineArray.map((col, colIndex) => (
                    <div
                        onClick={() => { putOnStone(rowIndex, colIndex) }}
                        key={colIndex} className={colStyle}>
                        <div
                            className={`absolute top-0 right-0 left-0 bottom-0 border border-black flex justify-center items-center`}>
                            <div id={`grid_${rowIndex}_${colIndex}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        ))
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-gray090 text-[40px] mt-20">블라인드 오목</p>
            <div className="text-gray090 mt-3.5">현재 차례 : {player}</div>
            <div id="board_layout" className="w-[750px] h-[750px] border border-gray090 mt-20 aspect-square">
                {boardLayout()}
            </div>

            <div
                onClick={() => {
                    setSeeResult(!seeResult)
                }}
                className="text-gray090 mt-20 bg-gray040 rounded-[20px] p-[12px] cursor-pointer">
                결과 보기
            </div>
        </div>)
}

export default Omock
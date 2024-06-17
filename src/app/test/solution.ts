
//문제 https://school.programmers.co.kr/learn/courses/30/lessons/120882
import {useEffect} from "react";

function solution1(score) {
    //평균을 담은 배열, 추후에 등급이 아닌 순서로 정렬하기 위한 index 또한 저장
    const average = score.map((value, index) => {
        return { average : (value[0] + value[1]) / 2, index : index + 1 }
    })
    //평균을 오름순으로 정렬한 배열
    const averageSort = average.sort((a, b) => b.average - a.average)
    //등수를 매기기 위한 코드
    const rankArray = []
    averageSort.map((value, index) => {
        //오름순으로 이미 정렬되어있으므로 등수는 index + 1
        let rank = index + 1
        //findIndex 로 평균점수가 이미 등수 베열에 저장되어있는지 찾는다
        //등수 베열의 길이가 1이상이고 findIndex 값이 -1보다 클경우 -> 등수 베열에 같은 평균점수가 있을경우
        const findIndex = rankArray.findIndex(item => item.average === value.average )
        //현재 평균의 등수는 이미 저장되어있는 같은평균점수의 등수를 매긴다
        if (rankArray.length >= 1 && findIndex >= 0) {
            rank = rankArray[findIndex].rank
        }
        //저장되어있지않을때 등수매기기
        rankArray.push({ ...value, rank : rank })
    })
    //처음에 순서를 정렬하기 위한 index 로 sort 진행후 등수만 배열형식으로 return
    return rankArray.sort((a, b) => a.index - b.index).map((value) => { return value.rank});
}


//문제 https://school.programmers.co.kr/learn/courses/30/lessons/81301
function solution2(s) {
    const eng = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    let result = ""
    let string = ""
    s.split("").map((value, index) => {
        //value 가 숫자면 (isNaN === false) result 에 그대로 병합
        //string 일경우에 string 변수에 병합
        isNaN(value) ? string += value  : result += value
        //병합한 string 을 eng array 에서 검색한다
        eng.map((eng, index) => {
            //병합된 string 이 array 에 있을경우 result 에 index 병합 후 string 초기화
            if (eng === string) {
                result += String(index)
                string = ""
            }
        })
    })
    return parseInt(result);
}

//문제 https://school.programmers.co.kr/learn/courses/30/lessons/120894
function solution3(numbers) {

    const checkArray = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

    let result = ""
    let resultArray = []
    numbers.split("").map((item) => {
        //한글자씩 잘라서 병합 후
        result += item
        //병합된 글자가 checkArray 에 있을때 결과배열에 push 후 병합한 글자 초기화
        if (checkArray.includes(result)) {
            resultArray.push(result)
            result = ""
        }
    })

    //map 순회화여 index 를 가지는 새 배열 return 후, join
    return Number(  resultArray.map((item) => {return checkArray.indexOf(item)}).join("") );
}

//문제 https://school.programmers.co.kr/learn/courses/30/lessons/120853

function solution4(s) {
    let answer = 0;
    s.split(" ").map((value, index) => {
        if (value === "Z") {
            //s가 Z로 시작하지않으므로 index-1 예외 없음
            answer -= s.split(" ")[index - 1]
        } else {
            answer += Number(value)
        }
    })
    return answer;
}


//문제 https://school.programmers.co.kr/learn/courses/30/lessons/82612

function solution5(price, money, count) {
    let pay = 0
    for (let i = 1; i <= count; i++) {
        pay = (price * i) + pay
    }
    //금액이 남을 경우는 0을 리턴
    return (money - pay) < 0 ? Math.abs(money - pay) : 0;
}

//문제 https://school.programmers.co.kr/learn/courses/30/lessons/176963

function solution6(name, yearning, photo) {
    let object = []
    //이름과 그리움점수를 property 로 가지는 객체 배열 생성
    name.map((value, index) => {
        object.push({ name : value, yearning : yearning[index]  })
    })

    let scoreArray = []
    photo.map((value) => {
        let score = 0
        value.map((item) => {
            //위에서 만든 객체 배열에서 사진에 인물 검색하여 존재할 경우 yearning 결과에 합산
            let found = object.find(e => e.name === item);
            if (found !== undefined) {
                score += found.yearning
            }
        })
        scoreArray.push(score)
    })
    return scoreArray;
}

//문제 https://school.programmers.co.kr/learn/courses/30/lessons/12911

function solution7(n) {
    let add = 1;
    let answer = n

    //n을 이진법으로 변환한 후 1의 갯수만 찾아서 저장
    const oneCount = n.toString(2).split("").filter(item => item === "1").length

    while (true) {
        const result = n + add
        //찾을숫자를 1씩 n에서 더한후 이진법 변환뒤 1의 갯수 찾아서 반환
        const resultOneCount = result.toString(2).split("").filter(item => item === "1").length
        //위세서 찾은 oneCount 와 같은 경우 = 이진법 변환한 1의 갯수가 같은경우
        if (oneCount === resultOneCount) {
            answer = result
            break
        }
        //찾을때까지 1씩 더하여 반복
        add += 1
    }
    return answer;
}

//문제  https://school.programmers.co.kr/learn/courses/30/lessons/12930
function solution8(s) {
    let answer = [];
    let array = s.split(' ');
    array.forEach(function(item, index) {
        let rArray = item.split('')
        let rAnswer = [];
        rArray.forEach(function(item, index){
            index%2 == 0 || index === 0 ?
                rAnswer.push(item.toUpperCase()) : rAnswer.push(item.toLowerCase())
        })

        answer.push(rAnswer.join('') + ' ')
    })
    return answer.join('').substring(0, answer.join('').length - 1);
}

//문제 https://school.programmers.co.kr/learn/courses/30/lessons/120869

function solution9(spell, dic) {
    let answer = 2;

    //spell 에 담긴 단어를 모두 사용해야 하므로 spell 보다 길이가 크거나 같은 것만 남긴다
    let lengthCheckArray = dic.filter((value) => {
        return value.length >= spell.length
    })

    lengthCheckArray.map((pValue) => {
        let count = 0
        spell.map((value) => {
            if (pValue.includes(value)) {
                count += 1
                return
            }
        })
        if (count === spell.length) { answer = 1 }
    })
    return answer;
}


//문제 https://school.programmers.co.kr/learn/courses/30/lessons/12951

function solution10(s) {
    let answer = '';
    s.split(" ").map((item, index) => {

        const resultArray = []
        item.split("").map((item, valueIndex) => {

            if (isNaN(Number(item)) && valueIndex === 0) {
                resultArray.push(item.toUpperCase())
            } else {
                resultArray.push(item.toLowerCase())
            }
        })
        answer += resultArray.join("") + " "
    })
    return answer.slice(0, -1);
}


//문제 https://school.programmers.co.kr/learn/courses/30/lessons/42628
//이렇게 푸는게 아닌듯함
function solution(operations) {
    const answer = [];

    operations.map((value) => {
        if (value.split(" ")[0] === "I") {
            answer.push(value.split(" ")[1])
        }
        if (value.split(" ")[0] === "D" && value.split(" ")[1] === "1") {
            const max = Math.max.apply(null, answer)
            const maxIndex = answer.indexOf(String(max))
            answer.splice(maxIndex, 1)
        }
        if (value.split(" ")[0] === "D" && value.split(" ")[1] === "-1") {
            const min = Math.min.apply(null, answer)
            const minIndex = answer.indexOf(String(min))
            answer.splice(minIndex, 1)
        }
    })

    return answer.length === 0 ? [0,0] : [Math.max.apply(null, answer), Math.min.apply(null, answer)];
}
//문제: 모든 숫자의 등장 횟수 세기
// 4: 2회
// 3: 2회
// 2: 2회
// 1: 1회
function solutionHash1(array :  number[]) {
    const valueCount: {[key: number]: number} = {};
    for (let num of array) {
        if (valueCount[num] !== undefined) {
            valueCount[num]++;
        } else {
            valueCount[num] = 1;
        }
    }
    return valueCount
}

//문제: 주어진 배열에서 중복 요소 제거하기
//입력: [1, 2, 5, 2, 3, 5, 1, 2, 4]
//출력: [1, 2, 5, 3, 4]
const solutionHash2 = (array : number[]) => {
    const valueCount: {[key: number]: boolean} = {};
    const result = []
    for (let num of array) {
        if (valueCount[num] === undefined) {
            valueCount[num] = true;
            result.push(num);
        }
    }
    return result
}









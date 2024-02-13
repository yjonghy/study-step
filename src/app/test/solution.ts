
//문제 /coding-test/test-1.png
function solution(score) {
    //평균을 담은 배열, 추후에 등급이 아닌 순서로 정렬하기 위한 index 또한 저장
    const average = score.map((value, index) => {
        return { average : (value[0] + value[1]) / 2, index : index + 1 }
    })ㄷ
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
export type MemoryContent = {
    id: number
    image: string
    title: string
    letter: string
    date?: string
}

const photo = (id: number) => `/memory-quest/photos/memory-${String(id).padStart(2, "0")}.jpg?v=2`
const title = (id: number) => `아가햄찌와 찍은 발자국${String(id).padStart(2, "0")}`

// 원본 사진의 촬영일(EXIF)을 yyyy.mm.dd 형식으로 보관합니다.
// 날짜를 읽을 수 없는 사진은 date를 생략하면 편지에도 날짜가 표시되지 않습니다.
export const MEMORY_CONTENT: MemoryContent[] = [
    {id: 1, image: photo(1), date: "2025.12.31", title: title(1), letter: "우리의 2026년도 시작은 우리아가의 피카츄와 함께!"},
    {id: 2, image: photo(2), date: "2026.01.13", title: title(2), letter: "눈굴리는 피카츄와 함께 눈놀이하기~"},
    {id: 3, image: photo(3), date: "2026.01.24", title: title(3), letter: "(쓰윽)그게 아닙니다만?"},
    {id: 4, image: photo(4), date: "2026.02.21", title: title(4), letter: "남산 정복 완료. ( 대단한 나뭇가지를 주웠다! )"},
    {id: 5, image: photo(5), date: "2026.02.21", title: title(5), letter: "이게 바로 그 아이템이지롱"},
    {id: 6, image: photo(6), date: "2026.02.28", title: title(6), letter: "담에도가쟈 핸드메이드 페어"},
    {id: 7, image: photo(7), date: "2026.03.26", title: title(7), letter: "새록새록 기억나는 일본여행 우리자기 왜캐 기요웡"},
    {id: 8, image: photo(8), date: "2026.03.27", title: title(8), letter: "하루만에 늘어나는 가방의 키링들"},
    {id: 9, image: photo(9), date: "2026.03.27", title: title(9), letter: "뽀뽀는 일본에서도 멈출수가없지"},
    {id: 10, image: photo(10), date: "2026.03.28", title: title(10), letter: "우리 완전 패셔니스타같아 (시모키티자와 점령!)"},
    {id: 11, image: photo(11), date: "2026.04.04", title: title(11), letter: "처음으로 같이가본 벚꽃시즌의 양재천~"},
    {id: 12, image: photo(12), date: "2026.04.04", title: title(12), letter: "유잼도시 양재"},
    {id: 13, image: photo(13), date: "2026.04.19", title: title(13), letter: "커플사진위주로 가져오고 시퍼서 못데려온 홀리엔젤쥐가 생각난당"},
    {id: 14, image: photo(14), date: "2026.05.01", title: title(14), letter: "데덴네 나몰빼미 넌내꺼여!"},
    {id: 15, image: photo(15), date: "2026.05.03", title: title(15), letter: "(오버워치 성우 톤으로)부산으로 떠납니다."},
    {id: 16, image: photo(16), date: "2026.05.04", title: title(16), letter: "이날의 밤공기는 영원히 잊지못할것이야"},
    {id: 17, image: photo(17), date: "2026.05.10", title: title(17), letter: "메타몽 플레이그라운드 팝업 다시했으면 조켓다 우리아가 볼부비부비 시리즈 뽑아줬을때 좋아해주던 모습이 생각나네"},
    {id: 18, image: photo(18), date: "2026.05.22", title: title(18), letter: "우리 전직해따 어이 주황버섯 조심하쇼."},
    {id: 19, image: photo(19), date: "2026.06.28", title: title(19), letter: "blue 커플 나 저옷잘어울리는데 우리아가는 완전 잘어울려 미쳐따"},
    {id: 20, image: photo(20), date: "2026.07.12", title: title(20), letter: "600족 포켓몬은 다 우리꺼여 출발!"},
    {id: 21, image: photo(21), date: "2026.07.18", title: title(21), letter: "터프팅 다음에는 쫌더 머싯는 도안으로 찾아뵙겠습니다"},
]

export default function TanStackQuery() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">

            <p className="text-gray060 heading-xl">TanStack Query (React Query)</p>
            <p className="text-gray060 body-sm mt-[16px]">
                서버 상태(server state)를 관리하는 라이브러리. 데이터 fetch, 캐싱, 동기화, 업데이트를 선언적으로 처리한다.<br />
                클라이언트 상태(Zustand, Recoil 등)와 다르다 — 서버에서 오는 데이터는 서버 상태로 분리해서 관리.
            </p>

            {/* 서버 상태 vs 클라이언트 상태 */}
            <div className="mt-[24px] flex gap-[8px]">
                <div className="flex-1 bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray080 font-bold mb-[4px]">서버 상태</p>
                    <p className="body-xs text-gray060">
                        원본이 서버에 있음. 비동기적으로 가져와야 함.<br />
                        다른 사람이 변경할 수 있어 항상 최신이 아닐 수 있음.
                    </p>
                    <p className="body-xs text-gray040 mt-[4px]">ex) 유저 목록, 상품 정보, 댓글</p>
                </div>
                <div className="flex-1 bg-blue005 border border-blue020 rounded-[8px] p-[12px]">
                    <p className="body-xs text-blue040 font-bold mb-[4px]">클라이언트 상태</p>
                    <p className="body-xs text-gray060">
                        클라이언트에만 존재. 동기적으로 접근 가능.<br />
                        항상 최신 (내가 바꾸지 않으면 안 바뀜).
                    </p>
                    <p className="body-xs text-gray040 mt-[4px]">ex) 모달 open/close, 선택된 탭, 입력값</p>
                </div>
            </div>

            {/* useQuery */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useQuery — 데이터 조회</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', userId],  // 캐시 키 — 배열로 계층화
    queryFn: () => fetchUser(userId),
    staleTime: 1000 * 60 * 5,    // 5분간 fresh → refetch 안 함
    gcTime: 1000 * 60 * 10,      // 10분 후 캐시 삭제 (v5, 구 cacheTime)
    enabled: !!userId,            // false면 자동 실행 안 함
    retry: 3,                     // 실패 시 재시도 횟수
})

if (isLoading) return <Spinner />
if (isError) return <Error message={error.message} />`}
                    </p>
                </div>
                <div className="mt-[4px] bg-gray010 rounded-[8px] p-[10px]">
                    <p className="body-xs text-gray080 font-bold mb-[2px]">queryKey 설계</p>
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`['users']                    // 전체 유저 목록
['users', userId]           // 특정 유저
['users', userId, 'posts']  // 특정 유저의 게시글
['products', { page, filter }]  // 검색 조건 포함`}
                    </p>
                </div>
            </div>

            {/* useMutation */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">useMutation — 데이터 변경</p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`const queryClient = useQueryClient()

const { mutate, isPending } = useMutation({
    mutationFn: (newUser: CreateUserDto) => createUser(newUser),
    onSuccess: () => {
        // 성공 시 관련 쿼리 캐시 무효화 → 자동 refetch
        queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
        toast.error(error.message)
    },
})

// 호출
mutate({ name: '종현', email: 'test@test.com' })`}
                    </p>
                </div>
            </div>

            {/* 캐싱 전략 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">캐싱 전략 — staleTime vs gcTime</p>
                <div className="mt-[6px] flex flex-col gap-[4px]">
                    {[
                        { label: "fresh",         desc: "staleTime이 지나지 않은 상태. 캐시를 그대로 사용, refetch 안 함", color: "text-green060" },
                        { label: "stale",         desc: "staleTime 초과. 캐시는 있지만 백그라운드에서 refetch", color: "text-yellow060" },
                        { label: "inactive",      desc: "컴포넌트가 unmount됨. gcTime 타이머 시작", color: "text-gray050" },
                        { label: "deleted",       desc: "gcTime 초과. 캐시에서 완전히 삭제", color: "text-red050" },
                    ].map(({ label, desc, color }) => (
                        <div key={label} className="flex items-start gap-[10px] bg-gray010 px-[12px] py-[8px] rounded-[8px]">
                            <span className={`body-xs font-bold min-w-[70px] ${color}`}>{label}</span>
                            <span className="body-xs text-gray060">{desc}</span>
                        </div>
                    ))}
                </div>
                <p className="body-xs text-gray050 mt-[4px]">
                    staleTime 기본값: 0 (항상 stale) → 컴포넌트 mount마다 refetch.<br />
                    자주 안 바뀌는 데이터는 staleTime을 높여 불필요한 요청을 줄인다.
                </p>
            </div>

            {/* 낙관적 업데이트 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">낙관적 업데이트 (Optimistic Update)</p>
                <p className="text-gray060 body-sm">
                    서버 응답을 기다리지 않고 UI를 먼저 업데이트. 실패 시 이전 상태로 롤백.
                </p>
                <div className="mt-[6px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">
                        {`useMutation({
    mutationFn: toggleLike,
    onMutate: async (postId) => {
        // 진행 중인 refetch 취소
        await queryClient.cancelQueries({ queryKey: ['post', postId] })
        // 현재 캐시 저장 (롤백용)
        const prev = queryClient.getQueryData(['post', postId])
        // 낙관적으로 업데이트
        queryClient.setQueryData(['post', postId], old => ({ ...old, liked: !old.liked }))
        return { prev }
    },
    onError: (err, postId, ctx) => {
        // 실패 시 이전 값으로 롤백
        queryClient.setQueryData(['post', postId], ctx?.prev)
    },
    onSettled: (data, err, postId) => {
        // 성공/실패 모두 최종 동기화
        queryClient.invalidateQueries({ queryKey: ['post', postId] })
    },
})`}
                    </p>
                </div>
            </div>

        </article>
    )
}

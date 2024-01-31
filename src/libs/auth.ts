export const requestOptions = (user: any) => {
    return {
        headers: {
            //아직 user-id 추가된 api 없음
            Authorization :  `Bearer ${user?.api_token}`,
            withCredentials : true
        },
    };
};

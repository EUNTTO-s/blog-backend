interface UserInputType {
    id?: number;
    nickname?: string;
    email?: string;
    password?: string;
}

interface UserSearchOption {
    userId?: number;
    email?: string;
    includePwd?: boolean;
    limit?: number;
}

interface ProfileInputType {
    userId?: string;
    nickname: string;
    blogTitle: string;
    profileIntro: string;
}

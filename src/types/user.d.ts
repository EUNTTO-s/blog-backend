interface UserInputType {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
}

interface UserSearchOption {
    userId?: number;
    email?: string;
    memberSearch?: boolean;
    mainMemberSearch?: boolean;
    includePwd?: boolean;
    limit?: number;
}

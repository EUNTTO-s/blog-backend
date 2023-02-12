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
    search?: string;
}

interface UrlType {
  title: string;
  url: string;
}

interface ProfileInputType {
    userId: number;
    nickname?: string;
    blogTitle?: string;
    profileIntro?: string;
    profileImg?: Express.Multer.File;
    profileImgUrl?: string;
    linkUrls?: UrlType[];
}

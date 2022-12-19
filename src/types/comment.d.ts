interface CommentInputType {
    comment?: string;
    postId?: number;
    commentId?: number;
    is_secret?: number;
}

interface CommentType {
    id?: number;
    users_id: number;
    comment_content?: string;
    parents?: number;
    DEPTH?: number;
    SEQ?: number;
    created_at?: any;
    is_secret?: number;
    wrtier?: number;
}
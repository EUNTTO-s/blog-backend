interface CommentInputType {
    comment?: string;
    postId?: number;
    commentId?: number;
    isSecret?: number;
}

interface CommentType {
    id?: number;
    users_id: number;
    comment_content?: string;
    parents?: number;
    DEPTH?: number;
    SEQ?: number;
    created_at?: any;
    isSecret?: number;
    wrtier?: number;
}
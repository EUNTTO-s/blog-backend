import dataSource from "./database";

// 댓글 생성
const createComments = async (postId: number, content: string, userId: number) => {
    await dataSource.query(
        `
          INSERT INTO
            comments
            (posts_id, users_id, comment_content)
          VALUES
            (?,?,?)
        `,
        [postId, userId, content]
    );
};

// 특정 게시글의 댓글 가져오기
const getComments = async (postId: string) => {
    const comments = await dataSource
        .query(
            `
              SELECT
                comments.id,
                comments.comment_content AS content,
                comments.created_at AS createdDate,
                JSON_OBJECT(
                  'id',
                  users.id,
                  'nickname',
                  users.nickname,
                  'email',
                  users.email,
                  'profileImgUrl',
                  users.profile_img_url
                ) AS user
              FROM
                comments
              JOIN users ON users.id = comments.users_id
              WHERE
                comments.posts_id = ?
            `,
            [postId]
        )
        .then((comments) => {
            return [...comments].map((comment) => {
                const domain = `${process.env.HOST_URL}` || `http://localhost/${process.env.PORT || 5500}`;
                let user = JSON.parse(comment.user);
                let profileImgUrl = user.profileImgUrl ? `${domain}${user.profileImgUrl}` : `${domain}/user/default-img.png`;
                return {
                    ...comment,
                    user: { ...user, profileImgUrl },
                };
            });
        });
    return comments;
};

// 댓글 수정
const updateComments = async (content: string, commentId: string, userId: string) => {
    await dataSource.query(
        `
          UPDATE
            comments
          SET
            comment_content = ?
          WHERE
            id = ?
          AND
            users_id = ?
        `,
        [content, commentId, userId]
    );
};

// 댓글 삭제
const deleteComments = async (commentId: string, userId: string) => {
    await dataSource.query(
        `
          DELETE FROM
            comments
          WHERE
            id = ?
          AND
            users_id = ?
        `,
        [commentId, userId]
    );
};

export default {
    createComments,
    getComments,
    updateComments,
    deleteComments,
};

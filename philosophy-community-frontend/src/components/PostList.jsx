import PostItem from "./PostItem";

export default function PostList({ posts }) {

    return (
        <table className="board-table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>카테고리</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                    <th>공감</th>
                    <th>댓글</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <PostItem
                        key={post.postId}
                        post={post}
                    />
                ))}
            </tbody>
        </table>
    );
}

import { Link } from "react-router-dom";

export default function PostItem({ post }) {
    return (
        <tr>
            <td>{post.postId}</td>
            <td>
                <Link to={`/posts/${post.postId}`}>{post.title}</Link>
            </td>
            <td>{post.categoryName}</td>
            <td>{post.authorNickname}</td>
            <td>{post.createdAt?.slice(0, 10)}</td>
            <td>{post.viewCount}</td>
            <td>{post.reactionCount}</td>
            <td>{post.commentCount}</td>
        </tr>
    );
}

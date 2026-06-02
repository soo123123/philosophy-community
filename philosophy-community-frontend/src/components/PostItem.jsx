import { Link } from "react-router-dom";

export default function PostItem({ post }) {
    return (
        <div>
            <Link to={`/posts/${post.postId}`}>
                <h3>{post.title}</h3>
            </Link>
        </div>
    );
}
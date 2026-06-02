import PostItem from "./PostItem";

export default function PostList({ posts }) {

    return (
        <div>
            {posts.map((post) => (
                <PostItem
                    key={post.postId}
                    post={post}
                />
            ))}
        </div>
    );
}
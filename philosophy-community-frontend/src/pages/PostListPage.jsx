import { useEffect } from "react";
import { getPosts } from "../api/postApi";

export default function PostListPage() {
    useEffect(() => {
            fetchPosts();
        }, []);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();

            alert("API 호출 성공");

            console.log(data);
        } catch (error) {
            alert("API 호출 실패");

            console.error(error);
        }
    };

    return (
        <div>
            <h1>게시글 목록</h1>
        </div>
    );
}
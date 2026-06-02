import { BrowserRouter, Routes, Route } from "react-router-dom";

import PostListPage from "../pages/PostListPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostCreatePage from "../pages/PostCreatePage";
import PostEditPage from "../pages/PostEditPage";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostListPage />} />
                <Route path="/posts/:postId" element={<PostDetailPage />} />
                <Route path="/posts/create" element={<PostCreatePage />} />
                <Route path="/posts/edit/:postId" element={<PostEditPage />} />
            </Routes>
        </BrowserRouter>
    );
}
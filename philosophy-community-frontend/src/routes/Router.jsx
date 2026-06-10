import { BrowserRouter, Routes, Route } from "react-router-dom";

import PostListPage from "../pages/PostListPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostCreatePage from "../pages/PostCreatePage";
import PostEditPage from "../pages/PostEditPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CategoryPage from "../pages/CategoryPage";
import NoticeListPage from "../pages/NoticeListPage";
import NoticeDetailPage from "../pages/NoticeDetailPage";
import NoticeCreatePage from "../pages/NoticeCreatePage";
import NoticeEditPage from "../pages/NoticeEditPage";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostListPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/categories" element={<CategoryPage />} />

                <Route path="/posts/:postId" element={<PostDetailPage />} />
                <Route path="/posts/create" element={<PostCreatePage />} />
                <Route path="/posts/edit/:postId" element={<PostEditPage />} />

                <Route path="/notices" element={<NoticeListPage />} />
                <Route path="/notices/:noticeId" element={<NoticeDetailPage />} />
                <Route path="/notices/create" element={<NoticeCreatePage />} />
                <Route path="/notices/edit/:noticeId" element={<NoticeEditPage />} />
            </Routes>
        </BrowserRouter>
    );
}

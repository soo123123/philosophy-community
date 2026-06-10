import NoticeItem from "./NoticeItem";

export default function NoticeBoard({ notices }) {
    return (
        <table className="board-table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                {notices.map((notice) => (
                    <NoticeItem key={notice.noticeId} notice={notice} />
                ))}
            </tbody>
        </table>
    );
}

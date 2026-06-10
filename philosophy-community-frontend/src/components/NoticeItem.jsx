import { Link } from "react-router-dom";

export default function NoticeItem({ notice }) {
    return (
        <tr>
            <td>{notice.noticeId}</td>
            <td>
                <Link to={`/notices/${notice.noticeId}`}>{notice.title}</Link>
            </td>
            <td>{notice.authorNickname}</td>
            <td>{notice.createdAt?.slice(0, 10)}</td>
        </tr>
    );
}

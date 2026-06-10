import { useEffect, useState } from "react";
import {
    addReaction,
    fetchReactionCount,
    removeReaction
} from "../api/reactionApi";

export default function ReactionButton({ postId, currentUser }) {
    const [reactionCount, setReactionCount] = useState(0);
    const [reacted, setReacted] = useState(false);

    useEffect(() => {
        const loadReactionCount = async () => {
            const response = await fetchReactionCount(postId);
            setReactionCount(response.data);
        };

        loadReactionCount();
    }, [postId]);

    const handleReaction = async () => {
        if (!currentUser) {
            alert("로그인 후 공감할 수 있습니다.");
            return;
        }

        const response = reacted
            ? await removeReaction(postId)
            : await addReaction(postId);

        setReactionCount(response.data.reactionCount);
        setReacted(response.data.reacted);
    };

    return (
        <button type="button" className="reaction-button" onClick={handleReaction}>
            ♡ 공감 {reactionCount}
        </button>
    );
}

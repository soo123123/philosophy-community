package com.example.philosophycommunity.comment.dto;

import com.example.philosophycommunity.comment.entity.Comment;
import lombok.Getter;

@Getter
public class CommentResponseDto {
    private final Long commentId;
    private final Long postId;
    private final Long userId;
    private final String authorNickname;
    private final String content;
    private final String createdAt;
    private final String updatedAt;

    public CommentResponseDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.postId = comment.getPost().getPostId();
        this.userId = comment.getUser().getUserId();
        this.authorNickname = comment.getUser().getNickname();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt().toString();
        this.updatedAt = comment.getUpdatedAt().toString();
    }
}

package com.example.philosophycommunity.post.dto;

import com.example.philosophycommunity.post.entity.Post;
import jakarta.persistence.EntityNotFoundException;
import lombok.Getter;

@Getter
public class PostResponseDto {
    private final long postId;
    private final Long categoryId;
    private final String categoryName;
    private final String title;
    private final String content;
    private final Long userId;
    private final String authorNickname;
    private final Long viewCount;
    private final Long reactionCount;
    private final Long commentCount;
    private final String createdAt;
    private final String updatedAt;

    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.categoryId = findCategoryId(post);
        this.categoryName = findCategoryName(post);
        this.title = post.getTitle();
        this.content = post.getContent();
        this.userId = findUserId(post);
        this.authorNickname = findAuthorNickname(post);
        this.viewCount = post.getViewCount() == null ? 0L : post.getViewCount();
        this.reactionCount = (long) post.getReactions().size();
        this.commentCount = (long) post.getComments().size();
        this.createdAt = post.getCreatedAt() == null ? "" : post.getCreatedAt().toString();
        this.updatedAt = post.getUpdatedAt() == null ? "" : post.getUpdatedAt().toString();
    }

    private Long findCategoryId(Post post) {
        try {
            return post.getCategory() == null ? null : post.getCategory().getCategoryId();
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    private String findCategoryName(Post post) {
        try {
            return post.getCategory() == null ? "기타" : post.getCategory().getCategoryName();
        } catch (EntityNotFoundException e) {
            return "기타";
        }
    }

    private Long findUserId(Post post) {
        try {
            return post.getUser() == null ? null : post.getUser().getUserId();
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    private String findAuthorNickname(Post post) {
        try {
            return post.getUser() == null ? "알 수 없음" : post.getUser().getNickname();
        } catch (EntityNotFoundException e) {
            return "알 수 없음";
        }
    }
}

package com.example.philosophycommunity.post.dto;

import com.example.philosophycommunity.post.entity.Post;
import lombok.Getter;

@Getter
public class PostListResponseDto {
    private final long postId;
    private final String title;

    public PostListResponseDto(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
    }
}

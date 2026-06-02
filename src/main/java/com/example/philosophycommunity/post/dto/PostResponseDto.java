package com.example.philosophycommunity.post.dto;

import com.example.philosophycommunity.post.entity.Post;
import lombok.Getter;

@Getter
public class PostResponseDto {
    private final long postId;
    private final String title;
    private final String content;

    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();
    }
}

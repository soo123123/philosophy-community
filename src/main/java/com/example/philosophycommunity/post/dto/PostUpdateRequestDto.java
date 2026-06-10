package com.example.philosophycommunity.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateRequestDto {
    private Long categoryId;

    private String title;

    private String content;
}

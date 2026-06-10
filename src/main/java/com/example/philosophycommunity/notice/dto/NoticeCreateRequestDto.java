package com.example.philosophycommunity.notice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoticeCreateRequestDto {
    private String title;
    private String content;
}

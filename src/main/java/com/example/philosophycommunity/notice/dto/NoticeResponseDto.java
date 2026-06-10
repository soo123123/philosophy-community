package com.example.philosophycommunity.notice.dto;

import com.example.philosophycommunity.notice.entity.Notice;
import lombok.Getter;

@Getter
public class NoticeResponseDto {
    private final Long noticeId;
    private final Long userId;
    private final String authorNickname;
    private final String title;
    private final String content;
    private final String createdAt;
    private final String updatedAt;

    public NoticeResponseDto(Notice notice) {
        this.noticeId = notice.getNoticeId();
        this.userId = notice.getUser().getUserId();
        this.authorNickname = notice.getUser().getNickname();
        this.title = notice.getTitle();
        this.content = notice.getContent();
        this.createdAt = notice.getCreatedAt().toString();
        this.updatedAt = notice.getUpdatedAt().toString();
    }
}

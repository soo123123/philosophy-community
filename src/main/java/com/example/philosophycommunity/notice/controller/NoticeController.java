package com.example.philosophycommunity.notice.controller;

import com.example.philosophycommunity.common.response.ApiResponse;
import com.example.philosophycommunity.notice.dto.NoticeCreateRequestDto;
import com.example.philosophycommunity.notice.dto.NoticeResponseDto;
import com.example.philosophycommunity.notice.dto.NoticeUpdateRequestDto;
import com.example.philosophycommunity.notice.service.NoticeService;
import com.example.philosophycommunity.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ApiResponse<List<NoticeResponseDto>> getNotices() {
        return ApiResponse.success(noticeService.findNotices());
    }

    @GetMapping("/{noticeId}")
    public ApiResponse<NoticeResponseDto> getNotice(@PathVariable Long noticeId) {
        return ApiResponse.success(noticeService.findNoticeById(noticeId));
    }

    @PostMapping
    public ApiResponse<NoticeResponseDto> createNotice(
            @RequestBody NoticeCreateRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(noticeService.createNotice(requestDto, userDetails));
    }

    @PutMapping("/{noticeId}")
    public ApiResponse<NoticeResponseDto> updateNotice(
            @PathVariable Long noticeId,
            @RequestBody NoticeUpdateRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(
                noticeService.updateNotice(noticeId, requestDto, userDetails));
    }

    @DeleteMapping("/{noticeId}")
    public ApiResponse<String> deleteNotice(
            @PathVariable Long noticeId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        noticeService.deleteNotice(noticeId, userDetails);

        return ApiResponse.success("공지사항이 삭제되었습니다.");
    }
}

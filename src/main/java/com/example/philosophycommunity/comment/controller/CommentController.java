package com.example.philosophycommunity.comment.controller;

import com.example.philosophycommunity.comment.dto.CommentCreateRequestDto;
import com.example.philosophycommunity.comment.dto.CommentResponseDto;
import com.example.philosophycommunity.comment.dto.CommentUpdateRequestDto;
import com.example.philosophycommunity.comment.service.CommentService;
import com.example.philosophycommunity.common.response.ApiResponse;
import com.example.philosophycommunity.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/api/posts/{postId}/comments")
    public ApiResponse<List<CommentResponseDto>> getComments(
            @PathVariable Long postId) {
        return ApiResponse.success(commentService.findComments(postId));
    }

    @PostMapping("/api/posts/{postId}/comments")
    public ApiResponse<CommentResponseDto> createComment(
            @PathVariable Long postId,
            @RequestBody CommentCreateRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(
                commentService.createComment(postId, requestDto, userDetails));
    }

    @PutMapping("/api/comments/{commentId}")
    public ApiResponse<CommentResponseDto> updateComment(
            @PathVariable Long commentId,
            @RequestBody CommentUpdateRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(
                commentService.updateComment(commentId, requestDto, userDetails));
    }

    @DeleteMapping("/api/comments/{commentId}")
    public ApiResponse<String> deleteComment(
            @PathVariable Long commentId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentService.deleteComment(commentId, userDetails);

        return ApiResponse.success("댓글이 삭제되었습니다.");
    }
}

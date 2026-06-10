package com.example.philosophycommunity.reaction.controller;

import com.example.philosophycommunity.common.response.ApiResponse;
import com.example.philosophycommunity.reaction.dto.ReactionResponseDto;
import com.example.philosophycommunity.reaction.service.ReactionService;
import com.example.philosophycommunity.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/{postId}/reactions")
@RequiredArgsConstructor
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping
    public ApiResponse<ReactionResponseDto> addReaction(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(reactionService.addReaction(postId, userDetails));
    }

    @DeleteMapping
    public ApiResponse<ReactionResponseDto> removeReaction(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ApiResponse.success(reactionService.removeReaction(postId, userDetails));
    }

    @GetMapping("/count")
    public ApiResponse<Long> countReaction(@PathVariable Long postId) {
        return ApiResponse.success(reactionService.countReaction(postId));
    }
}

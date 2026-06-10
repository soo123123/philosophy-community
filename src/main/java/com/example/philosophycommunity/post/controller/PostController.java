package com.example.philosophycommunity.post.controller;

import com.example.philosophycommunity.common.response.ApiResponse;
import com.example.philosophycommunity.post.dto.PostListResponseDto;
import com.example.philosophycommunity.post.dto.PostResponseDto;
import com.example.philosophycommunity.post.service.PostService;
import com.example.philosophycommunity.security.CustomUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.philosophycommunity.post.dto.PostCreateRequestDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PutMapping;
import com.example.philosophycommunity.post.dto.PostUpdateRequestDto;

import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/api/posts")
    public ApiResponse<List<PostListResponseDto>> getPosts() {
        return ApiResponse.success(
                postService.findPosts()
        );
    }

    @GetMapping("/api/posts/{postId}")
    public ApiResponse<PostResponseDto> getPost(@PathVariable Long postId) {
        return ApiResponse.success(
                postService.findPostById(postId)
        );
    }

    @PostMapping("/api/posts")
    public ApiResponse<PostResponseDto> createPost(
            @RequestBody PostCreateRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(
                postService.createPost(requestDto, userDetails)
        );
    }

    @PutMapping("/api/posts/{postId}")
    public ApiResponse<PostResponseDto> updatePost(
            @PathVariable Long postId,
            @RequestBody PostUpdateRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ApiResponse.success(postService.updatePost(
                postId,
                requestDto,
                userDetails
        ));
    }

    @DeleteMapping("/api/posts/{postId}")
    public ApiResponse<String> deletePost(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        postService.deletePost(postId, userDetails);

        return ApiResponse.success("게시글이 삭제되었습니다.");
    }
}

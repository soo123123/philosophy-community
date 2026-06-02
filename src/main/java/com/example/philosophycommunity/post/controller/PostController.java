package com.example.philosophycommunity.post.controller;

import com.example.philosophycommunity.common.response.ApiResponse;
import com.example.philosophycommunity.post.dto.PostListResponseDto;
import com.example.philosophycommunity.post.dto.PostResponseDto;
import com.example.philosophycommunity.post.entity.Post;
import com.example.philosophycommunity.post.service.PostService;
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
    public Post createPost(
            @RequestBody PostCreateRequestDto requestDto
    ) {
        return postService.createPost(
                requestDto.getTitle(),
                requestDto.getContent()
        );
    }

    @PutMapping("/api/posts/{postId}")
    public Post updatePost(
            @PathVariable Long postId,
            @RequestBody PostUpdateRequestDto requestDto
    ) {
        return postService.updatePost(
                postId,
                requestDto.getTitle(),
                requestDto.getContent()
        );
    }

    @DeleteMapping("/api/posts/{postId}")
    public String deletePost(
            @PathVariable Long postId
    ) {
        postService.deletePost(postId);

        return "게시글이 삭제되었습니다.";
    }
}

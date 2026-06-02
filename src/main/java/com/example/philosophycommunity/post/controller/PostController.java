package com.example.philosophycommunity.post.controller;

import com.example.philosophycommunity.post.entity.Post;
import com.example.philosophycommunity.post.service.PostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/api/posts")
    public List<Post> getPosts() {
        return postService.findAllPosts();
    }
}

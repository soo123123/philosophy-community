package com.example.philosophycommunity.post.service;

import com.example.philosophycommunity.post.entity.Post;
import com.example.philosophycommunity.post.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }
}

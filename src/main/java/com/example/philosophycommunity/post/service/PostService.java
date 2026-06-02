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

    public Post findPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
    }

    public Post createPost(String title, String content) {
        Post post = new Post(title, content);

        return postRepository.save(post);
    }

    public Post updatePost(
            Long postId,
            String title,
            String content
    ) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        post.update(title, content);

        return postRepository.save(post);
    }
}

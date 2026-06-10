package com.example.philosophycommunity.post.service;

import com.example.philosophycommunity.category.entity.Category;
import com.example.philosophycommunity.category.repository.CategoryRepository;
import com.example.philosophycommunity.post.dto.PostCreateRequestDto;
import com.example.philosophycommunity.post.dto.PostListResponseDto;
import com.example.philosophycommunity.post.dto.PostResponseDto;
import com.example.philosophycommunity.post.dto.PostUpdateRequestDto;
import com.example.philosophycommunity.post.entity.Post;
import com.example.philosophycommunity.post.repository.PostRepository;
import com.example.philosophycommunity.security.CustomUserDetails;
import com.example.philosophycommunity.user.entity.User;
import com.example.philosophycommunity.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public PostService(
            PostRepository postRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> findPosts() {
        return postRepository.findAll()
                .stream()
                .map(PostListResponseDto::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> findPostsByCategory(Long categoryId) {
        return postRepository.findByCategory_CategoryId(categoryId)
                .stream()
                .map(PostListResponseDto::new)
                .toList();
    }

    @Transactional
    public PostResponseDto findPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        post.increaseViewCount();

        return new PostResponseDto(post);
    }

    @Transactional
    public PostResponseDto createPost(
            PostCreateRequestDto requestDto,
            CustomUserDetails userDetails) {
        User user = findUser(userDetails);
        Category category = findCategory(requestDto.getCategoryId());
        Post post = new Post(
                user,
                category,
                requestDto.getTitle(),
                requestDto.getContent());

        return new PostResponseDto(postRepository.save(post));
    }

    @Transactional
    public PostResponseDto updatePost(
            Long postId,
            PostUpdateRequestDto requestDto,
            CustomUserDetails userDetails
    ) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        validateAuthor(post, userDetails);
        Category category = findCategory(requestDto.getCategoryId());

        post.update(category, requestDto.getTitle(), requestDto.getContent());

        return new PostResponseDto(post);
    }

    @Transactional
    public void deletePost(Long postId, CustomUserDetails userDetails) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        validateAuthor(post, userDetails);

        postRepository.delete(post);
    }

    private User findUser(CustomUserDetails userDetails) {
        return userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    private Category findCategory(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("카테고리가 존재하지 않습니다."));
    }

    private void validateAuthor(Post post, CustomUserDetails userDetails) {
        if (!post.getUser().getUserId().equals(userDetails.getUserId())) {
            throw new IllegalArgumentException("작성자만 수정 또는 삭제할 수 있습니다.");
        }
    }
}

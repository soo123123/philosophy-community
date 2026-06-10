package com.example.philosophycommunity.comment.service;

import com.example.philosophycommunity.comment.dto.CommentCreateRequestDto;
import com.example.philosophycommunity.comment.dto.CommentResponseDto;
import com.example.philosophycommunity.comment.dto.CommentUpdateRequestDto;
import com.example.philosophycommunity.comment.entity.Comment;
import com.example.philosophycommunity.comment.repository.CommentRepository;
import com.example.philosophycommunity.post.entity.Post;
import com.example.philosophycommunity.post.repository.PostRepository;
import com.example.philosophycommunity.security.CustomUserDetails;
import com.example.philosophycommunity.user.entity.User;
import com.example.philosophycommunity.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CommentResponseDto> findComments(Long postId) {
        return commentRepository.findByPostPostId(postId)
                .stream()
                .map(CommentResponseDto::new)
                .toList();
    }

    @Transactional
    public CommentResponseDto createComment(
            Long postId,
            CommentCreateRequestDto requestDto,
            CustomUserDetails userDetails) {
        Post post = findPost(postId);
        User user = findUser(userDetails);
        Comment comment = new Comment(post, user, requestDto.getContent());

        return new CommentResponseDto(commentRepository.save(comment));
    }

    @Transactional
    public CommentResponseDto updateComment(
            Long commentId,
            CommentUpdateRequestDto requestDto,
            CustomUserDetails userDetails) {
        Comment comment = findComment(commentId);
        validateAuthor(comment, userDetails);
        comment.update(requestDto.getContent());

        return new CommentResponseDto(comment);
    }

    @Transactional
    public void deleteComment(Long commentId, CustomUserDetails userDetails) {
        Comment comment = findComment(commentId);
        validateAuthor(comment, userDetails);
        commentRepository.delete(comment);
    }

    private Post findPost(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
    }

    private User findUser(CustomUserDetails userDetails) {
        return userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    private Comment findComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
    }

    private void validateAuthor(Comment comment, CustomUserDetails userDetails) {
        if (!comment.getUser().getUserId().equals(userDetails.getUserId())) {
            throw new IllegalArgumentException("작성자만 수정 또는 삭제할 수 있습니다.");
        }
    }
}

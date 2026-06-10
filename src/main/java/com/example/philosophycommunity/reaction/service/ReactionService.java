package com.example.philosophycommunity.reaction.service;

import com.example.philosophycommunity.post.entity.Post;
import com.example.philosophycommunity.post.repository.PostRepository;
import com.example.philosophycommunity.reaction.dto.ReactionResponseDto;
import com.example.philosophycommunity.reaction.entity.Reaction;
import com.example.philosophycommunity.reaction.repository.ReactionRepository;
import com.example.philosophycommunity.security.CustomUserDetails;
import com.example.philosophycommunity.user.entity.User;
import com.example.philosophycommunity.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public ReactionResponseDto addReaction(
            Long postId,
            CustomUserDetails userDetails) {
        Post post = findPost(postId);
        User user = findUser(userDetails);

        reactionRepository.findByPostPostIdAndUserUserId(postId, user.getUserId())
                .ifPresent(reaction -> {
                    throw new IllegalArgumentException("이미 공감한 게시글입니다.");
                });

        reactionRepository.save(new Reaction(post, user));

        return new ReactionResponseDto(
                reactionRepository.countByPostPostId(postId),
                true);
    }

    @Transactional
    public ReactionResponseDto removeReaction(
            Long postId,
            CustomUserDetails userDetails) {
        Reaction reaction = reactionRepository
                .findByPostPostIdAndUserUserId(postId, userDetails.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("공감 정보가 존재하지 않습니다."));

        reactionRepository.delete(reaction);

        return new ReactionResponseDto(
                reactionRepository.countByPostPostId(postId),
                false);
    }

    @Transactional(readOnly = true)
    public Long countReaction(Long postId) {
        return reactionRepository.countByPostPostId(postId);
    }

    private Post findPost(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
    }

    private User findUser(CustomUserDetails userDetails) {
        return userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }
}

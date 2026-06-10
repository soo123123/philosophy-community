package com.example.philosophycommunity.reaction.repository;

import com.example.philosophycommunity.reaction.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    Optional<Reaction> findByPostPostIdAndUserUserId(Long postId, Long userId);

    Long countByPostPostId(Long postId);
}

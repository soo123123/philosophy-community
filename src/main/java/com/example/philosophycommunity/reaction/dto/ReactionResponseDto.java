package com.example.philosophycommunity.reaction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReactionResponseDto {
    private Long reactionCount;
    private boolean reacted;
}

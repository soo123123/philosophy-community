package com.example.philosophycommunity.user.dto;

import com.example.philosophycommunity.user.entity.User;
import lombok.Getter;

@Getter
public class UserResponseDto {
    private final Long userId;
    private final String email;
    private final String nickname;
    private final String roleName;

    public UserResponseDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.nickname = user.getNickname();
        this.roleName = user.getRole().getRoleName().name();
    }
}

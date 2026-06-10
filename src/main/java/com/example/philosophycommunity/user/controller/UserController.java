package com.example.philosophycommunity.user.controller;

import com.example.philosophycommunity.common.response.ApiResponse;
import com.example.philosophycommunity.security.CustomUserDetails;
import com.example.philosophycommunity.user.dto.UserResponseDto;
import com.example.philosophycommunity.user.entity.User;
import com.example.philosophycommunity.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ApiResponse<UserResponseDto> getMyInfo(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        User user = userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return ApiResponse.success(new UserResponseDto(user));
    }
}

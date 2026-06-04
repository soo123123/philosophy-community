package com.example.philosophycommunity.auth.service;

import com.example.philosophycommunity.auth.dto.SignupRequestDto;
import com.example.philosophycommunity.role.entity.Role;
import com.example.philosophycommunity.role.entity.RoleType;
import com.example.philosophycommunity.role.repository.RoleRepository;
import com.example.philosophycommunity.user.entity.User;
import com.example.philosophycommunity.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import com.example.philosophycommunity.auth.dto.LoginRequestDto;
import com.example.philosophycommunity.auth.dto.LoginResponseDto;
import com.example.philosophycommunity.user.entity.User;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public void signup(SignupRequestDto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        if (userRepository.existsByNickname(requestDto.getNickname())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }

        Role userRole = roleRepository.findByRoleName(RoleType.USER)
                .orElseThrow(() -> new IllegalArgumentException("USER 권한이 존재하지 않습니다."));

        User user = User.builder()
                .email(requestDto.getEmail())
                .password(requestDto.getPassword())
                .nickname(requestDto.getNickname())
                .role(userRole)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

    }

    public LoginResponseDto login(LoginRequestDto requestDto) {

        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException("존재하지 않는 이메일입니다."));

        if (!user.getPassword().equals(requestDto.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return new LoginResponseDto("login-success");
    }

}
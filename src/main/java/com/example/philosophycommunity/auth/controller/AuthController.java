package com.example.philosophycommunity.auth.controller;

import com.example.philosophycommunity.auth.dto.SignupRequestDto;
import com.example.philosophycommunity.auth.service.AuthService;
import com.example.philosophycommunity.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.philosophycommunity.auth.dto.LoginRequestDto;
import com.example.philosophycommunity.auth.dto.LoginResponseDto;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ApiResponse<String> signup(
            @RequestBody SignupRequestDto requestDto) {

        authService.signup(requestDto);

        return ApiResponse.success("회원가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponseDto> login(
            @RequestBody LoginRequestDto requestDto) {

        LoginResponseDto responseDto = authService.login(requestDto);

        return ApiResponse.success(responseDto);
    }

}

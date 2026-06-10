package com.example.philosophycommunity.notice.service;

import com.example.philosophycommunity.notice.dto.NoticeCreateRequestDto;
import com.example.philosophycommunity.notice.dto.NoticeResponseDto;
import com.example.philosophycommunity.notice.dto.NoticeUpdateRequestDto;
import com.example.philosophycommunity.notice.entity.Notice;
import com.example.philosophycommunity.notice.repository.NoticeRepository;
import com.example.philosophycommunity.role.entity.RoleType;
import com.example.philosophycommunity.security.CustomUserDetails;
import com.example.philosophycommunity.user.entity.User;
import com.example.philosophycommunity.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<NoticeResponseDto> findNotices() {
        return noticeRepository.findAll()
                .stream()
                .map(NoticeResponseDto::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public NoticeResponseDto findNoticeById(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("공지사항이 존재하지 않습니다."));

        return new NoticeResponseDto(notice);
    }

    @Transactional
    public NoticeResponseDto createNotice(
            NoticeCreateRequestDto requestDto,
            CustomUserDetails userDetails) {
        User user = findAdminUser(userDetails);
        Notice notice = new Notice(user, requestDto.getTitle(), requestDto.getContent());

        return new NoticeResponseDto(noticeRepository.save(notice));
    }

    @Transactional
    public NoticeResponseDto updateNotice(
            Long noticeId,
            NoticeUpdateRequestDto requestDto,
            CustomUserDetails userDetails) {
        findAdminUser(userDetails);
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("공지사항이 존재하지 않습니다."));
        notice.update(requestDto.getTitle(), requestDto.getContent());

        return new NoticeResponseDto(notice);
    }

    @Transactional
    public void deleteNotice(Long noticeId, CustomUserDetails userDetails) {
        findAdminUser(userDetails);
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("공지사항이 존재하지 않습니다."));
        noticeRepository.delete(notice);
    }

    private User findAdminUser(CustomUserDetails userDetails) {
        User user = userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (user.getRole().getRoleName() != RoleType.ADMIN) {
            throw new IllegalArgumentException("관리자만 공지사항을 관리할 수 있습니다.");
        }

        return user;
    }
}

package com.example.philosophycommunity.notice.repository;

import com.example.philosophycommunity.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}

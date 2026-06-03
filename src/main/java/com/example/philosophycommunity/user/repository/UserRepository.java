package com.example.philosophycommunity.user.repository;

import com.example.philosophycommunity.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Long> {

}
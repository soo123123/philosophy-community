package com.example.philosophycommunity.post.repository;

import com.example.philosophycommunity.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long>{
}

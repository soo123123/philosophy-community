package com.example.philosophycommunity.post.repository;

import com.example.philosophycommunity.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>{
    List<Post> findByCategory_CategoryId(Long categoryId);
}

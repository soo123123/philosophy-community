package com.example.philosophycommunity.post.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
//import lombok.Builder;

@Entity
@Getter
@NoArgsConstructor
//@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    public Post(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}

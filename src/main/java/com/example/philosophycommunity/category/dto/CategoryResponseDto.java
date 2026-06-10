package com.example.philosophycommunity.category.dto;

import com.example.philosophycommunity.category.entity.Category;
import lombok.Getter;

@Getter
public class CategoryResponseDto {
    private final Long categoryId;
    private final String categoryName;

    public CategoryResponseDto(Category category) {
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
    }
}

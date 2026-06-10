package com.example.philosophycommunity.category.controller;

import com.example.philosophycommunity.category.dto.CategoryResponseDto;
import com.example.philosophycommunity.category.service.CategoryService;
import com.example.philosophycommunity.common.response.ApiResponse;
import com.example.philosophycommunity.post.dto.PostListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponseDto>> getCategories() {
        return ApiResponse.success(categoryService.findCategories());
    }

    @GetMapping("/{categoryId}")
    public ApiResponse<CategoryResponseDto> getCategory(
            @PathVariable Long categoryId) {
        return ApiResponse.success(categoryService.findCategoryById(categoryId));
    }

    @GetMapping("/{categoryId}/posts")
    public ApiResponse<List<PostListResponseDto>> getPostsByCategory(
            @PathVariable Long categoryId) {
        return ApiResponse.success(categoryService.findPostsByCategory(categoryId));
    }
}

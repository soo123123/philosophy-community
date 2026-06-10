package com.example.philosophycommunity.category.service;

import com.example.philosophycommunity.category.dto.CategoryResponseDto;
import com.example.philosophycommunity.category.entity.Category;
import com.example.philosophycommunity.category.repository.CategoryRepository;
import com.example.philosophycommunity.post.dto.PostListResponseDto;
import com.example.philosophycommunity.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final PostService postService;

    @Transactional(readOnly = true)
    public List<CategoryResponseDto> findCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryResponseDto::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponseDto findCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("카테고리가 존재하지 않습니다."));

        return new CategoryResponseDto(category);
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> findPostsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("카테고리가 존재하지 않습니다.");
        }

        return postService.findPostsByCategory(categoryId);
    }
}

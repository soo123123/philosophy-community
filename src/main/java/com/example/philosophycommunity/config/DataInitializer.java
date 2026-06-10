package com.example.philosophycommunity.config;

import com.example.philosophycommunity.category.entity.Category;
import com.example.philosophycommunity.category.repository.CategoryRepository;
import com.example.philosophycommunity.role.entity.Role;
import com.example.philosophycommunity.role.entity.RoleType;
import com.example.philosophycommunity.role.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) {
        saveRole(RoleType.USER);
        saveRole(RoleType.ADMIN);

        saveCategory("존재론");
        saveCategory("인식론");
        saveCategory("윤리학");
        saveCategory("정치철학");
        saveCategory("미학");
        saveCategory("논리학");
        saveCategory("기타");
    }

    private void saveRole(RoleType roleType) {
        roleRepository.findByRoleName(roleType)
                .orElseGet(() -> roleRepository.save(
                        Role.builder()
                                .roleName(roleType)
                                .build()));
    }

    private void saveCategory(String categoryName) {
        categoryRepository.findByCategoryName(categoryName)
                .orElseGet(() -> categoryRepository.save(
                        Category.builder()
                                .categoryName(categoryName)
                                .build()));
    }
}

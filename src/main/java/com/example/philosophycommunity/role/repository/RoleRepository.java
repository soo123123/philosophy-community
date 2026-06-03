package com.example.philosophycommunity.role.repository;

import com.example.philosophycommunity.role.entity.Role;
import com.example.philosophycommunity.role.entity.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(RoleType roleName);

}
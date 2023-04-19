package com.TourViaggi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TourViaggi.entity.ERole;
import com.TourViaggi.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}

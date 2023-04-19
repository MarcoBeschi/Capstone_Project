package com.TourViaggi.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.TourViaggi.entity.Localita;

@Repository
public interface LocalitaRepository extends JpaRepository<Localita, Long>{
	

	@Query("select l from Localita l left join fetch l.attivita where l.id = :id")
	Optional<Localita> findByIdWithAttivita(@Param("id") Long id);
    List<Localita> findByNameContainingIgnoreCase(String name);
    
    
	
}

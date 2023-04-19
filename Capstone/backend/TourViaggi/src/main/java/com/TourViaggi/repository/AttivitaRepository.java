package com.TourViaggi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TourViaggi.entity.Attivita;
import com.TourViaggi.entity.Localita;

@Repository
public interface AttivitaRepository extends JpaRepository<Attivita, Long> {
	
	Optional<Attivita> findById(Long id);
	Optional<Attivita> findByTitolo(String titolo);
	List<Attivita> findAll();
}

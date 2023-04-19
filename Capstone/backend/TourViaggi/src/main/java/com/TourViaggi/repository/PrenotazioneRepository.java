package com.TourViaggi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TourViaggi.entity.Prenotazione;
import com.TourViaggi.entity.User;

public interface PrenotazioneRepository extends JpaRepository<Prenotazione, Long> {
	List<Prenotazione> findByUser(User user);
}

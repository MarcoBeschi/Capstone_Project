package com.TourViaggi.payload;

import java.util.Date;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PrenotazioneRequest {
	private Long id;
	private String dataPrenotazione;
    private int numPartecipanti;
    private int giorniTour;
	
	
}

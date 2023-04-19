package com.TourViaggi.entity;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Localita", uniqueConstraints = { 
    @UniqueConstraint(columnNames = { "coordinataX", "coordinataY" })
})
public class Localita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String titolo;

    private String descrizione1;

    private String descrizione2;

    private double prezzo;

    private String valutazione;

    private String video;

    private String coordinataX;

    private String coordinataY;
    
    private String[] tappe;
  
    private String[] fotoLocalita;

    @OneToMany(mappedBy = "localita")
    private List<Attivita> attivita;
    @OneToMany(mappedBy = "localita", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Prenotazione> prenotazioni = new HashSet<>();
    
    public List<Attivita> getAttivita() {
        return attivita;
    }

    public void setAttivita(List<Attivita> attivita) {
        this.attivita = attivita;
    }
}

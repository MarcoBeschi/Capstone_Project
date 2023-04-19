package com.TourViaggi.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TourViaggi.entity.Localita;
import com.TourViaggi.repository.LocalitaRepository;

@Service
public class LocalitaServiceImpl implements LocalitaService {

    @Autowired
    private LocalitaRepository localitaRepository;

    public Localita creaLocalita(String name,String titolo, String descrizione1, String descrizione2, double prezzo,String[] tappe, String valutazione,String[] FotoLocalita, String video, String coordinataX, String coordinataY) {
        Localita localita = new Localita();
        localita.setName(name);
        localita.setTappe(tappe);
        localita.setTitolo(titolo);
        localita.setDescrizione1(descrizione1);
        localita.setDescrizione2(descrizione2);
        localita.setPrezzo(prezzo);
        localita.setValutazione(valutazione);
        localita.setFotoLocalita(FotoLocalita);
        localita.setVideo(video);
        localita.setCoordinataX(coordinataX);
        localita.setCoordinataY(coordinataY);
        localita.setNumPartecipanti(0);
        localita.setDataPartecipazione("");
        return localita;
    }

    public void salvaLocalita(Localita localita) {
        localitaRepository.save(localita);
    }

   
    @Override
    public List<Localita> getAllLocalita() {
        List<Localita> localitaList = localitaRepository.findAll();
        for (Localita localita : localitaList) {
            localita.setAttivita(null);
        }
        return localitaList;
    }

    @Override
    public Localita getLocalitaById(Long id) {
        Optional<Localita> localitaOpt = localitaRepository.findByIdWithAttivita(id);
        if (localitaOpt.isPresent()) {
            Localita localita = localitaOpt.get();
            localita.getAttivita().forEach(a -> a.setLocalita(null)); // rimuovi il riferimento circolare
            return localita;
        }
        return null;
    }
}
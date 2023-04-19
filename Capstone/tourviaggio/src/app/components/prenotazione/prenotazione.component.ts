import { Component, Input, OnInit } from '@angular/core';
import { Localita } from '../localita/localita.interface';
import { User } from '../users/user.interface';
import { PrenotazioneService } from './prenotazione.service';


@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.scss']
})
export class PrenotazioneComponent implements OnInit {
  @Input() localita!: Localita;
  @Input() user!: User;
  @Input() localitaId!: number;
  data!: string;
  numPartecipanti!: number;
  giorniTour!: number;
  minDate!: string;
  showPopup: boolean = false;
  prenotazioneSuccesso: boolean | null = null;
  prenotazioneData!: string;
  prenotazioneNumPartecipanti!: number;
  prenotazioneGiorniTour!: number;
  prenotazioniUtente: PrenotazioneService[] = [];
  popupMessage: string = '';
  constructor(private prenotazioneService: PrenotazioneService) { }

  ngOnInit(): void {
    this.setMinDate();
    this.getPrenotazioniUtente();
  }

  setMinDate(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }
  getPrenotazioniUtente(): void {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const username = userData.username;
    if (username) {
      this.prenotazioneService.getPrenotazioniUtente(username)
        .subscribe(
          prenotazioni => {
            this.prenotazioniUtente = prenotazioni;
          },
          error => {
            console.error('Errore nel recupero delle prenotazioni:', error);
          }
        );
    } else {
      console.error('Il nome utente non è stato trovato nel localStorage');
    }
  }

  prenota() {
    this.prenotazioneService.prenotaLocalita(this.localitaId, this.data, this.numPartecipanti, this.giorniTour)
      .subscribe(
        response => {
          console.log(response);

          // Salva i valori di data, numPartecipanti e giorniTour nelle variabili temporanee
          this.prenotazioneData = this.data;
          this.prenotazioneNumPartecipanti = this.numPartecipanti;
          this.prenotazioneGiorniTour = this.giorniTour;

          // Svuota i campi input
          this.data = '';
          this.numPartecipanti = 1;
          this.giorniTour = 0;

          this.prenotazioneSuccesso = true;
          this.showPopup = true;
        },
        error => {
          console.log(error);

          // Svuota i campi input
          this.data = '';
          this.numPartecipanti = 1;
          this.giorniTour = 0;

          this.prenotazioneSuccesso = false;
          this.showPopup = true;
        });
  }
  closePopup() {
    this.showPopup = false;
  }

  calcolaPrezzo(): number {
    if (!this.numPartecipanti || !this.giorniTour) {
      return this.localita.prezzo;
    }

    let prezzoBase = this.localita.prezzo * this.numPartecipanti;
    let sconto = 0;

    if (this.giorniTour == 1) {
      prezzoBase *= 1;
    } else if (this.giorniTour == 3) {
      prezzoBase *= 3;
      sconto = 0.20;
    } else if (this.giorniTour == 5) {
      prezzoBase *= 5;
      sconto = 0.35;
    }

    let prezzoScontato = prezzoBase * (1 - sconto);
    return prezzoScontato;
  }
}

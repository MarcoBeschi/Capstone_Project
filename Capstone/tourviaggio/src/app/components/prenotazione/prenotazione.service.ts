import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {


  constructor(private http: HttpClient) { }

  prenotaLocalita(localitaId: number, data: string, numPartecipanti: number, giorniTour: number) {
    const dataFormatted = new Date(data).toISOString().slice(0, 19);
    return this.http.post('http://localhost:8080/api/localita/' + localitaId + '/prenotazioni', { dataPrenotazione: dataFormatted, numPartecipanti, giorniTour });
  }

  getPrenotazioniUtente(username: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/${username}/prenotazioni`)
      .pipe(
        catchError(error => {
          console.error('Errore nel recupero delle prenotazioni:', error);
          return throwError(error);
        })
      );
  }
}

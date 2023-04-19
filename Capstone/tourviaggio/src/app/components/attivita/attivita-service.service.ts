import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attivita } from './attivita.interface';

@Injectable({
  providedIn: 'root'
})
export class AttivitaService {

  constructor(private http: HttpClient) { }

  getAttivitaByLocalitaId(localitaId: number): Observable<Attivita[]> {
    return this.http.get<Attivita[]>(`/api/localita/${localitaId}/attivita`);
  }
}

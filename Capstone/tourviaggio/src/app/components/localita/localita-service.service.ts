import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Localita } from './localita.interface';
import { Attivita } from '../attivita/attivita.interface';
@Injectable({
  providedIn: 'root'
})
export class LocalitaService {
  private baseUrl = 'http://localhost:8080/api/localita';

  constructor(private http: HttpClient) { }

  getLocalita(id: number): Observable<Localita> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        map((localita: Localita) => {
          localita.attivita.forEach((a: Attivita) => a.localita );
          return localita;
        }),
        catchError((error: any) => {
          if (error instanceof SyntaxError) {
            console.error('Error parsing JSON data:', error);
          } else {
            console.error('Error fetching data:', error);
          }
          return throwError(error);
        })
      );
  }
  getAllLocalita(): Observable<Localita[]> {
    return this.http.get<Localita[]>(this.baseUrl);
  }
}

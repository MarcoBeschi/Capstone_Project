import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Localita } from '../localita/localita.interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RicercaService {
  private allLocalita: Localita[] = [];
  private filteredLocalita: Localita[] = [];
  private searchTerm = '';
  public showResults = false;
  public filteredLocalita$ = new BehaviorSubject<Localita[]>(this.filteredLocalita);
  private localita: Localita[] = [];
  private isInSearchMode = false;

  constructor(private http: HttpClient) { }

  public setLocalita(localita: Localita[]): void {
    this.allLocalita = localita;
  }

  public searchLocalita(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase().trim();

    if (this.searchTerm) {
      this.filteredLocalita = this.allLocalita.filter(localita => localita.name.toLowerCase().includes(this.searchTerm));
    } else {
      this.filteredLocalita = [];
    }

    this.filteredLocalita$.next(this.filteredLocalita);
  }

  public clearResults(): void {
    this.filteredLocalita = [];
    this.searchTerm = '';
    this.showResults = false;
    this.filteredLocalita$.next(this.filteredLocalita);
  }
  getIsInSearchMode() {
    return this.isInSearchMode;
  }

  setIsInSearchMode(isInSearchMode: boolean) {
    this.isInSearchMode = isInSearchMode;
  }
}

import { Component, Injectable, OnInit,Inject  } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { LocalitaService } from '../localita/localita-service.service';
import { Localita } from '../localita/localita.interface';
import { RicercaService } from './ricerca.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../users/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {

  searchTerm = '';
  private apiUrl = 'http://localhost:8080/api/localita';
  isLoggedIn = false;
  showResults = false;
  allLocalita: Localita[] = [];
  filteredLocalita: Localita[] = [];
  currentRoute = '';
  currentUser!: User | null;
  constructor(
    private authSrv: AuthServiceService,
    private http: HttpClient,
    private localitaService: LocalitaService,
    private ricercaService: RicercaService,
    @Inject(Router) public router: Router
  ) { }

  ngOnInit(): void {
    this.authSrv.areYouLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.updateCurrentUser();
      if (isLoggedIn) {
        this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        this.currentUser = null;
      }
    });

    this.localitaService.getAllLocalita().subscribe(localitaArray => {
      this.allLocalita = localitaArray;
      this.ricercaService.setLocalita(localitaArray); // Aggiorna la lista di località del servizio RicercaService
    });

    // Monitora il cambio di route e aggiorna il percorso corrente
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  updateCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    } else {
      this.currentUser = null;
    }
  }

  searchLocations() {
    if (this.searchTerm) {
      this.filteredLocalita = this.allLocalita.filter(localita => localita.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.filteredLocalita = [];
    }
    this.showResults = true;
    this.ricercaService.searchLocalita(this.searchTerm); // Chiamata HTTP alla ricerca delle località corrispondenti
  }

  redirectToDetails(id: number) {
    console.log('Redirecting to localita with id:', id);
    this.router.navigate(['/localita', id]);
  }

  onLogOut() {
    this.authSrv.logOut();
  }

  showSearchBar() {
    return this.currentRoute !== '/localita';
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

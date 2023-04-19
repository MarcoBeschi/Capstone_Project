import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { PrenotazioneService } from '../prenotazione/prenotazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
user:any;
  prenotazioni: any[] = [];

  constructor(private authSrv:AuthServiceService, private http:HttpClient,private prenotazioneService: PrenotazioneService,private router: Router) { }


  ngOnInit(): void {

    this.user=localStorage.getItem('user');
    this.user=JSON.parse(this.user)
    this.getPrenotazioniUtente();
console.log(this.user)
  }
  getPrenotazioniUtente(): void {

    const username = this.user.username;

    this.prenotazioneService.getPrenotazioniUtente(username).subscribe(
      (data: any[]) => {
        this.prenotazioni = data;

      },
      error => {
        console.error('Errore nel recupero delle prenotazioni:', error);
      }
    );
  }

  navigateToLocation(id: number) {
    this.router.navigate(['/localita', id]);
  }
}



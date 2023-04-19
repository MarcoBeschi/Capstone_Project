import { Component, Inject, OnInit } from '@angular/core';
import { Localita } from './localita.interface';
import { LocalitaService } from './localita-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Attivita } from '../attivita/attivita.interface';
import { AttivitaService } from '../attivita/attivita-service.service';
import { User } from '../users/user.interface';
import { UserServiceService } from '../users/user-service.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-localita',
  templateUrl: './localita.component.html',
  styleUrls: ['./localita.component.scss']
})
export class LocalitaComponent implements OnInit {
  localita!: Localita;
  videoUrl: SafeResourceUrl | undefined;
  attivitaList: Attivita[] = [];
  user!:User;
  @ViewChild('tappeModal') tappeModal!: ElementRef;


  constructor(
    private localitaService: LocalitaService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly sanitizer: DomSanitizer,
    private attivitaService:AttivitaService,
    private userService: UserServiceService,
    private modal: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.localitaService.getLocalita(id).subscribe(localita => {
      this.localita = localita;
      if (this.localita && this.localita.video) {
        const videoId = this.getLocalitaVideoId(this.localita.video);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&start=5&controls=0&showinfo=0&rel=0&modestbranding=1&mute=1`);
      }
      this.attivitaList = this.localita.attivita;
    });

    // Recupera l'utente corrente
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
  }

  mostraDettagli(id: number) {
    this.router.navigate(['/articolo', id]);
  }

  private getLocalitaVideoId(videoUrl: string): string {
    const videoId = videoUrl.split('/').pop();
    if (videoId) {
      return videoId.split('?').shift()!;
    }
    return '';
  }

  openModal() {
    const modal = this.tappeModal.nativeElement;
    modal.style.display = 'block';
    modal.classList.add('show');
    this.document.body.classList.add('no-scroll');
  }

  closeModal() {
    const modal = this.tappeModal.nativeElement;
    modal.style.display = 'none';
    modal.classList.remove('show');
    this.document.body.classList.remove('no-scroll');
  }

}

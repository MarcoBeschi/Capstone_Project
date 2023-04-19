import { Component, OnInit } from '@angular/core';
import { Localita } from '../localita/localita.interface';
import { LocalitaService } from '../localita/localita-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  localita: Localita[] = [];
  fotoLocalita: string[] = [];
  titoli: string[] = [];

  constructor(private localitaService: LocalitaService) {}

  ngOnInit(): void {
    this.localitaService.getAllLocalita().subscribe((localita) => {
      this.localita = localita;
      for (let i = 0; i < 5; i++) {
        if (this.localita[i]?.fotoLocalita?.length > 0) {
          this.fotoLocalita.push(this.localita[i].fotoLocalita[0]);
          this.titoli.push(this.localita[i].titolo);
        }
      }
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Localita } from '../localita/localita.interface';
import { Attivita } from './attivita.interface';
@Component({
  selector: 'app-attivita',
  templateUrl: './attivita.component.html',
  styleUrls: ['./attivita.component.scss']
})
export class AttivitaComponent implements OnInit {
  @Input() localita!: Localita;
  attivita: Attivita[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.localita && this.localita.attivita) {
      this.attivita = this.localita.attivita;
    }
  }
}

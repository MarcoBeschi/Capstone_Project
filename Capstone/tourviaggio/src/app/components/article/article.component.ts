import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Localita } from '../localita/localita.interface';
import { LocalitaService } from '../localita/localita-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  localita: Localita[] = [];
  showAllCards = false;
  cardLimit = 6;
  maxCardsToShow = 6;

  constructor(
    private router: Router,
    private localitaService: LocalitaService
  ) {}

  ngOnInit(): void {
    this.localitaService.getAllLocalita().subscribe(localitaArray => {
      this.localita = localitaArray;
    });
  }

  navigateToLocation(id: number) {
    this.router.navigate(['/localita', id]);
  }


  truncate(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  showFullDescription(showMore: any, loc: Localita) {
    const card = showMore.closest('.card') as HTMLElement | null;
    if (!card) return;

    const cardText = card.querySelector('.truncated-text') as HTMLElement | null;
    if (!cardText) return;

    const cardFullText = card.querySelector('.card-full-text') as HTMLElement | null;
    if (!cardFullText) return;

    if (cardFullText.style.display === 'none') {
      cardFullText.style.display = 'block';
      showMore.innerText = 'Mostra di meno';
      cardText.style.display = 'none';
    } else {
      cardFullText.style.display = 'none';
      showMore.innerText = 'Mostra di più';
      cardText.style.display = 'inline';
    }
  }

  showMoreCards() {
    this.cardLimit = this.localita.length;
    this.showAllCards = true;
  }

  showLessCards() {
    this.cardLimit = this.maxCardsToShow;
    this.showAllCards = false;
  }

  getDisplayedCards(): Localita[] {
    if (this.showAllCards) {
      return this.localita;
    } else {
      return this.localita.slice(0, this.cardLimit);
    }
  }
}

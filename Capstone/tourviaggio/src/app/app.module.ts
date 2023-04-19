import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModuleModule } from './auth/auth-module/auth-module.module';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocalitaComponent } from './components/localita/localita.component';
import { LocalitaService } from './components/localita/localita-service.service';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { ArticleComponent } from './components/article/article.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ɵDomSanitizerImpl } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { InformazioniComponent } from './components/informazioni/informazioni.component';
import { RicercaService } from './components/navbar/ricerca.service';
import { CommonModule } from '@angular/common';
import { AttivitaComponent } from './components/attivita/attivita.component';
import { PrenotazioneComponent } from './components/prenotazione/prenotazione.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    LocalitaComponent,
    HomepageComponent,
    HeaderComponent,
    ArticleComponent,
    FooterComponent,
    InformazioniComponent,
    AttivitaComponent,
    PrenotazioneComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModuleModule,
    FormsModule,
    CommonModule
  ],
  providers: [LocalitaService,
    { provide: DomSanitizer, useClass: ɵDomSanitizerImpl },
    RicercaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

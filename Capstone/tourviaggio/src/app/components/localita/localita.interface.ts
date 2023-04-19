import { Attivita } from "../attivita/attivita.interface";


export interface Localita {
  id: number;
  name: string;
  titolo: string;
  descrizione1: string;
  descrizione2: string;
  prezzo: number;
  valutazione: string;
  video: string;
  coordinataX: string;
  coordinataY: string;
  numPartecipanti: string;
  dataPartecipazione: string;
  tappe: string[];
  fotoLocalita: string[];
  attivita: Attivita[];
}


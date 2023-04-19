import { Localita } from "../localita/localita.interface";

export interface Attivita {
  id: number;
  titolo: string;
  descrizione: string;
  foto: string;
  localita:Localita[];
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Anzeige } from 'src/models/anzeige.model';

@Injectable({
  providedIn: "root"
})
export class AnzeigeService {

  defUrl: string = "http://localhost:3030/api/";

  private _getAllAnzeigen = `${this.defUrl}anzeigen`;
  private _getAnzeigeById = `${this.defUrl}anzeige/details/`;
  private _postNewAnzeige = `${this.defUrl}anzeige/add`;

  constructor(private http: HttpClient) { }

  getAllAnzeigen() {
    return this.http.get<any>(this._getAllAnzeigen);
  }

  postNewAnzeige(anzeigeValue) {
    return this.http.post<Anzeige>(this._postNewAnzeige, anzeigeValue);
  }

  getAnzeigeById(id) {
    return this.http.get<Anzeige>(this._getAnzeigeById + id);
  }
}

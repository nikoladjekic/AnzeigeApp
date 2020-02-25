import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AnzeigeService {
  defaultUrl: string = "http://localhost:3030/api/";

  private _getAllAnzeigen = `${this.defaultUrl}anzeigen`;

  constructor(private http: HttpClient) {}

  getAllAnzeigen() {
    return this.http.get<any>(this._getAllAnzeigen);
  }
}

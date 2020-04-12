import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Anzeige } from "src/models/anzeige.model";

@Injectable({
  providedIn: "root",
})
export class AnzeigeService {
  url1: string = "http://localhost:3030/api/anzeigen/";
  url2: string = "http://localhost:3030/api/anzeige/";

  page: number = 1;
  limit: number = 5;
  pagination: string = `page=${this.page}&limit=${this.limit}`;

  constructor(private http: HttpClient) {}

  getAllAnzeigen() {
    return this.http.get<any>(`${this.url1}all?${this.pagination}`);
  }

  getActiveAnzeigen() {
    return this.http.get<any>(
      `${this.url1}type?active=true&${this.pagination}`
    );
  }

  getInactiveAnzeigen() {
    return this.http.get<any>(
      `${this.url1}type?active=false&${this.pagination}`
    );
  }

  postNewAnzeige(anzeigeValue) {
    return this.http.post<Anzeige>(this.url2 + "add", anzeigeValue, {
      responseType: "text" as "json",
    });
  }

  getAnzeigeById(id) {
    return this.http.get<Anzeige>(this.url2 + "details/" + id);
  }

  getBundeslandByLocation(lat, lon) {
    return this.http.get<any>(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=de`
    );
  }

  getActiveByBundesland(land) {
    return this.http.get<any>(
      `${this.url1}bundesland/${land}?active=true&${this.pagination}`
    );
  }

  getExpiredByBundesland(land) {
    return this.http.get<any>(
      `${this.url1}bundesland/${land}?active=false&${this.pagination}`
    );
  }

  getActiveByName(name) {
    return this.http.get<any>(
      `${this.url1}firma/${name}?active=true&${this.pagination}`
    );
  }

  getExpiredByName(name) {
    return this.http.get<any>(
      `${this.url1}firma/${name}?active=false&${this.pagination}`
    );
  }
}

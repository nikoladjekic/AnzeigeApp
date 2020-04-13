import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Anzeige } from "src/models/anzeige.model";

@Injectable({
  providedIn: "root",
})
export class AnzeigeService {
  url1: string = "http://localhost:3030/api/anzeigen/";
  url2: string = "http://localhost:3030/api/anzeige/";

  limit: number = 5;

  constructor(private http: HttpClient) {}

  getAllAnzeigen(page) {
    return this.http.get<any>(
      `${this.url1}all?page=${page}&limit=${this.limit}`
    );
  }

  getActiveAnzeigen(page) {
    return this.http.get<any>(
      `${this.url1}type?active=true&page=${page}&limit=${this.limit}`
    );
  }

  getInactiveAnzeigen(page) {
    return this.http.get<any>(
      `${this.url1}type?active=false&page=${page}&limit=${this.limit}`
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

  getActiveByBundesland(land, page) {
    return this.http.get<any>(
      `${this.url1}bundesland/${land}?active=true&page=${page}&limit=${this.limit}`
    );
  }

  getExpiredByBundesland(land, page) {
    return this.http.get<any>(
      `${this.url1}bundesland/${land}?active=false&page=${page}&limit=${this.limit}`
    );
  }

  getActiveByName(name, page) {
    return this.http.get<any>(
      `${this.url1}firma/${name}?active=true&page=${page}&limit=${this.limit}`
    );
  }

  getExpiredByName(name, page) {
    return this.http.get<any>(
      `${this.url1}firma/${name}?active=false&page=${page}&limit=${this.limit}`
    );
  }
}

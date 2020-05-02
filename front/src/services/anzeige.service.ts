import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Anzeige } from "src/models/anzeige.model";

@Injectable({
  providedIn: "root",
})
export class AnzeigeService {
  url: string = "http://localhost:3030/api/anzeige";
  limit: number = 3;

  constructor(private http: HttpClient) {}

  getAll(page) {
    return this.http.get<any>(`${this.url}?page=${page}&limit=${this.limit}`);
  }

  getActive(page) {
    return this.http.get<any>(
      `${this.url}?active=true&page=${page}&limit=${this.limit}`
    );
  }

  getInactive(page) {
    return this.http.get<any>(
      `${this.url}?active=false&sort=date&order=-1&page=${page}&limit=${this.limit}`
    );
  }

  postNew(anzeigeValue) {
    return this.http.post<Anzeige>(this.url + "add", anzeigeValue, {
      responseType: "text" as "json",
    });
  }

  getById(id) {
    return this.http.get<Anzeige>(this.url + "/details/" + id);
  }

  getBundeslandByLocation(lat, lon) {
    return this.http.get<any>(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=de`
    );
  }

  getActiveByBundesland(land, page) {
    return this.http.get<any>(
      `${this.url}/bundesland/${land}?active=true&page=${page}&limit=${this.limit}`
    );
  }

  getExpiredByBundesland(land, page) {
    return this.http.get<any>(
      `${this.url}/bundesland/${land}?active=false&page=${page}&limit=${this.limit}`
    );
  }

  getActiveByName(name, page) {
    return this.http.get<any>(
      `${this.url}/firma/${name}?active=true&page=${page}&limit=${this.limit}`
    );
  }

  getExpiredByName(name, page) {
    return this.http.get<any>(
      `${this.url}/firma/${name}?active=false&page=${page}&limit=${this.limit}`
    );
  }

  // admin route to order expiring ads first
  getByDateAscending(page) {
    return this.http.get<any>(
      `${this.url}?active=true&sort=date&order=1&page=${page}&limit=${this.limit}`
    );
  }
}

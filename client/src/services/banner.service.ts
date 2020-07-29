import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Banner } from "src/models/banner.model";

@Injectable({
  providedIn: "root",
})
export class BannerService {
  private url: string = "http://localhost:3030/api/banner";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Banner[]>(this.url);
  }

  postNew(banner) {
    return this.http.post<Banner>(this.url + "/add", banner);
  }
}

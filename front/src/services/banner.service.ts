import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Banner } from 'src/models/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  url: string = "http://localhost:3030/api/";

  private _getAllBanner = `${this.url}banner`;
  private _postNewBanner = `${this.url}banner/add`;

  constructor(private http: HttpClient) { }

  getAllBanner() {
    return this.http.get<Banner[]>(this._getAllBanner);
  }

  postNewBanner(banner) {
    return this.http.post<Banner>(this._postNewBanner, banner);
  } 

}

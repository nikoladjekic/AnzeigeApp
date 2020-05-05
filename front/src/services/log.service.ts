import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LogService {
  url: string = "http://localhost:3030/api/visit";
  limit: number = 10;

  constructor(private _http: HttpClient) {}

  // get visits log data
  getAll(page) {
    return this._http.get<any>(`${this.url}?page=${page}&limit=${this.limit}`);
  }

  getByDate(date) {
    // todo
  }

  // get details of every visitor to our website
  checkVisitorDetails() {
    return this._http.get<any>("https://ipapi.co/json/");
  }

  // save details of the visitor
  addNewVisit(logData) {
    return this._http.post<any>(this.url + "/add", logData);
  }
}

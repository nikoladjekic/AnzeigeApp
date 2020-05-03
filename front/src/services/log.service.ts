import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LogService {
  constructor(private _http: HttpClient) {}

  // get details of every visitor to our website
  checkVisitorDetails() {
    return this._http.get<any>("https://ipapi.co/json/");
  }

  // save details of the visitor
  addNewVisit(logData) {
    return this._http.post<any>("http://localhost:3030/api/visit/add", logData);
  }
}

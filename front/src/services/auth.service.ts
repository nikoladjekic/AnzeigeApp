import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "http://localhost:3030/api/";

  constructor(private _http: HttpClient, private _router: Router) {}

  getAllUsers() {
    return this._http.get<any>(this.url + "users");
  }

  registerUser(user) {
    return this._http.post<any>(this.url + "register", user);
  }

  loginUser(user) {
    return this._http.post<any>(this.url + "login", user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
  }
}

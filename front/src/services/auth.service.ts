import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  defaultUrl: string = "http://localhost:3030/api/";

  private _getAllUsers = `${this.defaultUrl}users`;
  private _registerUser = `${this.defaultUrl}register`;
  private _loginUser = `${this.defaultUrl}login`;

  constructor(private http: HttpClient, private _router: Router) {}

  getAllUsers() {
    return this.http.get<any>(this._getAllUsers);
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUser, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUser, user);
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

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  defUrl: string = "http://localhost:3030/api/";

  private _getAllUsers = `${this.defUrl}users`;
  private _registerUser = `${this.defUrl}register`;
  private _loginUser = `${this.defUrl}login`;

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

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _getAllUsersUrl = "http://localhost:3030/api/get-users";
  private _registerUrl = "http://localhost:3030/api/register";
  private _loginUrl = "http://localhost:3030/api/login";

  constructor(private http: HttpClient, private _router: Router) {}

  getAllUsers() {
    return this.http.get<any>(this._getAllUsersUrl);
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }
}

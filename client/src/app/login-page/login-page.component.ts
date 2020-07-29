import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "src/services/auth.service";
import { DataSharingService } from "src/services/data-sharing.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  loginUserData = {};
  wrongEmail: boolean = false;
  wrongPass: boolean = false;
  userThatLoggedIn: string;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _dataShare: DataSharingService
  ) {}

  ngOnInit() {
    this._dataShare.currentUser.subscribe(
      user => (this.userThatLoggedIn = user)
    );
  }

  setLoggedUserEmail(email) {
    this._dataShare.setLoggedUser(email);
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        this.setLoggedUserEmail(this.loginUserData["email"]);
        localStorage.setItem("token", res.token);
        this._router.navigate(["/admin"]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            if (err.error === "Invalid email") return (this.wrongEmail = true);
            else return (this.wrongEmail = false), (this.wrongPass = true);
          }
        }
      }
    );
  }
}

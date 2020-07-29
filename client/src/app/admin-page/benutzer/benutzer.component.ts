import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-benutzer",
  templateUrl: "./benutzer.component.html",
  styleUrls: ["./benutzer.component.css"]
})
export class BenutzerComponent implements OnInit {
  listOfUsers = [];
  registerUserData = {};
  userExists: boolean = false;
  registeredSuccessfully: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {
    this._auth.getAllUsers().subscribe(res => {
      this.listOfUsers = res;
    });
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        this.userExists = false;
        localStorage.setItem("token", res.token);
        this.registeredSuccessfully = true;
      },
      err => {
        this.registeredSuccessfully = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 409) {
            this.userExists = true;
          }
        }
      }
    );
  }

  deleteUser() {
    // implement delete logic on the modal check
    // set the user to inactive, do not actually delete
  }
}

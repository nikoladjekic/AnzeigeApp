import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { DataSharingService } from "src/services/data-sharing.service";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  userThatLoggedIn: string;
  
  constructor(
    private _dataShare: DataSharingService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._dataShare.currentUser.subscribe(
      user => (this.userThatLoggedIn = user)
    );
  }

  ngOnDestroy() {
    this._auth.logoutUser();
  }

  logout() {
    this._auth.logoutUser();
    this._router.navigate(["/login"]);
  }
}

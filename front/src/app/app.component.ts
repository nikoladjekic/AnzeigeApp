import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this._authService.logoutUser();
  }
}

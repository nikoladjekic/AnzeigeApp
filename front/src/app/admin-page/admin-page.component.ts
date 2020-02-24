import { Component, OnInit } from "@angular/core";

import { DataSharingService } from "src/services/data-sharing.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  userThatLoggedIn: string;
  constructor(private _dataShare: DataSharingService) {}

  ngOnInit() {
    this._dataShare.currentUser.subscribe(
      user => (this.userThatLoggedIn = user)
    );
  }
}

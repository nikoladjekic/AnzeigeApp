import { Component, OnInit } from "@angular/core";

import { Bundesland } from "src/models/bundesland.enum";
import { DataSharingService } from "src/services/data-sharing.service";

@Component({
  selector: "app-heading",
  templateUrl: "./heading.component.html",
  styleUrls: ["./heading.component.css"],
})
export class HeadingComponent implements OnInit {
  searchTerm: string;

  constructor(private _dataShare: DataSharingService) {}

  ngOnInit() {}

  searchByName(event) {
    this.searchTerm = event;
    this._dataShare.setNameSearchTerm(this.searchTerm);
  }

  reload() {
    window.location.reload();
  }
}

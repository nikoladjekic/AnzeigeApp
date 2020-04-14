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

  bundesland: Bundesland[] = [
    Bundesland.V,
    Bundesland.T,
    Bundesland.S,
    Bundesland.OÖ,
    Bundesland.NÖ,
    Bundesland.W,
    Bundesland.K,
    Bundesland.B,
    Bundesland.ST,
  ];

  constructor(private _dataShare: DataSharingService) {}

  ngOnInit() {}

  searchByName(event) {
    this.searchTerm = event;
    this._dataShare.setNameSearchTerm(this.searchTerm);
  }

  resetPageState() {
    this.searchTerm = "";
    this._dataShare.setResetPageState(true);
  }
}

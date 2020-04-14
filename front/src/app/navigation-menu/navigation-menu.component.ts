import { Component, OnInit } from "@angular/core";

import { DataSharingService } from "src/services/data-sharing.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-navigation-menu",
  templateUrl: "./navigation-menu.component.html",
  styleUrls: ["./navigation-menu.component.css"],
})
export class NavigationMenuComponent implements OnInit {
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

  setBundesland(val) {
    this._dataShare.setSelectedState(val);
  }

  resetPageState() {
    this._dataShare.setResetPageState(true);
  }
}

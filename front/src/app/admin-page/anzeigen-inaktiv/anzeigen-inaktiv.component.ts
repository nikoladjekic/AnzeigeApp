import { Component, OnInit } from "@angular/core";

import { AnzeigeService } from "src/services/anzeige.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-anzeigen-inaktiv",
  templateUrl: "./anzeigen-inaktiv.component.html",
  styleUrls: ["./anzeigen-inaktiv.component.css"]
})
export class AnzeigenInaktivComponent implements OnInit {
  selectedBundesland: Bundesland;
  searchTerm: string;
  inactiveAnzeigenList = [];
  filterValues = this.inactiveAnzeigenList;

  bundesland: Bundesland[] = [
    Bundesland.V,
    Bundesland.T,
    Bundesland.S,
    Bundesland.OÖ,
    Bundesland.NÖ,
    Bundesland.W,
    Bundesland.K,
    Bundesland.B,
    Bundesland.ST
  ];

  constructor(private _adService: AnzeigeService) {}

  ngOnInit() {
    this.getInactiveAds();
  }

  getInactiveAds() {
    this._adService.getInactiveAnzeigen().subscribe(res => {
      this.inactiveAnzeigenList = res;
    });
  }

  sortByBundesland() {
    this.inactiveAnzeigenList = this.filterValues.filter(el => {
      return (
        el.bundesland
          .toUpperCase()
          .indexOf(this.selectedBundesland.toUpperCase()) >= 0
      );
    });
  }

  searchByName(): void {
    this.inactiveAnzeigenList = this.filterValues.filter(el => {
      return el.firma.toUpperCase().indexOf(this.searchTerm.toUpperCase()) >= 0;
    });
  }
}

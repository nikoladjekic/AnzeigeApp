import { Component, OnInit } from "@angular/core";

import { AnzeigeService } from "src/services/anzeige.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-anzeigen-inaktiv",
  templateUrl: "./anzeigen-inaktiv.component.html",
  styleUrls: ["./anzeigen-inaktiv.component.css"],
})
export class AnzeigenInaktivComponent implements OnInit {
  selectedBundesland: Bundesland;
  searchTerm: string;
  inactiveAnzeigenList = [];

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

  constructor(private _adService: AnzeigeService) {}

  ngOnInit() {
    this.getInactiveAds();
  }

  getInactiveAds(): void {
    this._adService.getInactiveAnzeigen().subscribe((res) => {
      this.inactiveAnzeigenList = res.results;
    });
  }

  sortByBundesland(): void {
    this._adService
      .getExpiredByBundesland(this.selectedBundesland)
      .subscribe((res) => {
        this.inactiveAnzeigenList = res.results;
      });
  }

  searchByName(): void {
    if (this.searchTerm) {
      this._adService.getExpiredByName(this.searchTerm).subscribe((res) => {
        this.inactiveAnzeigenList = res.results;
      });
    } else {
      this.getInactiveAds();
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AnzeigeService } from "src/services/anzeige.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-anzeigen",
  templateUrl: "./anzeigen.component.html",
  styleUrls: ["./anzeigen.component.css"]
})
export class AnzeigenComponent implements OnInit {
  activeAnzeigenList = [];
  filterValues = this.activeAnzeigenList;
  selectedBundesland: Bundesland;
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
    Bundesland.ST
  ];

  constructor(private _adService: AnzeigeService, private _router: Router) {}

  ngOnInit() {
    this.getAllActiveAds();
  }

  getAllActiveAds() {
    this._adService.getActiveAnzeigen().subscribe(res => {
      this.activeAnzeigenList = res;
      this.activeAnzeigenList.forEach(anzeige =>
        this.checkIfAboutToExpire(anzeige)
      );
    });
  }

  sortByBundesland(): void {
    this.activeAnzeigenList = this.filterValues.filter(el => {
      return (
        el.bundesland
          .toUpperCase()
          .indexOf(this.selectedBundesland.toUpperCase()) >= 0
      );
    });
  }

  searchByName(): void {
    this.activeAnzeigenList = this.filterValues.filter(el => {
      return el.firma.toUpperCase().indexOf(this.searchTerm.toUpperCase()) >= 0;
    });
  }

  // check if the ad is about to expire in less than 30 days
  checkIfAboutToExpire(val) {
    let today: Date = new Date();
    let expDate: Date = new Date(val.endDate);
    // set expiration threshold to 30 days :: days*hour*min*sec*milisec
    let threshold: Date = new Date(
      expDate.getTime() - 30 * 24 * 60 * 60 * 1000
    );
    if (today > threshold) {
      val.photoUrl = `https://previews.123rf.com/images/mykub/mykub1902/mykub190200461/117044296-
          warning-attention-sign-danger-sign-design-caution-error-icon.jpg`;
      val.services = "";
    }
  }

  seeDetails(val) {
    this._router.navigate(["/", { id: val }]);
  }
}

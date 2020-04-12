import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AnzeigeService } from "src/services/anzeige.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-anzeigen",
  templateUrl: "./anzeigen.component.html",
  styleUrls: ["./anzeigen.component.css"],
})
export class AnzeigenComponent implements OnInit {
  activeAnzeigenList = [];
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
    Bundesland.ST,
  ];

  constructor(private _adService: AnzeigeService, private _router: Router) {}

  ngOnInit() {
    this.getAllActiveAds();
  }

  getAllActiveAds(): void {
    this._adService.getActiveAnzeigen().subscribe((res) => {
      this.activeAnzeigenList = res.results;
      this.activeAnzeigenList.forEach((anzeige) =>
        this.checkIfAboutToExpire(anzeige)
      );
      this.activeAnzeigenList.sort(this.sortByExpiryDate);
    });
  }

  sortByBundesland(): void {
    this._adService
      .getActiveByBundesland(this.selectedBundesland)
      .subscribe((res) => {
        this.activeAnzeigenList = res.results;
      });
  }

  searchByName(): void {
    if (this.searchTerm) {
      this._adService.getActiveByName(this.searchTerm).subscribe((res) => {
        this.activeAnzeigenList = res.results;
      });
    } else {
      this.getAllActiveAds();
    }
  }

  // helper function: special style if ad is about to expire in less than 30 days
  checkIfAboutToExpire(val): void {
    let today: Date = new Date();
    let expDate: Date = new Date(val.endDate);
    // set expiration threshold to 30 days :: days*hour*min*sec*milliseconds
    let threshold: Date = new Date(
      expDate.getTime() - 30 * 24 * 60 * 60 * 1000
    );
    if (today > threshold) {
      val.photoUrl = `https://previews.123rf.com/images/mykub/mykub1902/mykub190200461/117044296-
          warning-attention-sign-danger-sign-design-caution-error-icon.jpg`;
      val.services = "";
    }
  }

  // sort Anzeigen by expiry date
  sortByExpiryDate(a, b): number {
    let date1: Date = new Date(a.endDate);
    let date2: Date = new Date(b.endDate);
    let comparison = 0;
    if (date1 > date2) {
      comparison = 1;
    } else if (date1 < date2) {
      comparison = -1;
    }
    return comparison;
  }

  // when clicked on the anzeige show details page
  seeDetails(val): void {
    this._router.navigate(["/", { id: val }]);
  }
}

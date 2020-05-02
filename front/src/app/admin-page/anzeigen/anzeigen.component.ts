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
  selectedBundesland: Bundesland;

  searchTerm: string;
  searchScenario: string;

  nextPage: boolean;
  prevPage: boolean;

  pageNum: number;

  activeAnzeigenList = [];
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

  constructor(private _anzeige: AnzeigeService, private _router: Router) {}

  ngOnInit() {
    if (!this.pageNum) this.pageNum = 1;
    this.getAllActiveAds(this.pageNum);
  }

  getAllActiveAds(page): void {
    this._anzeige.getByDateAscending(page).subscribe((res) => {
      this.searchScenario = "allSearch";
      this.searchTerm = "";
      this.activeAnzeigenList = res.results;
      this.activeAnzeigenList.forEach((anzeige) =>
        this.checkIfAboutToExpire(anzeige)
      );
      this.checkForPages(res.previous, res.next);
    });
  }

  sortByBundesland(page): void {
    this.searchScenario = "bundeslandSearch";
    this.searchTerm = "";
    this._anzeige
      .getActiveByBundesland(this.selectedBundesland, page)
      .subscribe((res) => {
        this.activeAnzeigenList = res.results;
        this.checkForPages(res.previous, res.next);
      });
  }

  searchByName(page): void {
    if (this.searchTerm) {
      this.searchScenario = "nameSearch";
      this._anzeige.getActiveByName(this.searchTerm, page).subscribe((res) => {
        this.activeAnzeigenList = res.results;
        this.checkForPages(res.previous, res.next);
      });
    } else {
      this.pageNum = 1;
      this.getAllActiveAds(this.pageNum);
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

  // when clicked on the anzeige show details page
  seeDetails(val): void {
    this._router.navigate(["/", { id: val }]);
  }

  nextPageClick() {
    this.pageNum += 1;
    this.checkEnvScenario();
  }

  prevPageClick() {
    this.pageNum -= 1;
    this.checkEnvScenario();
  }

  firstPageClick() {
    this.pageNum = 1;
    this.checkEnvScenario();
  }

  resetPageAndGetAll() {
    this.pageNum = 1;
    this.getAllActiveAds(this.pageNum);
  }

  resetPageAndGetBundesland() {
    this.pageNum = 1;
    this.sortByBundesland(this.pageNum);
  }

  // check if previous or next page exist
  checkForPages(prev, next): void {
    if (prev) this.prevPage = true;
    else this.prevPage = false;

    if (next) this.nextPage = true;
    else this.nextPage = false;
  }

  // check the context before doing the search for pagination
  checkEnvScenario() {
    if (this.searchScenario === "allSearch") this.getAllActiveAds(this.pageNum);
    else if (this.searchScenario === "nameSearch")
      this.searchByName(this.pageNum);
    else if (this.searchScenario === "bundeslandSearch")
      this.sortByBundesland(this.pageNum);
  }
}

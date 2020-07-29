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
  searchScenario: string;

  nextPage: boolean;
  prevPage: boolean;

  pageNum: number;

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

  constructor(private _anzeige: AnzeigeService) {}

  ngOnInit() {
    if (!this.pageNum) this.pageNum = 1;
    this.getInactiveAds(this.pageNum);
  }

  getInactiveAds(page): void {
    this._anzeige.getInactive(page).subscribe((res) => {
      this.inactiveAnzeigenList = res.results;
      this.searchScenario = "allSearch";
      this.searchTerm = "";
      this.checkForPages(res.previous, res.next);
    });
  }

  sortByBundesland(page): void {
    this.searchScenario = "bundeslandSearch";
    this.searchTerm = "";
    this._anzeige
      .getExpiredByBundesland(this.selectedBundesland, page)
      .subscribe((res) => {
        this.inactiveAnzeigenList = res.results;
        this.checkForPages(res.previous, res.next);
      });
  }

  searchByName(page): void {
    if (this.searchTerm) {
      this.searchScenario = "nameSearch";
      this._anzeige.getExpiredByName(this.searchTerm, page).subscribe((res) => {
        this.inactiveAnzeigenList = res.results;
        this.checkForPages(res.previous, res.next);
      });
    } else {
      this.pageNum = 1;
      this.getInactiveAds(this.pageNum);
    }
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
    this.getInactiveAds(this.pageNum);
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
    if (this.searchScenario === "allSearch") this.getInactiveAds(this.pageNum);
    else if (this.searchScenario === "nameSearch")
      this.searchByName(this.pageNum);
    else if (this.searchScenario === "bundeslandSearch")
      this.sortByBundesland(this.pageNum);
  }
}

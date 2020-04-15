import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, BehaviorSubject } from "rxjs";

import { AnzeigeService } from "src/services/anzeige.service";
import { DataSharingService } from "src/services/data-sharing.service";

import { Bundesland } from "src/models/bundesland.enum";
import { Anzeige } from "src/models/anzeige.model";

@Component({
  selector: "app-middle-content",
  templateUrl: "./middle-content.component.html",
  styleUrls: ["./middle-content.component.css"],
})
export class MiddleContentComponent implements OnInit, OnDestroy {
  subForBundeslandSearch: Subscription;
  subForNameSearch: Subscription;

  selectedBundesland: string = "Standort Laden...";
  usersLocation: string;
  searchTerm: string;
  activeBanner: string;
  horizBanner: string;
  searchScenario: string;

  insideAustria: boolean;
  usersConsent: boolean;
  nextPage: boolean;
  prevPage: boolean;
  resetPageState: boolean;

  pageNum: number;

  listOfAnzeigen: Array<Anzeige> = [];
  bundesland: Array<Bundesland> = [
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

  constructor(
    private _adService: AnzeigeService,
    private _dataShare: DataSharingService
  ) {}

  ngOnInit() {
    if (!this.pageNum) this.pageNum = 1;
    this.listenForBundeslandChanges(this.pageNum);
    this.searchByName(this.pageNum);
    this._dataShare.currentBanner.subscribe((ban) => {
      this.activeBanner = ban;
    });
    this._dataShare.currentHorizBan.subscribe((ban) => {
      this.horizBanner = ban;
    });
    this._dataShare.currentResetPageState.subscribe((state) => {
      this.resetPageState = state;
      if (this.resetPageState) {
        this.firstPageClick();
        this.resetPageState = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.subForBundeslandSearch != null) {
      this.subForBundeslandSearch.unsubscribe();
    }
    if (this.subForNameSearch != null) {
      this.subForNameSearch.unsubscribe();
    }
  }

  getAllActiveAnzeigen(page): void {
    this.searchScenario = "allSearch";
    this._adService.getActiveAnzeigen(page).subscribe((res) => {
      this.listOfAnzeigen = res.results;
      this.selectedBundesland = "Installateure Österreichweit";
      this.checkForPages(res.previous, res.next);
    });
  }

  // search for match for every letter typed in header search input
  // else block will fire on init and when user deletes input
  searchByName(page): void {
    this.subForNameSearch = this._dataShare.currentNameTerm.subscribe(
      (name) => {
        this.searchTerm = name;
        if (this.searchTerm) {
          this.searchScenario = "nameSearch";
          this._adService
            .getActiveByName(this.searchTerm, page)
            .subscribe((res) => {
              this.selectedBundesland = "Suche: " + name;
              this.listOfAnzeigen = res.results;
              this.checkForPages(res.previous, res.next);
            });
        } else {
          this.getAdsByLocation();
        }
      }
    );
  }

  // search for bundesland if user clicks on the header
  listenForBundeslandChanges(page): void {
    this.subForBundeslandSearch = this._dataShare.currentState.subscribe(
      (name) => {
        this.searchTerm = name;
        if (this.searchTerm) {
          this.searchScenario = "bundeslandSearch";
          this.selectedBundesland = name;
          this._dataShare.setActiveBanner(this.selectedBundesland);
          this._adService
            .getActiveByBundesland(this.searchTerm, page)
            .subscribe((res) => {
              this.listOfAnzeigen = res.results;
              this.checkForPages(res.previous, res.next);
            });
        }
      }
    );
  }

  // show anzeigen according to user's location
  getAdsByLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // user accepted to share location
          this.usersConsent = true;
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          this._adService
            .getBundeslandByLocation(lat, lon)
            .subscribe((data) => {
              // this will be the users actual location by coordinates
              this.usersLocation = data.principalSubdivision;
              // mock data for testing purposes
              //this.usersLocation = "Tirol";

              this._adService
                .getActiveByBundesland(this.usersLocation, this.pageNum)
                .subscribe((res) => {
                  // check if the users location is inside of austria
                  this.bundesland.forEach((land) => {
                    if (land === this.usersLocation) {
                      this.insideAustria = true;
                      this._dataShare.setActiveBanner(this.usersLocation);
                    }
                  });
                  if (this.insideAustria) {
                    this.selectedBundesland = "In Ihrem Bundesland";
                    this.listOfAnzeigen = res.results;
                    this.checkForPages(res.previous, res.next);
                    this.searchScenario = "bundeslandSearch";
                  }
                  // if visiting outside of austria show all
                  else {
                    this.getAllActiveAnzeigen(this.pageNum);
                  }
                });
            });
        },
        () => {
          // user declined to share location
          this.usersConsent = false;
          this.getAllActiveAnzeigen(this.pageNum);
        }
      );
    }
    // if the user device doesn't support geolocation show all
    else {
      this.getAllActiveAnzeigen(this.pageNum);
    }
  }

  nextPageClick(): void {
    this.pageNum += 1;
    this.checkEnvAndGetData();
  }

  prevPageClick(): void {
    this.pageNum -= 1;
    this.checkEnvAndGetData();
  }

  firstPageClick(): void {
    this.pageNum = 1;
    this.checkEnvAndGetData();
  }

  // check if previous or next page exist
  checkForPages(prev, next): void {
    if (prev) this.prevPage = true;
    else this.prevPage = false;

    if (next) this.nextPage = true;
    else this.nextPage = false;
  }

  // check the context before doing the search for pagination
  checkEnvAndGetData(): void {
    if (this.searchScenario === "allSearch") {
      this.getAllActiveAnzeigen(this.pageNum);
    } else if (this.searchScenario === "nameSearch") {
      this.searchByName(this.pageNum);
    } else if (this.searchScenario === "bundeslandSearch") {
      this._adService
        .getActiveByBundesland(this.searchTerm, this.pageNum)
        .subscribe((res) => {
          this.listOfAnzeigen = res.results;
          this.checkForPages(res.previous, res.next);
        });
    }
  }
}

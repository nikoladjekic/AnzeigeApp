import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Anzeige } from "src/models/anzeige.model";
import { AnzeigeService } from "src/services/anzeige.service";
import { DataSharingService } from "src/services/data-sharing.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-middle-content",
  templateUrl: "./middle-content.component.html",
  styleUrls: ["./middle-content.component.css"]
})
export class MiddleContentComponent implements OnInit, OnDestroy {
  subForBundeslandSearch: Subscription;
  subForNameSearch: Subscription;

  selectedBundesland: string = "Standort Laden...";
  usersLocation: string;
  searchTerm: string;

  insideAustria: boolean;
  usersConsent: boolean;

  listOfAnzeigen: Anzeige[] = [];
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

  constructor(
    private _adService: AnzeigeService,
    private _dataShare: DataSharingService
  ) {}

  ngOnInit() {
    this.listenForBundeslandChanges();
    this.searchByName();
  }

  ngOnDestroy() {
    if (this.subForBundeslandSearch != null) {
      this.subForBundeslandSearch.unsubscribe();
    }
    if (this.subForNameSearch != null) {
      this.subForNameSearch.unsubscribe();
    }
  }

  getAllActiveAnzeigen() {
    this._adService.getActiveAnzeigen().subscribe(res => {
      this.listOfAnzeigen = res;
      this.selectedBundesland = "Installateure Österreichweit";
    });
  }

  // search for match for every letter typed in header search input
  // else block will fire on init and when user deletes input
  searchByName(): void {
    this.subForNameSearch = this._dataShare.currentNameTerm.subscribe(name => {
      this.searchTerm = name;
      let tempArr = [];
      let filter = [];
      if (this.searchTerm) {
        this._adService.getActiveAnzeigen().subscribe(res => {
          this.selectedBundesland = "Suche: " + name;
          filter = res;
          filter.forEach(match => {
            if (
              match.firma
                .toLowerCase()
                .indexOf(this.searchTerm.toLowerCase()) >= 0
            ) {
              tempArr.push(match);
            }
          });
          this.listOfAnzeigen = tempArr;
        });
      } else {
        this.getAdsByLocation();
      }
    });
  }

  // search for bundesland if user clicks on the header
  listenForBundeslandChanges(): void {
    this.subForBundeslandSearch = this._dataShare.currentState.subscribe(
      name => {
        this.searchTerm = name;
        let tempArr = [];
        let filterArr = [];
        if (this.searchTerm) {
          if (this.searchTerm === "all") {
            this.getAllActiveAnzeigen();
            this.searchTerm = "";
          } else {
            this.selectedBundesland = name;
            this._adService.getActiveAnzeigen().subscribe(res => {
              filterArr = res;
              filterArr.forEach(land => {
                if (
                  land.bundesland.toLowerCase() ===
                  this.searchTerm.toLowerCase()
                ) {
                  tempArr.push(land);
                }
              });
              this.listOfAnzeigen = tempArr;
            });
          }
        }
      }
    );
  }

  // show anzeigen according to user's location
  getAdsByLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // user accepted to share location
          this.usersConsent = true;
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          this._adService.getBundeslandByLocation(lat, lon).subscribe(data => {
            // this will be the users actual location by coordinates
            //this.usersLocation = data.principalSubdivision;
            // mock data for testing purposes
            this.usersLocation = "Tirol";

            this._adService.getActiveAnzeigen().subscribe(res => {
              let tempArr = [];
              let filterList = res;

              // check if the users location is inside of austria
              this.bundesland.forEach(land => {
                if (land === this.usersLocation) this.insideAustria = true;
              });

              if (this.insideAustria) {
                filterList.forEach(match => {
                  if (match.bundesland === this.usersLocation) {
                    tempArr.push(match);
                  }
                });
                this.selectedBundesland = "In Ihrem Bundesland";
                this.listOfAnzeigen = tempArr;
              }
              // if visiting outside of austria show all
              else {
                this.selectedBundesland = "Installateure Österreichweit";
                this.listOfAnzeigen = res;
              }
            });
          });
        },
        () => {
          // user declined to share location
          this.usersConsent = false;
          this.getAllActiveAnzeigen();
        }
      );
    }
    // if the user device doesn't support geolocation show all
    else {
      this.getAllActiveAnzeigen();
    }
  }
}

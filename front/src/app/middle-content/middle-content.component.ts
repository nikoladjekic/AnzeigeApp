import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AnzeigeService } from "src/services/anzeige.service";
import { DataSharingService } from "src/services/data-sharing.service";

@Component({
  selector: "app-middle-content",
  templateUrl: "./middle-content.component.html",
  styleUrls: ["./middle-content.component.css"]
})
export class MiddleContentComponent implements OnInit, OnDestroy {
  subForBundeslandSearch: Subscription;
  subForNameSearch: Subscription;
  selectedBundesland: string;
  usersLocation: string;
  searchTerm: string = "";
  listOfAnzeigen = [];

  constructor(
    private _adService: AnzeigeService,
    private _dataShare: DataSharingService
  ) {}

  ngOnInit() {
    // listening for changes if user clicks on bundesland in header
    this.listenForBundeslandChanges();
    // listening for changes if user types in search input in header
    // if nothing is typed, all active are fetched
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
    });
  }

  // search for match for every letter typed in header search input
  searchByName(): void {
    this.subForNameSearch = this._dataShare.currentNameTerm.subscribe(name => {
      let tempArr = [];
      let filter = [];
      this.searchTerm = name;
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
        let tempArr = [];
        let filterArr = [];
        this.searchTerm = name;
        if (this.searchTerm) {
          if (this.searchTerm === "all") {
            this.getAllActiveAnzeigen();
            this.selectedBundesland = "Installateure Österreichweit";
            this.searchTerm = "";
          } else {
            this.selectedBundesland = name;
            this._adService.getActiveAnzeigen().subscribe(res => {
              filterArr = res;
              filterArr.forEach(match => {
                if (
                  match.bundesland.toLowerCase() ===
                  this.searchTerm.toLowerCase()
                ) {
                  tempArr.push(match);
                }
              });
              this.listOfAnzeigen = tempArr;
            });
          }
        }
      }
    );
  }

  // if we have user location show Anzeigen for that bundesland
  getAdsByLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this._adService.getBundeslandByLocation(lat, lon).subscribe(data => {
          // this will be the users actual location by coordinates
          //this.usersLocation = data.principalSubdivision;
          // using mock data for now
          this.usersLocation = "Burgenland";

          // if we have geolocation inside of austria
          if (this.usersLocation) {
            let tempArr = [];
            let filterList = [];
            this._adService.getActiveAnzeigen().subscribe(res => {
              this.selectedBundesland = "In Ihrem Bundesland";
              filterList = res;
              filterList.forEach(match => {
                if (
                  match.bundesland.toLowerCase() ===
                  this.usersLocation.toLowerCase()
                ) {
                  tempArr.push(match);
                }
              });
              this.listOfAnzeigen = tempArr;
            });
          }
          // if we don't have location or visiting outside of austria
          else {
            this.getAllActiveAnzeigen();
          }
        });
      });
    }
  }
}

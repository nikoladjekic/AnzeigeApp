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
  selectedBundesland: string = "Installateure in ihrer nähe";
  searchTerm: string = "";
  listOfAnzeigen = [];

  constructor(
    private _adService: AnzeigeService,
    private _dataShare: DataSharingService
  ) {}

  ngOnInit() {
    // get all active to popuate the middle content
    this.getAllActiveAnzeigen();
    // listening for changes if user clicks on bundesland in header
    this.listenForBundeslandChanges();
    // listening for changes if user types in search input in header
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
      this.searchTerm = name;
      if (this.searchTerm) {
        this._adService.getActiveAnzeigen().subscribe(res => {
          this.listOfAnzeigen = res;
          this.listOfAnzeigen.forEach(match => {
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
        this.getAllActiveAnzeigen();
      }
    });
  }

  // search for bundesland if user click on the header
  listenForBundeslandChanges() {
    this.subForBundeslandSearch = this._dataShare.currentState.subscribe(
      name => {
        let tempArr = [];
        this.searchTerm = name;
        if (this.searchTerm) {
          if (this.searchTerm === "all") {
            this.getAllActiveAnzeigen();
            this.selectedBundesland = "Installateure in ihrer nähe";
          } else {
            this.selectedBundesland = name;
            this._adService.getActiveAnzeigen().subscribe(res => {
              this.listOfAnzeigen = res;
              this.listOfAnzeigen.forEach(match => {
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
}

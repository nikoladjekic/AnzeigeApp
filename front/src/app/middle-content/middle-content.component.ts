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
  subscription: Subscription;
  listOfAnzeigen = [];
  currentBundesland = "";

  constructor(
    private _adService: AnzeigeService,
    private _dataShare: DataSharingService
  ) {}

  ngOnInit() {
    // get all active to popuate the middle content
    this.getAllActiveAnzeigen();
    // subscribe to sharing service for constant listening for changes
    this.listenForBundeslandChanges();
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  getAllActiveAnzeigen() {
    this._adService.getActiveAnzeigen().subscribe(res => {
      this.listOfAnzeigen = res;
    });
  }

  // listen for changes from the click on the header
  listenForBundeslandChanges() {
    this.subscription = this._dataShare.currentState.subscribe(stateName => {
      let tempArr = [];
      this.currentBundesland = stateName;
      if (this.currentBundesland) {
        if (this.currentBundesland === "all") {
          this.getAllActiveAnzeigen();
        } else {
          this._adService.getActiveAnzeigen().subscribe(res => {
            this.listOfAnzeigen = res;
            this.listOfAnzeigen.forEach(stateObj => {
              if (
                stateObj.bundesland.toLowerCase() ===
                this.currentBundesland.toLowerCase()
              ) {
                tempArr.push(stateObj);
              }
            });
            this.listOfAnzeigen = tempArr;
          });
        }
      }
    });
  }
}

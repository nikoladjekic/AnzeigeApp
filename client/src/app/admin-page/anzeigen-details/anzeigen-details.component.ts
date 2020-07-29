import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Anzeige } from "src/models/anzeige.model";
import { AnzeigeService } from "src/services/anzeige.service";

@Component({
  selector: "app-anzeigen-details",
  templateUrl: "./anzeigen-details.component.html",
  styleUrls: ["./anzeigen-details.component.css"],
})
export class AnzeigenDetailsComponent implements OnInit, OnDestroy {
  routeId: string;
  adDetails: Anzeige;
  servicesArr: Array<string> = [];
  mainPage: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _anzeige: AnzeigeService
  ) {}

  ngOnInit() {
    this.getIdFromRoute();
    if (this.routeId)
      this._anzeige.getById(this.routeId).subscribe((res) => {
        this.adDetails = res;
        this.servicesArr = this.adDetails.services.split(",");
      });
  }

  ngOnDestroy() {
    this.routeId = "";
  }

  getIdFromRoute() {
    this._activatedRoute.params.subscribe((id) => {
      this.routeId = id.id;
      if (window.location.href.indexOf("/admin/") === -1) this.mainPage = true;
    });
  }

  goBack() {
    window.history.back();
  }
}

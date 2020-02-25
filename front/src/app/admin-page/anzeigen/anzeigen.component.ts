import { Component, OnInit } from "@angular/core";

import { AnzeigeService } from "src/services/anzeige.service";

@Component({
  selector: "app-anzeigen",
  templateUrl: "./anzeigen.component.html",
  styleUrls: ["./anzeigen.component.css"]
})
export class AnzeigenComponent implements OnInit {
  listOfAnzeigen = [];

  constructor(private _ad: AnzeigeService) {}

  ngOnInit() {
    this._ad.getAllAnzeigen().subscribe(res => {
      this.listOfAnzeigen = res;
    });
  }
}

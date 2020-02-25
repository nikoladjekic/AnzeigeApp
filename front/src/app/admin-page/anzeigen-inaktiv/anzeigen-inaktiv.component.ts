import { Component, OnInit } from "@angular/core";

import { AnzeigeService } from "src/services/anzeige.service";

@Component({
  selector: "app-anzeigen-inaktiv",
  templateUrl: "./anzeigen-inaktiv.component.html",
  styleUrls: ["./anzeigen-inaktiv.component.css"]
})
export class AnzeigenInaktivComponent implements OnInit {
  inaktiveAnzeigen = [];

  constructor(private _ad: AnzeigeService) {}

  ngOnInit() {
    this._ad.getAllAnzeigen().subscribe(res => {
      this.inaktiveAnzeigen = res;
    });
  }
}

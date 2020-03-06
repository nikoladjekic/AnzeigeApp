import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { AnzeigeService } from "src/services/anzeige.service";

@Component({
  selector: "app-anzeigen",
  templateUrl: "./anzeigen.component.html",
  styleUrls: ["./anzeigen.component.css"]
})
export class AnzeigenComponent implements OnInit {
  listOfAnzeigen = [];

  constructor(private _ad: AnzeigeService, private _router: Router) { }

  ngOnInit() {
    this._ad.getAllAnzeigen().subscribe(res => this.listOfAnzeigen = res);
  }

  seeDetails(val) {
    this._router.navigate(['/', { id: val }]);
  }
}

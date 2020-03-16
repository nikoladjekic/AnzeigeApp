import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { AnzeigeService } from "src/services/anzeige.service";

@Component({
  selector: "app-anzeigen",
  templateUrl: "./anzeigen.component.html",
  styleUrls: ["./anzeigen.component.css"]
})
export class AnzeigenComponent implements OnInit {
  aktiveAnzeigen = [];

  constructor(private _ad: AnzeigeService, private _router: Router) { }

  ngOnInit() {
    this.getActiveAds()
  }

  getActiveAds(){
    this._ad.getAllAnzeigen().subscribe(res => {
      res.forEach(val => {
        let today: Date = new Date();
        let expDate: Date = new Date(val.endDate);        
        if (expDate > today){
          console.log(val);
          this.aktiveAnzeigen.push(val);
        } 
      })
    })
  }

  seeDetails(val) {
    this._router.navigate(['/', { id: val }]);
  }
}

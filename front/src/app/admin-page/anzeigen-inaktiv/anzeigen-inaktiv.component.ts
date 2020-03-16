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
    this.getInactiveAds();
  }

  getInactiveAds(){
    this._ad.getAllAnzeigen().subscribe(res => {
      res.forEach(val => {
        let today: Date = new Date();
        let expDate: Date = new Date(val.endDate);        
        if (expDate < today){
          console.log(val);
          this.inaktiveAnzeigen.push(val);
        } 
      })
    })
  }
}

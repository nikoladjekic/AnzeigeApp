import { Component, OnInit } from "@angular/core";

import { AnzeigeService } from "src/services/anzeige.service";
import { Bundesland } from 'src/models/bundesland.enum';

@Component({
  selector: "app-anzeigen-inaktiv",
  templateUrl: "./anzeigen-inaktiv.component.html",
  styleUrls: ["./anzeigen-inaktiv.component.css"]
})
export class AnzeigenInaktivComponent implements OnInit {

  inaktiveAnzeigen = [];
  filterValues = this.inaktiveAnzeigen;
  selectedBundesland: Bundesland;
  searchTerm: string;

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

  sortByBundesland(){
    this.inaktiveAnzeigen = this.filterValues.filter(el => {
      return el.bundesland.toUpperCase().indexOf(this.selectedBundesland.toUpperCase()) >= 0;
    })  
  }

  searchByName(): void {
    this.inaktiveAnzeigen = this.filterValues.filter(el => {
      return el.firma.toUpperCase().indexOf(this.searchTerm.toUpperCase()) >= 0;
    })  
  }

}

import { Component, OnInit, SimpleChanges } from "@angular/core";
import { Router } from '@angular/router';

import { AnzeigeService } from "src/services/anzeige.service";
import { Bundesland } from 'src/models/bundesland.enum';

@Component({
  selector: "app-anzeigen",
  templateUrl: "./anzeigen.component.html",
  styleUrls: ["./anzeigen.component.css"]
})
export class AnzeigenComponent implements OnInit {

  aktiveAnzeigen = [];
  filterValues = this.aktiveAnzeigen;
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

  constructor(private _ad: AnzeigeService, private _router: Router) { }

  ngOnInit() {
    this.getActiveAds();
    console.log(this.aktiveAnzeigen);
  }  

  getActiveAds(){
    this._ad.getAllAnzeigen().subscribe(res => {
      res.forEach(anzeige => this.checkForDateExpiration(anzeige));
    })
  }

  sortByBundesland(){
    this._ad.getAllAnzeigen().subscribe(res => res.forEach(anzeige => {
      if (anzeige.bundesland === this.selectedBundesland){
        this.aktiveAnzeigen = [];
        this.checkForDateExpiration(anzeige);
      }             
    }))
  }
  
  checkForDateExpiration(val){
    let today: Date = new Date();
    let expDate: Date = new Date(val.endDate);
    // 30*24*60*60*1000 = days*hour*min*sec*milisec
    let threshold: Date = new Date(expDate.getTime()-(30*24*60*60*1000));
    if (expDate > today){
      this.aktiveAnzeigen.push(val);
      // check if the ad is about to expire
      if (today > threshold){
        val.photoUrl = 'https://previews.123rf.com/images/mykub/mykub1902/mykub190200461/117044296-warning-attention-sign-danger-sign-design-caution-error-icon.jpg';
        val.services = '';
      }
    }
  }

  searchByName(): void {
    this.aktiveAnzeigen = this.filterValues.filter(el => {
      return el.firma.toUpperCase().indexOf(this.searchTerm.toUpperCase()) >= 0;
    })  
  }
  

  seeDetails(val) {
    this._router.navigate(['/', { id: val }]);
  }
}

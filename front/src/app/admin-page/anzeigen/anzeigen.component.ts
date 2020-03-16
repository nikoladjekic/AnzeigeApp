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
      })
    })
  }

  seeDetails(val) {
    this._router.navigate(['/', { id: val }]);
  }
}

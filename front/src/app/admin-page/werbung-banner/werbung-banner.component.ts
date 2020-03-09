import { Component, OnInit } from '@angular/core';

import { Bundesland } from 'src/models/bundesland.enum';
import { Banner } from 'src/models/banner.model';
import { BannerService } from 'src/services/banner.service';

@Component({
  selector: 'app-werbung-banner',
  templateUrl: './werbung-banner.component.html',
  styleUrls: ['./werbung-banner.component.css']
})
export class WerbungBannerComponent implements OnInit {

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

  constructor(private _bannerService: BannerService) { }

  ngOnInit() {
  }

  onSubmit(val){
    let newBanner = new Banner(
      val.name,
      val.bundesland,
      val.bannerLeft,
      val.bannerRight,
      val.bannerHorizontal,
      val.landingPageUrl,
      val.startDate,
      val.endDate
    );
    this._bannerService.postNewBanner(newBanner).subscribe(
      (response: any) => {
        console.log(response)
      }, 
      (error: any) => {
        console.log(error)
      }
    );
  }

}

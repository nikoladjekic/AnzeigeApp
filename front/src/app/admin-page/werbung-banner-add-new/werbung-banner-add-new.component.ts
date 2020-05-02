import { Component, OnInit } from "@angular/core";

import { Banner } from "src/models/banner.model";
import { BannerService } from "src/services/banner.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-werbung-banner-add-new",
  templateUrl: "./werbung-banner-add-new.component.html",
  styleUrls: ["./werbung-banner-add-new.component.css"],
})
export class WerbungBannerAddNewComponent implements OnInit {
  bundesland: Bundesland[] = [
    Bundesland.V,
    Bundesland.T,
    Bundesland.S,
    Bundesland.OÖ,
    Bundesland.NÖ,
    Bundesland.W,
    Bundesland.K,
    Bundesland.B,
    Bundesland.ST,
  ];

  constructor(private _banner: BannerService) {}

  ngOnInit() {}

  onSubmit(val) {
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
    this._banner.postNew(newBanner).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

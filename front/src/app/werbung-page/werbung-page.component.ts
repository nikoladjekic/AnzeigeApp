import { Component, OnInit } from "@angular/core";

import { BannerService } from "src/services/banner.service";
import { Banner } from "src/models/banner.model";

@Component({
  selector: "app-werbung-page",
  templateUrl: "./werbung-page.component.html",
  styleUrls: ["./werbung-page.component.css"]
})
export class WerbungPageComponent implements OnInit {
  banner: Banner;

  constructor(private _bannerService: BannerService) {}

  ngOnInit() {
    // for now, we only get one banner from the list
    // implement automatic banner based on bundesland
    this._bannerService.getAllBanner().subscribe(res => (this.banner = res[1]));
  }
}

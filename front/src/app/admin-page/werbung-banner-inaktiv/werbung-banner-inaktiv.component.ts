import { Component, OnInit } from "@angular/core";

import { Banner } from "src/models/banner.model";
import { BannerService } from "src/services/banner.service";

@Component({
  selector: "app-werbung-banner-inaktiv",
  templateUrl: "./werbung-banner-inaktiv.component.html",
  styleUrls: ["./werbung-banner-inaktiv.component.css"],
})
export class WerbungBannerInaktivComponent implements OnInit {
  inactiveBanners: Banner[] = [];
  filterValues = this.inactiveBanners;
  searchBannerName: string;

  constructor(private _banner: BannerService) {}

  ngOnInit() {
    this.getInactiveBanners();
  }

  getInactiveBanners() {
    this._banner.getAll().subscribe((res) => {
      res.forEach((banner) => this.checkForDateExpiration(banner));
    });
  }

  searchByName(): void {
    this.inactiveBanners = this.filterValues.filter((el) => {
      return (
        el.name.toUpperCase().indexOf(this.searchBannerName.toUpperCase()) >= 0
      );
    });
  }

  checkForDateExpiration(val): void {
    let today: Date = new Date();
    let expDate: Date = new Date(val.endDate);
    //check if banner date is expired
    if (expDate < today) {
      this.inactiveBanners.push(val);
      val.bannerHorizontal = "";
    }
  }
}

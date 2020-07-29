import { Component, OnInit } from "@angular/core";

import { Banner } from "src/models/banner.model";
import { BannerService } from "src/services/banner.service";

@Component({
  selector: "app-werbung-banner",
  templateUrl: "./werbung-banner.component.html",
  styleUrls: ["./werbung-banner.component.css"],
})
export class WerbungBannerComponent implements OnInit {
  allBanners: Banner[] = [];
  filterValues = this.allBanners;
  searchBannerName: string;

  constructor(private _banner: BannerService) {}

  ngOnInit() {
    this.getAllActiveBanner();
  }

  getAllActiveBanner() {
    this._banner.getAll().subscribe((res) => {
      res.forEach((banner) => this.checkForDateExpiration(banner));
    });
  }

  searchByName(): void {
    this.allBanners = this.filterValues.filter((el) => {
      return (
        el.name.toUpperCase().indexOf(this.searchBannerName.toUpperCase()) >= 0
      );
    });
  }

  checkForDateExpiration(val): void {
    let today: Date = new Date();
    let expDate: Date = new Date(val.endDate);

    // check if banner is active
    // if (expDate > today){
    //   this.allBanners.push(val);
    //   val.bannerHorizontal = "";
    // }

    // for now just get all values, later uncomment above example
    if (expDate) {
      this.allBanners.push(val);
      val.bannerHorizontal = "";
    }
  }
}

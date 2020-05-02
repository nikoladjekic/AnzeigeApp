import { Component, OnInit } from "@angular/core";

import { Banner } from "src/models/banner.model";
import { BannerService } from "src/services/banner.service";
import { DataSharingService } from "src/services/data-sharing.service";

@Component({
  selector: "app-werbung-page",
  templateUrl: "./werbung-page.component.html",
  styleUrls: ["./werbung-page.component.css"],
})
export class WerbungPageComponent implements OnInit {
  allActiveBanners: Banner[];
  activeBanner: string;
  banner: Banner;

  constructor(
    private _banner: BannerService,
    private _dataShare: DataSharingService
  ) {}

  ngOnInit() {
    this.updateActiveBanner();
  }

  updateActiveBanner() {
    this._dataShare.currentBanner.subscribe((ban) => {
      this.activeBanner = ban;
      this._banner.getAll().subscribe((res) => {
        this.allActiveBanners = res;
        // change banner according to selected bundesland
        if (this.activeBanner) {
          this.allActiveBanners.forEach((ban) => {
            if (ban.bundesland === this.activeBanner) {
              this.banner = ban;
              this._dataShare.setHorizontalBanner(this.banner.bannerHorizontal);
            }
          });
        }
        // set default banner
        else {
          this.banner = this.allActiveBanners[8];
          this._dataShare.setHorizontalBanner(this.banner.bannerHorizontal);
        }
      });
    });
  }
}

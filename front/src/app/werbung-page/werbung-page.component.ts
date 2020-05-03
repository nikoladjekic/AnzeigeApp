import { Component, OnInit } from "@angular/core";

import { Banner } from "src/models/banner.model";
import { LogVisit } from "src/models/log-visit.model";

import { BannerService } from "src/services/banner.service";
import { LogService } from "src/services/log.service";
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
    private _dataShare: DataSharingService,
    private _log: LogService
  ) {}

  ngOnInit() {
    this.updateActiveBanner();
    this.logVisitData();
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

  // record every visit to our website
  logVisitData() {
    this._log.checkVisitorDetails().subscribe((data) => {
      let visitData: LogVisit = {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        date: new Date(),
      };
      this._log.addNewVisit(visitData).subscribe();
    });
  }
}

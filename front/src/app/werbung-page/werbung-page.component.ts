import { Component, OnInit } from '@angular/core';

import { BannerService } from 'src/services/banner.service';
import { Banner } from 'src/models/banner.model';

@Component({
  selector: 'app-werbung-page',
  templateUrl: './werbung-page.component.html',
  styleUrls: ['./werbung-page.component.css']
})
export class WerbungPageComponent implements OnInit {

  bannerObject: Banner;

  constructor(private _bannerService: BannerService) { }

  ngOnInit() {
    this._bannerService.getAllBanner().subscribe(res => this.bannerObject = res);
    console.log(this.bannerObject);
  }

}

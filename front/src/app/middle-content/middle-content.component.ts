import { Component, OnInit } from '@angular/core';

import { AnzeigeService } from 'src/services/anzeige.service';

@Component({
  selector: 'app-middle-content',
  templateUrl: './middle-content.component.html',
  styleUrls: ['./middle-content.component.css']
})
export class MiddleContentComponent implements OnInit {
  listOfAnzeigen = [];

  constructor(private _ad: AnzeigeService) { }

  ngOnInit() {
    this._ad.getAllAnzeigen().subscribe(res => {
      this.listOfAnzeigen = res;
    });
  }

}

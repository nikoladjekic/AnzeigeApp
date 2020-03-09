import { Component, OnInit } from '@angular/core';

import { Bundesland } from 'src/models/bundesland.enum';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  bundesland: Bundesland[] = [
    Bundesland.Vorarlberg,
    Bundesland.Tirol,
    Bundesland.Salzburg,
    Bundesland.Oberösterreich,
    Bundesland.Niederösterreich,
    Bundesland.Wien,
    Bundesland.Kärnten,
    Bundesland.Burgenland,
    Bundesland.Steiermark,
  ];

  constructor() { }

  ngOnInit() {
  }

}

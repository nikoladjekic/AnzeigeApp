import { Component, OnInit } from '@angular/core';

import { Bundesland } from 'src/models/bundesland.enum';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  selectedBundesland: Bundesland;

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

  constructor() { }

  ngOnInit() {
  }

  setBundesland(val){    
    this.selectedBundesland = val;
    // todo: set the selected bundesland for data sharing service
    console.log(this.selectedBundesland)
  }

}

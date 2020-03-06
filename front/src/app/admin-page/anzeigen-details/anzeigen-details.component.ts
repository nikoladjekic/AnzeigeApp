import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Anzeige } from 'src/models/anzeige.model';
import { AnzeigeService } from 'src/services/anzeige.service';


@Component({
  selector: 'app-anzeigen-details',
  templateUrl: './anzeigen-details.component.html',
  styleUrls: ['./anzeigen-details.component.css']
})
export class AnzeigenDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private _anzeigeService: AnzeigeService) { }

  ngOnInit() {
    this.getIdFromRoute();
  }

  getIdFromRoute(){
    this.activatedRoute.params.subscribe(id => {
      let pp = id.id;
      console.log("id", id);
      console.log("pp - ", pp);

      // TODO: finf out why this is not working below
      this._anzeigeService.getAnzeigeById(pp).subscribe(res => {
        console.log("rress", res);
      });
    });

  }

}

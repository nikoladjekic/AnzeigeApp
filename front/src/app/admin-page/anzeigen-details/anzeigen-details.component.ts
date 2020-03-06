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
    this.getAdById();
  }

  getAdById(){
    let id: string;
    this.activatedRoute.params.subscribe(params => {
        id=params.id;
        this._anzeigeService.getAnzeigeById(id).subscribe(res => {
          console.log(res);
        });
        
    });
  }

}

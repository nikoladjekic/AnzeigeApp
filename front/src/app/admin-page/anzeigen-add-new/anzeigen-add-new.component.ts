import { Component, OnInit } from '@angular/core';

import { Anzeige } from 'src/models/anzeige.model';
import { AnzeigeService } from 'src/services/anzeige.service';

@Component({
  selector: 'app-anzeigen-add-new',
  templateUrl: './anzeigen-add-new.component.html',
  styleUrls: ['./anzeigen-add-new.component.css']
})
export class AnzeigenAddNewComponent implements OnInit {

  bundesland: string[] = [
    "Vorarlberg", "Tirol", "Salzburg", "Kärnten", "Oberösterreich", "Niederösterreich", "Steiermark", "Wien", "Burgenland"
  ]

  constructor(private _anzeigeService: AnzeigeService) { }

  ngOnInit() {
  }

  onSubmit(val){
    let newAnzeige = new Anzeige(
      val.firma,
      val.address,
      val.bundesland,
      val.services,
      val.email,
      val.website,
      val.phone,
      val.photoUrl,
      val.startDate,
      val.endDate
    );
    this._anzeigeService.postNewAnzeige(newAnzeige).subscribe();
  }

}

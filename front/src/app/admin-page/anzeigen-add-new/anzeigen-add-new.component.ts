import { Component, OnInit } from '@angular/core';

import { Anzeige } from 'src/models/anzeige.model';
import { AnzeigeService } from 'src/services/anzeige.service';
import { Bundesland } from 'src/models/bundesland.enum';


@Component({
  selector: 'app-anzeigen-add-new',
  templateUrl: './anzeigen-add-new.component.html',
  styleUrls: ['./anzeigen-add-new.component.css']
})
export class AnzeigenAddNewComponent implements OnInit {

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

  constructor(private _anzeigeService: AnzeigeService) { }

  ngOnInit() {
    console.log(this.bundesland);
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
    this._anzeigeService.postNewAnzeige(newAnzeige).subscribe(
      (response: any) => {
        console.log(response)
      }, 
      (error: any) => {
        console.log(error)
      }
    );
  }

}

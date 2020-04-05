import { Component, OnInit } from "@angular/core";

import { Anzeige, Workinghours } from "src/models/anzeige.model";
import { AnzeigeService } from "src/services/anzeige.service";
import { Bundesland } from "src/models/bundesland.enum";

@Component({
  selector: "app-anzeigen-add-new",
  templateUrl: "./anzeigen-add-new.component.html",
  styleUrls: ["./anzeigen-add-new.component.css"],
})
export class AnzeigenAddNewComponent implements OnInit {
  bundesland: Bundesland[] = [
    Bundesland.V,
    Bundesland.T,
    Bundesland.S,
    Bundesland.OÖ,
    Bundesland.NÖ,
    Bundesland.W,
    Bundesland.K,
    Bundesland.B,
    Bundesland.ST,
  ];

  constructor(private _anzeigeService: AnzeigeService) {}

  ngOnInit() {}

  onSubmit(val) {
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
      val.endDate,
      val.googleMapsUrl,
      val.aboutUs,
      val.subtitle,
      new Workinghours(
        val.monday,
        val.tuesday,
        val.wednesday,
        val.thursday,
        val.friday,
        val.saturday,
        val.sunday
      )
    );
    this._anzeigeService.postNewAnzeige(newAnzeige).subscribe(
      (response: any) => {
        console.info("New Anzeige submitted.", response);
      },
      (error: any) => {
        console.error("An error occured during Anzeige submition", error);
      }
    );
  }
}

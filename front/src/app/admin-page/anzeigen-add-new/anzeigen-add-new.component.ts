import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anzeigen-add-new',
  templateUrl: './anzeigen-add-new.component.html',
  styleUrls: ['./anzeigen-add-new.component.css']
})
export class AnzeigenAddNewComponent implements OnInit {

  bundesland: string[] = [
    "Vorarlberg", "Tirol", "Salzburg", "Kärnten", "Oberösterreich", "Niederösterreich", "Steiermark", "Wien", "Burgenland"
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("on submit iufah");
  }

}

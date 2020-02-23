import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-benutzer",
  templateUrl: "./benutzer.component.html",
  styleUrls: ["./benutzer.component.css"]
})
export class BenutzerComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  ngOnInit() {}
}

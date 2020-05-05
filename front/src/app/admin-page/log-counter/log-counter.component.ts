import { Component, OnInit } from "@angular/core";

import { LogService } from "src/services/log.service";
import { LogVisit } from "src/models/log-visit.model";

@Component({
  selector: "app-log-counter",
  templateUrl: "./log-counter.component.html",
  styleUrls: ["./log-counter.component.css"],
})
export class LogCounterComponent implements OnInit {
  listOfLogs: Array<LogVisit> = [];

  constructor(private _log: LogService) {}

  ngOnInit() {
    this._log.getAll(1).subscribe((logs) => {
      this.listOfLogs = logs.results;
      console.log(this.listOfLogs);
    });
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataSharingService {
  private loggedUser = new BehaviorSubject<string>("");
  private selectedState = new BehaviorSubject<string>("");

  currentUser = this.loggedUser.asObservable();
  currentState = this.selectedState.asObservable();

  constructor() {}

  setLoggedUser(user: string) {
    this.loggedUser.next(user);
  }

  setSelectedState(state: string) {
    this.selectedState.next(state);
  }
}

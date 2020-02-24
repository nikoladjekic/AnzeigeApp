import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataSharingService {
  private loggedUser = new BehaviorSubject<string>("");
  currentUser = this.loggedUser.asObservable();

  constructor() {}

  setLoggedUser(user: string) {
    this.loggedUser.next(user);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataSharingService {
  private loggedUser = new BehaviorSubject<string>("");
  private selectedState = new BehaviorSubject<string>("");
  private nameSearchTerm = new BehaviorSubject<string>("");
  private activeBanner = new BehaviorSubject<string>("");
  private horizontalBan = new BehaviorSubject<string>("");

  currentUser = this.loggedUser.asObservable();
  currentState = this.selectedState.asObservable();
  currentNameTerm = this.nameSearchTerm.asObservable();
  currentBanner = this.activeBanner.asObservable();
  currentHorizBan = this.horizontalBan.asObservable();

  constructor() {}

  setLoggedUser(user: string) {
    this.loggedUser.next(user);
  }

  setSelectedState(state: string) {
    this.selectedState.next(state);
  }

  setNameSearchTerm(name: string) {
    this.nameSearchTerm.next(name);
  }

  setActiveBanner(banner: string) {
    this.activeBanner.next(banner);
  }

  setHorizontalBanner(ban: string) {
    this.horizontalBan.next(ban);
  }
}

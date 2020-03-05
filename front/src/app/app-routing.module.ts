import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "src/guards/auth.guard";

import { WerbungPageComponent } from "./werbung-page/werbung-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { BenutzerComponent } from "./admin-page/benutzer/benutzer.component";
import { AnzeigenComponent } from "./admin-page/anzeigen/anzeigen.component";
import { AnzeigenInaktivComponent } from "./admin-page/anzeigen-inaktiv/anzeigen-inaktiv.component";
import { AnzeigenAddNewComponent } from './admin-page/anzeigen-add-new/anzeigen-add-new.component';
import { AnzeigenDetailsComponent } from './admin-page/anzeigen-details/anzeigen-details.component';
import { MiddleContentComponent } from './middle-content/middle-content.component';
import { WerbungBannerComponent } from './admin-page/werbung-banner/werbung-banner.component';
import { LogCounterComponent } from './admin-page/log-counter/log-counter.component';

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  {
    path: "",
    component: WerbungPageComponent,
    children: [
      { path: "", component: MiddleContentComponent },
      { path: "details/:id", component: AnzeigenDetailsComponent }
    ]
  },
  {
    path: "admin",
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "benutzer", component: BenutzerComponent },
      { path: "anzeigen", component: AnzeigenComponent },
      { path: "anzeigen/inaktiv", component: AnzeigenInaktivComponent },
      { path: "anzeigen/neue", component: AnzeigenAddNewComponent },
      { path: "anzeigen/:id", component: AnzeigenDetailsComponent},
      { path: "anzeigen/inaktiv/:id", component: AnzeigenDetailsComponent},
      { path: "banner", component: WerbungBannerComponent },
      { path: "logs", component: LogCounterComponent }
    ]
  },
  // wild card route, goes at the end of all routes
  { path: "**", redirectTo: "", component: WerbungPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

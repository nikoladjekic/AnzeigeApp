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

const routes: Routes = [
  { path: "", component: WerbungPageComponent },
  { path: "login", component: LoginPageComponent },
  {
    path: "admin",
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "benutzer", component: BenutzerComponent },
      { path: "anzeigen", component: AnzeigenComponent },
      { path: "anzeigen/inaktiv", component: AnzeigenInaktivComponent },
      { path: "anzeigen/neue", component: AnzeigenAddNewComponent },
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

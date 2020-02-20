import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WerbungPageComponent } from "./werbung-page/werbung-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthGuard } from "src/guards/auth.guard";

const routes: Routes = [
  { path: "", component: WerbungPageComponent },
  { path: "admin", component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

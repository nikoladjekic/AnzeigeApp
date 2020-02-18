import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WerbungPageComponent } from "./werbung-page/werbung-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";

const routes: Routes = [
  { path: "", component: WerbungPageComponent },
  { path: "admin", component: AdminPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

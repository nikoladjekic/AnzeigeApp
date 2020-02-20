import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AuthService } from "src/services/auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { TokenInterceptorService } from "src/services/token-interceptor.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeadingComponent } from "./heading/heading.component";
import { LeftBannerComponent } from "./left-banner/left-banner.component";
import { RightBannerComponent } from "./right-banner/right-banner.component";
import { MiddleContentComponent } from "./middle-content/middle-content.component";
import { WerbungPageComponent } from "./werbung-page/werbung-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    LeftBannerComponent,
    RightBannerComponent,
    MiddleContentComponent,
    WerbungPageComponent,
    AdminPageComponent,
    LoginPageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

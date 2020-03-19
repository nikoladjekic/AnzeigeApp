import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AuthService } from "src/services/auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { TokenInterceptorService } from "src/services/token-interceptor.service";
import { AnzeigeService } from "src/services/anzeige.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeadingComponent } from "./heading/heading.component";
import { MiddleContentComponent } from "./middle-content/middle-content.component";
import { WerbungPageComponent } from "./werbung-page/werbung-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { BenutzerComponent } from "./admin-page/benutzer/benutzer.component";
import { AnzeigenComponent } from "./admin-page/anzeigen/anzeigen.component";
import { AnzeigenDetailsComponent } from "./admin-page/anzeigen-details/anzeigen-details.component";
import { AnzeigenInaktivComponent } from "./admin-page/anzeigen-inaktiv/anzeigen-inaktiv.component";
import { AnzeigenAddNewComponent } from './admin-page/anzeigen-add-new/anzeigen-add-new.component';
import { WerbungBannerComponent } from './admin-page/werbung-banner/werbung-banner.component';
import { LogCounterComponent } from './admin-page/log-counter/log-counter.component';
import { FooterComponent } from './footer/footer.component';
import { WerbungBannerAddNewComponent } from './admin-page/werbung-banner-add-new/werbung-banner-add-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    MiddleContentComponent,
    WerbungPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    BenutzerComponent,
    AnzeigenComponent,
    AnzeigenDetailsComponent,
    AnzeigenInaktivComponent,
    AnzeigenAddNewComponent,
    WerbungBannerComponent,
    LogCounterComponent,
    FooterComponent,
    WerbungBannerAddNewComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    AuthService,
    AnzeigeService,
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadingComponent } from './heading/heading.component';
import { LeftBannerComponent } from './left-banner/left-banner.component';
import { RightBannerComponent } from './right-banner/right-banner.component';
import { MiddleContentComponent } from './middle-content/middle-content.component';
import { WerbungPageComponent } from './werbung-page/werbung-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

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
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

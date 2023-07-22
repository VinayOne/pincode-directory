import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModulesModule } from './modules/shared-modules/shared-modules.module';
import { SearchResultComponent } from './dashboard/search-result/search-result.component';
import { GoogleTagManagerService } from "angular-google-tag-manager";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModulesModule
  ],
  providers: [
    GoogleTagManagerService,
    { provide: "googleTagManagerId", useValue: "GTM-WRZK7LR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

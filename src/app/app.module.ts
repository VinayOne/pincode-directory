import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModulesModule } from './modules/shared-modules/shared-modules.module';
import { SearchResultComponent } from './dashboard/search-result/search-result.component';
import { SearchComponent } from './dashboard/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

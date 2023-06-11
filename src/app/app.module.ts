import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModulesModule } from './modules/shared-modules/shared-modules.module';
import { SearchResultComponent } from './dashboard/search-result/search-result.component';
import { SearchComponent } from './dashboard/search/search.component';
import { FaqComponent } from './dashboard/faq/faq.component';
import { ArticleComponent } from './dashboard/article/article.component';
import { StatesComponent } from './dashboard/states/states.component';
import { VideoComponent } from './dashboard/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultComponent,
    SearchComponent,
    FaqComponent,
    ArticleComponent,
    StatesComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModulesModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { FaqComponent } from 'src/app/dashboard/faq/faq.component';
import { VideoComponent } from 'src/app/dashboard/video/video.component';
import { StatesComponent } from 'src/app/dashboard/states/states.component';
import { SearchComponent } from 'src/app/dashboard/search/search.component';
import { ContactComponent } from 'src/app/dashboard/contact/contact.component';
import { MaterialModuleModule } from '../material-module/material-module.module';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Meta, Title } from '@angular/platform-browser';
import { ChandrayaanComponent } from 'src/app/dashboard/chandrayaan/chandrayaan.component';
import { FilterResultPipe } from 'src/app/pipes/filter-result.pipe';
import { FrequentSearchComponent } from 'src/app/dashboard/frequent-search/frequent-search.component';
import { CurrentLocationComponent } from 'src/app/dashboard/current-location/current-location.component';
import { PincodeStateCombinationComponent } from 'src/app/dashboard/pincode-state-combination/pincode-state-combination.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FaqComponent,
    VideoComponent,
    StatesComponent,
    SearchComponent,
    ContactComponent,
    ChandrayaanComponent,
    FilterResultPipe,
    FrequentSearchComponent,
    CurrentLocationComponent,
    PincodeStateCombinationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule,
  ], 
  exports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    FaqComponent,
    VideoComponent,
    StatesComponent,
    SearchComponent,
    ContactComponent,
    ChandrayaanComponent,
    FilterResultPipe,
    FrequentSearchComponent,
    CurrentLocationComponent,
    PincodeStateCombinationComponent
  ],
  providers: [
    CommonServiceService,
    LocalstorageService,
    Title,
    Meta
  ]
})
export class SharedModulesModule { }

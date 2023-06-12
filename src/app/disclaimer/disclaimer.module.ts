import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { DisclaimerRoutingModule } from './disclaimer-routing.module';
import { SharedModulesModule } from '../modules/shared-modules/shared-modules.module';



@NgModule({
  declarations: [
    DisclaimerComponent
  ],
  imports: [
    CommonModule,
    DisclaimerRoutingModule,
    SharedModulesModule
  ],
  exports: [
    DisclaimerComponent
  ]
})
export class DisclaimerModule { }

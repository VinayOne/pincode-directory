import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { SharedModulesModule } from '../modules/shared-modules/shared-modules.module';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';



@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    SharedModulesModule,
    PrivacyPolicyRoutingModule
  ],
  exports: [
    PrivacyPolicyComponent
  ]
})
export class PrivacyPolicyModule { }

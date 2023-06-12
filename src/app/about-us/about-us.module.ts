import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { SharedModulesModule } from '../modules/shared-modules/shared-modules.module';

@NgModule({
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModulesModule
  ],
  exports: [
    AboutUsComponent
  ],
  declarations: [
    AboutUsComponent
  ],
})
export class AboutUsModule { }

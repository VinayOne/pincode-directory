import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article.routing.module';
import { SharedModulesModule } from '../modules/shared-modules/shared-modules.module';
import { ArticleComponent } from './article.component';



@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModulesModule
  ],
  exports: [ArticleComponent]
})
export class ArticleModule { }

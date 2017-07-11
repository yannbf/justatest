import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwoPage } from './two';
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    TwoPage,
  ],
  imports: [
    IonicPageModule.forChild(TwoPage),
    DirectivesModule
  ],
  exports: [
    TwoPage
  ]
})
export class TwoPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    DirectivesModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}

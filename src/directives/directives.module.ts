import { NgModule } from '@angular/core';
import {ProfileScroll} from "./profile-scroll";
import {StretchyHeader} from "./stretchy-header";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [
        ProfileScroll,
        StretchyHeader
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ProfileScroll,
        StretchyHeader
    ]
})
export class DirectivesModule {}
